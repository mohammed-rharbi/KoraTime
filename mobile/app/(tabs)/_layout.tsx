import { Tabs } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        
        tabBarStyle: {
          backgroundColor: "#1E293B",
          borderTopWidth: 1,
          borderTopColor: "#334155",
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <MaterialIcons name="home" size={28} color={focused ? "#2DD4BF" : "#64748B"} />
              <Text className={`text-xs mt-1 ${focused ? "text-[#2DD4BF]" : "text-[#64748B]"}`}>Home</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(pitch)/fields"
        options={{
          title: "Fields",
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <MaterialIcons name="stadium" size={28} color={focused ? "#2DD4BF" : "#64748B"} />
              <Text className={`text-xs mt-1 ${focused ? "text-[#2DD4BF]" : "text-[#64748B]"}`}>Fields</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(team)/teams"
        options={{
          title: "Teams",
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <Ionicons name="shirt-outline" size={28} color={focused ? "#2DD4BF" : "#64748B"} />
              <Text className={`text-xs mt-1 ${focused ? "text-[#2DD4BF]" : "text-[#64748B]"}`}>Team</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(chat)/chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <Feather name="message-circle" size={28} color={focused ? "#2DD4BF" : "#64748B"} />
              <Text className={`text-xs mt-1 ${focused ? "text-[#2DD4BF]" : "text-[#64748B]"}`}>Chat</Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Player",
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <Feather name="user" size={28} color={focused ? "#2DD4BF" : "#64748B"} />
              <Text className={`text-xs mt-1 ${focused ? "text-[#2DD4BF]" : "text-[#64748B]"}`}>Chat</Text>
            </View>
          ),
        }}
      />

  {/* <Tabs.Screen name="(team)/createTeam" options={{ href: null }} /> */}

    </Tabs>


    
  );
}
