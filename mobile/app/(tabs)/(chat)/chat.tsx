import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useFriendshipStore from "~/store/frienshipStore";
import useAuthStore from "~/store/authStore";
import ChatItem from "~/components/chat/chatItem";
import useChatStore from "~/store/chatStore";

export default function ChatListScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "team" | "friend">("all");

  const { user } = useAuthStore();
  const { friends, getUserFriends } = useFriendshipStore();
  const { getUserChats, UserChats } = useChatStore();

  useEffect(() => {
    if (user?._id) {
      getUserChats(user._id);
    }
  }, [user?._id]);


  const filteredChats = UserChats?.filter(chat => {

    const otherParticipant = chat.participants.find(p => p._id !== user?._id);
    const matchesSearch = otherParticipant?.userName?.toLowerCase().includes(searchQuery.toLowerCase());
    

    const matchesTab = activeTab === "all" || activeTab === "friend";
    return matchesSearch && matchesTab;
  });

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
        data={filteredChats}
        keyExtractor={(item) => item._id!}
        renderItem={({ item }) => {

          const otherParticipant = item.participants.find(p => p._id !== user?._id);
          return otherParticipant ? <ChatItem item={otherParticipant} chatId={item._id as string} /> : null;
        }}
        className="border-t border-[#1A1F2E]"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center pt-20">
            <Ionicons name="chatbubble-outline" size={48} color="#A1A1AA" />
            <Text className="text-[#A1A1AA] text-lg mt-4">No conversations found</Text>
          </View>
        }
      />
    </View>
  );
}