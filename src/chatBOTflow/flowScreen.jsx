import React, { useEffect, useState } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Controls,
    Handle, // Handle might not exist in older versions; remove if necessary
} from "react-flow-renderer";
import "react-flow-renderer/dist/style.css";

import { FaComment, FaExclamationTriangle, FaRedo, FaUserCircle } from "react-icons/fa";
import { VscRobot } from "react-icons/vsc";
import { MdAddCircleOutline, MdOutlineSettings } from "react-icons/md";
import { APIModal, BotResponseModal, LoopbackModal, UserInputModal } from "components/Modals";
import { TbEdit } from "react-icons/tb";
import { XCircleIcon } from "@heroicons/react/outline";
import { v4 as uuidv4 } from "uuid";
import {savedFlow} from './savedFlow';


// Custom Node Component
const CustomNode = ({ data }) => {
    const IconComponent = iconMap[data.icon];

    return (
        <div
            style={{
                padding: '4px 8px',
                background: 'transparent',
                color: data.color,
                border: `1px solid ${data.color}`,
                borderRadius: 13,
                fontSize: 12,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                gap: 5,
                position: "relative",
            }}
        >
            {IconComponent} {data.title}

            {/* Only the Start node has a right handle */}
            {data.type === "start" ? (
                <Handle type="source" position="right" />
            ) : (data.type === "fallback" || data.type === "loopback") ? (
                <Handle type="target" position="left" />
            ) :
                (
                    <>
                        <Handle type="target" position="left" />
                        <Handle type="source" position="right" />
                    </>
                )}
        </div>
    );
}

const iconMap = {
    FaUserCircle: <FaUserCircle />,
    FaComment: <FaComment />,
    FaExclamationTriangle: <FaExclamationTriangle />,
    VscRobot: <VscRobot />,
    MdOutlineSettings: <MdOutlineSettings />,
    FaRedo: <FaRedo />,
};

// Register Node Types
const nodeTypes = {
    start: CustomNode,
    userInput: CustomNode,
    fallback: CustomNode,
    botResponse: CustomNode,
    api: CustomNode,
    loopback: CustomNode,
};

// Define Node Properties (label, color, icon, allowed children)
const nodeProperties = {
    start: {
        type: "start",
        title: "Start",
        color: "#0084FF", // Blue
        icon: "FaComment", // Chat icon
        children: ["userInput", "fallback"], // Can only connect to these nodes
    },
    userInput: {
        type: "userInput",
        title: "User Input",
        color: "#FF9900", // Orange
        icon: "FaUserCircle", // User icon
        children: ["botResponse", "api", "loopback"],
    },
    fallback: {
        type: "fallback",
        title: "Fallback",
        color: "#FF0000", // Red
        icon: "FaExclamationTriangle", // Warning icon
        children: [], // No children allowed
    },
    botResponse: {
        type: "botResponse",
        title: "Bot Response",
        color: "#33CC33", // Green
        icon: "VscRobot", // Bot icon
        children: ["userInput"],
    },
    api: {
        type: "api",
        title: "API",
        color: "#6600CC", // Purple
        icon: "MdOutlineSettings", // Server icon
        children: ["botResponse"],
    },
    loopback: {
        type: "loopback",
        title: "Loopback",
        color: "#666666", // Gray
        icon: "FaRedo", // Loop icon
        children: [], // No children allowed
    },
};

