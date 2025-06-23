import { Component } from '@angular/core';
import { StrengthsService } from '../../../services/strengths/strengths.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fpc-answers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fpc-answers.component.html',
  styleUrl: './fpc-answers.component.css'
})
export class FpcAnswersComponent {

  reasonsAndAnswers: any[] = [];

  constructor(private strengthsService:StrengthsService) { }

  ngOnInit() {
    this.reasonsAndAnswers = this.strengthsService.strengthReasons;
  }

  getReasonsAndAnswers() {
    return this.reasonsAndAnswers;
  }

}
