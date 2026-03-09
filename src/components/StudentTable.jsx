import React from 'react';
import '../styles/StudentTable.css';
import ExcelDownload from './ExcelDownload';

export default function StudentTable({ students, onEdit, onDelete, isLoading }) {
  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Student Records ({students.length})</h2>
        <ExcelDownload students={students} />
      </div>

      {students.length === 0 ? (
        <div className="empty-state">
          <p>No students found. Add your first student to get started!</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="students-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="table-row">
                  <td className="id-cell">{student.id}</td>
                  <td className="name-cell">{student.name}</td>
                  <td className="email-cell">{student.email}</td>
                  <td className="age-cell">{student.age}</td>
                  <td className="actions-cell">
                    <button
                      className="btn-action btn-edit"
                      onClick={() => onEdit(student.id)}
                      disabled={isLoading}
                      title="Edit student"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn-action btn-delete"
                      onClick={() => onDelete(student.id)}
                      disabled={isLoading}
                      title="Delete student"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}