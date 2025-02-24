import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Facebook, Instagram, Send, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Kompaniya haqida */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white dark:text-gray-100">
              {t('footer', 'aboutUs')}
            </h3>
            <p className="text-gray-400 dark:text-gray-300 leading-relaxed">
              2015-yildan buyon O'zbekistonda eng yaxshi ingliz tili ta'limi. 
              1000+ dan ortiq bitiruvchilar va 50+ professional o'qituvchilar.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-white/10 rounded-full transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-pink-500 hover:bg-white/10 rounded-full transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://telegram.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-white/10 rounded-full transition-all"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Tezkor havolalar */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white dark:text-gray-100">
              {t('footer', 'quickLinks')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/courses" 
                  className="text-gray-400 hover:text-white dark:hover:text-gray-100 transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-white rounded-full mr-2 transition-colors"></span>
                  {t('nav', 'courses')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white dark:hover:text-gray-100 transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-white rounded-full mr-2 transition-colors"></span>
                  {t('nav', 'about')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/teachers" 
                  className="text-gray-400 hover:text-white dark:hover:text-gray-100 transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-white rounded-full mr-2 transition-colors"></span>
                  {t('footer', 'teachers')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-400 hover:text-white dark:hover:text-gray-100 transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-white rounded-full mr-2 transition-colors"></span>
                  {t('footer', 'blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Bog'lanish */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white dark:text-gray-100">
              {t('footer', 'contact')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 dark:text-gray-300 group">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-gray-500 group-hover:text-blue-400 transition-colors" />
                <span className="leading-relaxed">
                  Toshkent sh., Chilonzor tumani, Bunyodkor ko'chasi, 15-uy
                </span>
              </li>
              <li>
                <a 
                  href="tel:+998901234567" 
                  className="flex items-center space-x-3 text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 group transition-colors"
                >
                  <Phone className="w-5 h-5 flex-shrink-0 text-gray-500 group-hover:text-blue-400 transition-colors" />
                  <span>+998 90 123 45 67</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@englishcenter.uz" 
                  className="flex items-center space-x-3 text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 group transition-colors"
                >
                  <Mail className="w-5 h-5 flex-shrink-0 text-gray-500 group-hover:text-blue-400 transition-colors" />
                  <span>info@englishcenter.uz</span>
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 dark:text-gray-300 group">
                <Clock className="w-5 h-5 flex-shrink-0 text-gray-500 group-hover:text-blue-400 transition-colors" />
                <span>Du-Sha: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pastki qism */}
        <div className="border-t border-gray-800 dark:border-gray-800/50 mt-12 pt-8">
          <p className="text-center text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} English Learning Center. {t('footer', 'allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;