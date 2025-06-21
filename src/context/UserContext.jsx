import React, { createContext, useContext,  useState } from 'react'


export const UserContext = createContext()

export const useUser  = () => useContext(UserContext)

export const UserProvider = ({children})=>{

  const [users, setUsers] = useState([]);

   const buscarUsuarios= async(texto) =>{

      try{
        const res = await fetch('https://683fa1935b39a8039a552628.mockapi.io/api/v1/users')
        const data = await res.json()
        const filtrados = data.filter((u) => u.username.toLowerCase().includes(texto.toLowerCase()))
        setUsers(filtrados)
      }catch(error){
        console.log('Error: ', error)
      }
    }
  return(
    <UserContext.Provider value= {{users, buscarUsuarios}}>
      {children}
    </UserContext.Provider>
  )
}
