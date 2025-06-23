import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  public password:string;
  public passwordStrength:any;

  constructor(){
    this.password = '';
    this.passwordStrength = 0;
  }

  setData (newPassword: any) {
    this.password = newPassword;
  }

  getData () {
    return this.password;
  }

}

//this.passwordService.getData().length
