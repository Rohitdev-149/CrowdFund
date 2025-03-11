import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProjectCard from "../components/ProjectCard";
import ProjectSection from "../components/ProjectSection";
import OurMission from "../components/OurMission";
import Footer from "../components/Footer";

function Home() {

  return (
    <>

      <HeroSection />
      <ProjectSection/>
      <OurMission/>
    </>
  );
}

export default Home;
