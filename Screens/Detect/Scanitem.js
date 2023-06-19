import { Box,ScrollView,Alert, Spinner, Modal,Center,CheckIcon,Select, Pressable,Text,Image, VStack, Button, Divider, Heading, Flex, HStack, Icon, Spacer, CloseIcon } from 'native-base'
import React,{useState,useCallback} from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import {ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {MaterialCommunityIcons,FontAwesome5} from '@expo/vector-icons'
import axios from 'axios';
const Scanitem = ({navigation}) => {
    const [openqr,setOpenqr]=useState(false);
    const [qrdata,setQrdata]=useState("");
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [info, setInfo] = useState("");
  const [item1,setItem1]=useState('');
  const [item2,setItem2]=useState('');
  const [item3,setItem3]=useState('');
  const [item4,setItem4]=useState('');
  const [itemid,setItemid]=useState('')
  const [updatemodal,setUpdatemodal]=useState(false);
  const [deletemodal,setDeletemodal]=useState(false);
  const [P_QR_LOCATION,setP_QR_LOCATION]=useState('');
  const [location,setLocation]=useState('');
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



  const onscanbutton=()=>{
   
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    }




    function Modalupdatefn(){

    
  const locationfn=(e)=>{
    console.log("hello",e)
    setP_QR_LOCATION(e)
  }
      return(
        <Box bg="white" rounded={10} justifyContent="space-between" alignItems="center" h={300} w="80%">
           
       
            <VStack justifyContent="space-between" w="full" h="full"  space={3} px={4}>
            
            <Center>
          
           <Text rounded={5} py={3} px={10} fontWeight={800} mt={4} color="#3C5AC8" fontSize={20}>{item1}</Text>
            </Center>
            
            <Select  bg="#E7F0FB" fontSize={18} borderWidth={0} rounded={5} py={3}
 placeholderTextColor={"black"} placeholder="Location"
            _selectedItem={{ 
              bg:"#E7F0FB",
              endIcon:<CheckIcon mt={0.5} size={5}/>,
            }}
            selectedValue={P_QR_LOCATION}
            onValueChange={locationfn}
            >
                 <Select.Item label="RECEPTION" value="RECEPTION" />   
                <Select.Item label="CONFERENCE" value="CONFERENCE" />   
                <Select.Item label="MEETING_ROOM" value="MEETING_ROOM" />  
           
            </Select>

           <Center>

        
              <Button 

           _
            fontSize={16}
          mb={10}
             onPress={onputdata} rounded={5} bg="#3C5AC8" w="60%" h={12} 
                      _pressed={{
                     
               bg:"#0004",
             }} >
   
    <Text fontWeight={500} color="white" fontSize={16} >
    Update Location
           </Text>  

   </Button>
   </Center>  
            </VStack>
          </Box>
    
      )
    }
    

    const abcd=()=>{
      setUpdatemodal(true)
    }


    const onputdata=async()=>{
      if(location===P_QR_LOCATION){
        setUpdatemodal(false);
        ToastAndroid.show('This Item is already in this location', 1000)
        
      }
      else{
        setIsLoading(true);
        try {
          const response = await axios.put(`https://ourphonemd.com/ords/consultit/QRCODE/DATA/${itemid}`,
           {     P_QR_LOCATION
           });
          console.log("heading4",response.data);
          apicall(item1);
          ToastAndroid.show('Location Updated Successfully...', 1000)

          setUpdatemodal(false) // Handle the response data
          setIsLoading(false);
        } catch (error) {
          console.error("heading4",error); // Handle the error
        }
      }
   
    }


    const deletedata=async()=>{
      const result=await axios.delete(`https://ourphonemd.com/ords/consultit/QRCODE/ITEMDELETE/${info}`);
      console.log("res",result);
      setDeletemodal(false)
      ToastAndroid.show('Remove Successfully...', 1000);
      setScanned(false)
      setP_QR_LOCATION('')
      setLocation('')
      setItem1('')
       setItem2('')
     setItem3('')
     setItem4('')
     setItemid('')
    

    }

    const apicall= async (data)=>{
        try{
          const result=await axios.get(`https://ourphonemd.com/ords/consultit/QRCODE/ITEM/${data}`);  
          console.log("res",result.data);
          if(result.data.count==0){
            setScanned(false);
            ToastAndroid.show('Item Not Found', 1000)
            setIsLoading(false);
          }
          else{
                setScanned(true);
            console.log("res",result.data.items[0].qr_id);
            console.log("res",result.data.items[0].p_qr_location);
            console.log("res",result.data.items[0].p_item);
            console.log("res",result.data.items[0].p_item_code);
            console.log("res",result.data.items[0].datetime);
            setP_QR_LOCATION(result.data.items[0].p_qr_location)
            setLocation(result.data.items[0].p_qr_location)
            setItem1(result.data.items[0].p_item_code)
             setItem2(result.data.items[0].p_item)
           setItem3(result.data.items[0].p_qr_location)
           setItem4(result.data.items[0].datetime)
           setItemid(result.data.items[0].qr_id)
           setIsLoading(false);
          }
          
        }
        catch(err){
            console.log(err)
        }
     
    }

  function Modalcamfun(){
  
    onscanbutton();


    const handleBarCodeScanned = async ({data }) => {  
      setOpenqr(false);
    
      setInfo(data);
      console.log(data)
      if(data[0]!=="I"){
        setScanned(false);
        setErrorshow(true)
        setP_QR_LOCATION('')
        setLocation('')
        setItem1('')
         setItem2('')
       setItem3('')
       setItem4('')
       setItemid('')
     
      }
      else{
      
        setIsLoading(true);
        ToastAndroid.show('Please Wait.', 1000)
        apicall(data);
      }
   

      // const arr=data.split(",");
      
    
    //    const obj=JSON.parse(data);
    //   console.log(obj.P_ITEM_CODE);
    //   console.log(obj.P_ITEM);
    //   console.log(obj.P_QR_LOCATION);
    };

   
  
  
    return(
      <Box bg="white" justifyContent="center" alignItems="center" h={300} w={300}>
          
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{width:260,height:260}}       
      />
        {scanned && <Button  _pressed={{
                bg:"grey",
                      }} bg="white" py={5} px={5} position='absolute' top='40%' onPress={() => setScanned(false)} >
       <Text fontWeight="500" fontSize={18}> Tap to Scan Again
        </Text>
        </Button>
        }
        </Box>
  
    )
  } 

  setTimeout(() => {
    setErrorshow(false)
  }, 2000);

    return (
      <Box flex={1} justifyContent="space-between" bg="#E7F0FB">
            
        <Modal isOpen={isLoading} > 
        <Box w={12}h={12} rounded={50} justifyContent="center" bg="white" >
        <Spinner size={30} color="black"/>
        </Box>
        </Modal>
        
       
        <Modal isOpen={openqr} onClose={()=>setOpenqr(false)} >
        <Modalcamfun/>
        </Modal>
        <Modal isOpen={updatemodal} onClose={()=>setUpdatemodal(false)} >
        <Modalupdatefn/>
        </Modal>
        <Modal isOpen={deletemodal} onClose={()=>setDeletemodal(false)} >
        <Box bg="white" rounded={5} py={6} px={4} justifyContent="space-between" w="90%" h={220}>
        <Heading fontSize={22} >
          DELETE ITEM
        </Heading>
        <Divider/>
        <Text fontSize={17} ml={4}>
          Are you sure want to delete this item?
                  </Text>
                  <HStack  justifyContent="space-evenly" >
                  <Button
           fontSize={16}
            onPress={()=>setDeletemodal(false)} rounded={5} bg="#0005" w="40%" h={12} 
                     _pressed={{
                    
              bg:"#0004",
            }} >
  
  <Text fontWeight={600} color="white" fontSize={16} >
            CANCEL
          </Text>
  </Button>
  <Button
           fontSize={16}
            onPress={deletedata} rounded={5}  bg="red.500" w="40%" h={12} 
                     _pressed={{
                    
              bg:"#0004",
            }} >
  
  <Text fontWeight={600} color="white" fontSize={16} >
            DELETE
          </Text>
  </Button>
                  </HStack>
        </Box>
        </Modal>
      <ScrollView  showsVerticalScrollIndicator={false}>
      <Box justifyContent="space-evenly"  w="full" h={350} >
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
          scanned?<Text bg="white" rounded={5} py={3} px={10} fontWeight={500} mt={4} color="black" fontSize={20}>{item1}</Text>
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
    Scan Item
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
          <Text fontSize={18}  w="full" rounded={5} pl={5}  bg="white" color="green.700"  py={4}  >
           <Text color="black" fontWeight={500}>Item Code</Text> : {item1}
          </Text>
          <Text fontSize={18} w="full" rounded={5} pl={5} bg="white" color="green.700"  py={4} >
          <Text color="black" fontWeight={500}>Item Name</Text> : {item2}
          </Text>
          <Text fontSize={18} w="full" rounded={5} pl={5} bg="white" color="green.700" py={4} >
          <Text color="black" fontWeight={500}>Location</Text>  : {item3}
          </Text>
          <Text fontSize={18} w="full" rounded={5} pl={5} bg="white" color="green.700" py={4} >
          <Text color="black" fontWeight={500}>Assigned Date</Text> : {item4}
          </Text>
          </VStack>
          <Center>
          <Divider  w="90%" orientation='horizontal' />
          </Center>
  
          <HStack my={10} px={5} justifyContent="space-between" >
          <Button
           fontSize={16}
            onPress={abcd} rounded={5} borderWidth={2} borderColor="#3C5AC8" bg="#E7F0FB" w="40%" h={12} 
                     _pressed={{
                    
              bg:"#0004",
            }} >
  
  <Text fontWeight={500} color="#3C5AC8" fontSize={16} >
            Update
          </Text>
  </Button>
          <Button
           fontSize={16}
            onPress={()=>setDeletemodal(true)} borderWidth={2}  rounded={5} borderColor="#3C5AC8" bg="#3C5AC8" w="40%" h={12} 
                     _pressed={{
                    
              bg:"#0004",
            }} >
  
  <Text fontWeight={500} color="white" fontSize={16} >
            Remove
          </Text>
  </Button>
          </HStack>
      </ScrollView>
    </Box>
    );
}

export default Scanitem;