import { Message } from "../models/Message";

const DATABASE_NAME = 'DrewsLounge';
const DATABASE_VERSION = 1;
const MESSAGE_STORE_NAME = 'messages';

export const initIndexedDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(MESSAGE_STORE_NAME)) {
                const objectStore = db.createObjectStore(MESSAGE_STORE_NAME, { keyPath: 'messageId' });
                objectStore.createIndex('conversationName', 'conversationName', { unique: false });
            }
        };

        request.onsuccess = (event: Event) => {
            console.log('Database initialized');
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event: Event) => {
            console.error('Failed to open IndexedDB', event);
            reject(event);
        };
    });
};

export const storeMessagesInIndexedDB = (messages: Message[]): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        const db = await initIndexedDB();

        const transaction = db.transaction([MESSAGE_STORE_NAME], 'readwrite');
        const objectStore = transaction.objectStore(MESSAGE_STORE_NAME);

        messages.forEach((message) => {
            objectStore.put(message);
        });

        transaction.oncomplete = () => {
            console.log('Messages stored successfully');
            resolve();
        };

        transaction.onerror = (event) => {
            console.error('Error storing messages', event);
            reject(event);
        };
    });
};

export const getMessagesFromIndexedDB = (conversationName: string): Promise<Message[]> => {
    return new Promise(async (resolve, reject) => {
        const db = await initIndexedDB();

        const transaction = db.transaction([MESSAGE_STORE_NAME], 'readonly');
        const objectStore = transaction.objectStore(MESSAGE_STORE_NAME);
        const index = objectStore.index('conversationName');

        const request = index.getAll(conversationName);

        request.onsuccess = (event) => {
            resolve((event.target as IDBRequest<Message[]>).result);
        };

        request.onerror = (event) => {
            console.error('Error retrieving messages', event);
            reject(event);
        };
    });
};

export const clearMessagesFromIndexedDB = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        const db = await initIndexedDB();

        const transaction = db.transaction([MESSAGE_STORE_NAME], 'readwrite');
        const objectStore = transaction.objectStore(MESSAGE_STORE_NAME);
        const request = objectStore.clear();

        request.onsuccess = () => {
            console.log('Messages cleared successfully');
            resolve();
        };

        request.onerror = (event) => {
            console.error('Error clearing messages', event);
            reject(event);
        };
    });
};
