import React from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, PhotoType } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { camera } from '../utils/svg';
import { SvgXml } from 'react-native-svg';

type PhotosNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Photos'>;

const PhotosScreen: React.FC = () => {
  const navigation = useNavigation<PhotosNavigationProp>();
  const photos: PhotoType[] = useSelector((state: any) => state.photos.photos);

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Preview', { photo: item })}
          >
            <View style={styles.itemContent}>
              <Image source={{ uri: item.thumbnail }} style={styles.image} resizeMode="cover" />
              <View style={styles.item}>
                <Text>{item.name}</Text>
                <Text>{item.capturedTime}</Text>
                <Text>{item.size}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.fbContainer}
        onPress={() => navigation.navigate('Camera')}
      >
        <View
          style={styles.fbView}
        >
          <SvgXml
            xml={camera}
            style={styles.cameraStyle}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PhotosScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  fbContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  fbView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  item: { marginLeft: 10 },
  itemContent: { flexDirection: 'row', marginVertical: 10 },
  cameraStyle: {
    flex: 1,
    width: 24,
    height: 24,
  },
  image: { width: 100, height: 100 },
});
