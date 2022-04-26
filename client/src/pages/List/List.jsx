import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../components/Error/Error.jsx";
import {
  sortByNameToAsc,
  sortByNameToDesc,
  sortByPriToAsc,
  sortByPriToDesc,
  deleteTodo,
  getTodosFromLocal,
  updateTodo,
  searchTodoByName,
  searchTodoByPri,
  selectTodos,
} from "../../redux/todos/todosSlice.js";
import { getDefaultParamsAsync } from "../../redux/todos/services.js";

import {
  dangerToastify,
  warningToastify,
} from "../../components/Toasts/customToast";

import "./style.scss";

const List = () => {
  const [todoNewPriorty, setTodoNewPriorty] = useState(undefined);
  const [todoForUpdate, setTodoForUpdate] = useState({} || "");
  const [searchParamByName, setSearchParamByName] = useState("");
  const [showSearchedData, setShowSearchedData] = useState(false);
  const [showSearchedByNameData, setShowSearchedByNameData] = useState(false);

  const todos = useSelector((state) => state.todos.items);
  const defaultParams = useSelector((state) => state.todos.defaultParams);
  const searchedData = useSelector((state) => state.todos.searchedData);
  const searchedByNameData = useSelector(
    (state) => state.todos.searchedByNameData
  );
  const error = useSelector((state) => state.todos.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosFromLocal());
    dispatch(getDefaultParamsAsync());
  }, []);

  // FUNCTIONS

  // DELETE FUNCTION

  const handleDelete = (id) => {
    setShowSearchedByNameData(false);
    setShowSearchedData(false);
    if (window.confirm("Are You Sure ?")) {
      dispatch(deleteTodo(id));
      dangerToastify("Todo is deleted");
    } else {
      warningToastify("You did not delete todo !");
    }
  };

  // SEARCH FUNC

  const handleSetByName = (e) => {
    e.preventDefault();
    setShowSearchedByNameData(true);
    setSearchParamByName(e.target.value);
    dispatch(searchTodoByName(e.target.value));
  };

  const handleSearchByPri = (id) => {
    setShowSearchedData(true);
    if (id) {
      dispatch(searchTodoByPri(id));
    } else {
      warningToastify("You have not changed");
    }
  };

  // UPDATE FUNC
  const handleUpdateByRedux = (todoForUpdate) => {
    dispatch(
      updateTodo({
        id: todoForUpdate.id,
        name: todoForUpdate.name,
        priorty: todoNewPriorty,
      })
    );
  };

  const handleUpdateByState = (todoForUpdate) => {
    setShowSearchedByNameData(false);
    setShowSearchedData(false);
    setTodoForUpdate(todoForUpdate);
  };

  return (
    <div className="mt-3 listArea">
      <div className="d-flex justify-content-between">
        <div>
          <h5>Job List</h5>
          <div className="seperator"></div>
        </div>
        <p>
          {showSearchedData
            ? searchedData.length
            : showSearchedByNameData
            ? searchedByNameData.length
            : todos.length}{" "}
          / {todos.length}
        </p>
      </div>
      <div className="directorArea">
        <form className="row formArea" onSubmit={(e) => handleSetByName(e)}>
          <div className="col-lg-9 mb-3">
            <input
              value={searchParamByName}
              onChange={(e) => handleSetByName(e)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Job Name"
            />
          </div>
          <div className="mb-3 col-lg-3">
            <select
              onChange={(e) => handleSearchByPri(e.target.value)}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">Choose</option>
              <option value="1">Urgent</option>
              <option value="2">Regular</option>
              <option value="3">Trivial</option>
            </select>
          </div>
        </form>

        {/* LIST AREA */}
        <div className="seperatorDark" />
        <div className="row mb-1 searchArea">
          <div className="col col-sm-7 col-lg-7">
            <div className=" d-flex gap-5  align-items-center">
              <h5>Name</h5>
              <div className="d-flex d-grid gap-2">
                <i
                  onClick={() => dispatch(sortByNameToAsc())}
                  className="fas fa-arrow-up"
                ></i>{" "}
                <i
                  onClick={() => dispatch(sortByNameToDesc())}
                  className="fas fa-arrow-down"
                ></i>
              </div>
            </div>
          </div>
          <div className="col col-sm-3 col-lg-3 d-flex  gap-5 align-items-center">
            <h5>Priorty</h5>
            <div className="d-flex d-grid gap-2">
              <i
                onClick={() => dispatch(sortByPriToAsc())}
                className="fas fa-arrow-up"
              ></i>{" "}
              <i
                onClick={() => dispatch(sortByPriToDesc())}
                className="fas fa-arrow-down"
              ></i>
            </div>
          </div>
          <div className="col col-sm-2 col-lg-2">
            <h5>Action</h5>
          </div>
        </div>
      </div>
      {/* Data mapping area */}
      {defaultParams.length > 0 ? (
        searchedByNameData.length === 0 ||
        searchedData.length === 0 ||
        todos.length === 0 ? (
          <Error length={"You have no task."} />
        ) : !showSearchedData ? (
          showSearchedByNameData ? (
            searchedByNameData.map((todo) => (
              <div
                key={todo.id}
                className="row d-flex align-items-center todoItem"
              >
                <div className="col col-sm-7 col-lg-7 text-start">
                  <p>{todo.name}</p>
                </div>
                <div className="col col-sm-3 col-lg-3 text-start">
                  <Button
                    style={{
                      background: defaultParams.find(
                        ({ id }) => id === todo.priorty
                      )?.color,
                    }}
                  >
                    {defaultParams.find(({ id }) => id === todo.priorty)?.name}
                  </Button>
                </div>
                <div className="col col-sm-2 col-lg-2 text-start d-flex gap-3 icon-area">
                  <div className="icon">
                    <i
                      type="button"
                      className="far fa-edit"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => handleUpdateByState(todo)}
                    ></i>
                  </div>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Job Edit
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Todo Name
                              </label>
                              <input
                                disabled
                                value={todoForUpdate.name}
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                              >
                                Job Priorty
                              </label>
                              <select
                                value={todoForUpdate.priorty}
                                onChange={(e) =>
                                  setTodoNewPriorty(e.target.value)
                                }
                                className="form-select"
                                aria-label="Default select example"
                              >
                                <option value="0">Choose</option>
                                <option value="1">Urgent</option>
                                <option value="2">Regular</option>
                                <option value="3">Trivial</option>
                              </select>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleUpdateByRedux(todoForUpdate)}
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="icon">
                    <i
                      onClick={() => handleDelete(todo.id)}
                      className="fas fa-trash-alt"
                    ></i>
                  </div>
                </div>
              </div>
            ))
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="row d-flex align-items-center todoItem"
              >
                <div className="col col-sm-7 col-lg-7 text-start">
                  <p>{todo.name}</p>
                </div>
                <div className="col col-sm-3 col-lg-3 text-start">
                  <Button
                    style={{
                      background: defaultParams.find(
                        ({ id }) => id === todo.priorty
                      )?.color,
                    }}
                  >
                    {defaultParams.find(({ id }) => id === todo.priorty)?.name}
                  </Button>
                </div>
                <div className="col col-sm-2 col-lg-2 text-start d-flex gap-3 iconArea">
                  <div className="icon">
                    <i
                      type="button"
                      className="far fa-edit"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => handleUpdateByState(todo)}
                    ></i>
                  </div>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Job Edit
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Todo Name
                              </label>
                              <input
                                disabled
                                value={todoForUpdate.name}
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                              >
                                Job Priorty
                              </label>
                              <select
                                value={todoForUpdate.priorty}
                                onChange={(e) =>
                                  setTodoNewPriorty(e.target.value)
                                }
                                className="form-select"
                                aria-label="Default select example"
                              >
                                <option value="0">Choose</option>
                                <option value="1">Urgent</option>
                                <option value="2">Regular</option>
                                <option value="3">Trivial</option>
                              </select>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleUpdateByRedux(todoForUpdate)}
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="icon">
                    <i
                      onClick={() => handleDelete(todo.id)}
                      className="fas fa-trash-alt"
                    ></i>
                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          searchedData.map((todo) => (
            <div
              key={todo.id}
              className="row d-flex align-items-center todoItem"
            >
              <div className="col col-sm-7 col-lg-7 text-start">
                <p>{todo.name}</p>
              </div>
              <div className="col col-sm-3 col-lg-3 text-start">
                <Button
                  style={{
                    background: defaultParams.find(
                      ({ id }) => id === todo.priorty
                    )?.color,
                  }}
                >
                  {defaultParams.find(({ id }) => id === todo.priorty)?.name}
                </Button>
              </div>
              <div className="col col-sm-2 col-lg-2 text-start d-flex gap-3 icon-area">
                <div className="icon">
                  <i
                    type="button"
                    className="far fa-edit"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleUpdateByState(todo)}
                  ></i>
                </div>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Job Edit
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Todo Name
                            </label>
                            <input
                              disabled
                              value={todoForUpdate.name}
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleInputPassword1"
                              className="form-label"
                            >
                              Job Priorty
                            </label>
                            <select
                              value={todoForUpdate.priorty}
                              onChange={(e) =>
                                setTodoNewPriorty(e.target.value)
                              }
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option value="0">Choose</option>
                              <option value="1">Urgent</option>
                              <option value="2">Regular</option>
                              <option value="3">Trivial</option>
                            </select>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateByRedux(todoForUpdate)}
                          type="button"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="icon">
                  <i
                    onClick={() => handleDelete(todo.id)}
                    className="fas fa-trash-alt"
                  ></i>
                </div>
              </div>
            </div>
          ))
        )
      ) : (
        <Error error={error} />
      )}
    </div>
  );
};

export default List;
