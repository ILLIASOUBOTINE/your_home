import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

import {styles} from './style';
import Btn1 from '../../ui/Btn1/Btn1';
import {stylesGeneral} from '../../stylesGeneral';

const FormAddTask = () => {
  const [title, setTitle] = useState('');
  const [discription, setDiscription] = useState('');

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
        value={discription}
        multiline={true}
        onChangeText={setDiscription}
      />

      <Btn1 onPressBtn={() => {}}>Add photo</Btn1>

      <Btn1 onPressBtn={() => {}}>Add Task</Btn1>
    </View>
  );
};

export default FormAddTask;
