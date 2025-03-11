import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import useFieldStore from "~/store/fieldStore";
import FieldCard from "~/components/pitch/fieldCard";



export default function FieldsScreen() {
  const { fields, getFields } = useFieldStore();
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    getFields();
  }, [getFields]);

  return (
    <View className="flex-1 bg-[#0A0F1E]">

      <View className="px-4 pt-12 pb-4 flex-row items-center justify-between">
        <Text className="text-white text-3xl font-extrabold">Explore Fields</Text>
        <TouchableOpacity className="bg-[#1A1F2E] p-2 rounded-full">
          <Ionicons name="filter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>


      <View className="px-4 mb-6">
        <View className="flex-row items-center bg-[#1A1F2E] rounded-2xl p-3">
          <Ionicons name="search" size={20} color="#A1A1AA" />
          <TextInput placeholder="Search fields..." placeholderTextColor="#A1A1AA" className="flex-1 ml-2 text-white" />
        </View>
      </View>


      <FlatList
        data={fields}
        keyExtractor={(item) => item._id as string}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <FieldCard item={item} />
        )}
      />
    </View>
  );
}
