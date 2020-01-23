import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IChart } from './../chart.interface';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data$: Observable<any>;
  chartData: any;
  dataSubscription: Subscription;
  chart: IChart;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.chart = {
      title: '',
      type: 'LineChart',
      data: [],
      columnNames: ['period', 'close'],
      options: { title: `Stock price`, width: '600', height: '400' }
    };

    this.dataSubscription = this.data$.subscribe(
      newData => (this.chartData = newData)
    );
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
