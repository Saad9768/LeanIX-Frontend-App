import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
    { path: '', redirectTo: '/todo', pathMatch: 'full' },
    { path: 'todo', component: TodoComponent },
    { path: 'todo/:id', component: TodoComponent },
];
