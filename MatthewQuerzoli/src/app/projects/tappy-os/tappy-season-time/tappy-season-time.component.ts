import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tappy-season-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tappy-season-time.component.html',
  styleUrl: './tappy-season-time.component.css'
})
export class TappySeasonTimeComponent implements OnInit {

  isSummer: boolean = false;
  isSpring: boolean = false;
  isWinter: boolean = false;

  today = new Date();

  springStart = new Date(new Date().getFullYear()+1, 0, 7);
  summerStart = new Date(new Date().getFullYear(), 0, 25);
  winterStart = new Date(new Date().getFullYear(), 1, 15);

  backgroundColour: string = '#FFFFFF';

  winterColour = '#72DDF7';
  summerColour = '#FEFFA5';
  springColour = '#81F499';

  dayMonthOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric'
  };

  dayMonthYearOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  ngOnInit(): void {
    this.determineSeason();
  }

  determineSeason() {
    console.log('Today: ' + this.today.toLocaleDateString(undefined, this.dayMonthYearOptions));

    if (this.today.getTime() >= this.springStart.getTime() && this.today.getTime() < this.summerStart.getTime()) {
      this.isSpring = true;
      this.backgroundColour = this.springColour;
    } else if (this.today.getTime() >= this.summerStart.getTime() && this.today.getTime() < this.winterStart.getTime()) {
      this.isSummer = true;
      this.backgroundColour = this.summerColour;
    } else if (this.today.getTime() >= this.winterStart.getTime() && this.today.getTime() < this.springStart.getTime()) {
      this.isWinter = true;
      this.backgroundColour = this.winterColour;
    } 
  }

  formattedSeasonRangeString(startDate: Date, endDate: Date) {
    let endDateMinusDay = new Date(endDate);
    endDateMinusDay.setDate(endDateMinusDay.getDate() - 1);

    return startDate.toLocaleDateString(undefined, this.dayMonthOptions) + ' to ' + endDateMinusDay.toLocaleDateString(undefined, this.dayMonthOptions);
  }

}
