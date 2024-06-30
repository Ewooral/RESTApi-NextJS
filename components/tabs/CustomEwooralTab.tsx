// // TabComponent.tsx

// import DocumentTab from "@/app/(forms)/document-upload/DocumentTab";
// import EducationalInfoTab from "@/app/(forms)/educational-info/EducationalInfoTab";
// import PersonalInfoTab from "@/app/(forms)/personal-info/PersonalInfoTab";
// import React, { useState } from "react";

// const CustomEwooralTabComponent: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<string>("personalInfo");

//   const handleTabClick = (tabName: string) => {
//     setActiveTab(tabName);
//   };

//   return (
//     <div>
//       {/* Tab Headers */}
//       <ul className="flex cursor-pointer">
//         <li
//           className={`px-4 py-2 ${
//             activeTab === "personalInfo"
//               ? "text-blue-500 border-b-2 border-blue-500"
//               : "text-gray-500"
//           }`}
//           onClick={() => handleTabClick("personalInfo")}
//         >
//           Personal Info
//         </li>
//         <li
//           className={`px-4 py-2 ${
//             activeTab === "educationalInfo"
//               ? "text-blue-500 border-b-2 border-blue-500"
//               : "text-gray-500"
//           }`}
//           onClick={() => handleTabClick("educationalInfo")}
//         >
//           Educational Info
//         </li>
//         <li
//           className={`px-4 py-2 ${
//             activeTab === "document"
//               ? "text-blue-500 border-b-2 border-blue-500"
//               : "text-gray-500"
//           }`}
//           onClick={() => handleTabClick("document")}
//         >
//           Document
//         </li>
//       </ul>

//       {/* Tab Content */}
//       <div className="p-4">
//         {activeTab === "personalInfo" && <PersonalInfoTab />}
//         {activeTab === "educationalInfo" && <EducationalInfoTab />}
//         {activeTab === "document" && <DocumentTab />}
//       </div>
//     </div>
//   );
// };

// export default CustomEwooralTabComponent;

// TabComponent.tsx

import { TabComponentProps } from '@/types/TabComponentProps';
import React, { useState } from 'react';

const CustomEwooralTabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

  return (
    <div className='font-serif'>
      {/* Tab Headers */}
      <ul className="flex cursor-pointer">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`px-4 py-2 ${activeTab === tab.id ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="p-2">
        {tabs.map((tab) => {
          if (tab.id === activeTab) {
            return <div key={tab.id}>{tab.content}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default CustomEwooralTabComponent;