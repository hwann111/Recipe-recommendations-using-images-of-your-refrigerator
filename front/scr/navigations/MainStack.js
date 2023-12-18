import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PRIMARY, WHITE } from '../color';
import HeaderLeftButton from '../components/HeaderLeftButton';
import HeaderRightButton from '../components/HeaderRightButton';
import StartScreen from '../screens/StartScreen';
import ImageButton from '../components/ImageButton';
import OpenCamera from '../screens/OpenCamera';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerTitleAlign: 'center',
        headerTintColor: PRIMARY.DEFAULT,
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerLeft: HeaderLeftButton,
      }}
    >
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{
          title: 'Start',
          headerRight: HeaderRightButton,
        }}
      />
      <Stack.Screen name="Camera" component={OpenCamera} />
    </Stack.Navigator>
  );
};

export default MainStack;
