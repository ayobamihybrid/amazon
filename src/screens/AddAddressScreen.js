import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Toast } from 'toastify-react-native';
import { UserType } from '../UserContext';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [addresses, setAddresses] = useState([]);
  // console.log('gg');

  useEffect(() => {
    getAddresses();
  }, []);

  const getAddresses = async () => {
    try {
      const res = await axios.get(
        `http://192.168.222.198:8000/get-addresses/${userId}`
      );
      setAddresses(res.data);
    } catch (error) {
      Toast.error(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAddresses();
    }, [])
  );

  const handleRemoveAddress = async (addressId) => {
    try {
      const response = await axios.delete(
        `http://192.168.222.198:8000/delete-address/${userId}/${addressId}`
      );

    } catch (error) {
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Request:', error.request);
      }
      Toast.error('Error removing address!');
    }
  };

  return (
    <SafeAreaView>
      <View>
        <SearchBar />

        <Text style={{ fontWeight: 'bold', fontSize: 18, padding: 10 }}>
          Your Addresses
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Add')}
          style={{
            borderWidth: 1,
            borderColor: '#00ced1',
            borderLeftWidth: 0,
            borderRightWidth: 0,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View>
          {addresses?.addresses?.map((address, index) => (
            <KeyboardAvoidingView
              key={index}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                width: '95%',
                borderColor: '#00ced1',
                padding: 5,
                margin: 8,
              }}
            >
              <View
                style={{ alignItems: 'center', flexDirection: 'row', gap: 6 }}
              >
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  Address {index + 1}
                </Text>
                <Entypo name="location-pin" size={24} color="#00ced1" />
              </View>

              <Text>
                {address.houseNo}, {address.landmark}
              </Text>

              <Text>{address.street}</Text>
              <Text>{address.mobileNo}</Text>
              <Text>{address.postalCode}</Text>

              <View
                style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditAddress', {
                      address: address,
                    })
                  }
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    backgroundColor: '#00ced1',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: 'white' }}>
                    Edit
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleRemoveAddress(address._id)}
                  style={{
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: '#00ced1',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: 'white' }}>
                    Remove
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: '#00ced1',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: 'white' }}>
                    Set as Default
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          ))}

          <View style={{ height: 200 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAddressScreen;
