
import { HStack, Pressable, Text } from 'native-base'
import React from 'react';
import { Ionicons,Feather } from '@expo/vector-icons';

const Header = ({title,goback}) => {
  return (
    <HStack bg="#3C5AC8" justifyContent="space-between" alignItems="center" px={2} w="full" h={70}>
    <Pressable  pr={4} pt={3} pb={3}  onPress={goback}>
          <Feather name="arrow-left" size={24} color="white" />
          </Pressable>
          <Text color="white"fontSize={18} fontWeight={600} >
              {title}
          </Text>
          <Pressable px={4}>
          <Ionicons name="search" size={24} color="white" />
          </Pressable>
      </HStack>
  )
}

export default Header

