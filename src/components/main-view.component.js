import { Component } from '@angular/core'
import {DataListComponent} from './data-list.component'
// import {DatePickerComponent} from './date-picker.component'

@Component({
    selector: 'main-view',
    template: `
		<section class="mp-main-view">
		    <data-list></data-list>
		</section>
    `,
  	directives: [DataListComponent]
})

export class MainViewComponent {

    constructor() {}

}
