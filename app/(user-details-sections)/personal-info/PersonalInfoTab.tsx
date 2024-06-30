// PersonalInfo.tsx

import Accordion from "@/components/accordions/ProfileAccordion";
import React from "react";

const PersonalInfo: React.FC = () => {
  return (
    <div>
      {/* Form or content for Personal Info */}
      <h1>Personal Information content goes here...</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        maxime numquam voluptatum facilis, neque quae ducimus autem quam esse
        minima debitis porro incidunt necessitatibus vitae illum libero ipsum
        eaque qui?
      </p>
      <Accordion />
    </div>
  );
};

export default PersonalInfo;
