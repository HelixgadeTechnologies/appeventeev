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
import CreateEventSecond from "./pages/CreateEvent/CreateEventSecond";
import CreateEventThird from "./pages/CreateEvent/CreateEventThird";
import CreateEventFourth from "./pages/CreateEvent/CreateEventFourth";


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
        <Route path="/create-event-setup-2" element={<CreateEventSecond/>} /> 
        <Route path="/create-event-setup-3" element={<CreateEventThird/>} /> 
        <Route path="/create-event-setup-4" element={<CreateEventFourth/>} /> 
      </Route>
    )
  )
  return (
    <RouterProvider router={routes}/>
  );
};

export default App;
