import { Box,ScrollView,Modal,Center, Pressable,Text,Image, VStack, Button, Divider, Heading, Flex, HStack, Icon, Spacer } from 'native-base'
import React,{useState,useCallback} from 'react'

import { StyleSheet } from 'react-native';
import itemdetails from '../../Itemdetails'
import { useFocusEffect } from '@react-navigation/native';
import {MaterialCommunityIcons} from '@expo/vector-icons'
const Scanlocation = ({navigation}) => {
    return (
        <Box flex={1} justifyContent="space-between" bg="#E7F0FB">
        <ScrollView  showsVerticalScrollIndicator={false} nestedScrollEnabled >
        <Box justifyContent="space-evenly"  w="full" h={350} >
              <Center>
              <Box w={150} h={150} justifyContent="center" alignItems="center" bg='white'>
                <MaterialCommunityIcons name="qrcode-scan" size={110} color="black"/></Box>
              {/* <Image alt="qr code" w={150} h={150} resizeMode='contain' source={require('../assets/qrcode.png')}  />
         */}
              </Center>
             
            
            <VStack alignItems="center" space={2}>
            <Button 
            _
             fontSize={16}
              onPress={()=>console.log(false)} rounded={5} bg="#3C5AC8" w="40%" h={12} 
                       _pressed={{
                      
                bg:"#0004",
              }} >
    
    <Text fontWeight={500} color="white" fontSize={16} >
              Scan Location
            </Text>
    </Button>
          
            </VStack>
            
           
            </Box>
            <Center>
            <Divider  w="90%" orientation='horizontal' />
            </Center>
            <VStack mx={5} my={5}  space={5}>
    
              
    <Heading fontWeight={600} fontSize={20} >
      Item Details
    </Heading>
    
    
    
    <VStack bg="white" shadow={1} py={3} px={2}  space={3} divider={<Divider />} w="100%">
      <HStack justifyContent="space-between">
        <Text fontWeight={600} >Sr. No</Text>
        <Divider orientation="vertical" />
        <Text  fontWeight={600}>Item_name</Text>
        <Divider orientation="vertical" />
        <Text  fontWeight={600}>Item_code </Text>
        <Divider orientation="vertical" />
        <Text  fontWeight={600}>Item_Loc </Text>
        <Divider orientation="vertical" />
        <Text  fontWeight={600}>Select all</Text>
      </HStack>
      <ScrollView  w="100%" h={150} nestedScrollEnabled>
      {
        itemdetails.map((item)=>(
          <HStack key={item.id} px={1} py={2} justifyContent="space-between">
          <Text>{item.id+1}</Text>
            <Text>{item.itemname}</Text>
            <Text>{item.itemcode} </Text>
            <Text>{item.itemloc} </Text>
            <Text>Select</Text>
         
          </HStack>
        ))
      }
      </ScrollView>
          
     
    </VStack>
    
    
    </VStack>
    <Center>
    <Divider  w="90%" orientation='horizontal' />
    </Center>
    <Box my={10} px={5} alignItems="flex-end">
            <Button
             fontSize={16}
              onPress={()=>console.log(false)} rounded={5} bg="#E34033" w="40%" h={12} 
                       _pressed={{
                      
                bg:"#0004",
              }} >
    
    <Text fontWeight={500} color="white" fontSize={16} >
              Remove
            </Text>
    </Button>
            </Box>  
    
            
        </ScrollView>
      </Box>
      );
}

export default Scanlocation

