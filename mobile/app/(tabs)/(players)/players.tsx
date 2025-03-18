import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import usePlayerStore from '~/store/playersStore';
import useAuthStore from '~/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PlayerCard from '~/components/player/playerCard';

export default function PlayersScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { players, getAllPlayers } = usePlayerStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');



  const filteredPlayers = players?.filter(player => player._id !== user?._id);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      await getAllPlayers();
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load players');
      setIsLoading(false);
    }
  };
  


  if (isLoading) {
    return (
      <LinearGradient
        colors={['#0A0F1E', '#0F172A']}
        className="flex-1 items-center justify-center"
      >
        <ActivityIndicator size="large" color="#2DD4BF" />
      </LinearGradient>
    );
  }

  if (error) {
    
    return (
      <LinearGradient
        colors={['#0A0F1E', '#0F172A']}
        className="flex-1 items-center justify-center"
      >
        <Text className="text-red-500 text-lg mb-4">{error}</Text>
        <TouchableOpacity 
          onPress={loadPlayers}
          className="bg-[#2DD4BF] px-6 py-3 rounded-full flex-row items-center"
        >
          <Ionicons name="refresh" size={20} color="black" />
          <Text className="text-black font-medium ml-2">Try Again</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#0A0F1E', '#0F172A']}
      className="flex-1 p-4 pt-16"
    >

      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-white text-3xl font-bold">Discover</Text>
        <Link href="/userFriends" asChild>
          <TouchableOpacity className="flex-row items-center bg-[#1A1F2E] px-4 py-2 rounded-full border border-[#2DD4BF]/30">
            <Ionicons name="people" size={20} color="#2DD4BF" />
            <Text className="text-[#2DD4BF] ml-2 font-medium">My Friends</Text>
          </TouchableOpacity>
        </Link>
      </View>


      <TouchableOpacity 
        className="bg-[#1A1F2E] p-3 rounded-xl mb-6 flex-row items-center"
        onPress={() => console.log('Implement search')}
      >
        <Ionicons name="search" size={20} color="#64748B" />
        <Text className="text-gray-500 ml-2">Search players...</Text>
      </TouchableOpacity>


      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <PlayerCard player={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center mt-12">
            <Ionicons name="people-outline" size={64} color="#334155" />
            <Text className="text-gray-500 text-lg mt-4">No players found</Text>
            <Text className="text-gray-500 text-center mt-2">
              Be the first to join the community!
            </Text>
          </View>
        }
      />
    </LinearGradient>
  );
}