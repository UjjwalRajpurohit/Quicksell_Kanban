import React, { useState } from 'react';
import './Navbar.css';
import ig from '../../icons/down.svg'
import disp from '../../icons/Display.svg';

const Navbar = ({ onGroupingChange, onOrderingChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [grouping, setGrouping] = useState('Status');
  const [ordering, setOrdering] = useState('Priority');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGroupingChange = (event) => {
    const selectedGrouping = event.target.value;
    setGrouping(selectedGrouping);
    
    if (selectedGrouping === 'Status') {
      localStorage.setItem('type', 1);
    } else if (selectedGrouping === 'User') {
      localStorage.setItem('type', 2);
    }

    if (onGroupingChange) {
      onGroupingChange(selectedGrouping);
    }
  };

  const handleOrderingChange = () => {
    setOrdering("Priority");
    
    if (ordering === 'Priority') {
      localStorage.setItem('type', 3);
    }

    if (onOrderingChange) {
      onOrderingChange("Priority");
    }
};

  return (
    <div className="navbar">
      <button className="display-btn" onClick={toggleDropdown}>
        <img style={{marginRight:"4px"}}src={disp}/>
        Display 
        <img src={ig}/>
      </button>

      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-group">
            <label htmlFor="grouping">Grouping</label>
            <select id="grouping" value={grouping} onChange={handleGroupingChange}>
              <option onChange={()=>setGrouping("Status")} value="Status">Status</option>
              <option onChange={()=>setGrouping("Status")} value="User">User</option>
            </select>
          </div>

          
          
          <div className="dropdown-order">
            <label htmlFor="ordering">Ordering</label>
            <select id="ordering" value={ordering} onClick={()=>handleOrderingChange("Priority")}>
              <option  value="Priority">Priority</option>
            </select>
          </div>

        </div>
      )}
    </div>
  );
};

export default Navbar;
