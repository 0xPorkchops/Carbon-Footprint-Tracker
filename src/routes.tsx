import { Routes, Route } from "react-router-dom";
import Dashboard from "@/Dashboard";
import Resources from "@/Resources";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/resources" element={<Resources />} />
    </Routes>
  );
}
