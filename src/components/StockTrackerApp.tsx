import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
import CompanyDetail from "./CompanyDetail";


interface Stock {
  symbol: string;
  name: string;
}

const StockTrackerApp: React.FC = () => {
  return (
    <>
      <Router>
      <div className="bg-gray-200 flex flex-col items-center min-h-screen py-20 px-3 lg:px-32 xl:px-40">
        <h1 className="text-3xl font-bold text-slate-800">Stock Tracker App</h1>
        <div className="w-full">
          <Routes>
            <Route path="/" element={<SearchBar />} />
          </Routes>

          <Routes>
            <Route path="/portfolio/:symbol" element={<CompanyDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  );
};

export default StockTrackerApp;
