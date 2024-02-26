export interface Ticket {
  id?: number;
  boxesArray: Box[];
  superzahl?: number | null;
}

export interface Box {
  numbers: number[];
}
  