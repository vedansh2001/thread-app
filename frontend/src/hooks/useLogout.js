import {  useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from './useShowToast';

const useLogout = () => {

        const setUser = useSetRecoilState(userAtom);
        const showToast = useShowToast();
        
        const logout = async() => {
            try {
                
                //fetch request
                const res = await fetch("/api/users/logout",{
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                })
                const data = await res.json();
                console.log(data);
                if(data.error){
                    showToast("Error", data.error, "error");
                    return;
                }
    
                localStorage.removeItem("user-threads");
                setUser(null);
            } catch (error) {
                showToast("Error", data.error, "error");
            }
        }
        return logout
}


export default useLogout
