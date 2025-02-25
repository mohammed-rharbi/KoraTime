import React, { useState , useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { loginUser, registerUser } from '~/redux/slices/authSlice';
import Toast from 'react-native-toast-message';

const AuthScreen = () => {


  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const {loading , error , token , user} = useAppSelector((state) => state.auth)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();



  useEffect(()=>{


    if(token){
      router.push('/home')
    }

  },[token])

  
  const handleRegister = async () => {
    try {
      const result = await dispatch(registerUser({ userName, email, password }));
      
      if(!error){
        Toast.show({
          type: 'success',
          text1: 'Registration Complete',
          text2: 'Welcome to the app! 🎉',
        });
        router.push('/getStarted');
      }
    
    } catch (error) {
      console.log(error);
    }
  };
  


  const handleLogin = async () => {
    
    dispatch(loginUser({email , password}))
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-950"
    >
      <ScrollView className="flex-1">
        <LinearGradient
          colors={['#1E293B', '#0F172A']}
          className="flex-1 px-6 pt-16 min-h-screen"
        >
          <View className="items-center mb-10">
            <View className="w-24 h-24 rounded-full bg-gray-800 shadow-lg overflow-hidden border-2 border-[#2DD4BF]">
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                className="w-full h-full"
              />
            </View>
            <Text className="text-2xl font-bold text-[#2DD4BF] mt-4">
              Mini Football
            </Text>
          </View>

          <View className="bg-gray-900 rounded-3xl p-6 shadow-xl border border-gray-800">
            <Text className="text-2xl font-bold text-center text-[#2DD4BF] mb-6">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </Text>
            
            {error && <Text className="text-center py-6" style={{ color: "red" }}>{error}</Text>}


            <View className="space-y-4">
              {!isLogin && (
                <View className="relative mb-3 ">
                  <View className="absolute z-10 h-full justify-center pl-4">
                    <Ionicons name="person-outline" size={20} color="#2DD4BF" />
                  </View>

                  <TextInput
                    className="bg-gray-800  rounded-xl px-4 h-12 pl-12 text-gray-100 border border-gray-700"
                    placeholder="Username"
                    value={userName}
                    onChangeText={setUsername}
                    placeholderTextColor="#6B7280"
                  />
                </View>
              )}

              <View className="relative mb-3">
                <View className="absolute z-10 h-full justify-center pl-4">
                  <Ionicons name="mail-outline" size={20} color="#2DD4BF" />
                </View>

                <TextInput
                  className="bg-gray-800 rounded-xl px-4 h-12 pl-12 text-gray-100 border border-gray-700"
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#6B7280"
                />
              </View>

              <View className="relative">
                <View className="absolute z-10 h-full justify-center pl-4">
                  <Ionicons name="lock-closed-outline" size={20} color="#2DD4BF" />
                </View>

                <TextInput
                  className="bg-gray-800 rounded-xl px-4 h-12 pl-12 pr-12 text-gray-100 border border-gray-700"
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#6B7280"
                />
                <TouchableOpacity
                  className="absolute right-4 h-full justify-center"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#2DD4BF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity className="mt-4">
              <Text className="text-right text-[#2DD4BF] text-sm">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {isLogin ? (
              <TouchableOpacity
                className="bg-[#2DD4BF] rounded-xl h-12 justify-center items-center mt-6"
                onPress={handleLogin}
              >
                <Text className="text-white font-bold text-lg">Login</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="bg-[#2DD4BF] rounded-xl h-12 justify-center items-center mt-6"
                onPress={handleRegister}
              >
                <Text className="text-white font-bold text-lg">Sign Up</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity className="mt-6"  onPress={() => setIsLogin(!isLogin)}>
              <Text className="text-center text-[#2DD4BF] text-sm">
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
              </Text>
            </TouchableOpacity>

            <View className="mt-8">
              <View className="flex-row items-center">
                <View className="flex-1 h-[1px] bg-gray-700" />
                <Text className="mx-4 text-gray-400">or continue with</Text>
                <View className="flex-1 h-[1px] bg-gray-700" />
              </View>

              <View className="flex-row justify-center gap-5 space-x-6 mt-6">
                <TouchableOpacity className="w-12 h-12 rounded-full bg-gray-800 items-center justify-center border border-gray-700">
                  <Ionicons name="logo-google" size={24} color="#2DD4BF" />
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 rounded-full bg-gray-800 items-center justify-center border border-gray-700">
                  <Ionicons name="logo-facebook" size={24} color="#2DD4BF" />
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 rounded-full bg-gray-800 items-center justify-center border border-gray-700">
                  <Ionicons name="logo-apple" size={24} color="#2DD4BF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;