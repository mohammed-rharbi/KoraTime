import { View, Text, Image, FlatList, TouchableOpacity, TextInput, Animated } from "react-native";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const teamsData = [
  {
    id: "1",
    name: "Thunder 5",
    location: "New York",
    players: 4,
    needsPlayers: true,
    logo: "https://i.pinimg.com/474x/54/dd/fd/54ddfd815789197ee9912d4ab4e2292a.jpg",
  },
  {
    id: "2",
    name: "Street Kings",
    location: "Los Angeles",
    players: 5,
    needsPlayers: false,
    logo: "https://i.pinimg.com/474x/54/dd/fd/54ddfd815789197ee9912d4ab4e2292a.jpg",
  },
];

export default function TeamsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecruiting, setShowRecruiting] = useState(false);
  const createButtonScale = useRef(new Animated.Value(1)).current;

  const animateCreateButton = () => {
    Animated.sequence([
      Animated.timing(createButtonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(createButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const filteredTeams = teamsData.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = showRecruiting ? team.needsPlayers : true;
    return matchesSearch && matchesFilter;
  });

  const TeamCard = ({ item }: { item: typeof teamsData[0] }) => (
    <TouchableOpacity
      onPress={() => router.push(`/homeTeam`)}
      className="mx-4 mb-4"
    >
      <LinearGradient
        colors={['#1A1F2E', '#252A3F']}
        className="rounded-xl p-4"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-row items-center">
          <Image
            source={{ uri: item.logo }}
            className="w-14 h-14 rounded-lg"
          />
          
          <View className="flex-1 ml-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-white text-lg font-bold">{item.name}</Text>
              {item.needsPlayers && (
                <View className="bg-green-500/20 px-3 py-1 rounded-full">
                  <Text className="text-green-400 text-xs font-medium">Recruiting</Text>
                </View>
              )}
            </View>
            
            <View className="flex-row items-center justify-between mt-1">
              <View className="flex-row items-center">
                <Ionicons name="location" size={14} color="#A1A1AA" />
                <Text className="text-[#A1A1AA] text-sm ml-1">{item.location}</Text>
              </View>
              
              <View className="flex-row items-center">
                <MaterialCommunityIcons name="account-group" size={16} color="#A1A1AA" />
                <Text className="text-[#A1A1AA] text-sm ml-1">{item.players}/5</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const CreateTeamButton = () => (
    <TouchableOpacity
      onPress={() => {
        animateCreateButton();
        // router.push("/create-team");
      }}
      className="mx-4 mb-6"
    >
      <Animated.View style={{ transform: [{ scale: createButtonScale }] }}>
        <LinearGradient
          colors={['#2DD4BF', '#3B82F6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-xl p-4"
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white text-lg font-bold mb-1">Create Your Team</Text>
              <Text className="text-white/80 text-sm">Start your 5-a-side journey</Text>
            </View>
            <View className="bg-white/20 rounded-full p-2">
              <MaterialCommunityIcons name="soccer" size={24} color="#fff" />
            </View>
          </View>
          
          <View className="flex-row mt-4">
            <View className="flex-row -space-x-3">
              <View className="w-6 h-6 rounded-full bg-white/30" />
              <View className="w-6 h-6 rounded-full bg-white/20" />
              <View className="w-6 h-6 rounded-full bg-white/10" />
            </View>
            <View className="bg-white/20 rounded-full px-2 py-1 ml-2">
              <Text className="text-white text-xs">2 spots left</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#0A0F1E]">

      <View className="px-4 pt-12 pb-4">
        <Text className="text-white text-3xl font-bold mb-6">Teams</Text>


        <View className="flex-row items-center space-x-2 mb-4">
          <View className="flex-1 flex-row items-center bg-[#1A1F2E] rounded-xl p-3">
            <Ionicons name="search" size={20} color="#A1A1AA" />
            <TextInput
              placeholder="Search teams..."
              placeholderTextColor="#A1A1AA"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-2 text-white"
            />
          </View>
          
          <TouchableOpacity 
            onPress={() => setShowRecruiting(!showRecruiting)}
            className={`p-3 rounded-xl ${
              showRecruiting ? 'bg-green-500/20' : 'bg-[#1A1F2E]'
            }`}
          >
            <MaterialCommunityIcons 
              name="account-search" 
              size={20} 
              color={showRecruiting ? '#4ADE80' : '#A1A1AA'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredTeams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TeamCard item={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<CreateTeamButton />}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center pt-20">
            <MaterialCommunityIcons name="soccer-field" size={48} color="#A1A1AA" />
            <Text className="text-[#A1A1AA] text-lg mt-4">No teams found</Text>
          </View>
        }
      />
    </View>
  );
}