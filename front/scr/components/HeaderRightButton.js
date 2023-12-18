import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const HeaderRightButton = ({ tintColor }) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('Camera')} hitSlop={10}>
      <MaterialCommunityIcons name="camera" size={20} color={tintColor} />
    </Pressable>
  );
};

HeaderRightButton.propTypes = {
  tintColor: PropTypes.string,
};

export default HeaderRightButton;
