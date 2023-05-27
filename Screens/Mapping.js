import { Box,Text,Pressable } from 'native-base'
import React from 'react'

const Mapping = ({navigation}) => {
  return (
    <Box>
      <Pressable
            onPress={() => navigation.goBack()}
            w="24.5%"
            h={98}
            mb={0.5}
            justifyContent="center"
            alignItems="center"
            bg="white" 
            rounder="md"
            overflow="hidden" >
                  
            <Text pt={2} fontWeight={400} fontSize={13} isTruncated>hi this is mapping</Text>
      </Pressable>
    </Box>
  )
}

export default Mapping