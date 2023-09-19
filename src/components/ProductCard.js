import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementQty } from '../redux/CartReducer';
import { useFocusEffect } from '@react-navigation/native';

const ProductCard = ({ product, index, addedToCart, setAddedToCart }) => {
  const [selectedItem, setSelectedItem] = useState([]);
  const [productQty, setProductQty] = useState(product.quantity);

  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const addItem = (item) => {
    dispatch(addToCart(item));

    setSelectedItem(item);
    setProductQty((qty) => qty + 1);
    setAddedToCart(true);
  };

  const removeItem = (item) => {
    dispatch(decrementQty(item));

    setProductQty((qty) => qty - 1);
    if (productQty === 1) {
      setProductQty(0);
      setAddedToCart(false);
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <Image
        source={{ uri: product.image }}
        style={{ height: 170, width: 160, resizeMode: 'contain' }}
      />

      <Text numberOfLines={1} style={{ width: 150, padding: 5 }}>
        {product.title}
      </Text>

      <View
        style={{
          width: 150,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 600 }}>${product.price}</Text>
        <Text style={{ color: 'orange' }}>{product.rating.rate} ratings</Text>
      </View>

      {addedToCart && selectedItem.id === product.id ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'center',
            marginTop: 8,
          }}
        >
          <TouchableOpacity onPress={() => removeItem(product)}>
            <View
              style={{
                backgroundColor: '#008e97',
                padding: 5,
                borderRadius: 50,
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  position: 'absolute',
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                -
              </Text>
            </View>
          </TouchableOpacity>

          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: 'black',
              }}
            >
              {productQty}
            </Text>
          </View>

          <TouchableOpacity onPress={() => addItem(product)}>
            <View
              style={{
                backgroundColor: '#008e97',
                padding: 5,
                borderRadius: 50,
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  position: 'absolute',
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                +
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={{ alignItems: 'center', paddingTop: 10 }}
          onPress={() => addItem(product)}
        >
          <View
            style={{
              backgroundColor: '#008e97',
              paddingVertical: 8,
              borderRadius: 20,
              width: 120,
            }}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>
              Add to Cart
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductCard;
