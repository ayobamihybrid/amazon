import {
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SliderBox } from 'react-native-image-slider-box';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  BottomModal,
  SlideAnimation,
  ModalContent,
  ModalTitle,
} from 'react-native-modals';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import { UserType } from '../UserContext';
import { Toast } from 'toastify-react-native';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const list = [
    {
      id: '0',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg',
      name: 'Mobiles',
    },
    {
      id: '1',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg',
      name: 'Deals',
    },
    {
      id: '2',
      image:
        'https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg',
      name: 'Electronics',
    },
    {
      id: '3',
      image: 'https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg',
      name: 'Kitchen',
    },
    {
      id: '4',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg',
      name: 'Music',
    },
    {
      id: '5',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/bankt1/All_ASIN-Icons_Template_2_332.jpg',
      name: 'Kids & Babies',
    },
  ];
  const images = [
    'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
    'https://www.hookedtobooks.com/wp-content/uploads/2020/10/Amazon-Prime-Day-1-1.jpg',
  ];
  const deals = [
    {
      id: '20',
      title: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)',
      oldPrice: 25000,
      price: 19000,
      offer: '72% off',
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg',
        'https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg',
      ],
      color: 'Stellar Green',
      size: '6 GB RAM 128GB Storage',
    },
    {
      id: '30',
      title:
        'Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers',
      oldPrice: 74000,
      price: 26000,
      offer: '72% off',
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
      ],
      color: 'Cloud Navy',
      size: '8 GB RAM 128GB Storage',
    },
    {
      id: '40',
      title:
        'Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger',
      oldPrice: 16000,
      price: 14000,
      offer: '72% off',
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg',
      ],
      color: 'Icy Silver',
      size: '6 GB RAM 64GB Storage',
    },
    {
      id: '40',
      title:
        'realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera',
      oldPrice: 12999,
      price: 10999,
      offer: '72% off',
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg',
      ],
    },
  ];
  const offers = [
    {
      id: '0',
      title:
        'Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)',
      offer: '72% off',
      oldPrice: 7500,
      price: 4500,
      image:
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg',
      ],
      color: 'Green',
      size: 'Normal',
    },
    {
      id: '1',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40% off',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg',
      ],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '2',
      title: 'Aishwariya System On Ear Wireless On Ear Bluetooth Headphones',
      offer: '40% off',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg',
      carouselImages: ['https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg'],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '3',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40% off',
      oldPrice: 24999,
      price: 19999,
      image: 'https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg',
      ],
      color: 'Norway Blue',
      size: '8GB RAM, 128GB Storage',
    },
  ];

  const categoryList = [
    {
      id: 0,
      name: 'all categories',
    },
    {
      id: 1,
      name: "men's clothing",
    },
    {
      id: 2,
      name: "women's clothing",
    },
    {
      id: 3,
      name: 'jewelery',
    },
    {
      id: 4,
      name: 'electronics',
    },
  ];

  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(open);
  const [category, setCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [defaultName, setDefaultName] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  const { userId, setUserId } = useContext(UserType);
  const { addresses, setAddresses } = useContext(UserType);

  const { user, setUser } = useContext(UserType);

  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (userId) {
      getAddresses();
    }
  }, [userId, modalVisible]);

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

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const decodeToken = jwt_decode(token);
        const userId = decodeToken.id;

        setUserId(userId);
      } catch (error) {
        Toast.error('No user found');
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const productData = response.data.map((product) => ({
          ...product,
          quantity: 0,
        }));

        setProducts(productData);
      } catch (error) {
        console.log('Error:', error.message);
      }
    };
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      cart === [] && setAddedToCart(false);
    }, [])
  );

  const handleCategory = (categoryName) => {
    setCategory(categoryName);
    setOpen(false);
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? 10 : 0,
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView>
        <SearchBar />

        <View
          style={{
            backgroundColor: '#afeeee',
            flexDirection: 'row',
            gap: 6,
            paddingVertical: 8,
            paddingHorizontal: 6,
            alignItems: 'center',
          }}
        >
          <SimpleLineIcons name="location-pin" size={22} color="black" />
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: 'row',
              gap: 2,
              alignItems: 'center',
            }}
          >
            {selectedItem ? (
              <Text>
                Deliver to {selectedItem.name} - {selectedItem.state}
                {selectedItem.postalCode}
              </Text>
            ) : (
              <Text>Add an address</Text>
            )}

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor: 'white', padding: 10 }}
        >
          {list.map((item, index) => (
            <TouchableOpacity>
              <View
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}
              >
                <Image
                  source={{ uri: item?.image }}
                  style={{ height: 50, width: 50 }}
                  resizeMode="contain"
                />
                <Text> {item?.name} </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <SliderBox
          images={images}
          autoPlay
          circleLoop
          dotColor={'#13274f'}
          inactiveDotColor={'#90a4ae'}
          ImageComponentStyle={{ width: '100%' }}
          parentWidth={400}
        />
        <Text
          style={{
            marginTop: 13,
            fontSize: 18,
            fontWeight: 600,
            paddingHorizontal: 10,
          }}
        >
          Trending deals of the week
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 5,
          }}
        >
          {deals.map((deal, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Info', {
                  id: deal.id,
                  title: deal.title,
                  price: deal?.price,
                  carouselImages: deal?.carouselImages,
                  color: deal?.color,
                  size: deal?.size,
                  oldPrice: deal?.oldPrice,
                  offer: deal?.offer,
                  item: deal,
                })
              }
            >
              <View
                key={index}
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{ uri: deal.image }}
                  style={{ height: 180, width: 170 }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%',
            marginTop: 10,
          }}
        />
        <Text style={{ padding: 10, fontSize: 16, fontWeight: 600 }}>
          Today's Deals
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor: 'white', paddingVertical: 15 }}
        >
          {offers.map((offer) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Info', {
                  id: offer.id,
                  title: offer.title,
                  price: offer?.price,
                  carouselImages: offer?.carouselImages,
                  color: offer?.color,
                  size: offer?.size,
                  oldPrice: offer?.oldPrice,
                  offer: offer?.offer,
                  item: offer,
                })
              }
            >
              <View
                style={{
                  flexDirection: 'column',
                  gap: 7,
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{ uri: offer.image }}
                  style={{ height: 160, width: 160, resizeMode: 'contain' }}
                />
                <View
                  style={{
                    backgroundColor: 'orange',
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: 'white' }}>
                    Up to {offer.offer} off
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%',
            marginTop: 10,
          }}
        />

        <View
          style={{
            position: 'relative',
            marginHorizontal: 15,
            marginTop: 15,
            marginBottom: open === true ? 200 : 15,
            borderWidth: 1,
            borderColor: 'gray',
            width: 150,
            padding: 10,
            borderRadius: 6,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => setOpen(!open)}
          >
            <Text>{category === '' ? 'Choose category' : category}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </TouchableOpacity>

          {open === true ? (
            <View
              style={{
                position: 'absolute',
                marginBottom: 10,
                top: 50,
                left: 0,
                width: 150,
                paddingVertical: 15,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
                flexDirection: 'column',
                gap: 20,
                padding: 5,
                zIndex: 9999,
              }}
            >
              {categoryList.map((category) => (
                <TouchableOpacity>
                  <Text onPress={() => handleCategory(category.name)}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
        </View>

        {category === '' || category === 'all categories' ? (
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}
          >
            {products.map((product, index) => (
              <ProductCard
                product={product}
                key={index}
                addedToCart={addedToCart}
                setAddedToCart={setAddedToCart}
              />
            ))}
          </View>
        ) : (
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}
          >
            {products
              .filter((prod) => prod.category === category)
              .map((product, index) => (
                <ProductCard
                  product={product}
                  key={index}
                  addedToCart={addedToCart}
                  setAddedToCart={setAddedToCart}
                />
              ))}
          </View>
        )}

        <BottomModal
          visible={modalVisible}
          onHardwareBackPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          onTouchOutside={() => setModalVisible(false)}
          modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
          swipeDirection={['up', 'down']}
          swipeThreshold={200}
        >
          <ModalContent>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>
              Choose your Location
            </Text>
            <Text style={{ fontSize: 15, paddingVertical: 10 }}>
              Select a delivery location to see product availability and
              delivery options
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {addresses?.addresses?.map((address, index) => (
                <TouchableOpacity
                  onPress={() => setSelectedItem(address)}
                  key={index}
                  style={{
                    marginVertical: 10,
                    marginRight: 10,
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#D0D0D0',
                    width: 130,
                    height: 130,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 3,
                    backgroundColor:
                      selectedItem === address ? '#afeeee' : 'white',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                      paddingBottom: 5,
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                      Address {index + 1}
                    </Text>
                    <Entypo name="location-pin" size={24} color="black" />
                  </View>

                  <Text numberOfLines={1}>
                    {address.houseNo} {address?.street}
                  </Text>
                  <Text numberOfLines={1}>{address?.landmark}</Text>
                  <Text numberOfLines={1}>{address?.state}</Text>
                </TouchableOpacity>
              ))}

              <View
                style={{
                  marginVertical: 10,
                  padding: 8,
                  borderWidth: 1,
                  borderRadius: 3,
                  borderColor: 'gray',
                  width: 130,
                  height: 130,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Address');
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#0066b2' }}>
                    Add an address or pick-up point
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <View
              style={{
                flexDirection: 'column',
                gap: 10,
                marginHorizontal: -5,
                marginBottom: 30,
              }}
            >
              <View
                style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
              >
                <Entypo name="location-pin" size={22} color="#0066b2" />
                <TouchableOpacity>
                  <Text style={{ color: '#0066b2' }}>Enter a Postal Code</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <MaterialIcons
                  name="location-searching"
                  size={22}
                  color="#0066b2"
                />
                <TouchableOpacity>
                  <Text style={{ color: '#0066b2' }}>
                    Use My Current Location
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <Ionicons name="earth" size={22} color="#0066b2" />
                <TouchableOpacity>
                  <Text style={{ color: '#0066b2' }}>
                    Deliver Outside Nigeria
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ModalContent>
        </BottomModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
