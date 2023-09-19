import { Routes, Route } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Main from '../Pages/Mian/Main';
import Second from "../Pages/Second/Second";

interface AppRoutesInterface {}

const AppRoutes = (props: AppRoutesInterface) => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Main />} />
        <Route path="second" element={<Second />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
