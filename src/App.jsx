import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./contexts/ProtectedRoute";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import User from "./pages/User";
import About from "./pages/About";
import Working from "./pages/Working";
import Inspiration from "./pages/Inspiration";
import Layout from "./components/Layout";
import General from "./pages/General";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Action from "./components/Action";
import Timeline from "./components/Timeline";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/working" element={<Working />} />
          <Route path="/inspiration" element={<Inspiration />} />
        </Route>

        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/general" element={<General />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/user" element={<User />}>
            <Route path="home" element={<Home />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="action" element={<Action />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </NextThemesProvider>
  )
}

export default App;