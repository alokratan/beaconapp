
import { Pressable,Text,HStack } from 'native-base'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const Scanners = ({openqr,scand}) => {
  return (
    <Pressable
    bg="white"
    rounded={5}
    _pressed={
      {
        bg: '#0001'
      }
    }
    onPress={openqr}>
    
                <HStack justifyContent="space-between" w="full"  px={5}  py={4}>
                {
      scand?
      <Text fontSize={18}>
    Scan Again
    </Text>:
    <Text fontSize={18}>
    Scan Item
    </Text>
    
    }
                    <MaterialIcons name="qr-code-scanner" size={24} color="black" />         
                </HStack>
                </Pressable>
  )
}

export default Scanners
