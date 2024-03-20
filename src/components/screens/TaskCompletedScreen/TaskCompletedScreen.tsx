import React from 'react';
import {Text, View} from 'react-native';
import {stylesGeneral} from '../../stylesGeneral';
import {styles} from './style';
import Title1 from '../../ui/Title1.tsx/Title1';
import NavToDoList from '../../general/NavToDoList/NavToDoList';

const TaskCompletedScreen = () => {
  return (
    <View style={[stylesGeneral.containerScreen, styles.container]}>
      <Title1 style={styles.title}>To-do List</Title1>
      <Text style={stylesGeneral.text1}>
        We’ve completed 20 tasks off your To-do list this year.
      </Text>
      <NavToDoList />
    </View>
  );
};

export default TaskCompletedScreen;
