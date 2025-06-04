import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';




//contexto: funcion global que exporta funciones a otras partes de la app
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)


export  const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(null)
    const [user, setUser] = useState(null)
    const [status, setStatus] = useState('cheking')

    //use effect: maneja los ciclos de vida de los componentes, cuando se monta, cuando se modifica una dependencia, cuando se demonta
    useEffect(() => {

        const cargarEstadoAuth = async() => {

            const isAuthenticated = await AsyncStorage.getItem("isAuthenticated");
            const userData = await AsyncStorage.getItem('userData')

            if(isAuthenticated === 'true' && userData){
                setUser(JSON.parse(userData))
                setStatus('authenticated')
            }  else{
                setStatus('unauthenticated')
            }

        }
        cargarEstadoAuth()
    },[])


    useEffect(() =>{
        const checkAuth = async () => {
            const logged = false;
            setIsAuth(logged)
        }
        checkAuth()

    },[])

    // const login= () => setIsAuth(true)
    const login = async (usuario, password) => {
        try{
            const response = await fetch('https://683fa1935b39a8039a552628.mockapi.io/api/v1/users')
            const data = await response.json()
            console.log(data)

            const user = data.find(u =>u.username === usuario && u.password === password )
            console.log(user)
            if(user){
                await AsyncStorage.setItem('isAuthenticated','true')
                await AsyncStorage.setItem('userData', JSON.stringify(user))
                setUser(user)
                setIsAuth(true)
                setStatus('authenticated')
            }else{
                alert('Usuario o pasword incorrecto')
            setStatus('unauthenticated')
            }
        }catch (error){
            console.error(error)
            alert('error en la autenticacion')
            setStatus('unauthenticated')
        }
    }

    const logout = () => setIsAuth(false)


    return (
        <AuthContext.Provider value={{isAuth,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
} 