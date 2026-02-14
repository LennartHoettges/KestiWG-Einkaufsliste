import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Custom hook for managing shopping list with real-time Firestore sync
export const useShoppingList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reference to the items collection
  const itemsCollectionRef = collection(db, 'wg-lists', 'einkaufsliste', 'items');

  // Real-time listener for items
  useEffect(() => {
    const q = query(itemsCollectionRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const itemsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(itemsData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching items:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Add new item
  const addItem = async (name, addedBy) => {
    try {
      await addDoc(itemsCollectionRef, {
        name,
        checked: false,
        addedBy,
        checkedBy: null,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error adding item:', err);
      setError(err.message);
    }
  };

  // Toggle item checked status
  const toggleItem = async (itemId, currentChecked, userName) => {
    try {
      const itemRef = doc(db, 'wg-lists', 'einkaufsliste', 'items', itemId);
      await updateDoc(itemRef, {
        checked: !currentChecked,
        checkedBy: !currentChecked ? userName : null
      });
    } catch (err) {
      console.error('Error toggling item:', err);
      setError(err.message);
    }
  };

  // Delete item
  const deleteItem = async (itemId) => {
    try {
      const itemRef = doc(db, 'wg-lists', 'einkaufsliste', 'items', itemId);
      await deleteDoc(itemRef);
    } catch (err) {
      console.error('Error deleting item:', err);
      setError(err.message);
    }
  };

  return {
    items,
    loading,
    error,
    addItem,
    toggleItem,
    deleteItem
  };
};
