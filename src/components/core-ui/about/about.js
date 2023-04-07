import { Container } from "@mui/material";
import React, { useContext } from "react";
import codings from "../../../assets/lottie/coding.json";
import { ThemeContext } from "../../../contexts/theme-context";
import { aboutData } from "../../../data/aboutData";
import AnimationLottie from "../../helper/animation-lottie";
import "./about.css";

function About() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.secondary }}>
      <Container className="about" id="about">
        <div className="line-styling">
          <div
            className="style-circle"
            style={{ backgroundColor: theme.primary }}
          ></div>
          <div
            className="style-circle"
            style={{ backgroundColor: theme.primary }}
          ></div>
          <div
            className="style-line"
            style={{ backgroundColor: theme.primary }}
          ></div>
        </div>
        <div className="about-body">
          <div className="about-description">
            <h2 style={{ color: theme.primary }}>{aboutData.title}</h2>
            <p style={{ color: theme.tertiary }}>
              {aboutData.description1}
              <ul>
                <li>
                  JavaScript: Proficiency in JavaScript and its associated web
                  technologies, such as HTML and CSS. Experience with popular
                  JavaScript frameworks like React Native and react.js.
                </li>
                <li>
                  Node.js: Experience with Node.js and building scalable web
                  applications using it, as well as proficiency with popular
                  Node.js frameworks such as Express.js.
                </li>
                <li>
                  React/React Native: Experience in developing web and mobile
                  applications using React and React Native. Familiarity with
                  popular libraries and tools like Redux and Expo.
                </li>
                <li>
                  MongoDB: Proficiency in using MongoDB as a NoSQL database,
                  including experience in schema design, indexing, and querying.
                </li>
                <li>
                  Web Scraping: Experience in web scraping and data extraction
                  as well as proficiency in data manipulation and analysis using
                  nodeJS libraries like node fetch and cheerio.
                </li>
              </ul>
            </p>
          </div>
          <div className="about-animation">
            <AnimationLottie animationPath={codings} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default About;
