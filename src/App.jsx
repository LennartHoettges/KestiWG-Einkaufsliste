import { useState, useEffect } from 'react';
import Header from './components/Header';
import UserSelect from './components/UserSelect';
import ShoppingList from './components/ShoppingList';
import AddItem from './components/AddItem';
import { useShoppingList } from './hooks/useShoppingList';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const { items, loading, error, addItem, toggleItem, deleteItem } = useShoppingList();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('wg-user');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  // Handle user selection
  const handleUserSelect = (userName) => {
    localStorage.setItem('wg-user', userName);
    setCurrentUser(userName);
  };

  // Handle user change
  const handleChangeUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('wg-user');
  };

  // Show user selection if no user is selected
  if (!currentUser) {
    return <UserSelect onUserSelect={handleUserSelect} />;
  }

  return (
    <div className="app">
      <Header currentUser={currentUser} onChangeUser={handleChangeUser} />
      
      <main className="main-content">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Lade Einkaufsliste...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>⚠️ Fehler beim Laden: {error}</p>
            <p className="error-hint">
              Bitte überprüfe deine Firebase-Konfiguration in der .env Datei.
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            <ShoppingList
              items={items}
              onToggle={toggleItem}
              onDelete={deleteItem}
              currentUser={currentUser}
            />
            <AddItem onAdd={addItem} currentUser={currentUser} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
