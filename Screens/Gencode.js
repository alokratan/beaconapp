import { Box,Text,Image,VStack,Select,HStack,Pressable,Modal, FormControl, CheckIcon, Center, Button, Spacer } from 'native-base'
import React, { useState } from 'react'
import QRCode from 'react-native-qrcode-svg'

import Footer from '../Components/Footer';
import Header from './Header';
const Gencode = ({navigation}) => {
  const [category,setCategory]=useState("");
  const [item,setItem]=useState("");
  const [supplier,setSupplier]=useState("");
  const [location,setLocation]=useState("");
  const [numqr,setNumqr]=useState("");
  const [sizeqr,setSizeqr]=useState("");
  const [qrdata,setQrdata]=useState("");
  const [generated,setGenerated]=useState(false);


   const obj={
    Category:category,
    Item:item,
    Supplier:supplier,
    Location:location,
    No_QR_Code:numqr,
    QR_Size:sizeqr
   };

   const av=JSON.stringify(obj);
   
 


 


  const ongenfn=()=>{
    setGenerated(true);
    setQrdata(av);
  }
  const categoryfn=(e)=>{
    console.log("hello",e)
   
setCategory(e)
  }
  const itemfn=(e)=>{
    console.log("hello",e)
   
setItem(e)
  }
  const supplierfn=(e)=>{
    console.log("hello",e)
    setSupplier(e)
  }
  const locationfn=(e)=>{
    console.log("hello",e)
setLocation(e)
  }
  const numqrfn=(e)=>{
    console.log("hello",e)
    setNumqr(e)
  }
  const sizeqrfn=(e)=>{
    console.log("hello",e)
    setSizeqr(e)
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
         
          onPress={()=>setGenerated(false)} rounded={5} bg="#3C5AC8" w="40%" h={12} 
                   _pressed={{
                  
            bg:"#0004",
          }} >

<Text fontWeight={500} color="white" fontSize={16} >
          SAVE
        </Text>
</Button>

       <Pressable onPress={printfnnavigate} >

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
            selectedValue={category}
            onValueChange={categoryfn}
            >
                <Select.Item label="Clothes" value="Clothes" />                
                <Select.Item label="Mobiles & Tablet" value="Mobiles & Tablet" />                
                <Select.Item label="Electronics" value="Electronics" />                
                <Select.Item label="Groceries" value="Groceries" />                
                <Select.Item label="Food" value="Food" />                
                <Select.Item label="Home Furnishing" value="Home Furnishing" />                
                <Select.Item label="Jewelry" value="Jewelry" />                
                <Select.Item label="Pet Care" value="Pet Care" />                
                <Select.Item label="Health & Wellness" value="Health & Wellness" />                
            </Select>


{/* hello this is another select option */}

            <Select mb={5} bg="white" fontSize={18} borderWidth={0} rounded={5} py={3} 
            placeholderTextColor={"black"} placeholder="Item"
            _selectedItem={{
              bg:"#E7F0FB",
              endIcon:<CheckIcon mt={0.5} size={5}/>,
            }}
            selectedValue={item}
            onValueChange={itemfn}
            >
                <Select.Item label="One Item" value="One Item" />                
                <Select.Item label="Two Item" value="Two Item" />                
                <Select.Item label="Three Item" value="Three Item" />                
                <Select.Item label="Four Item" value="Four Item" />                
            </Select>

{/* hello this is Suppiler/Vendor select option */}

<Select mb={5} bg="white" fontSize={18} borderWidth={0} rounded={5} py={3}
 placeholderTextColor={"black"} placeholder="Suppiler/Vendor"
            _selectedItem={{
              bg:"#E7F0FB",
              endIcon:<CheckIcon mt={0.5} size={5}/>,
            }}
            selectedValue={supplier}
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
            selectedValue={location}
            onValueChange={locationfn}
            >
                <Select.Item label="Ghaziabad" value="Ghaziabad" />                
                <Select.Item label="Delhi" value="Delhi" />                
                <Select.Item label="Greater Noida" value="Greater Noida" />                
                <Select.Item label="Noida" value="Noida" />                
                <Select.Item label="Gurugram" value="Gurugram" />                
                <Select.Item label="Meerut" value="Meerut" />                
                <Select.Item label="Lukhnow" value="Lukhnow" />                
            </Select>

{/* hello this is NumQRCode select option */}

          <Select mb={5} bg="white" fontSize={18} borderWidth={0} rounded={5} py={3}
           placeholderTextColor={"black"} placeholder="No. Of QR Code"
            _selectedItem={{
              bg:"#E7F0FB",
              endIcon:<CheckIcon mt={0.5} size={5}/>,
            }}
            selectedValue={numqr}
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
            selectedValue={sizeqr}
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
          </Center>
          <Spacer/>
       
         


  {/* <Pressable
            onPress={() => navigation.goBack()}
            w="full"  
            h={98}
            mb={0.5}
            justifyContent="center"
            alignItems="center"
            bg="white" 
            rounder="md"
             >
                  
            <Text pt={2} fontWeight={400} fontSize={13} isTruncated>hi this is gencode</Text>
      </Pressable> */}
    <Footer/>

    </Box>
  )
}

export default Gencode