import { Component, OnInit } from '@angular/core';
import { Travel } from '../dto';
import { TravelService } from '../travel.service';

@Component({
  selector: 'app-travel-my',
  templateUrl: './mytravel.component.html',
  styleUrls: ['./mytravel.component.scss'],
})
export class MyTravelComponent implements OnInit {
  public travels: Travel[] = [];

  constructor(private travelService: TravelService) {}

  ngOnInit(): void {
    this.travelService
      .getAllTravels()
      .subscribe((travels: Travel[]) => (this.travels = travels));
  }

  public delete(id: string) {
    this.travelService.deleteTravel(id).subscribe((travel: Travel) => {
      if (travel) {
        const index = this.travels.findIndex((travel) => travel.id === id);
        if (index > -1) {
          this.travels.splice(index, 1);
        }
      }
    });
  }
}
