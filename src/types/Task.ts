import {DateFromFirestore} from '../utils/convertTask';

interface TaskBase {
  title: string;
  description: string;
  photos: string[];
  status: string;
  schedule: boolean;
}

export default interface Task extends TaskBase {
  id?: string;
  dateSchedule: Date | null;
  userId: string | null;
  dateCreation: Date;
  dateCompleted: Date | null;
}

export interface TaskForRedux extends TaskBase {
  id: string;
  dateSchedule: string | null;
  userId: string;
  dateCreation: string;
  dateCompleted: string | null;
}

export interface TaskFromFirestore extends TaskBase {
  id: string;
  dateSchedule: DateFromFirestore | null;
  userId: string;
  dateCreation: DateFromFirestore;
  dateCompleted: DateFromFirestore | null;
}
