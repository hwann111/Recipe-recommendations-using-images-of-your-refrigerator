import { Image, StyleSheet, Text, View, Keyboard, Alert } from 'react-native';
import Input, {
  IconNames,
  KeyboardTypes,
  ReturnKeyTypes,
} from '../components/Input';
import SafeInputView from '../components/SafeInputView';
import { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import { signIn } from '../api/auth';
import PropTypes from 'prop-types';
import { PRIMARY } from '../color';
import { useUserContext } from '../contexts/UserContext';
import TextButton from '../components/TextButton';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes } from '../navigations/routes';
import HR from '../components/HR';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [disabled, setdisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();
  const navigation = useNavigation();

  useEffect(() => {
    setdisabled(!email || !password);
  }, [email, password]);

  const onSubmit = async () => {
    if (!isLoading && !disabled) {
      try {
        setIsLoading(true);
        Keyboard.dismiss();
        const data = await signIn(email, password);
        setIsLoading(false);
        setUser(data);
      } catch (error) {
        Alert.alert('로그인 실패', error, [
          { text: '확인', onPress: () => setIsLoading(false) },
        ]);
      }
      setIsLoading(false);
    }
  };

  return (
    <SafeInputView>
      <View style={styles.container}>
        <Text style={styles.titles}>냉장고를 부탁해</Text>
        <Image source={require('../../assets/main.png')} style={styles.image} />

        <Input
          title={'이메일'}
          placeholer="your@email.com"
          keyboardType={KeyboardTypes.EMAIL}
          returnKeyType={ReturnKeyTypes.NEXT}
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
          //값이 저장이 안됨
          iconName={IconNames.EMAIL}
          onSubmitEditing={() => passwordRef.current.focus()}
          //입력칸 이동 기능을 추가했으나 작동을 안함 287P
        />
        <Input
          ref={passwordRef}
          title={'비밀번호'}
          returnKeyType={ReturnKeyTypes.DONE}
          secureTextEntry
          value={password}
          onChangeText={(password) => setPassword(password.trim())}
          iconName={IconNames.PASSWORD}
          onSubmitEditing={onSubmit}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="로그인"
            onPress={onSubmit}
            disabled={disabled}
            isLoading={isLoading}
          />
        </View>

        <HR text={'OR'} styles={{ container: { marginVertical: 30 } }} />

        <TextButton
          title={'회원가입'}
          onPress={() => navigation.navigate(AuthRoutes.SIGN_UP)}
        />
      </View>
    </SafeInputView>
  );
};

SignInScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //글자 폰트랑 크기를 수정해야함
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  titles: {
    marginBottom: 20,
    fontSize: 40,
    fontWeight: '600',
    color: PRIMARY.DEFAULT,
  },
});

export default SignInScreen;
