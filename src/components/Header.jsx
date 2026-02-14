import './Header.css';

export default function Header({ currentUser, onChangeUser }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>
          <span className="emoji">🛒</span> WG Einkaufsliste
        </h1>
        {currentUser && (
          <div className="user-info">
            <span className="current-user">Hallo, {currentUser}!</span>
            <button className="change-user-btn" onClick={onChangeUser}>
              Wechseln
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
