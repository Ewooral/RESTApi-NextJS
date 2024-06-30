import { useState } from "react";

type AccordionItemProps = {
  title: string;
  content: any;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#0000002a] overflow-hidden">
      <div
        className="px-4 py-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-semibold text-lg">{title}</h2>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "ease-in max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-2 text-[#00000095]">{content}</div>
      </div>
    </div>
  );
};

const Accordion = () => {
  return (
    <div className="w-full mx-auto mt-10">
      <AccordionItem
        title="Personal Information"
        content="Full name, date of birth, nationality, and contact information."
      />
      <AccordionItem
        title="Course Preferences"
        content="List of interested courses, preferred start date, and mode of study."
      />
      <AccordionItem
        title="Education History"
        content="Details of previous educational institutions attended, courses studied, and qualifications gained."
      />
      <AccordionItem
        title="Work Experience"
        content="Details of any relevant work experience, including the organization's name, role, responsibilities, and duration of employment."
      />
      <AccordionItem
        title="Personal Statement"
        content="Explanation of why the applicant is interested in the chosen course and what makes them a suitable candidate."
      />
      <AccordionItem
        title="References"
        content="Contact details of one or two individuals who can provide a reference."
      />
      <AccordionItem
        title="Language Proficiency"
        content="Details of any English language qualifications, such as IELTS or TOEFL scores."
      />
      <AccordionItem
        title="Additional Information"
        content="Details of any extracurricular activities, awards, or achievements that may support the application."
      />
    </div>
  );
};

export default Accordion;

