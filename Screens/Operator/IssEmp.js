import { Box,Pressable,HStack,Divider,ScrollView, Heading, Text, VStack, Center, TextArea, Button } from 'native-base'
import React from 'react'
import Header from '../Header'
import itemdetails from '../../Itemdetails'
import Footer from '../../Components/Footer'
import { MaterialIcons } from '@expo/vector-icons';

const IssEmp = ({navigation}) => {
  return (
    <Box flex={1}  justifyContent="space-between" bg="#E7F0FB">
    <Header goback={()=>navigation.goBack()} title="Issue To Employee"/>
   <ScrollView   nestedScrollEnabled>
    <Box flex={1} >   
    <VStack mx={5} my={10}  space={5}>
{/* <Heading fontWeight={600} fontSize={20} >
Issue To Employee
</Heading> */}

<HStack justifyContent="space-between" w="full" rounded={5} px={5} bg="white" py={4}>
<Text fontSize={18}>
Scan Item
</Text>
<Pressable

_pressed={
  {
    bg:'grey'
  }
}
onPress={()=>alert("scan is not possible")}>
<MaterialIcons  name="qr-code-scanner" size={24} color="black" />  
</Pressable>
</HStack>

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
    <Text  fontWeight={600}>Issue</Text>
  </HStack>
  <ScrollView  w="100%" h={100} nestedScrollEnabled>
  {
    itemdetails.map((item)=>(
      <HStack key={item.id} px={1} py={2} justifyContent="space-between">
      <Text>{item.id+1}</Text>
        <Text>{item.itemname}</Text>
        <Text>{item.itemcode} </Text>
        <Text>{item.itemloc} </Text>
        <Text>Pass</Text>
      </HStack>
    ))
  }
  </ScrollView>

</VStack>
<VStack space={5}>
<Text fontSize={18}  w="full" rounded={5} pl={5} bg="white" py={4}  >
  Employee Name
</Text>
  <Text fontSize={18}  w="full" rounded={5} pl={5} bg="white" py={4}  >
    Department Name
  </Text>
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

export default IssEmp
