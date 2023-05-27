import React from 'react'
import { Box,Text,Image,Flex,Pressable, HStack, Heading,} from 'native-base'


const Footer = () => {
  return (
    <HStack
    space={2}
    px={3}
    w="full"
    h={100}
    justifyContent="space-evenly"
    pt={4}
    bg="#3C5AC8"
>
  <Text color="white">Products</Text>
  <Text color="white">Privacy policy</Text>
  <Text color="white">Contact Us</Text>


</HStack>
  )
}

export default Footer