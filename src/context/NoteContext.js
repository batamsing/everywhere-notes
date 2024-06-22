import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../component/firebase/firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Creating the context
const NoteContext = createContext();

// Creating the provider component
export const NoteProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const [isUpdating, setIsUpdating] = useState(false);



  const fetchUserData = async (user) => {
    setIsFetching(true);
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        //await setIsuser(true);
        console.log("setting is user to true");
        // fetch user data
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists) {
            setUserDetails(docSnap.data());
            console.log("user data fetching completed");

            await fetchNotes();
          }
        } catch (error) {
          setError("Failed to fetch user data");
          console.error("Error fetching user data: ", error);
        } finally {
          setIsFetching(false);
          console.log("user data fetching completed");
        }
      } else {
        setIsFetching(false);
        console.log("setting is user to false");
      }
    });
    
  };

  // const fetchUserData = async () => {
  //   setIsFetching(true);
  //   if (isUser) {
  //   }

  //   auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       try {
  //         const docRef = doc(db, "Users", user.uid);
  //         const docSnap = await getDoc(docRef);
  //         if (docSnap.exists) {
  //           setUserDetails(docSnap.data());
  //         }
  //         await fetchNotes();
  //       } catch (error) {
  //         setError("Failed to fetch user data");
  //         console.error("Error fetching user data: ", error);
  //       } finally {
  //         setIsFetching(false);
  //       }
  //     } else {
  //       window.location.href = "/";
  //     }
  //   });
  // };

  const fetchNotes = async () => {
    if (!auth.currentUser) {
      alert("Please sign in first");
      return;
    }

    const userId = auth.currentUser.uid;
    const notesCollection = collection(db, "Users", userId, "notes");

    try {
      const notesSnapshot = await getDocs(notesCollection);
      const notesList = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesList);
      
    } catch (error) {
      console.error("Error fetching notes: ", error);
    }
    setIsFetching(false);
    console.log("notes fetching completed");
  };

  //   if (isUser) {
  //     const userId = auth.currentUser.uid;
  //     const notesCollection = collection(db, "Users", userId, "notes");

  //     try {
  //       const notesSnapshot = await getDocs(notesCollection);
  //       const notesList = notesSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setNotes(notesList);
  //       console.log("notes fetching completed");
  //     } catch (error) {
  //       console.error("Error fetching notes: ", error);
  //     }
  //   } else {
  //     console.log("No user found");
  //     console.log("no notes can be fetched");
  //   }
  // };

  // if (!auth.currentUser) {
  //   alert("Please sign in first");
  //   return;
  // }

  // const userId = auth.currentUser.uid;
  // const notesCollection = collection(db, "Users", userId, "notes");

  // try {
  //   const notesSnapshot = await getDocs(notesCollection);
  //   const notesList = notesSnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   setNotes(notesList);
  // } catch (error) {
  //   console.error("Error fetching notes: ", error);
  // }
  //   console.log("notes fetching completed");
  // };

  useEffect(() => {
    fetchUserData();
  }, []);

  const addNote = async () => {
    if (!auth.currentUser) {
      alert("Please sign in first");
      window.location.href = "/login";
      return;
    }

    const userId = auth.currentUser.uid;
    const newNote = {
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    try {
      const docRef = await addDoc(
        collection(db, "Users", userId, "notes"),
        newNote
      );
      const id = docRef.id;
      const noteWithFirestoreId = { ...newNote, id };
      setNotes([noteWithFirestoreId, ...notes]);
    } catch (error) {
      console.error("Error adding note: ", error);
    }
  };

  const deleteNote = async (noteId) => {
    if (!auth.currentUser) {
      alert("Please sign in first");
      return;
    }

    const userId = auth.currentUser.uid;
    const noteRef = doc(db, "Users", userId, "notes", noteId);

    try {
      await deleteDoc(noteRef);
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
      setActiveNote(null);
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };



  const onUpdateNote = async (updatedNote) => {
    if (!auth.currentUser) {
      alert("Please sign in first");
      return;
    }

    setIsUpdating(true);
    console.log("note's updating");
    const userId = auth.currentUser.uid;
    const noteRef = doc(db, "Users", userId, "notes", updatedNote.id);

    try {
      await updateDoc(noteRef, updatedNote);
      const updatedNotes = notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
      setNotes(updatedNotes);
      setActiveNote(updatedNote); // Re-render the active note
    } catch (error) {
      console.error("Error updating note: ", error);
    } finally {
      setIsUpdating(false);
      console.log("update complete");
    }
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote?.id);
  };

  async function handleLogOut() {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (e) {
      console.log("Can't Log out: ", e.message);
    }
  }

  return (
    <NoteContext.Provider
      value={{
        isFetching,
        getActiveNote,
        fetchNotes,
        handleLogOut,
        userDetails,
        notes,
        setNotes,
        activeNote,
        setActiveNote,
        addNote,
        onUpdateNote,
        deleteNote,
        isUpdating
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;