import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5,  Feather , Ionicons } from '@expo/vector-icons';
import useAuthStore from '~/store/authStore';
import ReservationStore from '~/store/reservationStore';
import { useEffect } from 'react';

export default function PlayerProfile() {


  const {user} = useAuthStore()
  const {getUserReservations , userReservations} = ReservationStore()


  useEffect(()=>{

    getUserReservations(user?._id as string)

  },[user?._id])

  const playerStats = {
    matchesPlayed: 45,
    goalsScored: 28,
    assists: 15,
    trophies: 3,
  };

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B']}
      className="flex-1"
    >
      <ScrollView className="flex-1">

        <View className="items-center pt-16 pb-8">
         
            <Image
            source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${user?.profilePic}` || "https://via.placeholder.com/150" }}
            className="w-36 h-36 rounded-full "
            />
          <Text className="text-3xl font-bold text-white mb-1">{user?.userName}</Text>
          <Text className="text-[#94A3B8] text-lg">{user?.email}</Text>
          <View className="flex-row items-center mt-2">
            <Ionicons name="location" size={16} color="#64748B" />
            <Text className="text-[#64748B] ml-1">{user?.location}</Text>
          </View>
        </View>


        <View className="bg-[#1E293B]/80 mx-6 p-6 rounded-2xl border-2 border-[#334155]">
          <Text className="text-2xl font-bold text-white mb-4">Player Stats</Text>
          <View className="flex-row justify-between">
            <StatItem icon="soccer-ball" value={playerStats.matchesPlayed} label="Matches" />
            <StatItem icon="goal-net" value={playerStats.goalsScored} label="Goals" />
            <StatItem icon="assist" value={playerStats.assists} label="Assists" />
            <StatItem icon="trophy" value={playerStats.trophies} label="Trophies" />
          </View>
        </View>


        <View className="mx-6 mt-6">
          <Text className="text-2xl font-bold text-white mb-4">About Me</Text>
          <Text className="text-[#94A3B8] leading-6">
            Passionate striker with a knack for scoring goals. I thrive under pressure and love being part of a team. When I'm not on the field, I enjoy analyzing football strategies and mentoring young players.
          </Text>
        </View>


        <View className="mx-6 mt-6">
          <Text className="text-2xl font-bold text-white mb-4">Skills</Text>
          <View className="flex-row flex-wrap">
            {['Speed', 'Dribbling', 'Finishing', 'Teamwork', 'Leadership'].map((skill, index) => (
              <View
                key={index}
                className="bg-[#2DD4BF]/10 px-4 py-2 rounded-full mr-2 mb-2"
              >
                <Text className="text-[#2DD4BF] text-sm">{skill}</Text>
              </View>
            ))}
          </View>
        </View>


    

        <View className="px-6 mt-12">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-bold">My Bookings</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-[#2DD4BF] mr-2">Calendar</Text>
              <Feather name="calendar" size={16} color="#2DD4BF" />
            </TouchableOpacity>
          </View>
          
          {userReservations?.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
              {userReservations?.map((Reservations) => (
                <View className="bg-[#1E293B] rounded-2xl p-4 border border-[#334155]">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center">
                    <MaterialIcons name="sports-soccer" size={20} color="#2DD4BF" />
                    <Text className="text-white ml-2 font-semibold">Tomorrow's Booking</Text>
                  </View>
                  <Text className="text-[#94A3B8] text-xs">2:00 PM - 4:00 PM</Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-white font-bold mb-1">City Arena - Pitch 3</Text>
                    <Text className="text-[#94A3B8] text-xs">5v5 Artificial Turf</Text>
                  </View>
                  <TouchableOpacity className="bg-[#2DD4BF] px-4 py-2 rounded-lg">
                    <Text className="text-[#0F172A] font-bold">Manage</Text>
                  </TouchableOpacity>
                </View>
              </View>
              ))}
            </ScrollView>
          ) : (
            <Text className="text-[#A1A1AA] text-lg">No Reservations found .</Text>
          )}
        </View>


      </ScrollView>
    </LinearGradient>
  );
}


function StatItem({ icon, value, label }: any) {
  return (
    <View className="items-center">
      <FontAwesome5 name={icon} size={24} color="#2DD4BF" />
      <Text className="text-white text-2xl font-bold mt-2">{value}</Text>
      <Text className="text-[#64748B] text-sm">{label}</Text>
    </View>
  );
}
