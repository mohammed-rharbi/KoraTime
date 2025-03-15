import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";



const CreateTeamButton = () => {

    const createButtonScale = useRef(new Animated.Value(1)).current;
    const router = useRouter();


    return (


    <TouchableOpacity
      onPress={() => {
        router.push("/createTeam");
      }}
      className="mx-4 mb-6"
    >
      <Animated.View style={{ transform: [{ scale: createButtonScale }] }}>
        <LinearGradient
          colors={['#2DD4BF', '#3B82F6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-xl p-4"
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white text-lg font-bold mb-1">Create Your Team</Text>
              <Text className="text-white/80 text-sm">Start your 5-a-side journey</Text>
            </View>
            <View className="bg-white/20 rounded-full p-2">
              <MaterialCommunityIcons name="soccer" size={24} color="#fff" />
            </View>
          </View>
          
          <View className="flex-row mt-4">
            <View className="flex-row -space-x-3">
              <View className="w-6 h-6 rounded-full bg-white/30" />
              <View className="w-6 h-6 rounded-full bg-white/20" />
              <View className="w-6 h-6 rounded-full bg-white/10" />
            </View>
            <View className="bg-white/20 rounded-full px-2 py-1 ml-2">
              <Text className="text-white text-xs">2 spots left</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>


    );
};

export default CreateTeamButton;  
