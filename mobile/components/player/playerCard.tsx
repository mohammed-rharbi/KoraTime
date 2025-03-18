import { UserType } from "~/types/types";
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import usePlayerStore from '~/store/playersStore';
import useAuthStore from '~/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import useFriendshipStore from "~/store/frienshipStore";


const PlayerCard = ({ player }: { player: UserType }) => {

    const router = useRouter()
    const { user } = useAuthStore()
    const { sendFriendRequest } = useFriendshipStore()


    const isFriend = user?.friends?.includes(player._id);


    const handleSendRequest = async (id:string)=>{

        if (isFriend) {
            console.log("User is already a friend");
            return;
        }
    
        try {
            if(user?._id){
                await sendFriendRequest(user?._id , id)           
            }
                     
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <LinearGradient
          colors={['#1A1F2E', '#0F172A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-4 rounded-2xl mb-4 flex-row items-center shadow-lg shadow-[#2DD4BF]/10"
        >
          <TouchableOpacity 
            className="flex-row items-center flex-1 "
            onPress={() => router.push(`/playerPage?id=${player._id}`)}
          >
            <Image
              source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${player.profilePic}` }}
              className="w-14 h-14 rounded-full mr-4 border-2 border-[#2DD4BF]"
            />
            
            <View className="flex-1">
              <Text className="text-white text-lg font-bold mb-1">{player.userName}</Text>
              <View className="flex-row items-center">
                <Ionicons name="location" size={14} color="#64748B" />
                <Text className="text-gray-400 text-sm ml-1">{player.location}</Text>
              </View>
              <View className="flex-row mt-2">
                <View className="flex-row items-center mr-4">
                  <Text className="text-[#2DD4BF] font-bold mr-1">2.5k</Text>
                  <Text className="text-gray-400 text-xs">Followers</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-[#2DD4BF] font-bold mr-1">150</Text>
                  <Text className="text-gray-400 text-xs">Posts</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
                className={`w-10 h-10 items-center justify-center rounded-full ${
                    isFriend ? 'bg-gray-500' : 'bg-[#2DD4BF]/20'
                }`}
                disabled={isFriend}
                onPress={() => handleSendRequest(player._id as string)}>
                {isFriend ? (
                    <Ionicons name="checkmark" size={20} color="white" />
                ) : (
                    <Ionicons name="person-add" size={20} color="#2DD4BF" />
                )}
        </TouchableOpacity>

        </LinearGradient>
      )

}

export default PlayerCard  