import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useRef } from 'react';

const { width } = Dimensions.get('window');
const PITCH_WIDTH = width * 0.9;
const PITCH_HEIGHT = PITCH_WIDTH * 0.8;

const initialFormation = {  
  formation: "2-1-2",
  players: [
    { id: '1', name: 'Alex', position: 'GK', x: 50, y: 10, number: 1, stats: { goals: 0, assists: 2 } },
    { id: '2', name: 'Sam', position: 'DEF', x: 35, y: 40, number: 4, stats: { goals: 1, assists: 3 } },
    { id: '3', name: 'Jordan', position: 'MID', x: 50, y: 50, number: 6, stats: { goals: 5, assists: 8 } },
    { id: '4', name: 'Taylor', position: 'DEF', x: 65, y: 40, number: 5, stats: { goals: 2, assists: 4 } },
    { id: '5', name: 'Riley', position: 'ATT', x: 50, y: 80, number: 9, stats: { goals: 12, assists: 6 } },
  ]
};

export default function TeamScreen() {
  const [formation, setFormation] = useState(initialFormation);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animateSelection = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  return (
    <LinearGradient colors={['#0F172A', '#1E293B']} className="flex-1">
      <SafeAreaView className="flex-1 p-4">
        {/* Enhanced Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center">
            <View className="bg-[#2DD4BF] w-12 h-12 rounded-xl items-center justify-center mr-3">
              <FontAwesome5 name="futbol" size={20} color="white" />
            </View>
            <View>
              <Text className="text-2xl font-bold text-white tracking-tight">STREET KINGS FC</Text>
              <Text className="text-[#7AD6C4] text-sm font-medium">MINI FOOTBALL CLUB</Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-[#94A3B8] text-xs font-medium">CURRENT FORMATION</Text>
            <Text className="text-[#2DD4BF] text-2xl font-bold tracking-wide">{formation.formation}</Text>
          </View>
        </View>

        {/* Modern Football Pitch */}
        <View className="items-center mb-8">
          <LinearGradient 
            colors={['#1B2A3F', '#22334A']}
            className="rounded-2xl relative overflow-hidden"
            style={{ width: PITCH_WIDTH, height: PITCH_HEIGHT }}
          >
            {/* Pitch Pattern */}
            <View className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'linear-gradient(45deg, #2DD4BF 25%, transparent 25%, transparent 75%, #2DD4BF 75%), linear-gradient(45deg, #2DD4BF 25%, transparent 25%, transparent 75%, #2DD4BF 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px'
            }}/>
            
            {/* Pitch Markings */}
            <View className="absolute inset-0 border-2 border-[#2DD4BF]/10 rounded-2xl" />
            <View className="absolute w-4/5 h-3/4 border-2 border-[#2DD4BF]/10 rounded-xl self-center mt-4" />
            <View className="absolute w-1/3 h-1/2 border-2 border-[#2DD4BF]/10 rounded-full self-center mt-8" />
            
            {/* Players with Floating Effect */}
            {formation.players.map(player => (
              <TouchableOpacity
                key={player.id}
                className="absolute items-center"
                style={{
                  left: `${player.x}%`,
                  top: `${player.y}%`,
                  transform: [{ translateX: -20 }, { translateY: -20 }]
                }}
                onPress={() => {
                  setSelectedPlayer(player);
                  animateSelection();
                }}
              >
                <Animated.View 
                  className="w-10 h-10 rounded-full items-center justify-center border-2 border-white/20 shadow-xl"
                  style={{ 
                    backgroundColor: selectedPlayer?.id === player.id ? '#2DD4BF' : '#0D9488',
                    shadowColor: '#2DD4BF',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: selectedPlayer?.id === player.id ? 0.4 : 0.2,
                    shadowRadius: 6,
                    transform: [{ scale: selectedPlayer?.id === player.id ? 1.1 : 1 }]
                  }}
                >
                  <Text className="text-white font-bold text-sm">{player.number}</Text>
                </Animated.View>
                <Text className="text-[#E2E8F0] text-[10px] mt-1 font-bold tracking-wide">
                  {player.position}
                </Text>
              </TouchableOpacity>
            ))}
          </LinearGradient>
        </View>

        {/* Formation Selector Carousel */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="mb-6"
          contentContainerStyle={{ paddingHorizontal: 8 }}
        >
          {['2-1-2', '1-2-1', '3-1', '2-2'].map(form => (
            <TouchableOpacity
              key={form}
              className={`mx-2 p-3 rounded-2xl ${formation.formation === form ? 'bg-[#2DD4BF]' : 'bg-[#1E293B]'}`}
              style={{
                minWidth: 80,
                shadowColor: '#2DD4BF',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: formation.formation === form ? 0.4 : 0,
                shadowRadius: 4,
              }}
              onPress={() => setFormation({ ...formation, formation: form })}
            >
              <Text className={`text-center font-bold ${formation.formation === form ? 'text-white' : 'text-[#94A3B8]'}`}>
                {form}
              </Text>
              <Text className="text-center text-xs mt-1 text-white/50">FORMATION</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Animated Player Stats Card */}
        <Animated.View 
          className="bg-[#1E293B] p-4 rounded-2xl mb-4 border border-[#2DD4BF]/20"
          style={{ opacity: fadeAnim }}
        >
          {selectedPlayer && (
            <>
              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="text-white text-lg font-bold tracking-wide">{selectedPlayer.name}</Text>
                  <Text className="text-[#2DD4BF] text-sm">#{selectedPlayer.number} | {selectedPlayer.position}</Text>
                </View>
                <View className="bg-[#2DD4BF]/20 p-2 rounded-lg">
                  <FontAwesome5 name="tshirt" size={20} color="#2DD4BF" />
                </View>
              </View>
              <View className="flex-row justify-between">
                <StatItem title="Goals" value={selectedPlayer.stats.goals} icon="soccer-ball" />
                <StatItem title="Assists" value={selectedPlayer.stats.assists} icon="shoe-prints" />
                <StatItem title="Passes" value="89%" icon="passport" />
                <StatItem title="Rating" value="8.5" icon="star" />
              </View>
            </>
          )}
        </Animated.View>

        {/* Enhanced Squad List */}
        <FlatList
          data={formation.players}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              className="bg-[#1E293B] p-4 rounded-xl mb-3 mx-1"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
              onPress={() => setSelectedPlayer(item)}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <LinearGradient
                    colors={['#2DD4BF', '#0D9488']}
                    className="w-10 h-10 rounded-xl items-center justify-center mr-4"
                  >
                    <Text className="text-white font-bold">{item.number}</Text>
                  </LinearGradient>
                  <View>
                    <Text className="text-white font-semibold text-base">{item.name}</Text>
                    <Text className="text-[#94A3B8] text-sm">{item.position}</Text>
                  </View>
                </View>
                <View className="flex-row items-center space-x-2">
                  <View className="bg-[#2DD4BF]/20 px-3 py-1 rounded-full">
                    <Text className="text-[#2DD4BF] text-sm font-medium">{item.stats.goals}G {item.stats.assists}A</Text>
                  </View>
                  <MaterialIcons name="arrow-forward-ios" size={16} color="#94A3B8" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Enhanced Add Player Button */}
        <TouchableOpacity 
          className="absolute bottom-6 right-6 bg-[#2DD4BF] w-16 h-16 rounded-2xl items-center justify-center shadow-2xl"
          style={{
            shadowColor: '#2DD4BF',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
          }}
          onPress={() => console.log('Add player')}
        >
          <MaterialIcons name="person-add" size={28} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const StatItem = ({ title, value, icon }) => (
  <View className="items-center">
    <View className="bg-[#2DD4BF]/20 w-12 h-12 rounded-xl items-center justify-center mb-2">
      <FontAwesome5 name={icon} size={18} color="#2DD4BF" />
    </View>
    <Text className="text-white font-bold text-lg">{value}</Text>
    <Text className="text-[#94A3B8] text-xs mt-1">{title}</Text>
  </View>
);