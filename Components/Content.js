
import React from 'react'
import { Box,Text,Flex,Pressable,} from 'native-base'
import itemdata from "../itemdata"
import { MaterialIcons } from '@expo/vector-icons';


const Content = ({navigation}) => {
  return (
    <Flex
    flexWrap="wrap"
    direction="row"
    justifyContent="space-between"
    m={3}
  
    bg="grey.200"
>

    {
        itemdata.map((item)=>(
            <Pressable key={item.id}
            onPress={() => navigation.navigate(item.press)}
            w="24.5%"
            h={98}
            mb={0.5}
            justifyContent="center"
            alignItems="center"
            bg="white" 
            rounder="md"
            overflow="hidden" >
                     <MaterialIcons name={item.icon} size={24} color="#3C5AC8" />   
            <Text pt={2} px={1} fontWeight={400} fontSize={13} isTruncated>{item.title}</Text>
      </Pressable> 
        ))
    }
              
</Flex>
  )
}

export default Content
