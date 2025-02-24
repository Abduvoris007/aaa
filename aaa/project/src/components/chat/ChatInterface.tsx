"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useChat } from "../../context/ChatContext"
import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"
import AuthModal from "../auth/AuthModal"
import { Mic, Camera, Paperclip, Send, Phone, Video, MessageSquare, Moon, Sun } from "lucide-react"
import VideoCallModal from "./VideoCallModal"
import LiveClassSession from "../live/LiveClassSession"

interface LiveClassNotification {
  id: string
  sessionId: string
  teacherName: string
  subject: string
  startTime: Date
}

const ChatInterface = () => {
  const { isAuthenticated } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const {
    messages,
    contacts,
    activeChat,
    sendMessage,
    markAsRead,
    setActiveChat,
    liveClassNotifications,
    addLiveClassNotification,
  } = useChat()
  const [messageText, setMessageText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const [isVideoCallActive, setIsVideoCallActive] = useState(false)
  const [incomingCall, setIncomingCall] = useState(false)
  const [activeLiveSession, setActiveLiveSession] = useState<LiveClassNotification | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const activeContact = contacts.find((contact) => contact.id === activeChat)
  const activeMessages = activeChat ? messages[activeChat] || [] : []

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messageEndRef])

  useEffect(() => {
    if (activeChat) {
      markAsRead(activeChat)
    }
  }, [activeChat])

  const handleSendMessage = () => {
    if (messageText.trim() && activeChat) {
      sendMessage(activeChat, messageText, "text")
      setMessageText("")
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && activeChat) {
      const fileUrl = URL.createObjectURL(file)
      const fileType = file.type.startsWith("image/") ? "image" : "file"
      sendMessage(activeChat, file.name, fileType, fileUrl)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      })
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm;codecs=opus",
        })

        if (activeChat) {
          sendMessage(activeChat, "Ovozli xabar", "audio", undefined, audioBlob)
        }

        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)

      const startTime = Date.now()
      const timerInterval = setInterval(() => {
        setRecordingTime(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)

      mediaRecorder.onstart = () => {
        setRecordingTime(0)
      }

      return () => {
        clearInterval(timerInterval)
      }
    } catch (error) {
      console.error("Ovozni yozishda xatolik:", error)
      alert("Mikrofonga ruxsat berilmadi yoki qurilma topilmadi")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setRecordingTime(0)
    }
  }

  const handleVideoCall = () => {
    if (activeChat) {
      setIsVideoCallActive(true)
    }
  }

  const handleAudioCall = () => {
    if (activeChat) {
      console.log("Starting audio call with:", activeChat)
    }
  }

  const renderLiveClassNotification = (notification: LiveClassNotification) => (
    <div
      key={notification.id}
      className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-4 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
      onClick={() => setActiveLiveSession(notification)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-blue-600 dark:text-blue-300">{notification.subject}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">O'qituvchi: {notification.teacherName}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Boshlanish vaqti: {notification.startTime.toLocaleTimeString()}
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Darsga kirish
        </button>
      </div>
    </div>
  )

  const startLiveClass = async (sessionData: {
    sessionId: string
    teacherName: string
    subject: string
  }) => {
    const notification: LiveClassNotification = {
      id: Date.now().toString(),
      ...sessionData,
      startTime: new Date(),
    }

    addLiveClassNotification(notification)
  }

  if (!isAuthenticated) {
    return (
      <div
        className={`flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 ${theme === "dark" ? "dark" : ""}`}
      >
        <div className="text-center p-8 max-w-md">
          <MessageSquare className="w-16 h-16 mx-auto text-blue-500 dark:text-blue-400 mb-4" />
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Chat bilan suhbatlashish</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Chat xizmatidan foydalanish uchun tizimga kirishingiz kerak
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tizimga kirish
          </button>
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            customMessage="Chat xizmatidan foydalanish uchun tizimga kiring"
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-900 ${theme === "dark" ? "dark" : ""}`}
    >
      {/* Contacts List - Mobile Toggle */}
      <div
        className={`md:w-1/3 lg:w-1/4 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex-shrink-0 
        ${activeChat && !isMobileMenuOpen ? "hidden md:block" : "block"}`}
      >
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <input
            type="text"
            placeholder="Qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-73px)]">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => {
                setActiveChat(contact.id)
                markAsRead(contact.id)
                setIsMobileMenuOpen(false)
              }}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700
                ${activeChat === contact.id ? "bg-blue-50 dark:bg-blue-900" : ""}`}
            >
              <div className="relative">
                <img
                  src={contact.avatar || "/placeholder.svg"}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800
                    ${contact.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-medium dark:text-white">{contact.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {contact.status === "online" ? "Online" : "Offline"}
                </p>
              </div>
              {contact.unreadCount > 0 && (
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">{contact.unreadCount}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${!activeChat && !isMobileMenuOpen ? "hidden md:flex" : "flex"}`}>
        {activeContact ? (
          <>
            {/* Chat Header */}
            <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  className="md:hidden mr-4 text-gray-600 dark:text-gray-400"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Back to chat list"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <img
                  src={activeContact.avatar || "/placeholder.svg"}
                  alt={activeContact.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-medium dark:text-white">{activeContact.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activeContact.status === "online" ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleVideoCall}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  title="Video qo'ng'iroq"
                  aria-label="Video qo'ng'iroq"
                >
                  <Video className="w-5 h-5 dark:text-gray-400" />
                </button>
                <button
                  onClick={handleAudioCall}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  title="Audio qo'ng'iroq"
                  aria-label="Audio qo'ng'iroq"
                >
                  <Phone className="w-5 h-5 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {activeMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === "currentUser" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === "currentUser"
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-700 dark:text-white"
                    }`}
                  >
                    {message.type === "audio" ? (
                      <div className="flex items-center space-x-2">
                        <audio
                          src={message.fileUrl}
                          controls
                          className="max-w-[200px]"
                          controlsList="nodownload"
                          style={{
                            height: "40px",
                            filter: message.senderId === "currentUser" ? "invert(1)" : "none",
                          }}
                          preload="metadata"
                        >
                          Brauzeringiz audio elementni qo'llab-quvvatlamaydi.
                        </audio>
                        <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                      </div>
                    ) : (
                      <>
                        {message.content}
                        <div className="text-xs mt-1 opacity-70">{message.timestamp.toLocaleTimeString()}</div>
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4">
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  onClick={() => fileInputRef.current?.click()}
                  title="Fayl biriktirish"
                  aria-label="Fayl biriktirish"
                >
                  <Paperclip className="w-5 h-5 dark:text-gray-400" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  onClick={() => fileInputRef.current?.click()}
                  title="Rasm yuborish"
                  aria-label="Rasm yuborish"
                >
                  <Camera className="w-5 h-5 dark:text-gray-400" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                />
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Xabar yozing..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                {messageText ? (
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    title="Xabar yuborish"
                    aria-label="Xabar yuborish"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onMouseLeave={stopRecording}
                    className={`p-2 rounded-full transition-colors ${
                      isRecording ? "bg-red-500 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    title={isRecording ? "Ovozli xabarni to'xtatish" : "Ovozli xabar yozish"}
                    aria-label={isRecording ? "Ovozli xabarni to'xtatish" : "Ovozli xabar yozish"}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                )}
                {isRecording && (
                  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 px-4 py-2 rounded-full text-sm">
                    Yozilmoqda: {recordingTime} soniya
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <MessageSquare className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">Suhbatlashish uchun kontakt tanlang</p>
            </div>
          </div>
        )}
      </div>

      {/* Video Call Modal */}
      {activeContact && (
        <VideoCallModal
          isOpen={isVideoCallActive}
          onClose={() => setIsVideoCallActive(false)}
          contactName={activeContact.name}
          contactAvatar={activeContact.avatar}
          isIncoming={incomingCall}
        />
      )}

      {/* Live Class Session */}
      {activeLiveSession && (
        <LiveClassSession
          sessionId={activeLiveSession.sessionId}
          teacherName={activeLiveSession.teacherName}
          subject={activeLiveSession.subject}
          onEnd={() => setActiveLiveSession(null)}
        />
      )}
    </div>
  )
}

export default ChatInterface

