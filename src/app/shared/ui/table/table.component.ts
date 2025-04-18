import { Component, input, output } from '@angular/core';
import { Task } from '../../../task/data-access/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  tasks = input.required<Task[]>();
  onDelete = output<string>();

  deleteTask(id: string) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.onDelete.emit(id);
    }
  }

}
