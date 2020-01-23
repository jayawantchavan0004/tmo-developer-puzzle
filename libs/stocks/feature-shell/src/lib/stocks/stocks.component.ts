import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { debounceTime } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TIME_PERIOD } from './../stock.constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  quotes$ = this.priceQuery.priceQueries$;
  minFromDate: Date;
  maxFromDate = new Date();
  minToDate: Date;
  maxToDate = new Date();
  storePickFormSubscription: Subscription;

  events: string[] = [];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.storePickFormSubscription = this.stockPickerForm.valueChanges
      .pipe(debounceTime(TIME_PERIOD.DEBOUNCE_TIME))
      .subscribe(val => {
        this.minToDate = val.startDate;
        val.endDate && (this.maxFromDate = val.endDate);
        this.stockPickerForm.valid && this.fetchQuote();
      });
  }

  fetchQuote() {
    const { symbol, startDate, endDate } = this.stockPickerForm.value;
    this.priceQuery.fetchQuote(
      symbol,
      TIME_PERIOD.MAX,
      new Date(startDate),
      new Date(endDate)
    );
  }

  ngOnDestroy() {
    this.storePickFormSubscription.unsubscribe();
  }
}
