import './ShoppingItem.css';

export default function ShoppingItem({ item, onToggle, onDelete, currentUser }) {
  const handleToggle = () => {
    onToggle(item.id, item.checked, currentUser);
  };

  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <div className={`shopping-item ${item.checked ? 'checked' : ''}`}>
      <div className="item-content" onClick={handleToggle}>
        <div className="checkbox">
          {item.checked ? (
            <span className="check-icon">✓</span>
          ) : (
            <span className="empty-circle">○</span>
          )}
        </div>
        <div className="item-details">
          <span className="item-name">{item.name}</span>
          <div className="item-meta">
            <span className="added-by">von {item.addedBy}</span>
            {item.checked && item.checkedBy && (
              <span className="checked-by"> • abgehakt von {item.checkedBy}</span>
            )}
          </div>
        </div>
      </div>
      <button className="delete-btn" onClick={handleDelete} title="Löschen">
        ✕
      </button>
    </div>
  );
}
