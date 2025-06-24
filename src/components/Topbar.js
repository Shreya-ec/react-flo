import React from "react";
import { Nav, Image, Navbar, Dropdown, Container } from "react-bootstrap";

import Profile3 from "assets/img/team/profile-picture-3.jpg";

export default () => {
  const name = localStorage.getItem("chatbotUserName");

  return (
    <Navbar
      expand
      variant="dark"
      className="bg-gray-200 navbar-top navbar-dashboard m-3 p-3"
    >
      <Container fluid className="px-0">
        <div className="d-flex w-100">
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image src={Profile3} className="avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold text-gray-900">
                      👋 Welcome {name || "Your Name"}!
                    </span>
                  </div>
                </div>
              </Dropdown.Toggle>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
