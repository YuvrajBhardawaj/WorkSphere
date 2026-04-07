import { Routes } from '@angular/router';
import { CreateEmpComponent } from './pages/create-emp/create-emp.component';
import { ViewEmployeesComponent } from './pages/view-employees/view-employees.component';
import { viewEmpResolver } from './resolvers/view-emp.resolver';
import { LoginComponent } from './pages/login/login.component';
import { rolesResolver } from './resolvers/roles.resolver';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { managersListResolver } from './resolvers/managers-list.resolver';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'signin',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],   // ← guard on the parent
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'addEmployee',
        component: CreateEmpComponent,
        resolve: { roles: rolesResolver },
      },
      {
        path: 'addProject',
        component: AddProjectComponent,
        resolve: { managers: managersListResolver },
      },
      {
        path: 'employees',
        component: ViewEmployeesComponent,
        resolve: { employees: viewEmpResolver },
      },
      {
        path: '',
        redirectTo: 'dashboard',   // ← default landing page after login
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',   // ← unknown routes fall back to root (which guard handles)
  },
];