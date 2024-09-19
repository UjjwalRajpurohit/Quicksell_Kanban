import React, { useState, useEffect } from "react";
import "./kanban.css";
import Card from "../Card"; // Importing the Card component
import Navbar from "../../Navbar/Navbar";
import dots from "../../../icons/3 dot menu.svg";
import add from "../../../icons/add.svg";
import abc from "../../../icons/Img - High Priority.svg";

const Kanban3 = () => {
  const [priorityTasks, setPriorityTasks] = useState({});

  // Map numeric priorities to descriptive labels
  const priorityLabels = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No Priority",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        ); // Replace with your actual API endpoint
        const data = await response.json();
        const { tickets } = data;

        // Create an object mapping priority levels to their tasks
        const priorityMap = {};
        tickets.forEach((task) => {
          const priority = task.priority;
          if (!priorityMap[priority]) {
            priorityMap[priority] = [];
          }
          priorityMap[priority].push(task);
        });

        setPriorityTasks(priorityMap);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="kanban-container">
        <div className="kanban-board">
          {Object.keys(priorityTasks)
            .sort()
            .map((priority) => (
              <div key={priority} className="kanban-column">
                <div className="col-head">
                  <img src={abc}/>
                  <h3 className="column-header">
                    {priorityLabels[priority] || `Priority ${priority}`}{" "}
                    <span className="task-count">
                      {priorityTasks[priority].length}
                    </span>
                  </h3>
                  <img src={add} alt="Add task" />
                  <img src={dots} alt="Options" />
                </div>
                {priorityTasks[priority].map((task) => (
                  <Card
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    profile="https://via.placeholder.com/40" // Default placeholder for profile
                    feature={task.tag[0]} // Assuming tag is an array
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Kanban3;
