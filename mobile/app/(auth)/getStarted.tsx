import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import useAuthStore from '~/store/authStore';
import { uploadImageToBackend } from '~/lib/minio';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';


const GetStartedScreen = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  const { getStarted, user } = useAuthStore();

  const startUser = async () => {
    if (!phone.trim()) {
      Alert.alert('Error', 'Phone number is required.');
      return;
    }
    try {
      await getStarted({ id: user?._id as string, phoneNumber: phone, profilePic: image, location });
      Toast.show({
        type: 'success',
        text1: 'Registration Complete successfully 🎉',
        text2: 'Now GetLogin To Your Account',
      });
      router.push('/auth'); 
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please allow access to your media library.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
  
    if (!result.canceled) {
      setUploading(true);
      try {
        const imageUri = result.assets[0].uri;
        const imageUrl = await uploadImageToBackend(imageUri);
        setImage(imageUrl);
      } catch (error) {
        console.error('Image upload failed:', error);
        setImage('https://i.pinimg.com/736x/70/8c/08/708c08614099f90b849c6f7089f8effb.jpg');
      } finally {
        setUploading(false);
      }
    }
  };


  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Please enable location access in settings.');
      return;
    }

    setLoading(true);
    try {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(`${loc.coords.latitude}, ${loc.coords.longitude}`);

      let geocode = await Location.reverseGeocodeAsync(loc.coords);
      if (geocode.length > 0) {
        setAddress(`${geocode[0].street}, ${geocode[0].city}, ${geocode[0].region}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch location. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (

    <LinearGradient colors={['#0A0F1E', '#1A1F2E']} className="flex-1 p-6 pt-12">
    <Stack.Screen options={{headerShown: false}}/>  
      
      <View className="flex-row items-center mb-8">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-[#2DD4BF]/10">
          <Ionicons name="arrow-back" size={24} color="#2DD4BF" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold ml-4">Complete Profile</Text>
      </View>


      <View className="flex-row items-center justify-center mb-8">
        {[1, 2, 3].map((num) => (
          <View key={num} className="flex-row items-center">
            <View className={`w-8 h-8 rounded-full items-center justify-center 
              ${step >= num ? 'bg-[#2DD4BF]' : 'bg-[#1F2937] border border-[#2DD4BF]/20'}`}>
              <Text className={`font-bold ${step >= num ? 'text-black' : 'text-[#2DD4BF]'}`}>{num}</Text>
            </View>
            {num < 3 && <View className={`h-1 w-8 ${step > num ? 'bg-[#2DD4BF]' : 'bg-[#1F2937]'}`} />}
          </View>
        ))}
      </View>


      <View className="flex-1">

        {step === 1 && (
          <View className="space-y-4">
            <Text className="text-[#2DD4BF] text-lg font-semibold">Phone Verification</Text>
            <View className="bg-[#1F2937] p-4 rounded-xl border border-[#2DD4BF]/20">
              <TextInput
                className="text-white text-lg"
                placeholder="Enter phone number"
                placeholderTextColor="#6B7280"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
              <Ionicons name="call" size={20} color="#2DD4BF" className="absolute right-4 top-5" />
            </View>
          </View>
        )}


        {step === 2 && (
          <View className="items-center space-y-6">
            <Text className="text-[#2DD4BF] text-lg font-semibold">Profile Picture</Text>
            <TouchableOpacity 
              onPress={pickImage}
              className="w-40 h-40 rounded-full bg-[#1F2937] border-2 border-dashed border-[#2DD4BF]/30 items-center justify-center"
            >
              {uploading ? (
                <ActivityIndicator size="small" color="#2DD4BF" />
              ) : image ? (
                <Image source={{ uri: image }} className="w-full h-full rounded-full" />
              ) : (
                <>
                  <Ionicons name="camera" size={32} color="#2DD4BF" />
                  <Text className="text-[#2DD4BF] mt-2">Add Photo</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}


        {step === 3 && (
          <View className="space-y-4">
            <Text className="text-[#2DD4BF] text-lg font-semibold">Location Access</Text>
            <TouchableOpacity
              onPress={getLocation}
              className="bg-[#1F2937] p-4 rounded-xl border border-[#2DD4BF]/20"
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#2DD4BF" />
              ) : address ? (
                <View className="space-y-2">
                  <Text className="text-white text-lg">{address}</Text>
                  <Ionicons name="checkmark-circle" size={20} color="#2DD4BF" className="absolute right-4 top-5" />
                </View>
              ) : (
                <View className="flex-row items-center justify-between">
                  <Text className="text-[#6B7280] text-lg">Detect Location</Text>
                  <Ionicons name="locate" size={20} color="#2DD4BF" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>


      <View className="flex-row justify-between mt-8">
        {step > 1 && (
          <TouchableOpacity
            onPress={() => setStep(prev => prev - 1)}
            className="bg-[#1F2937] px-6 py-3 rounded-xl flex-row items-center"
          >
            <Ionicons name="arrow-back" size={20} color="#2DD4BF" />
            <Text className="text-[#2DD4BF] ml-2 text-lg">Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          onPress={step < 3 ? () => setStep(prev => prev + 1) : startUser}
          className="bg-[#2DD4BF] px-6 py-3 rounded-xl flex-row items-center ml-auto"
        >
          <Text className="text-black text-lg font-semibold">
            {step < 3 ? 'Continue' : 'Finish Setup'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="black" className="ml-2" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default GetStartedScreen;