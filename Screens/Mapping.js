import { Box,Text,Image,VStack,Select,HStack,Pressable,Modal, FormControl, CheckIcon, Center, Button, Spacer } from 'native-base'
import React, { useState,useEffect } from 'react'
import QRCode from 'react-native-qrcode-svg'
import Footer from '../Components/Footer';
import Header from './Header';
import axios from 'axios';
const Gencode = ({navigation}) => {
  const [P_QR_CATEGORY,setP_QR_CATEGORY]=useState("");
  const [P_ITEM,setP_ITEM]=useState("");
  const [P_SUPPLIER,setP_SUPPLIER]=useState("");
  const [P_QR_LOCATION,setP_QR_LOCATION]=useState("");
  const [P_QR_QUANTITY,setP_QR_QUANTITY]=useState("");
  const [P_QR_SIZE,setP_QR_SIZE]=useState("");
  const [qrdata,setQrdata]=useState("");
  const [generated,setGenerated]=useState(false);

  useEffect(() => {
  
 }, []);

 
 const postData = async () => {
   try {
     const response = await axios.post('https://ourphonemd.com/ords/consultit/QRCODE/QRCODEDATA',
      { P_QR_CATEGORY,
       P_ITEM,
       P_SUPPLIER,
       P_QR_LOCATION,
       P_QR_QUANTITY,
       P_QR_SIZE
      });
     console.log("heading4",response.data); // Handle the response data
   } catch (error) {
     console.error("heading4",error); // Handle the error
   }
 };
  // useEffect(() => {
    
  // }, [])
  
  // const postdata=async()=>{

  //   // let formData = new FormData()
  //   // formData.append('P_QR_CATEGORY', P_QR_CATEGORY)
  //   // formData.append('P_ITEM', P_ITEM)
  //   // formData.append('P_SUPPLIER', P_SUPPLIER)
  //   // formData.append('P_QR_LOCATION', P_QR_LOCATION)
  //   // formData.append('P_QR_QUANTITY', P_QR_QUANTITY)
  //   // formData.append('P_QR_SIZE', P_QR_SIZE)

  //   try {
  //     // let response = await axios.post('https://apex.oracle.com/pls/apex/rinku_oracle1/QRCODE/QR', formData, {
  //     //           headers: {
  //     //               'Content-Type': 'multipart/form-data',
  //     //           },
  //     //       });



  //     const result=await axios.post('https://ourphonemd.com/ords/consultit/QRCODE/QRCODEDATA',
    
  //      { P_QR_CATEGORY:"abcd",
  //       P_ITEM:"an",
  //       P_SUPPLIER:"daf",
  //       P_QR_LOCATION:"aef",
  //       P_QR_QUANTITY:"aefrg",
  //       P_QR_SIZE:"agarg"}

  //     )

  //   //   let response = await axios.post('https://ourphonemd.com/ords/consultit/QRCODE/QRCODEDATA',formData,{
  //   //     headers: {
  //   //         'Content-Type': 'multipart/form-data',
  //   //     },
  //   // });
  //     console.log("maping",result.data); // Handle the response data
  //   } catch (error) {
  //     console.error(error); // Handle the error
  //   }
   
  // }

   const obj={
    Category:P_QR_CATEGORY,
    Item:P_ITEM,
    Supplier:P_SUPPLIER,
    Location:P_QR_LOCATION,
    No_QR_Code:P_QR_QUANTITY,
    QR_Size:P_QR_SIZE
   };
   const av=JSON.stringify(obj);
  const ongenfn=()=>{
    setGenerated(true);
    setQrdata(av);
  }
  const categoryfn=(e)=>{
    console.log("hello",e);
    setP_QR_CATEGORY(e);
  }
  const itemfn=(e)=>{
    console.log("hello",e)
    setP_ITEM(e)
  }
  const supplierfn=(e)=>{
    console.log("hello",e)
    setP_SUPPLIER(e)
  }
  const locationfn=(e)=>{
    console.log("hello",e)
    setP_QR_LOCATION(e)
  }
  const numqrfn=(e)=>{
    console.log("hello",e)
    setP_QR_QUANTITY(e)
  }
  const sizeqrfn=(e)=>{
    console.log("hello",e)
    setP_QR_SIZE(e)
  }
const printfnnavigate=()=>{
  console.log("navigate to another screen");
  setGenerated(false);
  navigation.navigate('Gencodes');
}

  return (
    <Box flex={1}  justifyContent="space-between" bg="#E7F0FB">
      <Modal isOpen={generated} onClose={() => setGenerated(false)} avoidKeyboard>
        <Box justifyContent="space-evenly" py={6} rounded={5} shadow={6} bg="#C2CFFC" w="90%" h='auto' >
          <Center>
         <Box bg='#ffffff' py={4} px={4}>
         <QRCode
    size={260}
    value= {qrdata}
  />
         </Box>
     </Center>
         
        
        <VStack alignItems="center" py={5} space={2}>
        <Button 
        _
         fontSize={16}
         
          onPress={postData} rounded={5} bg="#3C5AC8" w="40%" h={12} 
                   _pressed={{
                  
            bg:"#0004",
          }} >

<Text fontWeight={500} color="white" fontSize={16} >
          SAVE
        </Text>
</Button>

       <Pressable onPress={()=>alert('Print is not possible in Your Device')} >

        <Text py={1} textDecorationLine="underline" fontWeight={500} fontSize={16} >
          Print
        </Text>
       </Pressable>
        </VStack>
        </Box>
      </Modal>

<Header goback={()=>navigation.goBack()} title="Generate OR Code"/>
      
<Spacer/>
        <VStack m={5}>
          {/* <FormControl> */}

            <Select mb={5}  bg="white" fontSize={18} borderWidth={0} rounded={5} py={3} 
            placeholderTextColor={"black"} accessibilityLabel="Category"  placeholder="Category"
            _selectedItem={{
              bg:"#E7F0FB",
              endIcon:<CheckIcon mt={0.5} size={5}/>,
            }}
            selectedValue={P_QR_CATEGORY}
            onValueChange={categoryfn}
            >
                       
                <Select.Item label="Mobiles" value="Mobiles" />                
                <Select.Item label="Electronics" value="Electronics" /> 
                <Select.Item label="Home Furnishing" value="Home Furnishing" />   
                <Select.Item label="Clothes" value="Clothes" />    
                {/* <Select.Item label="Clothes" value="Clothes" />                
                <Select.Item label="Groceries" value="Groceries" />                
                <Select.Item label="Food" value="Food" />                
                <Select.Item label="Home Furnishing" value="Home Furnishing" />                
                <Select.Item label="Jewelry" value="Jewelry" />                
                <Select.Item label="Pet Care" value="Pet Care" />                
                <Select.Item label="Health & Wellness" value="Health & Wellness" />                 */}
            </Select>


{/* hello this is another select option */}

            <Select mb={5} bg="white" fontSize={18} borderWidth={0} rounded={5} py={3} 
            placeholderTextColor={"black"} placeholder="Item"
            _selectedItem={{
              bg:"#E7F0FB",
              endIcon:<CheckIcon mt={0.5} size={5}/>,
            }}
            selectedValue={P_ITEM}
            onValueChange={itemfn}
            >
                <Select.Item label="CHAIR" value="CHAIR" />                
                <Select.Item label="AC" value="AC" />                
                <Select.Item label="REMOTE" value="REMOTE" />                
                <Select.Item label="LED" value="LED" />                
                <Select.Item label="FAN" value="FAN" />                
                <Select.Item label="BAG" value="BAG" />                
                <Select.Item label="MOBILE" value="MOBILE" />                
                <Select.Item label="DESKTOP" value="DESKTOP" />                
                <Select.Item label="LAPTOP" value="LAPTOP" />                
                <Select.Item label="KEYBOARD" value="KEYBOARD" />                
                <Select.Item label="LIGHT"value="LIGHT" />                
                             
            
            </Select>

{/* hello this is Suppiler/Vendor select option */}

<Select mb={5} bg="white" fontSize={18} borderWidth={0} rounded={5} py={3}
 placeholderTextColor={"black"} placeholder="Suppiler/Vendor"
            _selectedItem={{
              bg:"#E7F0FB",
              endIcon:<CheckIcon mt={0.5} size={5}/>,
            }}
            selectedValue={P_SUPPLIER}
            onValueChange={supplierfn}
            >
                <Select.Item label="Manufacturers" value="Manufacturers" />                
                <Select.Item label="Wholesalers" value="Wholesalers" />                
                <Select.Item label="Retailers" value="Retailers" />                
                <Select.Item label="Service and Maintenacnce" value="Service and Maintenacnce" />                
                <Select.Item label="Independent Vendor" value="Independent Vendor" />                
                <Select.Item label="Trade Show Representatives" value="Trade Show Representatives" />                
            </Select>

{/* hello this is Location select option */}

<Select mb={5} bg="white" fontSize={18} borderWidth={0} rounded={5} py={3}
 placeholderTextColor={"black"} placeholder="Location"
            _selectedItem={{
              bg:"#E7F0FB",
              endIcon:<CheckIcon mt={0.5} size={5}/>,
            }}
            selectedValue={P_QR_LOCATION}
            onValueChange={locationfn}
            >
                {/* <Select.Item label="Ghaziabad" value="Ghaziabad" />                
                <Select.Item label="Delhi" value="Delhi" />                
                <Select.Item label="Greater Noida" value="Greater Noida" />                
                <Select.Item label="Noida" value="Noida" />                
                <Select.Item label="Gurugram" value="Gurugram" />                
                <Select.Item label="Meerut" value="Meerut" />                
                <Select.Item label="Lukhnow" value="Lukhnow" /> 
                            */}
                <Select.Item label="RECEPTION" value="RECEPTION" />   
                <Select.Item label="CONFERENCE" value="CONFERENCE" />   
                <Select.Item label="MEETING_ROOM" value="MEETING_ROOM" />   
                {/* <Select.Item label="LOC_JKL" value="LOC_JKL" />   
                <Select.Item label="LOC_MNO" value="LOC_MNO" />   
                <Select.Item label="LOC_PQR" value="LOC_PQR" />    */}
            </Select>

{/* hello this is NumQRCode select option */}

          <Select mb={5} bg="white" fontSize={18} borderWidth={0} rounded={5} py={3}
           placeholderTextColor={"black"} placeholder="No. Of QR Code"
            _selectedItem={{
              bg:"#E7F0FB",
              endIcon:<CheckIcon mt={0.5} size={5}/>,
            }}
            selectedValue={P_QR_QUANTITY}
            onValueChange={numqrfn}
            >
                <Select.Item label="1" value="1" />                
                <Select.Item label="2" value="2" />                
                <Select.Item label="3" value="3" />                
                <Select.Item label="4" value="4" />                
                <Select.Item label="5" value="5" />                
                <Select.Item label="6" value="6" />                
                <Select.Item label="7" value="7" />                
                <Select.Item label="8" value="8" />                
                <Select.Item label="9" value="9" />                
                <Select.Item label="10" value="10" />                
                    
            </Select>


{/* hello this is code size select option */}

<Select  bg="white" fontSize={18} borderWidth={0} rounded={5} py={3} 
placeholderTextColor={"black"} placeholder="QR Code Size"
            _selectedItem={{
              bg:"#E7F0FB",
              endIcon:<CheckIcon mt={0.5} size={5}/>,
            }}
            selectedValue={P_QR_SIZE}
            onValueChange={sizeqrfn}
            >
                <Select.Item label="2x2 cm" value="2x2 cm" />                
                <Select.Item label="4x4 cm" value="4x4 cm" />                
                <Select.Item label="5x5 cm" value="5x5 cm" />                
                <Select.Item label="6x6 cm" value="6x6 cm" />                
                <Select.Item label="7x7 cm" value="7x7 cm" />                
                <Select.Item label="8x8 cm" value="8x8 cm" />                
            </Select>

         
         
        </VStack>
        
        <Center my={10} >
          <Text bg="#0002" w="70%" rounded={5} h={0.9}></Text>

          
          </Center>
         
          <Center my={10}>
          <Button 
          onPress={ongenfn} rounded={5} bg="#3C5AC8" w="40%" h={12} 
                   _pressed={{
            bg:"#0004",
          }} >
Generate QR Code
</Button>
<Pressable py={3}  onPress={printfnnavigate} >

<Text textDecorationLine="underline" fontWeight={500} fontSize={16} >
  View
</Text>
</Pressable>
          </Center>
          <Spacer/>
       
         


   
    <Footer/>

    </Box>
  )
}

export default Gencode