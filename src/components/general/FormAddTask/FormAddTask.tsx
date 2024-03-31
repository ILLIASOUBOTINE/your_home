import React, {useCallback, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';
import {Alert, Image, TextInput, View} from 'react-native';

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

/* toggle includeExtra */
const includeExtra = true;

const FormAddTask = ({setIsLoading}: TFormAddTaskParams) => {
  const userId = useSelector((state: RootState) => state.user.id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[] | null>(null);
  const [response, setResponse] = useState<any>(null);

  const createNewTask = (): Task => {
    const newTask: Task = {
      title: title,
      description: description,
      photos: createArrUriPhotoLocal(response),
      status: Status.INPROGRESS,
      schedule: false,
      userId: userId,
      dateCreation: new Date(),
      dateCompleted: null,
    };

    console.log('userId', userId);
    return {...newTask};
  };

  const createArrUriPhotoLocal = (response: any) => {
    if (!response) return null;
    const result = response.assets.map((asset: any) => asset.fileName);
    console.log('Filename', result);

    return result;
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
        if (images?.length !== 0) {
          uploadImages().then(() => {
            Alert.alert('Add Task', 'Task added!');
            setTitle('');
            setDescription('');
            setImages(null);
            setResponse(null);
          });
        } else {
          Alert.alert('Add Task', 'Task added!');
          setTitle('');
          setDescription('');
        }
      })
      .catch(error => {
        Alert.alert('addTaskToBD', error);
      })
      .finally(() => setIsLoading(false));
  };

  const onButtonPress = useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
      console.log('Response', response);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
      console.log('Response', response);
    }
  }, []);

  interface Action {
    title: string;
    type: 'capture' | 'library';
    options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
  }

  const actions: Action[] = [
    {
      title: 'Take Image',
      type: 'capture',
      options: {
        saveToPhotos: true,
        mediaType: 'photo',
        quality: 0.5,
        includeBase64: false,
        includeExtra,
      },
    },
    {
      title: 'Select Image',
      type: 'library',
      options: {
        selectionLimit: 0,
        mediaType: 'photo',
        quality: 0.5,
        includeBase64: false,
        includeExtra,
      },
    },
  ];

  const uploadImages = async () => {
    setImages(createArrUriPhotoLocal(response));
    const uploadTasks = response.assets!.map(async (asset: any) => {
      const reference = storage().ref(asset.fileName);
      try {
        const pathToFile = asset.uri;
        console.log('Path', pathToFile);

        await reference.putFile(pathToFile);
        console.log(`Image ${asset.fileName} uploaded successfully.`);
        return asset.fileName;
      } catch (error) {
        console.error(`Error uploading image ${asset.fileName}: `, error);
        throw error;
      }
    });

    try {
      const uploadedImages = await Promise.all(uploadTasks);
      console.log('All images uploaded successfully:', uploadedImages);
    } catch (error) {
      console.error('Error uploading images: ', error);
      throw error;
    }
  };

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
      <View style={styles.imgsContainer}>
        {response?.assets &&
          response?.assets.map(
            ({
              id,
              uri,
              fileName,
            }: {
              id: string;
              uri: string;
              fileName: string;
            }) => (
              <View key={id} style={styles.imageContainer}>
                <Image
                  key={fileName}
                  resizeMode="cover"
                  resizeMethod="scale"
                  style={styles.image}
                  source={{uri: uri}}
                />
              </View>
            ),
          )}
      </View>

      {actions.map(({title, options, type}) => (
        <Btn1 key={title} onPressBtn={() => onButtonPress(type, options)}>
          {title}
        </Btn1>
      ))}

      <Btn1 onPressBtn={handlerAddTask}>Add Task</Btn1>
    </View>
  );
};

export default FormAddTask;
