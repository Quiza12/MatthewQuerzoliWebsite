export interface Song {
  id: string;
  title: string;
}

// YouTube IDs verified against YouTube's oEmbed endpoint (all embeddable).
// The first entry is the song the browser opens on.
export const SONGS: Song[] = [
  { id: 'RN9NC4iQcsA', title: 'Covered in Chrome' },
  { id: '_XvWcYTj6dc', title: 'Saramona Said' },
  { id: 'J6LM-5-oC-k', title: 'Dope Calypso' },
  { id: 'hRWi-SvzviY', title: 'Like Soda' },
  { id: 'qFbbZuO7f4E', title: 'No Shade' },
  { id: 'gOkFZR5_slk', title: 'Viceroy' },
  { id: 'OMFLlYjMh2E', title: 'Blanket' },
  { id: 'XmTFmf8DKBI', title: 'So Sentimental' },
  { id: 'petCM7yvhGo', title: 'Vacation Forever' },
  { id: '-ZTQnjeA8ow', title: 'Pick It Up Again' },
  { id: '_iS7zOcRKNQ', title: 'Slow Down Sonic' },
  { id: 'AKbVWHll1Sk', title: 'How To Taste' },
  { id: 'AazTavKYvUc', title: 'Fur Eyes' },
  { id: 'kzrAfkyq-xM', title: 'Jesus Stole My Girlfriend' },
  { id: '2kotmVEsA9I', title: 'Neighbour Neighbour' },
  { id: 'QRMFNDgMq-U', title: 'In the Aisle' },
  { id: 'gCokiQdX5i0', title: 'Muscle Junkie' },
  { id: 'mMbKZ-IW_8k', title: 'Tinderbox' },
  { id: 'ytsFPKOXY8M', title: 'Waco' },
  { id: 'DlCSvXIAk08', title: 'Canada (Live)' },
];
