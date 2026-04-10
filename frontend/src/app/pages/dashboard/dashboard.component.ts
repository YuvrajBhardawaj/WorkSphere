import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { MaterialModule } from '../../material/material.module';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 THIS fixes oversizing
  };
  // 📊 Bar Chart
  barChartData = {
  labels: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  datasets: [
    {
      label: 'Projects',
      data: [5, 8, 6, 10, 7, 9, 12, 11, 6, 8, 10, 7],
      backgroundColor: '#3b82f6'
    }
  ]
};


  // 🍩 Doughnut Chart
  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Completed', 'Pending', 'On Hold'],
    datasets: [
      {
        data: [12, 8, 4],
        backgroundColor: ['#22c55e', '#facc15', '#ef4444'],
      },
    ],
  };
}
