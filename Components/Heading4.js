import React, { useEffect } from 'react';
import {View,Button, Text } from 'react-native';
import axios from 'axios';
const Heading4 = () => {
  const [locationurl,setLocationurl]=useState('');
  const url="https://ourphonemd.com/ords/consultit/QRCODE/QRCODEDATA";

  
  useEffect(() => {
   
     setLocationurl(url);
     postData();
  }, []);

  const postData = async () => {
    try {
      const response = await axios.post(locationurl,
       { P_QR_CATEGORY:"abcd",
        P_ITEM:"saurab",
        P_SUPPLIER:"daf",
        P_QR_LOCATION:"aef",
        P_QR_QUANTITY:"aefrg",
        P_QR_SIZE:"agarg"}  
       );
      console.log("heading4",response.data); // Handle the response data
    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  return (
    <View>

<View>
      <Button title="Make POST Request" onPress={postData} />
    </View>
    </View>
  );
};

export default Heading4;
