
import React from 'react';
import { Card } from "@/components/ui/card";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";

const WorkflowChart = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Project Workflow</h1>
      <Card className="p-6">
        <WorkflowDiagram />
      </Card>
    </div>
  );
};

export default WorkflowChart;
