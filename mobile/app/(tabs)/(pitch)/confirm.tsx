import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import useFieldStore from '~/store/fieldStore';

export default function ConfirmationScreen() {
  const { id } = useLocalSearchParams();
  const { field } = useFieldStore();
  
  const bookingDetails = {
    date: 'Nov 15, 2023',
    time: '15:00 - 17:00',
    duration: '2 hours',
    price: '$90',
    paymentMethod: 'Visa •••• 1234',
  };

  return (
    <LinearGradient colors={['#0A0F1E', '#1A1F2E']} className="flex-1">
      <ScrollView className="flex-1 p-6" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Confirmation Header */}
        <View className="items-center mb-8">
          <View className="bg-[#2DD4BF] w-24 h-24 rounded-full items-center justify-center mb-4">
            <Ionicons name="checkmark" size={40} color="black" />
          </View>
          <Text className="text-white text-3xl font-bold mb-2">Booking Confirmed!</Text>
          <Text className="text-[#A1A1AA] text-lg">Your reservation is secured</Text>
        </View>

        {/* Field Information */}
        <InfoCard>
          <View className="flex-row">
            <Image 
              source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${field?.photo}` }} 
              className="w-20 h-20 rounded-xl" 
            />
            <View className="ml-4 flex-1">
              <Text className="text-white text-xl font-bold mb-1">{field?.name}</Text>
              <View className="flex-row items-center">
                <Ionicons name="location" size={16} color="#2DD4BF" />
                <Text className="text-[#A1A1AA] ml-2">{field?.location}</Text>
              </View>
            </View>
          </View>
        </InfoCard>

        {/* Booking Summary */}
        <InfoCard>
          <Text className="text-[#2DD4BF] text-lg font-bold mb-4">Booking Summary</Text>
          <DetailRow icon="calendar" title="Date" value={bookingDetails.date} />
          <DetailRow icon="time" title="Time" value={bookingDetails.time} />
          <DetailRow icon="hourglass" title="Duration" value={bookingDetails.duration} />
          <DetailRow icon="cash" title="Total Paid" value={bookingDetails.price} />
        </InfoCard>

        {/* QR Code Section */}
        <InfoCard>
          <Text className="text-[#2DD4BF] text-lg font-bold mb-4">Check-in QR Code</Text>
          <Image 
            source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=booking123' }}
            className="w-full h-64 rounded-xl mb-4"
          />
          <TouchableOpacity className="flex-row items-center justify-center bg-[#2DD4BF]/10 p-3 rounded-xl">
            <Ionicons name="download" size={20} color="#2DD4BF" />
            <Text className="text-[#2DD4BF] ml-2">Save QR Code</Text>
          </TouchableOpacity>
        </InfoCard>
      </ScrollView>

      {/* Bottom Navigation */}
      <LinearGradient colors={['transparent', '#0A0F1E']} className="absolute bottom-0 left-0 right-0 h-32 pt-6 px-6">
        <TouchableOpacity 
          className="bg-[#2DD4BF] p-5 rounded-2xl flex-row justify-center items-center"
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home" size={20} color="black" />
          <Text className="text-black text-lg font-bold ml-2">Back to Home</Text>
        </TouchableOpacity>
      </LinearGradient>
    </LinearGradient>
  );
}

/** 
 * Reusable Component for Booking Details Row
 */
const DetailRow = ({ icon, title, value }: { icon: string; title: string; value: string }) => (
  <View className="flex-row items-center justify-between mb-4">
    <View className="flex-row items-center">
      <Ionicons name={icon} size={20} color="#2DD4BF" />
      <Text className="text-[#A1A1AA] ml-2">{title}</Text>
    </View>
    <Text className="text-white">{value}</Text>
  </View>
);

/** 
 * Reusable Component for Card Containers
 */
const InfoCard = ({ children }: { children: React.ReactNode }) => (
  <View className="bg-[#1F2937] rounded-2xl p-4 mb-6 border border-[#2DD4BF]/20">
    {children}
  </View>
);
