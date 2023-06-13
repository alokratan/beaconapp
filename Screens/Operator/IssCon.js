import { Box, Pressable,Input, Modal, Spinner, HStack, Divider, ScrollView, Heading, Text, VStack, Center, TextArea, Button } from 'native-base'
import React, { useState, useCallback } from 'react'
import Header from '../Header'
import itemdetails from '../../Itemdetails'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFocusEffect } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import Footer from '../../Components/Footer'
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const IssCon = ({ navigation }) => {
  const [openqr, setOpenqr] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [itemdata, setItemdata] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorshow, setErrorshow] = useState(false);
  const [CONTRACTOR_NAME, setCONTRACTOR_NAME] = useState('');
  const [CONTRACTOR_DEPT_NAME, setCONTRACTOR_DEPT_NAME] = useState('');
  const [CONTRACTOR_CONTAINER_TYPE, setCONTRACTOR_CONTAINER_TYPE] = useState(''); 
  const [CONTRACTOR_DESCRIPTION, setCONTRACTOR_DESCRIPTION] = useState(''); 

  
  useFocusEffect(
    useCallback(
      () => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');

        })();
      }
    )
  )
  const onscanbutton = () => {
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  }
  const apicall = async (data) => {
    try {
      const result = await axios.get(`https://ourphonemd.com/ords/consultit/QRCODE/ITEM/${data}`);
      console.log("res", result.data);
      if (result.data.count == 0) {
        setScanned(false);
        ToastAndroid.show('Item Not Found', 1000)
        setIsLoading(false);
      }
      else {
        setScanned(true);
        console.log(result.data.items[0]);

        setItemdata(result.data.items[0]);


        setIsLoading(false);
       
       
      }

    }
    catch (err) {
      console.log(err)
    }

  }

  
  const onputdata=async()=>{
    
    setIsLoading(true);
if(CONTRACTOR_NAME.trim() || CONTRACTOR_DEPT_NAME.trim() || CONTRACTOR_CONTAINER_TYPE.trim()|| CONTRACTOR_DESCRIPTION.trim()){

try {
  const response = await axios.put(`https://ourphonemd.com/ords/consultit/QRCODE/contractor/${itemdata.qr_id}`,
   {  
    CONTRACTOR_NAME,
    CONTRACTOR_DEPT_NAME,
    CONTRACTOR_CONTAINER_TYPE,
    CONTRACTOR_DESCRIPTION,
   });
  console.log("heading5",response.data);
  apicall(itemdata.p_item_code);
  ToastAndroid.show('Issued Successfully...', 1000)

// Handle the response data
setIsLoading(false);  
setCONTRACTOR_NAME('');
setCONTRACTOR_DEPT_NAME('');
setCONTRACTOR_CONTAINER_TYPE('');
setCONTRACTOR_DESCRIPTION('');
} catch (error) {
  console.error("heading4",error); // Handle the error
}
}
else{
setIsLoading(false);
alert('All fields are required...')
}
   
  }

  function Modalcamfun() {
    onscanbutton();
    const handleBarCodeScanned = async ({ data }) => {
      setOpenqr(false);

      console.log(data)
      if (data[0] !== "I") {
        setScanned(false);
        setErrorshow(true)

      }
      else {

        setIsLoading(true);
        ToastAndroid.show('Please Wait.', 1000);
        setScanned(true);
        apicall(data);
      }
    }
    return (
      <Box bg="white" justifyContent="center" alignItems="center" h={300} w={300}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ width: 260, height: 260 }}
        />
        {scanned && <Button py={2} px={5} position='absolute' top='40%' onPress={() => setScanned(false)}>
          Tap to Scan Again
        </Button>
        }
      </Box>
    )
  }

  return (
    <Box flex={1} justifyContent="space-between" bg="#E7F0FB">
      <Modal isOpen={openqr} onClose={() => setOpenqr(false)} >
        <Modalcamfun />
      </Modal>
      <Modal isOpen={isLoading} >
        <Box w={12} h={12} rounded={50} justifyContent="center" bg="white" >
          <Spinner size={30} color="black" />
        </Box>
      </Modal>
      <Header goback={() => navigation.goBack()} title="Issue To Contractor" />
      <ScrollView nestedScrollEnabled>
        <Box flex={1} >
          <VStack mx={5} my={10} space={5}>
            {/* <Heading fontWeight={600} fontSize={20} >
Issue To Contractor
</Heading> */}
            <HStack justifyContent="space-between" w="full" rounded={5} px={5} bg="white" py={4}>
              {
                scanned ?
                  <Text fontSize={18}>
                    Scan Again
                  </Text> :
                  <Text fontSize={18}>
                    Scan Item
                  </Text>

              }
              <Pressable

                _pressed={
                  {
                    bg: 'grey'
                  }
                }
                onPress={() => setOpenqr(true)}>
                <MaterialIcons name="qr-code-scanner" size={24} color="black" />
              </Pressable>
            </HStack>
          </VStack>
          <VStack mx={5} my={5} space={5}>
            <Heading fontWeight={600} fontSize={20} >
              Item Details
            </Heading>
            <VStack bg="white" shadow={1} py={3} px={2} space={3} divider={<Divider />} w="100%">
              <HStack justifyContent="space-between">
                <Text fontWeight={600} >Sr. No</Text>
                <Divider orientation="vertical" />
                <Text fontWeight={600}>Item_name</Text>
                <Divider orientation="vertical" />
                <Text fontWeight={600}>Item_code </Text>
                <Divider orientation="vertical" />
                <Text fontWeight={600}>Item_Loc </Text>
                {/* <Divider orientation="vertical" />
    <Text  fontWeight={600}>Issue</Text> */}
              </HStack>
              <ScrollView w="100%" h={30} nestedScrollEnabled>
           
              {
    scanned?
    // <HStack  px={1} py={2} justifyContent="space-between">
    // <Text>id</Text>
    //   <Text>item iengif</Text>
    //   <Text>item codewgowee </Text>
    //   <Text>locatiejwgojowjon </Text>
    //   <Text>Pass</Text>
    // </HStack>
       <HStack key={itemdata.qr_id} px={1} py={2} justifyContent="space-between">
      <Text>{itemdata.qr_id}</Text>
        <Text>{itemdata.p_item}</Text>
        <Text>{itemdata.p_item_code} </Text>
        <Text>{itemdata.p_qr_location} </Text>
       
      </HStack>
    // ))
    :
   
      <HStack  px={1} py={2} justifyContent="space-between">
      <Text>-</Text>
        <Text>-</Text>
        <Text>-</Text>
        <Text>-</Text>
      
      </HStack>
   
  }

                  

                
              </ScrollView>

            </VStack>
            <VStack space={5}>
             

              <Input value={CONTRACTOR_NAME}  onChangeText={(e)=>setCONTRACTOR_NAME(e)}  fontSize={18}  w="full" placeholder='Contractor Name' rounded={5} pl={5} bg="white" py={4}  />
              <Input value={CONTRACTOR_DEPT_NAME}  onChangeText={(e)=>setCONTRACTOR_DEPT_NAME(e)}  fontSize={18}  w="full" placeholder='  Department Name' rounded={5} pl={5} bg="white" py={4}  />
              <Input value={CONTRACTOR_CONTAINER_TYPE}  onChangeText={(e)=>setCONTRACTOR_CONTAINER_TYPE(e)}  fontSize={18}  w="full" placeholder='Container Type' rounded={5} pl={5} bg="white" py={4}  />

            </VStack>
          </VStack>
          <Center>
            <Divider w="90%" orientation='horizontal' />
            <TextArea value={CONTRACTOR_DESCRIPTION} onChangeText={(e)=>setCONTRACTOR_DESCRIPTION(e)}  mt={5} h={170} fontSize={19} bg="white" placeholder='Add Description If Any' w="90%" />
            <Button
              my={7}
              onPress={ scanned? onputdata: console.log('nothing')} rounded={5} bg="#3C5AC8" w="40%" h={12}
              _pressed={{
                bg: "#0004",
              }} >
              <Text color='white' fontSize={17} >ISSUE</Text>
            </Button>
          </Center>
        </Box>
      </ScrollView>
      <Footer />
    </Box>
  )
}

export default IssCon

