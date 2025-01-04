import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import storeProject from "../../../services/project/storeProject";
import useSWR from "swr";
import { useState } from "react";

const ProjectCreateForm = ({ addNewProjectHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const api = import.meta.env.VITE_API_URL + "/projects";
  let [newSerialNumber, setNewSerialNumber] = useState(0);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(api, fetcher);

  if (error) return <div>Error loading projects</div>;
  if (isLoading) return <div>Loading...</div>;

  const projects = data;

  const calculateNewSerialNumber = () => {
    let projectSerialNumbers = [];
    if (projects && projects.length > 0) {
      projects.forEach((project) => {
        if (project.status === "pending") {
          projectSerialNumbers.push(project.serial);
        }
      });
      return Math.max(...projectSerialNumbers) + 1;
    }
    return 0;
  };

  const onSubmit = async (data) => {
    if (data.isConfirm) {
      const nextSerialNumber = calculateNewSerialNumber(); // Get the serial number dynamically
      const projectData = {
        title: data.title,
        detail: data.detail,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "pending",
        serial: nextSerialNumber,
      };
      const res = await storeProject(projectData);
      if (res.ok) {
        addNewProjectHandler();
        toast.success("Project Created Successfully");
      } else {
        toast.error("Something went wrong");
      }
      reset();
    } else {
      alert("Need Confirm your project plan");
    }
  };

  return (
    <div>
      <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <div className="text-sm text-red-500">Title is required</div>
          )}
        </div>
        <div className="mb-5">
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Project Plan
            </label>
            <textarea
              id="message"
              name="detail"
              rows={4}
              {...register("detail", { required: true })}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              defaultValue={""}
            />
            {errors.detail && (
              <div className="text-sm text-red-500">
                Project Plan is required
              </div>
            )}
          </div>
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="isConfirm"
              name="isConfirm"
              type="checkbox"
              {...register("isConfirm", { required: true })}
              defaultValue
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="isConfirm"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Is Confirm
          </label>
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isSubmitting ? <span>Creating...</span> : <span>Create Plan</span>}
        </button>
      </form>
    </div>
  );
};

export default ProjectCreateForm;
