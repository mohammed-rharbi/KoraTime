import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { MaterialIcons, FontAwesome5, Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import NeirPitches from '~/components/pitch/nearPitches';
import useAuthStore from '~/store/authStore';
import { useEffect , useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import usePlayerStore from '~/store/playersStore';
import useFieldStore from '~/store/fieldStore';
import useFriendshipStore from '~/store/frienshipStore';

export default function HomePage() {


  const router = useRouter()
  const [requestStatus, setRequestStatus] = useState<{ [key: string]: boolean }>({});
    
  const {user , logout} = useAuthStore()
  const { players , getAllPlayers } = usePlayerStore()
  const {fields , getFields} = useFieldStore()


  const {sendFriendRequest} = useFriendshipStore()

  
  const filteredPlayers = players?.filter(player => player._id !== user?._id).splice(0 , 5);


  useEffect(()=>{

    getAllPlayers()

  },[getAllPlayers])

  const handleLogout = async () => {

     logout()
    router.push('/')        
  };

  const handleSendFriendRequest = async (receiverId:string) => {

    await sendFriendRequest( user?._id as string , receiverId)
    setRequestStatus((prev) => ({ ...prev, [receiverId]: true }));

  }

  return (
    
    <View className="flex-1 bg-[#0F172A] pt-6">

      
      <View className="flex-row justify-between items-center p-4">
        

        <TouchableOpacity onPress={()=> router.push('/notifications')}>
          <MaterialIcons name="notifications" size={32} color="white" />
        </TouchableOpacity> 

        <View>
          <Text className="text-[#94A3B8] text-lg">Welcome back,</Text>
          <Text className="text-white text-2xl font-bold">{user?.userName || 'user'}</Text>
        </View>
        <View className="flex-row items-center gap-3">
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="logout" size={32} color="red" />
        </TouchableOpacity> 
        </View>
      </View>

      <ScrollView className="flex-1">

        <View className="flex-row justify-between p-6">
          <TouchableOpacity onPress={()=> router.push('/fields')} className="bg-[#2DD4BF] p-4 rounded-2xl w-[48%] items-center shadow-lg shadow-[#2DD4BF]/20">
            <MaterialIcons name="stadium" size={32} color="#0F172A" />
            <Text className="text-[#0F172A] font-bold mt-2">Book Pitch</Text>
          </TouchableOpacity>
          
          {
            user?.hasTeam ? (

            <TouchableOpacity onPress={()=> router.push('/homeTeam')} className="bg-[#338155] p-4 rounded-2xl w-[48%] items-center">
            <FontAwesome5 name="users" size={28} color="#2DD4BF" />
            <Text className="text-white font-bold mt-2">Manage My Team</Text>
            </TouchableOpacity>

            ):(

            <TouchableOpacity onPress={()=> router.push('/createTeam')} className="bg-[#334155] p-4 rounded-2xl w-[48%] items-center">
            <FontAwesome5 name="users" size={28} color="#2DD4BF" />
            <Text className="text-white font-bold mt-2">Create Team</Text>
            </TouchableOpacity>

            )
          }
        </View>

          <View className="px-6 mb-6">
            <View className="bg-[#1E293B] rounded-2xl p-4 border-2 border-[#334155] relative overflow-hidden">

              <View className="absolute -top-20 -right-20 w-40 h-40 bg-[#84CC16]/10 rounded-full blur-xl" />
              <View className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#2DD4BF]/10 rounded-full blur-xl" />


              <View className="flex-row flex-wrap justify-between">

                <TouchableOpacity 
                  onPress={() => router.push('/players')}
                  className="w-[48%] mb-4 active:opacity-80"
                >
                  <LinearGradient
                    colors={['#0F172A', '#1E293B']}
                    className="p-4 rounded-xl border-2 border-[#84CC16]/20 items-center relative overflow-hidden"
                  >
                    <View className="absolute w-full h-full bg-[#84CC16]/5" />
                    <MaterialIcons name="people" size={28} color="#84CC16" style={{ textShadowColor: '#84CC16', textShadowRadius: 10 }} />
                    <Text className="text-white font-bold mt-2 text-lg tracking-tight">Players</Text>
                    <Text className="text-[#94A3B8] text-xs mt-1">Manage Squad</Text>
                    <View className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#84CC16]/10 rounded-full" />
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => router.push('/userFriends')}
                  className="w-[48%] mb-4 active:opacity-80"
                >
                  <View className="p-4 rounded-xl bg-[#0F172A] border-2 border-[#2DD4BF]/20 items-center relative overflow-hidden">
                    <MaterialIcons name="person-add" size={28} color="#2DD4BF" style={{ textShadowColor: '#2DD4BF', textShadowRadius: 10 }} />
                    <Text className="text-white font-bold mt-2 text-lg tracking-tight">Friends</Text>
                    <Text className="text-[#94A3B8] text-xs mt-1">Connect & Play</Text>
                    <View className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent" />
                  </View>
                </TouchableOpacity>

    
            </View>
            </View>
          </View>

        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-bold">Nearby Pitches</Text>
            <TouchableOpacity onPress={()=> router.push('/fields')}>
              <Text className="text-[#2DD4BF]">See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {fields?.map((pitch) => (

              <NeirPitches pitch={pitch} />
          
            ))}
          </ScrollView>

            
        <View className="mt-10">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-bold">Find Players</Text>
            <TouchableOpacity onPress={()=> router.push('/players')}>
              <Text className="text-[#2DD4BF]">See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-4">
            {filteredPlayers?.map((item) => (
              <TouchableOpacity 
                key={item._id}
                className="bg-[#1E293B] rounded-2xl py-4 w-40 mr-4 border border-[#334155] items-center"
                onPress={()=> router.push(`/playerPage?id=${item._id}`)}
              >
                <Image 
                  source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${item.profilePic}` || "https://randomuser.me/api/portraits/men/75.jpg"}}
                  className="w-16 h-16 rounded-full mb-3 border-2 border-[#2DD4BF]"/>
       
                <Text className="text-white font-bold mb-1">{item.userName}</Text>
                <Text className="text-[#94A3B8] text-sm mb-2">Striker | Intermediate</Text>
                <View className="flex-row items-center">
                  <MaterialIcons name="location-on" size={14} color="#94A3B8" />
                  <Text className="text-[#94A3B8] text-xs ml-1">3km away</Text>
                </View>

                <TouchableOpacity
                  onPress={() => handleSendFriendRequest(item._id as string)}
                  className={`mt-6 px-6 py-2 rounded-xl flex-1 ml-2 items-center ${
                    requestStatus[item._id as string ] ? "bg-gray-400" : "bg-[#2DD4BF]"
                  }`}
                  disabled={requestStatus[item._id as string]} 
                >
                  <Text className="text-[#0F172A] font-bold">
                    {requestStatus[item._id as string] ? "Pending..." : "Invite"}
                  </Text>
                </TouchableOpacity>


              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>


        <View className="px-2 mt-12">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-bold">My Bookings</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-[#2DD4BF] mr-2">Calendar</Text>
              <Feather name="calendar" size={16} color="#2DD4BF" />
            </TouchableOpacity>
          </View>
          
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
        </View>


        </View>


      </ScrollView>

    </View>
  );
}