import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TIME_PERIOD } from './../stock.constant';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;

  quotes$ = this.priceQuery.priceQueries$;
  storePickFormSubscription: Subscription;

  timePeriods = [
    { viewValue: TIME_PERIOD.ALL_AVAILABLE_DATA, value: TIME_PERIOD.MAX },
    { viewValue: TIME_PERIOD.FIVE_YEARS, value: TIME_PERIOD.FIVE_Y },
    { viewValue: TIME_PERIOD.TWO_YEARS, value: TIME_PERIOD.TWO_Y },
    { viewValue: TIME_PERIOD.ONE_YEARS, value: TIME_PERIOD.ONE_Y },
    { viewValue: TIME_PERIOD.YEAR_TO_DATE, value: TIME_PERIOD.Y_T_D },
    { viewValue: TIME_PERIOD.SIX_MONTH, value: TIME_PERIOD.SIX_M },
    { viewValue: TIME_PERIOD.THREE_MONTH, value: TIME_PERIOD.THREE_M },
    { viewValue: TIME_PERIOD.ONE_MONTH, value: TIME_PERIOD.ONE_M }
  ];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.storePickFormSubscription = this.stockPickerForm.valueChanges
      .pipe(debounceTime(TIME_PERIOD.DEBOUNCE_TIME))
      .subscribe(val => {
        this.stockPickerForm.valid && this.fetchQuote();
      });
  }

  fetchQuote() {
    const { symbol, period } = this.stockPickerForm.value;
    this.priceQuery.fetchQuote(symbol, period);
  }

  ngOnDestroy() {
    this.storePickFormSubscription.unsubscribe();
  }
}
