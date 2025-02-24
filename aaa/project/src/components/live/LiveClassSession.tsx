import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LiveClassSessionProps {
  sessionId: string;
  teacherName: string;
  subject: string;
  onEnd?: () => void;
}

const LiveClassSession: React.FC<LiveClassSessionProps> = ({
  sessionId,
  teacherName,
  subject,
  onEnd
}) => {
  const navigate = useNavigate();
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    // Fullscreen mode ni yoqish
    document.documentElement.requestFullscreen();

    // Har 1 sekundda vaqtni yangilash
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    // Back button ni bloklash
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.pushState(null, '', window.location.pathname);
    };
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    // Cleanup
    return () => {
      clearInterval(timer);
      window.removeEventListener('popstate', handlePopState);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndSession = () => {
    if (window.confirm('Darsdan chiqishni xohlaysizmi?')) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      onEnd?.();
      navigate('/');
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 flex justify-between items-center">
        <div className="text-white">
          <h2 className="text-xl font-bold">{subject}</h2>
          <p className="text-sm opacity-80">O'qituvchi: {teacherName}</p>
          <p className="text-sm opacity-80">Dars davomiyligi: {formatTime(sessionTime)}</p>
        </div>
        <button
          onClick={handleEndSession}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <X className="w-5 h-5 mr-2" />
          Darsni tugatish
        </button>
      </div>

      {/* Zoom iframe */}
      <iframe
        src={`https://zoom.us/j/${sessionId}`}
        className="w-full h-full border-0"
        title="Zoom Live Class Session"
        allow="microphone; camera; fullscreen"
      />
    </div>
  );
};

export default LiveClassSession; 