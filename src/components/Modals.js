import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { ArchiveIcon, CalendarIcon, CameraIcon, CheckIcon, ClipboardCheckIcon, ClockIcon, EyeIcon, PaperClipIcon, PlusIcon, SelectorIcon, ShareIcon, TagIcon, TrashIcon, UserGroupIcon, XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Modal, Button, InputGroup, Image, Badge, FloatingLabel, Accordion, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';

import KanbanAvatar from "components/KanbanAvatar";
import { Members as BoardMembers, Labels as BoardLabels } from "data/kanban";
// import { DropImagesForm, DropVideosForm } from "./Forms";
import { MdAddBox, MdEdit, MdOutlineAddBox, MdOutlineSettings, MdOutlineVideocam, MdTextFields } from "react-icons/md";
import Select from 'react-select';
import { BsCartPlus } from "react-icons/bs";
import { ImImages } from "react-icons/im";
import { IoDocumentTextOutline, IoLocationOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { VscRobot } from "react-icons/vsc";
import { FaRedo, FaUserCircle } from "react-icons/fa";
import { FcPlus } from "react-icons/fc";
import { DropImagesForm, DropMediaFilesForm, DropVideosForm } from "./Forms";
import { FaList } from "react-icons/fa6";

//--------------------------------CHATBOT START---------------------------------------- 
export const UserInputModal = ({ isOpen, onClose, data, onSubmit }) => {
  const [inputfields, setInputfields] = useState({
    id: "",
    title: "",
    ResponseText: "",
    IsMedia: false,
    IsBotTerminate: false,
    IsUnknown: false,
    IsTrriggerFromAnywhere: false,
    IsEmailValidation: false,
    selectedVariable: null,
    AgentId: null,
    LabelId: null,
  });

  // Must have id for editing node,

  // Update input fields when `data` changes
  useEffect(() => {
    if (data && data.details) {
      setInputfields({
        id: data.details.id || "",
        title: data.details.data.title || "",
        ResponseText: data.details.data.ResponseText || "",
        IsMedia: data.details.data.IsMedia || false,
        IsUnknown: data.details.data.IsUnknown || false,
        IsTrriggerFromAnywhere: data.details.data.IsTrriggerFromAnywhere || false,
        IsBotTerminate: data.details.data.IsBotTerminate || false,
        IsEmailValidation: data.details.data.IsEmailValidation || false,
        selectedVariable: data.details.data.selectedVariable || null,
        AgentId: data.details.data.AgentId || null,
        LabelId: data.details.data.LabelId || null,
      });

    }
  }, [data, isOpen]);

  const handleInputs = (e) => {
    const { name, value, type, checked } = e.target;
    setInputfields((prevFields) => ({
      ...prevFields,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <Modal as={Modal.Dialog} centered show={isOpen} onHide={onClose}>
      <Form className="modal-content">
        <Modal.Header className="pb-0 border-0">
          <FaUserCircle style={{ width: "1.5em", height: "1.5em" }} />
          <h5 as={Modal.Title} className="ms-2 m-0">User Input</h5>
          <Button variant="close" onClick={onClose} />
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Title</Form.Label>
            <Form.Control
              required
              autoFocus
              type="text"
              name="title"
              value={inputfields.title}
              onChange={handleInputs}
              placeholder="Enter a title."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Enter User Message</Form.Label>
            <Form.Control
              required
              as="textarea"
              name="ResponseText"
              value={inputfields.ResponseText}
              onChange={handleInputs}
              placeholder="Add Caption here.."
            />
          </Form.Group>
          {/* Switches */}
          <Form.Check
            type="switch"
            label="Is Media?"
            id="switch1"
            name="IsMedia"
            checked={inputfields.IsMedia}
            onChange={handleInputs}
          />
          <Form.Check
            type="switch"
            label="Terminate Bot?"
            id="switch2"
            name="IsBotTerminate"
            checked={inputfields.IsBotTerminate}
            onChange={handleInputs}
          />
          <Form.Check
            type="switch"
            label="Unknown Input?"
            id="switch3"
            name="IsUnknown"
            checked={inputfields.IsUnknown}
            onChange={handleInputs}
          />
          <Form.Check
            type="switch"
            label="Trigger From Anywhere?"
            id="switch4"
            name="IsTrriggerFromAnywhere"
            checked={inputfields.IsTrriggerFromAnywhere}
            onChange={handleInputs}
          />
          <Form.Check
            type="switch"
            label="Add Validation?"
            id="switch5"
            name="IsEmailValidation"
            checked={inputfields.IsEmailValidation}
            onChange={handleInputs}
          />
          {/* Select Inputs */}
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Save to a Variable?</Form.Label>
            <Select
              placeholder="Select ONE"
              className="mb-0"
              isSearchable
              value={inputfields.selectedVariable}
            // onChange={(selected) => setInputfields((prev) => ({ ...prev, selectedVariable: selected }))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Select Agent?</Form.Label>
            <Select
              placeholder="Select ONE"
              className="mb-0"
              isSearchable
              value={inputfields.AgentId}
            // onChange={(selected) => setInputfields((prev) => ({ ...prev, AgentId: selected }))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Select Label?</Form.Label>
            <Select
              placeholder="Select ONE"
              className="mb-0"
              isSearchable
              value={inputfields.LabelId}
            // onChange={(selected) => setInputfields((prev) => ({ ...prev, LabelId: selected }))}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="justify-content-start border-0 pt-2">
          <Button variant="outline-gray-500" onClick={onClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={() => onSubmit(inputfields)}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const BotResponseModal = ({ isOpen, onClose, data, onSubmit }) => {
  const [inputfields, setInputfields] = useState({
    id: "",
    title: "",
    ResponseModels: []
  });
  const [extraFields, setExtraFields] = useState([]);    //for existing fields in case of edit


  // Update input fields when `data` changes
  useEffect(() => {

    if (data && data.details) {
      setInputfields({
        id: data.details.id || "",
        title: data.details.data.title || data.type,
        ResponseModels: data.details.data.ResponseModels || []
      });
      setExtraFields(data.details.data.ResponseModels);
    }
  }, [data, isOpen]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputfields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  // for new noed creation, NO existing fields
  const fields = {
    ResponseText: null,
    list: null,
    buttons: null,
    Product: null,
    Products: null,
    MediaFileName: null,
    ButtonType: "button",
    ButtonSubType: null,
  };

  const handleFieldChoice = (e) => {

    const MediaType = e.target.value;
    const newField = { MediaType, ...fields };

    if (!extraFields) {
      setExtraFields([newField]); // Appending new types of inputs
    } else {
      setExtraFields((prevFields) => [...prevFields, newField]); // Appending new types of inputs
    }

  };

  const handleInputChange = (targetIndex, target, value) => {
    setExtraFields((prevFields) =>
      prevFields.map((field, index) =>
        index === targetIndex ? { ...field, [target]: value } : field
      )
    );
  };

  const deleteInputs = (indx) => {
    setExtraFields((prevFields) => prevFields.filter((_, index) => index !== indx));
  };
  // adding list
  const [modalType, setModalType] = useState(null);
  const [tempIndx, setTempIndx] = useState(null);
  const addList = (index) => {
    setTempIndx(index);
    setModalType('list');
  }
  // appending in main data
  const submittedLists = (newFields) => {
    setExtraFields((prevFields) =>
      prevFields.map((field, index) =>
        index === tempIndx ? { ...field, ...newFields } : field
      )
    );
    closeModal();
  }
  // adding buttons
  const addButton = (index) => {
    setTempIndx(index); //index of input where button is
    setModalType('button');
  }
  const closeModal = () => {
    setTempIndx(null);
    setModalType(false);
  };
  // appending in main data
  const submittedButtons = (newFields) => {
    setExtraFields((prevFields) =>
      prevFields.map((field, index) =>
        index === tempIndx ? { ...field, ...newFields } : field
      )
    );
    closeModal();
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFinalFields = {
      ...inputfields,
      ResponseModels: [...extraFields]
    };

    onSubmit(updatedFinalFields);

  }



  if (!isOpen) return null;

  return (
    <Modal as={Modal.Dialog} centered show={isOpen} onHide={onClose}>
      <Form className="modal-content">
        <Modal.Header className="pb-0 border-0">
          <VscRobot style={{ width: '1.5em', height: '1.5em' }} />
          <h5 as={Modal.Title} className="ms-2 m-0">
            {data.type === 'botResponse' ? 'Bot Response' : data.type === 'start' ? 'Welcome Node' : 'Fallback'}
          </h5>
          <Button variant="close" onClick={onClose} />
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Title</Form.Label>
            <Form.Control
              required
              autoFocus
              type="text"
              name="title"
              value={inputfields.title}
              onChange={handleInputs}
              placeholder='Enter a title.'
            />
          </Form.Group>

          {extraFields && extraFields.map((field, index) => (
            <div key={index}>
              {field.MediaType === "TEXT" && (
                <div className="d-flex my-2">
                  <div className="card light w-100 p-2">
                    <div className="d-flex align-items-top mb-1">
                      <Form.Label className="mb-0">Enter Bot Response Text</Form.Label>
                      {(!field.buttons && !field.list) &&
                        <>
                          <Button onClick={() => addList(index)} bsPrefix="text" style={{ border: "none", background: "none", padding: 0, color: "inherit" }} variant="primary" className="d-flex align-items-center text-success ms-auto fw-bold">
                            <FcPlus className="icon icon-xs me-2" />List
                          </Button>
                          <Button onClick={() => addButton(index)} bsPrefix="text" style={{ border: "none", background: "none", padding: 0, color: "inherit" }} variant="primary" className="d-flex align-items-center text-success fw-bold ms-2">
                            <FcPlus className="icon icon-xs me-2" />Button
                          </Button>
                        </>
                      }
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        required
                        placeholder='Enter Bot Response Text'
                        value={field.ResponseText || ''}
                        onChange={(e) => handleInputChange(index, "ResponseText", e.target.value)}
                      />
                    </div>
                    {field.list?.ListButtonText &&
                      <Button variant="info" className="mt-2 w-100 d-flex align-items-center justify-content-center">
                        <FaList className="me-2" />
                        {field.list.ListButtonText}
                      </Button>
                    }
                    {field.buttons &&
                      field.buttons.map((btn, indx) =>
                        <div key={indx}>
                          <Button variant="info" className="mt-2 w-100">
                            {btn.text}
                          </Button>
                        </div>
                      )}
                  </div>
                  <OverlayTrigger placement="top" overlay={<Tooltip className="m-0">Delete Input</Tooltip>}>
                    <Card.Link className="ms-2" onClick={() => deleteInputs(index)}>
                      <XCircleIcon className="icon icon-xs text-danger" />
                    </Card.Link>
                  </OverlayTrigger>
                </div>
              )}
              {field.MediaType === "IMAGE" && (
                <div className="d-flex my-2">
                  <div className="card light w-100 p-2">
                    <div className="d-flex align-items-top mb-1">
                      <Form.Label className="mb-0">Add Image</Form.Label>
                      {!field.buttons && <Button onClick={() => addButton(index)} bsPrefix="text" style={{ border: "none", background: "none", padding: 0, color: "inherit" }} variant="primary" className="d-flex align-items-center text-success fw-bold ms-auto">
                        <FcPlus className="icon icon-xs me-2" />Button
                      </Button>}
                    </div>
                    <div>
                      {field.MediaFileName ?
                        <img src={field.MediaFileName} alt="input-image" />
                        :
                        <DropImagesForm onFilesUploaded={(e) => handleInputChange(index, "MediaFileName", e.target.value)} />
                      }
                      <Form.Control
                        type="text"
                        required
                        placeholder='Add Caption here...'
                        value={field.ResponseText || ''}
                        onChange={(e) => handleInputChange(index, "ResponseText", e.target.value)}
                      />
                      {field.buttons &&
                        field.buttons.map((btn, indx) =>
                          <div key={indx}>
                            <Button variant="info" className="mt-2 w-100">
                              {btn.text}
                            </Button>
                          </div>
                        )}
                    </div>
                  </div>
                  <OverlayTrigger placement="top" overlay={<Tooltip className="m-0">Delete Input</Tooltip>}>
                    <Card.Link className="ms-2" onClick={() => deleteInputs(index)}>
                      <XCircleIcon className="icon icon-xs text-danger" />
                    </Card.Link>
                  </OverlayTrigger>
                </div>
              )}
              {field.MediaType === "VIDEO" && (
                <div className="d-flex my-2">
                  <div className="card light w-100 p-2">
                    <div className="d-flex align-items-top mb-1">
                      <Form.Label className="mb-0">Add Video</Form.Label>
                      {(!field.buttons && !field.list) &&
                        <>
                          <Button onClick={() => addList(index)} bsPrefix="text" style={{ border: "none", background: "none", padding: 0, color: "inherit" }} variant="primary" className="d-flex align-items-center text-success ms-auto fw-bold">
                            <FcPlus className="icon icon-xs me-2" />List
                          </Button>
                          <Button onClick={() => addButton(index)} bsPrefix="text" style={{ border: "none", background: "none", padding: 0, color: "inherit" }} variant="primary" className="d-flex align-items-center text-success fw-bold ms-2">
                            <FcPlus className="icon icon-xs me-2" />Button
                          </Button>
                        </>
                      }
                    </div>
                    <div>
                      <DropVideosForm onFilesUploaded={(e) => handleInputChange(index, "MediaFileName", e.target.value)} />
                      <Form.Control
                        type="text"
                        required
                        placeholder='Add Caption here...'
                        value={field.ResponseText || ''}
                        onChange={(e) => handleInputChange(index, "ResponseText", e.target.value)}
                      />
                      {field.buttons &&
                        field.buttons.map((btn, indx) =>
                          <div key={indx}>
                            <Button variant="info" className="mt-2 w-100">
                              {btn.text}
                            </Button>
                          </div>
                        )}
                    </div>
                  </div>
                  <OverlayTrigger placement="top" overlay={<Tooltip className="m-0">Delete Input</Tooltip>}>
                    <Card.Link className="ms-2" onClick={() => deleteInputs(index)}>
                      <XCircleIcon className="icon icon-xs text-danger" />
                    </Card.Link>
                  </OverlayTrigger>
                </div>
              )}
              {field.MediaType === "DOC" && (
                <div className="d-flex my-2">
                  <div className="card light w-100 p-2">
                    <div className="d-flex align-items-top mb-1">
                      <Form.Label className="mb-0">Add Documents</Form.Label>
                      {(!field.buttons && !field.list) &&
                        <>
                          <Button onClick={() => addList(index)} bsPrefix="text" style={{ border: "none", background: "none", padding: 0, color: "inherit" }} variant="primary" className="d-flex align-items-center text-success ms-auto fw-bold">
                            <FcPlus className="icon icon-xs me-2" />List
                          </Button>
                          <Button onClick={() => addButton(index)} bsPrefix="text" style={{ border: "none", background: "none", padding: 0, color: "inherit" }} variant="primary" className="d-flex align-items-center text-success fw-bold ms-2">
                            <FcPlus className="icon icon-xs me-2" />Button
                          </Button>
                        </>
                      }
                    </div>
                    <div>
                      <DropMediaFilesForm onFilesUploaded={(e) => handleInputChange(index, "MediaFileName", e.target.value)} />
                      <Form.Control
                        type="text"
                        required
                        placeholder='Add Caption here...'
                        value={field.ResponseText || ''}
                        onChange={(e) => handleInputChange(index, "ResponseText", e.target.value)}
                      />
                      {field.buttons &&
                        field.buttons.map((btn, indx) =>
                          <div key={indx}>
                            <Button variant="info" className="mt-2 w-100">
                              {btn.text}
                            </Button>
                          </div>
                        )}
                    </div>
                  </div>
                  <OverlayTrigger placement="top" overlay={<Tooltip className="m-0">Delete Input</Tooltip>}>
                    <Card.Link className="ms-2" onClick={() => deleteInputs(index)}>
                      <XCircleIcon className="icon icon-xs text-danger" />
                    </Card.Link>
                  </OverlayTrigger>
                </div>
              )}
              {field.MediaType === "PRODUCT" && (
                <div className="d-flex my-2">
                  <div className="card light w-100 p-2">
                    <div className="d-flex align-items-top mb-1">
                      <Form.Label className="mb-0">Single Product</Form.Label>
                      <Button onClick={() => addList(index)} bsPrefix="text" style={{ border: "none", background: "none", padding: 0, color: "inherit" }} variant="primary" className="d-flex align-items-center text-success ms-auto fw-bold">
                        <FcPlus className="icon icon-xs me-2" />Product
                      </Button>
                    </div>
                    <div>
                      <Form.Control
                        as="textarea"
                        rows="4"
                        required
                        placeholder="Body Text"
                        value={field.ResponseText || ''}
                        onChange={(e) => handleInputChange(index, "ResponseText", e.target.value)}
                      />
                      <Form.Control
                        type="text"
                        required
                        placeholder='Footer Text'
                        value={field.ResponseText || ''}
                        onChange={(e) => handleInputChange(index, "ResponseText", e.target.value)}
                      />
                    </div>
                  </div>
                  <OverlayTrigger placement="top" overlay={<Tooltip className="m-0">Delete Input</Tooltip>}>
                    <Card.Link className="ms-2" onClick={() => deleteInputs(index)}>
                      <XCircleIcon className="icon icon-xs text-danger" />
                    </Card.Link>
                  </OverlayTrigger>
                </div>
              )}
              {field.MediaType === "PRODUCT_LIST" && (
                <div className="d-flex my-2">
                  <div className="card light w-100 p-2">
                    <div className="d-flex align-items-top mb-1">
                      <Form.Label className="mb-0">Multiple Products</Form.Label>
                      <Button onClick={() => addList(index)} bsPrefix="text" style={{ border: "none", background: "none", padding: 0, color: "inherit" }} variant="primary" className="d-flex align-items-center text-success ms-auto fw-bold">
                        <FcPlus className="icon icon-xs me-2" />Products
                      </Button>
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        required
                        placeholder='Header Text'
                        value={field.ResponseText || ''}
                        onChange={(e) => handleInputChange(index, "ResponseText", e.target.value)}
                      />
                      <Form.Control
                        as="textarea"
                        rows="4"
                        required
                        placeholder="Body Text"
                        value={field.ResponseText || ''}
                        onChange={(e) => handleInputChange(index, "ResponseText", e.target.value)}
                      />
                      <Form.Control
                        type="text"
                        required
                        placeholder='Footer Text'
                        value={field.ResponseText || ''}
                        onChange={(e) => handleInputChange(index, "ResponseText", e.target.value)}
                      />
                    </div>
                  </div>
                  <OverlayTrigger placement="top" overlay={<Tooltip className="m-0">Delete Input</Tooltip>}>
                    <Card.Link className="ms-2" onClick={() => deleteInputs(index)}>
                      <XCircleIcon className="icon icon-xs text-danger" />
                    </Card.Link>
                  </OverlayTrigger>
                </div>
              )}
              {field.MediaType === "LOCREQ" && (
                <div className="d-flex my-2">
                  <div className="card light w-100 p-2">
                    <div className="d-flex align-items-top mb-1">
                      <Form.Label className="mb-0">Enter Location Response Text</Form.Label>
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        required
                        placeholder='Enter Location Response Text'
                        value={field.ResponseText || ''}
                        onChange={(e) => handleInputChange(index, "ResponseText", e.target.value)}
                      />
                    </div>
                  </div>
                  <OverlayTrigger placement="top" overlay={<Tooltip className="m-0">Delete Input</Tooltip>}>
                    <Card.Link className="ms-2" onClick={() => deleteInputs(index)}>
                      <XCircleIcon className="icon icon-xs text-danger" />
                    </Card.Link>
                  </OverlayTrigger>
                </div>
              )}
            </div>
          ))}

          <div className="d-flex flex-wrap border-top mt-4">
            <Button variant="gray-300" value={"TEXT"} onClick={handleFieldChoice} className="m-2"><MdTextFields /> Text</Button>
            <Button variant="gray-300" value={"IMAGE"} onClick={handleFieldChoice} className="m-2"><ImImages />  Image</Button>
            <Button variant="gray-300" value={"VIDEO"} onClick={handleFieldChoice} className="m-2"><MdOutlineVideocam /> Video</Button>
            <Button variant="gray-300" value={"DOC"} onClick={handleFieldChoice} className="m-2"><IoDocumentTextOutline /> Document</Button>
            <Button variant="gray-300" value={"PRODUCT"} onClick={handleFieldChoice} className="m-2"><BsCartPlus /> Product</Button>
            <Button variant="gray-300" value={"PRODUCT_LIST"} onClick={handleFieldChoice} className="m-2"><LuClipboardList /> Product List</Button>
            <Button variant="gray-300" value={"LOCREQ"} onClick={handleFieldChoice} className="m-2"><IoLocationOutline /> Location Request</Button>
          </div>
        </Modal.Body>

        <Modal.Footer className="justify-content-start border-0 pt-2">
          <Button variant="outline-gray-500" onClick={onClose}>
            Close
          </Button>
          <Button variant="secondary" className="" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Form>

      {modalType === 'button' && <ButtonsModal isOpen={modalType} onClose={closeModal} onSubmit={submittedButtons} />}
      {modalType === 'list' && <ListModal isOpen={modalType} onClose={closeModal} onSubmit={submittedLists} />}

    </Modal>
  );
};

export const ButtonsModal = ({ isOpen, onClose, onSubmit }) => {

  const [type, setType] = useState('Buttons');
  const [buttonType, setButtonType] = useState('Quick Reply');
  const [buttons, setButtons] = useState([{ text: '' }]);
  const [validated, setValidated] = useState(false);


  const handleTypeChange = (e) => {
    const value = e.target.value;
    setButtonType(value);
    if (value === 'Visit Website') {
      setButtons([{ label: '', website: '' }]);
    } else if (value === 'Quick Reply') {
      setButtons([{ text: '' }]);
    }
  }

  // handle button data
  const handleButtons = (field, value, index) => {
    setButtons(prev => prev.map((btn, indx) => indx === index ? { ...btn, [field]: value } : btn));
  }
  const deleteCardButton = (index) => {
    setButtons(prev => prev.filter((_, indx) => indx !== index));
  }
  const addButtons = () => {
    if (buttons.length < 3) {
      setButtons(prev => [...prev, { text: '' }]);
    } else {
      alert("Maximum 3 buttons are allowed!");
    }
  }

  const submitAll = (e) => {
    e.preventDefault();
    // Prevent the default form submission
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const payload = {
      ButtonType: type,
      ButtonSubType: buttonType,
      buttons: buttons
    }
    onSubmit(payload);
  }

  if (!isOpen) return null;

  return (
    <Modal as={Modal.Dialog} centered show={isOpen} onHide={onClose}>
      <Form className="modal-content" noValidate validated={validated} onSubmit={submitAll}>
        <Modal.Header className="pb-0 border-0">
          <MdAddBox style={{ width: '1.5em', height: '1.5em' }} />
          <h5 as={Modal.Title} className="ms-2 m-0">
            Add Buttons
          </h5>
          <Button variant="close" onClick={onClose} />
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Button Type</Form.Label>
            <Form.Select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Buttons</option>
              <option>Flow</option>
            </Form.Select>
          </Form.Group>

          {type === 'Buttons' &&
            <>
              <Form.Group className="mb-3">
                <Form.Label className="mb-0">Button Sub Type</Form.Label>
                <Form.Select
                  value={buttonType}
                  onChange={handleTypeChange}
                >
                  <option>Quick Reply</option>
                  <option>Visit Website</option>
                </Form.Select>
              </Form.Group>

              <Form.Label className="mb-0">Button</Form.Label>
              {buttonType === "Quick Reply" && (
                <div className="my-2">
                  <div className="d-flex align-items-start justify-content-between">
                    <Form.Label className="mb-0">Quick Reply</Form.Label>
                    <Button onClick={addButtons} type="button" bsPrefix="text" style={{ border: "none", background: "none", padding: 0, color: "inherit", textWrap: 'nowrap', width: 'min-content' }} variant="primary" className="text-success fw-bold">
                      <MdOutlineAddBox className="icon icon-xs" /> Add Buttons
                    </Button>
                  </div>
                  {buttons.map((btn, index) => (
                    <Form.Group key={index} className="d-flex align-items-center mb-2">
                      <Form.Control
                        type="text"
                        required
                        placeholder='Text Button'
                        value={btn.text}
                        onChange={(e) => handleButtons('text', e.target.value, index)}
                      />
                      <OverlayTrigger placement="top" overlay={<Tooltip className="m-0">Delete Button</Tooltip>}>
                        <Card.Link className="ms-2" onClick={() => deleteCardButton(index)}>
                          <XCircleIcon className="icon icon-xs text-danger" />
                        </Card.Link>
                      </OverlayTrigger>
                    </Form.Group>
                  ))}
                </div>
              )}

              {(buttonType === "Visit Website") && (
                <Row className="my-2">
                  <Form.Label className="mb-0">Website URL</Form.Label>
                  {buttons.map((btn, index) => (
                    <Row key={index}>
                      <Col md={4} className="pe-0">
                        <Form.Control
                          type="text"
                          required
                          placeholder={`Button text`}
                          value={btn.label}
                          onChange={(e) => handleButtons('label', e.target.value, index)}
                        />
                      </Col>
                      <Col md={7} className="pe-0">
                        <Form.Control
                          type="url"
                          required
                          placeholder="https://example.com"
                          value={btn.website}
                          onChange={(e) => handleButtons('website', e.target.value, index)}
                        />
                      </Col>
                      <Col md={1} className="d-flex align-items-center">
                        <OverlayTrigger placement="top" overlay={<Tooltip className="m-0">Delete Button</Tooltip>}>
                          <Card.Link onClick={() => deleteCardButton(index)}>
                            <XCircleIcon className="icon icon-xs text-danger" />
                          </Card.Link>
                        </OverlayTrigger>
                      </Col>
                    </Row>
                  ))}
                </Row>
              )}
            </>
          }

          {type === 'Flow' &&
            <>
              <Form.Group className="mb-3">
                <Form.Label className="mb-0">Select Flow</Form.Label>
                <Select
                  // options={flowOptions}
                  placeholder="Select flow"
                  className="mb-0"
                  isSearchable={true}
                  name="flow"
                // value={flowOptions.find(option => option.value === inputfields.selectedVariable)} // Ensure correct option is selected
                // onChange={(selectedOption, actionMeta) => handleInputs(selectedOption, actionMeta)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="mb-0">Button Text</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Button text"
                // value={btn.label}
                // onChange={(e) => handleButtons('label', e.target.value, index)}
                />
              </Form.Group>
            </>
          }

        </Modal.Body>

        <Modal.Footer className="justify-content-start border-0 pt-2">
          <Button variant="outline-gray-500" onClick={onClose} type="button">
            Close
          </Button>
          <Button variant="secondary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const ListModal = ({ isOpen, onClose, onSubmit }) => {
  const [list, setList] = useState({
    ListButtonText: "",
    SelectedListVariable: null,
    IsGetListFromVariable: false,
    UserInputKeyword: "",
  });
  const handleList = (field, value) => {
    setList((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (field === 'IsGetListFromVariable' && value === true) {
      setSection([]);
    }
  };
  const handleSelect = (selectedOption) => {
    setList((prev) => ({
      ...prev,
      SelectedListVariable: selectedOption?.value,
    }));
  }
  const [section, setSection] = useState([
    {
      sectionText: '',
      buttons: [
        {
          title: '',
          description: ''
        }]
    }
  ]);
  const addSection = () => {
    setSection((prev) => [
      ...prev,
      {
        sectionText: '',
        buttons: [{
          title: '',
          description: ''
        }]
      }
    ]);
  }
  const handleInputs = (field, value, index) => {
    setSection((prev) =>
      prev.map((item, i) => i === index ?
        {
          ...item,
          [field]: value,
        }
        : item
      )
    );
  };
  const deleteInputs = (index) => {
    const updatedSection = section.filter((_, i) => i !== index);
    setSection(updatedSection);
  };

  // ADDING BUTTONS
  const addOptions = (sectnIndx) => {
    setSection((prev) =>
      prev.map((sec, index) =>
        index === sectnIndx
          ? {
            ...sec,
            buttons: [
              ...sec.buttons,
              {
                title: '',
                description: ''
              }
            ]
          }
          : sec
      )
    )
  }

  const handleBtns = (field, value, btnIndex, secIndex) => {
    setSection((prev) =>
      prev.map((sec, secId) =>
        secId === secIndex
          ? {
            ...sec,
            buttons: sec.buttons.map((btn, bId) =>
              bId === btnIndex
                ? { ...btn, [field]: value }
                : btn
            ),
          }
          : sec
      )
    );
  };

  const deleteOptions = (bId, secId) => {
    const updatedSection = section.map((sec, i) => i === secId ? { ...sec, buttons: sec.buttons.filter((_, id) => id !== bId) } : sec);
    setSection(updatedSection);
  };

  const [validated, setValidated] = useState(false);

  const [recieveNew, setRecieveNew] = useState(false);
  // select var functionality
  const [varOptions, setVarOptions] = useState([
    { value: 'new', label: <div onClick={() => setRecieveNew(true)}>Add New Option</div> },
  ]);

  const [optNew, setOptNew] = useState('');
  const addOption = () => {
    if (optNew !== '') {
      setVarOptions((prev) => ([
        ...prev,
        { value: optNew, label: optNew }
      ]))
      setRecieveNew(false);
    }
  }

  const submitAll = (e) => {
    e.preventDefault();
    // Prevent the default form submission
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const payload = {
      list: {
        ...list,
        ListValue: section,
      },
    }

    onSubmit(payload);
  }

  if (!isOpen) return null;

  return (
    <Modal as={Modal.Dialog} centered show={isOpen} onHide={onClose}>
      <Form className="modal-content" noValidate validated={validated} onSubmit={submitAll}>
        <Modal.Header className="pb-0 border-0">
          <MdAddBox style={{ width: '1.5em', height: '1.5em' }} />
          <h5 as={Modal.Title} className="ms-2 m-0">
            Add List
          </h5>
          <Button variant="close" onClick={onClose} />
        </Modal.Header>

        <Modal.Body className="pb-0">
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">List Button Text</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder='List Text Button'
              value={list.ListButtonText}
              onChange={(e) => handleList('ListButtonText', e.target.value)}
            />
          </Form.Group>

          <Form.Check
            type="switch"
            label="Get List from Variable?"
            id="switch1"
            checked={list.IsGetListFromVariable}
            onChange={(e) => handleList('IsGetListFromVariable', e.target.checked)}
          />


          {list.IsGetListFromVariable ?

            <>
              <Form.Control
                type="text"
                // required
                placeholder='please enter user input keyword'
                value={list.UserInputKeyword || ''}
                onChange={(e) => handleList('UserInputKeyword', e.target.value)}
              />

              <Form.Group className="mt-3">
                <Form.Label className="mb-0">Save to a variable</Form.Label>
                <Select
                  options={varOptions}
                  placeholder="Select"
                  className="mb-0"
                  isSearchable={true}
                  // name="SelectedListVariable"
                  value={varOptions.find(option => option.value === list.SelectedListVariable)} // Ensure correct option is selected
                  onChange={(selectedOption) => handleSelect(selectedOption)}
                />
              </Form.Group>

              {recieveNew &&
                <>
                  <Form.Control
                    type="text"
                    required
                    className="mt-3"
                    placeholder='please enter user input keyword'
                    onChange={(e) => setOptNew(e.target.value)}
                  />
                  <Button variant="warning" type="button" className="mt-2" onClick={addOption}>
                    Add
                  </Button>
                </>
              }

            </>

            :

            <>
              <Button variant="warning" type="button" className="mt-2" onClick={addSection}>
                Add Section
              </Button>

              {section.map((field, index) => (
                <div key={index} className="d-flex my-2">
                  <div className="card light w-100 p-2">
                    <Form.Group className="mb-3">
                      <Form.Label className="mb-0">Section Text</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        placeholder='Section Text'
                        value={field.sectionText || ''}
                        onChange={(e) => handleInputs('sectionText', e.target.value, index)}
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-between mb-2">
                      <Form.Label>Buttons</Form.Label>
                      <Button onClick={() => addOptions(index)} type="button" bsPrefix="text" style={{ border: "none", background: "none", padding: 0, color: "inherit", textWrap: 'nowrap', width: 'min-content' }} variant="primary" className="text-success d-flex align-items-center fw-bold">
                        <MdOutlineAddBox className="icon icon-xs" />
                        Add Option
                      </Button>
                    </div>

                    {field.buttons && field.buttons.map((btn, btnIndex) => (
                      <Form.Group key={btnIndex} className="mb-3">
                        <div className="d-flex">
                          <Form.Label className="mb-0">Option</Form.Label>
                          <OverlayTrigger placement="top" overlay={<Tooltip className="m-0">Delete Button</Tooltip>}>
                            <Card.Link className="ms-auto" onClick={() => deleteOptions(btnIndex, index)}>
                              <XCircleIcon className="icon icon-xs text-danger" />
                            </Card.Link>
                          </OverlayTrigger>
                        </div>
                        <Form.Control
                          type="text"
                          required
                          placeholder='Option title'
                          value={btn.title || ''}
                          onChange={(e) => handleBtns('title', e.target.value, btnIndex, index)}
                        />
                        <Form.Control
                          type="text"
                          // required
                          className="mt-2"
                          placeholder='Description'
                          value={btn.description || ''}
                          onChange={(e) => handleBtns('description', e.target.value, btnIndex, index)}
                        />
                      </Form.Group>
                    ))}

                  </div>
                  <OverlayTrigger placement="top" overlay={<Tooltip className="m-0">Delete Input</Tooltip>}>
                    <Card.Link className="ms-2" onClick={() => deleteInputs(index)}>
                      <XCircleIcon className="icon icon-xs text-danger" />
                    </Card.Link>
                  </OverlayTrigger>
                </div>
              ))}
            </>
          }

        </Modal.Body>

        <Modal.Footer className="justify-content-start border-0 pt-2">
          <Button variant="outline-gray-500" onClick={onClose} type="button">
            Close
          </Button>
          <Button variant="secondary" type="submit" >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const APIModal = ({ isOpen, onClose, data, onSubmit }) => {
  const [inputfields, setInputfields] = useState({
    id: "",
    title: "",
    apiId: 0,
    selectedVariable: null,
  });

  // Update input fields when `data` changes
  useEffect(() => {

    if (data && data.details) {
      setInputfields({
        id: data.details.id || "",
        title: data.details.data.title || "",
        apiId: data.details.data.apiId || '',
        selectedVariable: data.details.data.selectedVariable || '',
      });

    }
  }, [data, isOpen]);

  const currencyOptions = [
    { value: '2', label: 'Node 1' },
    { value: '3', label: 'Node 2' },
    { value: '4', label: 'Node 3' },
    { value: '5', label: 'Node 4' },
    { value: '6', label: 'Node 5' },
  ];

  const handleInputs = (eventOrSelectedOption, actionMeta) => {
    if (actionMeta) {
      // Handling react-select
      const { name } = actionMeta;
      setInputfields((prev) => ({
        ...prev,
        [name]: eventOrSelectedOption?.value, // Update the selected value
      }));
    } else {
      // Handling regular input fields
      const { name, value } = eventOrSelectedOption.target;
      setInputfields((prev) => ({
        ...prev,
        [name]: value, // Update input field value
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <Modal as={Modal.Dialog} centered show={isOpen} onHide={onClose}>
      <Form className="modal-content">
        <Modal.Header className="pb-0 border-0">
          <MdOutlineSettings style={{ width: '1.5em', height: '1.5em' }} />
          <h5 as={Modal.Title} className="ms-2 m-0">
            Add API
          </h5>
          <Button variant="close" onClick={onClose} />
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Title</Form.Label>
            <Form.Control
              required
              autoFocus
              type="text"
              name="title"
              value={inputfields.title}
              onChange={handleInputs}
              placeholder='Enter a title.'
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Select API?</Form.Label>
            <Select
              options={currencyOptions}
              placeholder="Select ONE"
              className="mb-0"
              isSearchable={true}
              name="apiId"
              value={currencyOptions.find(option => option.value === inputfields.apiId)} // Ensure correct option is selected
              onChange={(selectedOption, actionMeta) => handleInputs(selectedOption, actionMeta)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Save to a Variable?</Form.Label>
            <Select
              options={currencyOptions}
              placeholder="Select ONE"
              className="mb-0"
              isSearchable={true}
              name="selectedVariable"
              value={currencyOptions.find(option => option.value === inputfields.selectedVariable)} // Ensure correct option is selected
              onChange={(selectedOption, actionMeta) => handleInputs(selectedOption, actionMeta)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="justify-content-start border-0 pt-2">
          <Button variant="outline-gray-500" onClick={onClose}>
            Close
          </Button>
          <Button variant="secondary" className="" onClick={() => onSubmit(inputfields)}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const LoopbackModal = ({ isOpen, onClose, data, onSubmit }) => {
  const [inputfields, setInputfields] = useState({
    id: "",
    title: "",
    loopbackNodeId: ""
  });

  // Update input fields when `data` changes
  useEffect(() => {
    if (data && data.details) {
      setInputfields({
        id: data.details.id || "",
        title: data.details.data.title || "",
        loopbackNodeId: data.details.data.loopbackNodeId || ''
      });
    }
  }, [data, isOpen]);

  const options = JSON.parse(localStorage.getItem('optionsBack')) || [{}];

  const handleInputs = (eventOrSelectedOption, actionMeta) => {
    if (actionMeta) {
      // Handling react-select
      const { name } = actionMeta;
      setInputfields((prev) => ({
        ...prev,
        [name]: eventOrSelectedOption?.value, // Update the selected value
      }));
    } else {
      // Handling regular input fields
      const { name, value } = eventOrSelectedOption.target;
      setInputfields((prev) => ({
        ...prev,
        [name]: value, // Update input field value
      }));
    }
  };


  if (!isOpen) return null;

  return (
    <Modal as={Modal.Dialog} centered show={isOpen} onHide={onClose}>
      <Form className="modal-content">
        <Modal.Header className="pb-0 border-0">
          <FaRedo style={{ width: '1.5em', height: '1.5em' }} />
          <h5 as={Modal.Title} className="ms-2 m-0">
            Add API
          </h5>
          <Button variant="close" onClick={onClose} />
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Title</Form.Label>
            <Form.Control
              required
              autoFocus
              type="text"
              name="title"
              value={inputfields.title}
              onChange={handleInputs}
              placeholder='Enter a title.'
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Select Loopback Node:</Form.Label>
            <Select
              options={options}
              placeholder="Select ONE"
              className="mb-0"
              isSearchable={true}
              name="loopbackNodeId"
              value={options.find(option => option.value === inputfields.loopbackNodeId)} // Ensure correct option is selected
              onChange={(selectedOption, actionMeta) => handleInputs(selectedOption, actionMeta)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="justify-content-start border-0 pt-2">
          <Button variant="outline-gray-500" onClick={onClose}>
            Close
          </Button>
          <Button variant="secondary" className="" onClick={() => onSubmit(inputfields)}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};


//--------------------------------CHATBOT END---------------------------------------- 

export const KanbanCreateModal = (props) => {
  const { modalTitle = "Add a new card", type = "card", show = false } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onDescriptionChange = (e) => setDescription(e.target.value);
  const onHide = () => props.onHide && props.onHide();

  const onSubmit = () => {
    const payload = { title, description };
    return props.onSubmit && props.onSubmit(payload);
  };

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        <Modal.Header className="pb-0 border-0">
          <h5 as={Modal.Title} className="fw-normal">
            {modalTitle}
          </h5>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Form.Group id="title" className="mb-3">
            <Form.Control
              required
              autoFocus
              type="text"
              value={title}
              onChange={onTitleChange}
              placeholder={`Enter a title for this ${type}…`}
            />
          </Form.Group>
          {type === "card" && (
            <Form.Group id="description" className="mb-3">
              <Form.Control
                required
                autoFocus
                multiple
                as="textarea"
                value={description}
                onChange={onDescriptionChange}
                placeholder={`Enter a description for this ${type}…`}
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-start border-0 pt-0">
          <Button variant="outline-gray-500" onClick={onHide}>
            Close
          </Button>
          <Button variant="secondary" className="d-inline-flex align-items-center" onClick={onSubmit}>
            <PlusIcon className="icon icon-xs me-2" />
            Add {type}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const KanbanCopyModal = (props) => {
  const { type = "card", show = false, lists = [], ...otherProps } = props;
  const [title, setTitle] = useState(props.title ?? "");
  const [listId, setListId] = useState(props.listId ?? "");

  const onHide = () => {
    props.onHide && props.onHide();
  };

  const onSubmit = () => {
    const payload = { ...otherProps, title, listId };
    return props.onSubmit && props.onSubmit(payload);
  };

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        <Modal.Header className="pb-0 border-0">
          <Modal.Title className="fw-normal">
            Copy {type}
          </Modal.Title>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Form.Group id="title" className="mb-3">
            <Form.Control
              autoFocus
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onFocus={e => e.target.select()}
            />
          </Form.Group>
          {type === "card" && (
            <FloatingLabel id="list" label="Copy to list.." className="mb-3">
              <Form.Select
                value={listId}
                onChange={e => setListId(e.target.value)}
              >
                {lists.map(l => (
                  <option value={l.id} key={`copy-card-option-${l.id}`}>
                    {l.title}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-start border-0 pt-0">
          <Button variant="secondary" className="d-inline-flex align-items-center" onClick={onSubmit}>
            <PlusIcon className="icon icon-xs me-2" />
            Create {type}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const KanbanMoveModal = (props) => {
  const { type = "card", show = false, lists = [] } = props;
  const [listId, setListId] = useState(props.listId ?? "");
  const [index, setIndex] = useState(props.index ?? 0);
  const cardList = lists.find(l => l.id === listId);

  const onHide = () => {
    props.onHide && props.onHide();
  };

  const onSubmit = () => {
    const source = { droppableId: props.listId, index: props.index };
    const destination = { droppableId: listId, index };

    props.onSubmit && props.onSubmit({ source, destination });
  };

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        <Modal.Header className="pb-0 border-0">
          <Modal.Title className="fw-normal">
            Move {type}
          </Modal.Title>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>
        <Modal.Body className="pb-0">
          {type === "card" ? (
            <>
              <FloatingLabel id="listId" label="List" className="mb-3">
                <Form.Select
                  value={listId}
                  onChange={e => setListId(e.target.value)}
                >
                  {lists.map(l => (
                    <option value={l.id} key={`move-list-id-${l.id}`}>
                      {l.id === props.listId ? `${l.title} (current)` : l.title}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
              {cardList && (
                <FloatingLabel id="listIndex" label="Position" className="mb-3">
                  <Form.Select
                    value={index}
                    onChange={e => setIndex(e.target.value)}
                  >
                    {cardList.cards.map((_, ind) => (
                      <option value={ind} key={`move-list-index-${ind}`}>
                        {ind + 1}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              )}
            </>
          ) : (
            <FloatingLabel id="listIndex" label="Position" className="mb-3">
              <Form.Select
                value={index}
                onChange={e => setIndex(e.target.value)}
              >
                {lists.map((_, ind) => (
                  <option value={ind} key={`move-list-index-${ind}`}>
                    {ind === props.index ? `${ind + 1} (current)` : ind + 1}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-start border-0 pt-0">
          <Button variant="secondary" className="d-inline-flex align-items-center" onClick={onSubmit}>
            Move {type}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const KanbanEditModal = (props) => {
  const { id: cardId, index, listId, show = false, author, members = [], labels = [], comments = [] } = props;
  const [title, setTitle] = useState(props.title ?? "");
  const [comment, setComment] = useState("");
  const [isTitleEditable, setIsTitleEditable] = useState(false);

  const toggleIsTitleEditable = () => {
    setIsTitleEditable(!isTitleEditable);
  };

  const onHide = () => {
    props.onHide && props.onHide();
  };

  const onChange = () => {
    const payload = { listId, cardId, title };

    if (title !== props.title) {
      props.onChange && props.onChange(payload);
    }

    toggleIsTitleEditable();
  };

  const onEditMembers = () => {
    props.onEditMembers && props.onEditMembers(props);
  };

  const onEditLabels = () => {
    props.onEditLabels && props.onEditLabels(props);
  };

  const onArchive = () => {
    props.onArchive && props.onArchive({ cardId, listId });
  };

  const onMove = () => {
    props.onMove && props.onMove({ listId, index });
  };

  return (
    <Modal as={Modal.Dialog} centered size="lg" show={show} onHide={onHide}>
      <Form className="modal-content p-lg-3">
        <Modal.Header className="align-items-start border-bottom">
          <div className="d-block">
            {isTitleEditable ? (
              <Form.Group id="title" className="mb-3">
                <Form.Control
                  required
                  autoFocus
                  value={title}
                  className="text-gray-900 fs-5 fw-bold border-0 px-1 py-0 m-0"
                  onChange={e => setTitle(e.target.value)}
                  onBlur={onChange}
                />
              </Form.Group>
            ) : (
              <h5 className="text-gray-900 fs-5 fw-bold py-1 ps-1 mb-3" onClick={toggleIsTitleEditable}>
                {title}
              </h5>
            )}

            <div className="d-flex">
              <div className="d-block me-3 me-sm-4">
                <h5 className="fs-6 fw-bold text-gray-500">Members</h5>
                <div className="d-flex align-items-center">
                  {members.map(m => <KanbanAvatar key={`kanban-avatar-${m.id}`}  {...m} />)}

                  <Button variant="gray-200" size="sm" className="d-inline-flex align-items-center px-3 ms-1" onClick={onEditMembers}>
                    <PlusIcon className="icon icon-xs" />
                  </Button>
                </div>
              </div>
              <div className="d-block me-3">
                <h5 className="fs-6 fw-bold text-gray-500">Labels</h5>
                <div className="d-flex align-items-center">
                  {labels.map(l => (
                    <Badge text="white" bg={l.color} key={`kanban-label-${l.id}`} className="rounded py-2 px-3">
                      {l.name}
                    </Badge>
                  ))}

                  <Button variant="gray-200" size="sm" className="d-inline-flex align-items-center px-3 ms-1" onClick={onEditLabels}>
                    <PlusIcon className="icon icon-xs" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>

        <Modal.Body className="py-4">
          <Row>
            <Col xs={12} lg={9}>
              <Row className="mb-4">
                <Col xs="auto">
                  <div className="border border-3 rounded mb-2">
                    <Image rounded src={author.image} className="image-sm" />
                  </div>
                  <div className="text-center">
                    <PaperClipIcon className="icon icon-xs me-2" />
                    <CameraIcon className="icon icon-xs" />
                  </div>
                </Col>
                <Col>
                  <Form.Group id="comment">
                    <Form.Control
                      multiple
                      rows={3}
                      as="textarea"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="Leave a comment"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4 mb-lg-0">
                {comments.map(c => (
                  <Col xs={12} key={`kanban-comment-${c.id}`} className="mb-4">
                    <div className="bg-gray-50 border border-gray-100 rounded p-3">
                      <div className="d-flex align-items-center mb-2">
                        <h3 className="fs-6 mb-0 me-3">
                          {c.sender}
                        </h3>
                        <small>
                          {moment(c.timeSent).fromNow()}
                        </small>
                      </div>
                      <p className="text-dark mb-1">
                        {c.message}
                      </p>

                      <small className="hover:underline text-gray-700 me-1">
                        Edit
                      </small>
                      &middot;
                      <small className="hover:underline text-gray-700 ms-1">
                        Delete
                      </small>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xs={12} lg={3}>
              <div className="d-grid gap-2">
                <Button variant="gray-200" size="sm" className="d-inline-flex align-items-center rounded py-2 ps-3 text-start" onClick={onEditMembers}>
                  <UserGroupIcon className="icon icon-xs text-gray-500 me-2" />
                  Members
                </Button>
                <Button variant="gray-200" size="sm" className="d-inline-flex align-items-center rounded py-2 ps-3 text-start" onClick={onEditLabels}>
                  <TagIcon className="icon icon-xs text-gray-500 me-2" />
                  Labels
                </Button>
                <Button variant="gray-200" size="sm" className="d-inline-flex align-items-center rounded py-2 ps-3 text-start">
                  <ClipboardCheckIcon className="icon icon-xs text-gray-500 me-2" />
                  Checklist
                </Button>
                <Button variant="gray-200" size="sm" className="d-inline-flex align-items-center rounded py-2 ps-3 text-start">
                  <PaperClipIcon className="icon icon-xs text-gray-500 me-2" />
                  Attachment
                </Button>
                <Button variant="gray-200" size="sm" className="d-inline-flex align-items-center rounded py-2 ps-3 text-start">
                  <ClockIcon className="icon icon-xs text-gray-500 me-2" />
                  Due Date
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="justify-content-start border-top">
          <Button variant="gray-800" className="me-2 text-start" onClick={onMove}>
            <SelectorIcon className="icon icon-xs me-2" />
            Move
          </Button>
          <Button variant="gray-800" className="me-2 text-start" onClick={onArchive}>
            <ArchiveIcon className="icon icon-xs me-2" />
            Archive
          </Button>
          <Button variant="gray-800" className="me-2 text-start">
            <EyeIcon className="icon icon-xs me-2" />
            Watch
          </Button>
          <Button variant="gray-800" className="me-2 text-start">
            <ShareIcon className="icon icon-xs me-2" />
            Share
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const KanbanEditMembersModal = (props) => {
  const { listId, id: cardId, show = false, members = [] } = props;
  const [searchValue, setSearchValue] = useState("");
  const [boardMembers, setBoardMembers] = useState(BoardMembers.map(bm => ({ ...bm, show: true, isAssignedToCard: members.some(m => m.id === bm.id) })));

  const onSearchValueChange = (e) => {
    const newSearchValue = e.target.value;
    const searchResults = boardMembers.map(bm => ({ ...bm, show: bm.name.toLowerCase().includes(newSearchValue.toLowerCase()) }));

    setSearchValue(newSearchValue);
    setBoardMembers(searchResults);
  };

  const onMemberClick = (id) => {
    const boardMembersUpdated = boardMembers.map(m => m.id === id ? ({ ...m, isAssignedToCard: !m.isAssignedToCard }) : m);
    setBoardMembers(boardMembersUpdated);
  };

  const onHide = () => {
    props.onHide && props.onHide();
  };

  const onSubmit = () => {
    const membersSelected = boardMembers.filter(m => m.isAssignedToCard);
    const payload = { listId, cardId, members: membersSelected };

    return props.onSubmit && props.onSubmit(payload);
  };

  return (
    <Modal as={Modal.Dialog} centered scrollable show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        <Modal.Header className="border-0 px-3 pb-0">
          <Modal.Title className="fw-normal">
            Members
          </Modal.Title>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>

        <Modal.Body className="px-3 pb-0">
          <Form.Group id="search" className="mb-3">
            <InputGroup className="search-bar">
              <Form.Control
                type="text"
                placeholder="Search board members.."
                value={searchValue}
                onChange={onSearchValueChange}
              />
            </InputGroup>
          </Form.Group>

          <div className="px-3">
            {boardMembers
              .filter(m => m.show)
              .map(m => (
                <Row
                  key={`board-member-${m.id}`}
                  className="kanban-card-member border-bottom py-2"
                  onClick={() => onMemberClick(m.id)}
                >
                  <Col xs={2}>
                    <Image src={m.image} className="avatar-md rounded-circle" />
                  </Col>
                  <Col xs={8} className="d-flex align-items-center justify-content-start">
                    <h4 className="fs-6 text-dark mb-0">
                      {m.name}
                    </h4>
                  </Col>
                  {m.isAssignedToCard && (
                    <Col xs={2} className="d-flex align-items-center">
                      <CheckIcon className="icon icon-sm text-success" />
                    </Col>
                  )}
                </Row>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start border-0 pb-0">
          <Button variant="secondary" className="d-inline-flex align-items-center" onClick={onSubmit}>
            Confirm members
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const KanbanEditLabelsModal = (props) => {
  const { listId, id: cardId, show = false, labels = [] } = props;
  const [searchValue, setSearchValue] = useState("");
  const [boardLabels, setBoardLabels] = useState(BoardLabels.map(bm => ({ ...bm, show: true, isAssignedToCard: labels.some(m => m.id === bm.id) })));

  const onSearchValueChange = (e) => {
    const newSearchValue = e.target.value;
    const searchResults = boardLabels.map(bm => ({ ...bm, show: bm.name.toLowerCase().includes(newSearchValue.toLowerCase()) }));

    setSearchValue(newSearchValue);
    setBoardLabels(searchResults);
  };

  const onLabelClick = (id) => {
    const boardLabelsUpdated = boardLabels.map(m => m.id === id ? ({ ...m, isAssignedToCard: !m.isAssignedToCard }) : m);
    setBoardLabels(boardLabelsUpdated);

    const labelsSelected = boardLabelsUpdated.filter(l => l.isAssignedToCard);
    const payload = { listId, cardId, labels: labelsSelected };
    props.onSubmit && props.onSubmit(payload);
  };

  const onHide = () => {
    props.onHide && props.onHide();
  };

  return (
    <Modal as={Modal.Dialog} centered scrollable show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        <Modal.Header className="border-0 px-3 pb-0">
          <Modal.Title className="fw-normal">
            Labels
          </Modal.Title>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>

        <Modal.Body className="px-3 pb-0">
          <Form.Group id="search" className="mb-3">
            <InputGroup className="search-bar">
              <Form.Control
                type="text"
                placeholder="Search labels.."
                value={searchValue}
                onChange={onSearchValueChange}
              />
            </InputGroup>
          </Form.Group>

          <div className="px-3 py-2">
            {boardLabels
              .filter(l => l.show)
              .map(l => (
                <Row key={`label-${l.id}`} className="my-1">
                  <Badge
                    bg={l.color}
                    className="kanban-card-label py-2 px-3"
                    onClick={() => onLabelClick(l.id)}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <h4 className="fs-6 text-white mb-0">
                        {l.name}
                      </h4>
                      {l.isAssignedToCard && (
                        <CheckIcon className="icon icon-sm" />
                      )}
                    </div>
                  </Badge>
                </Row>
              ))}
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};
