import * as ImagePicker from 'expo-image-picker';
import { Button, Image, View, Alert } from 'react-native';
import { useState } from 'react';

export default function CamaraSimple() {
  const [imagen, setImagen] = useState(null);

  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para usar la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Button title="Tomar foto" onPress={tomarFoto} />
      {imagen && <Image source={{ uri: imagen }} style={{ width: 200, height: 200, marginTop: 20 }} />}
    </View>
  );
}
