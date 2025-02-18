import { Stack } from 'expo-router';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Landing() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Kora Time' }} />
      <ScrollView className="flex-1 bg-[#0F172A]">
        <View className="min-h-screen p-8">

          <View className="items-center mb-12 mt-8">
            <Image
              source={{ uri: "https://i.pinimg.com/736x/4b/b6/1f/4bb61fc4179e883a82a8b677c718ab68.jpg" }}
              className="w-40 h-40 mb-6 rounded-full border-4 border-[#2DD4BF]"
            />
            <Text className="text-4xl font-bold text-white mb-2">Kora Time</Text>
            <Text className="text-lg text-[#94A3B8]">Where Football Connections Happen</Text>
          </View>


          <View className="flex-row flex-wrap justify-between mb-12">
            {[
              { icon: 'stadium', title: 'Book Pitches', text: 'Reserve top-quality football fields' },
              { icon: 'users', title: 'Build Teams', text: 'Create or join competitive teams' },
              { icon: 'chatbubbles', title: 'Team Chat', text: 'Coordinate with your squad' },
              { icon: 'event-available', title: 'Manage Matches', text: 'Organize your football calendar' },
            ].map((feature, index) => (
              <View key={index} className="w-[48%] bg-[#1E293B] p-4 rounded-2xl mb-4 border border-[#334155]">
                <MaterialIcons 
                  size={32} 
                  color={index === 3 ? "#FF6B6B" : "#2DD4BF"} 
                />
                <Text className="text-white text-lg font-semibold mt-2">{feature.title}</Text>
                <Text className="text-[#94A3B8] text-sm">{feature.text}</Text>
              </View>
            ))}
          </View>

          <View className="bg-[#1E293B] rounded-3xl p-6 mb-8 border border-[#334155]">
            <Text className="text-white text-2xl font-bold mb-4">Ready to Play?</Text>
            <Text className="text-[#94A3B8] mb-6">
              Join thousands of players organizing matches daily. Find your pitch, build your team, and start playing!
            </Text>
            
            <TouchableOpacity 
              onPress={()=> router.push('/auth')}
              className="bg-[#2DD4BF] p-5 rounded-2xl flex-row items-center justify-center mb-4 shadow-lg shadow-[#2DD4BF]/20"
            >
              <FontAwesome5 name="running" size={20} color="#0F172A" />
              <Text className="text-[#0F172A] text-lg font-bold ml-2">Find a Match Now</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={()=> router.push('/home')}
              className="border-2 border-[#2DD4BF] p-5 rounded-2xl flex-row items-center justify-center"
            >
              <MaterialIcons name="group-add" size={24} color="#2DD4BF" />
              <Text className="text-[#2DD4BF] text-lg font-bold ml-2">Create Team</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View className="flex-row justify-around bg-[#1E293B] p-4 rounded-2xl border border-[#334155]">
            {[
              { value: '5K+', label: 'Players' },
              { value: '200+', label: 'Pitches' },
              { value: '1K+', label: 'Matches' },
            ].map((stat, index) => (
              <View key={index} className="items-center">
                <Text className="text-[#2DD4BF] text-2xl font-bold">{stat.value}</Text>
                <Text className="text-white">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View className="bg-[#1E293B] py-6 border-t border-[#334155]">
          <Text className="text-center text-[#64748B] text-xs">
            © 2023 Kora Time. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}