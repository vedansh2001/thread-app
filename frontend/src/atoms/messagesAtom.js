import {atom} from 'recoil';

export const conversationAtom = atom ({
    key: "conversationsAtom",
    default: [],
});

export const selectedConversationAtom = atom({
    key: "selectedConversationAtom",
    default: {
        _id: "",
        userId: "",
        username: "",
        userProfilePic: "",
    }
}) 