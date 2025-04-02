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
import TicketPage from "./pages/CreateTickets/CreateTicketPage";
import AddTicket from "./pages/CreateTickets/TicketForms";

import ResetPassword from "./pages/SignIn/ResetPassword";
import AllEventsPage from "./pages/AllEventsPage";
import Attendees from "./pages/Attendees"
import ProfileSettings from "./pages/settings/SettingsPage";
import EventDetails from "./pages/AllEventsPage/EventDetails";
import TicketWrapper from "./pages/CreateTickets/TicketWrapper";


const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={ <RootLayout/> }>

        {/* auth routes for signup  and signIn process */}
        <Route index element={<SignIn/> } /> 
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route path="/OrganizationDetails" element={<OrgForm />} />
        <Route path="/create-new-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard/> } />
       

        {/* create event routes */}
        <Route path="/create-event-setup-1" element={<CreateEventFirst/>} />
        <Route path="/create-event-setup-2" element={<CreateEventSecond/>} /> 
        <Route path="/create-event-setup-3" element={<CreateEventThird/>} /> 
        <Route path="/create-event-setup-4" element={<CreateEventFourth/>} /> 

        {/* all events route */}
        <Route path="/all-events" element={<AllEventsPage/>} />
        <Route path="/all-events/:id" element={<EventDetails/>} />

        {/* create ticket routes */}
        <Route path="/tickets/:id" element={
          <TicketWrapper>
            <TicketPage />
          </TicketWrapper>
        } />
        <Route path="/create-ticket" element={<AddTicket/>} />

        {/* check-in routes */}
        <Route path="/attendees" element={<Attendees/>} />

        {/* settings route  */}
        <Route path="/Profile-settings" element={<ProfileSettings /> } />


        
      </Route>
    )
  )
  return (
    <RouterProvider router={routes}/>
  );
};

export default App;
