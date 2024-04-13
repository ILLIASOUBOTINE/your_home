import React, {useState} from 'react';
import {Alert, TextInput, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {styles} from './style';
import Btn1 from '../../ui/Btn1/Btn1';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {TTabBottomNavParamList} from '../../../navigation/TabBottomNav';
import {stylesGeneral} from '../../stylesGeneral';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store';
import {NameCollection} from '../../../constans/nameCollection';
import {setUpdateUserFields} from '../../../store/userReducer';

type TFormProfileParams = {
  setIsEdite: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormProfile = ({setIsEdite, setIsLoading}: TFormProfileParams) => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.user);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [address, setAddress] = useState(userData.address);

  const updateUser = () => {
    setIsLoading(true);
    if (
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      address.trim().length === 0 ||
      phoneNumber.trim().length === 0
    ) {
      setIsLoading(false);
      Alert.alert('Update', 'All fields must be filled in');
      return;
    }

    firestore()
      .collection(NameCollection.USERS)
      .doc(userData.id!)
      .update({
        firstName,
        lastName,
        address,
        phoneNumber,
      })
      .then(() => {
        console.log('User updated!');
        dispatch(
          setUpdateUserFields({firstName, lastName, phoneNumber, address}),
        );

        setIsEdite(false);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        Alert.alert('Update', 'User data has not been updated!');
      });
  };

  const cancelUpdate = () => {
    setIsEdite(false);
  };

  return (
    <View style={stylesGeneral.containerForm}>
      <TextInput
        style={stylesGeneral.input1}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={[stylesGeneral.input1, stylesGeneral.input2]}
        placeholder="Address"
        value={address}
        multiline={true}
        onChangeText={setAddress}
      />

      <Btn1 onPressBtn={updateUser}>Apply</Btn1>
      <Btn1 onPressBtn={cancelUpdate}>Cancel</Btn1>
    </View>
  );
};

export default FormProfile;
