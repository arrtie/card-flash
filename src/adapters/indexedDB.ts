/** @format */

// check for DB
// init DB
// request all of a type of record

import { left, map, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

import { IDBPDatabase, openDB } from "idb";
import { Flashcard } from "../model";

const assertIndexedDB = () => {
  // Check for IndexedDB support:
  return "indexedDB" in window;
};

interface DatabaseAndStore {
  databaseName: string;
  storeName: string;
}

async function createOrGetStoreInDB({
  databaseName,
  storeName,
}: DatabaseAndStore) {
  return openDB(databaseName, 1, {
    upgrade(db) {
      console.log("attempting to create a new object store...");
      // Checks if the object store exists:
      if (!db.objectStoreNames.contains(storeName)) {
        // If the object store does not exist, create it:
        db.createObjectStore(storeName, { autoIncrement: true });
        console.log("object store created");
      } else {
        console.log("object store already exists");
      }
    },
  });
}

const STORE_NAME = "flashcards";

const insertDatabaseDetails = (
  cb: (props: DatabaseAndStore) => Promise<IDBPDatabase<unknown>>
) => {
  const DATABASE_NAME = "default";
  return cb({ databaseName: DATABASE_NAME, storeName: STORE_NAME });
};

const openFlashcardDB = () => {
  return pipe(
    assertIndexedDB(),
    (supportsIDB) =>
      supportsIDB
        ? right(createOrGetStoreInDB)
        : left(new Error("no indexedDB support")),
    map(insertDatabaseDetails)
  );
};

export const createFlashcard = (flashcard: Flashcard) => {
  return pipe(
    openFlashcardDB(),
    map(async (dbPromise) => {
      const tx = (await dbPromise).transaction(STORE_NAME, "readwrite");
      tx.store.add({ ...flashcard, created: new Date().getTime() });
      return tx.done;
    })
  );
};

export const getAllFlashcards = () => {
  return pipe(
    openFlashcardDB(),
    map(async (dbPromise) => (await dbPromise).getAll(STORE_NAME))
  );
};
