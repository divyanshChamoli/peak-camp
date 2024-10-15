import { createContext, PropsWithChildren, useContext, useState } from "react"

type AuthContextType = {
    // Basically isLoggedIn
    authToken?: string | null,
    currentUserId?: string | null,
    setAuthToken: React.Dispatch<React.SetStateAction<string | null | undefined>>,
    setCurrentUserId:  React.Dispatch<React.SetStateAction<string | null | undefined>>
    // setAuthToken:
    // handleLogin: ()=> Promise<void>,
    // handleLogout: ()=> Promise<void> 
}

// const AuthContextInitialState = {
//     authToken: undefined,
//     currentUserId: undefined,
//     setAuthToken: () => undefined,
//     setCurrentUserId:  () => undefined
// }

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = PropsWithChildren

// export interface User{
//     username: string ,
//     firstName: string ,
//     lastName: string ,
//     password: string,
//     campsCreated:  string
//     reviewsCreated: string
// }

export default function AuthProvider( {children} : AuthProviderProps ){
    const [authToken, setAuthToken] = useState<string | null>()
    const [currentUserId, setCurrentUserId] = useState<string | null>()
    
    
    return(
        <AuthContext.Provider value={{authToken, currentUserId, setAuthToken, setCurrentUserId}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext)

    if(context === undefined){
        throw new Error("useAuth cant be used outside of AuthProvider")
    }

    return context
}