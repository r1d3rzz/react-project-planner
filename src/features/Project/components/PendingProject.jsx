import React from "react";

const PendingProject = ({ project: { title, detail, id } }) => {
  return (
    <div className="shadow p-3 mb-3 last:mb-0 bg-white">
      <h3>{title}</h3>
      <p>{detail}</p>
    </div>
  );
};

export default PendingProject;
