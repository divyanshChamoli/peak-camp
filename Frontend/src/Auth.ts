import axios from "axios"

export default function isLoggedIn(): Promise<boolean>{
    async function getToken(){
        const token="Bearer " + localStorage.getItem("token")
        try{
            const res=await axios.get("http://localhost:3000/user/authenticate",{
                headers:{
                    Authorization: token
                }
            })
            if(res.data.message){
                return true
            }
        }
        catch(err){
            console.log(err)
            return false
        }
        return false    
    }  
    return getToken()
}