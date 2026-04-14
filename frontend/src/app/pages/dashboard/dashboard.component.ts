import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { MaterialModule } from '../../material/material.module';
import { NgChartsModule } from 'ng2-charts';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
  ) {}
  employeeCount = 0;
  managerCount = 0;
  ongoingProjectsCount = 0;
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        precision: 0
      }
    }
  }
};

doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
};
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ label: 'Projects', data: [], backgroundColor: '#3b82f6' }],
  };

  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  };

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (!user) return;

      if (user.role === 'admin') {
        this.dashboardService.getAdminDashboardData().subscribe();

        this.dashboardService.dashboard$.subscribe((data) => {
          if (!data) return;

          // 🔥 ADD THESE
          this.employeeCount = data.employeeCount?.totalEmployees || 0;
          this.managerCount = data.managerCount?.totalManagers || 0;
          this.ongoingProjectsCount =
            data.ongoingProjectsCount?.totalOngoingProjects || 0;

          // charts
          this.setBarChart(data.monthlyProjectCreationCounts);
          this.setDoughnutChart(data.projectStatusCounts);
        });
      }
    });
  }

  private setBarChart(monthlyData: { month: string; count: number }[]): void {
    const sorted = [...monthlyData].sort((a, b) =>
      a.month.localeCompare(b.month),
    );
    this.barChartData = {
      labels: sorted.map((m) => m.month),
      datasets: [
        {
          label: 'Projects',
          data: sorted.map((m) => m.count),
          backgroundColor: '#3b82f6',
        },
      ],
    };
  }

  private setDoughnutChart(
    statusData: { status: string; count: number }[],
  ): void {
    const colorMap: Record<string, string> = {
      active: '#22c55e',
      pending: '#facc15',
      completed: '#3b82f6',
      on_hold: '#ef4444',
    };
    this.doughnutChartData = {
      labels: statusData.map((s) => s.status),
      datasets: [
        {
          data: statusData.map((s) => s.count),
          backgroundColor: statusData.map(
            (s) => colorMap[s.status] ?? '#a855f7',
          ),
        },
      ],
    };
  }
}
