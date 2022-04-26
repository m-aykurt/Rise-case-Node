import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addTodoToRedux } from "../../redux/todos/todosSlice.js";

import plus from "../../assets/form/plus.svg";
import rice from "../../assets/form/rise.jpg";
import "./style.scss";
import {
  successToastify,
  warningToastify,
} from "../../components/Toasts/customToast.js";

const Form = () => {
  const [todoName, setTodoName] = useState("");
  const [todoPriorty, setTodoPriorty] = useState("1");
  const error = useSelector((state) => state.todos.error);

  const dispatch = useDispatch();

  const handleTodo = (e) => {
    e.preventDefault();
    if (todoName && todoPriorty) {
      if (!error) {
        dispatch(
          addTodoToRedux({
            id: nanoid(),
            name: todoName,
            priorty: todoPriorty,
          })
        );
        setTodoName("");
        setTodoPriorty("1");
        successToastify("The work is recorded");
      } else {
        warningToastify(`Please check ${error}`);
      }
    } else {
      warningToastify("Please Fill All Fields");
    }
  };
  return (
    <div>
      <div className="logo">
        <img className="w-100" src={rice} alt="" />
      </div>
      <hr />
      <div className="mb-2 d-flex flex-column w-25">
        <h5>Create New Job</h5>
        <div className="seperatorForm"></div>
      </div>
      <form className="row" onSubmit={(e) => handleTodo(e)}>
        <div className="col-lg-8 mb-3">
          <h5 className="fw-light form-label">Job Name</h5>
          <input
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>
        <div className="mb-3 col-lg-2">
          <h5 className="form-label fw-light">Job Priorty</h5>
          <select
            onChange={(e) => setTodoPriorty(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue="0">Choose</option>
            <option value="1">Urgent</option>
            <option value="2">Regular</option>
            <option value="3">Trivial</option>
          </select>
        </div>
        <div className="col-lg-2 mt-4 ">
          <button
            disabled={error}
            type="submit"
            className="btn btn-primary submitBtn"
          >
            <img className="w-25" src={plus} alt="" /> Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
