import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bingo',
  standalone: true,
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css'],
  imports: [FormsModule]
})
export class BingoComponent {
  readonly size = 5;
  values: any;
  bingoArray: string[] = [
    "Mum and bub are both doing well", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
    "twenty", "twenty-one", "twenty-two", "twenty-three", "twenty-four", "twenty-five", "twenty-six", "twenty-seven", "twenty-eight", "twenty-nine", "thirty"
  ]
  footyArray: string[] = [
    "FOOTY", "BALL", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
    "twenty", "twenty-one", "twenty-two", "twenty-three", "twenty-four", "twenty-five", "twenty-six", "twenty-seven", "twenty-eight", "twenty-nine", "thirty"
  ]
  harroArray: string[] = [
    "HARRO", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
    "twenty", "twenty-one", "twenty-two", "twenty-three", "twenty-four", "twenty-five", "twenty-six", "twenty-seven", "twenty-eight", "twenty-nine", "thirty"
  ]

  cards = ['Select a card...', 'Newborn', 'Footy', 'Harro'];
  bingoTileSize = 0;

  newbornCardSelected = false;
  footyCardSelected = false;
  harroCardSelected = false;

  // Create a 5×5 array of values
  loadBingoCard(array: String[]) {
    this.values = this.toMatrix(array, this.size);
    this.bingoTileSize = array.length;
  }

  toMatrix(array: any[], size: number): any[][] {
    const matrix = [];
    for (let i = 0; i < array.length; i += size) {
      matrix.push(array.slice(i, i + size));
    }
    return matrix;
  }

  // Track selected cells
  selected = new Set<string>();

  onCardChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    console.log('Selected card:', value);
    switch (value) {
      case 'Newborn': this.newbornCardSelected = true; this.loadBingoCard(this.bingoArray); break;
      case 'Footy': this.footyCardSelected = true; this.loadBingoCard(this.footyArray); break;
      case 'Harro': this.harroCardSelected = true; this.loadBingoCard(this.harroArray); break;
      default: this.noCardSelected();
    }
  }

  isCardSelected(): boolean {
    return this.newbornCardSelected || this.footyCardSelected || this.harroCardSelected;
  }

  noCardSelected() {
    this.newbornCardSelected = false;
    this.footyCardSelected = false;
    this.harroCardSelected = false;
  }

  key(row: number, col: number) {
    return `${row}-${col}`;
  }

  isSelected(row: number, col: number) {
    return this.selected.has(this.key(row, col));
  }

  toggle(row: number, col: number) {
    const k = this.key(row, col);
    if (this.selected.has(k)) {
      this.selected.delete(k);
    } else {
      this.selected.add(k);
      this.isComplete();
    }
  }

  isComplete() {
    if (this.selected.size == this.bingoTileSize) {
      console.log("COMPLETE");
    }
  }

  getValue(row: number, col: number) {
    return this.values[row][col];
  }
}
