import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { SharedUiChartModule } from '../..';
import { of, Observable } from 'rxjs';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiChartModule],
      declarations: [],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.data$ = of();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the data for chart', () => {
    const newData = {};
    (component as any).chartData = newData;
    (component as any).data$ = of(newData);
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should destroy subscribe call', () => {
    component.ngOnDestroy();
    expect(component).toBeTruthy();
  });
});
