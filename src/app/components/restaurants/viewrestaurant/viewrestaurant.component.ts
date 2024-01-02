import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-viewrestaurant',
  templateUrl: './viewrestaurant.component.html',
  styleUrls: ['./viewrestaurant.component.css']
})
export class ViewrestaurantComponent implements OnInit {

  @Input()
  public restaurantInfo:any;


  @Output()
  public closeModel: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }


  close() {
    this.closeModel.emit();
  }
}
