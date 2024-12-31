import React from "react";

const PendingProject = ({ item }) => {
  return (
    <div className="shadow p-3 mb-3 last:mb-0 bg-white">
      <h3>Project {item.id}</h3>
      <p>description</p>
    </div>
  );
};

export default PendingProject;