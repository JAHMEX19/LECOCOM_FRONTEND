import {BrowserRouter, Routes , Route } from 'react-router-dom';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import RegisterView from './views/RegisterView';
import AboutView from './views/AboutView';
import TreatmentsView from './views/TreatmentsView';
import AppointmentsView from './views/AppointmentsView';
import Headers from './layouts/Headers';
import ProfileView from './views/ProfileView';
import ClientLayout from './layouts/ClientLayout';
import WellnessView from './views/WellnessView';
import AdminView from './views/AdminView';


export default function Router() {
  return (
    <BrowserRouter>
      <Routes >
        <Route element={<Headers/>}>
            <Route path="/" element={<HomeView/>} />
            <Route path="/nosotros" element={<AboutView/>} />
            <Route path="/tratamientos" element={<TreatmentsView/>} />
            <Route path="/agenda" element={<AppointmentsView/>} />
        </Route>      
        <Route element={<Headers/>}>
            <Route path="/user/login" element={<LoginView />} />
            <Route path="/user/register" element={<RegisterView />} />
        </Route>

        <Route element={<ClientLayout/>}>
            <Route path="/user/profile" element={<ProfileView/>} />
            <Route path="/user/wellness" element={<WellnessView/>} />
            <Route path="/admin" element={<AdminView/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}