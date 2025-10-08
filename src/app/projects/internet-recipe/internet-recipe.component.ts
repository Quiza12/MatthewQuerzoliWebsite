import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-internet-recipe',
  standalone: true,
  imports: [InfiniteScrollModule, CommonModule],
  templateUrl: './internet-recipe.component.html',
  styleUrl: './internet-recipe.component.css'
})
export class InternetRecipeComponent {
  items = Array.from({ length: 492 }, (_, i) => `Item #${i + 1}`);

  onScroll(): void {
    const nextItems = Array.from({ length: 20 }, (_, i) => `Item #${this.items.length + i + 1}`);
    this.items = [...this.items, ...nextItems];
  }
}
