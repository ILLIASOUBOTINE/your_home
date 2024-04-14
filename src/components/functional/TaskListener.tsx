import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {setTasksAll} from '../../store/taskReducer';
import {NameCollection} from '../../constans/nameCollection';
import {TaskFromFirestore} from '../../types/Task';
import {taskFromFirestoreTOTaskForRedux} from '../../utils/convertTask';

const TaskListener = ({userId}: {userId: string}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(NameCollection.USERS)
      .doc(userId)
      .collection(NameCollection.TASKS)
      .onSnapshot(snapshot => {
        const tasksData = snapshot.docs.map(doc => {
          const taskData = doc.data() as TaskFromFirestore;
          taskData.id = doc.id;
          return taskData;
        });
        const tasksDataRedux = taskFromFirestoreTOTaskForRedux(tasksData);
        dispatch(setTasksAll(tasksDataRedux));
      });

    return () => unsubscribe();
  }, [dispatch, userId]);

  return null;
};

export default TaskListener;
