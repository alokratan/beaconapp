import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider} from 'native-base'
import { Box ,Text} from 'native-base';
import HomeScreen from './Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Mystack from './Mystack';
export default function App() {
  return (
    <NativeBaseProvider>
        <NavigationContainer>
        <Mystack/>
    </NavigationContainer>
    </NativeBaseProvider>
  );
}