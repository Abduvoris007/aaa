import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import CourseDetails from './pages/CourseDetails';
import ChatInterface from './components/chat/ChatInterface';
import ResumeBuilder from './components/resume/ResumeBuilder';
import Jobs from './pages/Jobs';

// Protected Route komponenti
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    surname: '',
    firstName: '',
    phoneNumber: '',
    englishProficiency: '',
    healthInfo: '',
    residence: '',
  });

  const [userData, setUserData] = useState({
    surname: '',
    firstName: '',
    phoneNumber: '',
    residence: '',
    englishProficiency: '',
    healthInfo: '',
  });

  const [profileData, setProfileData] = useState({
    surname: '',
    firstName: '',
    phoneNumber: '',
    residence: '',
    englishProficiency: '',
    healthInfo: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store user data
    setUserData({
      surname: formData.surname,
      firstName: formData.firstName,
      phoneNumber: formData.phoneNumber,
      residence: formData.residence,
      englishProficiency: formData.englishProficiency,
      healthInfo: formData.healthInfo,
    });
    setIsSubmitted(true);
  };

  const handleProfileUpdate = (e: React.FormEvent ) => {
    e.preventDefault();
    // Yangilangan ma'lumotlarni saqlash
    setProfileData({
      surname: userData.surname,
      firstName: userData.firstName,
      phoneNumber: userData.phoneNumber,
      residence: userData.residence,
      englishProficiency: userData.englishProficiency,
      healthInfo: userData.healthInfo,
    });
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <CartProvider>
          <FavoritesProvider>
            <ChatProvider>
              <ThemeProvider>
                <Router>
                  <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
                    <Header />
                    <main className="flex-grow pt-16">
                      <Routes>
                        <Route path="/" element={
                          <>
                            <Home />
                            <Footer />
                          </>
                        } />
                        <Route path="/courses" element={
                          <>
                            <Courses />
                            <Footer />
                          </>
                        } />
                        <Route path="/courses/:id" element={
                          <>
                            <CourseDetails />
                            <Footer />
                          </>
                        } />
                        <Route path="/about" element={
                          <>
                            <About />
                            <Footer />
                          </>
                        } />
                        <Route path="/contact" element={
                          <>
                            <Contact />
                            <Footer />
                          </>
                        } />
                        <Route path="/dashboard" element={
                          <>
                            <Dashboard />
                            <Footer />
                          </>
                        } />
                        <Route 
                          path="/chat" 
                          element={
                            <ProtectedRoute>
                              <ChatInterface />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/resume" 
                          element={
                            <ProtectedRoute>
                              <ResumeBuilder />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/jobs" 
                          element={
                            <>
                              <Jobs />
                              <Footer />
                            </>
                          } 
                        />
                        <Route 
                          path="/apply" 
                          element={
                            <form onSubmit={handleSubmit}>
                              <div>
                                <label>Full Name:</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                              </div>
                              <div>
                                <label>Surname:</label>
                                <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
                              </div>
                              <div>
                                <label>First Name:</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                              </div>
                              <div>
                                <label>Phone Number:</label>
                                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                              </div>
                              <div>
                                <label>Ingliz Tili Darajasi:</label>
                                <input type="text" name="englishProficiency" value={formData.englishProficiency} onChange={handleChange} required />
                              </div>
                              <div>
                                <label>Salomatlik Ma'lumotnomasi:</label>
                                <input type="text" name="healthInfo" value={formData.healthInfo} onChange={handleChange} required />
                              </div>
                              <div>
                                <label>Residence:</label>
                                <input type="text" name="residence" value={formData.residence} onChange={handleChange} required />
                              </div>
                              <button type="submit">Submit</button>
                              {isSubmitted && (
                                <div>
                                  <h3>Shaxsiy Ma'lumotlar</h3>
                                  <p>Familiya: {userData.surname}</p>
                                  <p>Ism: {userData.firstName}</p>
                                  <p>Telefon Raqami: {userData.phoneNumber}</p>
                                  <p>Turar Joy: {userData.residence}</p>
                                  <p>Ingliz Tili Darajasi: {userData.englishProficiency}</p>
                                  <p>Salomatlik Ma'lumotnomasi: {userData.healthInfo}</p>
                                  <button onClick={handleProfileUpdate}>Update Profile</button>
                                  <div>
                                    <h3>Profil Ma'lumotlari</h3>
                                    <p>Familiya: {profileData.surname}</p>
                                    <p>Ism: {profileData.firstName}</p>
                                    <p>Telefon Raqami: {profileData.phoneNumber}</p>
                                    <p>Turar Joy: {profileData.residence}</p>
                                    <p>Ingliz Tili Darajasi: {profileData.englishProficiency}</p>
                                    <p>Salomatlik Ma'lumotnomasi: {profileData.healthInfo}</p>
                                  </div>
                                </div>
                              )}
                            </form>
                          } 
                        />
                      </Routes>
                    </main>
                  </div>
                </Router>
              </ThemeProvider>
            </ChatProvider>
          </FavoritesProvider>
        </CartProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;