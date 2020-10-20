import React from "react";
import homeImg from "../Assets/Pizza.jpg";
import styled from "styled-components";

const ImageBackground = styled.div`
  vertical-align: top;
  display: block;
  width: 100vw;
`;

const Home = () => {
  return (
    <ImageBackground>
      <h1
        style={{
          position: "fixed",
          color: "#161E2A",
          fontSize: "5rem",
          marginLeft: "20%",
          fontFamily: "Sansita Swashed",
        }}
      >
        Welcome to Lambda Pizza Place
      </h1>
      <h4
        style={{
          position: "fixed",
          color: "white",
          fontSize: "2.3rem",
          marginLeft: "40%",
          marginTop: "31%",
          fontFamily: "Sansita Swashed",
        }}
      >
        One Slice Is Never Enough!
      </h4>
      <img
        src={homeImg}
        alt="pizza"
        style={{ width: "100vw", height: "100vh" }}
      />
    </ImageBackground>
  );
};

export default Home;
