import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../../service/account.service';
import { AccountType } from '../../account.model';
import { Currency } from '../../account.model';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  accountForm!:FormGroup;
  accountTypeValues : AccountType[] = [ 0,1];
  currencyValues : Currency[]= [0,1,2] ;
  x : Currency = 0;
  constructor(private formBuilder: FormBuilder,private accountService : AccountService) { 
    //this.keys = Object.keys(this.countries).filter(k => !isNaN(Number(k)));
  }
  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      accountType : 0,
      currency : 0,
      iban : [""],
      userId : [""]
    })
  }
  addAccount(){
    const id = localStorage.getItem("id");
    this.accountForm.patchValue({userId:id});
    console.log(this.accountForm.value);
   this.accountService.createAccounts(this.accountForm).subscribe(response=>console.log(response));
  }
  triggerResize(){

  }
}