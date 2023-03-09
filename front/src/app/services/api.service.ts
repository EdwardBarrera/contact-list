import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getContacts(){
    return this.http.get<IContact[]>("http://localhost:3000/api/contacts")
  }

  updateContact(data:IContact){
    return this.http.put<any>("http://localhost:3000/api/contacts/",data)
  }

  deleteContact(id:any){
    return this.http.delete<any>("http://localhost:3000/api/contacts?id="+id)
  }
}
