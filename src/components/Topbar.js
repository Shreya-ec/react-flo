import React from "react";
import {
  Image,
  Navbar,
  Container,
  Button,
} from "react-bootstrap";

import Profile from "assets/img/team/profile-picture.avif";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Routes } from "routes";
import { useHistory } from "react-router-dom";

export default () => {
  const name = localStorage.getItem("chatbotUser");
  const history = useHistory();

  return (
    <Navbar
      expand
      variant="dark"
      className="bg-gray-200 navbar-top navbar-dashboard m-3 p-2"
    >
      <Container fluid className="px-0">
          <div className="w-100 d-flex align-items-center">
            <div className="media d-flex align-items-center">
              <Image src={Profile} className="avatar rounded-circle" />
              <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                <span className="mb-0 font-base fw-bold text-gray-900">
                  👋 Welcome {name || "Your Name"}!
                </span>
              </div>
            </div>
            <Button
              onClick={() => {
                history.push(Routes.Presentation.path);
                localStorage.clear();
              }}
              variant="secondary"
              size="sm"
              className="d-inline-flex align-items-center flex-nowrap ms-auto"
            >
              <RiLogoutCircleRLine className="icon icon-xs me-2" />
              Logout
            </Button>
          </div>
      </Container>
    </Navbar>
  );
};
