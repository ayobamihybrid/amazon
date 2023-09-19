import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const SearchBar = () => {
  return (
    <View
      style={{
        backgroundColor: '#00ced1',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
          backgroundColor: 'white',
          width: '90%',
          borderRadius: 3,
          marginVertical: 7,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 7 }}>
          <AntDesign name="search1" size={24} color="black" />
          <TextInput placeholder="Search amazon" />
        </View>
      </View>

      <Feather name="mic" size={24} color="black" />
    </View>
  );
};

export default SearchBar;
