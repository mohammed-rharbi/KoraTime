// import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Image, SafeAreaView, ActivityIndicator } from 'react-native';
// import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useState, useEffect } from 'react';
// import { TeamType, UserType } from '~/types/types';
// import useTeamStore from '~/store/teamStore';
// import useAuthStore from '~/store/authStore';

// interface Props {
//   team: TeamType;
// }

// export default function TeamManagementScreen({ team }: Props) {
//   const { user } = useAuthStore();
//   const [showInviteModal, setShowInviteModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [pendingInvites, setPendingInvites] = useState<string[]>([]);
//   const { invitePlayer, removePlayer, promoteToCaptain, loading } = useTeamStore();
  
//   const isCaptain = user?._id === team.captain?._id;
//   const hasMembers = (team.members?.length || 0) > 1; // Including captain

//   useEffect(() => {
//     // Fetch pending invites on mount
//     // Implement your API call here
//   }, []);

//   const handleInvite = async (userId: string) => {
//     try {
//       await invitePlayer(team._id!, userId);
//       setPendingInvites([...pendingInvites, userId]);
//     } catch (error) {
//       console.error('Invite failed:', error);
//     }
//   };

//   const TeamHeader = () => (
//     <View className="items-center p-4 bg-[#1E293B] rounded-2xl mb-4">
//       <Image
//         source={{ uri: team.logo || 'https://via.placeholder.com/150' }}
//         className="w-24 h-24 rounded-xl mb-4"
//       />
//       <Text className="text-2xl font-bold text-white text-center">{team.name}</Text>
//       <Text className="text-[#94A3B8] text-sm mt-1">{team.location}</Text>
      
//       <View className="flex-row items-center mt-4">
//         <View className="flex-row items-center mr-6">
//           <MaterialIcons name="people" size={18} color="#94A3B8" />
//           <Text className="text-[#94A3B8] text-sm ml-2">
//             {(team.members?.length || 1)} member{team.members?.length === 1 ? '' : 's'}
//           </Text>
//         </View>
        
//         <View className="flex-row items-center">
//           <FontAwesome5 name="crown" size={14} color="#2DD4BF" />
//           <Text className="text-[#2DD4BF] text-sm ml-2">
//             {team.captain?.userName || 'You'}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );

//   const EmptyState = () => (
//     <View className="flex-1 items-center justify-center py-12">
//       <FontAwesome5 name="users" size={48} color="#334155" />
//       <Text className="text-[#64748B] text-lg mt-4 text-center">
//         {isCaptain ? "Your team is empty. Start inviting players!" : "No members yet"}
//       </Text>
      
//       {isCaptain && (
//         <TouchableOpacity
//           onPress={() => setShowInviteModal(true)}
//           className="flex-row items-center bg-[#2DD4BF] px-6 py-3 rounded-full mt-6"
//         >
//           <MaterialIcons name="person-add" size={20} color="white" />
//           <Text className="text-white font-semibold ml-2">Invite Players</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );

//   const MemberItem = ({ member }: { member: UserType }) => (
//     <View className="flex-row items-center justify-between bg-[#1E293B] p-4 rounded-xl mb-3">
//       <View className="flex-row items-center flex-1">
//         <Image
//           source={{ uri: member.profilePic || 'https://via.placeholder.com/150' }}
//           className="w-10 h-10 rounded-full mr-4"
//         />
//         <View className="flex-1">
//           <Text className="text-white font-semibold">{member.userName}</Text>
//           {member._id === team.captain?._id && (
//             <Text className="text-[#2DD4BF] text-xs">Captain</Text>
//           )}
//         </View>
//       </View>
      
//       {isCaptain && member._id !== team.captain?._id && (
//         <View className="flex-row items-center space-x-3">
//           <TouchableOpacity
//             onPress={() => promoteToCaptain(team._id!, member._id!)}
//             className="p-2 bg-[#2DD4BF]/20 rounded-lg"
//           >
//             <FontAwesome5 name="crown" size={16} color="#2DD4BF" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => removePlayer(team._id!, member._id!)}
//             className="p-2 bg-red-500/20 rounded-lg"
//           >
//             <MaterialIcons name="remove-circle" size={16} color="#ef4444" />
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );

