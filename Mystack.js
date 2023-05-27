
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Detect from './Screens/Detect'
import Gencode from './Screens/Gencode'
import Mapping from './Screens/Mapping'
import Operator from './Screens/Operator'
import Msreport from './Screens/Msreport'
import HomeScreen from './Screens/HomeScreen';
import Gencodes from './Screens/Gencodes';
import Camtest from './Screens/Camtest';
import Scaning from './Screens/Scaning';
import RecVender from './Screens/Operator/RecVender';
import RetVender from './Screens/Operator/RetVender';
import IssEmp from './Screens/Operator/IssEmp';
import IssCon from './Screens/Operator/IssCon';
import Qualpass from './Screens/Operator/Qualpass';
import SitShift from './Screens/Operator/SitShift';
const Stack = createStackNavigator();
const Mystack = () => {
  return (
    <Stack.Navigator  >
    <Stack.Screen options={{headerShown:false}} name="HomeScreeen" component={HomeScreen} />
    <Stack.Screen options={{headerShown:false}} name="Gencode" component={Gencode} />
    <Stack.Screen options={{headerShown:false}} name="Gencodes" component={Gencodes} />
    <Stack.Screen  options={{headerShown:false}}name="Detect" component={Detect} />
    <Stack.Screen options={{headerShown:false}} name="Mapping" component={Mapping} />
    <Stack.Screen options={{headerShown:false}}name="Operator" component={Operator} />
    <Stack.Screen options={{headerShown:false}}name="Msreport" component={Msreport} />
    <Stack.Screen options={{headerShown:false}}name="RecVender" component={RecVender} />
    <Stack.Screen options={{headerShown:false}}name="RetVender" component={RetVender} />
    <Stack.Screen options={{headerShown:false}}name="IssEmp" component={IssEmp} />
    <Stack.Screen options={{headerShown:false}}name="IssCon" component={IssCon} />
    <Stack.Screen options={{headerShown:false}}name="Qualpass" component={Qualpass} />
    <Stack.Screen options={{headerShown:false}}name="SitShift" component={SitShift} />
  
    <Stack.Screen name="Testing" component={Camtest} />
    <Stack.Screen name="Scaning" component={Scaning} />
  </Stack.Navigator>
  )
}

export default Mystack

