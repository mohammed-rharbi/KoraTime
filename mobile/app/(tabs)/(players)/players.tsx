// import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
// import { MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { useState } from 'react';

// interface AllPlayersProps {
//   players: UserType[];
// }

// const AllPlayers = ({ players }: AllPlayersProps) => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filters, setFilters] = useState({
//     hasTeam: false,
//     isActive: false,
//     location: ''
//   });

//   const filteredPlayers = players.filter(player => {
//     return (
//       (player.userName?.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       (!filters.hasTeam || player.hasTeam) &&
//       (!filters.isActive || player.isActive) &&
//       (!filters.location || player.location?.toLowerCase().includes(filters.location.toLowerCase()))
//   });

//   return (
//     <View className="flex-1 bg-[#0F172A]">
//       {/* Search and Filters */}
//       <View className="p-4">
//         <View className="bg-[#1E293B] rounded-xl p-3 flex-row items-center">
//           <Feather name="search" size={20} color="#64748B" />
//           <TextInput
//             placeholder="Search players..."
//             placeholderTextColor="#64748B"
//             className="flex-1 ml-2 text-white"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//         </View>

//         <View className="flex-row justify-between mt-4">
//           <FilterButton
//             icon="group"
//             label="Has Team"
//             active={filters.hasTeam}
//             onPress={() => setFilters(prev => ({ ...prev, hasTeam: !prev.hasTeam }))}
//           />
//           <FilterButton
//             icon="check-circle"
//             label="Active"
//             active={filters.isActive}
//             onPress={() => setFilters(prev => ({ ...prev, isActive: !prev.isActive }))}
//           />
//           <FilterButton
//             icon="location-on"
//             label="Nearby"
//             active={!!filters.location}
//             onPress={() => setFilters(prev => ({ ...prev, location: 'Your Location' }))}
//           />
//         </View>
//       </View>

//       {/* Players List */}
//       <ScrollView className="flex-1 px-4">
//         {filteredPlayers.map(player => (
//           <TouchableOpacity
//             key={player._id}
//             className="bg-[#1E293B] rounded-2xl p-4 mb-4 flex-row items-center border border-[#334155]"
//             onPress={() => router.push(`/player/${player._id}`)}
//           >
//             <Image
//               source={{ uri: player.profilePic || 'https://i.pinimg.com/736x/70/8c/08/708c08614099f90b849c6f7089f8effb.jpg' }}
//               className="w-16 h-16 rounded-full mr-4"
//             />
//             <View className="flex-1">
//               <View className="flex-row justify-between items-center">
//                 <Text className="text-white font-bold text-lg">{player.userName}</Text>
//                 {player.isActive && (
//                   <View className="flex-row items-center">
//                     <MaterialIcons name="circle" size={12} color="#10B981" />
//                     <Text className="text-[#10B981] text-xs ml-1">Online</Text>
//                   </View>
//                 )}
//               </View>
//               <Text className="text-[#94A3B8] text-sm">{player.role || 'Player'}</Text>
//               <View className="flex-row items-center mt-1">
//                 <Ionicons name="location-outline" size={14} color="#94A3B8" />
//                 <Text className="text-[#94A3B8] text-xs ml-1">
//                   {player.location || 'Location not set'}
//                 </Text>
//               </View>
//               {player.hasTeam && (
//                 <View className="flex-row items-center mt-1">
//                   <FontAwesome5 name="users" size={12} color="#2DD4BF" />
//                   <Text className="text-[#2DD4BF] text-xs ml-1">Has Team</Text>
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Floating Action Button */}
//       <TouchableOpacity 
//         className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-[#2DD4BF] items-center justify-center shadow-xl shadow-[#2DD4BF]/30"
//         onPress={() => router.push('/create-player')}
//       >
//         <Feather name="plus" size={28} color="#0F172A" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// // Reusable Components
// const FilterButton = ({ icon, label, active, onPress }: any) => (
//   <TouchableOpacity
//     className={`px-4 py-2 rounded-xl flex-row items-center ${
//       active ? 'bg-[#2DD4BF]' : 'bg-[#1E293B]'
//     }`}
//     onPress={onPress}
//   >
//     <MaterialIcons 
//       name={icon} 
//       size={16} 
//       color={active ? '#0F172A' : '#2DD4BF'} 
//     />
//     <Text className={`ml-2 text-sm ${
//       active ? 'text-[#0F172A]' : 'text-[#2DD4BF]'
//     }`}>
//       {label}
//     </Text>
//   </TouchableOpacity>
// );

// export default AllPlayers;