import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Profile');
    }, 5000);
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#00cc88',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animatable.Image
        source={require('../../assets/image_processing20190821-17803-12pij7c.gif')}
        animation="slideInUp"
        iterationCount={1}
        style={{ height: 350, width: '100%' }}
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginVertical: 10,
          color: 'white',
          textAlign: 'center',
        }}
      >
        Placing your order!
      </Animatable.Text>

      {/* <Progress.CircleSnail color={['red', 'green', 'blue']} /> */}
      <Progress.Bar progress={0.3} width={200} />
    </SafeAreaView>
  );
};

export default OrderScreen;
