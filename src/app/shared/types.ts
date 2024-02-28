export interface Ticket {
  id?: number;
  boxesArray: Box[];
  superzahl?: number | null;
  boxes?: Box[];
}

export interface Box {
  numbers: number[];
}

export interface NumberFrequency {
  number: number;
  frequency: number;
}
  