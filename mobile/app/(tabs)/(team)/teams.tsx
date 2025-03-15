import { View, Text, Image, FlatList, TouchableOpacity, TextInput, Animated } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome5 , MaterialCommunityIcons } from "@expo/vector-icons";
import useTeamStore from "~/store/teamStore";
import useAuthStore from "~/store/authStore";
import CreateTeamButton from "~/components/team/createButton";
import TeamCard from "~/components/team/teamCard";


export default function TeamsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecruiting, setShowRecruiting] = useState(false);

  const {teams , getAllTeams} = useTeamStore()
  const { user } = useAuthStore()


  useEffect(()=>{

    getAllTeams()

  },[getAllTeams])


  return (
    <View className="flex-1 bg-[#0A0F1E]">

      <View className="px-4 pt-12 pb-4">
      <View className="mb-6">
        <View className="flex-row items-center space-x-3">
        <View className="mb-6 flex-row items-center">
        <Text className="text-white text-3xl font-bold mr-3">
          Team Up & 
          <Text className="text-[#2DD4BF]"> Dominate </Text>
        </Text>
        <FontAwesome5 name="trophy" size={28} color="#FFD700" />
        </View>
        </View>
        <Text className="text-[#A1A1AA] text-base ">
         Discover squads that match your passion & play style
       </Text>
        <Text className="text-[#A1A1AA] text-base ">
          {teams?.length}+ teams ready to play
        </Text>
      </View>

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
            className={`py-6 px-4 m-2 rounded-xl ${
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
        data={teams}
        renderItem={({ item }) => <TeamCard item={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
            user?.hasTeam ? (
            <></>
            ):(
            <CreateTeamButton/>
            )
          }
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center pt-20">
            <MaterialCommunityIcons name="soccer-field" size={48} color="#A1A1AA" />
            <Text className="text-[#A1A1AA] text-lg mt-4">No teams found</Text>
          </View>
        }
      />zzz
    </View>
  );
}