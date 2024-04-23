import { Flex, Image, Link, useColorMode } from "@chakra-ui/react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import {AiFillHome} from 'react-icons/ai';
import { Button } from '@chakra-ui/react';
import {RxAvatar} from 'react-icons/rx';
import {BsFillChatQuoteFill} from 'react-icons/bs';


//we use RouterLink from "react-router-dom" to get client-side routing
import { Link as RouterLink } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtoms";

const Header = () => {
    const { colorMode, toggleColorMode} = useColorMode();
    const user = useRecoilValue(userAtom);
    const logout = useLogout();
    const setAuthScreen = useSetRecoilState(authScreenAtom);

    

  return (
    <Flex justifyContent={"space-between"} mt={6} mb="12">

    {user && (
      <Link as={RouterLink} to="/" >
        <AiFillHome size={24} />
      </Link>
    )}
    {!user && (
      <Link as={RouterLink} to={"/auth"} onClick={
        () => setAuthScreen('login')
      } >
        Login
      </Link>
    )}

        <Image
        cursor={"pointer"}
        alt="logo"
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
        />

    {user && (
      <Flex alignItems={"center"} gap={4} >
      <Link as={RouterLink} to={`/${user.username}`} >
        <RxAvatar size={24} />
      </Link>
      <Link as={RouterLink} to={`/chat`} >
        <BsFillChatQuoteFill size={20} />
      </Link>
      <Button size={"xs"} onClick={logout}
      >
        <FiLogOut size={20} />
     </Button>
      </Flex>
    )}

{!user && (
      <Link as={RouterLink} to={"/auth"} onClick={
        () => setAuthScreen('signup')} >
        Sign up
      </Link>
    )}

      
    </Flex>
  );
};

export default Header;
