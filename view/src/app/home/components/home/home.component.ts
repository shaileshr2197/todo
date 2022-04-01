import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public showOverlay = false;

  public formEdit: any;

  public task:FormGroup = new FormGroup({
    name:new FormControl('',Validators.required),
    due:new FormControl('')
  })

  constructor(private service:HomeService) { }

  ngOnInit(): void {
  }

  public toggle(){
    this.showOverlay = !this.showOverlay;
  }

  public edit(data:any){
    this.formEdit = data;
    this.task.controls.name.setValue(data.item.name);
    this.task.controls.due.setValue(data.item.due);
    this.toggle();
  }

  public addTask(){
    const data:any = {
      name:this.task.value.name,
      due:this.task.value.due,
      status:''
    }
    if(this.formEdit){
      this.service.updateData(this.formEdit?.index,this.formEdit?.type,data);
      this.formEdit = null;
    } else {
      data.id = '';
      this.service.addData(data);
    }
    this.task.reset();
    this.toggle()
  }

}
