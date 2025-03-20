import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import useFieldStore from '~/store/fieldStore';
import { Availability } from '~/types/types';
import ReservationStore from '~/store/reservationStore';
import useAuthStore from '~/store/authStore';
import Toast from 'react-native-toast-message';
import { ReservationType } from '~/types/types';


export default function IndividualBooking() {
  const { id } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [availability, setAvailability] = useState<Availability[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const fieldPrice = 45;

  const { field,isLoading , error ,getOneField } = useFieldStore();
  const { user } = useAuthStore()
  const { bookIt } = ReservationStore()

  useEffect(() => {
    const fetchData = async () => {
      await getOneField(id as string);
      setAvailability(field?.availability || []);
    };
    fetchData();
  }, [id]);


  const handleBooking = async () => {
    try {
      const reservationDetails :ReservationType = {
        userId: user?._id,
        fieldId: id,
        date: selectedDate.toISOString(),
        startTime: selectedTime,
      };
  
      await bookIt(reservationDetails);
  
      Toast.show({
        type: 'success',
        text1: 'Field Booking was Complete 🎉',
      });
  
      router.push({
        pathname: '/confirm',
        params: reservationDetails,
      });
  
    } catch (err) {
      console.log(err);
    }
  };
  

  const getAvailableSlots = () => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const dayAvailability = availability.find(a => a.date === formattedDate);
    return dayAvailability ? dayAvailability.slots.filter(slot => !slot.isBooked) : [];
  };

  return (
    <LinearGradient colors={['#0A0F1E', '#1A1F2E']} className="flex-1">
      <StatusBar style="light" />
      <View className="pt-12 px-6 pb-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-[#2DD4BF]/10">
          <Ionicons name="arrow-back" size={24} color="#2DD4BF" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Book Your Session</Text>
        <View className="w-8" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-6 pt-4">
        
        <Text className="text-[#2DD4BF] text-lg font-semibold mb-4 mt-2">Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6" contentContainerStyle={{ paddingBottom: 8 }}>
          {[0, 1, 2, 3, 4].map((day) => {
            const date = new Date();
            date.setDate(date.getDate() + day);
            return (
              <TouchableOpacity 
                key={day}
                onPress={() => setSelectedDate(date)}
                className={`p-4 mr-4 rounded-2xl ${
                  selectedDate.toDateString() === date.toDateString() ? 'bg-[#2DD4BF]' : 'bg-[#1F2937]'
                } border border-[#2DD4BF]/20`}
                style={{ elevation: 3 }}
              >
                <Text className={`text-center text-sm ${
                  selectedDate.toDateString() === date.toDateString() ? 'text-black' : 'text-[#A1A1AA]'
                }`}>
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </Text>
                <Text className={`text-center text-xl font-bold mt-1 ${
                  selectedDate.toDateString() === date.toDateString() ? 'text-black' : 'text-white'
                }`}>
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>


        <Text className="text-[#2DD4BF] text-lg font-semibold mb-4">Available Times</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#2DD4BF" />
        ) : (
          <View className="flex-row flex-wrap justify-between mb-32">
            {getAvailableSlots().length > 0 ? (
              getAvailableSlots().map((slot) => (
                <TouchableOpacity
                  key={slot.startTime}
                  className={`w-[48%] p-4 mb-4 rounded-2xl ${
                    selectedTime === slot.startTime ? 'bg-[#2DD4BF]' : 'bg-[#1F2937]'
                  } border-2 border-transparent`}
                  onPress={() => setSelectedTime(slot.startTime)}
                  activeOpacity={0.8}
                >
                  <View className="flex-row items-center justify-between">
                    <Text className={`text-lg font-semibold ${
                      selectedTime === slot.startTime ? 'text-black' : 'text-white'
                    }`}>
                      {slot.startTime}
                    </Text>
                    {selectedTime === slot.startTime && (
                      <Ionicons name="checkmark-circle" size={20} color="black" />
                    )}
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-white text-center">No available slots for this day</Text>
            )}
          </View>
        )}
      </ScrollView>


      <View className='p-4'>
        <TouchableOpacity 
          className="bg-[#2DD4BF] p-5 rounded-2xl flex-row justify-center items-center shadow-lg"
          style={{
            shadowColor: '#2DD4BF',
            shadowOpacity: 0.4,
            shadowRadius: 15,
            transform: [{ scale: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] }) }]
          }}
          onPress={handleBooking}
        >
          <Ionicons name="calendar" size={24} color="black" />
          <Text className="text-black text-lg font-bold ml-3">
            Confirm Booking - ${fieldPrice}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
