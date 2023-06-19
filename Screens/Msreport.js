import { Box,Text, Button, ScrollView } from 'native-base'
import React, { useState,useEffect } from 'react'
import Header from './Header'
import axios from 'axios'
import Footer from '../Components/Footer'


const Msreport = ({navigation}) => {


  useEffect(() => {

  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post('https://ourphonemd.com/ords/consultit/QRCODE/api',{
          name:"rinku singh",
          mobile_number:"93849843983",
          address:"ghaziabad"
      }); // Replace with your API endpoint
     console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


// function objfun(){


//   const newObject = {
//     id:3, 
//     name:"akkrt",
//     course:"mcsgra"
//   };
  
//   if(newObject.id==data.id){
//     console.log("matched")

//   }
// else{
//   setObjects([...objects, newObject]);
// }
 
// }



  return (
    <Box flex={1}  justifyContent="space-between" bg="#E7F0FB">
  <Header goback={()=>navigation.goBack()} title="Ms Report Item"/>
  
  <ScrollView>

</ScrollView>
  <Button onPress={fetchData} >
    <Text>Update  obj data </Text>
  </Button>

   

<Footer/>
    </Box>
  )
}

export default Msreport