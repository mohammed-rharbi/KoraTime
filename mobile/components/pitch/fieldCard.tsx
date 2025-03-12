import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { FieldType } from "~/types/types";
import { useRouter } from "expo-router";

interface FieldCardProps {
  item: FieldType 
}

const FieldCard: FC<FieldCardProps> = ({ item }) => {

  const router = useRouter()

  return (
    <TouchableOpacity onPress={()=> router.push(`/fieldPage?id=${item._id}`)} className="mb-4">
      <View className="rounded-3xl overflow-hidden bg-[#1A1F2E] shadow-lg w-44">

        <View className="relative">
        <Image source={{ uri: item.photo }} resizeMode="contain" className="w-full h-48 rounded-t-xl" />
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} className="absolute bottom-0 left-0 right-0 h-24" />
          <View className="absolute top-3 right-3 bg-black/30 rounded-full p-2">
            <Ionicons name="heart-outline" size={20} color="#fff" />
          </View>
        </View>


        <View className="p-4">
          <Text className="text-white text-lg font-bold" numberOfLines={1}>{item.name}</Text>
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="location-on" size={16} color="#2DD4BF" />
            <Text className="text-[#A1A1AA] text-xs ml-1">{item.location}</Text>
          </View>


          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text className="text-white text-sm ml-1 font-semibold">{item.ratings?.rating}</Text>
            </View>
            <TouchableOpacity className="bg-[#2DD4BF] px-3 py-1 rounded-full">
              <Text className="text-black text-xs font-semibold">Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FieldCard;
