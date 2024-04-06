import React, {useCallback, useState} from 'react';
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

const TaskCompletedScreen = () => {
  const taskInprogress = useSelector(
    (state: RootState) => state.task.tasksCompleted,
  );

  return (
    <View style={[stylesGeneral.containerScreen, styles.container]}>
      <HeaderToDoList />
      {/* {isLoading && <Loading />} */}
      {taskInprogress.length === 0 && (
        <Title1>You don`t have any tasks yet!</Title1>
      )}
      <FlatList
        style={{flex: 1, marginBottom: scaleSize(20)}}
        data={taskInprogress}
        renderItem={({item}) => (
          <TaskBtn task={item} fromScreen={NameScreens.TASKINPROGRESS}>
            {item.title}
          </TaskBtn>
        )}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

export default TaskCompletedScreen;
