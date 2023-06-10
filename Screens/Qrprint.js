
import React from 'react'
import qrprintapi from './qrprintapi'
import { Box, Divider, Flex, HStack, Heading, Image, Pressable, ScrollView, Spacer, Text } from 'native-base'
const Qrprint = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <Flex
                justifyContent="space-between"
                px={5}
                py={5}
            >

                <Box
                    w="full"
                    bg="white"
                    rounder="md" shadow={2}
                    overflow="hidden" mt={1} >
                    <HStack justifyContent="space-evenly"  alignItems="center" bg="white" space={6} >
                        <Text w={"10%"} pl={3} >
                            S.no
                        </Text>
                        <Divider orientation='vertical' />
                        <Text w={"50%"}>
                        Item_acdr12
                        </Text>
                        <Box bg="white" w={70} h={50} >
                        </Box>       
                    </HStack>
                </Box>
                {
                    qrprintapi.map((item) => (
                        <Box key={item.id}
                            w="full"
                            bg="white"
                            rounder="md" shadow={2}
                            overflow="hidden" mt={1} >


                            <HStack justifyContent="space-evenly" alignItems="center" bg="white" space={6} >
                                <Text w={"10%"}  pl={5} >
                                    {item.id+1}
                                </Text>
                                <Divider orientation='vertical' />
                                <Text w={"50%"}>
                                    {item.itemname}
                                </Text>
                                <Image alt="qrcode" w={70} h={70} resizeMode='contain' source={item.image} />
                            </HStack>

                        </Box>
                    ))
                }
            </Flex>
        </ScrollView>
    )
}

export default Qrprint

