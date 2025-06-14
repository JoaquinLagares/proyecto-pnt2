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
            // console.log(data)

            const user = data.find(u =>u.username === usuario && u.password === password )
            // console.log(user)
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

    const checkPassword = async (password, confirmPassword) => {
        try {
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return false;
            }
            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres');
                return false;
            }
            return true;
            }
        catch (error) {
            console.error(error);
            alert('Error al verificar la contraseña');
            return false;
        }
    }

    const checkDuplicate = async (username, email) => {
        try {
            const existingUser= await fetch('https://683fa1935b39a8039a552628.mockapi.io/api/v1/users?username=' + username);
            const existingEmail = await fetch('https://683fa1935b39a8039a552628.mockapi.io/api/v1/users?email=' + email);
            const [userRes, emailRes] = await Promise.all([existingUser, existingEmail]);
            let existingUsers = await userRes.json();
            let existingEmails = await emailRes.json();
            
            if (existingUsers === 'Not found') {
                existingUsers = ''
            }
            if (existingEmails === 'Not found') {
                existingEmails = ''
            }
            console.log(existingUsers,existingEmails);
            
            if (existingUsers.length > 0) {
                console.log("Ya existe usuario");
                return;
            }
            if (existingEmails.length > 0) {
                console.log("Ya existe email");
                return;
            }
        } catch (error) {
            console.error(error);
            alert('Error al verificar duplicados');
        }
        return true;
    }

    const register = async (username, email, password, confirmPassword) => {
        try{
            const isUnique = await checkDuplicate(username, email);
            if (!isUnique) return;

            const passOkay = await checkPassword(password, confirmPassword);
            if (!passOkay) return;

            const response = await fetch('https://683fa1935b39a8039a552628.mockapi.io/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password})
            });
            const newUser = await response.json();

            await AsyncStorage.setItem('isAuthenticated', 'true');
            await AsyncStorage.setItem('userData', JSON.stringify(newUser));
            setUser(newUser);
            setIsAuth(true);
            setStatus('authenticated');
        } catch (error) {
            console.error(error);
            alert('Error al registrar el usuario');
            setStatus('unauthenticated');
        }
    }

    return (
        <AuthContext.Provider value={{isAuth,login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
} 