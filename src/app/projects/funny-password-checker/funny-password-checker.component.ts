import { Component, OnInit } from '@angular/core';
import { StrengthsService } from './services/strengths/strengths.service';
import { PasswordService } from './services/password/password.service';
import { FormComponent } from './components/form/form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funny-password-checker',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './funny-password-checker.component.html',
  styleUrl: './funny-password-checker.component.css'
})
export class FunnyPasswordCheckerComponent implements OnInit {

  title = 'app';
  tempReasons: any[] = [];
  password:any;
  passwordStrength:any = this.passwordService.passwordStrength;
  strengthListLength:number = 0;
  tempListLength:number = 0;
  reasons: string[] = [];

  constructor(private strengthsService:StrengthsService, private passwordService:PasswordService) { }

  ngOnInit() {
    this.strengthsService.setCountsToZero();
    this.strengthsService.determineHiddenCount();
    this.reasons = this.getReasonsForPassword();
    this.passwordService.setData('');
  }

  getReasonsForPassword() {
    if (this.tempListLength !== undefined) {
      this.strengthListLength = this.strengthsService.getHiddenFalseCount();
    }
    this.tempListLength = this.strengthsService.getTempListLength();
    return this.strengthsService.tempReasons;
  }

  getPassword() {
    return this.passwordService.getData();
  }

  getPasswordStrength() {
    this.tempReasons = this.strengthsService.tempReasons;
    return this.strengthListLength - this.tempListLength;
  }

  getPasswordLength() {
    this.password = this.passwordService.getData();
    if ((this.password.length) !== undefined) {
      return this.password.length;
    } else {
      return 0;
    }
  }

  getTempReasonsLength() {
    this.tempReasons = this.strengthsService.tempReasons;
    if ((this.tempReasons.length) !== undefined) {
      return this.tempReasons.length;
    } else {
      return 0;
    }
  }

  getCharactersString() {
    if ((this.passwordService.getData().length) == 1) {
      return 'character';
    } else {
      return 'characters';
    }
  }

  getEncouragement() {
    if ((this.getPasswordStrength()) > 0 && (this.getPasswordStrength()) < 4) {
      return 'You might as print out your password and put it on a billboard.';
    } else if ((this.getPasswordStrength()) >= 4 && (this.getPasswordStrength()) < 8) {
      return 'Better, but need to pump more iron.';
    } else if ((this.getPasswordStrength()) >= 8 && (this.getPasswordStrength()) < 12) {
      return 'Harder...';
    } else if ((this.getPasswordStrength()) >= 12 && (this.getPasswordStrength()) < 16) {
      return 'They\'ll have a hard time with this.';
    } else if ((this.getPasswordStrength()) >= 16 && (this.getPasswordStrength()) < 20) {
      return 'Work it [desired gender term].';
    } else if ((this.getPasswordStrength()) >= 20 && (this.getPasswordStrength()) < 24) {
      return 'Oh yes...';
    } else if ((this.getPasswordStrength()) >= 24 && (this.getPasswordStrength()) < 28) {
      return 'Oh jeez, keep doing that with your tongue.';
    } else if ((this.getPasswordStrength()) >= 28 && (this.getPasswordStrength()) < 32) {
      return 'Yes...';
    } else if ((this.getPasswordStrength()) >= 32 && (this.getPasswordStrength()) < 36) {
      return 'GOD ALMIGHTY';
    } else if ((this.getPasswordStrength()) >= 36 && (this.getPasswordStrength()) < 40) {
      return 'NO ONE\'S GETTING PAST THIS!';
    } else {
      return 'Hello'
    }
  }

}
