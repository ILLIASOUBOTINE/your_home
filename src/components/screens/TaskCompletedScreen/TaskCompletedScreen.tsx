import React, {useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FlatList, Text, View} from 'react-native';
import {stylesGeneral} from '../../stylesGeneral';
import {styles} from './style';

import HeaderToDoList from '../../general/HeaderToDoList/HeaderToDoList';
import Loading from '../../ui/Loading/Loading';
import TaskBtn from '../../ui/TaskBtn/TaskBtn';
import {scaleSize} from '../../../utils/scaleSize';
import {NameScreens} from '../../../types/nameScreens';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

import Title1 from '../../ui/Title1/Title1';
import {TaskForRedux} from '../../../types/Task';
import {sortArrCompleted} from '../../../utils/sortArr';
import ListTaskBtn from '../../general/ListTaskBtn/ListTaskBtn';
import ListTaskBtnComleted from '../../general/ListTaskBtnComleted/ListTaskBtnComleted';

const TaskCompletedScreen = () => {
  const taskCompleted = useSelector(
    (state: RootState) => state.task.tasksCompleted,
  );
  const [listCompleted, setListCompleted] = useState<TaskForRedux[][]>([]);

  useEffect(() => {
    setListCompleted(sortArrCompleted(taskCompleted));
    console.log('listCompleted', listCompleted);
  }, [taskCompleted]);

  return (
    <View style={[stylesGeneral.containerScreen, styles.container]}>
      <HeaderToDoList />
      {/* {isLoading && <Loading />} */}
      {taskCompleted.length === 0 && (
        <Title1>You don`t have any tasks yet!</Title1>
      )}
      {/* <FlatList
        style={{flex: 1, marginBottom: scaleSize(20)}}
        data={taskCompleted}
        renderItem={({item}) => (
          <TaskBtn task={item} fromScreen={NameScreens.TASKCOMPLETED}>
            {item.title}
          </TaskBtn>
        )}
        keyExtractor={(item, index) => item.id}
      /> */}
      <FlatList
        style={{
          flex: 1,
          marginBottom: scaleSize(20),
          paddingHorizontal: scaleSize(6),
        }}
        data={listCompleted}
        renderItem={({item}) => <ListTaskBtnComleted tasks={item} />}
        keyExtractor={(item, index) => item[0].dateCompleted! + index}
      />
    </View>
  );
};

export default TaskCompletedScreen;
