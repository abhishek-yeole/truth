import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./contexts/ProtectedRoute";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Working from "./pages/Working";
import Inspiration from "./pages/Inspiration";
import General from "./pages/General";

import Layout from "./components/Layout";

import Auth from "./pages/Auth";
import Login from "./components/Login";
import Register from "./components/Register";

import User from "./pages/User";

import Home from "./components/Home/Home";
import HomeMain from "./components/Home/Main";
import News from "./components/Home/News";
import Trending from "./components/Home/Trending";

import Analytics from "./components/Analytics/Analytics";
import Personal from "./components/Analytics/Personal";
import SearchBy from "./components/Analytics/SearchBy";
import Charts from "./components/Analytics/Charts";
import Global from "./components/Analytics/Global";

import Action from "./components/Action/Action";
import ActionMain from "./components/Action/Main";
import MyIssues from "./components/Action/MyIssues";
import AddIssues from "./components/Action/AddIssues";
import EditIssues from "./components/Action/EditIssues";
import ReportIssues from "./components/Action/ReportIssues";

import Timeline from "./components/Timeline/Timeline";
import Main from "./components/Timeline/Main";
import UpdateIssue from "./components/Timeline/UpdateIssue";
import ReportIssue from "./components/Timeline/ReportIssue";

import Community from "./components/Community/Community";
import Explore from "./components/Community/Explore";
import Popular from "./components/Community/Popular";
import NearBy from "./components/Community/NearBy";
import MyCommunites from "./components/Community/MyCommunites";
import MyPosts from "./components/Community/MyPosts";
import SavedHistory from "./components/Community/SavedHistory";

import Settings from "./components/Settings/Settings";
import Profile from "./components/Settings/Profile";
import Permissions from "./components/Settings/Permissions";
import Security from "./components/Settings/Security";

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
            <Route path="home" element={<Home />}>
              <Route path="main" element={<HomeMain />} />
              <Route path="news" element={<News />} />
              <Route path="trending" element={<Trending />} />
            </Route>
            <Route path="analytics" element={<Analytics />} >
              <Route path="personal" element={<Personal />} />
              <Route path="searchby" element={<SearchBy />} />
              <Route path="global" element={<Global />} />
              <Route path="charts" element={<Charts />} />
            </Route>
            <Route path="timeline" element={<Timeline />} >
              <Route path="main" element={<Main />} />
              <Route path="update" element={<UpdateIssue />} />
              <Route path="update/:id" element={<UpdateIssue />} />
              <Route path="report" element={<ReportIssue />} />
              <Route path="report/:id" element={<ReportIssue />} />
            </Route>
            <Route path="action" element={<Action />}>
              <Route path="main" element={<ActionMain />} />
              <Route path="myissues" element={<MyIssues />} />
              <Route path="myissues/:id" element={<MyIssues />} />
              <Route path="add" element={<AddIssues />} />
              <Route path="edit" element={<EditIssues />} />
              <Route path="edit/:id" element={<EditIssues />} />
              <Route path="report" element={<ReportIssues />} />
              <Route path="report/:id" element={<ReportIssues />} />
            </Route>
            <Route path="community" element={<Community />} >
              <Route path="explore" element={<Explore />} />
              <Route path="popular" element={<Popular />} />
              <Route path="nearby" element={<NearBy />} />
              <Route path="mycommunities" element={<MyCommunites />} />
              <Route path="myposts" element={<MyPosts />} />
              <Route path="saved" element={<SavedHistory />} />
            </Route>
            <Route path="settings" element={<Settings />} >
              <Route path="profile" element={<Profile />} />
              <Route path="permissions" element={<Permissions />} />
              <Route path="security" element={<Security />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </NextThemesProvider>
  )
}

export default App;