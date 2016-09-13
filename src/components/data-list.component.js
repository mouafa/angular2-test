import { Component } from '@angular/core'
import { Http, HTTP_PROVIDERS } from '@angular/http'
import { DatePickerComponent } from './date-picker.component'
import { ChartComponent } from './chart.component'

var moment = require('moment')

@Component({
    selector: 'data-list',
    template: require('./data-list.component.html'),
    providers: [HTTP_PROVIDERS],
    directives: [DatePickerComponent, ChartComponent]
})

export class DataListComponent {

    constructor(http) {
        this.http = http
        this.lastUsedField = ''
        this.sortDirection = 1
        this.stats = null
    }

    static get parameters() {
        return [
            [Http]
        ]
    }

    ngOnInit() {
        this.getData().subscribe(result => {
            this.data = result
            this.showedData = result.slice(0)
            this.calcStats()
                // console.table(result)
        })
    }

    getData() {
        return this.http
            .get('data/data.json')
            .map(response => response.json());
    }

    calcStats () {
        if (!this.showedData.length) return (this.stats = null)
        let stats = this.stats = {}
        this.showedData.forEach((i) => {
            let startYear = i.start_date.split('/').pop()
            let endYear = i.end_date.split('/').pop()
            if (!stats[startYear]) stats[startYear] = {started: 0, ended: 0}
            if (!stats[endYear]) stats[endYear] = {started: 0, ended: 0}
            stats[startYear].started += 1
            stats[endYear].ended += 1
        })
    }

    sortBy(field) {
        // console.log(field)
        if (this.lastUsedField === field) {
            this.sortDirection = -this.sortDirection
        } else {
            this.lastUsedField = field
            this.sortDirection = 1
        }
        if (field == 'start_date' || field == 'end_date') {
            this.showedData.sort(dateSort.bind(null, field, this.sortDirection))
        } else {
            this.showedData.sort(alphaSort.bind(null, field, this.sortDirection))
        }

    }

    iconType(field) {
        if (this.lastUsedField === field) {
            if (this.sortDirection === 1) return 'glyphicon-chevron-down'
            else return 'glyphicon-chevron-up'
        }
        return ''
    }

    onChanged(range) {
        // console.log('changed fired', range)
        this.showedData = this.data.filter(rangeFilter.bind(null, range))
        this.calcStats()
            // console.table(this.showedData)
    }

}

// callbacks

function rangeFilter(range, item) {
    const sd = moment(item.start_date, 'M/D/YYYY')
    const ed = moment(item.end_date, 'M/D/YYYY')

    if (range.startDate && range.endDate) {
        // console.info('range.startDate && range.endDate', range)
        if (moment(range.startDate, 'M/D/YYYY').isSameOrBefore(sd) && moment(range.endDate, 'M/D/YYYY').isSameOrAfter(ed)) return true
    } else if (range.startDate) {
        // console.info('range.startDate', range)
        if (moment(range.startDate, 'M/D/YYYY').isSameOrBefore(sd)) return true
    } else if (range.endDate) {
        // console.info('range.endDate', range)
        if (moment(range.endDate, 'M/D/YYYY').isSameOrAfter(ed)) return true
    }

    return false
}

function alphaSort(field, direction, i, j) {
    if (i[field] > j[field]) return direction
    if (i[field] < j[field]) return -direction
    return 0
}

function dateSort(field, direction, i, j) {
    if (moment(i[field], 'M/D/YYYY').isAfter(moment(j[field], 'M/D/YYYY'))) return direction
    if (moment(i[field], 'M/D/YYYY').isBefore(moment(j[field], 'M/D/YYYY'))) return -direction
    return
}
