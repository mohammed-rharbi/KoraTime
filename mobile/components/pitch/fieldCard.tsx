// import { View, Text, Image, FlatList,TextInput, TouchableOpacity, Dimensions, Animated } from "react-native";
// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "expo-router";
// import { MaterialIcons, Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = width * 0.44;


//   const FieldCard = ({ item, index }: { item: typeof fieldsData[0]; index: number }) => {
//     const scale = useRef(new Animated.Value(1)).current;
//     const [selected, setSelected] = useState<string | null>(null);
//     const scrollY = useRef(new Animated.Value(0)).current;


    
//     const onPressIn = () => {
//       Animated.spring(scale, {
//         toValue: 0.95,
//         useNativeDriver: true,
//       }).start();
//     };

//     const onPressOut = () => {
//       Animated.spring(scale, {
//         toValue: 1,
//         useNativeDriver: true,
//       }).start();
//     };

//     return (
//       <Animated.View
//         style={{
//           transform: [{ scale }],
//           opacity: scrollY.interpolate({
//             inputRange: [-50, 0, 100 * index, 100 * (index + 2)],
//             outputRange: [1, 1, 1, 0],
//           }),
//         }}
//       >
//         <TouchableOpacity
//           activeOpacity={1}
//           onPressIn={onPressIn}
//           onPressOut={onPressOut}
//           onPress={() => setSelected(item.id)}
//           className="mb-4"
//         >
//           <View className="rounded-3xl overflow-hidden bg-[#1A1F2E] shadow-xl" 
//                 style={{ width: CARD_WIDTH }}>
//             <View className="relative">
//               <Image 
//                 source={{ uri: item.image }} 
//                 className="w-full h-48"
//                 style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
//               />
//               <LinearGradient
//                 colors={["transparent", "rgba(0,0,0,0.8)"]}
//                 className="absolute bottom-0 left-0 right-0 h-24"
//               />
//               <View className="absolute top-3 right-3 bg-black/30 rounded-full p-2">
//                 <Ionicons name="heart-outline" size={20} color="#fff" />
//               </View>
//             </View>
            
//             <View className="p-4">
//               <Text className="text-white text-lg font-bold mb-1" numberOfLines={1}>
//                 {item.name}
//               </Text>
              
//               <View className="flex-row items-center mb-2">
//                 <MaterialIcons name="location-on" size={16} color="#2DD4BF" />
//                 <Text className="text-[#A1A1AA] text-xs ml-1" numberOfLines={1}>
//                   {item.location}
//                 </Text>
//               </View>
              
//               <View className="flex-row items-center justify-between">
//                 <View className="flex-row items-center">
//                   <Ionicons name="star" size={16} color="#FFD700" />
//                   <Text className="text-white text-sm ml-1 font-semibold">
//                     {item.rating}
//                   </Text>
//                   <Text className="text-[#A1A1AA] text-xs ml-1">
//                     ({item.reviews})
//                   </Text>
//                 </View>
//                 <TouchableOpacity 
//                   className="bg-[#2DD4BF] px-3 py-1 rounded-full"

//                   >
//                   <Text className="text-black text-xs font-semibold">Book Now</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </Animated.View>
//     );
//   };


// export default FieldCard