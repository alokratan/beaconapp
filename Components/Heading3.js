
import React from 'react'
import { Box,Text,Image,Flex,Pressable, HStack, Heading,} from 'native-base'
import itemdata from "../itemdata"
import { MaterialIcons } from '@expo/vector-icons';
const Heading3 = () => {
  return (
    <Box
    space={2}
    ml={3}
    mr={3}
    mb={3}
    px={3}
    w="auto"
    h={180}
    justifyContent="space-between"
    
    bg="white"
>
  
   <Box>

<Heading py={2} fontSize={18}>
    Some Bullet Points
</Heading>
<Text pb={1} fontSize={15}>hello heading1</Text>
<Text pb={1} fontSize={15}>hello heading2</Text>
<Text pb={1} fontSize={15}>hello heading3</Text>
<Text pb={1} fontSize={15}>hello heading4</Text>


    </Box>
</Box>
  )
}

export default Heading3
