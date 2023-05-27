import { Box,ScrollView,Modal,Center, Pressable,Text,Image, VStack, Button, Divider, Heading, Flex, HStack, Icon, Spacer } from 'native-base'
import React,{useState,useEffect} from 'react'
import Header from './Header'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Footer from '../Components/Footer'
import { StyleSheet } from 'react-native';
import itemdetails from '../Itemdetails'
const Tab = createMaterialTopTabNavigator();

function Scanitem() {
  const [openqr,setOpenqr]=useState(false);
  const [qrdata,setQrdata]=useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [info, setInfo] = useState("");
const [item1,setItem1]=useState('Item_392');
const [item2,setItem2]=useState('Item_c1');
const [item3,setItem3]=useState('Assigned to Supp_1 on 04/05/23');

 
  const onscanbutton=()=>{
 


   
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        setOpenqr(true)
      };  


    getBarCodeScannerPermissions();

   
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    }


    const handleBarCodeScanned = ({ type, data }) => {
      setOpenqr(false);
      setScanned(true);
      setInfo(data);
      console.log(data)
      const arr=data.split(",");
  
    
      // const obj=JSON.parse(data);
      // console.log(obj.item1);
      // console.log(obj.item2);
      // console.log(obj.item3);
      setItem1(arr[0])
       setItem2(arr[1])
     setItem3(arr[2])
    };

  return (
    <Box flex={1} justifyContent="space-between" bg="#E7F0FB">
      <Modal isOpen={openqr} onClose={()=>setOpenqr(false)} >
        <Box bg="white" justifyContent="center" alignItems="center" h={300} w={300}>
        
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{width:260,height:260}}       
      />
       {scanned && <Button py={2} px={5} position='absolute' top='40%' onPress={() => setScanned(false)} >
      Tap to Scan Again
      </Button>
      }
   
     
        </Box>
   
      </Modal>
    <ScrollView  showsVerticalScrollIndicator={false}>
    <Box justifyContent="space-evenly"  w="full" h={350} >
          <Center>
          {/* <Box w={150} h={150} bg='#0005'></Box> */}
          <Image alt="qr code" w={150} h={150} resizeMode='contain' source={require('../assets/qrcode.png')}  />
          </Center>
         
        
        <VStack alignItems="center" space={2}>
        <Button 
        _
         fontSize={16}
          onPress={onscanbutton} rounded={5} bg="#3C5AC8" w="40%" h={12} 
                   _pressed={{
                  
            bg:"#0004",
          }} >

<Text fontWeight={500} color="white" fontSize={16} >
          Scan Item
        </Text>
</Button>
      
        </VStack>
        
       
        </Box>
        <Center>
        <Divider  w="90%" orientation='horizontal' />
        </Center>
     
          <VStack mx={5} my={5}  space={5}>

          
        <Heading fontWeight={600} fontSize={20} >
          Item Details
        </Heading>
        <Text fontSize={18}  w="full" rounded={5} pl={5} bg="white" py={4}  >
         {item1}
        </Text>
        <Text fontSize={18} w="full" rounded={5} pl={5} bg="white" py={4} >
        {item2}
        </Text>
        <Text fontSize={18} w="full" rounded={5} pl={5} bg="white" color="green.700" py={4} >
        {item3}
        </Text>
        </VStack>
        <Center>
        <Divider  w="90%" orientation='horizontal' />
        </Center>

        <Box my={10} px={5} alignItems="flex-end">
        <Button
         fontSize={16}
          onPress={()=>console.log(false)} rounded={5} bg="#E34033" w="40%" h={12} 
                   _pressed={{
                  
            bg:"#0004",
          }} >

<Text fontWeight={500} color="white" fontSize={16} >
          Remove
        </Text>
</Button>
        </Box>


    </ScrollView>
  </Box>
  );
}


function Scanlocation() {
  return (
    <Box flex={1} justifyContent="space-between" bg="#E7F0FB">
    <ScrollView  showsVerticalScrollIndicator={false} nestedScrollEnabled >
    <Box justifyContent="space-evenly"  w="full" h={350} >
          <Center>
          {/* <Box w={150} h={150} bg='#0005'></Box> */}
          <Image alt="qr code" w={150} h={150} resizeMode='contain' source={require('../assets/qrcode.png')}  />
          </Center>
         
        
        <VStack alignItems="center" space={2}>
        <Button 
        _
         fontSize={16}
          onPress={()=>console.log(false)} rounded={5} bg="#3C5AC8" w="40%" h={12} 
                   _pressed={{
                  
            bg:"#0004",
          }} >

<Text fontWeight={500} color="white" fontSize={16} >
          Scan Location
        </Text>
</Button>
      
        </VStack>
        
       
        </Box>
        <Center>
        <Divider  w="90%" orientation='horizontal' />
        </Center>
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
    <Text  fontWeight={600}>Select all</Text>
  </HStack>
  <ScrollView  w="100%" h={150} nestedScrollEnabled>
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
  </ScrollView>
      
 
</VStack>


</VStack>
<Center>
<Divider  w="90%" orientation='horizontal' />
</Center>
<Box my={10} px={5} alignItems="flex-end">
        <Button
         fontSize={16}
          onPress={()=>console.log(false)} rounded={5} bg="#E34033" w="40%" h={12} 
                   _pressed={{
                  
            bg:"#0004",
          }} >

<Text fontWeight={500} color="white" fontSize={16} >
          Remove
        </Text>
</Button>
        </Box>  

        
    </ScrollView>
  </Box>
  );
}



const Detect = ({navigation}) => {
  return (
    <Box flex={1}  justifyContent="space-between" bg="#E7F0FB">
      <Header goback={()=>navigation.goBack()} title="Detect Item"/>
      
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
<Tab.Screen name="Scan Item" component={Scanitem} />
<Tab.Screen name="scan Location" component={Scanlocation} />

</Tab.Navigator>
<Footer/>
    </Box>
  )
}

export default Detect