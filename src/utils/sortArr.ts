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
      //   console.log('dateMili1', date1.getMilliseconds());
      //   console.log('dateMili2', date2.getMilliseconds());

      //   console.log('date1', date1.getTime());
      //   console.log('date2', date2.getTime());
      //   console.log(
      //     'Result',
      //     date1.getTime() - date1.getMilliseconds() ===
      //       date2.getTime() - date2.getMilliseconds(),
      //   );
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
