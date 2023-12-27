import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

const apiUrl = 'http://localhost:3000/api/v1/tasks';
const apiUrlProgress = 'http://localhost:3000/api/v1/inprogress';
const apiUrlDone = 'http://localhost:3000/api/v1/done';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(apiUrl);
  }

  getInprogress(): Observable<Task[]> {
    return this.http.get<Task[]>(apiUrlProgress);
  }

  getDone(): Observable<Task[]> {
    return this.http.get<Task[]>(apiUrlDone);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(apiUrl, task);
  }

  updateTask(taskId: string, updatedTask: Task): Observable<Task> {
    const updateUrl = `${apiUrl}/${taskId}`;
    return this.http.put<Task>(updateUrl, updatedTask);
  }

  updateToDo(updatedTasks: Task[]): Observable<Task> {
    const updateUrl = `${apiUrl}/current-task`;
    return this.http.put<Task>(updateUrl, updatedTasks);
  }

  updateInprogress(updatedTasks: Task[]): Observable<Task> {
    const updateUrl = `${apiUrlProgress}/update-inprogress`;
    return this.http.put<Task>(updateUrl, updatedTasks);
  }

  updateDone(updatedTasks: Task[]): Observable<Task> {
    const updateUrl = `${apiUrlDone}/update-done`;
    return this.http.put<Task>(updateUrl, updatedTasks);
  }

  deleteTask(taskId: string): Observable<void> {
    const deleteUrl = `${apiUrl}/${taskId}`;
    return this.http.delete<void>(deleteUrl);
  }
}
