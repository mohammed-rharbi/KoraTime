import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect , useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import useFieldStore from "~/store/fieldStore";
import { Modal } from "react-native";
import { useRouter } from "expo-router";

export default function FieldDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { getOneField, field } = useFieldStore();
  const [showBookingType, setShowBookingType] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (id) getOneField(id as string);
  }, [id]);

  return (
    <View className="flex-1 bg-[#0A0F1E]">
      <ScrollView className="flex-1">

        <View className="relative h-80">
          <Image source={{ uri: field?.photo }} className="w-full h-full" resizeMode="cover" />
          <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} className="absolute bottom-0 left-0 right-0 h-1/2" />

          <View className="absolute bottom-4 left-4 right-4">
            <Text className="text-white text-4xl font-bold mb-1">{field?.name}</Text>
            <View className="flex-row items-center space-x-4">
              <View className="flex-row items-center">
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text className="text-white text-lg ml-1 font-semibold">{field?.ratings?.rating || "N/A"}</Text>
              </View>
              <Text className="text-[#2DD4BF] ml-6 text-lg font-semibold">${field?.price}/hour</Text>
            </View>
          </View>
        </View>


        <View className="p-4 space-y-6">

          <View className="flex-row justify-between items-start">
            <View className="flex-row items-center">
              <MaterialIcons name="location-on" size={24} color="#2DD4BF" />
              <Text className="text-[#A1A1AA] text-lg ml-1 ">{field?.location}</Text>
            </View>
            <StatusBadge isAvailable={field?.IsAvailable} />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4 mt-8">
            <FeaturePill icon="map" text={`${field?.size}`} />
            <FeaturePill icon="lightbulb" text={field?.lightsAvailable ? "Lights Available" : "No Lights"} iconColor={field?.lightsAvailable ? "#FFD700" : "#A1A1AA"} />
            <FeaturePill icon="sports-soccer" text="Soccer Field" />
            <FeaturePill icon="grass" text="Artificial Turf" />
          </ScrollView>


          <View className="space-y-2 mt-8">
            <Text className="text-white text-xl font-bold">About the Field</Text>
            <Text className="text-[#A1A1AA] text-base leading-6">{field?.description}</Text>
          </View>



            {field?.fieldManager && (
            <View className="mt-6 p-4 bg-[#1F2937] rounded-2xl flex-row items-center space-x-4">
              <Image 
                source={{ uri: field.fieldManager.profilePic || 'https://via.placeholder.com/150' }} 
                className="w-14 h-14 rounded-full" 
              />
              
              <View className="flex-1">
                <Text className="text-white text-lg font-bold">{field.fieldManager.userName}</Text>
                <Text className="text-[#A1A1AA] text-sm">{field.fieldManager.email}</Text>
                {field.fieldManager.phoneNumber && (
                  <Text className="text-[#2DD4BF] text-sm">{field.fieldManager.phoneNumber}</Text>
                )}
              </View>

              <TouchableOpacity className="p-2 bg-[#2DD4BF] rounded-lg">
                <MaterialIcons name="message" size={20} color="black" />
              </TouchableOpacity>
            </View>
          )}

        </View>
      </ScrollView>


      <LinearGradient colors={["transparent", "rgba(10,15,30,0.9)"]} className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" />
      <TouchableOpacity 
        className="absolute bottom-4 left-4 right-4 bg-[#2DD4BF] p-5 rounded-2xl shadow-xl"
        style={{ shadowColor: "#2DD4BF", shadowOpacity: 0.4, shadowRadius: 10 }}
        disabled={!field?.IsAvailable}
        onPress={() => setShowBookingType(true)}>
        <Text className="text-black text-lg font-bold text-center">
          {field?.IsAvailable ? "Book Now" : "Currently Unavailable"}
        </Text>
      </TouchableOpacity>



      <Modal
        visible={showBookingType}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-[#1F2937] p-6 rounded-t-3xl">
            <Text className="text-white text-2xl font-bold mb-6">
              Select Booking Type
            </Text>

            <TouchableOpacity 
              className="bg-[#2DD4BF] p-4 rounded-xl mb-4"
              onPress={() => {
                setShowBookingType(false);

                router.push(`/booking?id=${field?._id}`);
              }}
            >
              <Text className="text-black text-lg font-bold text-center">
                Book for Myself
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="border-2 border-[#2DD4BF] p-4 rounded-xl"
              onPress={() => {
                setShowBookingType(false);

                router.push(`/booking?id=${field?._id}`);
              }}
            >
              <Text className="text-[#2DD4BF] text-lg font-bold text-center">
                Book for a Team
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="mt-6 p-3"
              onPress={() => setShowBookingType(false)}
            >
              <Text className="text-[#A1A1AA] text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const StatusBadge = ({ isAvailable }: { isAvailable?: boolean }) => (
  <View className={`px-3 py-1 rounded-full ${isAvailable ? "bg-green-500/20" : "bg-red-500/20"}`}>
    <Text className={`text-sm ${isAvailable ? "text-green-400" : "text-red-400"}`}>
      {isAvailable ? "Available Now" : "Not Available"}
    </Text>
  </View>
);

const FeaturePill = ({ icon, text, iconColor = "#2DD4BF" }: { icon: any; text: string; iconColor?: string }) => (
  <View className="flex-row items-center bg-[#1F2937] px-4 py-2 rounded-full ml-3">
    <MaterialIcons name={icon} size={18} color={iconColor} />
    <Text className="text-white ml-2 text-sm">{text}</Text>
  </View>
);
