import {atom} from 'recoil';


//each atom is a state

const authScreenAtom = atom({
    key: 'authScreenAtom',
    default: 'login',
});

export default authScreenAtom;