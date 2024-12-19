import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type PhotoPreviewScreenRouteProp = RouteProp<RootStackParamList, 'Preview'>;

interface Props {
  route: PhotoPreviewScreenRouteProp;
}

const PhotoPreviewScreen: React.FC<Props> = ({ route }) => {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.thumbnail }} style={styles.image} />
      <Text>{photo.name}</Text>
      <Text>{photo.capturedTime}</Text>
      <Text>{photo.size}</Text>
    </View>
  );
};

export default PhotoPreviewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '80%' },
});
