import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../store/articlesSlice";

function Home() {
  const taskRef = useRef();
  const descRef = useRef();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [editMode, setEditMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [Comments, setComments] = useState({});

  function handleAdd(e) {
    e.preventDefault();

    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleString();

    const userInfo = {
      task: taskRef.current.value,
      desc: descRef.current.value,
      time: formattedTime,
      comments: [],
    };

    if (editMode) {
      dispatch(updateTask({ index: currentIndex, updatedTask: userInfo }));
      setEditMode(false);
      setCurrentIndex(null);
    } else {
      dispatch(addTask(userInfo));
    }

    taskRef.current.value = "";
    descRef.current.value = "";
  }

  function handleEdit(index) {
    setEditMode(true);
    setCurrentIndex(index);

    taskRef.current.value = tasks[index].task;
    descRef.current.value = tasks[index].desc;
  }

  function handleAddComment(taskIndex) {
    const comment = Comments[taskIndex]?.trim();
    if (!comment) {
      alert("Izoh bo'sh bo'lishi mumkin emas!");
      return;
    }

    const updatedTask = { ...tasks[taskIndex] };
    updatedTask.comments = [...updatedTask.comments, comment];

    dispatch(updateTask({ index: taskIndex, updatedTask }));

    setComments((prevState) => ({
      ...prevState,
      [taskIndex]: "",
    }));
  }

  function handleCommentChange(taskIndex, value) {
    setComments((prevState) => ({
      ...prevState,
      [taskIndex]: value,
    }));
  }

  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
          {editMode ? "Update Task" : "Add Task"}
        </h1>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <input
              ref={taskRef}
              type="text"
              placeholder="Enter task name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              ref={descRef}
              type="text"
              placeholder="Enter description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {editMode ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>

      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.length > 0 &&
          tasks.map((value, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-700">
                  {value.task}
                </h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Created at: {value.time}
              </p>
              <div className="mt-4">
                <input
                  type="text"
                  value={Comments[index] || ""}
                  onChange={(e) => handleCommentChange(index, e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleAddComment(index)}
                  className="mt-2 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                >
                  Add Comment
                </button>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700">
                  Comments:
                </h4>
                {value.comments.length > 0 ? (
                  value.comments.map((comment, i) => (
                    <p key={i} className="text-gray-600 text-sm mt-1">
                      - {comment}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No comments yet.</p>
                )}
              </div>
              <button
                onClick={() => handleEdit(index)}
                className="btn btn-secondary w-24 h-1 mt-3"
              >
                Edit
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;