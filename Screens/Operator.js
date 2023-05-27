import { Box, VStack} from 'native-base'
import Header from './Header'
import React from 'react'
import Pressableitems from '../Components/Pressableitems'
import Footer from '../Components/Footer'

const Operator = ({navigation}) => {
  return ( 
    <Box flex={1}  justifyContent="space-between" bg="#E7F0FB">
  <Header goback={()=>navigation.goBack()} title="Operation"/>
  <VStack space={1} bg="#E7F0FB" w="full" flex={1}>

    <Pressableitems itemtxt="Received From Vender"  navig={()=>navigation.navigate('RecVender')} />
    <Pressableitems itemtxt="Return To Vender"  navig={()=>navigation.navigate('RetVender')} />
    <Pressableitems itemtxt="Quality Pass"  navig={()=>navigation.navigate('Qualpass')} />
    <Pressableitems itemtxt="Issue To Employee"  navig={()=>navigation.navigate('IssEmp')} />
    <Pressableitems itemtxt="Issue To Contractor"  navig={()=>navigation.navigate('IssCon')} />
    <Pressableitems itemtxt="Enter Site Shifting"  navig={()=>navigation.navigate('SitShift')} />

  </VStack>
<Footer/>
</Box>
    
  )
}

export default Operator