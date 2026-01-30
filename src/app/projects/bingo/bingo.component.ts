import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bingo',
  standalone: true,
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css'],
  imports: [FormsModule, UpperCasePipe]
})
export class BingoComponent {

  readonly size = 5;
  selected = new Set<number>();
  tiles: any;
  selectedCard: any;
  win: boolean = false;

  newbornTiles: string[] = [
    "Mum and bub are both doing well", "Our family of [number] is about to become [new number]!", "Last weekend as a family of [number] (reference to a babymoon)", "Mum/[partner's name] is an absolute champion", "Our hearts are so full", "Our biggest blessing", "Using the royal 'We'", "Our family is growing", "We can't wait to meet [her/him]", "[name] is going to be a big [brother/sister] (if dog owners or already have an elder sibling)", "My/our world", "[name], born [date], weighing [weight]", "Can't wait to meet our little [guy/girl] on [expected date]", "Our little miracle", "Changing our lives for the better", "We've been keeping a little secret!", "We love you so much already", "We've completed our little family", "Baby [surname] loading, coming [month/year]", "Announcement on onesie with a picture of the ultrasound, surrounded by baby paraphernalia", "If pet owners, announcement with shot of pet, ultrasound and baby paraphernalia", "If not first child, announcement with shot of older sibling, ultrasound and '[older sibling name] can't wait to be a big [brother/sister]'"
  ]

  footyPlayerTiles: string[] = [
    "They can't run without legs", "It's nil-all boys", "When we play our best footy we can beat anyone in the comp", "PRESSURE", "They've run out of legs", "Do the one-percenters"
  ]

  footySpectatorTiles: string[] = [
    "BAAAAALLLLLLLL!", "BOOOOOOO!", "SPOIL!", "TACKLE!", "I can't watch", "All it deserved!", "Your eyes are painted on ump!", "You're joking/kidding!", "GIFTED!", "GOOD PRESSURE!", "IN THE BACK!", "HE'S TAKEN HIS HEAD OFF UMP!", "Textbook", "Possession footy", "Back to basics", "Get back, get back", "Open your eyes!"
  ]

  officeTiles: string[] = ["Synergies", "Impost", "Key takeaways", "Take this offline", "Touch base", "Actions out of this meeting/key action items", "On the same page", "Resources", "Moving/going forward", "Hey/hi gents [when a woman also on the email thread]", "Can I ask a dumb question?", "Circle back", "You're on mute", "Win/win", "Aligned", "Bring to the table", "Risk", "Hope this finds you well", "Deliverables", "A Teams/Slack message that is just 'Hi! How are you?'", "Just following up", "Skin in the game", "Move the goalposts", "Deep dive", "On a high level", "Leverage", "That's another discussion", "Benefit", "Agenda", "As discussed"];

  harroTiles: string[] = [
    "HARRO", "TEUTT", "TROTT", "BRAH", "PACK", "YEAH", "NAH", "GOAT", "CHICKS", "___SONS", "LAD", "LEGIT", "SCRUFF", "FIN"
  ]

  tysieTiles: string[] = [
    "Tysie", "Tooksie", "Pug", "Puggles", "Puglet", "Pugloot", "Little face", "Handsome", "Bobbinhead", "Zootie", "It's just his hair", "Chickie", "Snorkies/snorkiehead", "Biiiiig stretch", "Want to go on a W?", "Turtling", "Sniff sniff sniff", "Humpy dumpy", "Needs to make a padoonkie", "Made a doodle", "Puggles", "Tookie", "Stop riling Biscuit up", "Noonkie", "Red thing", "Good boy", "Bad", "Cutest little poppie", "He's just a pug", "Little grandpa"
  ]

  cards = ['Select a card...', 'Pregnant/newborn', 'Tysie', 'Footy (spectator)', 'Footy (player)', 'Office', 'Harro'];
  bingoTileSize: number = 0;

  newbornCardSelected = false;
  footySpectatorCardSelected = false;
  footyPlayerCardSelected = false;
  officeCardSelected = false;
  harroCardSelected = false;
  tysieCardSelected = false;

  onCardChange(event: Event) {
    this.selectedCard = (event.target as HTMLSelectElement).value;
    console.log('Selected card:', this.selectedCard);
    switch (this.selectedCard) {
      case 'Pregnant/newborn': this.newbornCardSelected = true; this.loadBingoCard(this.newbornTiles); break;
      case 'Footy (spectator)': this.footySpectatorCardSelected = true; this.loadBingoCard(this.footySpectatorTiles); break;
      case 'Footy (player)': this.footyPlayerCardSelected = true; this.loadBingoCard(this.footyPlayerTiles); break;
      case 'Tysie': this.tysieCardSelected = true; this.loadBingoCard(this.tysieTiles); break;
      case 'Office': this.officeCardSelected = true; this.loadBingoCard(this.officeTiles); break;
      case 'Harro': this.harroCardSelected = true; this.loadBingoCard(this.harroTiles); break;
      default: this.noCardSelected();
    }
  }

  loadBingoCard(array: String[]) {
    this.selected = new Set<number>();
    this.win = false;
    this.tiles = array;
    this.bingoTileSize = array.length;
  }

  isCardSelected(): boolean {
    return this.newbornCardSelected || this.footySpectatorCardSelected || this.footyPlayerCardSelected || this.officeCardSelected || this.harroCardSelected || this.tysieCardSelected;
  }

  noCardSelected() {
    this.newbornCardSelected = false;
    this.footySpectatorCardSelected = false;
    this.footyPlayerCardSelected = false;
    this.officeCardSelected = false;
    this.harroCardSelected = false;
    this.tysieCardSelected = false;
  }

  isSelected(index: number) {
    return this.selected.has(index);
  }

  toggle(index: number) {
    if (this.selected.has(index)) {
      this.selected.delete(index);
    } else {
      this.selected.add(index);
      this.isComplete();
    }
  }

  isComplete() {
    if (this.selected.size == this.bingoTileSize) {
      this.win = true;
    }
  }

  replay() {
    this.selected = new Set<number>();
    this.win = false;
  }
}
