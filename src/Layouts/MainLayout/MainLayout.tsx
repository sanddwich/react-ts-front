import { Container } from "react-bootstrap";
import "./MainLayout.scss";
import MainHeader from "./MainHeader/MainHeader";
import MainBody from "./MainBody/MainBody";
import {Outlet} from 'react-router-dom'
import MainFooter from "./MainFooter/MainFooter";

interface MainLayoutInterface {}

const MainLayout = (props: MainLayoutInterface) => {
  return (
    <Container fluid className="MainLayout p-0">
      <MainHeader />

      <MainBody>
        <Outlet />
      </MainBody>

      <MainFooter />
    </Container>
  );
};

export default MainLayout;
