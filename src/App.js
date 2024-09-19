import './App.css';
import Kanban from './Components/Card/Kanban/Kanban';
import Kanban2 from './Components/Card/Kanban/Kanban2';
import Kanban3 from './Components/Card/Kanban/Kanban3';

import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  const [selectedKanban, setSelectedKanban] = useState('Status');

  useEffect(() => {
    // Retrieve the type from local storage
    const storedType = localStorage.getItem('type');
    
    // Set the selectedKanban based on the storedType
    if (storedType) {
      switch (parseInt(storedType, 10)) {
        case 1:
          setSelectedKanban('Status');
          break;
        case 2:
          setSelectedKanban('User');
          break;
        case 3:
          setSelectedKanban('Priority');
          break;
        default:
          setSelectedKanban('Status'); // Default to 'Status' if no valid type
      }
    }
  }, [selectedKanban]);

  const handleGroupingChange = (grouping) => {
    setSelectedKanban(grouping);
    
    // Store the corresponding value in local storage
    let typeValue;
    switch (grouping) {
      case 'Status':
        typeValue = 1;
        break;
      case 'User':
        typeValue = 2;
        break;
      case 'Priority':
        typeValue = 3;
        break;
      default:
        typeValue = 1; // Default to 1 if no valid grouping
    }
    localStorage.setItem('type', typeValue);
  };
  const handleOrderingChange = () => {
    localStorage.setItem("type",3);
    setSelectedKanban('Priority');
  };

  return (
    <div>
      
      <Navbar 
        onGroupingChange={handleGroupingChange}
        onOrderingChange={handleOrderingChange} 
      />

      {/* Conditionally render the Kanban board based on the selected grouping */}
      {selectedKanban === 'Status' && <Kanban />}
      {selectedKanban === 'User' && <Kanban2 />}
      {selectedKanban === 'Priority' && <Kanban3 />}
    </div>
  );
};

export default App;
