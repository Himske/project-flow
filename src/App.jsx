import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ContentArea from './components/ContentArea';
import ItemModal from './components/ItemModal';
import Overview from './pages/Overview';
import Links from './pages/Links';
import Notes from './pages/Notes';
import Todos from './pages/Todos';
import projectData from '../data/projects.json';

const initialProjects = projectData.projects;

export default function App() {
  const [savedData] = useState(() => {
    const storedData = localStorage.getItem('projectflow-data');
    return storedData ? JSON.parse(storedData) : {};
  });
  const [projects, setProjects] = useState(() =>
    Array.isArray(savedData.projects) ? savedData.projects : initialProjects
  );
  const [activeTab, setActiveTab] = useState(savedData.activeTab || 'overview');
  const [selectedProjectId, setSelectedProjectId] = useState(() => {
    const savedProject = projects.find(project =>
      project.id === savedData.selectedProject || project.label === savedData.selectedProject
    );
    return savedProject?.id || projects[0].id;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const selectedProject = projects.find(project => project.id === selectedProjectId) || projects[0];

  const saveModalItem = itemData => {
    if (!activeModal) return;
    const collection = activeModal.type === 'task' ? 'tasks' : `${activeModal.type}s`;

    setProjects(currentProjects => currentProjects.map(project => {
      if (project.id !== selectedProject.id) return project;
      const items = project[collection] || [];

      if (activeModal.item) {
        return {
          ...project,
          [collection]: items.map(item => item.id === activeModal.item.id
            ? { ...item, ...itemData }
            : item
          ),
        };
      }

      const nextId = items.reduce((maxId, item) => Math.max(maxId, Number(item.id) || 0), 0) + 1;
      return { ...project, [collection]: [...items, { ...itemData, id: nextId }] };
    }));
    setActiveModal(null);
  };

  useEffect(() => {
    const data = {
      projects,
      selectedProject: selectedProjectId,
      activeTab,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('projectflow-data', JSON.stringify(data));
  }, [projects, selectedProjectId, activeTab]);

  return (
    <Router>
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          projects={projects}
          selectedProjectId={selectedProject.id}
          onSelectProject={projectId => {
            setSelectedProjectId(projectId);
            setActiveTab('overview');
          }}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            projectName={selectedProject.label}
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
          />
          <ContentArea>
            <Routes>
              <Route
                path="/"
                element={
                  <Overview
                    project={selectedProject}
                    searchQuery={searchQuery}
                    onSelectTab={setActiveTab}
                    onEditTask={task => setActiveModal({ type: 'task', item: task })}
                    onEditLink={link => setActiveModal({ type: 'link', item: link })}
                  />
                }
              />
              <Route
                path="/links"
                element={
                  <Links
                    project={selectedProject}
                    searchQuery={searchQuery}
                    onAddLink={() => setActiveModal({ type: 'link' })}
                    onEditLink={link => setActiveModal({ type: 'link', item: link })}
                  />
                }
              />
              <Route
                path="/notes"
                element={
                  <Notes
                    project={selectedProject}
                    searchQuery={searchQuery}
                    onAddNote={() => setActiveModal({ type: 'note' })}
                  />
                }
              />
              <Route
                path="/todos"
                element={
                  <Todos
                    project={selectedProject}
                    searchQuery={searchQuery}
                    onAddTask={() => setActiveModal({ type: 'task' })}
                    onEditTask={task => setActiveModal({ type: 'task', item: task })}
                    onUpdateTaskStatus={(taskId, status) => {
                      setProjects(currentProjects => currentProjects.map(project =>
                        project.id === selectedProject.id
                          ? {
                            ...project,
                            tasks: (project.tasks || []).map(task =>
                              task.id === taskId
                                ? { ...task, status, completed: status === 'done' }
                                : task
                            ),
                          }
                          : project
                      ));
                    }}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ContentArea>
        </div>
      </div>
      {activeModal && (
        <ItemModal
          type={activeModal.type}
          item={activeModal.item}
          onClose={() => setActiveModal(null)}
          onSave={saveModalItem}
        />
      )}
    </Router>
  );
}
