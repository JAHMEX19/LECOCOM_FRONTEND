import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import RegisterView from './views/RegisterView';
import AboutView from './views/AboutView';
import AppointmentsView from './views/AppointmentsView';
import Headers from './layouts/Headers';

import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';
import SuperAdminLayout from './layouts/superAdminLayout';

import WellnessView from './components/WellnessView';
import AdminView from './components/FormServices'; // Gestión de Servicios Admin
import FormPromotionsView from './components/FormPromotions'; // Gestión de Promociones Admin
import ServiciosView from './views/ServiciosView';
import FormProfileView from './components/FormProfileView';
import PromotionsView from './views/PromotionsView'; // Vista Pública de Promociones
import UsersManagementView from './components/UsersManagmentView';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas (Catálogo Cliente) */}
        <Route element={<Headers />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/nosotros" element={<AboutView />} />
          <Route path="/servicios" element={<ServiciosView />} />
          <Route path="/promociones" element={<PromotionsView />} />
          <Route path="/agenda" element={<AppointmentsView />} />
        </Route>      

        {/* Usuario Invitado */}
        <Route path="/user">
          <Route path="login" element={<LoginView />} />   
        </Route>   

        {/* Panel Autenticado */}
        <Route path="/auth" element={<ClientLayout />}>
          <Route path="profile" element={<FormProfileView />} />
          <Route path="wellness" element={<WellnessView />} />

          {/* Rutas protegidas para Admin y SuperAdmin */}
          <Route element={<AdminLayout />}>
            <Route path="admin/servicios" element={<AdminView />} />
            {/* 👈 Corregido: Ahora renderiza la gestión de promociones en vez de FormServices */}
            <Route path="admin/promociones" element={<FormPromotionsView />} />

            {/* Rutas exclusivas para SuperAdmin */}
            <Route element={<SuperAdminLayout />}>
              <Route path="admin/users" element={<UsersManagementView />} />
              <Route path="admin/register" element={<RegisterView />} />
            </Route>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}