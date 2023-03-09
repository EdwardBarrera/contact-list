import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IContact } from 'src/app/models/contact.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact-row',
  templateUrl: './contact-row.component.html',
  styleUrls: ['./contact-row.component.css']
})
export class ContactRowComponent implements OnInit{

  @Input() data!: IContact;
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  editMode = false;
  contactForm!: FormGroup;
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl(this.data.name, [Validators.required]),
      address: new FormControl(this.data.address, [Validators.required]),
      phone: new FormControl(this.data.phone, [Validators.required]),
      email: new FormControl(this.data.email, [Validators.required,Validators.email]),
    })
  }
  
  onSubmit() {
    if(this.contactForm.invalid) return;
    this.onEdit.emit({...this.contactForm.value,_id:this.data._id})
  }

  onRemove(){
  }

  
}
