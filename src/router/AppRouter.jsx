import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { getEnvVariables } from "../calendar/helpers";

export const AppRouter = () => {
  const authStatus = "Not-Authenticated";
  // console.log(getEnvVariables());
  return (
    <>
      <Routes>
        {authStatus === "Not-Authenticated" ? (
          <Route path="/auth/*" element={<LoginPage />} />
        ) : (
          <Route path="/*" element={<CalendarPage />} />
        )}

        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </>
  );
};
