import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "routes";

export default () => {
  const [name, setName] = useState("");
  const history = useHistory();

  const handleStart = () => {
    if (name.trim()) {
      localStorage.setItem("chatbotUserName", name);
      history.push(Routes.ChatBot.path);
    }
  };

  return (
    <section className="home">
      <div className="doodle">
        <div className="grid">
          <div className="lg">
            <h1>Craft</h1>
            <h1>Every</h1>
            <h1>Conversation</h1>
            <h3>Design Smarter Chatbot Interactions</h3>
            <form>
              <input
                type="text"
                placeholder="👋 Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="name-input"
              />
              <button type="submit" onClick={handleStart}>
                🚀 Get Started
              </button>
            </form>
          </div>

          <div className="illus">
            <div className="img1">
              <div className="img2">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/047/311/546/non_2x/cute-cat-robot-3d-illustration-free-png.png"
                  alt="cat"
                />
              </div>
            </div>
          </div>

          <div className="rg">
            <h3 className="new">Smart</h3>
            <h3 className="new">ChatFlow</h3>
            <h3 className="new">Builder</h3>

            <div className="prevnex">
              <div className="prev"></div>
              <div className="next">
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/right-arrow-37.png"
                  alt="next"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
