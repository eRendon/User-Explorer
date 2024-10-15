import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core'
import { IProfile } from '../../interfaces/IProfile'
import { ChartComponent } from '../ui/chart/chart.component'


@Component({
  selector: 'app-follower-chart',
  standalone: true,
  imports: [
    ChartComponent
  ],
  templateUrl: './follower-chart.component.html',
  styleUrl: './follower-chart.component.scss'
})

export class FollowerChartComponent implements OnChanges {
  @Input() profile!: IProfile
  @ViewChild(ChartComponent) chartComponent!: ChartComponent;

  labels: string[] = ['Seguidores', 'Siguiendo', 'Repositorios públicos']
  backgroundColor: string[] = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)',]
  labelDataSet: string = ''
  data: number[] = []

  ngOnChanges (changes:SimpleChanges):void {
    if (changes['profile']) {
      this.createChart()
    }
  }

  createChart(): void {
    if (this.chartComponent) {
      this.data = [this.profile?.followers, this.profile?.following, this.profile?.public_repos]
      this.labelDataSet = this.profile.login
      this.chartComponent.createChart(this.data)
    }
  }
}
