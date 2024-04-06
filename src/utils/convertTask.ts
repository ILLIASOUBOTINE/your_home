import {TaskForRedux, TaskFromFirestore} from '../types/Task';

export interface DateFromFirestore {
  nanoseconds: number;
  seconds: number;
}

export const dateFromReduxToDate = (dateRedux: string) => {
  return new Date(dateRedux);
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
