import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TravelService } from '../travel.service';

@Component({
  selector: 'app-travel-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditComponent implements OnInit, OnDestroy {
  public travelForm: FormGroup;
  public currentId: string = '';

  private routerSubscription: Subscription = new Subscription();

  constructor(
    private travelService: TravelService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.travelForm = new FormGroup({
      name: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      board: new FormControl('', Validators.required),
      traveler: new FormControl('', [Validators.required, Validators.max(10)]),
    });
  }

  ngOnInit(): void {
    this.routerSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id !== 'new') {
        this.travelService.getTravel(id).subscribe((travel) => {
          this.travelForm.patchValue({
            name: travel.name,
            destination: travel.destination,
            board: travel.board,
            traveler: travel.traveler,
          });
          this.currentId = id;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  public save() {
    if (this.travelForm.valid) {
      const travelDto = {
        name: this.travelForm.get('name')?.value,
        destination: this.travelForm.get('destination')?.value,
        board: this.travelForm.get('board')?.value,
        traveler: this.travelForm.get('traveler')?.value,
      };

      if (this.currentId) {
        this.travelService
          .updateTravel(this.currentId, travelDto)
          .subscribe((travel) => {
            if (travel) {
              this.router.navigate(['mytravel']);
            }
          });
      } else {
        this.travelService.createTravel(travelDto).subscribe((travel) => {
          if (travel) {
            this.router.navigate(['mytravel']);
          }
        });
      }
    }
  }

  public reset() {
    this.travelForm.reset();
  }
}
