import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "<your-api-key>",
    authDomain: "<your-auth-domain>",
    databaseURL: "<your-database-url>",
    storageBucket: "<your-storage-bucket-url>"
}

const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage(firebaseApp)
export default storage
