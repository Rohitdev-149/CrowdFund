import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails'; // Import ProjectDetails page
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StartProject from './pages/StartProject';
import ScrollToTop from './components/ScrollToTop';
import Payment from './pages/Payment';
import Profile from './components/Profile'; // Import Profile component
import { RefreshProvider } from './context/RefreshContext';
import TestPayments from './components/TestPayments';


function App() {
  return (
    <RefreshProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project-details/:id" element={<ProjectDetails />} /> {/* Route for ProjectDetails */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/start-project" element={<StartProject />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
          <Route path="/test-payments" element={<TestPayments />} />
        </Routes>
        <Footer />
      </Router>
    </RefreshProvider>
  );
}

export default App;
