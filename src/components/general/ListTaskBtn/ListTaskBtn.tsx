import {FlatList, StyleProp, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import React from 'react';

import {TaskForRedux} from '../../../types/Task';
import TaskBtn from '../../ui/TaskBtn/TaskBtn';
import {NameScreens} from '../../../types/nameScreens';

import HeaderListTaskBtn from '../HeaderListTaskBtn/HeaderListTaskBtn';

export type TListTaskBtnProps = {
  style?: StyleProp<any>;
  tasks: TaskForRedux[];
};

const ListTaskBtn = ({style, tasks}: TListTaskBtnProps) => {
  return (
    <>
      <FlatList
        style={styles.container}
        data={tasks}
        renderItem={({item, index}) => (
          <TaskBtn
            styleLastItem={index === tasks.length - 1 && styles.styleLastItem}
            style={styles.taskBtn}
            task={item}
            fromScreen={NameScreens.SCHEDULE}
            isScheduleHide={true}>
            {item.title}
          </TaskBtn>
        )}
        keyExtractor={(item, index) => item.id}
        ListHeaderComponent={
          <HeaderListTaskBtn date={tasks[0].dateSchedule!} />
        }
      />
    </>
  );
};

export default ListTaskBtn;
