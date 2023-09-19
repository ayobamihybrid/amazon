import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post('http://192.168.222.198:8000/register', user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          'Registration successful',
          'Click on the link sent to your Email address to complete your registration!'
        );
        setName('');
        setEmail('');
        setPassword('');

        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log('Error message:', error.message);

        if (error.response) {
          console.log('Response data:', error.response.data);
          Alert.alert('Registration Error', `${error.response.data}`);
          console.log('Response status:', error.response.status);
          console.log('Response headers:', error.response.headers);
        } else if (error.request) {
          console.log('Request:', error.request);
        }

        Alert.alert(
          'Registration Error',
          `${error.response.data.message}`
        );
        console.log('registration failed', error);
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
        Register your Account
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
        <Ionicons name="person" size={24} color="black" />
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter your Name"
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
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your Password"
          style={{ width: 300, color: 'gray' }}
        />
      </KeyboardAvoidingView>

      <View style={{ alignItems: 'center', marginTop: 70 }}>
        <TouchableOpacity
          onPress={handleRegistration}
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
            Register
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{ textAlign: 'center', fontSize: 16, color: 'gray' }}>
          Already have an account? Sign in
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterScreen;
