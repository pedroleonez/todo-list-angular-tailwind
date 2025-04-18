import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskCreate, TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export default class TaskFormComponent {

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _taskService = inject(TaskService);
  private readonly _router = inject(Router);

  isEdit = false;
  pageTitle = '';
  pageSubtitle = '';

  loading = signal(false);

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required)
  })

  ngOnInit() {
    const currentUrl = this._router.url;
    const isEdit = currentUrl.includes('edit');

    this.isEdit = isEdit;
    this.pageTitle = isEdit ? 'Editar Tarefa' : 'Criar Tarefa';
    this.pageSubtitle = isEdit ? 'Novo título para a tarefa:' : 'Título da tarefa:';
  }

  async submit() {
    if (this.form.invalid) return;

    try {
      this.loading.set(true);
      const { title, completed } = this.form.value;
      const task: TaskCreate = {
        title: title ?? '',
        completed: !!completed
      };

      await this._taskService.create(task);
      toast.success('Tarefa criada com sucesso!');
      this._router.navigateByUrl('/tasks');

    } catch (error) {

      toast.error('Ocorreu um erro ao criar a tarefa!');

    } finally {
      this.loading.set(false);
    }
  }
}
