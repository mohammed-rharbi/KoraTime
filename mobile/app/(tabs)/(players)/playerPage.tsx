import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5, Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import usePlayerStore from '~/store/playersStore';
import { useEffect , useState } from 'react';
import * as Location from 'expo-location';


const PlayerProfile = () => {

      const { id } = useLocalSearchParams();

      const { player , getPlayer } = usePlayerStore()
      const [locationName, setLocationName] = useState('');

      const fetchLocationName = async () => {
        if (player?.location) {
          const [latitude, longitude] = player.location.split(',');
          try {
            let reverseGeocode = await Location.reverseGeocodeAsync({
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            });
  
            if (reverseGeocode.length > 0) {
              setLocationName(
                `${reverseGeocode[0].city}, ${reverseGeocode[0].country}`
              );
            }
          } catch (error) {
            console.error('Error fetching location:', error);
            setLocationName('Unknown location');
          }
        }
      };
  
      useEffect(()=>{

        if(id) getPlayer(id as string)
          fetchLocationName()

      },[id , getPlayer])


  const router = useRouter();

  return (
    <View className="flex-1 bg-[#0F172A]">
      <ScrollView>

        <LinearGradient
          colors={['#2DD4BF', '#0F172A']}
          className="pt-12 pb-8 px-6"
        >
          <TouchableOpacity 
            onPress={() => router.back()}
            className="absolute top-12 left-6 z-10"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View className="items-center mt-8">
            <Image
              source={{ uri: player?.profilePic || 'https://i.pinimg.com/736x/70/8c/08/708c08614099f90b849c6f7089f8effb.jpg' }}
              className="w-32 h-32 rounded-full border-4 border-white mb-4"
            />
            <View className="flex-row items-center">
              <Text className="text-white text-2xl font-bold mr-2">{player?.userName}</Text>
              <View className="flex-row items-center bg-[#334155] px-2 py-1 rounded-full">
                <Text className="text-[#2DD4BF] text-xs">{player?.role || 'Player'}</Text>
              </View>
            </View>
            <View className="flex-row items-center mt-2">
              <Ionicons name="location-outline" size={16} color="#94A3B8" />
              <Text className="text-[#94A3B8] ml-1">{locationName  || 'No location set'}</Text>
            </View>
          </View>
        </LinearGradient>


        <View className="px-6 my-4">
          <View className="bg-[#1E293B] p-4 rounded-2xl border border-[#334155]">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons 
                  name="radio-button-on" 
                  size={16} 
                  color={player?.isActive ? '#10B981' : '#EF4444'} 
                />
                <Text className="text-white ml-2">
                  {player?.isActive ? 'Currently Active' : 'Not Active'}
                </Text>
              </View>
              <Text className="text-[#94A3B8] text-sm">{player?.status || 'No status set'}</Text>
            </View>
          </View>
        </View>


        <View className="px-6 mb-6">
          <Text className="text-white text-xl font-bold mb-4">
            <MaterialIcons name="contact-page" size={24} color="#2DD4BF" /> Contact Info
          </Text>
          <View className="bg-[#1E293B] p-4 rounded-2xl">
            <InfoRow icon="email" value={player?.email} />
            <InfoRow icon="phone" value={player?.phoneNumber} />
          </View>
        </View>

        {player?.hasTeam && (
          <View className="px-6 mb-6">
            <Text className="text-white text-xl font-bold mb-4">
              <FontAwesome5 name="users" size={20} color="#2DD4BF" /> Team
            </Text>
            <TouchableOpacity 
              className="bg-[#1E293B] p-4 rounded-2xl flex-row items-center border border-[#334155]"
            //   onPress={() => router.push(`/team/${user.team?._id}`)}
            >
              <Image
                source={{ uri: player?.team?.logo || 'https://i.pinimg.com/736x/4b/b6/1f/4bb61fc4179e883a82a8b677c718ab68.jpg' }}
                className="w-12 h-12 rounded-full mr-4"
              />
              <View>
                <Text className="text-white font-bold">{player?.team?.name || 'Team Name'}</Text>
                <Text className="text-[#94A3B8] text-sm">{player?.team?.sportType || 'Football'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}


        <View className="flex-row justify-between px-6 mb-8">
          <TouchableOpacity className="bg-[#2DD4BF] px-6 py-3 rounded-xl flex-1 mr-2 items-center">
            <Text className="text-[#0F172A] font-bold">Message</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#334155] px-6 py-3 rounded-xl flex-1 ml-2 items-center">
            <Text className="text-white font-bold">Invite</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};


const InfoRow = ({ icon, value }: { icon: string; value?: string }) => (
  value ? (
    <View className="flex-row items-center py-2">
      <MaterialIcons name={icon} size={20} color="#2DD4BF" />
      <Text className="text-[#94A3B8] ml-3">{value}</Text>
    </View>
  ) : null
);

export default PlayerProfile;