import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  public books = [];
  public book = '';

  ngOnInit() {
  	this.dataApi.getAllBooksOffers().subscribe(books => {
  		console.log('Books', books);
      this.books = books;
  	})
  }

}
