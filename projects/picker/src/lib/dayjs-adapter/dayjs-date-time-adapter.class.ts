/**
 * dayjs-date-time-adapter.class
 */

import { Inject, Injectable, Optional, InjectionToken } from '@angular/core';
import {
    DateTimeAdapter,
    OWL_DATE_TIME_LOCALE,
} from '@danielmoncada/angular-datetime-picker';
import dayjs from 'dayjs';
import localData from 'dayjs/plugin/localeData';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);
dayjs.extend(localData);

export interface OwlDayJsDateTimeAdapterOptions {
    /**
     * Turns the use of utc dates on or off.
     * Changing this will change how the DateTimePicker output value.
     * {@default false}
     */
    useUtc: boolean;
}

/** InjectionToken for dayjs date adapter to configure options. */
export const OWL_DAYJS_DATE_TIME_ADAPTER_OPTIONS =
    new InjectionToken<OwlDayJsDateTimeAdapterOptions>(
        'OWL_DAYJS_DATE_TIME_ADAPTER_OPTIONS',
        {
            providedIn: 'root',
            factory: OWL_DAYJS_DATE_TIME_ADAPTER_OPTIONS_FACTORY,
        }
    );

/** @docs-private */
export function OWL_DAYJS_DATE_TIME_ADAPTER_OPTIONS_FACTORY(): OwlDayJsDateTimeAdapterOptions {
    return {
        useUtc: false,
    };
}

/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}

@Injectable()
export class DayjsDateTimeAdapter extends DateTimeAdapter<dayjs.Dayjs> {
    private _localeData: {
        longMonths: string[];
        shortMonths: string[];
        longDaysOfWeek: string[];
        shortDaysOfWeek: string[];
        narrowDaysOfWeek: string[];
        dates: string[];
    };

    constructor(
        @Optional()
        @Inject(OWL_DATE_TIME_LOCALE)
        private owlDateTimeLocale: string,
        @Optional()
        @Inject(OWL_DAYJS_DATE_TIME_ADAPTER_OPTIONS)
        private options?: OwlDayJsDateTimeAdapterOptions
    ) {
        super();
        this.setLocale(owlDateTimeLocale || dayjs().locale());
    }

    public setLocale(locale: string) {
        super.setLocale(locale);

        const dayjsLocalData = dayjs().locale(locale).localeData();
        this._localeData = {
            longMonths: dayjsLocalData.months(),
            shortMonths: dayjsLocalData.monthsShort(),
            longDaysOfWeek: dayjsLocalData.weekdaysShort(), //Doesn't support long names yet, will be available in future release https://github.com/iamkun/dayjs/issues/779
            shortDaysOfWeek: dayjsLocalData.weekdaysShort(),
            narrowDaysOfWeek: dayjsLocalData.weekdaysMin(),
            dates: range(31, (i) =>
                this.createDate(2017, 0, i + 1).format('D')
            ),
        };
    }

    public getYear(date: dayjs.Dayjs): number {
        return this.clone(date).year();
    }

    public getMonth(date: dayjs.Dayjs): number {
        return this.clone(date).month();
    }

    public getDay(date: dayjs.Dayjs): number {
        return this.clone(date).day();
    }

    public getDate(date: dayjs.Dayjs): number {
        return this.clone(date).date();
    }

    public getHours(date: dayjs.Dayjs): number {
        return this.clone(date).hour();
    }

    public getMinutes(date: dayjs.Dayjs): number {
        return this.clone(date).minute();
    }

    public getSeconds(date: dayjs.Dayjs): number {
        return this.clone(date).second();
    }

    public getTime(date: dayjs.Dayjs): number {
        return this.clone(date).valueOf();
    }

    public getNumDaysInMonth(date: dayjs.Dayjs): number {
        return this.clone(date).daysInMonth();
    }

    public differenceInCalendarDays(
        dateLeft: dayjs.Dayjs,
        dateRight: dayjs.Dayjs
    ): number {
        return Math.ceil(dateLeft.diff(dateRight, 'day', true));
    }

    public getYearName(date: dayjs.Dayjs): string {
        return date.format('YYYY');
    }

