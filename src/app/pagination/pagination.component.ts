import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/internal/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor() { }

  @Input() total: number;
  @Input() currentPage: number;
  @Output() pageNumberChanged = new EventEmitter<number>();
  currentPageNumberControl: FormControl;

  ngOnInit() {
    this.currentPageNumberControl = new FormControl(this.currentPage);

    this.currentPageNumberControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter(value => value > 0 && value <= this.total)
    )
      .subscribe(pageNumber => this.pageNumberChanged.emit(pageNumber));
  }

  onPreviousClick() {
    this.currentPageNumberControl.setValue(this.currentPageNumberControl.value - 1);
  }

  onNextClick() {
    this.currentPageNumberControl.setValue(this.currentPageNumberControl.value + 1);
  }

}
