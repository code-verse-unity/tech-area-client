import { Route, Routes as ReactRoutes, useLocation } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import HomePage from "@/features/question/pages/HomePage";

const Routes = () => {
  const location = useLocation();

  return (
    <ReactRoutes location={location} key={location.key}>
      <Route path="/" element={<RootLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="users" element={<HomePage />} />
        <Route path="users/:userId" element={<HomePage />} />
        <Route path="tags" element={<HomePage />} />
        <Route path="questions" element={<HomePage />} />
        <Route path="questions/:questionId" element={<HomePage />} />
        <Route path="events" element={<HomePage />} />
        <Route path="challenges" element={<HomePage />} />
        <Route path="profile" element={<HomePage />} />
      </Route>

      <Route path="/auth" element={<HomePage />}>
        <Route path="login" element={<HomePage />} />
        <Route path="register" element={<HomePage />} />
        <Route path="forgot-password" element={<HomePage />} />
        <Route path="reset-password" element={<HomePage />} />
      </Route>
      <Route path="*" element={<HomePage />} />
    </ReactRoutes>
  );
};

export default Routes;
