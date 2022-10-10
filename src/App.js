import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './Screens/HomeScreen';
import AboutScreen from './Screens/AboutScreen';
import LoginScreen from './Screens/LoginScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SubscriptionScreen from './Screens/SubscriptionScreen';
import ChatBox from './Components/ChatBox';
import RegistrationScreen from './Screens/RegistrationScreen';
import AdminChatScreen from './Screens/AdminChatScreen';
import TodolistScreen from './Screens/TodolistScreen';
import AdminDashboardScree from './Screens/AdminDashboardScree';
import AdminUserList from './Screens/AdminUserList';
function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Header />
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/subscription" element={<SubscriptionScreen />} />
              <Route path="/registration" element={<RegistrationScreen />} />
              <Route path="/todolist" element={<TodolistScreen />} />
              <Route path="/dashboard" element={<AdminDashboardScree />} />
              <Route path="/userlist" element={<AdminUserList />} />
              <Route path="/adminchat" element={<AdminChatScreen />} />
            </Routes>
            <ChatBox />
          </Container>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
