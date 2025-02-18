import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5, AntDesign, Ionicons } from '@expo/vector-icons';

export default function PlayerProfile() {

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
              source={require('~/assets/avatar.png')}
              className="w-36 h-36 rounded-full "
            />
          <Text className="text-3xl font-bold text-white mb-1">John Doe</Text>
          <Text className="text-[#94A3B8] text-lg">Striker | Team KoraTime</Text>
          <View className="flex-row items-center mt-2">
            <Ionicons name="location" size={16} color="#64748B" />
            <Text className="text-[#64748B] ml-1">New York, USA</Text>
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


        <View className="mx-6 mt-6 mb-8">
          <Text className="text-2xl font-bold text-white mb-4">Recent Matches</Text>
          <View className="space-y-4">
            <MatchItem result="W" score="3-1" opponent="FC Titans" date="Oct 10, 2023" />
            <MatchItem result="D" score="2-2" opponent="United Strikers" date="Oct 5, 2023" />
            <MatchItem result="L" score="1-2" opponent="City Warriors" date="Oct 1, 2023" />
          </View>
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


function MatchItem({ result, score, opponent, date }:any) {
  const resultColor = result === 'W' ? '#2DD4BF' : result === 'D' ? '#FBBF24' : '#EF4444';

  return (
    <View className="flex-row justify-between items-center bg-[#1E293B]/80 p-4 rounded-2xl border-2 border-[#334155]">
      <View className="flex-row items-center">
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-4"
          style={{ backgroundColor: resultColor + '20' }}
        >
          <Text className="text-lg font-bold" style={{ color: resultColor }}>
            {result}
          </Text>
        </View>
        <View>
          <Text className="text-white text-lg">{opponent}</Text>
          <Text className="text-[#64748B] text-sm">{date}</Text>
        </View>
      </View>
      <Text className="text-white text-lg font-bold">{score}</Text>
    </View>
  );
}