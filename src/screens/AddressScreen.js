import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { UserType } from '../UserContext';
import axios from 'axios';

const AddressScreen = () => {
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');

  const { userId, setUserId } = useContext(UserType);

  const navigation = useNavigation();

  useEffect(() => {
    const getUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodeToken = jwt_decode(token);
      console.log(decodeToken);
      const userId = decodeToken.id;

      setUserId(userId);
    };
    getUser();
  }, []);

  const addAddress = () => {
    if (
      country === '' ||
      name === '' ||
      mobileNo === '' ||
      houseNo === '' ||
      street === '' ||
      landmark === '' ||
      postalCode === '' ||
      state === ''
    ) {
      return Toast.error('All fields are required!');
    }

    const address = {
      country,
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
      state,
    };

    axios
      .post('http://192.168.222.198:8000/address', { userId, address })
      .then((res) => {
        ToastAndroid.showWithGravity(
          'Address added successfully!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );

        setCountry('');
        setName('');
        setMobileNo('');
        setHouseNo('');
        setStreet('');
        setLandmark('');
        setPostalCode('');
        setState('');

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Toast.error(error.message);
      });
  };

  return (
    <SafeAreaView>
      <View
        style={{
          height: 45,
          width: '100%',
          backgroundColor: '#00ced1',
          marginBottom: 6,
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              marginHorizontal: 8,
              marginVertical: 4,
            }}
          >
            Country
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              width: '95%',
              padding: 7,
              marginHorizontal: 8,
              marginBottom: 8,
            }}
          >
            <TextInput
              placeholder="Nigeria"
              value={country}
              onChangeText={(text) => setCountry(text)}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              marginHorizontal: 8,
              marginVertical: 4,
            }}
          >
            Name (First and last name)
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              width: '95%',
              padding: 7,
              marginHorizontal: 8,
              marginBottom: 8,
            }}
          >
            <TextInput
              placeholder="John Doe"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              margin: 8,
              marginVertical: 4,
            }}
          >
            Mobile number
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              width: '95%',
              padding: 7,
              marginHorizontal: 8,
              marginBottom: 8,
            }}
          >
            <TextInput
              placeholder="08102029388"
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              margin: 8,
              marginVertical: 4,
            }}
          >
            Flat, House No, Building, Company
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              width: '95%',
              padding: 7,
              marginHorizontal: 8,
              marginBottom: 8,
            }}
          >
            <TextInput
              placeholder="10"
              value={houseNo}
              onChangeText={(text) => setHouseNo(text)}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              margin: 8,
              marginVertical: 4,
            }}
          >
            Area, street, sector
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              width: '95%',
              padding: 7,
              marginHorizontal: 8,
              marginBottom: 8,
            }}
          >
            <TextInput
              placeholder="Freedom str"
              value={street}
              onChangeText={(text) => setStreet(text)}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              margin: 8,
              marginVertical: 4,
            }}
          >
            Landmark
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              width: '95%',
              padding: 7,
              marginHorizontal: 8,
              marginBottom: 8,
            }}
          >
            <TextInput
              placeholder="Opposite Justrite"
              value={landmark}
              onChangeText={(text) => setLandmark(text)}
            />
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              margin: 8,
              marginVertical: 4,
            }}
          >
            State
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              width: '95%',
              padding: 7,
              marginHorizontal: 8,
              marginBottom: 8,
            }}
          >
            <TextInput
              placeholder="Lagos"
              value={state}
              onChangeText={(text) => setState(text)}
            />
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              margin: 8,
              marginVertical: 4,
            }}
          >
            Postalcode
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              width: '95%',
              padding: 7,
              marginHorizontal: 8,
              marginBottom: 8,
            }}
          >
            <TextInput
              placeholder="100001"
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
            />
          </View>

          <TouchableOpacity
            onPress={() => addAddress()}
            style={{
              width: '95%',
              padding: 15,
              backgroundColor: 'orange',
              borderRadius: 5,
              marginHorizontal: 8,
              marginTop: 8,
              // marginBottom: 20,
            }}
          >
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
              Add Address
            </Text>
          </TouchableOpacity>
          <View style={{ height: 250 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddressScreen;
