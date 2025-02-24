import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { getstarted } from '~/redux/slices/authSlice';
import { useAppSelector , useAppDispatch } from '~/redux/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetStartedScreen = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState('');
  const router = useRouter();


  const dispatch = useAppDispatch()

    const {loading , error , user} = useAppSelector((state) => state.auth)
  



    const startUser = async ()=>{

      const userId = await AsyncStorage.getItem('userid') as string;


      try{

        const res = await dispatch(getstarted({userId , image , phone}))


         if (getstarted.fulfilled.match(res)) {
                router.push('/home');
              } else {
                console.error("Registration failed:", res.error);
              }

      }catch(erroe){
        console.log(error);
        
      }

    }


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    let geocode = await Location.reverseGeocodeAsync(location.coords);
    if (geocode[0]) {
      setAddress(`${geocode[0].street}, ${geocode[0].city}, ${geocode[0].region}`);
    }

  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const handleSubmit = () => {
    if (!phone || !image || !location) {
      Alert.alert('Please fill all fields');
      return;
    }
    router.replace('/home');
  };

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold text-center text-gray-800 mb-6">Get Started</Text>
      <View className="flex-row justify-center mb-6">
        {[1, 2, 3].map((num) => (
          <View key={num} className={`w-4 h-4 mx-1 rounded-full ${step === num ? 'bg-blue-500' : 'bg-gray-300'}`} />
        ))}
      </View>

      {step === 1 && (
        <View>
          <Text className="text-lg font-medium mb-2">Enter Your Phone Number</Text>
          <TextInput
            className="bg-gray-100 p-4 rounded-lg border border-gray-300"
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      )}

      {step === 2 && (
        <View className="items-center">
          <Text className="text-lg font-medium mb-2">Upload Profile Picture</Text>
          <TouchableOpacity onPress={pickImage} className="bg-gray-100 p-4 rounded-lg border border-gray-300 items-center">
            {image ? <Image source={{ uri: image }} className="w-24 h-24 rounded-full" /> : <Text className="text-gray-500">Tap to upload</Text>}
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View>
          <Text className="text-lg font-medium mb-2">Select Your Location</Text>
          <TouchableOpacity onPress={getLocation} className="bg-gray-100 p-4 rounded-lg border border-gray-300" disabled={loading}>
            {loading ? <Text className="text-gray-500">Fetching location...</Text> : address ? <Text className="text-gray-900">{address}</Text> : <Text className="text-gray-500">Tap to get location</Text>}
          </TouchableOpacity>
        </View>
      )}

      <View className="mt-6 flex-row justify-between">
        {step > 1 && (
          <TouchableOpacity onPress={handleBack} className="bg-gray-300 p-4 rounded-lg w-1/3 items-center">
            <Text className="text-gray-700 font-medium">Back</Text>
          </TouchableOpacity>
        )}
        {step < 3 ? (
          <TouchableOpacity onPress={handleNext} className="bg-blue-500 p-4 rounded-lg w-1/3 items-center">
            <Text className="text-white font-medium">Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startUser} className="bg-green-500 p-4 rounded-lg w-1/3 items-center">
            <Text className="text-white font-medium">Finish</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default GetStartedScreen;
