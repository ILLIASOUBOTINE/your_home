import {FlatList, StyleProp, Text} from 'react-native';
import {styles} from './style';
import React from 'react';

import {TaskForRedux} from '../../../types/Task';
import TaskBtn from '../../ui/TaskBtn/TaskBtn';
import {NameScreens} from '../../../types/nameScreens';
import {dateFromReduxToDateWithYear} from '../../../utils/convertTask';

export type TListTaskBtnComletedProps = {
  style?: StyleProp<any>;
  tasks: TaskForRedux[];
};

const ListTaskBtnComleted = ({style, tasks}: TListTaskBtnComletedProps) => {
  return (
    <>
      <FlatList
        style={styles.container}
        data={tasks}
        renderItem={({item, index}) => (
          <TaskBtn
            style={styles.taskBtn}
            task={item}
            fromScreen={NameScreens.TASKCOMPLETED}
            isScheduleHide={true}>
            {item.title}
          </TaskBtn>
        )}
        keyExtractor={(item, index) => item.id}
        ListHeaderComponent={
          <Text style={styles.title}>
            {dateFromReduxToDateWithYear(tasks[0].dateCompleted!)}{' '}
          </Text>
        }
      />
    </>
  );
};

export default ListTaskBtnComleted;
