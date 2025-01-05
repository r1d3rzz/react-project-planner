import React from "react";
import toast from "react-hot-toast";
import useIsSubmit from "../../../stores/useIsSubmit";

const ProjectCard = ({ project: { id, title, detail } }) => {
  const api = import.meta.env.VITE_API_URL + "/projects";
  const { setIsSubmit } = useIsSubmit();
  const deleteProjectHandler = async () => {
    const res = await fetch(api + "/" + id, { method: "DELETE" });
    if (res.ok) {
      setIsSubmit(true);
      toast.success("Project Deleted Successfully");
    }
  };
  return (
    <div
      className="group grid grid-cols-4 shadow p-3 mb-3 last:mb-0 bg-white project"
      data-id={id}
    >
      <div className="col-span-3">
        <h3>
          {title} [{id}]
        </h3>
        <p>{detail}</p>
      </div>
      <div className="flex justify-end items-center translate-x-20 group-hover:translate-x-0 duration-500 opacity-0 group-hover:opacity-100">
        <button
          onClick={deleteProjectHandler}
          type="button"
          className="size-10 flex items-center  justify-center text-white text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Del
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
