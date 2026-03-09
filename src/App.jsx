import React, { useState, useCallback } from 'react';
import './App.css';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import ConfirmDialog from './components/ConfirmDialog';
import LoadingSpinner from './components/LoadingSpinner';

const INITIAL_STUDENTS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 20 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 21 },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', age: 22 },
];

export default function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });
  const [searchTerm, setSearchTerm] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveStudent = useCallback((formData) => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.age) {
      alert('All fields are required!');
      return;
    }

    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address!');
      return;
    }

    if (formData.age < 1 || formData.age > 120) {
      alert('Age must be between 1 and 120!');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (editingId) {
        setStudents(students.map(s =>
          s.id === editingId
            ? { ...s, ...formData }
            : s
        ));
        setEditingId(null);
      } else {
        const newStudent = {
          id: Date.now(),
          ...formData,
          age: parseInt(formData.age),
        };
        setStudents([...students, newStudent]);
      }
      setLoading(false);
    }, 500);
  }, [editingId, students]);

  const handleEditStudent = useCallback((id) => {
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDeleteStudent = useCallback((id) => {
    setDeleteConfirm({ show: true, id });
  }, []);

  const confirmDelete = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setStudents(students.filter(s => s.id !== deleteConfirm.id));
      setDeleteConfirm({ show: false, id: null });
      setLoading(false);
    }, 400);
  }, [deleteConfirm.id, students]);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
  }, []);

  const editingStudent = editingId ? students.find(s => s.id === editingId) : null;

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📚 Students Management System</h1>
        <p>Manage your student records efficiently</p>
      </header>

      <main className="app-main">
        {loading && <LoadingSpinner />}

        <StudentForm
          editingStudent={editingStudent}
          onSave={handleSaveStudent}
          onCancel={handleCancelEdit}
          isLoading={loading}
        />

        <div className="search-section">
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <StudentTable
          students={filteredStudents}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
          isLoading={loading}
        />

        {deleteConfirm.show && (
          <ConfirmDialog
            title="Delete Student"
            message="Are you sure you want to delete this student? This action cannot be undone."
            onConfirm={confirmDelete}
            onCancel={() => setDeleteConfirm({ show: false, id: null })}
            isLoading={loading}
          />
        )}
      </main>
    </div>
  );
}