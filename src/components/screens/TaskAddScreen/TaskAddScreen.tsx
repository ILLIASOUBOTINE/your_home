import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import HeaderToDoList from '../../general/HeaderToDoList/HeaderToDoList';
import {stylesGeneral} from '../../stylesGeneral';
import {styles} from './style';
import FormAddTask from '../../general/FormAddTask/FormAddTask';

import LoadingModal from '../../ui/LoadingModal/LoadingModal';

const TaskAddScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[stylesGeneral.containerScreen, styles.container]}>
      <LoadingModal isLoading={isLoading} />
      <HeaderToDoList />
      <FormAddTask setIsLoading={setIsLoading} />
    </ScrollView>
  );
};

export default TaskAddScreen;
