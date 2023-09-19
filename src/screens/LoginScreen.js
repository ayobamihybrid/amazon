import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Toast } from 'toastify-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../UserContext';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        if (token) navigation.replace('Main');
      } catch (error) {
        console.log('error message:', error.message);
      }
    };

    loginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post('http://192.168.222.198:8000/login', user)
      .then((response) => {
        ToastAndroid.showWithGravity(
          'Login successful!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );

        const token = response.data.token;
        AsyncStorage.setItem('authToken', token);

        setEmail('');
        setPassword('');

        navigation.replace('Main');
      })
      .catch((error) => {
        console.log('error message:', error.message);
      });
  };

  return (
    <SafeAreaView>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={{
            uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
          }}
          style={{ height: 100, width: 150 }}
        />
      </View>

      <Text
        style={{
          marginTop: 30,
          fontSize: 17,
          fontWeight: 'bold',
          color: '#041E42',
          textAlign: 'center',
        }}
      >
        Login to your Account
      </Text>

      <KeyboardAvoidingView
        style={{
          marginTop: 90,
          marginHorizontal: 15,
          flexDirection: 'row',
          gap: 5,
          backgroundColor: '#D0D0D0',
          paddingHorizontal: 5,
          paddingVertical: 10,
          borderRadius: 5,
          alignItems: 'center',
        }}
      >
        <MaterialIcons name="email" size={24} color="black" />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your Email address"
          style={{ width: 300, color: 'gray' }}
        />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView
        style={{
          marginTop: 30,
          marginHorizontal: 15,
          flexDirection: 'row',
          gap: 5,
          backgroundColor: '#D0D0D0',
          paddingHorizontal: 5,
          paddingVertical: 10,
          borderRadius: 5,
          alignItems: 'center',
        }}
      >
        <AntDesign name="lock" size={24} color="black" />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholder="Enter your Password"
          style={{ width: 300, color: 'gray' }}
        />
      </KeyboardAvoidingView>

      <View
        style={{
          margin: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text> Keep me logged in</Text>
        <Text style={{ color: '#007FFF', fontWeight: 500 }}>
          Forgot Password
        </Text>
      </View>

      <View style={{ alignItems: 'center', marginTop: 70 }}>
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: 'orange',
            borderRadius: 5,
            width: 180,
            height: 40,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 500,
              color: 'white',
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={{ textAlign: 'center', fontSize: 16, color: 'gray' }}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
