import {
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from '../redux/CartReducer';
import SearchBar from '../components/SearchBar';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const roundedTotal = total.toFixed(2);

  const totalQty = cart
    ?.map((item) => item.quantity * 1)
    .reduce((curr, prev) => curr + prev, 0);

  const dispatch = useDispatch();
  const incrementQuantity = (item) => {
    dispatch(incrementQty(item));
  };

  const decrementQuantity = (item) => {
    dispatch(decrementQty(item));
  };

  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };
  const navigation = useNavigation();

  return (
    <ScrollView style={{ marginTop: 55, flex: 1, backgroundColor: 'white' }}>
      <SearchBar />

      <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '400' }}>Subtotal : </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>${roundedTotal}</Text>
      </View>
      <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Confirm')}
        style={{
          backgroundColor: '#FFC72C',
          padding: 10,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text>Proceed to Buy ({totalQty}) items</Text>
      </TouchableOpacity>

      <Text
        style={{
          height: 1,
          borderColor: '#D0D0D0',
          borderWidth: 1,
          marginTop: 16,
        }}
      />

      <View style={{ marginHorizontal: 10 }}>
        {cart?.map((item, index) => (
          <View
            style={{
              backgroundColor: 'white',
              marginVertical: 10,
              borderBottomColor: '#F0F0F0',
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
            key={index}
          >
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Image
                  style={{ width: 140, height: 140, resizeMode: 'contain' }}
                  source={{ uri: item?.image }}
                />
              </View>

              <View>
                <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
                  {item?.title}
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: 'bold', marginTop: 6 }}
                >
                  ${item?.price}
                </Text>
                <Image
                  style={{ width: 30, height: 30, resizeMode: 'contain' }}
                  source={{
                    uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png',
                  }}
                />
                <Text style={{ color: 'green' }}>In Stock</Text>
                <Text style={{ fontWeight: '500', marginTop: 6 }}>
                  {item?.rating?.rate} ratings
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={{
                marginTop: 15,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
              >
                {item?.quantity > 1 ? (
                  <TouchableOpacity
                    onPress={() => decrementQuantity(item)}
                    style={{
                      backgroundColor: '#D8D8D8',
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="minus" size={24} color="black" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => deleteItem(item)}
                    style={{
                      backgroundColor: '#D8D8D8',
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </TouchableOpacity>
                )}

                <View
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 18,
                    paddingVertical: 6,
                  }}
                >
                  <Text>{item?.quantity}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => incrementQuantity(item)}
                  style={{
                    backgroundColor: '#D8D8D8',
                    padding: 7,
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}
                >
                  <Feather name="plus" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => deleteItem(item)}
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: '#C0C0C0',
                  borderWidth: 0.6,
                }}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </Pressable>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginBottom: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: '#C0C0C0',
                  borderWidth: 0.6,
                }}
              >
                <Text>Save For Later</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: '#C0C0C0',
                  borderWidth: 0.6,
                }}
              >
                <Text>See More Like this</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;
