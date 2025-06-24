import React, { useEffect, useState } from "react";
import { CheckCircleIcon, ClockIcon, HomeIcon, ShieldExclamationIcon } from "@heroicons/react/solid";
import { Breadcrumb, Button, Card, Col, Dropdown, Form, Modal, ProgressBar } from "react-bootstrap";
// import { useLocation } from "react-router-dom";
import { Routes } from "routes";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { RiSettings5Line } from "react-icons/ri";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import HorizontalFlow from "./flowScreen";
import { IoChevronBack } from "react-icons/io5";


export default () => {
    const history = useHistory();

    const [chatDetails] = useState(JSON.parse(localStorage.getItem("chatDetails")) || {});

    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(0);
    const [reason, setReason] = useState('');
    const [variant, setVariant] = useState('primary');

    const [chatFlow, setChatFlow] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [timer, setTimer] = useState(chatDetails.resetTimer || '0');
    const [backOption, setBackOption] = useState(chatDetails.backOption || '');
    // Close the dropdown
    const handleSave = () => {
        setShowDropdown(false);
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

    const handleFlowData = (data) => {
        setChatFlow(data);
    };
    // const [saveChatFlow] = usePostFlowMutation();
    // const [updateFlow] = useUpdateFlowMutation();
    // console.log("jabba agaya")

    const saveFlow = () => {
    //     if (chatDetails.id) {
    //         const postData = {
    //             // ...chatDetails,
    //             id: chatDetails.id,
    //             flow: chatFlow,
    //             resetTimer: timer ? timer : chatDetails.resetTimer,
    //             backOption: backOption ? backOption : chatDetails.backOption,
    //         }
    //         // console.log('updateFlow postData', postData);

    //         updateFlow(postData)
    //             .then((success) => {
    //                 setShowModal(true);
    //                 if (success?.data?.statusCode >= 200 && success?.data?.statusCode <= 204) {
    //                     setReason(success.data.message);
    //                     setVariant('tertiary');
    //                     setProgress(100);
    //                 } else {
    //                     setReason(success?.data?.message || 'Failed to create');
    //                     setVariant('warning');
    //                     setProgress(100);
    //                 }
    //             })
    //             .catch((error) => {
    //                 setShowModal(true);
    //                 setReason(error?.data?.message || 'Failed to create');
    //                 setVariant('warning');
    //                 setProgress(100);
    //             });
    //     }
    //     else {
    //         const postData = {
    //             ...chatDetails,
    //             flow: chatFlow,
    //             resetTimer: timer,
    //             backOption: backOption,
    //         }
    //         // console.log('new postData', postData);

    //         saveChatFlow(postData)
    //             .then((success) => {
    //                 setShowModal(true);
    //                 if (success?.data?.statusCode >= 200 && success?.data?.statusCode <= 204) {
    //                     setReason(success.data.message);
    //                     setVariant('tertiary');
    //                     setProgress(100);
    //                 } else {
    //                     setReason(success?.data?.message || 'Failed to create');
    //                     setVariant('warning');
    //                     setProgress(100);
    //                 }
    //             })
    //             .catch((error) => {
    //                 setShowModal(true);
    //                 setReason(error?.data?.message || 'Failed to create');
    //                 setVariant('warning');
    //                 setProgress(100);
    //             });
    //     }
    }


    // MODAL
    const handleCloseModal = () => {
        setShowModal(false);
        setTimeout(() => {
            setProgress(0);
            history.push(Routes.ChatBot.path);
        }, 100);
        setReason('');
        setVariant('primary');
    };
    useEffect(() => {
        if (showModal) {
            const interval = setInterval(() => {
                setProgress(prevProgress => {
                    if (prevProgress >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return Math.min(prevProgress + 2.5, 95);   //95 automatic, 100 only after API response
                });
            }, 100);
        }
    }, [showModal]);


    return (
        <>
            <div className="flow-main-screen m-3">
                {/* headers */}
                <div className="d-flex justify-content-between align-items-center pb-2">
                    <div className="d-flex flex-column p-0 w-50">
                        <div className="d-flex align-items-center">
                            <span className="me-2 fs-4 d-flex align-items-center">{getChannelIcon(chatDetails?.channel)}</span>
                            <Card.Title className="me-2 mb-0 text-white text-truncate">
                                {chatDetails?.name.toUpperCase()}
                            </Card.Title>
                            {/* <TbEdit className="icon icon-sm flex-shrink-0 popOut" /> */}
                        </div>
                        <p className="m-0 truncate-twoline" style={{ color: "#c4c2c2", fontSize: "0.8rem" }}>
                            {chatDetails?.description}
                        </p>
                    </div>
                    <div className="d-flex">
                        <Button variant="secondary" type="submit" className="scale-up-2 me-2" onClick={saveFlow}>
                            Save
                        </Button>
                        <Button className="scale-up-2 me-2" as={Link} to={Routes.ChatBot.path}>
                            <IoChevronBack className="icon icon-xs"/>
                        </Button>
                    </div>
                </div>

                {/* flow screen */}
                <HorizontalFlow onDataChange={handleFlowData} />
            </div >



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
                        {progress !== 100 ?
                            (<span className="modal-icon display-1">
                                <ClockIcon className="icon icon-xl text-white" />
                            </span>) :
                            variant === 'tertiary' ?
                                (<span className="modal-icon display-1">
                                    <CheckCircleIcon className="icon icon-xl text-white" />
                                </span>) :
                                <span className="modal-icon display-1">
                                    <ShieldExclamationIcon className="icon icon-xl text-white" />
                                </span>
                        }

                        <Modal.Title className="text-white mb-3">
                            {progress !== 100 ? <h3>Sending Request</h3> : variant === 'tertiary' ? <h3>ChatBot Flow Created Successfully</h3> : <h3>Something Went Wrong!</h3>}
                        </Modal.Title>
                        <ProgressBar variant="primary" now={progress} min={0} max={100} animated />
                        {variant !== 'tertiary' ?
                            <p className="mb-4 text-danger">
                                {reason}
                            </p> : ''}
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center pt-0 pb-3">
                    <Button variant="white" size="sm" className="text-primary" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}