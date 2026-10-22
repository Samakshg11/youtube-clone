import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import WatchPage from "./components/WatchPage";
import SearchFeed from "./components/SearchFeed";
import Navbar from "./components/Navbar";
import History from "./components/History";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="app-shell__glow app-shell__glow--left" />
        <div className="app-shell__glow app-shell__glow--right" />
        <div className="app-shell__grid" />
        <Navbar />
        <main className="relative z-10 flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/history" element={<History />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </BrowserRouter>
  );
}
