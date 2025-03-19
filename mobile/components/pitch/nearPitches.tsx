import { View, Text , TouchableOpacity , Image} from 'react-native';
import React from "react";
import { Feather , MaterialIcons} from '@expo/vector-icons';



const NeirPitches = ({pitch}:any)=>{


    return (

        <TouchableOpacity key={pitch.id} className="bg-[#1E293B] mr-4 rounded-2xl w-64 p-4 border border-[#334155]">
        <Image
          source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${pitch.photo}` || "https://randomuser.me/api/portraits/men/75.jpg"}}
          className="w-full h-32 rounded-xl mb-3"
        />
        <Text className="text-white font-semibold mb-1">{pitch.name}</Text>
        <View className="flex-row items-center">
          <Feather name="star" size={16} color="#FACC15" />
          <Text className="text-[#FACC15] ml-2">4.3</Text>
          <View className="flex-row items-center ml-4">
            <MaterialIcons name="location-on" size={16} color="#2DD4BF" />
            <Text className="text-[#A1A1AA] text-xs ml-1">{pitch.location}</Text>
        </View>
        </View>
      </TouchableOpacity>

    )
}


export default NeirPitches