import {Button, Text, View} from 'react-native';
import {styles} from './style';
import React from 'react';

const ProfileScreen = ({navigation}) => {
  return (
    <View>
      <Text style={styles.text}>ProfileScreen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Messages')}
      />
    </View>
  );
};

export default ProfileScreen;
