import {TaskForRedux, TaskFromFirestore} from '../types/Task';

export interface DateFromFirestore {
  nanoseconds: number;
  seconds: number;
}

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
    let dateSchedule: null | string = null;
    let dateCreation: string;
    let dateCompleted: null | string = null;

    if (task.dateSchedule != null) {
      dateSchedule = dateFromFirestoreToDateString(task.dateSchedule);
    }
    if (task.dateCompleted != null) {
      dateCompleted = dateFromFirestoreToDateString(task.dateCompleted);
    }
    dateCreation = dateFromFirestoreToDateString(task.dateCreation);

    const taskRedux = {
      id: task.id,
      title: task.title,
      description: task.description,
      photos: task.photos,
      status: task.status,
      schedule: task.schedule,
      dateSchedule: dateSchedule,
      userId: task.userId,
      dateCreation: dateCreation,
      dateCompleted: dateCompleted,
    };
    newTasks.push(taskRedux);
  });
  return newTasks;
};
