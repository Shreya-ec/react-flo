import React from 'react'

export default function Preview() {
  return (
    <div className="img-cont">
                    <img src={whatsappPic} alt="whatsapp preview" />
                    <div className="preview-cont">

                        {(FormFields?.header || FormFields.template_content || FormFields?.footer) && (category !== 'Authentication') && (format !== 'carousel') &&
                            <div className="whatsBody">
                                {FormFields?.header?.type === "text" && <span className="w-header">{highlightAndReplaceHeader(FormFields?.header?.text)}</span>}
                                {FormFields?.header?.type === "image" && <Image src={preview} className="w-image" />}
                                {FormFields?.header?.type === "video" &&
                                    <video controls width="100%" className="w-image">
                                        <source src={preview} type="video/mp4" />
                                        Unsupported video tag by browser.
                                    </video>}
                                {FormFields?.header?.type === "document" &&
                                    <span className="w-doc">
                                        {preview === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? <RiFileWord2Fill style={{ color: '#2A5293' }} />
                                            : preview === 'application/pdf' ? <AiFillFilePdf style={{ color: '#CB3724' }} />
                                                : preview === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? <PiMicrosoftExcelLogoLight style={{ color: '#4AA66A' }} />
                                                    : <GrDocumentText />}

                                    </span>
                                }

                                <span className="w-body">{highlightAndReplaceContent(FormFields?.template_content)}</span>
                                <br />
                                {FormFields.footer && <span className="w-footer">{FormFields?.footer}</span>}
                                <div className="time_box">
                                    <span className="ms-auto">{currentTime}</span>
                                </div>

                                {((format === 'interactive') && (buttonTypes.some(({ buttons }) => buttons.length > 0))) ?
                                    <>
                                        <div className="wdivider" />
                                        {buttonTypes.map(({ buttons, content }, typeIndex) => (
                                            buttons.map((button, buttonIndex) => (
                                                <div className="whatsButton" key={button.id || `${typeIndex}-${buttonIndex}`}>
                                                    {content(button)}
                                                </div>
                                            ))
                                        ))}
                                    </>
                                    :
                                    (format === 'limited_time_offer') ?
                                        <>
                                            <div className="wdivider" />
                                            <div className="whatsButton">
                                                <MdOutlineContentCopy /> Copy Code
                                            </div>
                                            <div className="whatsButton">
                                                <PiArrowSquareUpRight /><span className="btn-txt">{ltoBtns[1].label}</span>
                                            </div>
                                        </>
                                        : (format === 'copy_code') ?
                                            <>
                                                <div className="wdivider" />
                                                <div className="whatsButton">
                                                    <MdOutlineContentCopy /> Copy Code
                                                </div>
                                                {codeBtns.length > 1 &&
                                                    <div className="whatsButton">
                                                        {codeBtns[1].type === 'text' ? <span className="btn-txt">{codeBtns[1].text}</span>
                                                            : (codeBtns[1].type === 'static' || codeBtns[1].type === 'dynamic') ?
                                                                <>
                                                                    <PiArrowSquareUpRight /><span className="btn-txt">{codeBtns[1].label}</span>
                                                                </>
                                                                :
                                                                <>
                                                                    <PiPhone /><span className="btn-txt">{codeBtns[1].label}</span>
                                                                </>
                                                        }
                                                    </div>}
                                            </>
                                            : ''
                                }
                            </div>
                        }
                        {(format === 'carousel') && (FormFields?.template_content || preview) &&
                            <>
                                <div className="whatsBody">
                                    <span className="w-body">{highlightAndReplaceContent(FormFields?.template_content)}</span>
                                    <br />
                                    <div className="time_box">
                                        <span className="ms-auto">{currentTime}</span>
                                    </div>
                                </div>
                                <div className="cards-container cards-slider">
                                    {cards.map((card, index) => (
                                        <div key={index} className="cardsBody">
                                            {headerCarousel === "image" && <Image src={preview} className="w-image" />}
                                            {headerCarousel === "video" &&
                                                <video controls width="100%" className="w-image">
                                                    <source src={preview} type="video/mp4" />
                                                    Unsupported video tag by browser.
                                                </video>}
                                            <span className="w-body">{highlightAndReplaceVariables(card.body.text, card.body.example)}</span>
                                            {card.buttons.length > 0 &&
                                                <>
                                                    <div className="wdivider" />
                                                    {card.buttons.map((button, buttonIndex) => (
                                                        <div className="whatsButton" key={buttonIndex}>
                                                            {button.type === "quick_reply" ? <span className="btn-txt">{button.text}</span>
                                                                : button.type === "call_to_action" ? <><PiPhone /><span className="btn-txt">{button.label}</span></>
                                                                    : <><PiArrowSquareUpRight /><span className="btn-txt">{button.label}</span></>
                                                            }
                                                        </div>
                                                    ))}
                                                </>
                                            }
                                        </div>
                                    ))}
                                </div>
                            </>
                        }
                        {(category === 'Authentication') &&
                            <div className="whatsBody">
                                {disclaimer && <span className="w-body"><b>{authValues.disclaimer_otp || '{{1}}'}</b> is your verification code. For Your Security, do not share this code.</span>}
                                <br />
                                {warning && <span className="w-footer">{`This code expires in ${authValues.warning_expiryTime} minutes.`}</span>}
                                <div className="time_box">
                                    <span className="ms-auto">{currentTime}</span>
                                </div>
                                {disclaimer && (
                                    <>
                                        <div className="wdivider" />
                                        <div className="whatsButton">
                                            <MdOutlineContentCopy /> Copy Code
                                        </div>
                                    </>
                                )}

                            </div>
                        }
                    </div>
                </div>
  )
}
