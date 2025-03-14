import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import useTeamStore from "~/store/teamStore";
import { useEffect, useState } from "react";
import ReservationStore from "~/store/reservationStore";
import { ReservationType, TeamType } from "~/types/types";
import useAuthStore from "~/store/authStore"; // Fetch user data and hasTeam status

export default function TeamPageScreen() {
  const { id } = useLocalSearchParams();
  const { team, getTeam } = useTeamStore();
  const { getUserReservations, userReservations } = ReservationStore();
  const { user } = useAuthStore(); // Fetch user data and hasTeam status
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          await getTeam(id as string);
        }
      } catch (err) {
        setError("Failed to fetch team data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (team?.captain) {
      getUserReservations(team.captain);
    }
  }, [team?.captain]);

  if (loading) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
        <ActivityIndicator size="large" color="#2DD4BF" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
        <Text className="text-white text-lg">{error}</Text>
        <TouchableOpacity
          className="mt-4 bg-[#2DD4BF] px-6 py-3 rounded-xl"
          onPress={() => setLoading(true)}
        >
          <Text className="text-black font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#0A0F1E]">
      <ScrollView className="flex-1">
        {/* Header Section */}
        <LinearGradient
          colors={['#2DD4BF', '#0A0F1E']}
          className="p-6 items-center"
        >
          <Image
            source={{ uri: team?.logo || "https://via.placeholder.com/150" }} // Fallback for missing logo
            className="w-32 h-32 rounded-full border-4 border-white"
          />
          <Text className="text-white text-3xl font-bold mt-4">{team?.name}</Text>
          <View className="flex-row items-center mt-2">
            <MaterialIcons name="location-on" size={20} color="#A1A1AA" />
            <Text className="text-[#A1A1AA] text-lg ml-1">{team?.location}</Text>
          </View>
        </LinearGradient>

        {/* Team Members Section */}
        <View className="p-6">
          <Text className="text-white text-2xl font-bold mb-4">Team Members</Text>
          {team?.members?.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
              {team.members.map((member) => (
                <View key={member._id} className="items-center">
                  <Image
                    source={{ uri: member.avatar || "https://via.placeholder.com/50" }} // Fallback for missing avatar
                    className="w-20 h-20 rounded-full"
                  />
                  <Text className="text-white text-lg mt-2">{member.name}</Text>
                  <Text className="text-[#A1A1AA] text-sm">{member.role}</Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text className="text-[#A1A1AA] text-lg">No members found in this team.</Text>
          )}
        </View>

        {/* Team Recent Reservations Section */}
        <View className="p-6">
          <Text className="text-white text-2xl font-bold mb-4">Recent Reservations</Text>
          {userReservations?.length > 0 ? (
            userReservations.map((reservation: ReservationType) => (
              <View key={reservation._id} className="bg-[#1F2937] p-4 rounded-xl mb-4">
                <Text className="text-white text-lg font-semibold">
                  Reservation on {new Date(reservation.date).toLocaleDateString()}
                </Text>
                <View className="flex-row items-center mt-2">
                  <MaterialIcons name="access-time" size={18} color="#A1A1AA" />
                  <Text className="text-[#A1A1AA] text-sm ml-2">
                    Starts at {reservation.startTime}
                  </Text>
                </View>
                <View className="flex-row items-center mt-1">
                  <MaterialIcons name="location-on" size={18} color="#A1A1AA" />
                  <Text className="text-[#A1A1AA] text-sm ml-2">
                    Field ID: {reservation.fieldId}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text className="text-[#A1A1AA] text-lg">No reservations found.</Text>
          )}
        </View>

        {/* Team Achievements Section */}
        <View className="p-6">
          <Text className="text-white text-2xl font-bold mb-4">Achievements</Text>
          <View className="space-y-3">
            <View className="flex-row items-center bg-[#1F2937] p-4 rounded-xl">
              <Ionicons name="trophy" size={24} color="#FFD700" />
              <Text className="text-white text-lg ml-2">2023 Summer League Champions</Text>
            </View>
            <View className="flex-row items-center bg-[#1F2937] p-4 rounded-xl">
              <Ionicons name="trophy" size={24} color="#FFD700" />
              <Text className="text-white text-lg ml-2">2022 Regional Finalists</Text>
            </View>
          </View>
        </View>
      </ScrollView>


      {user?.hasTeam && (
        <>
          <LinearGradient
            colors={['transparent', 'rgba(10,15,30,0.9)']}
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          />
          <TouchableOpacity
            className="absolute bottom-4 left-4 right-4 bg-[#2DD4BF] p-4 rounded-2xl shadow-xl"
            style={{ shadowColor: '#2DD4BF', shadowOpacity: 0.4, shadowRadius: 10 }}
            onPress={() => {
              // Add logic to handle challenging the team
              console.log("Challenging team:", team?.name);
            }}
          >
            <Text className="text-black text-lg font-bold text-center">Challenge Team</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}