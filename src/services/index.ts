import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        apikey: import.meta.env.VITE_API_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
    }, 
})


// ## Base Configuration

// ### API Base URL
// ```
// https://YOUR_PROJECT_ID.supabase.co/rest/v1/
// ```

// ### Required Headers
// ```http
// Authorization: Bearer YOUR_ANON_KEY
// apikey: YOUR_ANON_KEY
// Content-Type: application/json
// Prefer: return=representation
// ```

// ### Error Response Format
// ```json
// {
//   "code": "string",
//   "details": "string",
//   "hint": "string", 
//   "message": "string"
// }