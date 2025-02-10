import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const chatData = [
  {
    id: "1",
    type: "team",
    name: "Thunder 5",
    lastMessage: "Coach: Practice tomorrow at 6PM",
    time: "12:30 PM",
    unread: 2,
    image: "https://i.pinimg.com/474x/54/dd/fd/54ddfd815789197ee9912d4ab4e2292a.jpg",
  },
  {
    id: "2",
    type: "friend",
    name: "Mike Johnson",
    lastMessage: "Are you up for a game?",
    time: "10:45 AM",
    unread: 0,
    image: "https://i.pravatar.cc/150?img=2",
    isOnline: true,
  },
  {
    id: "3",
    type: "team",
    name: "Street Kings",
    lastMessage: "Sarah: Can't wait for the match!",
    time: "Yesterday",
    unread: 0,
    image: "https://i.pinimg.com/474x/54/dd/fd/54ddfd815789197ee9912d4ab4e2292a.jpg",
  },
  {
    id: "4",
    type: "friend",
    name: "Alex Smith",
    lastMessage: "Good game today!",
    time: "Yesterday",
    unread: 0,
    image: "https://i.pravatar.cc/150?img=3",
    isOnline: false,
  },
];

export default function ChatListScreen() {

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredChats = chatData.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || chat.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const ChatItem = ({ item }: { item: typeof chatData[0] }) => (
    <TouchableOpacity
      // onPress={() => router.push(`/chat/${item.id}`)}
      className="flex-row items-center px-4 py-3"
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-12 h-12 rounded-full"
        />
        {'isOnline' in item && item.isOnline && (
          <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A0F1E]" />
        )}
      </View>

      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-base font-semibold">{item.name}</Text>
          <Text className="text-[#A1A1AA] text-xs">{item.time}</Text>
        </View>

        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-[#A1A1AA] text-sm" numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View className="bg-[#2DD4BF] rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-black text-xs font-bold">{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const TabButton = ({ title, value }: { title: string; value: string }) => (
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
          <TouchableOpacity
          //  onPress={() => router.push('/new-chat')}
           >
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


        <View className="flex-row space-x-2">
          <TabButton title="All" value="all" />
          <TabButton title="Teams" value="team" />
          <TabButton title="Friends" value="friend" />
        </View>
      </View>


      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem item={item} />}
        className="border-t border-[#1A1F2E]"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center pt-20">
            <Ionicons name="chatbubble-outline" size={48} color="#A1A1AA" />
            <Text className="text-[#A1A1AA] text-lg mt-4">No messages found</Text>
          </View>
        }
      />
    </View>
  );
}