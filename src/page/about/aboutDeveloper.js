import React from "react";
import "./about.css";
import DeveloperImage from "../../component/image/batamSingh.jpg";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AboutDeveloper = () => {

  const navigate = useNavigate();
  return (
    <div className="about-container">
      <div className="back-btn fix" style={{alignSelf: "flex-start"}}>
        <IoMdArrowRoundBack onClick={() => navigate(-1)} size={25}/>
      </div>
      <h3 style={{marginBottom: "20px"}}>Profile</h3>
      
      <div className="image">
        <img src={DeveloperImage} alt="BatamSingh" />
      </div>
      <p style={{marginBottom: "20px"}}><strong>Batam Singh,</strong> software developer</p>
      <div className="details">
        <div className="about-section">
          <h4 className="title">About Me</h4>
          <p>
            I'm a beginner web developer with a BCA degree, currently pursuing
            an MCA specializing in web technologies. Passionate about learning
            new things, I enjoy building interactive web applications. I
            continuously explore new tools and technologies to enhance my
            skills. In addition to my studies, I work on personal projects and
            contribute to open-source, aiming to grow within the developer
            community.
          </p>
        </div>
        <div className="details-section">
          <h4 className="title">Details</h4>

          <h4>Name:</h4>
          <p>Puyam Batam Singh</p>
          <h4>Age:</h4>
          <p>24 years</p>
          <h4>Email:</h4>
          <p>
            <a href="mailto:batampuyam09@gmail.com"> batampuyam09@gmail.com</a>
          </p>
          <h4>Location:</h4>
          <p>Langathel, Thoubal, Manipur - 795148, India</p>
        </div>
      </div>

      <div className="footer">
        <a href="https://www.linkedin.com/in/batamsingh/" target="blank">
          <FaLinkedin size={30} />
        </a>
        <a href="https://github.com/batamsing" target="blank">
          <FaGithub size={30} />
        </a>
        <a href="https://www.facebook.com/batam.puyam.3" target="blank">
          <FaFacebook size={30} />
        </a>
      </div>
    </div>
  );
};

export default AboutDeveloper;
