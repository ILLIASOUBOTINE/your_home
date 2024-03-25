import React from 'react';
import {View} from 'react-native';
import {stylesGeneral} from '../../stylesGeneral';
import {styles} from './style';

import HeaderToDoList from '../../general/HeaderToDoList/HeaderToDoList';

const TaskCompletedScreen = () => {
  return (
    <View style={[stylesGeneral.containerScreen, styles.container]}>
      <HeaderToDoList />
    </View>
  );
};

export default TaskCompletedScreen;
