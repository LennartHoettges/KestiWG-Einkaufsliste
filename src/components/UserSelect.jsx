import { useState } from 'react';
import './UserSelect.css';

const WG_MEMBERS = ['Lennart', 'Anna', 'Max'];

export default function UserSelect({ onUserSelect }) {
  const [selectedUser, setSelectedUser] = useState('');

  const handleSelect = (name) => {
    setSelectedUser(name);
  };

  const handleConfirm = () => {
    if (selectedUser) {
      onUserSelect(selectedUser);
    }
  };

  return (
    <div className="user-select-overlay">
      <div className="user-select-modal">
        <h2>👋 Willkommen!</h2>
        <p>Bitte wähle deinen Namen:</p>
        <div className="user-buttons">
          {WG_MEMBERS.map((name) => (
            <button
              key={name}
              className={`user-btn ${selectedUser === name ? 'selected' : ''}`}
              onClick={() => handleSelect(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <button
          className="confirm-btn"
          onClick={handleConfirm}
          disabled={!selectedUser}
        >
          Bestätigen
        </button>
      </div>
    </div>
  );
}
