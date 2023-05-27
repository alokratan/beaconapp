import { Pressable ,Text} from "native-base"

function Pressableitems({itemtxt,navig}) {
  return (
<Pressable _pressed={{
  bg:"#C2CFFC"
}} px={2} py={5} shadow={3}  bg="white" onPress={navig}>
      <Text fontSize={17}>{itemtxt}</Text>
      </Pressable>
     )
}

export default Pressableitems;