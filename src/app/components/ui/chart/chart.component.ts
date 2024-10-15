import { Component, Input } from '@angular/core'
import { Chart, ChartConfiguration, ChartTypeRegistry, registerables } from 'chart.js'

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @Input() chartType: keyof ChartTypeRegistry = 'doughnut'
  @Input() labels: string[] = [''];
  @Input() backgroundColor!: string[]
  @Input() hoverOffset: number = 4;
  @Input() labelDataSet: string = ''
  chart!: Chart
  public createChart(data: number[]): void {
    const ctx = document.getElementById('chart') as HTMLCanvasElement;

    const chartConfig: ChartConfiguration<typeof this.chartType, number[], unknown> = {
      type: this.chartType,
      data: {
        labels: this.labels,
        datasets: [{
          label: this.labelDataSet,
          data,
          backgroundColor: this.backgroundColor,
          hoverOffset: this.hoverOffset
        }]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
        },
      }
    };

    if (this.chart) {
      this.chart.destroy()
    }


    this.chart = new Chart(ctx, chartConfig);
  }

  public destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
