import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'file';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  fileUrl?: string;
  audioBlob?: Blob;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: Date;
  unreadCount: number;
}

interface LiveClassNotification {
  id: string;
  sessionId: string;
  teacherName: string;
  subject: string;
  startTime: Date;
}

interface ChatContextType {
  messages: Record<string, Message[]>;
  contacts: Contact[];
  activeChat: string | null;
  sendMessage: (receiverId: string, content: string, type: Message['type'], fileUrl?: string, audioBlob?: Blob) => void;
  setActiveChat: (contactId: string) => void;
  markAsRead: (contactId: string) => void;
  liveClassNotifications: LiveClassNotification[];
  addLiveClassNotification: (notification: LiveClassNotification) => void;
  removeLiveClassNotification: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Smith',
      avatar: '/avatars/john.jpg',
      status: 'online',
      unreadCount: 2,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      status: 'offline',
      lastSeen: new Date(),
      unreadCount: 0,
    },
    // Add more contacts as needed
  ]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [liveClassNotifications, setLiveClassNotifications] = useState<LiveClassNotification[]>([]);

  const sendMessage = async (receiverId: string, content: string, type: Message['type'], fileUrl?: string, audioBlob?: Blob) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'currentUser',
      receiverId,
      content,
      type,
      timestamp: new Date(),
      status: 'sent',
      fileUrl,
      audioBlob
    };

    if (type === 'audio' && audioBlob) {
      newMessage.fileUrl = URL.createObjectURL(audioBlob);
    }

    setMessages(prev => ({
      ...prev,
      [receiverId]: [...(prev[receiverId] || []), newMessage],
    }));
  };

  const markAsRead = (contactId: string) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === contactId ? { ...contact, unreadCount: 0 } : contact
      )
    );
  };

  const addLiveClassNotification = (notification: LiveClassNotification) => {
    setLiveClassNotifications(prev => [...prev, notification]);
  };

  const removeLiveClassNotification = (id: string) => {
    setLiveClassNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        contacts,
        activeChat,
        sendMessage,
        setActiveChat,
        markAsRead,
        liveClassNotifications,
        addLiveClassNotification,
        removeLiveClassNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 