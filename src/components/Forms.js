import React, { useCallback, useState, useMemo } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { useDropzone } from "react-dropzone";
import { PiMicrosoftExcelLogo, PiFileCsv } from "react-icons/pi";
import { CalendarIcon, CreditCardIcon } from "@heroicons/react/solid";
import {
  Col,
  Row,
  Card,
  Form,
  Image,
  Button,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { XCircleIcon } from "@heroicons/react/outline";
import { FaFilePdf, FaFilePowerpoint, FaFileWord } from "react-icons/fa6";

export const DropFilesForm = ({ onFilesUploaded }) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".xls,.xlsx,.csv",
    maxFiles: 1, // Only allow one file
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]; // Get the first (and only) file
      const fileWithPreview = {
        ...file,
        preview:
          file.type.includes("excel") || file.name.endsWith(".xlsx")
            ? "excel"
            : "csv",
      };
      setFiles([fileWithPreview]);
      onFilesUploaded({
        target: {
          name: "file",
          files: [file],
        },
      });
    },
    // accept: '.xls,.xlsx,.csv',
    // onDrop: acceptedFiles => {
    //   const filesWithPreview = acceptedFiles.map(file => ({
    //     ...file,
    //     preview: file.type.includes('excel') || file.name.endsWith('.xlsx') ? 'excel' : 'csv'
    //   }));
    //   setFiles(filesWithPreview);
    //   onFilesUploaded({
    //     target: {
    //       name: 'file',
    //       files: [acceptedFiles.map(file => ({
    //         ...file
    //       }))]
    //     }
    //   });
    // }
  });
  const removeFile = () => {
    setFiles([]);
  };

  const DropzoneFile = (props) => {
    const { path, preview } = props;

    return (
      <Col className="d-flex align-items-center m-2 border">
        {preview === "excel" ? (
          <PiMicrosoftExcelLogo
            style={{ minWidth: "20px", minHeight: "20px" }}
          />
        ) : (
          <PiFileCsv style={{ minWidth: "20px", minHeight: "20px" }} />
        )}
        <Card.Text className="ms-2 dropzone-filename fw-bold mb-0">
          {path}
        </Card.Text>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip className="m-0">Remove</Tooltip>}
        >
          <Card.Link className="ms-auto" onClick={removeFile}>
            <XCircleIcon className="icon icon-xs text-danger" />
          </Card.Link>
        </OverlayTrigger>
      </Col>
    );
  };

  return (
    <>
      {files.length > 0 ? (
        <Row className="dropzone-files">
          {files.map((file) => (
            <DropzoneFile key={file.path} {...file} />
          ))}
        </Row>
      ) : (
        <div
          {...getRootProps({
            className:
              "dropzone rounded d-flex align-items-center justify-content-center m-2",
          })}
        >
          <Form.Control {...getInputProps()} />
          <div className="dz-default dz-message text-center">
            <p className="dz-button mb-0">Drop files here to upload</p>
          </div>
        </div>
      )}
    </>
  );
};

