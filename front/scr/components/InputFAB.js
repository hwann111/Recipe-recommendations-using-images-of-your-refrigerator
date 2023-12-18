import {
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const RIGHT = 10;
const BUTTON_WIDTH = 60;

const InputFAB = ({ onInsert, isBottom }) => {
  const [text, setText] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const inputRef = useRef();
  const windowWidth = useWindowDimensions().width;
  const inputWidth = useRef(new Animated.Value(BUTTON_WIDTH)).current;
  const buttonRight = useRef(new Animated.Value(RIGHT)).current;

  const open = () => {
    setIsOpened(true);
    Animated.timing(inputWidth, {
      toValue: windowWidth - 20,
      useNativeDriver: false,
      duration: 300,
    }).start(() => {
      inputRef.current.focus();
    });
  };

  const close = () => {
    if (isOpened) {
      setText('');
      setIsOpened(false);
      Animated.timing(inputWidth, {
        toValue: BUTTON_WIDTH,
        useNativeDriver: false,
        duration: 200,
      }).start(() => {
        inputRef.current.blur();
      });
    }
  };

  const onPressButton = () => {
    isOpened ? close() : open();
  };

  const onPressInsert = () => {
    const task = text.trim();
    if (task) {
      onInsert(task);
    }
  };

  useEffect(() => {
    Animated.timing(buttonRight, {
      toValue: isBottom ? RIGHT - BUTTON_WIDTH : RIGHT,
      useNativeDriver: false,
    }).start();
  }, [buttonRight, isBottom]);

  return (
    <>
      <Animated.View
        style={[
          styles.position,
          styles.shape,
          styles.shadow,
          {
            justifyContent: 'center',
            width: inputWidth,
            right: buttonRight,
          },
        ]}
      >
        <TextInput
          ref={inputRef}
          onBlur={close}
          value={text}
          onChangeText={(text) => setText(text)}
          style={[styles.input]}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          keyboardAppearance="light"
          returnKeyType="done"
          onSubmitEditing={onPressInsert}
        />
      </Animated.View>

      <Pressable
        style={({ pressed }) => [
          styles.position,
          styles.shape,
          styles.button,
          pressed && { backgroundColor: PRIMARY.DARK },
        ]}
        onPress={onPressButton}
      >
        <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
      </Pressable>
    </>
  );
};

InputFAB.propTypes = {
  onInsert: PropTypes.func.isRequired,
  isBottom: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    bottom: 30,
  },
  shape: {
    height: BUTTON_WIDTH,
    width: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    backgroundColor: PRIMARY.DEFAULT,
  },
  input: {
    color: WHITE,
    paddingLeft: 20,
    paddingRight: BUTTON_WIDTH + 10,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY.DEFAULT,
  },
  shadow: {
    shadowColor: BLACK,
    elevation: 5,
  },
});

export default InputFAB;
