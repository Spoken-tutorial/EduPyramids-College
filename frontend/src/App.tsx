
import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/homepage/ResponsiveAppBar";
import MegaMenu from "./components/homepage/AppBar";
// import FeatureTiles from "./components/homepage/HomeComponents";
import HomePage from "./pages/home/Homepage";
import DomainPage from "./pages/public/DomainsPage";
import CoursePage from "./pages/public/CoursePage";
import TutorialSearch from "./pages/public/TutorialSearch";
import LoginPage from "./features/auth/pages/LoginPage";
import DashboardLayout from "./features/dashboard/pages/DashboardLayout";
import PublicLayout from "./pages/public/PublicLayout";
import Dashboard from "./features/dashboard/pages/Dashboard";
import TrainingPlanner from "./features/training/pages/TrainingPlanner";
import TrainingAttendance from "./features/training/pages/TrainingAttendance";


export default function App(){

  return (
    <>
        {/* <ResponsiveAppBar/> */}
        {/* <MegaMenu/> */}
        {/* <HomePage /> */}
        
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/domains" element={<DomainPage />} />
            <Route path="/tutorial-search" element={<TutorialSearch />} />
            <Route path="/domains/:slug" element={<CoursePage />} />
          </Route>

         {/* Dashboard routes */}
           <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="training-planner" element={<TrainingPlanner />} />
            <Route path="training-attendance" element={<TrainingAttendance />} />
            {/* <Route path="academic-subscription" element={<AcademicSubscription />} /> */}
          </Route>

          {/* catch-all for 404 */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
    </>
  )
}
