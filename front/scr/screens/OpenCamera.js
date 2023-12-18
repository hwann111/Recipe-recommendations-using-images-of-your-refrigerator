import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { WHITE } from '../color';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

const CameraComponent = () => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);

  // 카메라 권한 요청 함수
  const requestCameraPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: '카메라 권한 요청',
        message: '이 앱은 카메라 접근 권한이 필요합니다.',
        buttonNeutral: '나중에',
        buttonNegative: '거부',
        buttonPositive: '허용',
      }
    );

    setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  // 사진 찍기 함수
  const takePicture = async () => {
    if (cameraRef.current && hasPermission) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);

      // 서버로 사진 전송
      sendPictureToServer(data.uri);
    }
  };

  // 사진을 서버로 전송하는 함수
  const sendPictureToServer = async (photoUri) => {
    const formData = new FormData();
    formData.append('photo', {
      uri: photoUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      // 서버로 POST 요청 보내기
      const response = await axios.post('YOUR_SERVER_URL', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('사진 전송 오류:', error);
    }
  };

  return (
    <RNCamera ref={cameraRef} style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity onPress={takePicture}>
        <Text>사진 찍기</Text>
      </TouchableOpacity>
    </RNCamera>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    Width: '90%',
    height: 300,
    alignSelf: 'center',
    borderRadius: 6,
  },
  btnCam: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    borderRadius: 6,
    backgroundColor: 'green',
  },
  textBtn: {
    color: WHITE,
  },
});
