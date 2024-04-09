import {DateFromFirestore} from '../utils/convertTask';

export interface MessageForRedux {
  id: string;
  text: string;
  date: string;

  isAnswer: boolean;
}

export interface MessageFromFirestore {
  id: string;
  text: string;
  date: DateFromFirestore;
  isAnswer: boolean;
}

export interface Message {
  text: string;
  date: Date;
  isAnswer: boolean;
}
