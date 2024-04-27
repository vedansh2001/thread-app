import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import io from "socket.io-client";

const SocketContext = createContext();


export const useSocket = () => {
    return useContext(SocketContext);
}
 
export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const user = useRecoilValue(userAtom);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const socket = io("http://localhost:5000",{
            query:{
                userId:user?._id
            }
        });
        setSocket(socket);

        socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        });
        return () => socket && socket.close();
    },[user?._id]);

    return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
}