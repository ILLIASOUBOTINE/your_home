import {MessageForRedux, MessageFromFirestore} from '../types/Message';
import {
  dateFromFirestoreToDateString,
  dateFromReduxToDate,
} from './convertTask';

export const messageFromFirestoreTOMessageForRedux = (
  messages: MessageFromFirestore[],
): MessageForRedux[] => {
  const newMessages: MessageForRedux[] = [];
  messages.forEach(message => {
    newMessages.push({
      id: message.id,
      text: message.text,
      idUser: message.idUser,
      idUserAnsswer: message.idUserAnsswer,
      date: dateFromFirestoreToDateString(message.date),
    });
  });
  return newMessages;
};

export const sortArrMessages = (arr: MessageForRedux[]) => {
  const arrSortedByDate = [...arr];
  arrSortedByDate.sort((t1, t2) => {
    const date1 = dateFromReduxToDate(t1.date);
    const date2 = dateFromReduxToDate(t2.date);

    if (date1.getTime() < date2.getTime()) return -1;
    if (date1.getTime() > date2.getTime()) return 1;
    return 0;
  });

  return arrSortedByDate;
};
