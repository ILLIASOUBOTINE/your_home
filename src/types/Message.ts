import {DateFromFirestore} from '../utils/convertTask';

export interface MessageForRedux {
  id: string;
  text: string;
  date: string;
  idUser: string;
  idUserAnsswer: string | null;
}

export interface MessageFromFirestore {
  id: string;
  text: string;
  date: DateFromFirestore;
  idUser: string;
  idUserAnsswer: string | null;
}

export interface Message {
  text: string;
  date: Date;
  idUser: string;
  idUserAnsswer: string | null;
}
