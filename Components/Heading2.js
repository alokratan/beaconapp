
import React from 'react'
import { Box,Text,Image,Flex,Pressable, HStack, Heading,} from 'native-base'
import itemdata from "../itemdata"
import { MaterialIcons } from '@expo/vector-icons';
const Heading2 = () => {
  return (
    <HStack
    space={2}
    ml={3}
    mr={3}
    px={3}
    mb={3}
    w="auto"
    h={180}
    justifyContent="space-between"
    alignItems="center"
    bg="white"
>
  
    <Image source={require('../assets/beaconimg23.jpg')} rounded={5} alt='beacon' w="60%" height={150} resizeMode='contain'/>              
    <Box>

<Heading>
    HELLO
</Heading>
<Text>hello heading2</Text>
    </Box>
</HStack>
  )
}

export default Heading2
