import { Component, Input } from '@angular/core'
import Chart from 'chart.js'

@Component({
    selector: 'chart',
    template: `
    <section  height="200px">
    	<canvas id="chart-canvas"></canvas>
    </section>
    `
})

export class ChartComponent {

    @Input() stats

    constructor() {}

    ngOnInit() {
        this.ctx = document.getElementById('chart-canvas')
    }

    ngOnChanges() {
        if (this.stats) {
        	this.parse()
        	this.draw()
        } else if (this.chart) {
        	this.chart.destroy()
        }
    }

    parse() {
        this.labels = Object.keys(this.stats)
        this.started = this.labels.map((i) => this.stats[i].started)
        this.ended = this.labels.map((i) => this.stats[i].ended)
    }

    draw() {
        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                    label: 'started',
                    data: this.started,
                    backgroundColor: 'rgba(15,255,51,0.6)'
                },
                {
                    label: 'ended',
                    data: this.ended,
                    backgroundColor: 'rgba(255,15,0,0.4)'
                }]
            }
        })
    }

}
