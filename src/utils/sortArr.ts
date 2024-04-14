import {TaskForRedux} from '../types/Task';
import {dateFromReduxToDate} from './convertTask';

export const sortArrSchedule = (arrSchedule: TaskForRedux[]) => {
  const arrSortedByDateSchedule = [...arrSchedule];
  arrSortedByDateSchedule.sort((t1, t2) => {
    if (t1.dateSchedule !== null && t2.dateSchedule !== null) {
      const date1 = dateFromReduxToDate(t1.dateSchedule);
      const date2 = dateFromReduxToDate(t2.dateSchedule);

      if (date1.getTime() < date2.getTime()) return -1;
      if (date1.getTime() > date2.getTime()) return 1;
      return 0;
    }
    return 0;
  });

  const arrSorted: TaskForRedux[][] = [];
  let indexCurrent = 0;

  while (indexCurrent < arrSortedByDateSchedule.length) {
    const arrGroup: TaskForRedux[] = new Array();
    for (let j = indexCurrent; j < arrSortedByDateSchedule.length; j++) {
      const date1 = dateFromReduxToDate(
        arrSortedByDateSchedule[indexCurrent].dateSchedule!,
      );
      const date2 = dateFromReduxToDate(
        arrSortedByDateSchedule[j].dateSchedule!,
      );

      if (
        date1.getTime() - date1.getMilliseconds() ===
        date2.getTime() - date2.getMilliseconds()
      ) {
        arrGroup.push(arrSortedByDateSchedule[j]);
        if (j == arrSortedByDateSchedule.length - 1) {
          indexCurrent = j + 1;
        }
      } else {
        indexCurrent = j;

        break;
      }
    }
    arrSorted.push(arrGroup);
  }
  return arrSorted;
};

export const sortArrCompleted = (arrCompleted: TaskForRedux[]) => {
  const arrSortedByDateCompleted = [...arrCompleted];
  arrSortedByDateCompleted.sort((t1, t2) => {
    if (t1.dateCompleted !== null && t2.dateCompleted !== null) {
      const date1 = dateFromReduxToDate(t1.dateCompleted);
      const date2 = dateFromReduxToDate(t2.dateCompleted);

      if (date1.getTime() < date2.getTime()) return -1;
      if (date1.getTime() > date2.getTime()) return 1;
      return 0;
    }
    return 0;
  });

  const arrSorted: TaskForRedux[][] = [];
  let indexCurrent = 0;

  while (indexCurrent < arrSortedByDateCompleted.length) {
    const arrGroup: TaskForRedux[] = new Array();
    for (let j = indexCurrent; j < arrSortedByDateCompleted.length; j++) {
      const date1 = dateFromReduxToDate(
        arrSortedByDateCompleted[indexCurrent].dateCompleted!,
      );
      const date2 = dateFromReduxToDate(
        arrSortedByDateCompleted[j].dateCompleted!,
      );

      if (
        date1.getTime() - date1.getMilliseconds() ===
        date2.getTime() - date2.getMilliseconds()
      ) {
        arrGroup.push(arrSortedByDateCompleted[j]);
        if (j == arrSortedByDateCompleted.length - 1) {
          indexCurrent = j + 1;
        }
      } else {
        indexCurrent = j;

        break;
      }
    }
    arrSorted.push(arrGroup);
  }
  return arrSorted;
};
