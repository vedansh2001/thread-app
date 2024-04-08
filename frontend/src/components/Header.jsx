import { Flex, Image, Link, useColorMode } from "@chakra-ui/react"
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import {AiFillHome} from 'react-icons/ai';
import {RxAvatar} from 'react-icons/rx';


//we use RouterLink from "react-router-dom" to get client-side routing
import { Link as RouterLink } from 'react-router-dom'

const Header = () => {
    const { colorMode, toggleColorMode} = useColorMode();
    const user = useRecoilValue(userAtom);

    //if a user is logged in then we would like to render this
    {user && (
      <Link as={RouterLink} to="/" >
        <AiFillHome size={24} />
      </Link>
    )}

  return (
    <Flex justifyContent={"space-between"} mt={6} mb="12">

        
        <Image
        cursor={"pointer"}
        alt="logo"
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
        />

    {user && (
      <Link as={RouterLink} to={`/${user.username}`} >
        <RxAvatar size={24} />
      </Link>
    )}
      
    </Flex>
  );
};

export default Header;
