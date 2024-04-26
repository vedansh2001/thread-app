import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import useShowToast from '../hooks/useShowToast';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { conversationAtom, selectedConversationAtom } from '../atoms/messagesAtom';

const MessageInput = ({setMessages}) => {
  const [messageText, setMessagesText] = useState("");
  const showToast = useShowToast();
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const setConversations = useSetRecoilState(conversationAtom);

  const handleSendMessage = async(e) => {
    e.preventDefault();
    if(!messageText) return;

    try {
      const res = await fetch("/api/messages", {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message:messageText,
          recipientId: selectedConversation.userId
        })
      })
      const data = await res.json();
      if(data.error){
        showToast("Error", data.error, "error");
        return;
      }
      setMessagesText("");
      setMessages((messsages) => [...messsages, data]);

      setConversations(prevConvs => {
        const updatedConversations = prevConvs.map(conversation => {     //map the prev conversation and find 
          if(conversation._id === selectedConversation._id){            //the current conversation that we are chatting with
            return {
              ...conversation,
              lastMessage:{               //we are gonna change the only lastMessage field
                text:messageText,
                sender:data.sender
              }
            }
          }
          return conversation;
        })
        return updatedConversations;
      })
      setMessagesText("");

    } catch (error) {
      showToast("Error", error.message, "error");
    }

  }

  return <form onSubmit={handleSendMessage} >
    <InputGroup>
      <Input
        w={"full"}
        placeholder='Type a message' onChange={(e) => setMessagesText(e.target.value)}
        value={messageText}
      />
      <InputRightElement onClick={handleSendMessage} cursor={"pointer"} >
        <IoSendSharp />
      </InputRightElement>
    </InputGroup>

  </form>
}

export default MessageInput;
