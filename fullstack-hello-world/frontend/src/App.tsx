import React, { useEffect, useState } from 'react';

const App = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState('');

  const fetchRecords = async () => {
    const response = await fetch('/api/records');
    const data = await response.json();
    setRecords(data);
  };

  const addRecord = async (e) => {
    e.preventDefault();
    await fetch('/api/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newRecord }),
    });
    setNewRecord('');
    fetchRecords();
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hello World Records</h1>
      <form onSubmit={addRecord} className="mb-4">
        <input
          type="text"
          value={newRecord}
          onChange={(e) => setNewRecord(e.target.value)}
          placeholder="Add a new record"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Record
        </button>
      </form>
      <ul>
        {records.map((record, index) => (
          <li key={index} className="border-b py-2">
            {record.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;