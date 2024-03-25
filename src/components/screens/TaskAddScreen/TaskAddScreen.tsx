import React from 'react';
import {ScrollView, View} from 'react-native';

import HeaderToDoList from '../../general/HeaderToDoList/HeaderToDoList';
import {stylesGeneral} from '../../stylesGeneral';
import {styles} from './style';
import FormAddTask from '../../general/FormAddTask/FormAddTask';

const TaskAddScreen = () => {
  return (
    <ScrollView
      contentContainerStyle={[stylesGeneral.containerScreen, styles.container]}>
      <HeaderToDoList />
      <FormAddTask />
    </ScrollView>
  );
};

export default TaskAddScreen;
