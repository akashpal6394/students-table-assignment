import React, { useState, useEffect } from 'react';
import '../styles/StudentForm.css';

const INITIAL_FORM = { name: '', email: '', age: '' };

export default function StudentForm({ editingStudent, onSave, onCancel, isLoading }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        email: editingStudent.email,
        age: editingStudent.age,
      });
    } else {
      setFormData(INITIAL_FORM);
    }
    setErrors({});
  }, [editingStudent]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Age must be between 1 and 120';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      setFormData(INITIAL_FORM);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingStudent ? '✏️ Edit Student' : '➕ Add New Student'}</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            disabled={isLoading}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter student email"
            disabled={isLoading}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter student age"
            min="1"
            max="120"
            disabled={isLoading}
            className={errors.age ? 'input-error' : ''}
          />
          {errors.age && <span className="error-message">{errors.age}</span>}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : editingStudent ? 'Update Student' : 'Add Student'}
          </button>
          {editingStudent && (
            <button
              type="button"
              className="btn btn-secondary btn-large"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}