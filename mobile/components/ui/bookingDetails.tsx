import { View, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';



export const DetailRow = ({ icon, title, value }: { icon: string; title: string; value: string }) => (
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-row items-center">
        <Ionicons name={icon} size={20} color="#2DD4BF" />
        <Text className="text-[#A1A1AA] ml-2">{title}</Text>
      </View>
      <Text className="text-white">{value}</Text>
    </View>
  );




export const InfoCard = ({ children }: { children: React.ReactNode }) => (
    <View className="bg-[#1F2937] rounded-2xl p-4 mb-6 border border-[#2DD4BF]/20">
      {children}
    </View>
  );
  