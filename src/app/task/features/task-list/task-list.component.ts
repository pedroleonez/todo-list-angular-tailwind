import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [TableComponent, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export default class TaskListComponent {

}
