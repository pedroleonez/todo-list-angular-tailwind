import { Component, effect, input } from '@angular/core';
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

}
