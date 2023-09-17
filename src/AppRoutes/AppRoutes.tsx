import { Routes, Route } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Main from '../Pages/Mian/Main';

interface AppRoutesInterface {}

const AppRoutes = (props: AppRoutesInterface) => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Main />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
