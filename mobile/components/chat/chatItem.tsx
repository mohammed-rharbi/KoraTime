import { View, Text, Image, TouchableOpacity } from "react-native";
import { UserType } from "~/types/types";
import { useRouter } from "expo-router";



const ChatItem = ({ item , chatId }: { item: UserType , chatId:string }) => {



     const router = useRouter();   

    return (

        <TouchableOpacity
        onPress={() => router.push(`/playerChat?userId=${item._id}&chatId=${chatId}`)}
        className="flex-row items-center px-4 py-3"
      >
        <View className="relative">
          <Image
            source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${item.profilePic}` || "https://i.pinimg.com/736x/2b/07/77/2b077773b9d8cae6a954311f3c1c7f78.jpg" }}
            className="w-12 h-12 rounded-full"
          />
        </View>
  
        <View className="flex-1 ml-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-base font-semibold">{item.userName}</Text>
          </View>
        </View>
      </TouchableOpacity>

    )



}

  export default ChatItem;