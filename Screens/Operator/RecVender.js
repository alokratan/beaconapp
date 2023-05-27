
import { Box, HStack,Divider,ScrollView, Heading, Text, VStack, Center, TextArea, Button } from 'native-base'
import React from 'react'
import Header from '../Header'
import Footer from '../../Components/Footer'
import itemdetails from '../../Itemdetails'
const RecVender = ({navigation}) => {
  return (
    <Box flex={1}  justifyContent="space-between" bg="#E7F0FB">
    <Header goback={()=>navigation.goBack()} title="Operation"/>
   <ScrollView   nestedScrollEnabled>

  
    <Box flex={1} >   
    <VStack mx={5} my={5}  space={5}>
<Heading fontWeight={600} fontSize={20} >
  Recieving
</Heading>
<Text fontSize={18}  w="full" rounded={5} pl={5} bg="white" py={4}  >
  Scan Item QR
</Text>
<Text fontSize={18} w="full" rounded={5} pl={5} bg="white" py={4} >
Scan Store Location
</Text>
</VStack>
<VStack mx={5} my={5}  space={5}>


<Heading fontWeight={600} fontSize={20} >
  Item Details
</Heading>



<VStack bg="white" shadow={1} py={3} px={2}  space={3} divider={<Divider />} w="100%">
  <HStack justifyContent="space-between">
    <Text fontWeight={600} >Sr. No</Text>
    <Divider orientation="vertical" />
    <Text  fontWeight={600}>Item_name</Text>
    <Divider orientation="vertical" />
    <Text  fontWeight={600}>Item_code </Text>
    <Divider orientation="vertical" />
    <Text  fontWeight={600}>Item_Loc </Text>
    <Divider orientation="vertical" />
    <Text  fontWeight={600}>Add</Text>
  </HStack>
  <ScrollView  w="100%" h={150} nestedScrollEnabled>
  {
    itemdetails.map((item)=>(
      <HStack key={item.id} px={1} py={2} justifyContent="space-between">
      <Text>{item.id+1}</Text>
        <Text>{item.itemname}</Text>
        <Text>{item.itemcode} </Text>
        <Text>{item.itemloc} </Text>
        <Text>+</Text>
     
      </HStack>
    ))
  }
  </ScrollView>
      
 
</VStack>


</VStack>
<Center>
        <Divider  w="90%" orientation='horizontal' />
        <TextArea mt={5} h={170} fontSize={19} bg="white" placeholder='Add Description If Any'  w="90%" />
        <Button
        my={7}
          onPress={()=>console.log(false)} rounded={5} bg="#3C5AC8" w="40%" h={12} 
                   _pressed={{
            bg:"#0004",
          }} >
            <Text color='white' fontSize={17} >Save</Text>
            </Button>
        </Center>
        

     
</Box>
</ScrollView>

  <Footer/>
  </Box>
  )
}

export default RecVender

