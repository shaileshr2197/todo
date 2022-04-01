import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { task } from '../../home.interface';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})

export class ActivitiesComponent implements OnInit {

  @Output() editTask:EventEmitter<any> = new EventEmitter();

  constructor(private service:HomeService) { }

  public items = this.service.state;

  public enableDelete=this.service.deleteTask;

  public toggled = true;

  public selectAll = false;

  ngOnInit(): void {
  }

  public edit(index:number,item:task,type:string){
    this.editTask.emit({index,item,type});
  }

  public completed(index:number,item:task){
    document.getElementById(''+index)?.classList.add('scale');
    setTimeout(() => {
      this.service.completed(index,item);
    }, 1000);
  }

  public toggle(){
    this.toggled = !this.toggled;
  }

  public toggleDelete(type:string){
    this.service.delete(type);
  }

  public markDelete(key:number,type:string){
    this.service.markDelete(key,type);
  }

  public cancelDelete(){
    this.service.markAllDelete('');
    this.toggleDelete('off');
  }

  public markAll(){
    this.selectAll = !this.selectAll;
    this.service.markAllDelete(this.selectAll ? 'marked' : '');
  }

  public confirmDelete(){
    this.service.confirmDelete();
  }

}
