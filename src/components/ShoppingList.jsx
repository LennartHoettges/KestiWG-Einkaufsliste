import ShoppingItem from './ShoppingItem';
import './ShoppingList.css';

export default function ShoppingList({ items, onToggle, onDelete, currentUser }) {
  const openItems = items.filter(item => !item.checked);
  const completedItems = items.filter(item => item.checked);

  return (
    <div className="shopping-list">
      {/* Open items section */}
      <div className="items-section open-items">
        {openItems.length === 0 ? (
          <p className="empty-message">🎉 Keine offenen Items!</p>
        ) : (
          openItems.map(item => (
            <ShoppingItem
              key={item.id}
              item={item}
              onToggle={onToggle}
              onDelete={onDelete}
              currentUser={currentUser}
            />
          ))
        )}
      </div>

      {/* Separator */}
      {completedItems.length > 0 && (
        <div className="separator">
          <span>Erledigt</span>
        </div>
      )}

      {/* Completed items section */}
      {completedItems.length > 0 && (
        <div className="items-section completed-items">
          {completedItems.map(item => (
            <ShoppingItem
              key={item.id}
              item={item}
              onToggle={onToggle}
              onDelete={onDelete}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}
