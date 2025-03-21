import { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import useAuthStore from '~/store/authStore';
import FriendCard from '~/components/player/friendCard';
import { Ionicons } from '@expo/vector-icons';
import useFriendshipStore from '~/store/frienshipStore';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function FriendsScreen() {


  const { user } = useAuthStore();
  const { getUserFriends, friends, isLoading, error } = useFriendshipStore();

  useEffect(() => {
    getUserFriends(user?._id as string);
  }, [user?._id]);


  if (isLoading) {
    return (
      <LinearGradient
        colors={['#0A0F1E', '#111827']}
        className="flex-1 items-center justify-center"
      >
        <View className="items-center">
          <View className="w-32 h-32 bg-[#2DD4BF]/10 rounded-full items-center justify-center">
            <ActivityIndicator size="large" color="#2DD4BF" />
            <View className="absolute w-full h-full border-2 border-[#2DD4BF]/20 rounded-full animate-pulse" />
          </View>
          <Text className="text-[#2DD4BF] mt-4 font-semibold">Loading Connections</Text>
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={['#0A0F1E', '#111827']}
        className="flex-1 items-center justify-center p-4"
      >
        <View className="bg-[#1E293B]/50 p-6 rounded-2xl border-2 border-[#F87171]/20 items-center">
          <Ionicons name="alert-circle" size={48} color="#F87171" />
          <Text className="text-red-400 text-lg mt-4 font-medium">{error}</Text>
          <TouchableOpacity 
            className="mt-6 bg-[#F87171]/10 px-8 py-3 rounded-full border border-[#F87171]/20"
            onPress={() => getUserFriends(user?._id as string)}
          >
            <Text className="text-[#FCA5A5] font-medium">Try Again</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#0A0F1E', '#111827']}
      className="flex-1 p-4"
    >

      <View className="mb-6">
        <View className="flex-row items-center space-x-3">
        <View className="mb-6 flex-row items-center">
        <Text className="text-white text-3xl font-bold mr-3">
          My<Text className="text-[#2DD4BF]"> Friends </Text>
        </Text>
        </View>
        </View>
        <Text className="text-[#A1A1AA] text-base ">
         Manage Ur Friends
       </Text>
      </View>

   
      <Link href="/players" asChild>
        <TouchableOpacity className="absolute bottom-8 right-6 z-10 bg-[#2DD4BF] w-14 h-14 rounded-full items-center justify-center shadow-lg shadow-[#2DD4BF]/30 active:scale-90">
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </Link>

      <FlatList
        data={friends}
        keyExtractor={(item) => item._id as string}
        renderItem={({ item }) => <FriendCard friend={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="items-center mt-16">
            <BlurView intensity={30} className="p-8 rounded-2xl overflow-hidden">
              <Ionicons name="people-outline" size={64} color="#4B5563" />
              <Text className="text-gray-500 mt-4 text-lg">Your Football Network</Text>
              <Text className="text-gray-600 text-center mt-2">
                Connect with players and build your dream team
              </Text>
              <Link href="/players" asChild>
                <TouchableOpacity className="mt-6 bg-gradient-to-r from-[#2DD4BF] to-[#84CC16] px-8 py-3 rounded-full active:scale-95">
                  <Text className="text-black font-bold">Discover Players</Text>
                </TouchableOpacity>
              </Link>
            </BlurView>
          </View>
        }
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </LinearGradient>
  );
}