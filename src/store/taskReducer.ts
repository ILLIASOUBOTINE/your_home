import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import firestore from '@react-native-firebase/firestore';
import {TaskForRedux, TaskFromFirestore} from '../types/Task';
import {Status} from '../types/status';
import {
  dateFromFirestoreToDateString,
  taskFromFirestoreTOTaskForRedux,
} from '../utils/convertTask';

import {NameCollection} from '../constans/nameCollection';

export interface TasksState {
  tasksInProgress: TaskForRedux[];
  tasksCompleted: TaskForRedux[];
  tasksSchedule: TaskForRedux[];
  numberTasksCompletedYear: number;
  error: any;
}

const initialState: TasksState = {
  tasksInProgress: [],
  tasksCompleted: [],
  tasksSchedule: [],
  numberTasksCompletedYear: 0,
  error: null,
};

const getNumberTasksCompletedYear = (tasks: TaskFromFirestore[]): number => {
  const thisYear = new Date().getFullYear();

  const arrTasksCompletedYear = tasks.filter(task => {
    if (task.dateCompleted !== null) {
      const dateString = dateFromFirestoreToDateString(task.dateCompleted);
      const date = new Date(dateString);
      return date.getFullYear() === thisYear;
    }
    return false;
  });
  return arrTasksCompletedYear.length;
};

const getNumberTasksCompletedYearReduxData = (
  tasks: TaskForRedux[],
): number => {
  const thisYear = new Date().getFullYear();

  const arrTasksCompletedYear = tasks.filter(task => {
    if (task.dateCompleted !== null) {
      const date = new Date(task.dateCompleted);
      return date.getFullYear() === thisYear;
    }
    return false;
  });
  return arrTasksCompletedYear.length;
};

const getTasksSchedule = (tasks: TaskFromFirestore[]): TaskFromFirestore[] => {
  return tasks.filter(task => task.schedule);
};

export const fetchTasksByUserId = createAsyncThunk(
  'task/fetchTasksByUserId',
  async (userId: string) => {
    // const tasksDoc = await firestore()
    //   .collection(NameCollection.TASKS)
    //   .where('userId', '==', userId)
    //   .get();
    const tasksDoc = await firestore()
      .collection(NameCollection.USERS)
      .doc(userId)
      .collection(NameCollection.TASKS)
      .get();

    const tasksData = tasksDoc.docs.map(doc => {
      const taskData = doc.data() as TaskFromFirestore;
      taskData.id = doc.id;
      return taskData;
    });
    const tasksDataRedux = taskFromFirestoreTOTaskForRedux(tasksData);
    return tasksDataRedux;
  },
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasksInProgress: (state, action: PayloadAction<TaskFromFirestore[]>) => {
      state.tasksInProgress = taskFromFirestoreTOTaskForRedux(action.payload);
      state.tasksSchedule = taskFromFirestoreTOTaskForRedux(
        getTasksSchedule(action.payload),
      );
    },
    setTasksCompleted: (state, action: PayloadAction<TaskFromFirestore[]>) => {
      state.tasksCompleted = taskFromFirestoreTOTaskForRedux(action.payload);
      state.numberTasksCompletedYear = getNumberTasksCompletedYear(
        action.payload,
      );
    },
    setTasksAll: (state, action: PayloadAction<TaskForRedux[]>) => {
      const tasksData = action.payload;

      state.tasksInProgress = tasksData.filter(
        task => task.status == Status.INPROGRESS,
      );

      state.tasksCompleted = tasksData.filter(
        task => task.status == Status.COMPLETED,
      );

      state.tasksSchedule = tasksData.filter(task => task.schedule);

      state.numberTasksCompletedYear =
        getNumberTasksCompletedYearReduxData(tasksData);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasksByUserId.pending, (state, action) => {
        console.log('taskPENDING');
      })
      .addCase(fetchTasksByUserId.rejected, (state, action) => {
        state.error = action.payload;
        console.log('taskREJECTED');
      })
      .addCase(fetchTasksByUserId.fulfilled, (state, action) => {
        const tasksData = action.payload;

        // console.log('TasksAfter', tasksData);

        state.tasksInProgress = tasksData.filter(
          task => task.status == Status.INPROGRESS,
        );

        state.tasksCompleted = tasksData.filter(
          task => task.status == Status.COMPLETED,
        );

        state.tasksSchedule = tasksData.filter(task => task.schedule);

        state.numberTasksCompletedYear =
          getNumberTasksCompletedYearReduxData(tasksData);

        console.log('taskREQUEST FINISHED FULLFILLED');
      });
  },
});

// Action creators are generated for each case reducer function
export const {setTasksInProgress, setTasksCompleted, setTasksAll} =
  taskSlice.actions;

export default taskSlice.reducer;
