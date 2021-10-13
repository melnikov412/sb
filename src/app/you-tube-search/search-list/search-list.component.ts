import { Component, OnInit } from '@angular/core';
import {YouTubeSearchService} from '../you-tube-search.service';
import {SearchParamsModel} from '../search-params.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  listAll: SearchParamsModel[] | null;

  constructor(private youtube: YouTubeSearchService) {}


  ngOnInit() {
    this.listAll = this.youtube.getFromLocalStorage(environment.lsKey);
    // console.log('/// LIST ALL: ', this.listAll);
  }

}
