import { Component, OnInit } from '@angular/core';
import { Travel } from '../travel/dto';
import { TravelService } from '../travel/travel.service';

@Component({
  selector: 'app-travel-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit {
  public travels: Travel[] = [];

  constructor(private travelService: TravelService) {}

  ngOnInit(): void {
    this.travelService
      .getAllTravels()
      .subscribe((travels: Travel[]) => (this.travels = travels));
  }
}
