import React, { useState, useEffect } from "react";
import "./kanban.css";
import Card from "../Card"; // Importing the Card component
import Navbar from "../../Navbar/Navbar";
import Backlog from "../../../icons/Backlog.svg";
import todo from "../../../icons/To-do.svg";
import inprogress from "../../../icons/in-progress.svg";
import done from "../../../icons/Done.svg";
import cancelled from "../../../icons/Cancelled.svg";

import dots from "../../../icons/3 dot menu.svg";
import add from "../../../icons/add.svg";

import pro from "../../../icons/images.jpeg" 

const Kanban = () => {
  const [tasks, setTasks] = useState({
    backlog: [],
    todo: [],
    inProgress: [],
    done: [],
    cancelled: [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        ); // Replace with your actual API endpoint
        const data = await response.json();
        const { tickets } = data;

        const categorizedTasks = {
          backlog: tickets.filter((task) => task.status === "Backlog"),
          todo: tickets.filter((task) => task.status === "Todo"),
          inProgress: tickets.filter((task) => task.status === "In progress"),
          done: tickets.filter((task) => task.status === "Done"),
          cancelled: tickets.filter((task) => task.status === "Cancelled"),
        };

        setTasks(categorizedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <div className="kanban-container">
        <div className="kanban-board">
          {/* Backlog Column */}
          <div className="kanban-column">
            <div className="col-head">
              <div className=""><img src={Backlog} alt="Description" /></div>
              <div>
                <h3 className="column-header x">
                Backlog{" "}
                <span className="task-count">{tasks.backlog.length}</span>
              </h3>
              </div>
              <div style={{display:"flex", flexDirection:"flex-end"}}>
                <img src={add} alt="Description" />
                <img src={dots} alt="Description" />
              </div>
            </div>
            {tasks.backlog.map((task) => (
              <Card
                key={task.id}
                id={task.id}
                title={task.title}
                profile="https://via.placeholder.com/40" // Default placeholder for profile
                feature={task.tag[0]} // Assuming tag is an array
              />
            ))}
          </div>

          {/* Todo Column */}
          <div className="kanban-column">
            <div className="col-head">
              <img src={todo} alt="Description" />
              <h3 className="column-header">
                Todo <span className="task-count">{tasks.todo.length}</span>
              </h3>
              <img src={add} className="z" alt="Description" />
              <img src={dots} alt="Description" />
            </div>

            {tasks.todo.map((task) => (
              <Card
                key={task.id}
                id={task.id}
                title={task.title}
                profile="https://via.placeholder.com/40" // Default placeholder for profile
                feature={task.tag[0]} // Assuming tag is an array
              />
            ))}
          </div>

          {/* In Progress Column */}
          <div className="kanban-column">
            <div className="col-head">
              <img src={inprogress} alt="Description" />
              <h3 className="column-header">
                In Progress{" "}
                <span className="task-count">{tasks.inProgress.length}</span>
              </h3>
              <img src={add} className="y" alt="Description" />
              <img src={dots} alt="Description" />
            </div>

            {tasks.inProgress.map((task) => (
              <Card
                key={task.id}
                id={task.id}
                title={task.title}
                profile="https://via.placeholder.com/40" // Default placeholder for profile
                feature={task.tag[0]} // Assuming tag is an array
              />
            ))}
          </div>

          {/* Done Column */}
          <div className="kanban-column">
            <div className="col-head">
              <img src={done} alt="Description" />
              <h3 className="column-header">
                Done <span className="task-count">{tasks.done.length}</span>
              </h3>
              <img src={add} className="a" alt="Description" />
              <img src={dots} alt="Description" />
            </div>

            {tasks.done.map((task) => (
              <Card
                key={task.id}
                id={task.id}
                title={task.title}
                profile={pro} // Default placeholder for profile
                feature={task.tag[0]} // Assuming tag is an array
              />
            ))}
          </div>

          {/* Cancelled Column */}
          <div className="kanban-column r">
            <div className="col-head">
              <img src={cancelled} alt="Description" />
              <h3 className="column-header">
                Cancelled{" "}
                <span className="task-count">{tasks.cancelled.length}</span>
              </h3>
            </div>

            {tasks.cancelled.map((task) => (
              <Card
                key={task.id}
                id={task.id}
                title={task.title}
                profile="https://via.placeholder.com/40" // Default placeholder for profile
                feature={task.tag[0]} // Assuming tag is an array
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Kanban;
