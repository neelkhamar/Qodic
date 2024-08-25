import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { RedirectRoute } from "./RedirectRoute";
import PublicRoute from "./PublicRoute";
import PageLoader from "../Components/Common/PageLoader/PageLoader";

// Dynamically import the component
const Login = lazy(() => import("../Components/Auth/Login/Login"));
const Register = lazy(() => import("../Components/Auth/Register/Register"));
const Dashboard = lazy(() => import("../Components/Dashboard/Dashboard"));

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<RedirectRoute path="/dashboard" />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route path="/auth">
          <Route
            path="/auth/Login"
            element={<PublicRoute element={<Login />} />}
          />
          <Route
            path="/auth/register"
            element={<PublicRoute element={<Register />} />}
          />
        </Route>
        <Route path="*" element={<RedirectRoute path="/dashboard" />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
