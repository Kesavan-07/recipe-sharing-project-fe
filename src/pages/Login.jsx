import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectPassword,
  setEmail,
  setPassword,
} from "../redux/features/auth/loginSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import authServices from "../services/authServices";
import { setUser } from "../redux/features/auth/userSlice";
import Loader from "../components/Loader";
import styled from "styled-components";

const Form = () => {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [isLogin, setIsLogin] = useState(true);


  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      toast.error("Please enter email and password");
      setLoading(false);
      return;
    }

    try {
      const data = await authServices.login({ email, password }); 

      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(setUser(data.user));
        toast.success("Login successful");

        setTimeout(() => {
          navigate("/user/dashboard"); 
        }, 500);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    toast.info("Signup functionality coming soon!");
  };

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <StyledWrapper>
      <div className="background"> </div>
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input
              type="checkbox"
              className="toggle"
              onChange={handleSwitch}
              checked={!isLogin}
            />
            <span className="slider" />
            <span className="card-side" />
            <div className="flip-card__inner">
              {/* Login Form */}
              <div className="flip-card__front">
                <div className="title">Log in</div>
                <form className="flip-card__form" onSubmit={handleLogin}>
                  <input
                    className="flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                    required
                  />
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                    required
                  />
                  {error && <p style={{ color: "red" }}>{error}</p>}{" "}
                  {/* ✅ Show error message */}
                  <button className="flip-card__btn" type="submit">
                    {loading ? "Logging in..." : "Let’s go!"}
                  </button>
                </form>
              </div>

              {/* Signup Form */}
              <div className="flip-card__back">
                <div className="title">Sign up</div>
                <form className="flip-card__form" onSubmit={handleSignup}>
                  <input
                    className="flip-card__input"
                    placeholder="Name"
                    type="text"
                    required
                  />
                  <input
                    className="flip-card__input"
                    placeholder="Email"
                    type="email"
                    required
                  />
                  <input
                    className="flip-card__input"
                    placeholder="Password"
                    type="password"
                    required
                  />
                  <button className="flip-card__btn" type="submit">
                    Confirm!
                  </button>
                </form>
              </div>
            </div>
          </label>
        </div>
      </div>
      {/* Loader */}
      {loading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50 bg-gray-800 z-50">
          <Loader />
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;

  .wrapper {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --main-color: #323232;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%; /* Make sure wrapper takes up the full height */
  }

  /* switch card */
  .switch {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 50px;
    height: 20px;
  }

  .toggle {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-color);
    transition: 0.3s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    left: -2px;
    bottom: 2px;
    background-color: var(--bg-color);
    box-shadow: 0 3px 0 var(--main-color);
    transition: 0.3s;
  }

  .toggle:checked + .slider {
    background-color: var(--input-focus);
  }

  .toggle:checked + .slider:before {
    transform: translateX(30px);
  }

  .flip-card__inner {
    width: 300px;
    height: 350px;
    position: relative;
    background-color: transparent;
    perspective: 1000px;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .toggle:checked ~ .flip-card__inner {
    transform: rotateY(180deg);
  }

  .flip-card__front,
  .flip-card__back {
    padding: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    backface-visibility: hidden;
    background: lightgrey;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .flip-card__back {
    transform: rotateY(180deg);
  }

  .flip-card__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .title {
    margin: 20px 0;
    font-size: 25px;
    font-weight: 900;
    text-align: center;
    color: var(--main-color);
  }

  .flip-card__input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .flip-card__input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .flip-card__input:focus {
    border: 2px solid var(--input-focus);
  }

  .flip-card__btn {
    margin: 20px 0;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url("/Images/login.jpg") no-repeat center center/cover;
  }
`;

export default Form;
