import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/account/service/account.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  accId !:string ;
  constructor(private account : AccountService,private Ref: MatDialogRef<DeleteModalComponent>, @Inject(MAT_DIALOG_DATA) public data: string)  {this.accId=data }

  ngOnInit(): void {
  }

  agree(){
    this.account.deleteAccount(this.accId).subscribe(response=>this.Ref.close(response));
  }
  disagree(){
    this.Ref.close();
  }
}
