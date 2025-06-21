import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { getMatches } from '../context/servicios';
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router';




// export default function PerfilScreen() {
//   const [summonerName, setSummonerName] = useState('');
//   const [tagLine, setTagLine] = useState('');
//   const [matches, setMatches] = useState([]);

//   const handleBuscar = async () => {
//     const data = await getMatches(summonerName, tagLine);
//     setMatches(data);
//   };
const partidas = [
  { id: '1', juego: 'League of Legends', resultado: 'VICTORY', score: '3:9/5', modo: 'Normal', tiempo: '28 min ago', icon: require('../../assets/lol.png') },
  { id: '2', juego: 'League of Legends', resultado: 'DEFEAT', score: '28:34', modo: 'Champion', tiempo: '34 min ago', icon: require('../../assets/lol.png') },
  { id: '3', juego: 'CS:GO', resultado: 'DEFEAT', score: '16:24', modo: 'Crimpor', tiempo: '28 min ago', icon: require('../../assets/cs2.png') },
  { id: '4', juego: 'Valorant', resultado: 'DEFEAT', score: '15:25', modo: 'VALORANT', tiempo: '28 min ago', icon: require('../../assets/valorant.png') },
];

export default function PerfilGamer() {
  const router = useRouter();
  const user = {
    nombre: 'Gamer123',
    region: 'NA',
    imagen: require('../../assets/avatar.png'),
  };


  return (

    //   <View style={styles.container}>
    //     {/* Ícono para ir a la vista de región */}
    //     <View style={styles.buttonContainer}>
    //     <TouchableOpacity style={styles.regionIcon} onPress={() => router.push('/region')}>
    //       <Ionicons  size={30} color="#11BD93" />
    //     </TouchableOpacity>
    //     </View>

    //     {/* Buscador */}
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Nombre de invocador"
    //       placeholderTextColor="#888"
    //       value={summonerName}
    //       onChangeText={setSummonerName}
    //     />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Tag (ej: LAS)"
    //       placeholderTextColor="#888"
    //       value={tagLine}
    //       onChangeText={setTagLine}
    //     />
    //     <TouchableOpacity style={styles.button} onPress={handleBuscar}>
    //       <Text style={styles.buttonText}>Buscar partidas</Text>
    //     </TouchableOpacity>

    //     {/* Lista de partidas */}
    //     <FlatList
    //       data={matches}
    //       keyExtractor={(item) => item.matchId}
    //       renderItem={({ item }) => (
    //         <View style={styles.card}>
    //           <Text style={[styles.result, { color: item.win ? '#11BD93' : '#ff4d6d' }]}>
    //             {item.win ? 'VICTORIA' : 'DERROTA'}
    //           </Text>
    //           <Text style={styles.detail}>{item.champion}</Text>
    //           <Text style={styles.detail}>
    //             {item.kills}/{item.deaths}/{item.assists}
    //           </Text>
    //           <Text style={styles.detail}>
    //             {item.mode} : {item.duration} min
    //           </Text>
    //         </View>
    //       )}
    //     />
    //   </View>

    ///////////////////////////////////////////////////////////////////
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={{ flex: 1 }} /> 
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
      {/* Perfil */}
      <View style={styles.profile}>
        <Image source={user.imagen} style={styles.avatar} />
        <Text style={styles.username}>{user.nombre}</Text>
        <Text style={styles.region}>Region: {user.region || 'Sin región'}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Steam Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Partidas */}
      <View style={styles.matchesContainer}>
        <Text style={styles.title}>Recent Matches</Text>
        <FlatList
          data={partidas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.matchCard}>
              <Image source={item.icon} style={styles.icon} />
              <View>
                <Text style={[styles.result, item.resultado === 'VICTORY' ? styles.victory : styles.defeat]}>
                  {item.resultado}
                </Text>
                <Text style={styles.modo}>{item.modo}</Text>
                <Text style={styles.score}>{item.score}</Text>
                <Text style={styles.tiempo}>{item.tiempo}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#0e0e11', padding: 16 },
//   input: {
//     backgroundColor: '#1a1f2e',
//     color: '#fff',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#11BD93',
//   },
//   button: {
//     backgroundColor: '#11BD93',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonText: { color: '#0e0e11', fontWeight: 'bold' },
//   card: {
//     backgroundColor: '#1a1f2e',
//     padding: 16,
//     borderRadius: 10,
//     marginBottom: 12,
//   },
//   result: { fontWeight: 'bold', fontSize: 16 },
//   detail: { color: '#ccc' },
//  regionIcon: {
//   position: 'absolute',
//   bottom: 24,
//   right: 24,
//   backgroundColor: '#1a1f2e',
//   padding: 12,
//   borderRadius: 30,
//   zIndex: 100, // Se asegura de estar por encima
//   elevation: 5, // Android shadow
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.3,
//   shadowRadius: 4,
// },regionIcon: {
//   position: 'absolute',
//   bottom: 24,
//   right: 24,
//   backgroundColor: '#1a1f2e',
//   padding: 12,
//   borderRadius: 30,
//   zIndex: 100, // Se asegura de estar por encima
//   elevation: 5, // Android shadow
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.3,
//   shadowRadius: 4,
// },
// buttonContainer: {
//   flex: 1,
//   backgroundColor: '#0e0e11',
//   padding: 16,
//   position: 'relative',
// },



// });

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  editButton: {
    backgroundColor: '#11BD93',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#0e0e11',
    padding: 20,
  },
  profile: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#11BD93',
    borderWidth: 2,
  },
  username: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  region: {
    color: '#aaa',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#11BD93',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#0e0e11',
    fontWeight: 'bold',
  },
  matchesContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#11BD93',
    marginBottom: 10,
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1f2e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  result: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  victory: {
    color: '#00FF88',
  },
  defeat: {
    color: '#FF4081',
  },
  modo: {
    color: '#aaa',
    fontSize: 14,
  },
  score: {
    color: '#fff',
    fontSize: 14,
  },
  tiempo: {
    color: '#666',
    fontSize: 12,
  },
});
