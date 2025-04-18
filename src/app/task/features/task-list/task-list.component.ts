import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../data-access/task.service';

@Component({
  selector: 'app-task-list',
  imports: [TableComponent, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export default class TaskListComponent {
  taskService = inject(TaskService);

}
