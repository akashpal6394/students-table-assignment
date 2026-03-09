import React from 'react';

export default function ExcelDownload({ students }) {
  const handleDownload = () => {
    if (students.length === 0) {
      alert('No data to download!');
      return;
    }

    // Create CSV content
    const headers = ['ID', 'Name', 'Email', 'Age'];
    const csvContent = [
      headers.join(','),
      ...students.map(s => `${s.id},${s.name},"${s.email}",${s.age}`)
    ].join('\n');

    // Create and download file
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
    element.setAttribute('download', `students-${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <button onClick={handleDownload} className="btn btn-primary" title="Download as CSV">
      📥 Export to Excel
    </button>
  );
}