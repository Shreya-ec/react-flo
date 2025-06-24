import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import {
  Card,
  Modal,
  Form,
  Button,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  ToastContainer,
} from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { TbEdit, TbTrash } from "react-icons/tb";
import { IoPauseCircleOutline, IoPlay } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { Routes } from "routes";
import { useHistory } from "react-router-dom";
import { Toast } from "react-bootstrap";

export default () => {
  const history = useHistory();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const [showModal, setShowModal] = useState(false);
  const [channelOptions] = useState([
    { value: "WhatsApp", label: "WhatsApp", icon: <IoLogoWhatsapp /> },
  ]);
  const [channel, setChannel] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const [cards, setCards] = useState([]);

  const SwalWithBootstrapButtons = withReactContent(
    Swal.mixin({
      customClass: {
        confirmButton: "btn btn-primary me-3",
        cancelButton: "btn btn-gray",
      },
      buttonsStyling: false,
    })
  );

  useEffect(() => {
    console.log("jabba agaya");
    // fetchChatCards();
  }, []);

  // const fetchChatCards = async () => {
  //   // try {
  //   //   const response = await getListofChats();
  //   //   if (response?.data?.statusCode === 200) {
  //   //     setCards(response?.data?.data?.queryData);
  //   //   } else {
  //   //     setCards([]);
  //   //   }
  //   // } catch (error) {
  //   //   alert(error.message);
  //   // }
  // };

  const handleAddChatbot = () => {
    setShowModal(true);
  };

  // submits modal data, goes to flow screen
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    let formErrors = {};
    if (!channel) {
      formErrors.channel = "Channel is required";
    }
    if (!name) {
      formErrors.name = "Name is required";
    }
    if (!description) {
      formErrors.description = "Description is required";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Prevent form submission if validation fails
    }

    // Adding a new card
    const newCard = {
      channel: channel?.label,
      name: name,
      description: description,
    };
    setShowModal(false);
    history.push(Routes.ChatFlowScreen.path);
    localStorage.setItem("chatDetails", JSON.stringify(newCard));
    setChannel(null);
    setName("");
    setDescription("");
    setErrors({});
  };

  const handleDelete = (id) => {
    setCards(cards.filter((card) => card.id !== id));
    SwalWithBootstrapButtons.fire(
      "Deleted",
      "Chatbot deleted successfully!",
      "success"
    );
  };

  const handleStatus = async (id, status) => {
    const updatedStatus = status === "inactive" ? "active" : "inactive";

    const postData = {
      flowId: id,
      status: updatedStatus,
    };

    setToastVariant("success");
    setToastMessage("Status updated successfully");
    setShowToast(true);
  };

  const handleEdit = (id) => {
    // const cardToEdit = cards.find((card) => card.id === id);
    // history.push(Routes.ChatFlowScreen.path);
    // localStorage.setItem("chatDetails", JSON.stringify(cardToEdit));
  };

  // Clear error when user starts typing or selects an option
  const handleInputChange = (e, field) => {
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "description") {
      setDescription(e.target.value);
    }
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setErrors((prevErrors) => ({ ...prevErrors, channel: "" }));
      setChannel(selectedOption);
    }
  };

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

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toastVariant}
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Breadcrumb and Heading */}
      <div className="d-flex justify-content-between align-items-start m-3">
        <div className="d-block w-75">
          <h4>Chatbot Conversation Designer</h4>
          <b>
            Design, simulate, and deploy intelligent chatbot conversations with
            ease.
          </b>
          <p>
            Create dynamic flows using drag-and-drop nodes for bot messages,
            user inputs, conditions, and API calls. This visual builder helps
            you plan and manage conversational logic without writing code.
          </p>
        </div>

        {/* Add Chatbot Button */}
        <Button
          onClick={handleAddChatbot}
          variant="secondary"
          size="sm"
          className="ms-auto d-inline-flex align-items-center flex-nowrap"
        >
          <PlusIcon className="icon icon-xs me-2" />
          Create Flow
        </Button>
      </div>

      {/* Create Chatbot Button and Cards  */}
      <div className="d-flex align-items-center flex-wrap gap-3 mb-4">
        {/* Chatbot Cards */}
        <div className="d-flex flex-wrap gap-3">
          {cards.map((card) => (
            <Card
              key={card.id}
              className="shadow"
              style={{
                width: "270px",
                height: "200px",
                position: "relative",
                padding: "10px",
                textAlign: "left",
              }}
            >
              {/* Card Content */}
              <Card.Body className="d-flex flex-column p-0">
                <div className="d-flex align-items-center border-bottom pb-1">
                  <span className="me-2 fs-4 d-flex align-items-center">
                    {getChannelIcon(card.channel)}
                  </span>
                  <Card.Title className="mb-0 text-truncate">
                    {card.name.toUpperCase()}
                  </Card.Title>
                </div>
                <div className="mt-2">
                  <Card.Text
                    style={{
                      fontSize: "12px",
                      marginTop: "2px",
                      marginBottom: "0px",
                    }}
                    className="truncate-twoline"
                  >
                    {card.description}
                  </Card.Text>
                </div>
                <div className="mt-2 d-flex align-items-center">
                  <Card.Text
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "0px",
                    }}
                    className="text-truncate"
                  >
                    Status:{" "}
                    <span
                      className={
                        card.status === "inactive"
                          ? "text-danger text-capitalize"
                          : "text-success text-capitalize"
                      }
                    >
                      {card.status}
                    </span>
                  </Card.Text>
                </div>

                {/* Edit, Delete, Play, and Pause Buttons */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* Edit Button */}
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="m-0">Edit</Tooltip>}
                  >
                    <Card.Link onClick={() => handleEdit(card.id)}>
                      <TbEdit className="icon icon-wide text-info" />
                    </Card.Link>
                  </OverlayTrigger>

                  {/* Delete Button */}
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="m-0">Delete</Tooltip>}
                  >
                    <Card.Link onClick={() => handleDelete(card.id)}>
                      <TbTrash className="icon icon-wide text-danger" />
                    </Card.Link>
                  </OverlayTrigger>

                  {/* Play or Pause Button */}
                  {card.status === "inactive" ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip className="m-0">Activate</Tooltip>}
                    >
                      <Card.Link
                        onClick={() => handleStatus(card.id, card.status)}
                      >
                        <IoPlay className="icon icon-wide text-success" />
                      </Card.Link>
                    </OverlayTrigger>
                  ) : (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip className="m-0">Pause</Tooltip>}
                    >
                      <Card.Link
                        onClick={() => handleStatus(card.id, card.status)}
                      >
                        <IoPauseCircleOutline className="icon icon-wide text-warning" />
                      </Card.Link>
                    </OverlayTrigger>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for Add/Edit Chatbot */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Chatbot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Channel Select with Validation Error */}
            <Form.Group className="mb-3">
              <Form.Label>Select Channel</Form.Label>
              <Select
                options={channelOptions}
                value={channel}
                onChange={handleSelectChange}
                placeholder="Choose channel"
              />
              {errors.channel && (
                <div className="text-danger">{errors.channel}</div>
              )}
            </Form.Group>

            {/* Name Input with Validation Error */}
            <Form.Group className="mb-3">
              <Form.Label>Flow Name</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter flow-name"
                  value={name}
                  onChange={(e) => handleInputChange(e, "name")}
                />
              </InputGroup>
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </Form.Group>

            {/* Description Textarea with Validation Error */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => handleInputChange(e, "description")}
              />
              {errors.description && (
                <div className="text-danger">{errors.description}</div>
              )}
            </Form.Group>

            <Button type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
