import { useState } from 'react';
import './AddItem.css';

export default function AddItem({ onAdd, currentUser }) {
  const [itemName, setItemName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim()) {
      onAdd(itemName.trim(), currentUser);
      setItemName('');
    }
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="item-input"
        placeholder="Neues Item..."
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button type="submit" className="add-btn" disabled={!itemName.trim()}>
        +
      </button>
    </form>
  );
}
