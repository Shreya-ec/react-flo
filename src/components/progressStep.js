import React from 'react';

const ProgressSteps = ({ step, totalSteps }) => {
    const progressWidth = (step - 1) / (totalSteps - 1) * 100;

    return (
        <div className="progress-steps">
            <div className="top">
                <div className="progress">
                    <span style={{ width: `${progressWidth}%` }}></span>
                </div>
                <div className="steps">
                    {[...Array(totalSteps)].map((_, index) => (
                        <div
                            key={index}
                            className={`step ${index + 1 <= step ? 'active' : ''}`}
                            data-step={index + 1}
                        >
                            <span>{index + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgressSteps;
