import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { MaterialIcons, FontAwesome5, Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { pitches } from '~/lib/mocks/mocks';

export default function HomePage() {

  const router = useRouter()

  return (
    <View className="flex-1 bg-[#0F172A]">

      <View className="flex-row justify-between items-center p-6 bg-[#1E293B]">
        <View>
          <Text className="text-[#94A3B8] text-lg">Welcome back,</Text>
          <Text className="text-white text-2xl font-bold">Ahmed Player!</Text>
        </View>
        <TouchableOpacity onPress={()=> router.push('/profile')}>
          <Image
            source={require('~/assets/avatar.png')}
            className="w-20 h-20 rounded-full  border-[#2DD4BF]"
          />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">

        <View className="flex-row justify-between p-6">
          <TouchableOpacity onPress={()=> router.push('/createTeam')} className="bg-[#2DD4BF] p-4 rounded-2xl w-[48%] items-center shadow-lg shadow-[#2DD4BF]/20">
            <MaterialIcons name="stadium" size={32} color="#0F172A" />
            <Text className="text-[#0F172A] font-bold mt-2">Book Pitch</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-[#334155] p-4 rounded-2xl w-[48%] items-center">
            <FontAwesome5 name="users" size={28} color="#2DD4BF" />
            <Text className="text-white font-bold mt-2">Create Team</Text>
          </TouchableOpacity>
        </View>


        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-bold">Upcoming</Text>
            <TouchableOpacity>
              <Text className="text-[#2DD4BF]">See All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="bg-[#1E293B] rounded-2xl p-4 border border-[#334155]">
            <View className="flex-row items-center mb-3">
              <MaterialIcons name="sports-soccer" size={24} color="#84CC16" />
              <Text className="text-white ml-2 font-semibold">Next Match</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="items-center">
                 <Image source={{ uri: "https://i.pinimg.com/736x/4b/b6/1f/4bb61fc4179e883a82a8b677c718ab68.jpg" }}className="w-16 h-16 mb-2 rounded-full border-4 border-[#2DD4BF]" />
                <Text className="text-white font-bold">FC Warriors</Text>
                <Text className="text-[#94A3B8] text-xs">Your Team</Text>
              </View>
              <View className="items-center">
                <Text className="text-[#FF6B6B] font-bold text-xl">VS</Text>
                <Text className="text-[#94A3B8] text-xs">Tomorrow 8 PM</Text>
              </View>
              <View className="items-center">
              <Image source={{ uri: "https://i.pinimg.com/736x/4b/b6/1f/4bb61fc4179e883a82a8b677c718ab68.jpg" }}className="w-16 h-16 mb-2 rounded-full border-4 border-[#2DD4BF]" />
              <Text className="text-white font-bold">Red Devils</Text>
                <Text className="text-[#94A3B8] text-xs">Opponent</Text>
              </View>
            </View>
          </View>
        </View>


        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-bold">Nearby Pitches</Text>
            <TouchableOpacity>
              <Text className="text-[#2DD4BF]">View Map</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {pitches.map((pitch) => (
              <TouchableOpacity key={pitch.id} className="bg-[#1E293B] mr-4 rounded-2xl w-64 p-4 border border-[#334155]">
                <Image
                  source={{ uri: pitch.image }}
                  className="w-full h-32 rounded-xl mb-3"
                />
                <Text className="text-white font-semibold mb-1">{pitch.name}</Text>
                <View className="flex-row items-center">
                  <Feather name="star" size={16} color="#FACC15" />
                  <Text className="text-[#FACC15] ml-2">{pitch.rate}</Text>
                  <Text className="text-[#94A3B8] ml-4">{pitch.des}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>


      </ScrollView>

    </View>
  );
}