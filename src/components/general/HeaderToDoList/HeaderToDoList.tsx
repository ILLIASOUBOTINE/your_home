import React from 'react';
import {Text, View} from 'react-native';
import {stylesGeneral} from '../../stylesGeneral';
import Title1 from '../../ui/Title1/Title1';
import {styles} from './style';

import NavToDoList from '../NavToDoList/NavToDoList';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

const HeaderToDoList = () => {
  const numberTaskCompletedYear = useSelector(
    (state: RootState) => state.task.numberTasksCompletedYear,
  );

  return (
    <View style={styles.container}>
      <Title1 style={styles.title}>To-do List</Title1>
      <Text style={[stylesGeneral.text1, styles.text]}>
        {numberTaskCompletedYear === 1
          ? `We’ve completed ${numberTaskCompletedYear} task off your To-do list this year.`
          : `We’ve completed ${numberTaskCompletedYear} tasks off your To-do list this year.`}
      </Text>
      <NavToDoList />
    </View>
  );
};

export default HeaderToDoList;
