import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, TodoWithChildren, TodoWithId } from './model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:4000';

  private http = inject(HttpClient)

  getAllTodos() {
    return this.http.get<TodoWithId[]>(`${this.apiUrl}/todo`);
  }

  getOnlyParentTodos() {
    return this.http.get<TodoWithId[]>(`${this.apiUrl}/todo?parentId=null`);
  }

  createTodo(todoData: Todo) {
    return this.http.post<Todo>(`${this.apiUrl}/todo`, todoData);
  }

  getTodoById(id: string) {
    return this.http.get(`${this.apiUrl}/todo/${id}`);
  }

  updateTodoById(id: string, patchData: Partial<TodoWithId>) {
    return this.http.patch(`${this.apiUrl}/todo/${id}`, patchData);
  }

  deleteTodoById(id: string) {
    return this.http.delete(`${this.apiUrl}/todo/${id}`);
  }

  getSubtasksForTodo(id: string) {
    return this.http.get<TodoWithChildren[]>(`${this.apiUrl}/todo/${id}/subtasks`);
  }
}
