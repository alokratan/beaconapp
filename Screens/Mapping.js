import { Box,Text,Pressable } from 'native-base'
import React from 'react'

const Mapping = ({navigation}) => {
  return (
    <Box flex={1} justifyContent="space-between" bg="#E7F0FB">
     <Header goback={()=>navigation.goBack()} title="Generate OR Code"/>
    </Box>
  )
}

export default Mapping