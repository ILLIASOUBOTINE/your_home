import React, {useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FlatList, Text, View} from 'react-native';
import {stylesGeneral} from '../../stylesGeneral';

import {styles} from './style';

import HeaderToDoList from '../../general/HeaderToDoList/HeaderToDoList';
import {scaleSize} from '../../../utils/scaleSize';
import TaskBtn from '../../ui/TaskBtn/TaskBtn';
import {NameScreens} from '../../../types/nameScreens';
import {Status} from '../../../types/status';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import Task from '../../../types/Task';
import Loading from '../../ui/Loading/Loading';
import {useFocusEffect} from '@react-navigation/native';

const TaskInProgressScreen = () => {
  // const DATA = Array.from({length: 20}, () => Math.floor(Math.random() * 100));
  const userId = useSelector((state: RootState) => state.user.id);
  const [taskInprogress, setTaskInprogress] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // console.log('usreId', userId);

      const snapshot = await firestore()
        .collection('Tasks')
        .where(
          firestore.Filter.and(
            firestore.Filter('userId', '==', userId),
            firestore.Filter('status', '==', Status.INPROGRESS),
          ),
        )
        .get();
      // console.log('TaskINprogress', snapshot.docs);

      const taskData = snapshot.docs.map(doc => {
        const data = doc.data();
        const task: Task = {
          id: doc.id,
          title: data.title,
          description: data.description,
          photos: data.photos,
          status: data.status,
          userId: data.userId,
          dateCreation: data.dateCreation,
          dateCompleted: data.dateCompleted,
          schedule: data.schedule,
        };
        return task;
      });
      setTaskInprogress(taskData);
      // console.log('TaskINprogress2', taskData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  return (
    <View style={[stylesGeneral.containerScreen, styles.container]}>
      <HeaderToDoList />
      {isLoading && <Loading />}
      {taskInprogress.length === 0 && (
        <Text>You don`t have any tasks yet!</Text>
      )}
      <FlatList
        style={{flex: 1, marginBottom: scaleSize(20)}}
        data={taskInprogress}
        renderItem={({item, index}) => (
          <TaskBtn task={item} fromScreen={NameScreens.TASKINPROGRESS}>
            {item.title}
          </TaskBtn>
        )}
        keyExtractor={item => item.id!}
      />
    </View>
  );
};

export default TaskInProgressScreen;
