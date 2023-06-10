import { Box,ScrollView,Modal,Center,Select,CheckIcon, Pressable,Text,Image, VStack, Button, Divider, Heading, Flex, HStack, Icon, Spacer } from 'native-base'
import React,{useState,useCallback, useEffect} from 'react'
import axios from 'axios';
import { StyleSheet,ToastAndroid } from 'react-native';
import itemdetails from '../../Itemdetails'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFocusEffect } from '@react-navigation/native';
import {MaterialCommunityIcons,FontAwesome5} from '@expo/vector-icons'
const Scanlocation = ({navigation}) => {
  const [openqr,setOpenqr]=useState(false);
  const [P_QR_LOCATION,setP_QR_LOCATION]=useState("");
  const [qrdata,setQrdata]=useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [info, setInfo] = useState('');
  const [datashow,setDatashow]=useState(false)
  const [updatemodal,setUpdatemodal]=useState(false);
  const [itemid,setItemid]=useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorshow, setErrorshow] = useState(false);


  useFocusEffect(
    useCallback(
      ()=>{
       ( async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        } )(); 
      }
    )
  )

  const locationfn=(e)=>{
    console.log("hello",e);
    setP_QR_LOCATION(e);
  }

  const abcd=(item)=>{
    setUpdatemodal(true)
    setItemid(item)
      console.log(item);
  }

  function Modalupdatefn(){
    
     

    const onputdata=async()=>{
      try {
        const response = await axios.put(`https://ourphonemd.com/ords/consultit/QRCODE/DATA/${itemid}`,
         {     P_QR_LOCATION
         });
        console.log("heading4",response.data); // Handle the response data
      } catch (error) {
        console.error("heading4",error); // Handle the error
      }
      setUpdatemodal(false)
    }

   
        return(
          <Box bg="white" justifyContent="center" alignItems="center" h={300} w={300}>
              <VStack w="full">
            
              <Select mb={5} bg="white" fontSize={18} borderWidth={0} rounded={5} py={3}
   placeholderTextColor={"black"} placeholder="Location"
              _selectedItem={{
                bg:"#E7F0FB",
                endIcon:<CheckIcon mt={0.5} size={5}/>,
              }}
              selectedValue={P_QR_LOCATION}
              onValueChange={locationfn}
              >
                  <Select.Item label="LOC_ABC" value="LOC_ABC" />   
                  <Select.Item label="LOC_DEF" value="LOC_DEF" />   
                  <Select.Item label="LOC_GHI" value="LOC_GHI" />   
                  <Select.Item label="LOC_JKL" value="LOC_JKL" />   
                  <Select.Item label="LOC_MNO" value="LOC_MNO" />   
                  <Select.Item label="LOC_PQR" value="LOC_PQR" />                
              </Select>

              <Button  onPress={onputdata}>
                Update
              </Button>
                  
              </VStack>
            </Box>
      
        )
      }
      

function Getdatafn(){

  return (
    <ScrollView  w="100%" h={150} nestedScrollEnabled>
      {
        qrdata.map((item)=>(
          <HStack key={item.qr_id} px={1} py={2} justifyContent="space-between">
          <Text>{item.qr_id}</Text>
            <Text>{item.p_item}</Text>
            <Text>{item.p_item_code} </Text>
            <Text>{item.p_qr_location} </Text>
            {/* <Pressable onPress={()=>abcd(item.qr_id)} py={1} px={2} bg="red.700" rounded={5}>
            <Text color='white'>Update</Text>
            </Pressable> */}
            {/* <Text>Select</Text> */}
          </HStack>
        ))
      }
      </ScrollView>
  )
}

  


