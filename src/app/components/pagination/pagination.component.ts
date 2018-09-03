import {Component, OnInit, OnDestroy, Input, EventEmitter, Output} from '@angular/core';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/internal/operators';
import { FormControl } from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() total: number;
  @Input() currentPage: number;
  @Output() pageNumberChanged = new EventEmitter<number>();

  currentPageNumberControl: FormControl;
  currentPageNumberSubscription: Subscription;

  ngOnInit() {
    this.currentPageNumberControl = new FormControl(this.currentPage);

    this.currentPageNumberSubscription = this.currentPageNumberControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter(value => value > 0 && value <= this.total)
    ).subscribe((pageNumber: number) => {
      this.pageNumberChanged.emit(pageNumber);
    });
  }

  onPreviousClick(): void {
    this.currentPageNumberControl.setValue(this.currentPageNumberControl.value - 1);
  }

  onNextClick(): void {
    this.currentPageNumberControl.setValue(this.currentPageNumberControl.value + 1);
  }

  ngOnDestroy() {
    this.currentPageNumberSubscription.unsubscribe();
  }

}
