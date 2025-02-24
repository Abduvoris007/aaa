import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage } from '../../context/LanguageContext';
import { X, Trash2 } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({ isOpen, onClose }) => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {t('favorites', 'title')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 text-gray-500 dark:text-gray-400">
              <p className="text-center">{t('favorites', 'empty')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-grow ml-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {item.level}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.duration}
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                      {item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors ml-2"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;