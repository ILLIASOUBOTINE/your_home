export default interface Task {
  id?: string;
  title: string;
  description: string;
  photos: string[] | null;
  status: string;
  schedule: boolean;
  userId: string | null;
  dateCreation: Date;
  dateCompleted: Date | null;
}
