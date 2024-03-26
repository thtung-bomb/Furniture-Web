import React from 'react';
import Box1 from './Box1';
import Box2 from './Box2';
import Box3 from './Box3';

function ManagerDashboard() {
  return (
    <div className="flex-1 flex flex-col w-screen">
      <div className="flex-1 flex">
        <div className="grid grid-cols-2 gap-4 h-full w-full px-6">
          <Box1 />
          <div className="flex flex-col gap-4">
            <Box2 />
            <Box3 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
