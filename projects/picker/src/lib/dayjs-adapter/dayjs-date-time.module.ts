/**
 * dayjs-date-time.module
 */

import { NgModule } from '@angular/core';
import { DayjsDateTimeAdapter, OWL_DAYJS_DATE_TIME_ADAPTER_OPTIONS } from './dayjs-date-time-adapter.class';
import { OWL_DAYJS_DATE_TIME_FORMATS } from './dayjs-date-time-format.class';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE } from '@danielmoncada/angular-datetime-picker';
import { OWL_DATE_TIME_FORMATS } from '@danielmoncada/angular-datetime-picker';

@NgModule({
    providers: [
        {
            provide: DateTimeAdapter,
            useClass: DayjsDateTimeAdapter,
            deps: [OWL_DATE_TIME_LOCALE, OWL_DAYJS_DATE_TIME_ADAPTER_OPTIONS]
        },
    ],
})
export class DayJsDateTimeModule {
}

@NgModule({
    imports: [DayJsDateTimeModule],
    providers: [{provide: OWL_DATE_TIME_FORMATS, useValue: OWL_DAYJS_DATE_TIME_FORMATS}],
})
export class OwlDayJsDateTimeModule {
}
