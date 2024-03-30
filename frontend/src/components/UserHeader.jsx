import { Box, Flex, VStack, Text, Link } from "@chakra-ui/layout"
import { Avatar, Menu, MenuButton, MenuItem, MenuList, Portal, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";


const UserHeader = () => {

    const toast = useToast()

    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                title:"Account Created",
                status:"success",
                description:"Profile link copied.",
                duration:3000,
                isClosable:true,
             });
        })
    };

  return (
  <VStack gap={4} alignItems={"start"}>
    <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
            <Text fontSize={"2xl"}>Mark Zuckerberg</Text>
            <Flex gap={2} alignItems={"center"}>
                <Text fontSize={"sm"}>markzuckerberg</Text>
                <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"} >
                    threads.net
                </Text>
            </Flex>
        </Box>
        <Box>
            <Avatar name="Mark Zuckerberg" src="/zuck-avatar.png" size={{
                base: "md",
                md: "lg",
            }}/>
        </Box>
    </Flex>

    <Text>Co-founder, exeutive chaiman and CEO of Meta Platforms.</Text>
    <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} borderRadius={"full"}>3.2 followers</Text>
            <Box w='1' h='1' bg={"gray.light"} borderRadius={"full"}></Box>
            <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
            <Box className="icon-container" >
                <BsInstagram size={24} cursor={"pointer"} />
            </Box>
            <Box className="icon-container" >
                <Menu>
                    <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
                    </MenuButton>
                <Portal>
                    <MenuList bg={"gray.dark"}>
                        <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                    </MenuList>
                </Portal>
                </Menu>
            </Box> 
        </Flex>
    </Flex>

    <Flex w={"full"}>
    <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
      <Text fontWeight={"bold"}> Threads</Text>
    </Flex>
    <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb="3"
      cursor={"pointer"}>
      <Text fontWeight={"bold"}> Replies</Text> 
    </Flex>
    </Flex>
  </VStack> 
  )
}

export default UserHeader;
