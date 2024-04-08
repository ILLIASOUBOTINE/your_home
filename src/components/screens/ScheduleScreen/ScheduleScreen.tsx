import {FlatList, Text, View} from 'react-native';

import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {sortArrSchedule} from '../../../utils/sortArr';
import HeaderToDoList from '../../general/HeaderToDoList/HeaderToDoList';
import {stylesGeneral} from '../../stylesGeneral';
import {styles} from './style';
import Title1 from '../../ui/Title1/Title1';
import {scaleSize} from '../../../utils/scaleSize';
import {NameScreens} from '../../../types/nameScreens';
import TaskBtn from '../../ui/TaskBtn/TaskBtn';
import HeaderSchedule from '../../general/HeaderSchedule/HeaderSchedule';
import {TaskForRedux} from '../../../types/Task';
import ListTaskBtn from '../../general/ListTaskBtn/ListTaskBtn';

const ScheduleScreen = () => {
  const tasksSchedule = useSelector(
    (state: RootState) => state.task.tasksSchedule,
  );

  const [listSchedule, setListSchedule] = useState<TaskForRedux[][]>([]);

  useEffect(() => {
    setListSchedule(sortArrSchedule(tasksSchedule));
    // console.log('listSchedule', listSchedule);
  }, [tasksSchedule]);

  return (
    <View style={[stylesGeneral.containerScreen, styles.container]}>
      <HeaderSchedule />

      {listSchedule.length === 0 && (
        <Title1>You don`t have anything planned for the near future!</Title1>
      )}
      <FlatList
        style={{
          flex: 1,
          marginBottom: scaleSize(20),
          paddingHorizontal: scaleSize(6),
        }}
        data={listSchedule}
        renderItem={({item}) => <ListTaskBtn tasks={item} />}
        keyExtractor={(item, index) => item[0].dateSchedule! + index}
        ListHeaderComponent={
          <>
            {listSchedule.length !== 0 ? (
              <Text style={styles.listHeader}>Upcoming Schedule</Text>
            ) : null}
          </>
        }
      />
    </View>
  );
};

export default ScheduleScreen;
