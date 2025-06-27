import { Camera, CameraType } from "expo-camera";
import { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";


export default function CameraComponent({onFotoTomada, onCancelar}) {
  const[hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.front);
  const cameraRef = useRef(null);

  useEffect(() =>{
    (async()=>{
      const {status} = await Camera.requestCamerPermissionsAsync();
      setHasPermission(status === "granted")
    })();
  },[])

  const tomarFoto = async ()=>{
    if (cameraRef.current){
      const foto = await cameraRef.current.takePicture();
      onFotoTomada(foto.uri);
    }
  }

  const alternarCamara = () => {
    setCameraType((prev )=>
      prev === Camera.Constants.Type.back
        ?Camera.Type.Constants.front
        :Camera.Type.Constants.front
    
    )
  }

  if (hasPermission === null) return <View/>
  if (hasPermission)
    return(
      <View>
        <Text> No se ortorgaron permisos para la camara</Text>
      </View>
    )
  return (
   <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
      <View style={{ flex: 1, justifyContent: "flex-end", padding: 20 }}>
        <TouchableOpacity
          style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}
          onPress={tomarFoto}
        >
          <Text>Tomar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={alternarCamara} style={{ marginTop: 10 }}>
          <Text style={{ color: "white", textAlign: "center" }}>Cambiar Cámara</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCancelar} style={{ marginTop: 10 }}>
          <Text style={{ color: "white", textAlign: "center" }}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

