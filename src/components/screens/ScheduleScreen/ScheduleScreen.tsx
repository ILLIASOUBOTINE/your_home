import {ActivityIndicator, FlatList, Text, View} from 'react-native';

import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {sortArrSchedule} from '../../../utils/sortArr';

import {stylesGeneral} from '../../stylesGeneral';
import {styles} from './style';
import Title1 from '../../ui/Title1/Title1';
import {scaleSize} from '../../../utils/scaleSize';

import HeaderSchedule from '../../general/HeaderSchedule/HeaderSchedule';
import {TaskForRedux} from '../../../types/Task';
import ListTaskBtn from '../../general/ListTaskBtn/ListTaskBtn';
import {Colors} from '../../../constans/colors';

const ScheduleScreen = () => {
  const tasksSchedule = useSelector(
    (state: RootState) => state.task.tasksSchedule,
  );

  const [listSchedule, setListSchedule] = useState<TaskForRedux[][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setListSchedule(sortArrSchedule(tasksSchedule));
    setIsLoading(false);
  }, [tasksSchedule]);

  return (
    <View style={[stylesGeneral.containerScreen, styles.container]}>
      <HeaderSchedule />

      {tasksSchedule.length === 0 && (
        <Title1>You don`t have anything planned for the near future!</Title1>
      )}

      {isLoading ? (
        <ActivityIndicator size={'large'} color={Colors.COLOR4} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
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
      )}
    </View>
  );
};

export default ScheduleScreen;
