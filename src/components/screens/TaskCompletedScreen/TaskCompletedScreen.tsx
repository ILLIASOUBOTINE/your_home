import React, {useEffect, useState} from 'react';

import {FlatList, View} from 'react-native';
import {stylesGeneral} from '../../stylesGeneral';
import {styles} from './style';

import HeaderToDoList from '../../general/HeaderToDoList/HeaderToDoList';

import {scaleSize} from '../../../utils/scaleSize';

import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

import Title1 from '../../ui/Title1/Title1';
import {TaskForRedux} from '../../../types/Task';
import {sortArrCompleted} from '../../../utils/sortArr';

import ListTaskBtnComleted from '../../general/ListTaskBtnComleted/ListTaskBtnComleted';

const TaskCompletedScreen = () => {
  const taskCompleted = useSelector(
    (state: RootState) => state.task.tasksCompleted,
  );
  const [listCompleted, setListCompleted] = useState<TaskForRedux[][]>([]);

  useEffect(() => {
    setListCompleted(sortArrCompleted(taskCompleted));
  }, [taskCompleted]);

  return (
    <View style={[stylesGeneral.containerScreen, styles.container]}>
      <HeaderToDoList />

      {taskCompleted.length === 0 && (
        <Title1>You don`t have any tasks yet!</Title1>
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
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
