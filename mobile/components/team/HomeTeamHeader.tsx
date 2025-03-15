// import { View, Text, Image, } from 'react-native';
// import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
// import { TeamType } from '~/types/types';



// const TeamHeader = ({ UserTeam }: { UserTeam: TeamType }) => (
//     <View className="items-center p-4 bg-[#1E293B] rounded-2xl mb-4">
//       <Image
//         source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${UserTeam?.logo}` || 'https://i.pinimg.com/474x/83/66/af/8366afc35999503d87285a20b45ab081.jpg' }}
//         className="w-24 h-24 rounded-xl mb-4"
//       />
//       <Text className="text-2xl font-bold text-white text-center">{UserTeam?.name}</Text>
//       <Text className="text-[#94A3B8] text-sm mt-1">{UserTeam?.location}</Text>
      
//       <View className="flex-row items-center mt-4">
//         <View className="flex-row items-center mr-6">
//           <MaterialIcons name="people" size={18} color="#94A3B8" />
//           <Text className="text-[#94A3B8] text-sm ml-2">
//             {(UserTeam?.members?.length)} member{UserTeam?.members?.length === 1 ? '' : 's'}
//           </Text>
//         </View>
        
//         <View className="flex-row items-center">
//           <FontAwesome5 name="crown" size={14} color="#2DD4BF" />              
//           <Text className="text-[#2DD4BF] text-sm ml-2">
//             {UserTeam?.captain?.userName || 'You'}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );

// export default TeamHeader;