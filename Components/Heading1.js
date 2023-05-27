
import React from 'react'
import { Box,Text,Image,Flex,Pressable, HStack, Heading,} from 'native-base'
import itemdata from "../itemdata"
import { MaterialIcons } from '@expo/vector-icons';
const Heading1 = () => {
  return (
    <HStack
    space={2}
    ml={3}
    mr={3}
    mb={3}
    px={3}
    w="auto"
    h={180}
    justifyContent="space-between"
    alignItems="center"
    bg="white"
>
    <Box>

<Heading>
    HELLO
</Heading>
<Text>hello heading1</Text>
    </Box>
    <Image source={require('../assets/beaconimg.jpg')} rounded={5} alt='beacon' w="40%" height={160} resizeMode='cover'/>              
</HStack>
  )
}

export default Heading1
