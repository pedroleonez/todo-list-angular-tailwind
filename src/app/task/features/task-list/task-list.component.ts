import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-task-list',
  imports: [TableComponent, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  providers: [TaskService],
})
export default class TaskListComponent {
  taskService = inject(TaskService);

  async deleteTask(id: string) {
    try {
      await this.taskService.delete(id);
      toast.success('Tarefa excluída com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir a tarefa.');
      console.error(error);
    }
  }

}
