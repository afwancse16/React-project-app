import { useState } from "react";

export default function NewTask({onAdd}) {
  const [taskName, setTaskName] = useState('');

  const handleChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleClick = () => {
    onAdd(taskName);
    setTaskName('');
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-2 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={taskName}
      />
      <button onClick={handleClick} className="text-stone-700 hover:text-stone-950">Add Task</button>
    </div>
  );
}
