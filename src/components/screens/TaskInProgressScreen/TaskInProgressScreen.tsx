import React from 'react';

import {FlatList, View} from 'react-native';
import {stylesGeneral} from '../../stylesGeneral';

import {styles} from './style';

import HeaderToDoList from '../../general/HeaderToDoList/HeaderToDoList';
import {scaleSize} from '../../../utils/scaleSize';
import TaskBtn from '../../ui/TaskBtn/TaskBtn';
import {NameScreens} from '../../../types/nameScreens';

import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

import Title1 from '../../ui/Title1/Title1';

const TaskInProgressScreen = () => {
  const taskInprogress = useSelector(
    (state: RootState) => state.task.tasksInProgress,
  );

  return (
    <View style={[stylesGeneral.containerScreen, styles.container]}>
      <HeaderToDoList />

      {taskInprogress.length === 0 && (
        <Title1>You don`t have any tasks yet!</Title1>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginBottom: scaleSize(20)}}
        data={taskInprogress}
        renderItem={({item}) => (
          <TaskBtn task={item} fromScreen={NameScreens.TASKINPROGRESS}>
            {item.title}
          </TaskBtn>
        )}
        keyExtractor={(item, index) => item.id + index}
      />
    </View>
  );
};

export default TaskInProgressScreen;
