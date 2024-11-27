import { AfterViewInit, Component, ViewChild } from '@angular/core';
import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc'
import { OwlDateTimeComponent } from '@danielmoncada/angular-datetime-picker';

dayjs.extend(utc);
dayjs.extend(tz);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('date_range_component', { static: true })
  date_range_component: OwlDateTimeComponent<AppComponent>;

  public selectedMoments: dayjs.Dayjs[] = [];
  public currentValue: Date = new Date('4/21/2020, 12:00 AM');
  public endValue: Date = new Date('4/21/2020, 11:59 PM');
  public open_once = false;

  selectedMoment: any;
  maxDate = dayjs().startOf('day');

  public constructor() {
    this.selectedMoments.push(dayjs('2019-03-11T08:00:00+11:00').tz('America/Los_Angeles'));
    this.selectedMoments.push(dayjs('2019-03-11T15:00:00+11:00').tz('America/Los_Angeles'));
  }

  public ngAfterViewInit() {
  }

  public selectedTrigger(_date: any) {
    console.log(_date);
  }
}
