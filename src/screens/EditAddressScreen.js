import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserType } from '../UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Toast } from 'toastify-react-native';
import axios from 'axios';

const EditAddressScreen = () => {
  const route = useRoute();

  const { addresses, setAddresses } = useContext(UserType);
  const [country, setCountry] = useState(route.params.address.country);
  const [name, setName] = useState(route.params.address.name);
  const [mobileNo, setMobileNo] = useState(route.params.address.mobileNo);
  const [houseNo, setHouseNo] = useState(route.params.address.houseNo);
  const [street, setStreet] = useState(route.params.address.street);
  const [landmark, setLandmark] = useState(route.params.address.landmark);
  const [postalCode, setPostalCode] = useState(route.params.address.postalCode);
  const [state, setState] = useState(route.params.address.state);

  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const addressId = route.params.address._id;

  const handleUpdateAdress = async () => {
    try {
      const updatedAddress = {
        country,
        name,
        mobileNo,
        houseNo,
        street,
        landmark,
        postalCode,
        state,
      };

      const response = await axios.put(
        `http://192.168.222.198:8000/edit-address/${userId}/${addressId}`,
        {
          updatedAddress,
        }
      );

      ToastAndroid.showWithGravity(
        'Address updated successfully!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      navigation.goBack();
    } catch (error) {
      console.log('errrrorrrr', error.message);

      Toast.error('Error updating Address!');
    }
  };

  // addresses.addresses._id
  //     [{"_id": "64ff0c8b78bf5daff1dfea70", "country": "Nigeria", "houseNo": "17", "landmark": "Opposite just rite", "mobileNo": "08105829483", "name": "Ayobami Balogun", "postalCode":
  // "10001", "state": "Lagos", "street": "Power street"},

  //   const navigation = useNavigation();

  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerTitle: 'Edit Address',
  //     });
  //   });

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: 8 }}>
          <View
            style={{
              backgroundColor: '#00CED1',
              padding: 10,
              flexDirection: 'row',
              gap: 75,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>

            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 21,

                color: 'white',
              }}
            >
              Edit Address
            </Text>
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 12,
            }}
          >
            Country
          </Text>
          <View
            style={{
              borderWidth: 1,
              padding: 6,
              borderColor: 'gray',
              borderRadius: 5,
            }}
          >
            <TextInput
              value={country}
              onChangeText={(text) => setCountry(text)}
            />
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 12,
            }}
          >
            Name (First and Last name)
          </Text>
          <View
            style={{
              borderWidth: 1,
              padding: 6,
              borderColor: 'gray',
              borderRadius: 5,
            }}
          >
            <TextInput value={name} onChangeText={(text) => setName(text)} />
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 12,
            }}
          >
            Mobile number
          </Text>
          <View
            style={{
              borderWidth: 1,
              padding: 6,
              borderColor: 'gray',
              borderRadius: 5,
            }}
          >
            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
            />
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 12,
            }}
          >
            Flat, House No, Building, Company
          </Text>
          <View
            style={{
              borderWidth: 1,
              padding: 6,
              borderColor: 'gray',
              borderRadius: 5,
            }}
          >
            <TextInput
              value={houseNo}
              onChangeText={(text) => setHouseNo(text)}
            />
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 12,
            }}
          >
            Area, Street, Sector
          </Text>
          <View
            style={{
              borderWidth: 1,
              padding: 6,
              borderColor: 'gray',
              borderRadius: 5,
            }}
          >
            <TextInput
              value={street}
              onChangeText={(text) => setStreet(text)}
            />
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 12,
            }}
          >
            Landmark
          </Text>
          <View
            style={{
              borderWidth: 1,
              padding: 6,
              borderColor: 'gray',
              borderRadius: 5,
            }}
          >
            <TextInput
              value={landmark}
              onChangeText={(text) => setLandmark(text)}
            />
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 12,
            }}
          >
            State
          </Text>
          <View
            style={{
              borderWidth: 1,
              padding: 6,
              borderColor: 'gray',
              borderRadius: 5,
            }}
          >
            <TextInput value={state} onChangeText={(text) => setState(text)} />
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 12,
            }}
          >
            PostalCode
          </Text>
          <View
            style={{
              borderWidth: 1,
              padding: 6,
              borderColor: 'gray',
              borderRadius: 5,
            }}
          >
            <TextInput
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handleUpdateAdress()}
          style={{
            width: '95%',
            padding: 15,
            backgroundColor: 'orange',
            borderRadius: 5,
            marginHorizontal: 8,
            marginTop: 8,
          }}
        >
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Update Address
          </Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditAddressScreen;
