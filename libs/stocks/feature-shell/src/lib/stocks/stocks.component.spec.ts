import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StocksComponent } from './stocks.component';
import { FormsModule } from '@angular/forms';
import { StocksFeatureShellModule } from '../..';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let priceQuery: PriceQueryFacade;
  class MockLineFacade {
    selectedSymbol$ = of();
    priceQueries$ = of();
    fetchQuote = jest.fn();
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, StocksFeatureShellModule, BrowserAnimationsModule],
      declarations: [],
      providers: [{ provide: PriceQueryFacade, useClass: MockLineFacade }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    priceQuery = TestBed.get(PriceQueryFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch data', () => {
    component.stockPickerForm.setValue({symbol:'AAPL', period: '2d'});
    spyOn(priceQuery, 'fetchQuote');
    component.fetchQuote();
    expect(component).toBeTruthy();
    expect(priceQuery.fetchQuote).toHaveBeenCalled();
  });
});
