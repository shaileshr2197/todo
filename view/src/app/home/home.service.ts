import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from '../service/app.service';
import { NotificationService } from '../service/notification.service';
import { task } from './home.interface';

interface state{
  [todo:string]:task[],
  completed:task[]
}

@Injectable()

export class HomeService {


  constructor(private notification:NotificationService,private app:AppService) {
    // if(window.localStorage.getItem('state')){
      this.app.get('task').subscribe((data)=>{
        this.latestState = data.response;
        this.setData();
      })
      // this.latestState = JSON.parse(window.localStorage.getItem('state') || '');
      // this.setData();
    // }
  }

  public deleteTask:BehaviorSubject<string> = new BehaviorSubject('');

  private latestState:state = {
    todo:[],
    completed:[]
  }
  
  public state = new BehaviorSubject(this.latestState);

  public addData(data:task){
    this.app.post(data,'task').subscribe((data)=>{
      this.latestState.todo.push(data.tasks);
      this.setData();
      this.notification.updateSnackbar('Task added successfully !!!')
    })
  }

  public updateData(index:number,type:string,data:task){
    this.latestState[type][index] = {...this.latestState[type][index],...data};
    this.app.put(this.latestState[type][index],'task').subscribe((data)=>{
      console.log(data);
      this.setData();
      this.notification.updateSnackbar('Task updated successfully !!!')
    })
  }

  public completed(index:number,item:task){
    this.app.put({...this.latestState.todo[index],status:'completed'},'task').subscribe((data)=>{
      this.latestState.todo.splice(index,1);
      this.latestState.completed.push(item);
      this.setData();
      this.notification.updateSnackbar('Task completed successfully !!!')
    })
  }
  
  public setData(){
    this.state.next(this.latestState);
    window.localStorage.setItem('state',JSON.stringify(this.latestState))
  }

  public delete(status:string){
    this.deleteTask.next(status);
  }

  public markDelete(key:number,type:string){
    console.log(this.latestState[type][key].status ? '' : 'marked');
    this.latestState[type][key].status = this.latestState[type][key].status ? '' : 'marked';
    this.state.next(this.latestState);
  }

  public markAllDelete(type:string){
    this.latestState.todo.map((task)=>task.status = type);
    this.latestState.completed.map((task)=>task.status = type);
    this.state.next(this.latestState);
  }

  public confirmDelete(){
    const {todo,completed} = this.latestState;
    const ids: string[] = [];
    const pId = (x:task)=>{
      if(x.status == 'marked'){
        ids.push(x._id)
      }
      return !(x.status == 'marked')
    }
    this.latestState.todo = todo.filter(x=>pId(x));
    this.latestState.completed = completed.filter(x=>pId(x));
    console.log(ids);
    this.app.delete({ids},'task').subscribe((data)=>{
      this.setData();
      this.notification.updateSnackbar('Task(s) deleted successfully !!!')
    })
  }

}
