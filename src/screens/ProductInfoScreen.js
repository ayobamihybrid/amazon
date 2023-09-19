import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartReducer';
import SearchBar from '../components/SearchBar';

const ProductInfoScreen = () => {
  const [addedToCart, setAddedToCart] = useState(false);

  const route = useRoute();
  const { width } = Dimensions.get('window');
  const height = (width * 100) / 100;

  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const addItem = (item) => {
    dispatch(addToCart(item));
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: 20,
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 20 }}
        >
          {route.params.carouselImages.map((images, index) => (
            <ImageBackground
              key={index}
              source={{ uri: images }}
              style={{
                width,
                height,
                resizeMode: 'contain',
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    padding: 5,
                    backgroundColor: '#008e97',
                    borderRadius: 50,
                    width: 45,
                    height: 45,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{ color: 'white', width: 30, textAlign: 'center' }}
                  >
                    {route.params.offer}
                  </Text>
                </View>

                <TouchableOpacity>
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: 'gray',
                      borderRadius: 50,
                      width: 40,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="share-variant"
                      size={26}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={{ marginTop: 'auto' }}>
                <View
                  style={{
                    backgroundColor: 'gray',
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AntDesign name="hearto" size={28} color="white" />
                </View>
              </TouchableOpacity>
            </ImageBackground>
          ))}
        </ScrollView>

        <View style={{ padding: 10 }}>
          <Text>{route.params.title}</Text>
          <Text style={{ marginTop: 5, fontSize: 16, fontWeight: 600 }}>
            ${route.params.price}
          </Text>
        </View>

        <View style={{ borderWidth: 1, borderColor: 'gray', width: '100%' }} />

        <View style={{ padding: 10 }}>
          <Text>
            Color: &nbsp;
            <Text style={{ fontSize: 16, fontWeight: 600 }}>
              {route.params.color}
            </Text>
          </Text>

          <Text style={{ marginTop: 10 }}>
            Size: &nbsp;
            <Text style={{ fontSize: 16, fontWeight: 600 }}>
              {route.params.size}
            </Text>
          </Text>
        </View>

        <View style={{ borderWidth: 1, borderColor: 'gray', width: '100%' }} />

        <Text style={{ padding: 10, fontWeight: 600 }}>
          Total: ${route.params.price}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 3,
            alignItems: 'center',
            paddingHorizontal: 5,
          }}
        >
          <Entypo name="location-pin" size={24} color="black" />
          <Text style={{ fontSize: 16, fontWeight: 600 }}>
            Deliver To Ayobami - Lagos 100001
          </Text>
        </View>

        <Text
          style={{
            color: '#008e97',
            fontSize: 16,
            fontWeight: 600,
            padding: 10,
          }}
        >
          IN Stock
        </Text>

        <TouchableOpacity onPress={() => addItem(route.params.item)}>
          <View
            style={{
              margin: 10,
              width: '95%',
              backgroundColor: '#00ced1',
              borderRadius: 20,
              padding: 10,
            }}
          >
            {addedToCart ? (
              <Text
                style={{ textAlign: 'center', color: 'white', fontSize: 16 }}
              >
                Added to Cart!
              </Text>
            ) : (
              <Text
                style={{ textAlign: 'center', color: 'white', fontSize: 16 }}
              >
                Add to Cart
              </Text>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              marginBottom: 50,
              width: '95%',
              backgroundColor: '#00ced1',
              borderRadius: 20,
              padding: 10,
            }}
          >
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 16 }}>
              Buy Now
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductInfoScreen;
