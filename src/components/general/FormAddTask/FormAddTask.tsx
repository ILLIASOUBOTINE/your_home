import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';
import {Alert, Image, PermissionsAndroid, TextInput, View} from 'react-native';

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

  const [responsePhoto, setResponsePhoto] = useState<ImagePicker.Asset[]>([]);

  const createNewTask = (images: string[]): Task => {
    const newTask: Task = {
      title: title,
      description: description,
      photos: images,
      status: Status.INPROGRESS,
      schedule: false,
      userId: userId,
      dateCreation: new Date(),
      dateCompleted: null,
    };
    return {...newTask};
  };

  const uploadTaskInFirestore = async (newTask: Task) => {
    try {
      const uploadedTaskInFirestore = await firestore()
        .collection('Tasks')
        .add(newTask);
      return uploadedTaskInFirestore;
    } catch (error) {
      throw error;
    }
  };

  const handlerAddTask = async () => {
    setIsLoading(true);

    if (!title || !description) {
      Alert.alert('Add task', ' all fields must be filled in');
      setIsLoading(false);
      return;
    }

    try {
      const imagePathInStorage = await uploadImagesInStorage();

      const newTask = createNewTask(imagePathInStorage);
      await uploadTaskInFirestore(newTask);
      Alert.alert('Add Task', 'Task added!');
      setTitle('');
      setDescription('');

      setResponsePhoto([]);
    } catch (error) {
      Alert.alert('Add Task', 'Task didn`t add!');
    } finally {
      setIsLoading(false);
    }
  };

  const handlerCameraLaunch = async () => {
    const options: ImagePicker.CameraOptions = {
      mediaType: 'photo',
      quality: 0.1,
      includeBase64: false,
      maxHeight: 500,
      maxWidth: 500,
    };
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.launchCamera(options, response => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.errorCode) {
            console.log('Camera Error: ', response.errorCode);
          } else {
            if (response.assets !== undefined) {
              const newAssets = [...response.assets];
              setResponsePhoto(prev => [...prev, ...newAssets]);
              console.log('asset', response.assets);
            }
          }
        });
      } else {
        Alert.alert(
          'Permission Denied',
          'You need to grant camera permission to take a picture.',
        );
      }
    } catch (error) {
      console.error('Error requesting camera permission: ', error);
    }
  };

  const handlerLaunchImageLibrary = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.1,
      includeBase64: false,
      maxHeight: 500,
      maxWidth: 500,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorCode);
      } else {
        if (response.assets !== undefined) {
          const newAssets = [...response.assets];
          setResponsePhoto(prev => [...prev, ...newAssets]);
          console.log('asset', response.assets);
        }
      }
    });
  };

  const uploadImagesInStorage = async () => {
    const uploadTasks = responsePhoto.map(async (asset: ImagePicker.Asset) => {
      const pathToFile = asset.uri;
      const fileNameImg = asset.fileName;
      const reference = storage().ref(fileNameImg);

      try {
        if (pathToFile && fileNameImg) {
          await reference.putFile(pathToFile);

          return fileNameImg;
        }

        throw new Error('Path to file or file name is invalid');
      } catch (error) {
        console.error(`Error uploading image ${fileNameImg}: `, error);
        throw error;
      }
    });

    try {
      const uploadedImages = await Promise.all(uploadTasks);
      return uploadedImages;
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
        {responsePhoto.length !== 0 &&
          responsePhoto.map((asset: ImagePicker.Asset, index) => (
            <View
              key={`${new Date().getSeconds()}${index}`}
              style={styles.imageContainer}>
              <Image
                key={`${new Date().getSeconds()}Img${index}`}
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{uri: asset.uri}}
              />
            </View>
          ))}
      </View>

      <Btn1 onPressBtn={handlerLaunchImageLibrary}>Select photo</Btn1>
      <Btn1 onPressBtn={handlerCameraLaunch}>Take photo</Btn1>
      <Btn1 onPressBtn={handlerAddTask}>Add Task</Btn1>
    </View>
  );
};

export default FormAddTask;
