import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "routes";

export default function Home() {
  const [email, setEmail] = useState("");
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (trimmedEmail) {
      try {
        const res = await fetch("https://formspree.io/f/myzlzgqy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: trimmedEmail }),
        });

        if (res.ok) {
          localStorage.setItem("chatbotUser", trimmedEmail);
          history.push(Routes.ChatBot.path);
          setEmail("");
        } else {
          alert("Something went wrong!");
        }
      } catch (error) {
        console.error("Form submission failed:", error);
        alert("Network error — please try again!");
      }
    } else {
      setShake(true);
      if (inputRef.current) inputRef.current.focus();

      // stop the wiggle after animation
      setTimeout(() => setShake(false), 1000);
    }
  };

  return (
    <section className="home">
      <div className="doodle">
        <div className="grid">
          <div className="lg">
            <h1 style={{ animationDelay: "0s" }}>Craft</h1>
            <h1 style={{ animationDelay: "0.3s" }}>Every</h1>
            <h1 style={{ animationDelay: "0.6s" }}>Conversation</h1>
            <h3>Design Smarter Chatbot Interactions</h3>
            <form className="landingForm" onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <span className={`wave-hand ${shake ? "wiggle" : ""}`}>👋</span>
                <input
                  ref={inputRef}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // required
                  className="name-input"
                />
              </div>
              <button type="submit" className="submitBtn">
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
}
