import { AfterViewInit, Component } from '@angular/core';
import { IContact } from './models/contact.model';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  contacts: IContact[] = []
  load=false
  constructor(private api: ApiService) { }
  ngAfterViewInit(): void {
    this.getAllContacts()
  }
  getAllContacts() {
    this.api.getContacts().subscribe({
      next: (res:IContact[]) => {
        this.contacts = res
        this.load=true
      },
      error: () => {
        alert("Error getting contacts")
      }
    })
  }
  updateContact(data:IContact) {
    this.api.updateContact(data).subscribe({
      next:()=>{
        this.getAllContacts()
      },
      error:()=>{
        alert("Error updating contact")
      }
    })
  }

  deleteContact(id:string){
    this.api.deleteContact(id).subscribe({
      next:()=>{
        this.getAllContacts()
      },
      error:()=>{
        alert("Error deleting contact")
      }
    })
  }

}
