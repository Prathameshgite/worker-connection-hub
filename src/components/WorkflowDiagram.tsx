
import React from 'react';

const WorkflowStep = ({ title, description }: { title: string; description: string }) => (
  <div className="relative w-full max-w-md mx-auto">
    <div className="bg-cyan-100 rounded-lg p-6 border-2 border-cyan-300 shadow-md">
      <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
      <p className="text-center text-gray-700">{description}</p>
    </div>
    {/* Arrow pointing down */}
    <div className="flex justify-center mt-2 mb-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>
);

// The last workflow step doesn't need an arrow
const FinalWorkflowStep = ({ title, description }: { title: string; description: string }) => (
  <div className="w-full max-w-md mx-auto">
    <div className="bg-cyan-100 rounded-lg p-6 border-2 border-cyan-300 shadow-md">
      <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
      <p className="text-center text-gray-700">{description}</p>
    </div>
  </div>
);

export const WorkflowDiagram = () => {
  return (
    <div className="flex flex-col items-center gap-1">
      <WorkflowStep 
        title="Service Provider Registration" 
        description="Service providers from various areas of Pune register their information, skills, and services offered."
      />
      
      <WorkflowStep 
        title="Data Verification" 
        description="Provider information is verified, including contact details, location, and professional qualifications."
      />
      
      <WorkflowStep 
        title="Service Categorization" 
        description="Workers are categorized based on profession, location in Pune, and service types to facilitate searching."
      />
      
      <WorkflowStep 
        title="Customer Reviews & Ratings" 
        description="Customers provide feedback and ratings after service completion to build worker reputation."
      />
      
      <FinalWorkflowStep 
        title="Service Matching" 
        description="Customers are matched with the most appropriate service providers based on location, ratings, and availability."
      />
    </div>
  );
};
