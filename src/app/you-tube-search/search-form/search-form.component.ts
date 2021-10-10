import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { YouTubeSearchService } from 'app/you-tube-search/you-tube-search.service';
import { SearchResult } from 'app/you-tube-search/search-result.model';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();


  form: FormGroup;


  constructor(
    private youtube: YouTubeSearchService,
    ) {}

  ngOnInit() {
    this.form = new FormGroup({
      textInput: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ])
    });
  }

  submit() {
    if (this.form.valid) {
      this.youtube.search(this.form.value.textInput).subscribe(
        (results: SearchResult[]) => { // on sucesss
          this.loading.emit(false);
          this.results.emit(results);
          this.form.reset();
        },
        (err: any) => { // on error
          console.log(err);
          this.loading.emit(false);
        },
        () => { // on completion
          this.loading.emit(false);
        }
      );
    } // if (this.form.valid)
  }
}
