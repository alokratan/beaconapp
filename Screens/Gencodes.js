import { Box,Text,VStack,Select,HStack,Pressable,Modal, FormControl, CheckIcon, Center, Button, Spacer } from 'native-base'
import React, { useState } from 'react'
import { Ionicons,Feather } from '@expo/vector-icons';
import Footer from '../Components/Footer';
import Qrprint from './Qrprint';
import Header from './Header';
const Gencodes = ({navigation}) => {
  console.log("gen 2 screen")
  const [generated,setGenerated]=useState(false);

 
  return (
    <Box flex={1}  justifyContent="space-between" bg="#E7F0FB">
   <Header goback={()=>navigation.goBack()} title="Generate OR Code"/>
        
        <Qrprint/>


        <Center my={5} >
          <Text bg="#0002" w="70%" rounded={5} h={0.9}>uhuhuhu</Text>

          
          </Center>
         
          <Center my={5}>
          <Button 
          onPress={()=>alert('Print Is Not Possible In Your Device')} rounded={5} bg="#3C5AC8" w="40%" h={12} 
                   _pressed={{
            bg:"#0004",
          }} >
Print
</Button>
<Pressable mt={3} onPress={()=>navigation.goBack()} >
  <Text color="#3C5AC8" textDecorationLine="underline" fontSize={16} >Back To Generate Code</Text>
</Pressable>
          </Center>
        
  
    <Footer/>

    </Box>
  )
}

export default Gencodes;