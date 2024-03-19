import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {stylesGeneral} from '../../stylesGeneral';
import Title1 from '../../ui/Title1.tsx/Title1';
import {styles} from './style';
import Btn2 from '../../ui/Btn2/Btn2';

const TaskInProgressScreen = () => {
  return (
    <View style={[stylesGeneral.containerScreen, styles.container]}>
      <Title1 style={styles.title}>To-do List</Title1>
      <Text style={stylesGeneral.text1}>
        We’ve completed 20 tasks off your To-do list this year.
      </Text>
      <View style={styles.navTodoList}>
        <Btn2>Add</Btn2>
        <Btn2>In-progress</Btn2>
        <Btn2>Completed</Btn2>
      </View>
    </View>
  );
};

export default TaskInProgressScreen;
