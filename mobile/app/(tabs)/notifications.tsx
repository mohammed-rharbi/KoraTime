import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import useFriendshipStore from "~/store/frienshipStore";
import { useEffect, useState } from "react";
import useAuthStore from "~/store/authStore";
import useTeamStore from "~/store/teamStore";


export default function NotificationsScreen() {

  const { getFriendRequests, acceptFriendRequest, declineRequest, requests } = useFriendshipStore();
  const { getUserRequests, teamRequests, accept , decline } = useTeamStore();
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<any[]>([]);


  useEffect(() => {
    if (user?._id) {
      getFriendRequests(user._id);
      getUserRequests(user._id);
    }
  }, [user?._id]);


  useEffect(() => {
    const formattedFriendRequests = requests?.map((request) => ({
      id: request._id,
      type: "friend",
      title: request.sender?.userName ,
      description: "Sent you a friend request",
      time: request.createdAt,
      read: false,
      avatar: request.sender?.profilePic || "https://i.pinimg.com/736x/55/68/8d/55688d668f9eb3c7e4c6f2eb96e85283.jpg",
    })) || [];

    const formattedTeamRequests = teamRequests?.map((request) => ({
      id: request._id,
      type: "team",
      title: request.team.name || "Unknown Team",
      description: `Invited you to join ${request.team.name}`,
      time: request.createdAt,
      read: false,
      avatar: request.team.logo || "https://via.placeholder.com/150",
    })) || [];

    setNotifications([...formattedFriendRequests, ...formattedTeamRequests]);
  }, [requests, teamRequests]);

  const handleAcceptFriend = async (id: string) => {
    await acceptFriendRequest(id);
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleDeclineFriend = async (id: string) => {
    await declineRequest(id);
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleAcceptTeam = async (id: string) => {
    await accept(id);
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleDeclineTeam = async (id: string) => {
    await decline(id);
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <View className="flex-1 bg-[#0A0F1E]">
      <ScrollView className="flex-1">
        <LinearGradient colors={["#2DD4BF", "#0A0F1E"]} className="p-6">
          <Text className="text-white text-3xl font-bold">Notifications</Text>
        </LinearGradient>

        <View className="p-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                className={`flex-row items-center p-4 mb-4 rounded-xl ${
                  notification.read ? "bg-[#1F2937]" : "bg-[#2A3748]"
                }`}
                activeOpacity={0.9}
              >
                <Image 
                  source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${notification.avatar}`}}
                  className="w-12 h-12 rounded-full mr-4" />

                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-white text-lg font-semibold">{notification.title}</Text>
                    {!notification.read && <View className="w-2 h-2 bg-[#2DD4BF] rounded-full ml-2" />}
                  </View>
                  <Text className="text-[#A1A1AA] text-sm mt-1">{notification.description}</Text>
                  <Text className="text-[#A1A1AA] text-xs mt-2">{notification.time}</Text>
                </View>

                {notification.type === "friend" && (
                  <View className="flex-row items-center ml-4">
                    <TouchableOpacity
                      className="bg-[#2DD4BF] px-4 py-2 rounded-lg mr-2"
                      onPress={() => handleAcceptFriend(notification.id)}
                    >
                      <Text className="text-black text-sm font-bold">Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-[#374151] px-4 py-2 rounded-lg"
                      onPress={() => handleDeclineFriend(notification.id)}
                    >
                      <Text className="text-white text-sm font-bold">Decline</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {notification.type === "team" && (
                  <View className="flex-row items-center ml-4">
                    <TouchableOpacity
                      className="bg-[#2DD4BF] px-4 py-2 rounded-lg mr-2"
                      onPress={() => handleAcceptTeam(notification.id)}
                    >
                      <Text className="text-black text-sm font-bold">Join</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-[#374151] px-4 py-2 rounded-lg"
                      onPress={() => handleDeclineTeam(notification.id)}
                    >
                      <Text className="text-white text-sm font-bold">Decline</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <View className="flex-1 items-center justify-center mt-16">
              <FontAwesome name="bell-o" size={40} color="#A1A1AA" />
              <Text className="text-[#A1A1AA] text-lg mt-4">No notifications</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
