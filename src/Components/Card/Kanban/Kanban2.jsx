import React, { useState, useEffect } from "react";
import "./kanban.css";
import Card from "../Card"; // Importing the Card component
import Navbar from "../../Navbar/Navbar";
import dots from "../../../icons/3 dot menu.svg";
import add from "../../../icons/add.svg";
import proimg from "../../../icons/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA3L2pvYjEwNjAtMTQucG5n.webp"
const Kanban2 = () => {
  const [userTasks, setUserTasks] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        ); // Replace with your actual API endpoint
        const data = await response.json();
        const { tickets, users } = data;

        // Create an object mapping userIds to their tasks
        const userTaskMap = {};
        users.forEach(user => {
          userTaskMap[user.id] = {
            name: user.name,
            available: user.available,
            tasks: tickets.filter(task => task.userId === user.id)
          };
        });

        setUserTasks(userTaskMap);
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
          {Object.keys(userTasks).map((userId) => {
            const user = userTasks[userId];
            return (
              <div key={userId} className="kanban-column">
                <div className="col-head">
                  <img src={proimg} style={{borderRadius:"35px", height:"3vh", width:"1.5vw"}}/>
                  <h3 className="column-header">
                    {user.name}{" "}
                    <span className="task-count">{user.tasks.length}</span>
                  </h3>
                  <img src={add} alt="Add task" />
                  <img src={dots} alt="Options" />
                </div>
                {user.tasks.map((task) => (
                  <Card
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    profile="https://via.placeholder.com/40" // Default placeholder for profile
                    feature={task.tag[0]} // Assuming tag is an array
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Kanban2;
