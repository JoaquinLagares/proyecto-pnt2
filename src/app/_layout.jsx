import { Stack, useSegments,useRouter} from 'expo-router'
import { AuthProvider, useAuth } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext'; // 
import  { useEffect} from 'react'

function ProtectedLayout() {

    const { isAuth } = useAuth()

    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {

        if (isAuth === null) return;
        
        // const inAuthGroup = segments[0] ===s 'login'
        const inAuthGroup = ['login', 'registrar'].includes(segments[0])

        if (!isAuth && !inAuthGroup) {
            router.replace('/login')
        } else if (isAuth && inAuthGroup) {
            router.replace('/perfil')
        }

        console.log("segments: ", segments)

    }, [isAuth, segments])

    return <Stack
        screenOptions={{
            headerShown: false,
        }}
    />
}
export default function LayoutPrincipal() {

    return (
        <AuthProvider >
            <UserProvider>
                <ProtectedLayout />
            </UserProvider>
        </AuthProvider>
    )
}

