import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/SignIn/ForgotPassword";
import SignUp from "./pages/SignUp";
import EmailVerification from "./pages/SignUp/EmailVerification";
import OrgForm from "./components/OrgForm";
import Dashboard from "./pages/Dashboard";
import CreateEventFirst from "./pages/CreateEvent/CreateEventFirst";


const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={ <RootLayout/> }>
        <Route index element={<SignIn/> } /> 
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route path="/OrganizationDetails" element={<OrgForm />} />
        <Route path="/dashboard" element={<Dashboard/> } />
        <Route path="/create-event-setup-1" element={<CreateEventFirst/>} />
      </Route>
    )
  )
  return (
    <RouterProvider router={routes}/>
  );
};

export default App;
