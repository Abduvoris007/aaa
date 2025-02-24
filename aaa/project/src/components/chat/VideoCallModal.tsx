import React, { useEffect, useRef, useState } from 'react';
import { X, Mic, MicOff, Video, VideoOff } from 'lucide-react';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactName: string;
  contactAvatar: string;
  isIncoming?: boolean;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({
  isOpen,
  onClose,
  contactName,
  contactAvatar,
  isIncoming = false,
}) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isCallConnected, setIsCallConnected] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && !isIncoming) {
      startCall();
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: number;
    if (isCallConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallConnected]);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      // Here you would implement the WebRTC connection logic
      setIsCallConnected(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    // Implement actual audio toggle logic here
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    // Implement actual video toggle logic here
  };

  const handleAnswer = () => {
    startCall();
  };

  const handleDecline = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-4xl p-4">
        <div className="relative">
          {/* Main video display */}
          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
            {isCallConnected ? (
              <video
                ref={remoteVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <img
                    src={contactAvatar}
                    alt={contactName}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-white text-xl mb-2">{contactName}</h3>
                  <p className="text-gray-400">
                    {isIncoming ? 'Incoming video call...' : 'Calling...'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Local video preview */}
          <div className="absolute top-4 right-4 w-48 aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
          </div>

          {/* Call duration */}
          {isCallConnected && (
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 rounded-lg px-3 py-1">
              <span className="text-white">{formatDuration(callDuration)}</span>
            </div>
          )}

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <button
              onClick={toggleAudio}
              className={`p-4 rounded-full ${
                isAudioEnabled ? 'bg-gray-700' : 'bg-red-500'
              }`}
              title={isAudioEnabled ? "Mute audio" : "Unmute audio"}
              aria-label={isAudioEnabled ? "Mute audio" : "Unmute audio"}
            >
              {isAudioEnabled ? (
                <Mic className="w-6 h-6 text-white" />
              ) : (
                <MicOff className="w-6 h-6 text-white" />
              )}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full ${
                isVideoEnabled ? 'bg-gray-700' : 'bg-red-500'
              }`}
              title={isVideoEnabled ? "Turn off video" : "Turn on video"}
              aria-label={isVideoEnabled ? "Turn off video" : "Turn on video"}
            >
              {isVideoEnabled ? (
                <Video className="w-6 h-6 text-white" />
              ) : (
                <VideoOff className="w-6 h-6 text-white" />
              )}
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="p-4 rounded-full bg-red-500"
              title="End call"
              aria-label="End call"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Answer/Decline buttons for incoming calls */}
          {isIncoming && !isCallConnected && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <button
                onClick={handleAnswer}
                className="p-4 rounded-full bg-green-500"
                title="Answer call"
                aria-label="Answer call"
              >
                <Video className="w-6 h-6 text-white" />
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="p-4 rounded-full bg-red-500"
                title="Decline call"
                aria-label="Decline call"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal; 