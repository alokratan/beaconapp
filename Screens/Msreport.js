import { Box } from 'native-base'
import React from 'react'
import Header from './Header'

import Footer from '../Components/Footer'


const Msreport = ({navigation}) => {
  return (
    <Box flex={1}  justifyContent="space-between" bg="#E7F0FB">
  <Header goback={()=>navigation.goBack()} title="Ms Report Item"/>
  
<Footer/>
    </Box>
  )
}

export default Msreport