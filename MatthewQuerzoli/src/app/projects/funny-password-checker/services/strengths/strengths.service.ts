import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StrengthsService {

  hiddenFalseCount: any;
  hiddenTrueCount: any;
  tempReasons: string[] = [];

  strengthReasons = [
    { reason: "Your password is not at least 8 characters long.", tag: "length", hidden: false, answer:"Pretty self-explanatory, don't you think?"},
    { reason: "Your password does not contain numbers.", tag: "numerics", hidden: false, answer:"Same with this one."},
    { reason: "Your password does not contain special characters.", tag: "specialChars", hidden: false, answer:"And this."},
    { reason: "Your password does not contain any uppercase letters.", tag: "uppercase", hidden: false, answer:"Yawn."},
    { reason: "Your password does not contain any lowercase letters.", tag: "lowercase", hidden: false, answer:"C'mon."},
    { reason: "Your password quite literally contains the word 'password'. You're a dickhead.", tag: "password", hidden: true, answer:"JuSt ReAD tHe ReASoN."},
    { reason: "Your password does not contain the name of any NSYNC members.", tag: "nsync", hidden: false, answer:"Justin Timberlake, JC Chasez, Chris Kirkpatrick, Joey Fatone, or Lance Bass. Legends in their own lunchtimes."},
    { reason: "Your password does not contain any swear words.", tag: "swearWords", hidden: false, answer:"Fuck, shit...all that fun stuff."},
    { reason: "Your password has a series of sequential numbers. For the love of God, fix that shit.", tag: "sequentialNumbers", hidden: true, answer:"You have numbers that are in a row, like 1234."},
    { reason: "Your password does not contain the winning margin of the famous 2005 AFL Grand Final.", tag: "grandFinal", hidden: false, answer:"4! COX THROWS IT ONTO THE LEFT. ONE LAST ROLE OF THE DICE FOR THE EAGLES! LEO BARRY YOU STAR!"},
    // { reason: "Your password does not contain any of the script of 'Lorum Ipsum'.", tag: "lorum", hidden: false},//to do
    { reason: "Your password contains zero references to Jesus, you heathen.", tag: "jesus", hidden: false, answer:"Christ/Jesus/Lord/God on a bike."},
    { reason: "Your password contains racist terms. You need to check your morals more than your password.", tag: "racist", hidden: true, answer:"You've mentioned something like 'wog' or 'n*****' in your password."},
    { reason: "Your password contains a penis. No wonder it's so insecure: it's short as.", tag: "penis", hidden: true, answer:"Remove that dick, cock, willy, prick, knob, rod or phallus reference."},
    { reason: "Your password does not contain a vagina. Should put one in. They're bloody (sorry) strong.", tag: "vagina", hidden: false, answer:"Include a vagina, coochie, c*** (cunt), pussy, snatch, beaver, flower or peach reference."},
    { reason: "Don't tell me your favourite number is 7? Be original. Get a new one.", tag: "seven", hidden: true, answer:"11 - 4 = Not needed in your password."},
    { reason: "Chuck a cheeky Avenger in there for some more security.", tag: "avengers", hidden: false, answer:"Wrack your brains and think of an Avenger, or get out of that rock you're living under."},
    { reason: "Oh boy. Your password contains the name of a dead Avenger. They're not going to be of much use. #thanosdidnothingwrong", tag: "avengersDead", hidden: true, answer:"Sorry if you haven't seen Infinity War, but Spiderman (and some others) die at the end."},
    { reason: "The brand of gel that Pauly D uses could help harden not just his follicles, but your password too.", tag: "gel", hidden: false, answer:"Spiker-Gel. Yes, I had to look that up too."},
    { reason: "Genghis Khan conquered huge chunks of central Asia and China back in the day. He'd be a good addition to your password.", tag: "genghis", hidden: false, answer:"Genghis. Motherfucking. Khan."},
    { reason: "The name of the loveable volleyball companion to Tom Hanks would help keep your password from being lonely.", tag: "wilson", hidden: false, answer:"That loveable blood-smeared volleyball was called 'Wilson.'"},
    { reason: "Your password should also be emotionally resilient. Tell it you love it, no matter what.", tag: "love", hidden: false, answer:"Type: \"I love you, Password.\""},
    { reason: "Blue magic pill? Get your password to ingest that (think less Matrix and more Pfizer).", tag: "viagra", hidden: false, answer:"Viagra, of course!"},
    { reason: "The Devil Wears _____ is a fantastic movie and should be referenced anywhere.", tag: "prada", hidden: false, answer:"Prada. Streep was stellar. Isn't she always? (rhetorical question)"},
    { reason: "How much does your password lift, bro? 10kg? 30kg? 200kg? Never skip password day. Bro.", tag: "lift", hidden: false, answer:"Like 2kg or 3kg. Or more, whatever. Gains."},
    { reason: "Get a copyright symbol in there. Make it intellectually strong.", tag: "copyright", hidden: false, answer:"©"},
    { reason: "Alright. Go on. Chuck an emoji in there.", tag: "emoji", hidden: false, answer:"😂 🍆 💦 🔥. Yeet."},
    { reason: "Garlic is strong. Hackers are pale, scrawny creatures, like vampires. Ward them off with it.", tag: "garlic", hidden: false, answer:"Garlic. Duh."},
    { reason: "\"N-now th-that that don't kill me\" once said the infamous Kanye West. What's the next line?", tag: "kanye", hidden: false, answer:"\"Can only make me stronger!\""},
    { reason: "A bit of Aussie music trivia. It's the only Midnight Oil song with the word \'strong\' in the title.", tag: "oils", hidden: false, answer:"\'Only the Strong\', off the legendary \'10,9,8,7,6,5,4,3,2,1.\'"},
    { reason: "What did Mr Strong eat that made him so thicc?", tag: "eggs", hidden: false, answer:"Eggs. Too much to be healthy."},
    { reason: "It seems you have slipped in a synonym for 'weak'. Purge the bad boy.", tag: "synonym", hidden: true, answer:"Shit like: watery, washy, unaccented, light, fallible, frail, imperfect."},
    { reason: "If you can dodge a wrench you can dodge a ____. Or a hacker.", tag: "wrench", hidden: false, answer:"Wrench. The Ocho said so."},
    { reason: "Tell you what's hard? Pistachio shells. Tell us your favourite nut.", tag: "nuts", hidden: false, answer:"Mine, for example, is the almond."},
    { reason: "The name of the strong little men that you hire to climb Everest with you. Empahsis on you. I've no wish to do that.", tag: "sherpa", hidden: false, answer:"Sherpas! Mad dogs."},
    { reason: "Trivia time: How easy is it to keep a Prime Minister for a full term in office in Australia? a) Easy, b) Hard, c) Frigging impossible", tag: "pm", hidden: false, answer:"This will be news to the global audience, but it's B or C."},
    { reason: "It's known as the black dog. A prick to get rid of, and like your password, your approach to mental health should be equally as strong.", tag: "depression", hidden: false, answer:"Depression and/or anxiety is a piece of shit. Take care of your body AND your mind."},
    { reason: "\"There's no aphrodisiac like...\" Like what? Possibly a hard-to-crack password. You might want to check out the Whitlams for this answer.", tag: "whitlams", hidden: false, answer:"Loneliness!"},
    { reason: "This bone is tougher than concrete. Name it to shore your password up.", tag: "bone", hidden: false, answer:"Thigh/femur."},
    { reason: "C'mon, mate. You've put a weak base/acid in your password. Get rid of it.", tag: "acid", hidden: true, answer:"Had to Google this one too: formic, acetic, trichloroacetic, hydrofluoricammonia, pyridine, ammoniu and hyroxide (among others)."},
    { reason: "You've got a piss-weak beer called Corona in your password. Exorcise it please.", tag: "corona", hidden: true, answer:"Corona is like flavoured water. Good for a session beer but not much else."}
    // { reason: "", tag: "", hidden: false, answer:""},
  ];

  clearTempArray() {
    this.tempReasons = [];
  }

  getTempListLength() {
    return this.tempReasons.length;
  }

  addToTempArray(reason:string) {
    this.tempReasons.push(reason);
  }

  determineHiddenCount() {
    for (var i = 0; i < this.strengthReasons.length; i++) {
      this.strengthReasons[i].hidden ? this.hiddenTrueCount++ : this.hiddenFalseCount++;
    }
  }

  getHiddenTrueCount() {
    return this.hiddenTrueCount;
  }

  getHiddenFalseCount() {
    return this.hiddenFalseCount;
  }

  setCountsToZero() {
    this.hiddenTrueCount = 0;
    this.hiddenFalseCount = 0;
  }

}
