import React, { useState, useRef, useEffect } from 'react';
import {  View,  Text,  TextInput,  FlatList,  TouchableOpacity,  KeyboardAvoidingView,  Platform, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from '~/store/authStore';
import usePlayerStore from '~/store/playersStore';


const initialMessages = [
  {
    id: '1',
    text: 'Hey team, everyone up for practice tomorrow?',
    sender: {
      id: '123',
      name: 'John',
      avatar: 'https://i.pravatar.cc/150?img=1',
      isTeamAdmin: true
    },
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    text: 'Yes, Im in! 👍',
    sender: {
      id: '456',
      name: 'Mike',
      avatar: 'https://i.pravatar.cc/150?img=2',
      isTeamAdmin: false
    },
    timestamp: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: '3',
    text: 'What time are we meeting?',
    sender: {
      id: '789',
      name: 'Sarah',
      avatar: 'https://i.pravatar.cc/150?img=3',
      isTeamAdmin: false
    },
    timestamp: new Date(Date.now() - 900000).toISOString(),
  }
];


const currentUser = {
  id: '123',
  name: 'John',
  avatar: 'https://i.pravatar.cc/150?img=1'
};


export default function TeamChatScreen() {

  const {userId} = useLocalSearchParams();

  const { player , getPlayer } = usePlayerStore()


  useEffect(()=>{

    getPlayer(userId as string)

  },[userId , getPlayer])


  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: currentUser,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const MessageBubble = ({ message, isCurrentUser }: { 
    message: typeof messages[0],
    isCurrentUser: boolean 
  }) => (
    <View className={`flex-row items-end mb-4 ${
      isCurrentUser ? 'justify-end' : 'justify-start'
    }`}>
      {!isCurrentUser && (
        <Image 
          source={{ uri: message.sender.avatar }}
          className="w-8 h-8 rounded-full mr-2"
        />
      )}
      
      <View className="max-w-[80%]">
        {!isCurrentUser && (
          <View className="flex-row items-center mb-1">
            <Text className="text-[#A1A1AA] text-sm font-medium">
              {message.sender.name}
            </Text>
            {message.sender.isTeamAdmin && (
              <View className="bg-blue-500/20 px-2 py-0.5 rounded-full ml-2">
                <Text className="text-blue-400 text-xs">Admin</Text>
              </View>
            )}
          </View>
        )}
        
        <View className={`rounded-2xl px-4 py-3 ${
          isCurrentUser 
            ? 'bg-[#2DD4BF] rounded-tr-none' 
            : 'bg-[#1A1F2E] rounded-tl-none'
        }`}>
          <Text className={
            isCurrentUser ? 'text-black' : 'text-white'
          }>{message.text}</Text>
          <Text className={`text-xs mt-1 ${
            isCurrentUser ? 'text-[#085147]' : 'text-[#A1A1AA]'
          }`}>
            {formatTime(message.timestamp)}
          </Text>
        </View>
      </View>

      {isCurrentUser && (
        <Image 
          source={{ uri: message.sender.avatar }}
          className="w-8 h-8 rounded-full ml-2"
        />
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-[#0A0F1E]"
    >

      <View className="px-4 pt-12 pb-4 bg-[#0A0F1E] border-b border-[#1A1F2E]">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-4"
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <Image 
            source={{ uri: 'https://i.pinimg.com/474x/54/dd/fd/54ddfd815789197ee9912d4ab4e2292a.jpg' }}
            className="w-10 h-10 rounded-full"
          />
          
          <View className="ml-3 flex-1">
            <Text className="text-white text-lg font-bold">Thunder 5</Text>
            <Text className="text-[#A1A1AA] text-sm">5 members</Text>
          </View>

          <TouchableOpacity 
            // onPress={() => router.push('/team-info')}
            className="p-2"
          >
            <Ionicons name="information-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>


      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MessageBubble 
            message={item}
            isCurrentUser={item.sender.id === currentUser.id}
          />
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <View className="p-4 border-t border-[#1A1F2E]">
        <View className="flex-row items-center bg-[#1A1F2E] rounded-full px-4 py-2">
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            placeholderTextColor="#A1A1AA"
            multiline
            className="flex-1 text-white mr-2 max-h-24"
          />
          
          <TouchableOpacity 
            onPress={sendMessage}
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full ${
              newMessage.trim() ? 'bg-[#2DD4BF]' : 'bg-[#2DD4BF]/50'
            }`}
          >
            <Ionicons 
              name="send" 
              size={18} 
              color={newMessage.trim() ? '#0A0F1E' : '#A1A1AA'} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}