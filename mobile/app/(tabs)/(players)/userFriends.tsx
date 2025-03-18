// components/FriendsScreen.tsx
import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import useAuthStore from '~/store/authStore';
import usePlayerStore from '~/store/playersStore';
import useChatStore from '~/store/chatStore';
import { Ionicons } from '@expo/vector-icons';

export default function FriendsScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { createChat } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  


  const handleStartChat = async (friendId: string) => {
    // try {
    //   if (!user?._id) return;
      

    //   const chat = await createChat(user._id, friendId);
      

    //   router.push({
    //     pathname: '/chat',
    //     params: { 
    //       chatId: chat._id,
    //       userId: friendId
    //     }
    //   });
    // } catch (err) {
    //   console.error('Chat creation failed:', err);
    // }
  };

  const FriendCard = ({ friend }: { friend: any }) => (
    <View className="bg-[#1A1F2E] p-4 rounded-xl mb-4 flex-row items-center justify-between">
      <TouchableOpacity 
        className="flex-row items-center flex-1"
        onPress={() => router.push(`/playerPage?id=${friend._id}`)}
      >
        <Image
          source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${friend.profilePic}` }}
          className="w-12 h-12 rounded-full mr-4"
        />
        
        <View className="flex-1">
          <Text className="text-white text-lg font-bold">{friend.userName}</Text>
          <Text className="text-gray-400 text-sm">{friend.position}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="ml-4"
        onPress={() => handleStartChat(friend._id)}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color="#2DD4BF" />
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#0A0F1E] items-center justify-center">
        <ActivityIndicator size="large" color="#2DD4BF" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-[#0A0F1E] items-center justify-center">
        <Text className="text-red-500 text-lg">{error}</Text>
        <TouchableOpacity  className="mt-4">
          <Text className="text-[#2DD4BF]">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#0A0F1E] p-4">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-white text-2xl font-bold">Friends</Text>
      </View>

      <FlatList
        data={user?.friends}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <FriendCard friend={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center mt-8">
            <Ionicons name="people-outline" size={48} color="#4B5563" />
            <Text className="text-gray-500 mt-4">No friends yet</Text>
            <Link href="/players" asChild>
              <TouchableOpacity className="mt-4 bg-[#2DD4BF] px-6 py-2 rounded-full">
                <Text className="text-black font-medium">Find Players</Text>
              </TouchableOpacity>
            </Link>
          </View>
        }
      />
    </View>
  );
}