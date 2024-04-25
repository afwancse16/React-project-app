import NewProject from "./components/NewProject.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectInfo, setProjectInfo] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleAddProject = () => {
    setProjectInfo((prevData) => ({
      ...prevData,
      selectedProjectId: null,
    }));
  };

  const handleNewProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Math.random(),
    };

    setProjectInfo((prevData) => ({
      ...prevData,
      selectedProjectId: undefined,
      projects: [...prevData.projects, newProject],
    }));
  };

  const handleCancelProject = () => {
    setProjectInfo((prevData) => ({
      ...prevData,
      selectedProjectId: undefined,
    }));
  };

  const handleSelectProject = (id) => {
    setProjectInfo((prevData) => ({
      ...prevData,
      selectedProjectId: id,
    }));
  };

  const handleDeleteProject = (id) => {
    setProjectInfo((prevData) => ({
      ...prevData,
      projects: prevData.projects.filter(
        (i) => i.id !== prevData.selectedProjectId
      ),
      selectedProjectId: undefined,
    }));
  };

  const handleAddTasks = (text) => {
    setProjectInfo((prevData) => {
      const newTask = {
        text: text,
        projectId: prevData.selectedProjectId,
        id: Math.random(),
      };

      return {
        ...prevData,
        tasks: [...prevData.tasks, newTask],
      };
    });
  };

  const handleDeleteTask = (id) => {
    setProjectInfo((prevData) => ({
      ...prevData,
      tasks: prevData.tasks.filter((i) => i.id !== id),
    }));
  };

  const selectedProject = projectInfo.projects.find(
    (project) => project.id === projectInfo.selectedProjectId
  );

  const tasks = projectInfo.tasks.filter(
    (task) => task.projectId === projectInfo.selectedProjectId
  );

  let content = (
    <SelectedProject
      tasks={tasks}
      onAddTask={handleAddTasks}
      onDeleteTask={handleDeleteTask}
      project={selectedProject}
      onDeleteProject={handleDeleteProject}
    />
  );

  if (projectInfo.selectedProjectId === undefined) {
    content = <NoProjectSelected createProjectClicked={handleAddProject} />;
  } else if (projectInfo.selectedProjectId === null) {
    content = (
      <NewProject
        onHandleNewProject={handleNewProject}
        onHandleCancel={handleCancelProject}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        projects={projectInfo.projects}
        createProjectClicked={handleAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectInfo.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
