import React from 'react';
import {FlatList, View} from 'react-native';
import {stylesGeneral} from '../../stylesGeneral';

import {styles} from './style';

import HeaderToDoList from '../../general/HeaderToDoList/HeaderToDoList';
import {scaleSize} from '../../../utils/scaleSize';
import TaskBtn from '../../ui/TaskBtn/TaskBtn';
import {NameScreens} from '../../../types/nameScreens';

const TaskInProgressScreen = () => {
  const DATA = Array.from({length: 20}, () => Math.floor(Math.random() * 100));
  return (
    <View style={[stylesGeneral.containerScreen, styles.container]}>
      <HeaderToDoList />
      <FlatList
        style={{flex: 1, marginBottom: scaleSize(20)}}
        data={DATA}
        renderItem={({item, index}) => (
          <TaskBtn idTask={item} fromScreen={NameScreens.TASKINPROGRESS}>
            Index: {index}, Number: {item}
          </TaskBtn>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default TaskInProgressScreen;
