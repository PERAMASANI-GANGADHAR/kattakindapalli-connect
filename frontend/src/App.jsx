import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. ComplaintProvider ని ఇంపార్ట్ చేసుకో
import { ComplaintProvider } from "./components/ComplaintContext";

import Home from "./pages/Home";
import Farmer from "./pages/Farmers";
import Student from "./pages/Student";
import Library from "./pages/Library";
import Schemes from "./pages/Schemes";
import ReportProblem from "./pages/ReportProblem";
import TrackComplaint from "./pages/TrackComplaint";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";

function App() {
  return (
    // 2. BrowserRouter పైన ComplaintProvider తో Wrap చేయి
    <ComplaintProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/student" element={<Student />} />
          <Route path="/library" element={<Library />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/report-problem" element={<ReportProblem />} />
          <Route path="/track" element={<TrackComplaint />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ComplaintProvider>
  );
}

export default App;