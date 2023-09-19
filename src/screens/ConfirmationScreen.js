import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { UserType } from '../UserContext';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Toast } from 'toastify-react-native';
import { useNavigation } from '@react-navigation/native';
import { clearCart } from '../redux/CartReducer';

const ConfirmationScreen = () => {
  const processes = [
    { name: 'Address', content: 'Address Form' },
    { name: 'Delivery', content: 'Delivery Options' },
    { name: 'Payment', content: 'Payment Details' },
    { name: 'Place Order', content: 'Order Summary' },
  ];

  const [currStep, setCurrStep] = useState(0);
  const { addresses, setAddresses } = useContext(UserType);
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { userId, setUserId } = useContext(UserType);

  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const roundedTotal = total.toFixed(2);

  const totalQty = cart
    ?.map((item) => item.quantity * 1)
    .reduce((curr, prev) => curr + prev, 0);

  const delivery = 0;

  const orderTotal = total + delivery;
  const orderTotalRounded = orderTotal.toFixed(2);

  const handleOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cart: cart,
        shippingAddress: deliveryAddress,
        totalPrice: total,
        paymentMethod: selectedOption,
      };

      const response = await axios.post(
        'http://192.168.222.198:8000/orders',
        orderData
      );

      if (response.status === 200) {
        dispatch(clearCart());
        navigation.replace('Order');
      } else {
        console.log('Error creating orders', response.data);
      }
    } catch (error) {
      Toast.error('Error creating orders!');
      console.log('Error message:', error.message);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView show showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 25,
            marginBottom: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 12,
          }}
        >
          {processes.map((process, index) => (
            <View
              style={{ flexDirection: 'column', alignItems: 'center', gap: 5 }}
            >
              <View>
                {index < currStep ? (
                  <View
                    style={{
                      backgroundColor: 'green',
                      padding: 10,
                      width: 35,
                      height: 35,
                      borderRadius: 30,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        position: 'absolute',
                        top: 6,
                        fontSize: 16,
                      }}
                    >
                      &#10003;
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: '#ccc',
                      padding: 10,
                      width: 35,
                      height: 35,
                      borderRadius: 30,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        position: 'absolute',
                        top: 8,
                      }}
                    >
                      {index + 1}
                    </Text>
                  </View>
                )}
              </View>
              <Text>{process.name}</Text>
            </View>
          ))}
        </View>

        {currStep === 0 && (
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginHorizontal: 11,
                marginTop: 15,
              }}
            >
              Select Delivery Address
            </Text>

            <View>
              {addresses.addresses?.map((address) => (
                <View
                  style={{
                    borderWidth: 1,
                    width: '93%',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    marginVertical: 7,
                    borderColor: 'gray',
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                    padding: 10,
                  }}
                >
                  {deliveryAddress._id === address._id ? (
                    <FontAwesome
                      name="dot-circle-o"
                      size={28}
                      color="#00ced1"
                    />
                  ) : (
                    <Entypo
                      name="circle"
                      size={24}
                      color="black"
                      onPress={() => setDeliveryAddress(address)}
                    />
                  )}

                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <Text>{address.name}</Text>
                      <Entypo name="location-pin" size={24} color="red" />
                    </View>

                    <Text>
                      {address?.houseNo}, {address?.street}
                    </Text>
                    <Text>{address?.landmark}</Text>
                    <Text>
                      {address?.state} {address?.country}
                    </Text>
                    <Text>{address?.mobileNo} </Text>
                    <Text>{address?.postalCode} </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 8,
                        alignItems: 'center',
                        marginVertical: 6,
                      }}
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
                          backgroundColor: 'white',
                          borderWidth: 1,
                          borderColor: 'gray',
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            color: 'gray',
                            fontWeight: 'bold',
                          }}
                        >
                          Edit
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          padding: 5,
                          borderRadius: 5,
                          backgroundColor: 'white',
                          borderWidth: 1,
                          borderColor: 'gray',
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            color: 'gray',
                            fontWeight: 'bold',
                          }}
                        >
                          Remove
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          padding: 5,
                          borderRadius: 5,
                          backgroundColor: 'white',
                          borderWidth: 1,
                          borderColor: 'gray',
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            color: 'gray',
                            fontWeight: 'bold',
                          }}
                        >
                          Set as Default
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={() => setCurrStep(1)}
                      style={{
                        backgroundColor: '#00ced1',
                        padding: 8,
                        borderRadius: 20,
                        marginVertical: 10,
                      }}
                    >
                      <Text style={{ color: 'white', textAlign: 'center' }}>
                        Deliver to this address
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
            <View style={{ height: 100 }} />
          </View>
        )}

        <View>
          {currStep === 1 && (
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginHorizontal: 11,
                  marginTop: 15,
                }}
              >
                Choose your delivery options
              </Text>

              <View
                style={{
                  marginVertical: 8,
                  flexDirection: 'row',
                  gap: 6,
                  backgroundColor: 'white',
                  padding: 5,
                  alignItems: 'center',
                  width: '93%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                {selected ? (
                  <FontAwesome
                    name="dot-circle-o"
                    size={28}
                    color="#00ced1"
                    onPress={() => setSelected(!selected)}
                  />
                ) : (
                  <Entypo
                    name="circle"
                    size={24}
                    color="black"
                    onPress={() => setSelected(!selected)}
                  />
                )}
                <Text style={{ width: '95%' }}>
                  Delivery between 2 - 3 working days. FREE delivery with your
                  prime membership
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setCurrStep(2)}
                style={{
                  backgroundColor: '#FFC72C',
                  padding: 10,
                  borderRadius: 20,
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View>
          {currStep === 2 && (
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginHorizontal: 11,
                  marginTop: 15,
                }}
              >
                Select your payment Method
              </Text>

              <View
                style={{
                  marginVertical: 8,
                  flexDirection: 'row',
                  gap: 6,
                  backgroundColor: 'white',
                  paddingHorizontal: 5,
                  paddingVertical: 8,
                  alignItems: 'center',
                  width: '93%',
                  height: 50,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                {selectedOption === 'cash' ? (
                  <FontAwesome name="dot-circle-o" size={28} color="#00ced1" />
                ) : (
                  <Entypo
                    name="circle"
                    size={24}
                    color="black"
                    onPress={() => setSelectedOption('cash')}
                  />
                )}
                <Text>Cash on Delivery</Text>
              </View>

              <View
                style={{
                  marginVertical: 8,
                  flexDirection: 'row',
                  gap: 6,
                  backgroundColor: 'white',
                  padding: 5,
                  alignItems: 'center',
                  width: '93%',
                  height: 50,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                {selectedOption === 'card' ? (
                  <FontAwesome name="dot-circle-o" size={28} color="#00ced1" />
                ) : (
                  <Entypo
                    name="circle"
                    size={24}
                    color="black"
                    onPress={() => setSelectedOption('card')}
                  />
                )}
                <Text>Credit or Debit card</Text>
              </View>

              <TouchableOpacity
                onPress={() => setCurrStep(3)}
                style={{
                  backgroundColor: '#FFC72C',
                  padding: 10,
                  borderRadius: 20,
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View>
          {currStep === 3 && (
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginHorizontal: 11,
                  marginTop: 15,
                }}
              >
                Order Now
              </Text>

              <View
                style={{
                  marginVertical: 8,
                  backgroundColor: 'white',
                  paddingHorizontal: 5,
                  paddingVertical: 8,
                  width: '93%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <Text>Delivery to {deliveryAddress.name}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 6,
                  }}
                >
                  <Text>Item</Text>
                  <Text>${orderTotalRounded}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 6,
                  }}
                >
                  <Text>delivery</Text>
                  <Text>$0</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 12,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}
                  >
                    Order Total
                  </Text>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>
                    ${roundedTotal}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginVertical: 8,
                  flexDirection: 'row',
                  gap: 6,
                  backgroundColor: 'white',
                  padding: 5,
                  alignItems: 'center',
                  width: '93%',
                  height: 50,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <View style={{ flexDirection: 'column', gap: 5 }}>
                  <Text>Pay with: </Text>
                  <Text style={{ fontWeight: 'bold' }}>
                    Pay on delivery (Cash)
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleOrder}
                style={{
                  backgroundColor: '#FFC72C',
                  padding: 10,
                  borderRadius: 20,
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Place your Order
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmationScreen;
