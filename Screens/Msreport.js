import { Box,Text,Pressable } from 'native-base'
import React from 'react'
import Header from './Header'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Footer from '../Components/Footer'
import Scanitem2 from './Detect/Scanitem2';
import Scanlocation from './Detect/Scanlocation';

const Tab = createMaterialTopTabNavigator();

const Msreport = ({navigation}) => {
  return (
    <Box flex={1}  justifyContent="space-between" bg="#E7F0FB">
  <Header goback={()=>navigation.goBack()} title="Ms Report Item"/>
  
  <Tab.Navigator

screenOptions={
  {
    tabBarActiveTintColor: '#3C5AC8',
    tabBarInactiveTintColor: 'black',
    tabBarIndicatorStyle: {
      borderBottomColor: '#3C5AC8',
      borderBottomWidth: 2,
    
    },
    // tabBarIndicatorContainerStyle:{
    //   borderBottomColor:'black',
    //   borderBottomWidth:2
    // },
    tabBarLabelStyle: { textTransform:'capitalize' , fontSize: 15, fontWeight: '500' },
  }
}
>
<Tab.Screen name="Scan Item" component={Scanitem2} />
<Tab.Screen name="scan Location" component={Scanlocation} />

</Tab.Navigator>
<Footer/>
    </Box>
  )
}

export default Msreport