import { Container } from "react-bootstrap";
import React from 'react';
import "./MainBody.scss";

interface MainBodyInterface {
  children: React.ReactNode
}

const MainBody = (props: MainBodyInterface) => {
  return (
    <Container fluid className="MainBody p-0">
      {props.children}
    </Container>
  );
};

export default MainBody;
