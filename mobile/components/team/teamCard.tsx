import { TeamType } from "~/types/types";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { Ionicons, FontAwesome5 , MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";




const TeamCard = ({ item }: { item: TeamType }) => {



    const router = useRouter();

    const scaleValue = new Animated.Value(1);
    
    const animatePress = () => {
      Animated.spring(scaleValue, {
        toValue: 0.97,
        useNativeDriver: true,
      }).start();
    };
  
    const animateRelease = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };


  
    return (
      <Animated.View 
        style={{ 
          transform: [{ scale: scaleValue }],
          shadowColor: '#2DD4BF',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
        }}
        className="mx-4 mb-6"
      >
        <TouchableOpacity
          onPressIn={animatePress}
          onPressOut={animateRelease}
          onPress={() => router.push(`/teamPage?id=${item._id}`)}
          activeOpacity={0.9}
          className="rounded-2xl overflow-hidden my-2"

        >
          <LinearGradient
            colors={['#1A1F2E', '#162447', '#252A3F']}
            className="rounded-2xl p-5"
            start={{ x: 0.7, y: 0 }}
            end={{ x: 0, y: 1 }}
          >

            <View className="absolute inset-0 opacity-10">
              <FontAwesome5 name="bezier-curve" size={120} color="#2DD4BF" 
                style={{ position: 'absolute', right: -30, top: -30, transform: [{ rotate: '-30deg' }] }}
              />
            </View>
  
            <View className="flex-row items-center">
              <View className="relative">
                <Image
                  source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${item?.logo}` }}
                  className="w-16 h-16 rounded-xl border-2 border-[#2DD4BF]/50"
                />
              </View>
  
              <View className="flex-1 ml-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-white text-xl font-bold">{item.name}</Text>
                </View>
  
                <View className="flex-row items-center mt-2 space-x-3">
                  <View className="flex-row items-center">
                    <Ionicons name="location" size={14} color="#A1A1AA" />
                    <Text className="text-[#A1A1AA] text-sm ml-1">{item.location}</Text>
                  </View>
  
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons name="account-group" size={16} color="#A1A1AA" />
                    <Text className="text-[#A1A1AA] text-sm ml-1">{item.members?.length}/5</Text>
                  </View>
                </View>
  

                <View className="mt-3">
                  <View className="h-2 bg-[#ffffff10] rounded-full overflow-hidden">
                    <LinearGradient
                      colors={['#2DD4BF', '#4ADE80']}
                      className="h-full"
                    />
                  </View>
                </View>
  

                {item.members && item.members.length > 0 && (
                  <View className="flex-row mt-3 -space-x-2">
                    {item.members.slice(0, 4).map((member, index) => (
                      <Image
                        key={index}
                        source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${member.profilePic}`}}
                        className="w-8 h-8 rounded-full border-2 border-[#1A1F2E]"
                      />
                    ))}
                    {item.members.length > 4 && (
                      <View className="w-8 h-8 rounded-full bg-[#2DD4BF] items-center justify-center border-2 border-[#1A1F2E]">
                        <Text className="text-black text-xs font-bold">+{item?.members?.length - 4}</Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
    
  };


export default TeamCard;