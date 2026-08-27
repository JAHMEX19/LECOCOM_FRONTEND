import {BrowserRouter, Routes , Route } from 'react-router-dom';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import RegisterView from './views/RegisterView';
import AboutView from './views/AboutView';
import AppointmentsView from './views/AppointmentsView';
import Headers from './layouts/Headers';

import ClientLayout from './layouts/ClientLayout';
import WellnessView from './components/WellnessView';
import AdminView from './components/FormServices';
import ServiciosView from './views/ServiciosView';
import FormProfileView from './components/FormProfileView';
import PromotionsView from './views/PromotionsView';


export default function Router() {
  return (
    <BrowserRouter>
      <Routes >
        <Route element={<Headers/>}>
            <Route path="/" element={<HomeView/>} />
            <Route path="/nosotros" element={<AboutView/>} />
            <Route path="/servicios" element={<ServiciosView/>} />
            <Route path="/promociones" element={<PromotionsView/>} />
            <Route path="/agenda" element={<AppointmentsView/>} />
        </Route>      

        {/* Grupo de rutas de Usuario Invitado */}
          <Route path="/user">
            <Route path="login" element={<LoginView />} />   
          </Route>   

        <Route path="/auth" element={<ClientLayout />}>
          <Route path="profile" element={<FormProfileView />} />
          <Route path="wellness" element={<WellnessView />} />
          <Route path="admin/servicios" element={<AdminView />} />
          <Route path="admin/promociones" element={<AdminView />} />
          <Route path="admin/register" element={<RegisterView />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}