const onscanbutton=()=>{
   
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    }
    function Modalcamfun(){
    
      onscanbutton();
     
      const handleBarCodeScanned = async({data }) => {
     
        setOpenqr(false);
        setScanned(true);
        ToastAndroid.show('Location Scan Successfully...', 1000)
        setInfo(data);
       
        console.log(data)
       
        
        const result=await axios.get(`https://ourphonemd.com/ords/consultit/QRCODE/LOCATION/${data}`);
        console.log("res",result.data.items);
        setQrdata(result.data.items)
        setDatashow(true)
   

       
        // const arr=data.split(",");
    
      
        // const obj=JSON.parse(data);
        // console.log(obj.item1);
        // console.log(obj.item2);
        // console.log(obj.item3);
      //   setItem1(arr[0])
      //    setItem2(arr[1])
      //  setItem3(arr[2])
      };
      
   
    
     
      return(
        <Box bg="white" justifyContent="center" alignItems="center" h={300} w={300}>
            
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{width:260,height:260}}       
        />
         {scanned && <Button bg="white" py={5} px={5} position='absolute' top='40%' onPress={() => setScanned(false)} >
       <Text fontWeight="500" fontSize={18}> Tap to Scan Again
        </Text>
        </Button>
        }
          </Box>
    
      )
    } 


  
    return (
        <Box flex={1} justifyContent="space-between" bg="#E7F0FB">
          <Modal isOpen={openqr} onClose={()=>setOpenqr(false)} >
        <Modalcamfun/>
        </Modal>

        <Modal isOpen={updatemodal} onClose={()=>setUpdatemodal(false)} >
        <Modalupdatefn/>
        </Modal>


        <ScrollView  showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <Box justifyContent="space-evenly"  w="full" h={350}>
              <Center>
                {
          scanned?<Box w={60} h={60} justifyContent="center" alignItems="center" >             
          <FontAwesome5  name="check-circle" size={50} color="green"/>
          </Box>  :
       <Box w={150} h={150} justifyContent="center" alignItems="center" bg='white'>
       <MaterialCommunityIcons name="qrcode-scan" size={110} color="black"/>
      </Box>
         }
         {
          scanned?<Text bg="white" rounded={5} py={3} px={10} fontWeight={500} mt={4} color="black" fontSize={20}>{info}</Text>
          :
          <Text></Text>
         }
              </Center>           
            <VStack alignItems="center" space={2}>
            {
              scanned?
              <Button 
              _
               fontSize={16}
                onPress={()=>setOpenqr(true)} rounded={5} bg="#3C5AC8" w="40%" h={12} 
                         _pressed={{        
                  bg:"#0004",
                        }} >
       <Text fontWeight={500} color="white" fontSize={16} >
       Scan Again   
              </Text>  
      </Button>:
           <Button 
           _
            fontSize={16}
             onPress={()=>setOpenqr(true)} rounded={5} bg="#3C5AC8" w="40%" h={12} 
                      _pressed={{
               bg:"#0004",
             }} >
 <Text fontWeight={500} color="white" fontSize={16} >
    Scan Location
           </Text> 
   </Button>
            } 
            </VStack>
            </Box>
            <Center>
            <Divider  w="90%" orientation='horizontal' />
            </Center>
            <VStack mx={5} my={5}  space={5}>
  <Heading fontWeight={600} fontSize={20} >
      Item Details
    </Heading>
                  {/* {
                   qrdata.map((its)=>(
                    <HStack key={its.qr_id} px={1} py={2} justifyContent="space-between">
    <Text>{its.qr_id+1}</Text>
    <Text>{its.p_item_code}</Text>
    <Text>Select</Text>
    </HStack>
                  )

                  )
                } */}
  {/* <Text>{qrdata}</Text> */}
    <VStack bg="white" shadow={1} py={3} px={2}  space={3} divider={<Divider />} w="100%">
      <HStack justifyContent="space-between">
        <Text fontWeight={600} >Sr. No</Text>
        <Divider orientation="vertical" />
        <Text  fontWeight={600}>Item_name</Text>
        <Divider orientation="vertical" />
        <Text  fontWeight={600}>Item_code </Text>
        <Divider orientation="vertical" />
        <Text  fontWeight={600}>Item_Loc </Text>
        {/* <Divider orientation="vertical" />
        <Text  fontWeight={600}>Update</Text> */}
        {/* <Divider orientation="vertical" />
        <Text  fontWeight={600}>Select all</Text> */}
      </HStack>
      {/* <ScrollView  w="100%" h={150} nestedScrollEnabled>
      {
        itemdetails.map((item)=>(
          <HStack key={item.id} px={1} py={2} justifyContent="space-between">
          <Text>{item.id+1}</Text>
            <Text>{item.itemname}</Text>
            <Text>{item.itemcode} </Text>
            <Text>{item.itemloc} </Text>
            <Text>Select</Text>
         
          </HStack>
        ))
      }
      </ScrollView> */}
    <Getdatafn/>
    </VStack>
    </VStack>
    <Center>
    <Divider  w="90%" orientation='horizontal' />
    </Center>
    <Box my={10} px={5} alignItems="flex-end">
            {/* <Button
             fontSize={16}
              onPress={()=>console.log(false)} rounded={5} bg="#E34033" w="40%" h={12} 
                       _pressed={{                  
                bg:"#0004",
              }} >
    <Text fontWeight={500} color="white" fontSize={16} >
              UPDATE
            </Text>
    </Button> */}
            {/* <Button
             fontSize={16}
              onPress={()=>console.log(false)} rounded={5} bg="#E34033" w="40%" h={12} 
                       _pressed={{                      
                bg:"#0004",
              }} >
    <Text fontWeight={500} color="white" fontSize={16} >
              Remove
            </Text>
    </Button> */}
            </Box>  
        </ScrollView>
      </Box>
      );
}
export default Scanlocation

