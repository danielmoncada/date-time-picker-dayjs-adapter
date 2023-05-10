Angular Date Time Picker (DayJs Adapter)
========================

[![npm](https://img.shields.io/npm/v/@danielmoncada/angular-datetime-picker-dayjs-adapter.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/@danielmoncada/angular-datetime-picker-dayjs-adapter)
[![npm](https://img.shields.io/npm/dm/@danielmoncada/angular-datetime-picker-dayjs-adapter.svg)](https://www.npmjs.com/package/@danielmoncada/angular-datetime-picker-dayjs-adapter)

**Angular date time picker - DayJs Adpater**

**This package supports Angular 9/10/11/12/13/14/15/16**

Description
-------
This is a DayJs adapter to be used with the following date time picker control:

https://github.com/danielmoncada/date-time-picker

How to Use
-------

 1. Install with [npm](https://www.npmjs.com):`npm install @danielmoncada/angular-datetime-picker-dayjs-adapter --save`
 2. 
    ```typescript
    import { NgModule } from '@angular/core';
    import { OwlDateTimeModule, OWL_DATE_TIME_FORMATS} from '@danielmoncada/angular-datetime-picker;
    import { OwlDayJsDateTimeModule } from '@danielmoncada/angular-datetime-picker-dayjs-adapter';

    // See the Day.js docs for the meaning of these formats:
    // https://day.js.org/docs/en/display/format
    export const MY_DAYJS_FORMATS = {
        parseInput: 'l LT',
        fullPickerInput: 'l LT',
        datePickerInput: 'l',
        timePickerInput: 'LT',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    };

    @NgModule({
        imports: [OwlDateTimeModule, OwlDayJsDateTimeModule],
        providers: [
            {provide: OWL_DATE_TIME_FORMATS, useValue: MY_DAYJS_FORMATS},
        ],
    })
    export class AppExampleModule {
    }
    ```

Dependencies
-------
- dayjs
- @danielmoncada/angular-datetime-picker
- tslib

Demo
-------
- Online doc is [here](https://daniel-projects.firebaseapp.com/owlng/date-time-picker) and [here](https://danielykpan.github.io/date-time-picker/)
- Online demos (StackBlitz) are [here](https://stackblitz.com/edit/angular-vvp849) and [here](https://stackblitz.com/edit/angular-i7ykf5)

License
-------
* License: MIT

Author
-------
**Maintained and updated by Daniel Moncada, original implementatiom by Daniel Pan**
