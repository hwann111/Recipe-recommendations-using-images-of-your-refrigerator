import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PRIMARY } from '../color';

const ImageButton = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={navigation.navigate('Camera')} hitSlop={30}>
        <Image source={require('../../assets/main.png')} style={styles.image} />
      </Pressable>
      <Text style={styles.text}>사진을 찍어주세요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 10,
    color: PRIMARY.DARK,
    fontSize: 20,
    fontWeight: '700',
  },
});

export default ImageButton;
