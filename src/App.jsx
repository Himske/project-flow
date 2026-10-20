import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ContentArea from './components/ContentArea';
import ItemModal from './components/ItemModal';
import DeleteModal from './components/DeleteModal';
import ConfigurationModal from './components/ConfigurationModal';
import Overview from './pages/Overview';
import Links from './pages/Links';
import Notes from './pages/Notes';
import Todos from './pages/Todos';

export default function App() {
  const basename = import.meta.env.BASE_URL;
  const [savedData] = useState(() => {
    const storedData = localStorage.getItem('projectflow-data');
    return storedData ? JSON.parse(storedData) : {};
  });
  const [projects, setProjects] = useState(() =>
    Array.isArray(savedData.projects) ? savedData.projects : []
  );
  const [activeTab, setActiveTab] = useState(savedData.activeTab || 'overview');
  const [selectedProjectId, setSelectedProjectId] = useState(() => {
    const savedProject = projects.find(project =>
      project.id === savedData.selectedProject || project.label === savedData.selectedProject
    );
    return savedProject?.id ?? projects[0]?.id ?? null;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [activeDelete, setActiveDelete] = useState(null);
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const selectedProject = projects.find(project => project.id === selectedProjectId) || projects[0];

  const createProject = projectDetails => {
    const projectId = `project-${globalThis.crypto?.randomUUID?.() || Date.now()}`;
    setProjects(currentProjects => [...currentProjects, {
      id: projectId,
      ...projectDetails,
      tasks: [],
      notes: [],
      links: [],
    }]);
    return projectId;
  };

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

  const confirmDelete = () => {
    if (!activeDelete) return;
    if (activeDelete.type === 'project') {
      const remainingProjects = projects.filter(project => project.id !== activeDelete.item.id);
      setProjects(remainingProjects);
      setSelectedProjectId(remainingProjects[0]?.id ?? null);
      setActiveTab('overview');
      setActiveDelete(null);
      return;
    }

    const collection = activeDelete.type === 'task' ? 'tasks' : `${activeDelete.type}s`;
    setProjects(currentProjects => currentProjects.map(project =>
      project.id === selectedProject.id
        ? {
          ...project,
          [collection]: (project[collection] || []).filter(item => item.id !== activeDelete.item.id),
        }
        : project
    ));
    setActiveDelete(null);
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
    <Router basename={basename}>
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          projects={projects}
          selectedProjectId={selectedProject?.id}
          onSelectProject={projectId => {
            setSelectedProjectId(projectId);
            setActiveTab('overview');
          }}
          onOpenConfiguration={() => setConfigurationOpen(true)}
          onCreateProject={createProject}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            projectName={selectedProject?.label || 'Local workspace'}
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
          />
          <ContentArea>
            {selectedProject ? <Routes>
              <Route
                path="/"
                element={
                  <Overview
                    project={selectedProject}
                    searchQuery={searchQuery}
                    onSelectTab={setActiveTab}
                    onEditTask={task => setActiveModal({ type: 'task', item: task })}
                    onDeleteTask={task => setActiveDelete({ type: 'task', item: task })}
                    onEditLink={link => setActiveModal({ type: 'link', item: link })}
                    onDeleteLink={link => setActiveDelete({ type: 'link', item: link })}
                    onUpdateProject={(projectId, projectDetails) => {
                      setProjects(currentProjects => currentProjects.map(project =>
                        project.id === projectId ? { ...project, ...projectDetails } : project
                      ));
                    }}
                    onDeleteProject={project => setActiveDelete({ type: 'project', item: project })}
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
                    onDeleteLink={link => setActiveDelete({ type: 'link', item: link })}
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
                    onDeleteNote={note => setActiveDelete({ type: 'note', item: note })}
                    onUpdateNote={(noteId, content) => {
                      setProjects(currentProjects => currentProjects.map(project =>
                        project.id === selectedProject.id
                          ? {
                            ...project,
                            notes: (project.notes || []).map(note => note.id === noteId
                              ? { ...note, content, snippet: content, lastEdited: 'just now' }
                              : note
                            ),
                          }
                          : project
                      ));
                    }}
                    onTogglePin={noteId => {
                      setProjects(currentProjects => currentProjects.map(project =>
                        project.id === selectedProject.id
                          ? {
                            ...project,
                            notes: (project.notes || []).map(note => note.id === noteId
                              ? { ...note, pinned: !note.pinned }
                              : note
                            ),
                          }
                          : project
                      ));
                    }}
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
                    onDeleteTask={task => setActiveDelete({ type: 'task', item: task })}
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
            </Routes> : (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                <p className="text-sm text-gray-400">No projects found in local storage.</p>
                <button
                  type="button"
                  onClick={() => setConfigurationOpen(true)}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                >
                  Import workspace
                </button>
              </div>
            )}
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
      {activeDelete && (
        <DeleteModal
          type={activeDelete.type}
          item={activeDelete.item}
          onClose={() => setActiveDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
      {configurationOpen && (
        <ConfigurationModal
          data={{
            projects,
            selectedProject: selectedProjectId,
            activeTab,
            timestamp: new Date().toISOString(),
          }}
          onClose={() => setConfigurationOpen(false)}
          onImport={importedData => {
            setProjects(importedData.projects);
            const importedProject = importedData.projects.find(project =>
              project.id === importedData.selectedProject || project.label === importedData.selectedProject
            ) || importedData.projects[0];
            setSelectedProjectId(importedProject.id);
            setActiveTab(['overview', 'todos', 'notes', 'links'].includes(importedData.activeTab)
              ? importedData.activeTab
              : 'overview'
            );
          }}
        />
      )}
    </Router>
  );
}
