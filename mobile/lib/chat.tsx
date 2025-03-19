import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.EXPO_PUBLIC_API;

export const useChat = (chatId: string, userId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, { transports: ['websocket'] });
    setSocket(newSocket);

    newSocket.emit('joinChat', chatId);

    newSocket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect(); 
    };
  }, [chatId]);

  const sendMessage = (content: string) => {
    if (socket) {
      socket.emit('sendMessage', { chatId, sender: userId, content });
    }
  };

  return { messages, sendMessage };
};
