import {DateFromFirestore} from '../utils/convertTask';

export interface MessageForRedux {
  id: string;
  text: string;
  date: string;
  idUser: string;
}

export interface MessageFromFirestore {
  id: string;
  text: string;
  date: DateFromFirestore;
  idUser: string;
}

export interface Message {
  text: string;
  date: Date;
  idUser: string;
}