const HorizontalFlow = ({ onDataChange, isFullScreen, boxRef }) => {
    // in case of editing
    const [chatDetails] = useState(JSON.parse(localStorage.getItem("chatDetails")) || {});

    const chatId = chatDetails.id || null;

    useEffect(() => {
        if (chatId !== null && chatId === 1) {
            setNodes(savedFlow)
            loadFlowFromJson(savedFlow);
        }
        // eslint-disable-next-line
    }, [chatId])

    // initial starting node on chat initialisation
    const [nodes, setNodes, onNodesChange] = useNodesState([
        {
            id: "1",
            connectedTo: "0",
            type: "start",
            data: { ...nodeProperties["start"] },
            position: { x: 400, y: 100 },
        },
    ]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNodeId, setselectedNodeId] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [modalType, setmodalType] = useState(null);
    // const [loopNodes, setLoopNodes] = useState({});

    // <----on forceful connect links---->
    // const onConnect = useCallback((params) => {
    //     setEdges((els) => addEdge(params, els));
    // }, []);

    // creates nodes from fetched Data
    const loadFlowFromJson = (jsonData) => {

        const loadedEdges = jsonData.filter((node) => node.connectedTo !== undefined && node.connectedTo !== null)
            .map((node) => ({
                id: `e${node.connectedTo}-${node.id}`,
                source: node.connectedTo,
                target: node.id,
                type: 'smoothstep', // or 'default', depending on your styling
            }));

        setEdges(loadedEdges);
    };

    // opens options
    const onNodeClick = (_, node) => {

        if (selectedNode) {
            setselectedNodeId(null);  //for toggling Menu
        } else {
            setselectedNodeId(node.id);  //also sets parent/current node for creating/editing
            setMenuPosition({
                x: window.innerWidth / 2 - 100,
                y: window.innerHeight / 2 - 20,
            });
        }

        // making options for loopback
        const botResponseNodes = nodes
            .filter(node => node.type === "botResponse" || node.type === "start") 
            .map(node => ({ value: node.id, label: node.data.title }));  // Extract from node.data
        localStorage.setItem('optionsBack', JSON.stringify(botResponseNodes));
    };

    const openModal = (type) => {
        setmodalType(type);
    };

    /* Dynamic Modal Component */
    const DynamicModal = ({ modalType, isOpen, onClose, data, onSubmit, container }) => {
        const ModalComponents = {
            userInput: UserInputModal,
            fallback: BotResponseModal,
            botResponse: BotResponseModal,
            start: BotResponseModal,
            api: APIModal,
            loopback: LoopbackModal
        };

        const SelectedModal = ModalComponents[modalType] || null;

        return SelectedModal ? <SelectedModal isOpen={isOpen} onClose={onClose} data={data} onSubmit={onSubmit} container={container} /> : null;
    };

    const closeModal = () => {
        setmodalType(false);
        setselectedNodeId(null);
        setMenuPosition(null);
        setDataToEdit(null);
    };

    const handleFormSubmit = (newLabel) => {
        addNode(newLabel, modalType);
        closeModal();
    }

    const addNode = (newData, nodeType) => {
        if (!selectedNodeId) return;

        setNodes((prevNodes) => {
            const existingNodeIndex = prevNodes.findIndex((node) => node.id === selectedNodeId);
            if (selectedNodeId === newData.id) {
                // Editing existing node

                const updatedNodes = [...prevNodes];
                updatedNodes[existingNodeIndex] = {
                    ...updatedNodes[existingNodeIndex],
                    data: {
                        ...updatedNodes[existingNodeIndex].data,
                        ...newData,
                    },
                };

                return updatedNodes;
            } else {
                // Creating a new node
                const parentNode = prevNodes.find((node) => node.id === selectedNodeId);
                if (!parentNode) return prevNodes;

                const newNodeId = uuidv4();
                const newNode = {
                    id: newNodeId,
                    connectedTo: parentNode.id,
                    type: nodeType,
                    data: {
                        ...nodeProperties[modalType],
                        ...newData,
                    },
                    position: {
                        x: parentNode.position.x + 120,
                        y: parentNode.position.y + Math.random() * 100 - 50,
                    },
                };

                setEdges((prevEdges) => [
                    ...prevEdges,
                    { id: `e${parentNode.id}-${newNodeId}`, source: parentNode.id, target: newNodeId, type: "smoothstep", animated: true },
                ]);

                return [...prevNodes, newNode];
            }
        });

        setselectedNodeId(null);
        setMenuPosition(null);
    };

    useEffect(() => {
        if (onDataChange) {
            // console.log('consoling before sending', nodes);
            onDataChange(nodes); // send latest nodes to parent
        }
        // eslint-disable-next-line
    }, [nodes]);


    const [dataToEdit, setDataToEdit] = useState(null);
    const editNode = (nodeId) => {
        const findNode = nodes.find((node) => node.id === nodeId); //taking out Node from its Id
        setDataToEdit(findNode);
        openModal(findNode.type);
    }
    
    const deleteNode = (nodeId) => {
        const collectDescendants = (id, allNodes, visited = new Set()) => {
            if (visited.has(id)) return [];
            visited.add(id);

            const directChildren = allNodes
                .filter((node) => node.connectedTo === id)
                .map((node) => node.id);

            return [
                id,
                ...directChildren.flatMap((childId) =>
                    collectDescendants(childId, allNodes, visited)
                ),
            ];
        };

        const allToDelete = collectDescendants(nodeId, nodes);
        const updatedNodes = nodes.filter((node) => !allToDelete.includes(node.id));
        const updatedEdges = edges.filter(
            (edge) =>
                !allToDelete.includes(edge.source) &&
                !allToDelete.includes(edge.target)
        );

        setNodes(updatedNodes);
        setEdges(updatedEdges);

        // Close menu etc.
        setselectedNodeId(null);
        setMenuPosition(null);
    };


    const selectedNode = nodes.find((node) => node.id === selectedNodeId);
    const children = nodeProperties[selectedNode?.type]?.children || [];


    return (
        <div style={{ height: '91%', border: '1px solid hsla(220, 13.00%, 91.00%, 0.50)', borderRadius: 'inherit' }}>
            {nodes.length >= 1 ?
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes} // Register node types
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    // onConnect={onConnect}   //for dynamic linking by user
                    onNodeClick={onNodeClick}
                    fitView
                    attributionPosition="bottom-left"
                >
                    <Controls />
                    {menuPosition && selectedNodeId && (
                        <div
                            style={{
                                position: "absolute",
                                top: menuPosition.y,
                                left: menuPosition.x,
                                transform: 'translate(-50%, -50%)',
                                background: "#fff",
                                border: "1px solid #ccc",
                                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                                zIndex: 1000,
                                borderRadius: '7px'
                            }}
                        >
                            <ul className="list-group">
                                {/* Conditionally render 'Add Node' only if there are children */}
                                {children.length > 0 && (
                                    <li className="list-group-item text-info">
                                        <MdAddCircleOutline /> Add Next Node
                                        <ul className="list-group">
                                            {children.map((type) => (
                                                <button key={type} onClick={() => openModal(type)} className="list-group-item list-group-item-action">
                                                    {iconMap[nodeProperties[type].icon]} {nodeProperties[type].title}
                                                </button>
                                            ))}
                                        </ul>
                                    </li>
                                )}
                                {/* Edit Button */}
                                <button className="list-group-item list-group-item-action text-success" onClick={() => editNode(selectedNodeId)}>
                                    <TbEdit /> Edit
                                </button>
                                {/* Delete Button (Not shown for root node '1') */}
                                {selectedNodeId !== '1' && (
                                    <button className="list-group-item list-group-item-action text-danger" title={'Delete with children'} onClick={() => deleteNode(selectedNodeId)}>
                                        <XCircleIcon className="icon icon-xs" /> Delete Chain
                                    </button>
                                )}
                            </ul>
                        </div>
                    )}
                </ReactFlow>
                :
                <div className="loadingFlow">
                    <span>L</span>
                    <span>O</span>
                    <span>A</span>
                    <span>D</span>
                    <span>I</span>
                    <span>N</span>
                    <span>G</span>
                </div>
            }

            {/* Node Modals for Inputs */}
            {modalType && (
                <DynamicModal
                    modalType={modalType}
                    isOpen={!!modalType}
                    onClose={closeModal}
                    data={{ type: modalType, details: dataToEdit }}
                    onSubmit={handleFormSubmit}
                    container={isFullScreen ? boxRef.current : document.body}
                />
            )}
        </div>
    );
};

export default HorizontalFlow;