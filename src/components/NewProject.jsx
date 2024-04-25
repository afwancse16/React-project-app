import { useRef } from "react";
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

export default function NewProject({ onHandleNewProject, onHandleCancel }) {
  const projectName = useRef();
  const projectDescription = useRef();
  const projectDate = useRef();
  const modalRef = useRef();

  const onSaveClicked = () => {
    const project = {
      name: projectName.current.value,
      description: projectDescription.current.value,
      projectDate: projectDate.current.value,
    };

    if (
      project.name.trim() === "" ||
      project.description.trim() === "" ||
      project.projectDate.trim() === ""
    ) {
        modalRef.current.open();
        return;
    }

    onHandleNewProject(project);
  };

  return (
    <>
      <Modal ref={modalRef} buttonCaption="OK">
        <h2 className="text-xl font-bold text-stone-700 mt-4 my-4">Invalid Input</h2>
        <p className='text-stone-600 mb-4'>Oops .. Looks like like you forgot a value</p>
        <p className='text-stone-600 mb-4'>Please provide all the info.</p>
        </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button onClick={onHandleCancel} className="text-stone-800 hover:text-stone-950">
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={onSaveClicked}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input title="Name" type="text" ref={projectName} />
          <Input title="Description" textarea ref={projectDescription} />
          <Input title="Due Date" type="date" ref={projectDate} />
        </div>
      </div>
    </>
  );
}
