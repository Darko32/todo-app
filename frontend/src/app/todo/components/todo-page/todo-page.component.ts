import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/model/task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {

  todoForm !: FormGroup;
  tasks: Task[] = [];
  inprogress: Task[] = [];
  done: Task[] = [];
  updateIndex !: any;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder, private tasksService: TasksService) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loadProgress();
    this.loadDone();
    this.todoForm = this.fb.group({
      task_title: ['', Validators.required]
    });


  }

  loadTasks() {
    this.tasksService.getTasks().subscribe((data: any) => {
      this.tasks = data[0].tasks;
    });
  }

  loadProgress() {
    this.tasksService.getInprogress().subscribe((data: any) => {
      // console.log(data[0].tasks)
      this.inprogress = data[0].tasks;
    });
  }

  loadDone() {
    this.tasksService.getDone().subscribe((data: any) => {
      // console.log(data[0].tasks)
      this.done = data[0].tasks;
    });
  }

  addTask() {
    const newTask: Task = {
      task_title: this.todoForm.value.task_title
    };

    this.tasksService.addTask(newTask).subscribe(() => {
      this.loadTasks();
      this.todoForm.reset();
    });
  }

  updateTask() {
    const taskId = this.tasks[this.updateIndex]._id;
    const updatedTask: Task = {
      task_title: this.todoForm.value.task_title
    };
    if (taskId) {
      this.tasksService.updateTask(taskId, updatedTask).subscribe(() => {
        this.loadTasks();
        this.todoForm.reset();
        this.updateIndex = undefined;
        this.isEditEnabled = false;
      });
    }
    console.log('vtoro id', updatedTask);
    console.log('tasks', this.tasks[this.updateIndex])
  }

  onEdit(item: Task, i: number) {
    this.todoForm.controls['task_title'].setValue(item.task_title);
    this.updateIndex = i;
    this.isEditEnabled = true;
    console.log('index', this.updateIndex);
  }

  updateTaskToDo() {
    this.tasksService.updateToDo(this.tasks).subscribe(() => {
      console.log('Inprogress list updated on the server');
    });
  }

  updateProgress() {
    this.tasksService.updateInprogress(this.inprogress).subscribe(() => {
      console.log('Inprogress list updated on the server');
    });
  }

  updateDone() {
    this.tasksService.updateDone(this.done).subscribe(() => {
      console.log('Inprogress list updated on the server');
    });
  }


 

  

  deleteTask(i: number) {
    // this.tasks = this.tasks.filter((task, index) => index !== i);
    // this.tasks.splice(i, 1);
    const taskId = this.tasks[i]._id;
    // console.log('delete', taskId);
    if (taskId) {
      this.tasksService.deleteTask(taskId).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  deleteInprogres(i: number) {
    this.inprogress.splice(i, 1);
    this.updateProgress();
  }

  deleteDone(i: number) {
    this.done.splice(i, 1);
    this.updateDone();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // console.log('event.previousContainer', event.previousContainer);
      // console.log('event.container', event.container);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateTaskToDo();
      this.updateProgress();
      this.updateDone();
    } else {
      // console.log('event.previousContainer', event.previousContainer);
      // console.log('event.container', event.container);
      // console.log('inprogress', this.inprogress);
      // console.log('done', this.done);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.updateTaskToDo();
      this.updateProgress();
      this.updateDone();
    }
  }

}
