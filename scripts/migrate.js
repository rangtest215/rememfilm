import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to read .env
const readEnv = () => {
    try {
        const envPath = path.resolve(__dirname, '../.env');
        const envContent = fs.readFileSync(envPath, 'utf-8');
        const env = {};
        envContent.split('\n').forEach(line => {
            const parts = line.split('=');
            if (parts.length >= 2) {
                env[parts[0].trim()] = parts[1].trim();
            }
        });
        return env;
    } catch (e) {
        console.warn("Could not read .env file, assuming env vars are set manually or using defaults if unsafe.");
        return {};
    }
};

const env = readEnv();

const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
    measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
};

console.log("Initializing Firebase with project:", firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper to read JSON
const readJson = (filePath) => {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8'));
};

const migrate = async () => {
    try {
        console.log("Reading data...");
        const photos = readJson('../src/data/photos.json');
        const videos = readJson('../src/data/videos.json');

        console.log(`Found ${photos.length} albums and ${videos.length} videos.`);

        // Upload Photos
        console.log("Uploading albums...");
        for (const album of photos) {
            await setDoc(doc(db, "albums", album.id), album);
            console.log(`Uploaded album: ${album.title}`);
        }

        // Upload Videos
        console.log("Uploading videos...");
        for (const video of videos) {
            await setDoc(doc(db, "videos", video.id), video);
            console.log(`Uploaded video: ${video.title}`);
        }

        console.log("Migration finished successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

migrate();
