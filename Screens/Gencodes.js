import { Box,Text,VStack,Select,HStack,Pressable,Modal, FormControl, CheckIcon, Center, Button, Spacer } from 'native-base'
import React, { useState } from 'react'
import { Ionicons,Feather } from '@expo/vector-icons';
import Footer from '../Components/Footer';
import Qrprint from './Qrprint';
const Gencodes = ({navigation}) => {
  console.log("gen 2 screen")
  const [generated,setGenerated]=useState(false);

 
  return (
    <Box flex={1}  justifyContent="space-between" bg="#E7F0FB">
      <HStack mb={5} bg="#3C5AC8" justifyContent="space-between" alignItems="center" px={2} w="full" h={70}>
      <Pressable  pr={4} pt={3} pb={3}  onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="white" />
            </Pressable>
            <Text color="white"fontSize={18} fontWeight={600} >
                Generate QR Code
            </Text>
            <Pressable px={4}>
            <Ionicons name="search" size={24} color="white" />
            </Pressable>
        </HStack>
        
        <Qrprint/>


        <Center my={6} >
          <Text bg="#0002" w="70%" rounded={5} h={0.9}></Text>

          
          </Center>
         
          <Center my={5}>
          <Button 
          onPress={()=>setGenerated(true)} rounded={5} bg="#3C5AC8" w="40%" h={12} 
                   _pressed={{
            bg:"#0004",
          }} >
Generate QR Code
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