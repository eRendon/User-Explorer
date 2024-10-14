import { Component, Input } from '@angular/core'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables);

@Component({
  selector: 'app-follower-chart',
  standalone: true,
  imports: [],
  templateUrl: './follower-chart.component.html',
  styleUrl: './follower-chart.component.scss'
})

export class FollowerChartComponent {
  @Input() users: { login: string }[] = [];
  chart: Chart | undefined;

  ngOnInit(): void {
    this.fetchFollowers();
  }

  async fetchFollowers(): Promise<void> {
    const followersData = await Promise.all(
      this.users.map(async (user) => {
        const response = await fetch(`https://api.github.com/users/${user.login}`);
        const data = await response.json();
        return data.followers;
      })
    );

    this.createChart(followersData);
  }

  createChart(followersData: number[]): void {
    const ctx = document.getElementById('followersChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.users.map((user) => user.login),
        datasets: [
          {
            label: 'Seguidores',
            data: followersData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Seguidores de los usuarios',
          },
        },
      },
    });
  }
}
