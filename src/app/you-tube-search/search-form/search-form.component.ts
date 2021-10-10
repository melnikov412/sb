import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { YouTubeSearchService } from 'app/you-tube-search/you-tube-search.service';
import { SearchResult } from 'app/you-tube-search/search-result.model';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  env = environment;
  buttonActive = this.env.buttonActive;
  tipeQuery: string | null = null;
  buttons = this.env.buttons;
  textInput = '';

  form: FormGroup;

  updateButtonActive($event: string) {
    this.buttonActive = $event;
    // console.log('APP-COMPONENT buttonActive: ', this.buttonActive);
  }

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
      this.tipeQuery = (this.buttonActive === this.env.buttonActive) ? null : ('type=' + this.buttonActive);
      this.textInput = this.form.value.textInput;

      this.youtube.search(this.form.value.textInput, this.tipeQuery).subscribe(
      //  this.youtube.search(this.form.value.textInput).subscribe(
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
