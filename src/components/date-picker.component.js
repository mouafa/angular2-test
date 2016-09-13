import { Component, Output, EventEmitter } from '@angular/core'
import 'rome/dist/rome.css'
var rome = require('rome')

@Component({
    selector: 'date-picker',
    template: `
    <div class="row">
	    <div class="col-xs-4 col-xs-offset-1">
	    	<label for="start-date">Start Date</label>
	    	<input id="start-date" class="form-control input"/>
	    </div>
	    <div class="col-xs-4 col-xs-offset-2">
	    	<label for="end-date">End Dates</label>
	    	<input id="end-date" class="form-control input"/>
	    </div>
    </div>
    `

})

export class DatePickerComponent implements OnInit, OnDestroy {
	@Output() onChanged = new EventEmitter()

    constructor() {
        this.compId = Math.floor((Math.random() * 1e10)).toString(36)
        this.startDate = ''
        this.endDate = ''
    }

    ngOnInit() {
        const $startDate = window.document.getElementById('start-date')
        const $endDate = window.document.getElementById('end-date')
        const pickerConfig = { weekStart: 1, time: false, inputFormat: 'M/D/YYYY'}

        rome($startDate, Object.assign({dateValidator: rome.val.beforeEq($endDate)}, pickerConfig))
            .on('data', (value) => this.emit(value))

         rome($endDate, Object.assign({ dateValidator: rome.val.afterEq($startDate)}, pickerConfig))
            .on('data', (value) => this.emit(null, value))
    }

    emit (start, end) {
    	let changed = false

    	if (start) {
    		if (start != this.startDate) {
    			changed = true
    			this.startDate = start
    		}
    	}

    	if (end) {
    		if (end != this.endDate) {
    			changed = true
    			this.endDate = end
    		}
    	}

    	if (changed) this.onChanged.emit({startDate: this.startDate, endDate: this.endDate})
    }

}
