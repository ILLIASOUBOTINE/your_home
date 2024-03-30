import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';

import HeaderToDoList from '../../general/HeaderToDoList/HeaderToDoList';
import {stylesGeneral} from '../../stylesGeneral';
import {styles} from './style';
import FormAddTask from '../../general/FormAddTask/FormAddTask';
import Loading from '../../ui/Loading/Loading';

const TaskAddScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={[stylesGeneral.containerScreen, styles.container]}>
      {isLoading && <Loading />}
      <HeaderToDoList />
      <FormAddTask setIsLoading={setIsLoading} />
    </ScrollView>
  );
};

export default TaskAddScreen;
