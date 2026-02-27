import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import WatchPage from "./components/WatchPage";
import SearchFeed from "./components/SearchFeed";
import Navbar from "./components/Navbar";
import History from "./components/History";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}