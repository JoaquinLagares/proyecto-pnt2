// // import React from 'react'
// // import { Link } from 'expo-router'
// // import { Text,View, StyleSheet, Pressable} from 'react-native'

export default function Home() {

  const links = [ 
    {href: '/scroll', label: 'Ir a ScrollUrers'},
    {href: '/flatlist', label: 'Ir a FlatListUrers'},
    {href: '/touchables', label: 'Ir a Touchables'},
    {href: '/demo', label: 'Ir a Demo'}
  ]


  return (
    
    <View style= {styles.container}>
      <Text style = {styles.title}>🏠Home Screen</Text>
      {
        links.map((link)=>(
          <Link key={link.href} href={link.href} asChild> 
                <Pressable style ={styles.button}>
                  <Text style={styles.buttonText}>{link.label}</Text>
                </Pressable>
          </Link>
        ))
      }
    </View>
  )
}

// // const styles = StyleSheet.create  ({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems:'center',
// //     padding: 20,
// //     backgroundColor: '#f5f5f5'
// //   },
// //   title:{
// //     fontSize: 26,
// //     fontWeight: 'bold',
// //     marginBottom:20
// //   },
// //   button:{
// //     backgroundColor: '#2195f3',
// //     paddingVertical: 12,
// //     paddingHorizontal:25,
// //     borderRadius:8,
// //     marginBottom:15

// //   },
// //   buttonText:{
// //     color:'white',
// //     fontSize:18
// //   }
// // })


// import React from 'react';
// import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import lolIcon from '../../assets/lol.png';


// const partidas = [
//   { id: '1', juego: 'League of Legends', resultado: 'VICTORY', score: '3:9/5', modo: 'Normal', tiempo: '28 min ago', icon: require('../../assets/lol.png') },
//   { id: '2', juego: 'League of Legends', resultado: 'DEFEAT', score: '28:34', modo: 'Champion', tiempo: '34 min ago', icon: require('../../assets/lol.png') },
//   { id: '3', juego: 'CS:GO', resultado: 'DEFEAT', score: '16:24', modo: 'Crimpor', tiempo: '28 min ago', icon: require('../../assets/csgo.png') },
//   { id: '4', juego: 'Valorant', resultado: 'DEFEAT', score: '15:25', modo: 'VALORANT', tiempo: '28 min ago', icon: require('../../assets/valorant.png') },
// ];

// export default function PerfilGamer() {
//   const user = {
//     nombre: 'Gamer123',
//     region: 'NA',
//     imagen: require('../../assets/avatar.png'),
//   };

//   return (
//     <View style={styles.container}>
//       {/* Perfil */}
//       <View style={styles.profile}>
//         <Image source={user.imagen} style={styles.avatar} />
//         <Text style={styles.username}>{user.nombre}</Text>
//         <Text style={styles.region}>Region: {user.region || 'Sin región'}</Text>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Steam Profile</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Partidas */}
//       <View style={styles.matchesContainer}>
//         <Text style={styles.title}>Recent Matches</Text>
//         <FlatList
//           data={partidas}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.matchCard}>
//               <Image source={item.icon} style={styles.icon} />
//               <View>
//                 <Text style={[styles.result, item.resultado === 'VICTORY' ? styles.victory : styles.defeat]}>
//                   {item.resultado}
//                 </Text>
//                 <Text style={styles.modo}>{item.modo}</Text>
//                 <Text style={styles.score}>{item.score}</Text>
//                 <Text style={styles.tiempo}>{item.tiempo}</Text>
//               </View>
//             </View>
//           )}
//         />
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0e0e11',
//     padding: 20,
//   },
//   profile: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderColor: '#11BD93',
//     borderWidth: 2,
//   },
//   username: {
//     fontSize: 24,
//     color: '#fff',
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   region: {
//     color: '#aaa',
//     marginVertical: 5,
//   },
//   button: {
//     backgroundColor: '#11BD93',
//     padding: 10,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#0e0e11',
//     fontWeight: 'bold',
//   },
//   matchesContainer: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 20,
//     color: '#11BD93',
//     marginBottom: 10,
//   },
//   matchCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#1a1f2e',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//   },
//   icon: {
//     width: 40,
//     height: 40,
//     marginRight: 15,
//   },
//   result: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   victory: {
//     color: '#00FF88',
//   },
//   defeat: {
//     color: '#FF4081',
//   },
//   modo: {
//     color: '#aaa',
//     fontSize: 14,
//   },
//   score: {
//     color: '#fff',
//     fontSize: 14,
//   },
//   tiempo: {
//     color: '#666',
//     fontSize: 12,
//   },
// });
