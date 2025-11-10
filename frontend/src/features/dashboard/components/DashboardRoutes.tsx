import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../pages/DashboardLayout";
import TrainingPlanner from "../../training/pages/TrainingPlanner";
import TrainingAttendance from "../../training/pages/TrainingAttendance";
import Dashboard from "../pages/Dashboard";

export default function DashboardRoutes() {

    return (
        <Routes>
            <Route element={<DashboardLayout />}>
            <Route index element={<Dashboard />} /> {/* dashboard */}
            <Route path="training/training-planner" element={<TrainingPlanner />}/> {/* STP Creation */} 
            <Route path="training/training-attendance" element={<TrainingAttendance />}/> {/* Add Participant Attandance */} 
            
            </Route>
        </Routes>
    )
}