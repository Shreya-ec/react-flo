export const savedFlow =  [
        {
          "id": "1",
          "data": {
            "id": "1",
            "icon": "FaComment",
            "type": "start",
            "color": "#0084FF",
            "title": "Start",
            "children": [
              "userInput",
              "fallback"
            ],
            "ResponseModels": [
              {
                "list": {
                  "ListValue": [
                    {
                      "buttons": [
                        {
                          "title": "🌍 Plan a Trip",
                          "description": ""
                        },
                        {
                          "title": "📑 Upload Travel Docs",
                          "description": ""
                        },
                        {
                          "title": "🏖 Share Destination Inspiration (images)",
                          "description": ""
                        },
                        {
                          "title": "❓ Travel FAQs",
                          "description": ""
                        }
                      ],
                      "sectionText": "plan trip"
                    }
                  ],
                  "ListButtonText": "see help options:",
                  "UserInputKeyword": "",
                  "SelectedListVariable": null,
                  "IsGetListFromVariable": false
                },
                "Product": null,
                "buttons": null,
                "Products": null,
                "MediaType": "TEXT",
                "ButtonType": "button",
                "ResponseText": "Hi 👋 I’m your Travel Buddy! Where would you like my help today?",
                "ButtonSubType": null,
                "MediaFileName": null
              },
              {
                "list": null,
                "Product": null,
                "buttons": null,
                "Products": null,
                "MediaType": "IMAGE",
                "ButtonType": "button",
                "ResponseText": "Travel to your dream locations with us.",
                "ButtonSubType": null,
                "MediaFileName": "4::YXBwbGljYXRpb24vcGRm:ARYivCK17ZqehMzdanwOrK_EYA8AdmA_BFagJ0C4bvYtNj0_nKzXgxm09b66c9MqQoQYHpD3izGx8vklSP_eImnX2wH7ApH66XSan7mvx6OMJw:e:1758443831:1559708287761819:100066839164237:ARbTimE3asZXLQ3lHVU"
              }
            ]
          },
          "type": "start",
          "width": 62,
          "height": 28,
          "position": {
            "x": 100,
            "y": 100
          },
          "selected": false,
          "connectedTo": "0"
        },
        {
          "id": "2",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user 1",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "🌍 Plan a Trip",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 69,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 201.5,
            "y": -43.83859169816981
          },
          "selected": false,
          "connectedTo": "1",
          "positionAbsolute": {
            "x": 201.5,
            "y": -43.83859169816981
          }
        },
        {
          "id": "3",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user 2",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "📑 Upload Travel Docs",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 71,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 203,
            "y": 47.29223309037272
          },
          "selected": false,
          "connectedTo": "1",
          "positionAbsolute": {
            "x": 203,
            "y": 47.29223309037272
          }
        },
        {
          "id": "5",
          "data": {
            "id": "5",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user 3",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "❓ Travel FAQs",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 71,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 199.5,
            "y": 231.34939016618995
          },
          "selected": false,
          "connectedTo": "1",
          "positionAbsolute": {
            "x": 199.5,
            "y": 231.34939016618995
          }
        },
        {
          "id": "6",
          "data": {
            "id": "",
            "icon": "VscRobot",
            "type": "botResponse",
            "color": "#33CC33",
            "title": "bot trip options",
            "children": [
              "userInput"
            ],
            "ResponseModels": [
              {
                "list": null,
                "Product": null,
                "buttons": [
                  {
                    "text": "🏖 Beach"
                  },
                  {
                    "text": "🏔 Adventure"
                  },
                  {
                    "text": "🏙 City"
                  }
                ],
                "Products": null,
                "MediaType": "TEXT",
                "ButtonType": "Buttons",
                "ResponseText": "Awesome! First, which type of trip are you interested in?",
                "ButtonSubType": "Quick Reply",
                "MediaFileName": null
              }
            ]
          },
          "type": "botResponse",
          "width": 122,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 308,
            "y": -44.312212824481065
          },
          "selected": false,
          "connectedTo": "2",
          "positionAbsolute": {
            "x": 308,
            "y": -44.312212824481065
          }
        },
        {
          "id": "7",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user- beach",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "🏖 Beach",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 104,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 451,
            "y": -215.0397826073289
          },
          "selected": false,
          "connectedTo": "6",
          "positionAbsolute": {
            "x": 451,
            "y": -215.0397826073289
          }
        },
        {
          "id": "8",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user -adventure",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "🏔 Adventure",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 127,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 458.5,
            "y": -134.13519078711568
          },
          "selected": false,
          "connectedTo": "6",
          "positionAbsolute": {
            "x": 458.5,
            "y": -134.13519078711568
          }
        },
        {
          "id": "9",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user - city",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "🏙 City",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 94,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 462,
            "y": -43.275543232754416
          },
          "selected": false,
          "connectedTo": "6",
          "positionAbsolute": {
            "x": 462,
            "y": -43.275543232754416
          }
        },
        {
          "id": "10",
          "data": {
            "id": "",
            "icon": "VscRobot",
            "type": "botResponse",
            "color": "#33CC33",
            "title": "bot - for beach",
            "children": [
              "userInput"
            ],
            "ResponseModels": [
              {
                "list": null,
                "Product": null,
                "buttons": null,
                "Products": null,
                "MediaType": "TEXT",
                "ButtonType": "button",
                "ResponseText": "Nice! 🏖 Do you already have a destination in mind, or should I suggest one?",
                "ButtonSubType": null,
                "MediaFileName": null
              }
            ]
          },
          "type": "botResponse",
          "width": 121,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 578,
            "y": -215.49586506350073
          },
          "selected": false,
          "connectedTo": "7",
          "positionAbsolute": {
            "x": 578,
            "y": -215.49586506350073
          }
        },
        {
          "id": "11",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user -suggest",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "Suggest One",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 115,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 716,
            "y": -249.16364134852245
          },
          "selected": false,
          "connectedTo": "10",
          "positionAbsolute": {
            "x": 716,
            "y": -249.16364134852245
          }
        },
        {
          "id": "12",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user - own choice",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "{{city}}",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 138,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 713.5,
            "y": -202.79957209625056
          },
          "selected": false,
          "connectedTo": "10",
          "positionAbsolute": {
            "x": 713.5,
            "y": -202.79957209625056
          }
        },
        {
          "id": "13",
          "data": {
            "id": "13",
            "icon": "VscRobot",
            "type": "botResponse",
            "color": "#33CC33",
            "title": "bot - recommends",
            "children": [
              "userInput"
            ],
            "ResponseModels": [
              {
                "list": null,
                "Product": null,
                "buttons": null,
                "Products": null,
                "MediaType": "IMAGE",
                "ButtonType": "button",
                "ResponseText": "Bali, Indonesia",
                "ButtonSubType": null,
                "MediaFileName": "4::YXBwbGljYXRpb24vcGRm:ARZAt-0xlEtjZbK31GwcRzqG4A0G2Y6x4KXYD_he51Ygt04nOHn09W5Q1qQic_V64BYcuVxBDuEqhPgHAeZ-9dUcNyDdyXCk7hSjxBWOrkMqHw:e:1758443975:632522494395333:100066839164237:ARYBWVI_rq6oYcu8P2o"
              },
              {
                "list": null,
                "Product": null,
                "buttons": null,
                "Products": null,
                "MediaType": "IMAGE",
                "ButtonType": "button",
                "ResponseText": "Goa, India",
                "ButtonSubType": null,
                "MediaFileName": "4::YXBwbGljYXRpb24vcGRm:ARbEXyGWN9ZVdSBUpNfBISZXbOadzSxvsmxDpb0mDmT_KykThU8Cd5qXAlavdYjAZuTC0O6SbyUQ8tQfoQIh5HU0DoagkaXazCWn8TwPAWDZEA:e:1758443980:852842612296321:100066839164237:ARa_g0vZp5ZthGS0aoc"
              }
            ]
          },
          "type": "botResponse",
          "width": 141,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 876,
            "y": -248.55768651111273
          },
          "selected": false,
          "connectedTo": "11",
          "positionAbsolute": {
            "x": 876,
            "y": -248.55768651111273
          }
        },
        {
          "id": "14",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user - city choice",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "{{some city}}",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 135,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 1031.5,
            "y": -310.27466282682565
          },
          "selected": false,
          "connectedTo": "13",
          "positionAbsolute": {
            "x": 1031.5,
            "y": -310.27466282682565
          }
        },
        {
          "id": "15",
          "data": {
            "id": "15",
            "icon": "VscRobot",
            "type": "botResponse",
            "color": "#33CC33",
            "title": "bot - ask for itinerary",
            "children": [
              "userInput"
            ],
            "ResponseModels": [
              {
                "list": null,
                "Product": null,
                "buttons": [
                  {
                    "text": "Yes"
                  },
                  {
                    "text": "No"
                  }
                ],
                "Products": null,
                "MediaType": "TEXT",
                "ButtonType": "Buttons",
                "ResponseText": "Would you like me to create a sample itinerary (PDF) for you?",
                "ButtonSubType": "Quick Reply",
                "MediaFileName": null
              }
            ]
          },
          "type": "botResponse",
          "width": 155,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 870,
            "y": -207.07696556052366
          },
          "selected": false,
          "connectedTo": "12",
          "positionAbsolute": {
            "x": 870,
            "y": -207.07696556052366
          }
        },
        {
          "id": "16",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user - yes",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "Yes",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 93,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 1046.5,
            "y": -270.49197075524984
          },
          "selected": false,
          "connectedTo": "15",
          "positionAbsolute": {
            "x": 1046.5,
            "y": -270.49197075524984
          }
        },
        {
          "id": "17",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user - no",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "No",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 87,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 1050,
            "y": -218.82978218147395
          },
          "selected": false,
          "connectedTo": "15",
          "positionAbsolute": {
            "x": 1050,
            "y": -218.82978218147395
          }
        },
        {
          "id": "18",
          "data": {
            "id": "",
            "icon": "VscRobot",
            "type": "botResponse",
            "color": "#33CC33",
            "title": "bot - end",
            "children": [
              "userInput"
            ],
            "ResponseModels": [
              {
                "list": null,
                "Product": null,
                "buttons": [
                  {
                    "text": "Yes"
                  },
                  {
                    "text": "No"
                  }
                ],
                "Products": null,
                "MediaType": "TEXT",
                "ButtonType": "Buttons",
                "ResponseText": "Was this helpful?",
                "ButtonSubType": "Quick Reply",
                "MediaFileName": null
              }
            ]
          },
          "type": "botResponse",
          "width": 88,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 1167,
            "y": -218.75181729858323
          },
          "selected": false,
          "connectedTo": "17",
          "positionAbsolute": {
            "x": 1167,
            "y": -218.75181729858323
          }
        },
        {
          "id": "19",
          "data": {
            "id": "19",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user - yes2",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "Yes",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 100,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 1272,
            "y": -235.0453790890576
          },
          "selected": false,
          "connectedTo": "18",
          "positionAbsolute": {
            "x": 1272,
            "y": -235.0453790890576
          }
        },
        {
          "id": "20",
          "data": {
            "id": "20",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user - no2",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "No",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 95,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 1273.5,
            "y": -198.60497077243792
          },
          "selected": false,
          "connectedTo": "18",
          "positionAbsolute": {
            "x": 1273.5,
            "y": -198.60497077243792
          }
        },
        {
          "id": "21",
          "data": {
            "id": "",
            "icon": "VscRobot",
            "type": "botResponse",
            "color": "#33CC33",
            "title": "bot - positive end",
            "children": [
              "userInput"
            ],
            "ResponseModels": [
              {
                "list": null,
                "Product": null,
                "buttons": null,
                "Products": null,
                "MediaType": "TEXT",
                "ButtonType": "button",
                "ResponseText": "Yay! 🎉 Have a safe journey.",
                "ButtonSubType": null,
                "MediaFileName": null
              }
            ]
          },
          "type": "botResponse",
          "width": 135,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 1389.5,
            "y": -247.76093546395282
          },
          "selected": false,
          "connectedTo": "19",
          "positionAbsolute": {
            "x": 1389.5,
            "y": -247.76093546395282
          }
        },
        {
          "id": "22",
          "data": {
            "id": "",
            "icon": "VscRobot",
            "type": "botResponse",
            "color": "#33CC33",
            "title": "bot - negative end",
            "children": [
              "userInput"
            ],
            "ResponseModels": [
              {
                "list": null,
                "Product": null,
                "buttons": null,
                "Products": null,
                "ButtonType": "button",
                "ResponseText": null,
                "ButtonSubType": null,
                "MediaFileName": null
              },
              {
                "list": null,
                "Product": null,
                "buttons": null,
                "Products": null,
                "MediaType": "TEXT",
                "ButtonType": "button",
                "ResponseText": "Sorry 🙏 Want me to connect you with a travel agent?",
                "ButtonSubType": null,
                "MediaFileName": null
              }
            ]
          },
          "type": "botResponse",
          "width": 140,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 1393,
            "y": -201.45005368202118
          },
          "selected": false,
          "connectedTo": "20",
          "positionAbsolute": {
            "x": 1393,
            "y": -201.45005368202118
          }
        },
        {
          "id": "23",
          "data": {
            "id": "",
            "icon": "MdOutlineSettings",
            "type": "api",
            "apiId": "3",
            "color": "#6600CC",
            "title": "create itinerary",
            "children": [
              "botResponse"
            ],
            "selectedVariable": "3"
          },
          "type": "api",
          "width": 121,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 1171.5,
            "y": -270.55105480191696
          },
          "selected": false,
          "connectedTo": "16",
          "positionAbsolute": {
            "x": 1171.5,
            "y": -270.55105480191696
          }
        },
        {
          "id": "24",
          "data": {
            "id": "24",
            "icon": "FaRedo",
            "type": "loopback",
            "color": "#666666",
            "title": "loop to ask itinerary",
            "children": [
              
            ],
            "loopbackNodeId": "15"
          },
          "type": "loopback",
          "width": 148,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 1188.5,
            "y": -310.48849904308906
          },
          "selected": false,
          "connectedTo": "14",
          "positionAbsolute": {
            "x": 1188.5,
            "y": -310.48849904308906
          }
        },
        {
          "id": "25",
          "data": {
            "id": "",
            "icon": "VscRobot",
            "type": "botResponse",
            "color": "#33CC33",
            "title": "bot- ask for docs",
            "children": [
              "userInput"
            ],
            "ResponseModels": [
              {
                "list": null,
                "Product": null,
                "buttons": null,
                "Products": null,
                "MediaType": "TEXT",
                "ButtonType": "button",
                "ResponseText": "Please upload your passport/visa scan (PDF, JPG, PNG) for quick verification.",
                "ButtonSubType": null,
                "MediaFileName": null
              }
            ]
          },
          "type": "botResponse",
          "width": 133,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 297,
            "y": 49.881090715078756
          },
          "selected": false,
          "connectedTo": "3",
          "positionAbsolute": {
            "x": 297,
            "y": 49.881090715078756
          }
        },
        {
          "id": "26",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user - uploads docs",
            "AgentId": null,
            "IsMedia": true,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 149,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 450.5,
            "y": 48.17084152151793
          },
          "selected": false,
          "connectedTo": "25",
          "positionAbsolute": {
            "x": 450.5,
            "y": 48.17084152151793
          }
        },
        {
          "id": "27",
          "data": {
            "id": "",
            "icon": "VscRobot",
            "type": "botResponse",
            "color": "#33CC33",
            "title": "bot- received",
            "children": [
              "userInput"
            ],
            "ResponseModels": [
              {
                "list": null,
                "Product": null,
                "buttons": [
                  {
                    "text": "Yes"
                  },
                  {
                    "text": "No"
                  }
                ],
                "Products": null,
                "MediaType": "TEXT",
                "ButtonType": "Buttons",
                "ResponseText": "Got it! Your document is safe and verified. Would you also like to upload your flight tickets or hotel booking?",
                "ButtonSubType": "Quick Reply",
                "MediaFileName": null
              }
            ]
          },
          "type": "botResponse",
          "width": 112,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 619,
            "y": 49.303104424755475
          },
          "selected": false,
          "connectedTo": "26",
          "positionAbsolute": {
            "x": 619,
            "y": 49.303104424755475
          }
        },
        {
          "id": "28",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user - yes3",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "Yes",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 100,
          "height": 29,
          "position": {
            "x": 739,
            "y": 73.85050599510903
          },
          "selected": false,
          "connectedTo": "27"
        },
        {
          "id": "29",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user - no3",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "No",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 95,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 739,
            "y": 28.091023135763464
          },
          "selected": false,
          "connectedTo": "27",
          "positionAbsolute": {
            "x": 739,
            "y": 28.091023135763464
          }
        },
        {
          "id": "30",
          "data": {
            "id": "",
            "icon": "FaRedo",
            "type": "loopback",
            "color": "#666666",
            "title": "towards end",
            "children": [
              
            ],
            "loopbackNodeId": "18"
          },
          "type": "loopback",
          "width": 106,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 854,
            "y": 27.921591602610306
          },
          "selected": false,
          "connectedTo": "29",
          "positionAbsolute": {
            "x": 854,
            "y": 27.921591602610306
          }
        },
        {
          "id": "31",
          "data": {
            "id": "",
            "icon": "VscRobot",
            "type": "botResponse",
            "color": "#33CC33",
            "title": "bot- lets user upload",
            "children": [
              "userInput"
            ],
            "ResponseModels": [
              {
                "list": null,
                "Product": null,
                "buttons": null,
                "Products": null,
                "MediaType": "TEXT",
                "ButtonType": "button",
                "ResponseText": "Waiting for your document.",
                "ButtonSubType": null,
                "MediaFileName": null
              }
            ]
          },
          "type": "botResponse",
          "width": 153,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 858,
            "y": 75.02518262115177
          },
          "selected": false,
          "connectedTo": "28",
          "positionAbsolute": {
            "x": 858,
            "y": 75.02518262115177
          }
        },
        {
          "id": "32",
          "data": {
            "id": "32",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user - media",
            "AgentId": null,
            "IsMedia": true,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 107,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 1024,
            "y": 75.48420443757846
          },
          "selected": false,
          "connectedTo": "31",
          "positionAbsolute": {
            "x": 1024,
            "y": 75.48420443757846
          }
        },
        {
          "id": "76fd6759-73b9-47a4-b027-7f51403a19f3",
          "data": {
            "id": "76fd6759-73b9-47a4-b027-7f51403a19f3",
            "icon": "VscRobot",
            "type": "botResponse",
            "color": "#33CC33",
            "title": "bot-faq",
            "children": [
              "userInput"
            ],
            "ResponseModels": [
              {
                "list": null,
                "Product": null,
                "buttons": null,
                "Products": null,
                "MediaType": "TEXT",
                "ButtonType": "button",
                "ResponseText": "Ask me anything about travel ✨",
                "ButtonSubType": null,
                "MediaFileName": null
              }
            ]
          },
          "type": "botResponse",
          "width": 78,
          "height": 29,
          "position": {
            "x": 319.5,
            "y": 249.57405155329383
          },
          "selected": false,
          "connectedTo": "5"
        },
        {
          "id": "ba1bd55a-9b1b-4c1a-a368-e8bb24795be2",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user - faq",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": true,
            "ResponseText": "",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 91,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 441,
            "y": 246.9238117893675
          },
          "selected": false,
          "connectedTo": "76fd6759-73b9-47a4-b027-7f51403a19f3",
          "positionAbsolute": {
            "x": 441,
            "y": 246.9238117893675
          }
        },
        {
          "id": "53543ed1-3972-4cd3-97c3-fcb06adb9e83",
          "data": {
            "id": "",
            "icon": "MdOutlineSettings",
            "type": "api",
            "apiId": "4",
            "color": "#6600CC",
            "title": "answer queries",
            "children": [
              "botResponse"
            ],
            "selectedVariable": "4"
          },
          "type": "api",
          "width": 123,
          "height": 29,
          "position": {
            "x": 561,
            "y": 201.2739133945093
          },
          "connectedTo": "ba1bd55a-9b1b-4c1a-a368-e8bb24795be2"
        },
        {
          "id": "cfb19062-46cb-4ffe-9ab6-49f500c8703c",
          "data": {
            "id": "",
            "icon": "VscRobot",
            "type": "botResponse",
            "color": "#33CC33",
            "title": "bot- media",
            "children": [
              "userInput"
            ],
            "ResponseModels": [
              {
                "list": null,
                "Product": null,
                "buttons": null,
                "Products": null,
                "ButtonType": "button",
                "ResponseText": null,
                "ButtonSubType": null,
                "MediaFileName": null
              },
              {
                "list": null,
                "Product": null,
                "buttons": null,
                "Products": null,
                "ButtonType": "button",
                "ResponseText": null,
                "ButtonSubType": null,
                "MediaFileName": null
              },
              {
                "list": null,
                "Product": null,
                "buttons": null,
                "Products": null,
                "MediaType": "TEXT",
                "ButtonType": "button",
                "ResponseText": "Got it! Your document is safe.",
                "ButtonSubType": null,
                "MediaFileName": null
              }
            ]
          },
          "type": "botResponse",
          "width": 97,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 1151.5,
            "y": 74.62069449452495
          },
          "selected": false,
          "connectedTo": "32",
          "positionAbsolute": {
            "x": 1151.5,
            "y": 74.62069449452495
          }
        },
        {
          "id": "c9afa938-d130-4f8d-bf42-19aca8f6705b",
          "data": {
            "id": "",
            "icon": "VscRobot",
            "type": "botResponse",
            "color": "#33CC33",
            "title": "bot - adventure",
            "children": [
              "userInput"
            ],
            "ResponseModels": [
              {
                "list": {
                  "ListValue": [
                    {
                      "buttons": [
                        {
                          "title": "🥾 Trekking & Hiking",
                          "description": ""
                        },
                        {
                          "title": "🧗 Rock Climbing",
                          "description": ""
                        },
                        {
                          "title": "❄️ Snow & Skiing",
                          "description": ""
                        },
                        {
                          "title": "🚴 Cycling / Road Trips",
                          "description": ""
                        }
                      ],
                      "sectionText": "Users' top choices:"
                    }
                  ],
                  "ListButtonText": "Adventure Options",
                  "UserInputKeyword": "",
                  "SelectedListVariable": null,
                  "IsGetListFromVariable": false
                },
                "Product": null,
                "buttons": null,
                "Products": null,
                "MediaType": "TEXT",
                "ButtonType": "button",
                "ResponseText": "Awesome! 🏔 I love adventure trips. Which type of adventure are you looking for?",
                "ButtonSubType": null,
                "MediaFileName": null
              }
            ]
          },
          "type": "botResponse",
          "width": 124,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 598,
            "y": -133.83545088861706
          },
          "selected": false,
          "connectedTo": "8",
          "positionAbsolute": {
            "x": 598,
            "y": -133.83545088861706
          }
        },
        {
          "id": "e74564a0-5ae6-40e3-8315-6b64df167fb6",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user-11",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "🥾 Trekking & Hiking",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 75,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 747.5,
            "y": -160.85180067152118
          },
          "selected": false,
          "connectedTo": "c9afa938-d130-4f8d-bf42-19aca8f6705b",
          "positionAbsolute": {
            "x": 747.5,
            "y": -160.85180067152118
          }
        },
        {
          "id": "88434bc0-f1f8-483c-b3f8-a71f80304892",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user-22",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "🧗 Rock Climbing",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 80,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 747.5,
            "y": -125.33483538529939
          },
          "selected": false,
          "connectedTo": "c9afa938-d130-4f8d-bf42-19aca8f6705b",
          "positionAbsolute": {
            "x": 747.5,
            "y": -125.33483538529939
          }
        },
        {
          "id": "1e96a27c-90f6-437f-af45-f21b3b560abf",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user-33",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "❄️ Snow & Skiing",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 80,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 748.5,
            "y": -88.84972387104375
          },
          "selected": false,
          "connectedTo": "c9afa938-d130-4f8d-bf42-19aca8f6705b",
          "positionAbsolute": {
            "x": 748.5,
            "y": -88.84972387104375
          }
        },
        {
          "id": "b6017134-527b-496f-a67f-e1823ce5e7fc",
          "data": {
            "id": "",
            "icon": "FaUserCircle",
            "type": "userInput",
            "color": "#FF9900",
            "title": "user-44",
            "AgentId": null,
            "IsMedia": false,
            "LabelId": null,
            "children": [
              "botResponse",
              "api",
              "loopback"
            ],
            "IsUnknown": false,
            "ResponseText": "🚴 Cycling / Road Trips",
            "IsBotTerminate": false,
            "selectedVariable": null,
            "IsEmailValidation": false,
            "IsTrriggerFromAnywhere": false
          },
          "type": "userInput",
          "width": 81,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 748,
            "y": -53.101457813106435
          },
          "selected": false,
          "connectedTo": "c9afa938-d130-4f8d-bf42-19aca8f6705b",
          "positionAbsolute": {
            "x": 748,
            "y": -53.101457813106435
          }
        },
        {
          "id": "86e86763-ff1b-4bdb-a307-9df223a9c0d9",
          "data": {
            "id": "",
            "icon": "MdOutlineSettings",
            "type": "api",
            "apiId": "5",
            "color": "#6600CC",
            "title": "trekking locations",
            "children": [
              "botResponse"
            ],
            "selectedVariable": "5"
          },
          "type": "api",
          "width": 136,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 857.5,
            "y": -159.05635015791165
          },
          "selected": false,
          "connectedTo": "e74564a0-5ae6-40e3-8315-6b64df167fb6",
          "positionAbsolute": {
            "x": 857.5,
            "y": -159.05635015791165
          }
        },
        {
          "id": "512c4254-df3d-45f6-882e-4ea8fabe8bbe",
          "data": {
            "id": "",
            "icon": "MdOutlineSettings",
            "type": "api",
            "apiId": "5",
            "color": "#6600CC",
            "title": "rock climbing",
            "children": [
              "botResponse"
            ],
            "selectedVariable": "5"
          },
          "type": "api",
          "width": 112,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 870,
            "y": -120.48640191642235
          },
          "selected": false,
          "connectedTo": "88434bc0-f1f8-483c-b3f8-a71f80304892",
          "positionAbsolute": {
            "x": 870,
            "y": -120.48640191642235
          }
        },
        {
          "id": "8a7522e7-1dfd-4c8a-b8db-f90ac9a63fa1",
          "data": {
            "id": "8a7522e7-1dfd-4c8a-b8db-f90ac9a63fa1",
            "icon": "MdOutlineSettings",
            "type": "api",
            "apiId": "7",
            "color": "#6600CC",
            "title": "popular cities to roam",
            "children": [
              "botResponse"
            ],
            "selectedVariable": [
              {
                "label": "Options",
                "value": "list"
              }
            ]
          },
          "type": "api",
          "width": 159,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 599.1040000000002,
            "y": -17.742277880559698
          },
          "selected": false,
          "connectedTo": "9",
          "positionAbsolute": {
            "x": 599.1040000000002,
            "y": -17.742277880559698
          }
        },
        {
          "id": "590d6d01-5fb8-4577-8601-acd873d68593",
          "data": {
            "id": "",
            "icon": "VscRobot",
            "type": "botResponse",
            "color": "#33CC33",
            "title": "ApiBotResponse",
            "children": [
              "userInput"
            ],
            "ResponseModels": [
              {
                "list": {
                  "ListValue": [
                    
                  ],
                  "ListButtonText": "Choose Options",
                  "UserInputKeyword": "",
                  "SelectedListVariable": "new",
                  "IsGetListFromVariable": true
                },
                "Product": null,
                "buttons": null,
                "Products": null,
                "MediaType": "TEXT",
                "ButtonType": "button",
                "ResponseText": "List111:",
                "ButtonSubType": null,
                "MediaFileName": null
              }
            ]
          },
          "type": "botResponse",
          "width": 129,
          "height": 29,
          "dragging": false,
          "position": {
            "x": 809.8240000000002,
            "y": -19.350146766677597
          },
          "selected": true,
          "connectedTo": "8a7522e7-1dfd-4c8a-b8db-f90ac9a63fa1",
          "positionAbsolute": {
            "x": 809.8240000000002,
            "y": -19.350146766677597
          }
        }
      ]