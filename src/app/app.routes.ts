import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'form',
        loadComponent: () =>
            import('./components/form/employee-form/employee-form.component').then(c => c.EmployeeFormComponent)
    },
    {
        path: 'list',
        loadComponent: () =>
            import('./components/list/employee-list/employee-list.component').then(c => c.EmployeeListComponent)
    }
];
