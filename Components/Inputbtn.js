
import React from 'react'
import { Input} from 'native-base'

const Inputbtn = (props) => {
  return (
   <Input placeholder={props.text} fontSize={18}  w="full" rounded={5} pl={5} bg="white" py={4} />
  )
}

export default Inputbtn
