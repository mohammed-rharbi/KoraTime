import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from '~/store/authStore';
import usePlayerStore from '~/store/playersStore';
import useChatStore from '~/store/chatStore';
import { useChat } from '~/lib/chat';
import { MessageType } from '~/types/types';
import { Stack } from 'expo-router';


export default function TeamChatScreen() {

  const { userId, chatId } = useLocalSearchParams();
  const { user } = useAuthStore();
  const { player, getPlayer } = usePlayerStore();
  const { sendMessages, getChat, currentChat } = useChatStore();
  const { messages: realTimeMessages } = useChat(chatId as string, user?._id || '');
  const router = useRouter();
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    getPlayer(userId as string);
    if (chatId) getChat(chatId as string);
  }, [userId, chatId]);

  useEffect(() => {
    if (currentChat && realTimeMessages.length > 0) {
      const newMessages = realTimeMessages.filter(
        rtMsg => !currentChat.some(msg => msg._id === rtMsg._id)
      );
      
      if (newMessages.length > 0) {
        useChatStore.setState({
          currentChat: [...currentChat, ...newMessages]
        });
      }
    }
  }, [realTimeMessages]);

  useEffect(() => {
    if (currentChat) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [currentChat]);

  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return isNaN(date.getTime()) 
        ? '--:--' 
        : date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          });
    } catch {
      return '--:--';
    }
  };

  const handleSend = async () => {
    if (newMessage.trim() && user?._id && chatId) {
      try {
        await sendMessages(chatId as string, user._id, newMessage.trim());
        setNewMessage('');
      } catch (error) {
        console.error('Send message failed:', error);
      }
    }
  };

  const MessageBubble = ({ message, isCurrentUser }: { 
    message: MessageType;
    isCurrentUser: boolean;
  }) => (
    <View className={`flex-row items-end mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>

      {!isCurrentUser && (
        <Image 
          source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${player?.profilePic}` }}
          className="w-8 h-8 rounded-full mr-2"
        />
      )}
      

      <View className="max-w-[80%]">
        {!isCurrentUser && (
          <Text className="text-[#A1A1AA] text-sm font-medium mb-1">
            {player?.userName}
          </Text>
        )}
        
        <View className={`rounded-2xl px-4 py-3 ${
          isCurrentUser 
            ? 'bg-[#2DD4BF] rounded-tr-none' 
            : 'bg-[#1A1F2E] rounded-tl-none'
        }`}>
          <Text className={isCurrentUser ? 'text-black' : 'text-white'}>
            {message.content}
          </Text>
          <Text className={`text-xs mt-1 ${isCurrentUser ? 'text-[#085147]' : 'text-[#A1A1AA]'}`}>
            {formatTime(message.createdAt)}
          </Text>
        </View>
      </View>


      {isCurrentUser && (
        <Image 
          source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${user?.profilePic}` }}
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
         <Stack.Screen
              options={{
                headerShown: false ,        
              }}
            />    

      <View className="px-4 pt-12 pb-4 bg-[#0A0F1E] border-b border-[#1A1F2E]">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <Image 
            source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${player?.profilePic}` }}
            className="w-10 h-10 rounded-full"
          />
          
          <View className="ml-3 flex-1">
            <Text className="text-white text-lg font-bold">{player?.userName}</Text>
          </View>

          <TouchableOpacity onPress={() => router.push(`/playerPage?id=${player?._id}`)}>
            <Ionicons name="information-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>


      <FlatList
        ref={flatListRef}
        data={currentChat}
        keyExtractor={(item) => item._id}
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MessageBubble 
            message={item}
            isCurrentUser={item.sender._id === user?._id}
          />
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-gray-500">No messages yet</Text>
            <Text className="text-gray-500 mt-2">Start the conversation!</Text>
          </View>
        }
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
            onPress={handleSend}
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full ${newMessage.trim() ? 'bg-[#2DD4BF]' : 'bg-[#2DD4BF]/50'}`}
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
