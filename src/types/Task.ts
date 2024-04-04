import {DateFromFirestore} from '../utils/convertTask';

export default interface Task {
  id?: string;
  title: string;
  description: string;
  photos: string[];
  status: string;
  schedule: boolean;
  dateSchedule: Date | null;
  userId: string | null;
  dateCreation: Date;
  dateCompleted: Date | null;
}

export interface TaskForRedux {
  id: string;
  title: string;
  description: string;
  photos: string[];
  status: string;
  schedule: boolean;
  dateSchedule: string | null;
  userId: string;
  dateCreation: string;
  dateCompleted: string | null;
}

export interface TaskFromFirestore {
  id: string;
  title: string;
  description: string;
  photos: string[];
  status: string;
  schedule: boolean;
  dateSchedule: DateFromFirestore | null;
  userId: string;
  dateCreation: DateFromFirestore;
  dateCompleted: DateFromFirestore | null;
}
