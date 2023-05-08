import React from "react";
import { BiTask, BiTime } from "react-icons/bi";
import { BsPlusCircle, BsTrash } from "react-icons/bs";
import { GoCalendar } from "react-icons/go";

function Taskboard() {
  return (
    <div className="taskboard box">
      <div className="f-start task-head">
        <BiTask /> <h4>Taskboard</h4>
      </div>
      <div className="tasks scrollY">
        <div className="task">
          <div className="space-b task-body">
            <p className="f-start">
              <GoCalendar />
              add product
            </p>
            <BsTrash />
          </div>
          <small className="f-start time">
            <BiTime /> 15:30
          </small>
        </div>
        <div className="task">
          <div className="space-b task-body">
            <p className="f-start">
              <GoCalendar />
              add product
            </p>
            <BsTrash />
          </div>
          <small className="f-start time">
            <BiTime /> 15:30
          </small>
        </div>
        <div className="task">
          <div className="space-b task-body">
            <p className="f-start">
              <GoCalendar />
              add product
            </p>
            <BsTrash />
          </div>
          <small className="f-start time">
            <BiTime /> 15:30
          </small>
        </div>
        <div className="task">
          <div className="space-b task-body">
            <p className="f-start">
              <GoCalendar />
              add product
            </p>
            <BsTrash />
          </div>
          <small className="f-start time">
            <BiTime /> 15:30
          </small>
        </div>
        <div className="task">
          <div className="space-b task-body">
            <p className="f-start">
              <GoCalendar />
              add product
            </p>
            <BsTrash />
          </div>
          <small className="f-start time">
            <BiTime /> 15:30
          </small>
        </div>
        <div className="task">
          <div className="space-b task-body">
            <p className="f-start">
              <GoCalendar />
              add product
            </p>
            <BsTrash />
          </div>
          <small className="f-start time">
            <BiTime /> 15:30
          </small>
        </div>
     
        <div className="add-task center">
        <BsPlusCircle/>
        Add Task
      </div>
      </div>
      
    </div>
  );
}

export default Taskboard;
