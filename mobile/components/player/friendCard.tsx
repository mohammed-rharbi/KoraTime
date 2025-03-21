import { View, Text, TouchableOpacity, Image } from "react-native";
import useAuthStore from "~/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { UserType } from "~/types/types";
import useChatStore from "~/store/chatStore";
import { useEffect } from "react";

const FriendCard = ({ friend }: { friend: UserType }) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { createChat, UserChats , getUserChats } = useChatStore();


  useEffect(()=>{


    getUserChats(user?._id as string)

  },[user?._id])


  const chatExists = UserChats?.some(
    (chat) =>
      chat.participants.includes(user?._id) &&
      chat.participants.includes(friend._id)
  );

  const handleStartChat = async (id: string) => {
    try {
      if (user?._id && friend._id) {
        await createChat(user?._id, friend._id);
      }
      router.push("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="bg-[#1A1F2E] p-4 rounded-xl mb-4 flex-row items-center justify-between">
      {/* Friend Info */}
      <TouchableOpacity
        className="flex-row items-center flex-1"
        onPress={() => router.push(`/playerPage?id=${friend._id}`)}
      >
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${friend?.profilePic}`,
          }}
          className="w-12 h-12 rounded-full mr-4"
        />
        <View className="flex-1">
          <Text className="text-white text-lg font-bold">{friend.userName}</Text>
          <Text className="text-gray-400 text-sm">{friend.location}</Text>
        </View>
      </TouchableOpacity>

      {/* Chat Button - Only show if chat doesn't exist */}
      {!chatExists && (
        <TouchableOpacity className="ml-4" onPress={() => handleStartChat(friend._id as string)}>
          <Ionicons name="chatbubble-ellipses" size={24} color="#2DD4BF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FriendCard;
