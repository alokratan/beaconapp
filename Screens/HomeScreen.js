import { StatusBar } from 'react-native';
import { Box ,Text,Image,Pressable,HStack,ScrollView} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Content from '../Components/Content';
import Heading1 from '../Components/Heading1';

import Heading2 from '../Components/Heading2';
import Heading3 from '../Components/Heading3';
import Heading4 from '../Components/Heading4';
import Footer from '../Components/Footer';
import Dispatchdata from './Dispatchdata';
export default function HomeScreen({navigation}) {
  const abc=()=>{
    console.log("hi this is search button");
    navigation.navigate('Gencode');

  }
  return (
    <Box flex={1} w="full" h="full" bg="#E7F0FB" alignItems="center">    
        <StatusBar
        animated={true}
        backgroundColor='#3C5AC8'
        barStyle='light-content'
        />
        <HStack bg="#3C5AC8" justifyContent="space-between" alignItems="center" px={4} w="full" h={70}>
            <Text color="white"fontSize={18} fontWeight={600} >
                BLE Beacons
            </Text>
            <Pressable onPress={abc}> 
            <Ionicons name="search" size={24} color="white" />
            </Pressable>
        </HStack>

        <ScrollView w="full" overflowX="hidden" showsVerticalScrollIndicator={false} >

     
        <Image source={require('../assets/background.jpg')} alt='beacon' w="full" height={300} resizeMode='cover'/>
 
      <Content navigation={navigation} />

   
   <Heading1/>
   {/* <Dispatchdata/> */}
   <Heading2/>
   <Heading3/>
   {/* <Heading4/> */}
   <Footer/>
   </ScrollView>
    </Box>
  ); 
}