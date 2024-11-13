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
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

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

        <Route path="/auth" element={<Auth />} />
        <Route path="/analytics" element={<Analytics />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/user" element={<User />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </NextThemesProvider>
  )
}

export default App;