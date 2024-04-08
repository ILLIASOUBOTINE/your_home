import {TaskForRedux, TaskFromFirestore} from '../types/Task';

export interface DateFromFirestore {
  nanoseconds: number;
  seconds: number;
}

export const dateFromReduxToDate = (dateRedux: string) => {
  return new Date(dateRedux);
};

export const dateFromReduxToTime = (dateRedux: string) => {
  const date = new Date(dateRedux);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  let minutesString = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutesString + ampm;
};

export const dateFromReduxToDateWithoutYear = (dateRedux: string) => {
  const date = new Date(dateRedux);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};
export const dateFromReduxToDateWithYear = (dateRedux: string) => {
  const date = new Date(dateRedux);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};

export const dateFromFirestoreToDateString = (
  dateFirestore: DateFromFirestore,
) => {
  const date = new Date(
    dateFirestore.seconds * 1000 + dateFirestore.nanoseconds / 1000000,
  );
  return date.toISOString();
};

export const taskFromFirestoreTOTaskForRedux = (tasks: TaskFromFirestore[]) => {
  const newTasks: TaskForRedux[] = [];
  tasks.forEach(task => {
    const taskRedux = {
      id: task.id,
      title: task.title,
      description: task.description,
      photos: task.photos,
      status: task.status,
      schedule: task.schedule,
      dateSchedule: task.dateSchedule
        ? dateFromFirestoreToDateString(task.dateSchedule)
        : null,
      userId: task.userId,
      dateCreation: dateFromFirestoreToDateString(task.dateCreation),
      dateCompleted: task.dateCompleted
        ? dateFromFirestoreToDateString(task.dateCompleted)
        : null,
    };
    newTasks.push(taskRedux);
  });
  return newTasks;
};
