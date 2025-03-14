import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useFriendshipStore from "~/store/frienshipStore";
import useAuthStore from "~/store/authStore";
import { UserType } from "~/types/types";


export default function ChatListScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "team" | "friend">("all");

  const { user } = useAuthStore();
  const { friends, getUserFriends } = useFriendshipStore();

  useEffect(() => {
    getUserFriends(user?._id as string);
  }, [user?._id, getUserFriends]);

  const filteredFriends = friends?.filter(friend => {
    const matchesSearch = friend.userName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || activeTab === "friend";
    return matchesSearch && matchesTab;
  });


  const ChatItem = ({ item }: { item: UserType }) => (
    <TouchableOpacity
      // onPress={() => router.push(`/friend-chat/${item._id}`)}
      className="flex-row items-center px-4 py-3"
    >
      <View className="relative">
        <Image
          source={{ uri: item.profilePic || "https://i.pinimg.com/736x/2b/07/77/2b077773b9d8cae6a954311f3c1c7f78.jpg" }}
          className="w-12 h-12 rounded-full"
        />
      </View>

      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-base font-semibold">{item.userName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const TabButton = ({ title, value }: { title: string; value: "all" | "team" | "friend" }) => (
    <TouchableOpacity
      onPress={() => setActiveTab(value)}
      className={`px-4 py-2 rounded-full ${
        activeTab === value ? 'bg-[#2DD4BF]' : 'bg-[#1A1F2E]'
      }`}
    >
      <Text
        className={`text-sm font-semibold ${
          activeTab === value ? 'text-black' : 'text-[#A1A1AA]'
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#0A0F1E]">
      <View className="px-4 pt-12 pb-4">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-white text-3xl font-bold">Messages</Text>
          <TouchableOpacity>
            <Ionicons name="create-outline" size={28} color="#2DD4BF" />
          </TouchableOpacity>
        </View>

        <View className="bg-[#1A1F2E] rounded-xl p-3 mb-4">
          <View className="flex-row items-center">
            <Ionicons name="search" size={20} color="#A1A1AA" />
            <TextInput
              placeholder="Search messages..."
              placeholderTextColor="#A1A1AA"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-2 text-white"
            />
          </View>
        </View>

        <View className="flex-row gap-3 space-x-2">
          <TabButton title="All" value="all" />
          <TabButton title="Team" value="team" />
          <TabButton title="Friends" value="friend" />
        </View>
      </View>

      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item._id!}
        renderItem={({ item }) => <ChatItem item={item} />}
        className="border-t border-[#1A1F2E]"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center pt-20">
            <Ionicons name="people-outline" size={48} color="#A1A1AA" />
            <Text className="text-[#A1A1AA] text-lg mt-4">No friends found</Text>
          </View>
        }
      />
    </View>
  );
}