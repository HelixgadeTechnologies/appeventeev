import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/SignIn/ForgotPassword";
import SignUp from "./pages/SignUp";
import EmailVerification from "./pages/SignUp/EmailVerification";
import OrgForm from "./components/OrgForm";
import ResetPassword from "./pages/SignIn/ResetPassword";

// Protected Pages
import Dashboard from "./pages/Dashboard";
import CreateEventFirst from "./pages/CreateEvent/CreateEventFirst";
import CreateEventSecond from "./pages/CreateEvent/CreateEventSecond";
import CreateEventThird from "./pages/CreateEvent/CreateEventThird";
import CreateEventFourth from "./pages/CreateEvent/CreateEventFourth";
import TicketPage from "./pages/CreateTickets/CreateTicketPage";
import AddTicket from "./pages/CreateTickets/TicketForms";
import AllEventsPage from "./pages/AllEventsPage";
import Attendees from "./pages/Attendees";
import ProfileSettings from "./pages/settings/SettingsPage";
import TicketWrapper from "./pages/CreateTickets/TicketWrapper";
import DraftedEventDetails from "./pages/AllEventsPage/DraftedEventDetails";
import TicketWrapper from "./pages/CreateTickets/TicketWrapper";

// Edit Events
import EditEventFirst from "./pages/EditEvents/EditEventFirst";
import EditEventSecond from "./pages/EditEvents/EditEventSecond";
import EditEventThird from "./pages/EditEvents/EditEventThird";
import EditEventFour from "./pages/EditEvents/EditEventFour";
import EditDraftsFirst from "./pages/EditEvents/EditDraftsFirst";
import EditDraftsSecond from "./pages/EditEvents/EditDraftsSecond";
import EditDraftsThird from "./pages/EditEvents/EditDraftsThird";
import EditDraftsFourth from "./pages/EditEvents/EditDraftsFourth";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
 const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* Public Routes */}
      <Route index element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify" element={<EmailVerification />} />
      <Route path="/OrganizationDetails" element={<OrgForm />} />
      <Route path="/create-new-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event-setup-1" element={<CreateEventFirst />} />
        <Route path="/create-event-setup-2" element={<CreateEventSecond />} />
        <Route path="/create-event-setup-3" element={<CreateEventThird />} />
        <Route path="/create-event-setup-4" element={<CreateEventFourth />} />

        <Route path="/all-events" element={<AllEventsPage />} />
        <Route path="/all-events/:id" element={<PublishedEventDetails />} />
        <Route path="/all-events-draft/:id" element={<DraftedEventDetails />} />

        <Route path="/edit-event-step-one/:id" element={<EditEventFirst />} />
        <Route path="/edit-event-step-two/:id" element={<EditEventSecond />} />
        <Route path="/edit-event-step-three/:id" element={<EditEventThird />} />
        <Route path="/edit-event-step-four/:id" element={<EditEventFour />} />

        <Route path="/edit-draft-step-one/:id" element={<EditDraftsFirst />} />
        <Route path="/edit-draft-step-two/:id" element={<EditDraftsSecond />} />
        <Route path="/edit-draft-step-three/:id" element={<EditDraftsThird />} />
        <Route path="/edit-draft-step-four/:id" element={<EditDraftsFourth />} />

        <Route
          path="/tickets/:id"
          element={
            <TicketWrapper>
              <TicketPage />
            </TicketWrapper>
          }
        />
        <Route path="/create-ticket" element={<AddTicket />} />
        <Route path="/attendees/:id" element={<Attendees />} />
        <Route path="/Profile-settings" element={<ProfileSettings />} />
          
         {/* not found */}
        <Route path="*" element={<NotFoundPage/>} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