// Utility function to handle document files separately
export const handleDocumentFiles = (acceptedFiles) => {
  return acceptedFiles
    .filter(
      (file) =>
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    .map((file) => ({
      ...file,
      preview:
        file.type === "application/pdf"
          ? "pdf"
          : file.type === "application/msword" ||
            file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ? "doc"
          : file.type ===
            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
          ? "ppt"
          : "xlsx",
    }));
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~DOCUMENT~~WHATSAPP~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const DropMediaFilesForm = ({ onFilesUploaded }) => {
  // const [getmediaUrl] = useUploadMediaGetIdMutation();
  const [files, setFiles] = useState([]);

  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: '.pdf,.doc,.docx,.pptx,.xlsx',
  //   maxFiles: 1, // Adjust as necessary
  //   onDrop: acceptedFiles => {
  //     const filesWithPreview = handleDocumentFiles(acceptedFiles);
  //     setFiles(filesWithPreview);
  //     onFilesUploaded({
  //       target: {
  //         name: 'doc',
  //         value: filesWithPreview
  //       }
  //     });
  //   }
  // });

  const onDrop = useCallback(
    (acceptedFiles) => {
      const selectedfile = acceptedFiles[0]; // Get the first (and only) file
      const filesWithPreview = handleDocumentFiles(acceptedFiles);
      setFiles(filesWithPreview);

      const formData = new FormData();
      formData.append("file", selectedfile);
      const fileUrl = "abc";

      onFilesUploaded({
        target: {
          name: "document",
          value: fileUrl,
          preview: selectedfile.type,
        },
      });

      // getmediaUrl(formData)
      //   .then((success) => {
      //     if (success?.data?.statusCode === 200) {
      //       const fileUrl = success?.data?.data;

      //       // Only call onFilesUploaded once URL is set
      //       onFilesUploaded({
      //         target: {
      //           name: 'document',
      //           value: fileUrl,
      //           preview: selectedfile.type
      //         }
      //       });
      //     } else if (success?.data?.statusCode > 300) {
      //       alert(success?.data?.message);
      //     }
      //   })
      //   .catch((error) => {
      //     alert(error?.message);
      //   });
    },
    [onFilesUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf,.doc,.docx,.pptx,.xlsx",
    onDrop,
  });

  const removeFile = () => {
    setFiles([]);
  };

  const DropzoneFile = (props) => {
    const { path, preview } = props;

    // Define icons for different file types
    const getFileIcon = () => {
      switch (preview) {
        case "pdf":
          return <FaFilePdf style={{ minWidth: "20px", minHeight: "20px" }} />;
        case "doc":
          return <FaFileWord style={{ minWidth: "20px", minHeight: "20px" }} />;
        case "ppt":
          return (
            <FaFilePowerpoint style={{ minWidth: "20px", minHeight: "20px" }} />
          );
        case "xlsx":
          return (
            <PiMicrosoftExcelLogo
              style={{ minWidth: "20px", minHeight: "20px" }}
            />
          );
        default:
          return null;
      }
    };

    return (
      <Col className="d-flex align-items-center m-2">
        {getFileIcon()}
        <Card.Text className="ms-2 dropzone-filename fw-bold mb-0">
          {path}
        </Card.Text>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip className="m-0">Remove</Tooltip>}
        >
          <Card.Link className="ms-auto" onClick={removeFile}>
            <XCircleIcon className="icon icon-xs text-danger" />
          </Card.Link>
        </OverlayTrigger>
      </Col>
    );
  };

  return (
    <>
      {files.length > 0 ? (
        <Row className="dropzone-files">
          {files.map((file) => (
            <DropzoneFile key={file.path} {...file} />
          ))}
        </Row>
      ) : (
        <div
          {...getRootProps({
            className:
              "dropzone rounded d-flex align-items-center justify-content-center m-2",
          })}
        >
          <Form.Control {...getInputProps()} />
          <div className="dz-default dz-message text-center">
            <p className="dz-button mb-0">Drop files here to upload</p>
          </div>
        </div>
      )}
    </>
  );
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~IMAGES~WHATSAPP~HEADER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// gives URL
export const DropImagesForm = ({ onFilesUploaded }) => {
  const [files, setFiles] = useState([]);
  // const [getmediaUrl] = useUploadMediaGetIdMutation();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const selectedfile = acceptedFiles[0]; // Get the first (and only) file
      const fileWithPreview = {
        ...selectedfile,
        preview: URL.createObjectURL(selectedfile),
      };
      setFiles([fileWithPreview]);

      const formData = new FormData();
      formData.append("file", selectedfile);
      const fileUrl = "abc";

      onFilesUploaded({
        target: {
          name: "image",
          value: fileUrl,
          preview: URL.createObjectURL(acceptedFiles[0]),
        },
      });
    },
    [onFilesUploaded]
  );
  // Memoize callback to avoid re-creation on each render

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });
  const removeFile = () => {
    setFiles([]);
  };

  const DropzoneFile = useMemo(
    () => (props) => {
      const { path, preview } = props;
      return (
        <Col className="dropzone-preview m-2">
          <Image src={preview} className="dropzone-image" />
          <div className="d-flex">
            <Card.Text className="dropzone-filename">{path}</Card.Text>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip className="m-0">Remove</Tooltip>}
            >
              <Card.Link className="ms-auto" onClick={removeFile}>
                <XCircleIcon className="icon icon-xs text-danger" />
              </Card.Link>
            </OverlayTrigger>
          </div>
        </Col>
      );
    },
    []
  ); // Only recreate this component when necessary

  return (
    <>
      {files.length > 0 ? (
        <Row className="dropzone-files">
          {files.map((file) => (
            <DropzoneFile key={file.path} {...file} />
          ))}
        </Row>
      ) : (
        <div
          {...getRootProps({
            className:
              "dropzone rounded d-flex align-items-center justify-content-center m-2",
          })}
        >
          <Form.Control {...getInputProps()} />
          <div className="dz-default dz-message text-center">
            <p className="dz-button mb-0">Drop images here to upload</p>
          </div>
        </div>
      )}
    </>
  );
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~VIDEO~~WHATSAPP~~~HEADER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// gives URL -> changed to media ID
export const DropVideosForm = ({ onFilesUploaded }) => {
  // const [getmediaUrl] = useUploadMediaGetIdMutation();
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const selectedfile = acceptedFiles[0]; // Get the first (and only) file
      const fileWithPreview = {
        ...selectedfile,
        preview: URL.createObjectURL(selectedfile),
      };
      setFiles([fileWithPreview]);

      const formData = new FormData();
      formData.append("file", selectedfile);
      const fileUrl = "abc";

      onFilesUploaded({
        target: {
          name: "video",
          value: fileUrl,
          preview: URL.createObjectURL(acceptedFiles[0]),
        },
      });
    },
    [onFilesUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/*",
    onDrop,
  });
  const removeFile = () => {
    setFiles([]);
  };

  const DropzoneFile = useMemo(
    () => (props) => {
      const { path, preview } = props;

      return (
        <Col className="dropzone-preview m-2">
          <video controls width="100%" className="dropzone-video">
            <source src={preview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="d-flex">
            <Card.Text className="dropzone-filename">{path}</Card.Text>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip className="m-0">Remove</Tooltip>}
            >
              <Card.Link className="ms-auto" onClick={removeFile}>
                <XCircleIcon className="icon icon-xs text-danger" />
              </Card.Link>
            </OverlayTrigger>
          </div>
        </Col>
      );
    },
    []
  );

  return (
    <>
      {files.length > 0 ? (
        <Row className="dropzone-files">
          {files.map((file) => (
            <DropzoneFile key={file.path} {...file} />
          ))}
        </Row>
      ) : (
        <div
          {...getRootProps({
            className:
              "dropzone rounded d-flex align-items-center justify-content-center m-2",
          })}
        >
          <Form.Control {...getInputProps()} />
          <div className="dz-default dz-message text-center">
            <p className="dz-button mb-0">Drop videos here to upload</p>
          </div>
        </div>
      )}
    </>
  );
};

export const GeneralInfoForm = () => {
  const [birthday, setBirthday] = useState("");

  return (
    <Card border="0" className="shadow mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your first name"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Also your last name"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Birthday</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <CalendarIcon className="icon icon-xs" />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          birthday ? moment(birthday).format("DD/MM/YYYY") : ""
                        }
                        placeholder="dd/mm/yyyy"
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select defaultValue="0" className="mb-0">
                  <option value="0">Gender</option>
                  <option value="1">Female</option>
                  <option value="2">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="name@company.com"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="+12-345 678 910"
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Location</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your home address"
                />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control required type="number" placeholder="No." />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control required type="text" placeholder="City" />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Select state</Form.Label>
                <Form.Select id="state" defaultValue="0">
                  <option value="0">State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control required type="tel" placeholder="ZIP" />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button
              variant="gray-800"
              type="submit"
              className="mt-2 animate-up-2"
            >
              Save All
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const CardDetailsForm = () => {
  const RequiredLabel = ({ label }) => (
    <Form.Label>
      {label}
      <span className="text-danger"> * </span>
    </Form.Label>
  );

  return (
    <Card as="form" border="0" className="shadow p-3 pb-4 mb-4">
      <Card.Header className="mx-lg-4 p-0 py-3 py-lg-4 mb-4 mb-md-0">
        <h5 className="mb-0">Card details</h5>
      </Card.Header>
      <Card.Body className="p-0 p-md-4">
        <Row className="justify-content-center">
          <Col xs={12}>
            <Form.Group id="cardNameLabel">
              <RequiredLabel
                label={
                  <span className="small text-dark">
                    (Full name as displayed on card)
                  </span>
                }
              />
              <InputGroup className="mb-4">
                <Form.Control required type="text" placeholder="Name on Card" />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col xs={12} className="mb-4">
            <Form.Group id="cardNumberLabel">
              <RequiredLabel label="Card Number" />
              <InputGroup>
                <InputGroup.Text className="text-gray-600">
                  <CreditCardIcon className="icon icon-xs" />
                </InputGroup.Text>
                <Form.Control
                  required
                  type="number"
                  placeholder="0000 0000 0000 0000"
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col xs={12} md={6} className="mb-4 mb-lg-0">
            <Form.Group id="cardCVCLabel">
              <RequiredLabel label="CVC" />
              <Form.Control required type="number" placeholder="CVC" />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group id="cardExpiryLabel">
              <RequiredLabel label="Card Expiry" />
              <InputGroup>
                <InputGroup.Text className="text-gray-600">
                  <CalendarIcon className="icon icon-xs" />
                </InputGroup.Text>
                <Form.Control required type="number" placeholder="MM / YY" />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col xs={12} className="mt-4">
            <Button
              variant="gray-800"
              className="animate-up-2 mt-2"
              type="submit"
            >
              Update
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