    public getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        return style === 'long'
            ? this._localeData.longMonths
            : this._localeData.shortMonths;
    }

    public getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        if (style === 'long') {
            return this._localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this._localeData.shortDaysOfWeek;
        }
        return this._localeData.narrowDaysOfWeek;
    }

    public getDateNames(): string[] {
        return this._localeData.dates;
    }

    public toIso8601(date: dayjs.Dayjs): string {
        return this.clone(date).toISOString();
    }

    public isEqual(dateLeft: dayjs.Dayjs, dateRight: dayjs.Dayjs): boolean {
        return this.clone(dateLeft).isSame(this.clone(dateRight));
    }

    public isSameDay(dateLeft: dayjs.Dayjs, dateRight: dayjs.Dayjs): boolean {
        return this.clone(dateLeft).isSame(this.clone(dateRight), 'day');
    }

    public isValid(date: dayjs.Dayjs): boolean {
        return this.clone(date).isValid();
    }

    public invalid(): dayjs.Dayjs {
        return dayjs(NaN);
    }

    public isDateInstance(obj: any): boolean {
        return dayjs.isDayjs(obj);
    }

    public addCalendarYears(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
        return this.clone(date).add(amount, 'year');
    }

    public addCalendarMonths(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
        return this.clone(date).add(amount, 'month');
    }

    public addCalendarDays(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
        return this.clone(date).add(amount, 'day');
    }

    public setHours(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
        return this.clone(date).hour(amount);
    }

    public setMinutes(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
        return this.clone(date).minute(amount);
    }

    public setSeconds(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
        return this.clone(date).second(amount);
    }

    public createDate(year: number, month: number, date: number): dayjs.Dayjs;
    public createDate(
        year: number,
        month: number,
        date: number,
        hours: number = 0,
        minutes: number = 0,
        seconds: number = 0
    ): dayjs.Dayjs {
        if (month < 0 || month > 11) {
            throw Error(
                `Invalid month index "${month}". Month index has to be between 0 and 11.`
            );
        }

        if (date < 1) {
            throw Error(
                `Invalid date "${date}". Date has to be greater than 0.`
            );
        }

        if (hours < 0 || hours > 23) {
            throw Error(
                `Invalid hours "${hours}". Hours has to be between 0 and 23.`
            );
        }

        if (minutes < 0 || minutes > 59) {
            throw Error(
                `Invalid minutes "${minutes}". Minutes has to between 0 and 59.`
            );
        }

        if (seconds < 0 || seconds > 59) {
            throw Error(
                `Invalid seconds "${seconds}". Seconds has to be between 0 and 59.`
            );
        }

        let result = this.createDayjs(dayjs());

        function trySetUnit(
            date: dayjs.Dayjs,
            unitType: dayjs.UnitType,
            amount: number
        ) {
            if (amount >= 0) {
                return date.set(unitType, amount);
            }
            return date;
        }

        result = trySetUnit(result, 'year', year);
        result = trySetUnit(result, 'month', month);
        result = trySetUnit(result, 'date', date);
        result = trySetUnit(result, 'hour', hours);
        result = trySetUnit(result, 'minute', minutes);
        result = trySetUnit(result, 'second', seconds);
        result.locale(this.locale);

        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error(
                `Invalid date "${date}" for month with index "${month}".`
            );
        }

        return result;
    }

    public clone(date: dayjs.Dayjs): dayjs.Dayjs {
        return this.createDayjs(date).clone().locale(this.locale);
    }

    public now(): dayjs.Dayjs {
        return this.clone(dayjs());
    }

    public format(date: dayjs.Dayjs, displayFormat: any): string {
        return this.clone(date).format(displayFormat);
    }

    public parse(value: any, parseFormat: any): dayjs.Dayjs {
        return dayjs(value, parseFormat);
    }

    private createDayjs(date: dayjs.Dayjs): dayjs.Dayjs {
        return date === null
            ? dayjs(null, { utc: this.options.useUtc })
            : dayjs(date, {
                  utc: this.options.useUtc,
              });
    }
}
