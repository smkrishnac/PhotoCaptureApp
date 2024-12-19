import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import { Camera, CameraDevice, useCameraDevices } from 'react-native-vision-camera';
import { useDispatch } from 'react-redux';
import { addPhoto } from '../redux/PhotosSlice';
import RNFS from 'react-native-fs';
import { Picker } from '@react-native-picker/picker';

const CameraScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const devices = useCameraDevices();
    const [selectedDevice, setSelectedDevice] = useState<CameraDevice>();
    const [aspectRatio, setAspectRatio] = useState('16:9');
    const [zoomLevel, setZoomLevel] = useState(1);
    const [hasPermission, setHasPermission] = useState(false);
    const cameraRef = useRef<Camera>(null);

    useEffect(() => {
        const requestPermissions = async () => {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'granted');
        };
        requestPermissions();
    }, []);

    useEffect(() => {
        // Fallback to find the back camera if not directly available
        if (devices && devices.length > 0) {
          const backCamera = devices.find((device) => device.position === 'back');
          setSelectedDevice(backCamera || devices[0]);
        }
      }, [devices]);

      const capturePhoto = async () => {
        if (cameraRef.current) {
          const photo = await cameraRef.current.takePhoto();
          const fileName = `photo_${Date.now()}.jpg`;
          const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

          await RNFS.moveFile(photo.path, filePath);

          const photoData = {
            id: Date.now().toString(),
            name: fileName,
            thumbnail: `file://${filePath}`,
            fullPath: filePath,
            capturedTime: new Date().toISOString(),
            size: `${photo.width * photo.height} px`,
          };

          dispatch(addPhoto(photoData));
          navigation.goBack();
        }
      };

      if (!selectedDevice) {return <Text>Loading Camera...</Text>;}
    if (!hasPermission) {return <Text>Camera permission not granted</Text>;}

    const { width } = Dimensions.get('window');
    const height = aspectRatio === '16:9' ? (width * 9) / 16 : (width * 3) / 4;

    const handleLensSwitch = (zoom: number) => {
        setZoomLevel(zoom);
    };

    return (
        <View style={styles.container}>
          <Camera
            ref={cameraRef}
            style={[styles.camera, { height }]}
            device={selectedDevice}
            isActive
            photo
            zoom={zoomLevel}
          />
          <View style={styles.controls}>
            <Picker
              selectedValue={aspectRatio}
              onValueChange={(value) => setAspectRatio(value)}
              style={styles.picker}
            >
              <Picker.Item label="16:9" value="16:9" />
              <Picker.Item label="4:3" value="4:3" />
            </Picker>
            <View style={styles.zoomControls}>
              <TouchableOpacity
                style={[styles.zoomButton, zoomLevel === 0.5 && styles.zoomButtonActive]}
                onPress={() => handleLensSwitch(0.5)}
              >
                <Text style={styles.buttonText}>0.5x</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.zoomButton, zoomLevel === 1 && styles.zoomButtonActive]}
                onPress={() => handleLensSwitch(1)}
              >
                <Text style={styles.buttonText}>1x</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.zoomButton, zoomLevel === 2 && styles.zoomButtonActive]}
                onPress={() => handleLensSwitch(2)}
              >
                <Text style={styles.buttonText}>2x</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.captureButton} onPress={capturePhoto}>
              <Text style={styles.buttonText}>Capture</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
      },
      camera: {
        marginTop: 20,
        width: '100%',
      },
      controls: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
      },
      picker: {
        width: 200,
        color: 'white',
        marginVertical: 10,
      },
      zoomControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        marginVertical: 10,
      },
      zoomButton: {
        padding: 10,
        backgroundColor: '#333',
        borderRadius: 5,
      },
      zoomButtonActive: {
        backgroundColor: '#007bff',
      },
      captureButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginVertical: 20,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
    });

export default CameraScreen;