//   const InviteModal = () => (
//     <Modal visible={showInviteModal} animationType="slide">
//       <SafeAreaView className="flex-1 bg-[#0F172A] p-4">
//         <View className="flex-row justify-between items-center mb-6">
//           <Text className="text-2xl font-bold text-white">Invite Players</Text>
//           <TouchableOpacity onPress={() => setShowInviteModal(false)}>
//             <MaterialIcons name="close" size={24} color="#94A3B8" />
//           </TouchableOpacity>
//         </View>

//         <TextInput
//           placeholder="Search players..."
//           placeholderTextColor="#94A3B8"
//           className="bg-[#1E293B] p-4 rounded-xl text-white mb-4"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />

//         {loading ? (
//           <View className="flex-1 items-center justify-center">
//             <ActivityIndicator size="large" color="#2DD4BF" />
//           </View>
//         ) : (
//           <FlatList
//             data={[]} // Replace with your search results
//             keyExtractor={(item) => item._id!}
//             renderItem={({ item }) => (
//               <View className="flex-row items-center justify-between bg-[#1E293B] p-4 rounded-xl mb-3">
//                 <View className="flex-row items-center flex-1">
//                   <Image
//                     source={{ uri: item.profilePic }}
//                     className="w-10 h-10 rounded-full mr-4"
//                   />
//                   <Text className="text-white font-semibold">{item.userName}</Text>
//                 </View>
                
//                 {pendingInvites.includes(item._id!) ? (
//                   <Text className="text-[#94A3B8] text-sm">Invite Sent</Text>
//                 ) : (
//                   <TouchableOpacity
//                     onPress={() => handleInvite(item._id!)}
//                     className="bg-[#2DD4BF] px-4 py-2 rounded-lg"
//                   >
//                     <Text className="text-white font-semibold">Invite</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             )}
//             ListEmptyComponent={
//               <View className="items-center py-6">
//                 <Text className="text-[#94A3B8]">No players found</Text>
//               </View>
//             }
//           />
//         )}
//       </SafeAreaView>
//     </Modal>
//   );

//   return (
//     <LinearGradient colors={['#0F172A', '#1E293B']} className="flex-1 p-4">
//       <TeamHeader />

//       {isCaptain && (
//         <TouchableOpacity
//           onPress={() => setShowInviteModal(true)}
//           className="flex-row items-center bg-[#2DD4BF] p-4 rounded-xl mb-6"
//         >
//           <MaterialIcons name="person-add" size={24} color="white" />
//           <Text className="text-white font-semibold ml-3">Invite Players</Text>
//         </TouchableOpacity>
//       )}

//       {pendingInvites.length > 0 && (
//         <View className="bg-[#1E293B] p-4 rounded-xl mb-6">
//           <Text className="text-white font-semibold mb-3">Pending Invites ({pendingInvites.length})</Text>
//           {pendingInvites.map(inviteId => (
//             <View key={inviteId} className="flex-row items-center justify-between p-3 bg-[#0F172A] rounded-lg mb-2">
//               <Text className="text-[#94A3B8]">Invite sent to user #{inviteId}</Text>
//               <ActivityIndicator size="small" color="#2DD4BF" />
//             </View>
//           ))}
//         </View>
//       )}

//       <Text className="text-white text-lg font-bold mb-4">Team Members</Text>

//       {hasMembers ? (
//         <FlatList
//           data={team.members}
//           keyExtractor={(item) => item._id!}
//           renderItem={({ item }) => <MemberItem member={item} />}
//           ListEmptyComponent={<EmptyState />}
//         />
//       ) : (
//         <EmptyState />
//       )}

//       <InviteModal />
//     </LinearGradient>
//   );
// }