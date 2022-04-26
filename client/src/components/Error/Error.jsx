import React from "react";

const Error = ({ error, length }) => {
  return (
    <div className="mt-2 mb-2 d-flex align-items-center justify-content-center">
      {error ? (
        <h3>Please Run Services - you can check {error}</h3>
      ) : (
        <h3>{length}</h3>
      )}
    </div>
  );
};

export default Error;
