import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  isOpen: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  isOpen,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-24 right-4 z-50 animate-slide-in">
      <div className={`
        rounded-lg shadow-lg p-4 pr-12 max-w-md relative
        ${type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : ''}
        ${type === 'info' ? 'bg-blue-50 text-blue-800 border border-blue-200' : ''}
        ${type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' : ''}
      `}>
        <div className="flex items-center">
          {type === 'success' && <CheckCircle className="w-5 h-5 mr-3 text-green-500" />}
          {type === 'info' && <AlertCircle className="w-5 h-5 mr-3 text-blue-500" />}
          {type === 'error' && <AlertCircle className="w-5 h-5 mr-3 text-red-500" />}
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Notification;
