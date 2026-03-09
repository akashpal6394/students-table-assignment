import React from 'react';
import '../styles/ConfirmDialog.css';

export default function ConfirmDialog({ title, message, onConfirm, onCancel, isLoading }) {
  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="dialog-actions">
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}