import { View, Text, TouchableOpacity, Image } from 'react-native';
import useAuthStore from '~/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { UserType } from "~/types/types";
import useChatStore from '~/store/chatStore';


const  FriendCard = ({ friend }: { friend: UserType }) => {

    const router = useRouter()
    const { user } = useAuthStore()
    const { createChat , error } = useChatStore()
    


    const handleStartChat = async (id:string)=>{

        try {
            if(user?._id && friend._id){
               const newchat = await createChat(user?._id , friend._id)   
            }
            
                     
        } catch (error) {
            console.log(error);
        }
    }

    return (

      <View className="bg-[#1A1F2E] p-4 rounded-xl mb-4 flex-row items-center justify-between">
      <TouchableOpacity 
        className="flex-row items-center flex-1"
        onPress={() => router.push(`/playerPage?id=${friend._id}`)}
      >
        <Image
          source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${friend?.profilePic}` }}
          className="w-12 h-12 rounded-full mr-4"
        />
        
        <View className="flex-1">
          <Text className="text-white text-lg font-bold">{friend.userName}</Text>
          <Text className="text-gray-400 text-sm">{friend.location}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="ml-4"
        // onPress={() => handleStartChat(friend._id)}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color="#2DD4BF" />
      </TouchableOpacity>
    </View>
      )

}

export default FriendCard  