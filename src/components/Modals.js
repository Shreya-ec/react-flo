import React, { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Modal, Button, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { MdAddBox, MdOutlineAddBox, MdOutlineSettings, MdOutlineVideocam, MdTextFields } from "react-icons/md";
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