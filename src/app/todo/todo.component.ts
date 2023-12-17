import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo, TodoWithChildren, TodoWithId } from '../model/todo';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit, OnDestroy {
  constructor(private todoService: TodoService, private route: ActivatedRoute, private router: Router) { }
  private routerSubscription: Subscription = new Subscription;
  todoFormValue = {
    title: '',
    description: ''
  };
  todos: TodoWithId[] = [];
  todoId: string = '';
  edit: boolean = false;
  todoWithChildren: TodoWithChildren[] = [];
  ngOnInit() {
    this.routerSubscription = this.route.params.subscribe(params => {
      this.todoId = params['id']
      this.loadTodo()
    });
  }
  ngOnDestroy() {
    // Unsubscribe from the router events to avoid memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  navigateToSubtask(_id: string | null) {
    this.router.navigate(_id ? ['/todo/', _id] : ['/todo/']);
  }

  loadTodo() {
    this.todoId ? this.loadTodoWithSubtask() : this.loadParentTodo()
  }

  loadTodoWithSubtask() {
    this.todoService.getSubtasksForTodo(this.todoId).subscribe((todoWithChildren) => {
      this.todoWithChildren = todoWithChildren;
      this.todos = this.todoWithChildren[0].childrens
      if (this.edit) {
        this.todoFormValue = {
          title: this.todoWithChildren[0].title,
          description: this.todoWithChildren[0].title
        };
      }
    });
  }

  loadParentTodo() {
    this.todoService.getOnlyParentTodos().subscribe((data) => {
      this.todos = data;
    });
  }
  addToDo() {
    const todo: Todo = {
      title: this.todoFormValue.title,
      description: this.todoFormValue.description,
      parentId: this.todoId || null,
      userId: 'userId',
      completed: false,
    };
    this.todoService.createTodo(todo).subscribe((data) => {
      console.log('Data :: ', data)
      this.loadTodo();
    });
  }
  updateToDo() {
    this.todoService.updateTodoById(this.todoId, this.todoFormValue).subscribe((data) => {
      console.log('Data :: ', data)
      this.edit = false
      this.loadTodo();
    });
  }
  onClickSubmit() {
    this.edit ? this.updateToDo() : this.addToDo()
  }
  completeTodo(todo: TodoWithId) {
    this.todoService.updateTodoById(todo._id, { completed: todo.completed }).subscribe((data) => {
      console.log('Data :: ', data)
      this.loadTodo();
    });
  }
  deleteTodo(todo: TodoWithId) {
    this.todoService.deleteTodoById(todo._id).subscribe((data) => {
      console.log('Data :: ', data)
      this.loadTodo();
    });
  }
  makeEdit() {
    this.edit = !this.edit
  }
}
