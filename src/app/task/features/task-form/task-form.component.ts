import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskCreate, TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  providers: [TaskService],
})
export default class TaskFormComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _taskService = inject(TaskService);
  private readonly _router = inject(Router);

  loading = signal(false);

  idTask = input.required<string>();

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required),
  });

  constructor() {
    effect(() => {
      const id = this.idTask();
      if (id) {
        this.getTask(id);
      }
    })
  }

  async submit() {
    if (this.form.invalid) return;

    try {
      this.loading.set(true);
      const { title, completed } = this.form.value;
      const task: TaskCreate = {
        title: title ?? '',
        completed: !!completed,
      };

      const id = this.idTask();

      await (id
        ? this._taskService.update(id, task)
        : this._taskService.create(task));

      toast.success(`Tarefa ${id ? 'atualizada' : 'criada'} com sucesso!`);
      this._router.navigateByUrl('/tasks');

    } catch (error) {
      toast.error('Ocorreu um erro ao criar a tarefa!');
    } finally {
      this.loading.set(false);
    }
  }

  async deleteTask(id: string) {
    try {
      await this._taskService.delete(id);
      toast.success('Tarefa excluída com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir a tarefa.');
      console.error(error);
    }
  }

  async getTask(id: string) {
    const taskSnapshot = await this._taskService.getTask(id);

    if(!taskSnapshot.exists()) return;

    const task = taskSnapshot.data() as Task;

    this.form.patchValue(task);
  }
}
