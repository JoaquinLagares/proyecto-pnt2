import { Camera } from "expo-camera";
import { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CameraComponent({ onFotoTomada, onCancelar }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front); 
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const tomarFoto = async () => {
    if (cameraRef.current) {
      const foto = await cameraRef.current.takePictureAsync({ base64: true });
      onFotoTomada(foto.uri); // También podés pasar foto.base64 si querés guardar el string
    }
  };

  const alternarCamara = () => {
    console.log("Camra: " ,camera);
    setCameraType((prev) =>
      prev === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) return <View />;
  if (!hasPermission)
    return (
      <View style={styles.permissionDenied}>
        <Text style={styles.permissionText}>No se otorgaron permisos para la cámara</Text>
        <TouchableOpacity onPress={onCancelar} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.captureButton} onPress={tomarFoto}>
          <Text style={styles.buttonText}>Tomar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={alternarCamara} style={styles.switchButton}>
          <Text style={styles.buttonText}>Cambiar Cámara</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCancelar} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  controls: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  captureButton: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  switchButton: {
    backgroundColor: "#11BD93",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#ff4444",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#0e0e11",
    fontWeight: "bold",
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
  },
  permissionDenied: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0e0e11",
  },
  permissionText: {
    color: "#fff",
    marginBottom: 20,
  },
});
