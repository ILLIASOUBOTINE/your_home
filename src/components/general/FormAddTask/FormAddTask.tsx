import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Alert, TextInput, View} from 'react-native';

import {styles} from './style';
import Btn1 from '../../ui/Btn1/Btn1';
import {stylesGeneral} from '../../stylesGeneral';
import Task from '../../../types/Task';
import {Status} from '../../../types/status';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

type TFormAddTaskParams = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormAddTask = ({setIsLoading}: TFormAddTaskParams) => {
  const userId = useSelector((state: RootState) => state.user.id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createNewTask = (): Task => {
    const newTask: Task = {
      title: title,
      description: description,
      photos: [],
      status: Status.INPROGRESS,
      schedule: false,
      userId: userId,
      dateCreation: new Date(),
      dateCompleted: null,
    };

    console.log('userId', userId);
    return {...newTask};
  };

  const handlerAddTask = () => {
    setIsLoading(true);
    if (!title || !description) {
      Alert.alert('Add task', ' all fields must be filled in');
      setIsLoading(false);
      return;
    }
    firestore()
      .collection('Tasks')
      .add(createNewTask())
      .then(() => {
        Alert.alert('Add Task', 'Task added!');
        setTitle('');
        setDescription('');
      })
      .catch(error => {
        Alert.alert('addTaskToBD', error);
      })
      .finally(() => setIsLoading(false));
  };

  const addPhoto = () => {};

  return (
    <View style={stylesGeneral.containerForm}>
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[stylesGeneral.input1, stylesGeneral.input2]}
        placeholder="Discription"
        value={description}
        multiline={true}
        onChangeText={setDescription}
      />

      <Btn1 onPressBtn={addPhoto}>Add photo</Btn1>

      <Btn1 onPressBtn={handlerAddTask}>Add Task</Btn1>
    </View>
  );
};

export default FormAddTask;
