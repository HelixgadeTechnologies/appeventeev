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

const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={ <RootLayout/> }>
        <Route index element={<SignIn/> } /> 
        <Route path="/forgot-password" element={<ForgotPassword/>} />
      </Route>
    )
  )
  return (
    <RouterProvider router={routes}/>
  );
};

export default App;
