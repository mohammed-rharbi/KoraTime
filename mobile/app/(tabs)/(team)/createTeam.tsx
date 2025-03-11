import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CreateTeamScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [teamData, setTeamData] = useState({
    name: '',
    location: '',
    teamColor: '',
    logo: null,
  });

  const steps = [
    'Basic Info',
    'Team Colors',
    'Team Logo',
    'Review & Create'
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setTeamData({ ...teamData, logo: result.assets[0].uri });
    }
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <View className="space-y-6">
            <Text className="text-xl text-[#2DD4BF] font-bold mb-6">Basic Information</Text>

            <FormField
              label="Team Name"
              icon="shield-outline"
              value={teamData.name}
              onChange={(text) => setTeamData({ ...teamData, name: text })}
              placeholder="Enter team name"
            />
            
            <FormField
              label="Location"
              icon="location-outline"
              value={teamData.location}
              onChange={(text) => setTeamData({ ...teamData, location: text })}
              placeholder="Team location"
            />
            
            <FormField
              label="Founded Year"
              icon="calendar-outline"
              value={teamData.foundedYear}
              onChange={(text) => setTeamData({ ...teamData, foundedYear: text })}
              placeholder="Year founded"
              keyboardType="numeric"
            />
          </View>
        );
      case 2:
        return (
          <View className="space-y-6">
            <Text className="text-xl text-[#2DD4BF] font-bold mb-6">Team Colors</Text>
            <FormField
              label="Primary Color"
              icon="color-palette-outline"
              value={teamData.teamColor}
              onChange={(text) => setTeamData({ ...teamData, teamColor: text })}
              placeholder="Hex color code"
            />
            
            <View>
              <Text className="text-gray-400 mb-3 text-sm">Color Presets</Text>
              <View className="flex-row flex-wrap gap-4">
                {['#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#800080'].map((color) => (
                  <TouchableOpacity
                    key={color}
                    className="w-12 h-12 rounded-full border-2 border-gray-700"
                    style={{ backgroundColor: color }}
                    onPress={() => setTeamData({ ...teamData, teamColor: color })}
                  />
                ))}
              </View>
            </View>
          </View>
        );
      case 3:
        return (
          <View className="space-y-6">
            <Text className="text-xl text-[#2DD4BF] font-bold mb-6">Team Logo</Text>
            <TouchableOpacity 
              onPress={pickImage}
              className="items-center"
            >
              <View className="w-48 h-48 rounded-full bg-gray-800 border-2 border-dashed border-[#2DD4BF] items-center justify-center overflow-hidden">
                {teamData.logo ? (
                  <Image 
                    source={{ uri: teamData.logo }} 
                    className="w-full h-full"
                  />
                ) : (
                  <View className="items-center">
                    <Ionicons name="cloud-upload-outline" size={40} color="#2DD4BF" />
                    <Text className="text-[#2DD4BF] text-sm mt-2">Upload Logo</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        );
      case 4:
        return (
          <View className="space-y-6">
            <Text className="text-xl text-[#2DD4BF] font-bold mb-6">Review Details</Text>
            <DetailItem label="Team Name" value={teamData.name} icon="shield-outline" />
            <DetailItem label="Location" value={teamData.location} icon="location-outline" />
            <DetailItem label="Founded Year" value={teamData.foundedYear} icon="calendar-outline" />
            <DetailItem label="Team Color" value={teamData.teamColor} icon="color-palette-outline">
              <View className="w-6 h-6 rounded-full" style={{ backgroundColor: teamData.teamColor }} />
            </DetailItem>
            <DetailItem label="Logo" value={teamData.logo ? "Uploaded" : "Not uploaded"} icon="image-outline" />
          </View>
        );
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#1E293B]">
      <View className="p-6">

        <View className="flex-row justify-between mb-8">
          {steps.map((_, index) => (
            <View key={index} className="items-center flex-1">
              <View className={`w-8 h-8 rounded-full items-center justify-center 
                ${currentStep > index + 1 ? 'bg-[#2DD4BF]' : currentStep === index + 1 ? 'bg-[#2DD4BF]' : 'bg-gray-800'}`}>
                {currentStep > index + 1 ? (
                  <Ionicons name="checkmark" size={16} color="white" />
                ) : (
                  <Text className={`text-sm ${currentStep === index + 1 ? 'text-white' : 'text-gray-400'}`}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text className={`text-xs mt-2 ${currentStep >= index + 1 ? 'text-[#2DD4BF]' : 'text-gray-500'}`}>
                {steps[index]}
              </Text>
            </View>
          ))}
        </View>

        {renderStepContent()}

        <View className="flex-row justify-between mt-8">
          {currentStep > 1 && (
            <TouchableOpacity
              className="bg-gray-800 px-6 py-3 rounded-xl"
              onPress={() => setCurrentStep(prev => prev - 1)}
            >
              <Text className="text-white">Previous</Text>
            </TouchableOpacity>
          )}
          
          {currentStep < steps.length ? (
            <TouchableOpacity
              className="bg-[#2DD4BF] px-6 py-3 rounded-xl ml-auto"
              onPress={() => setCurrentStep(prev => prev + 1)}
            >
              <Text className="text-white">Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-[#2DD4BF] px-6 py-3 rounded-xl ml-auto"
              onPress={() => console.log('Create team:', teamData)}
            >
              <Text className="text-white font-bold">Create Team</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const FormField = ({ label, icon, value, onChange, placeholder, keyboardType }:any) => (
  <View>
    <Text className="text-gray-400 mb-2 text-sm">{label}</Text>
    <View className="relative">
      <View className="absolute z-10 h-full justify-center pl-4">
        <Ionicons name={icon} size={20} color="#2DD4BF" /> 
      </View>
      <TextInput
        className="bg-gray-800 rounded-xl px-4 h-12 pl-12 text-gray-100 border border-gray-700"
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        placeholderTextColor="#6B7280"
      />
    </View>
  </View>
);

const DetailItem = ({ label, value, icon, children }:any) => (
  <View className="flex-row items-center justify-between py-3 border-b border-gray-800">
    <View className="flex-row items-center">
      <Ionicons name={icon} size={20} color="#2DD4BF" />
      <Text className="text-gray-400 ml-3">{label}</Text>
    </View>
    {children || <Text className="text-gray-300">{value}</Text>}
  </View>
);

export default CreateTeamScreen;