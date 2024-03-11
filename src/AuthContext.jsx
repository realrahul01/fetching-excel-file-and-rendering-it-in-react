import { createContext, useState } from "react";



export const AuthContext = createContext()

const AuthProvider = ({children})=>{
const [isLogin,setIsLogin] = useState(false)


const logginHandler=()=>{
    setIsLogin(true)
}
const logginOutHandler=()=>{
    setIsLogin(false)
}

    return(
        <AuthContext.Provider value={{isLogin,logginHandler,logginOutHandler}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;