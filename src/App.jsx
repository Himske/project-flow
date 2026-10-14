import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ContentArea from './components/ContentArea';
import Overview from './pages/Overview';
import Links from './pages/Links';
import Notes from './pages/Notes';
import Todos from './pages/Todos';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState('ProjectFlow Platform');
  const [searchQuery, setSearchQuery] = useState('');

  // Local storage persistence
  useEffect(() => {
    const savedData = localStorage.getItem('projectflow-data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setSelectedProject(parsed.selectedProject || 'ProjectFlow Platform');
      setActiveTab(parsed.activeTab || 'overview');
    }
  }, []);

  useEffect(() => {
    const data = {
      selectedProject,
      activeTab,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('projectflow-data', JSON.stringify(data));
  }, [selectedProject, activeTab]);

  return (
    <Router>
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onSelectProject={setSelectedProject}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
            quickAdd={() => { }}
          />
          <ContentArea>
            <Routes>
              <Route
                path="/"
                element={
                  <Overview
                    project={selectedProject}
                    searchQuery={searchQuery}
                  />
                }
              />
              <Route
                path="/links"
                element={
                  <Links
                    searchQuery={searchQuery}
                  />
                }
              />
              <Route
                path="/notes"
                element={
                  <Notes
                    searchQuery={searchQuery}
                  />
                }
              />
              <Route
                path="/todos"
                element={
                  <Todos
                    searchQuery={searchQuery}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ContentArea>
        </div>
      </div>
    </Router>
  );
}

export default App;