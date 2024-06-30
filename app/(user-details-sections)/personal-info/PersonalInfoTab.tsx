// PersonalInfo.tsx

import Accordion from "@/components/accordions/ProfileAccordion";
import React from "react";

const PersonalInfo: React.FC = () => {
  return (
    <div>
      {/* Form or content for Personal Info */}
      <h1>Personal Information content goes here...</h1>
      <p>
        The Personal Info section captures essential details like your full
        name, date of birth, and contact information, ensuring a personalized
        and seamless experience. This comprehensive profile setup allows us to
        tailor services to meet your unique needs and preferences.
      </p>
      <Accordion />
    </div>
  );
};

export default PersonalInfo;
