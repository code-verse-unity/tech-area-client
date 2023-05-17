import { Route, Routes as ReactRoutes, useLocation } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import HomePage from "@/features/question/pages/HomePage";
import QuestionsPage from "@/features/question/pages/QuestionsPage";
import { RegisterPage, LoginPage } from "@/features/auth";
import AuthLayout from "@/layouts/AuthLayout";
import QuestionDetails from "@/features/question/pages/QuestionDetails";
import ProfilePage from "@/features/profile/pages/ProfilePage";

const Routes = () => {
  const location = useLocation();

  return (
    <ReactRoutes location={location} key={location.key}>
      <Route path="/" element={<RootLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="users" element={<HomePage />} />
        <Route path="users/:userId" element={<HomePage />} />
        <Route path="tags" element={<HomePage />} />
        <Route path="questions" element={<QuestionsPage />} />
        <Route path="questions/:questionId" element={<QuestionDetails />} />
        <Route path="events" element={<HomePage />} />
        <Route path="challenges" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<HomePage />} />
        <Route path="reset-password" element={<HomePage />} />
      </Route>
      <Route path="*" element={<HomePage />} />
    </ReactRoutes>
  );
};

export default Routes;
