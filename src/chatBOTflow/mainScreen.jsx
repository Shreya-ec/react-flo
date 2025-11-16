import React, { useEffect, useRef, useState } from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/solid";
import {
  Button,
  Card,
  Modal,
  OverlayTrigger,
  ProgressBar,
  Tooltip,
} from "react-bootstrap";
import { Routes } from "routes";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import HorizontalFlow from "./flowScreen";
import { IoChevronBack } from "react-icons/io5";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import whatsappPic from "../assets/img/mobileScreens/Whatsapp.png";

export default () => {
  const history = useHistory();

  const [chatDetails] = useState(
    JSON.parse(localStorage.getItem("chatDetails")) || {}
  );

  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reason, setReason] = useState("");
  const [variant, setVariant] = useState("primary");

  const [chatFlow, setChatFlow] = useState([]);

  const [expanded, setExpanded] = useState(false);

  const getChannelIcon = (channelName) => {
    switch (channelName) {
      case "SMS":
        return <AiFillMessage style={{ color: "blue" }} />;
      case "WhatsApp":
        return <IoLogoWhatsapp style={{ color: "#25D366" }} />;
      case "RCS":
        return <BiSolidMessageSquareDetail style={{ color: "darkorange" }} />;
      default:
        return null;
    }
  };

  const handleFlowData = (data) => {
    setChatFlow(data);
  };

  const saveFlow = () => {
    if (chatDetails.id) {
      // const postData = {
      //   ...chatDetails,
      //   id: chatDetails.id,
      //   flow: chatFlow,
      // };
      // console.log("updateFlow postData", postData);

      setShowModal(true);
      setReason("Flow creation successful!");
      setVariant("tertiary");
      setProgress(100);
    } else {
      const postData = {
        ...chatDetails,
        flow: chatFlow,
      };
      console.log("saveChatFlow postData", postData);
localStorage.setItem("chatDetails", JSON.stringify(postData));
      setShowModal(true);
      setReason("Flow creation successful!");
      setVariant("tertiary");
      setProgress(100);
    }
  };

  const boxRef = useRef();

  const toggleFullScreen = () => {
    if (!expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

    useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) {
        // User exited fullscreen manually (Esc, etc.)
        setExpanded(false);
      }
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // MODAL
  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setProgress(0);
      history.push(Routes.ChatBot.path);
    }, 100);
    setReason("");
    setVariant("primary");
  };

  useEffect(() => {
    if (showModal) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return Math.min(prevProgress + 2.5, 95); //95 automatic, 100 only after API response
        });
      }, 100);
    }
  }, [showModal]);



  return (
    <div className="d-flex flex-row-reverse gap-2 m-3">
      <div className="img-cont">
        <img src={whatsappPic} alt="whatsapp preview" />
        <div classname="preview-cont"></div>
      </div>

      <div ref={boxRef} className={expanded ? "fake-fullscreen flow-main-screen" : "flow-main-screen"}>
        {/* headers */}
        <div className="d-flex justify-content-between align-items-center pb-2">
          <div className="d-flex flex-column p-0 w-75">
            <div className="d-flex align-items-center">
              <span className="me-2 fs-4 d-flex align-items-center">
                {getChannelIcon(chatDetails?.channel)}
              </span>
              <Card.Title className="me-2 mb-0 text-white text-truncate">
                {chatDetails?.name.toUpperCase()}
              </Card.Title>
            </div>
            <p
              className="m-0 truncate-twoline"
              style={{ color: "#c4c2c2", fontSize: "0.8rem" }}
            >
              {chatDetails?.description}
            </p>
          </div>
          <div className="d-flex">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip className="m-0">Save</Tooltip>}
            >
              <Button
                variant="secondary"
                type="submit"
                className="scale-up-2 me-2"
                onClick={saveFlow}
              >
                Save
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip className="m-0">
                  {expanded ? "Exit " : ""}Full Screen
                </Tooltip>
              }
            >
              <Button
                variant="secondary"
                type="submit"
                className="scale-up-2 me-2"
                onClick={toggleFullScreen}
              >
                {expanded ? (
                  <MdFullscreenExit className="icon icon-xs" />
                ) : (
                  <MdFullscreen className="icon icon-xs" />
                )}
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip className="m-0">Back</Tooltip>}
            >
              <Button
                className="scale-up-2 me-2"
                as={Link}
                to={Routes.ChatBot.path}
              >
                <IoChevronBack className="icon icon-xs" />
              </Button>
            </OverlayTrigger>
          </div>
        </div>

        {/* flow screen */}
        <HorizontalFlow onDataChange={handleFlowData} isFullScreen={expanded} boxRef={boxRef} />
      </div>

      {/* after API Hit */}
      <Modal
        centered
        show={showModal}
        onHide={handleCloseModal}
        className={`modal-${variant}`}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="mx-auto">
          <p className="lead mb-0 text-white">Creating ChatBot Flow</p>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="py-3 px-5 text-center">
            {progress !== 100 ? (
              <span className="modal-icon display-1">
                <ClockIcon className="icon icon-xl text-white" />
              </span>
            ) : variant === "tertiary" ? (
              <span className="modal-icon display-1">
                <CheckCircleIcon className="icon icon-xl text-white" />
              </span>
            ) : (
              <span className="modal-icon display-1">
                <ShieldExclamationIcon className="icon icon-xl text-white" />
              </span>
            )}

            <Modal.Title className="text-white mb-3">
              {progress !== 100 ? (
                <h3>Sending Request</h3>
              ) : variant === "tertiary" ? (
                <h3>ChatBot Flow Created Successfully</h3>
              ) : (
                <h3>Something Went Wrong!</h3>
              )}
            </Modal.Title>
            <ProgressBar
              variant="primary"
              now={progress}
              min={0}
              max={100}
              animated
            />
            {variant !== "tertiary" ? (
              <p className="mb-4 text-danger">{reason}</p>
            ) : (
              ""
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center pt-0 pb-3">
          <Button
            variant="white"
            size="sm"
            className="text-primary"
            onClick={handleCloseModal}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
