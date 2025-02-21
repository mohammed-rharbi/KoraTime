import { View, Text , TouchableOpacity , Image} from 'react-native';
import React from "react";
import { Feather } from '@expo/vector-icons';



const NeirPitches = ({pitch}:any)=>{


    return (

        <TouchableOpacity key={pitch.id} className="bg-[#1E293B] mr-4 rounded-2xl w-64 p-4 border border-[#334155]">
        <Image
          source={{ uri: pitch.image }}
          className="w-full h-32 rounded-xl mb-3"
        />
        <Text className="text-white font-semibold mb-1">{pitch.name}</Text>
        <View className="flex-row items-center">
          <Feather name="star" size={16} color="#FACC15" />
          <Text className="text-[#FACC15] ml-2">{pitch.rate}</Text>
          <Text className="text-[#94A3B8] ml-4">{pitch.des}</Text>
        </View>
      </TouchableOpacity>

    )
}


export default NeirPitches