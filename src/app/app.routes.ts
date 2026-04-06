import { Routes } from '@angular/router';
import { CreateEmpComponent } from './pages/create-emp/create-emp.component';
import { ViewEmployeesComponent } from './pages/view-employees/view-employees.component';
import { viewEmpResolver } from './resolvers/view-emp.resolver';
import { LoginComponent } from './pages/login/login.component';
import { rolesResolver } from './resolvers/roles.resolver';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { managersListResolver } from './resolvers/managers-list.resolver';

export const routes: Routes = [
  {
    path: 'addEmployee',
    component: CreateEmpComponent,
    resolve:{
      roles: rolesResolver
    }
  },
  {
    path: 'addProject',
    component: AddProjectComponent,
    resolve:{
      managers: managersListResolver
    }
  },
  {
    path: 'employees',
    component: ViewEmployeesComponent,
    resolve: {
      employees: viewEmpResolver,
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];
