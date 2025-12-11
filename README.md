# Task Manager App (Osolutions Assessment)

Hi, this is my submission for the Frontend Developer position. It's a simple but functional Task Manager built with Vue 3 and TypeScript.

## 🛠 Tech Stack used

I chose these tools to keep the project modern and type-safe:

- **Vue.js 3** (Composition API + Script Setup)
- **TypeScript** (For type safety and better interfaces)
- **Pinia** (For state management)
- **Tailwind CSS** (For styling and responsive design)
- **Axios** (To handle API requests directly, without Supabase SDK as requested)
- **Vite** (For fast building)
- **Vue Toastification** (To show nice success/error notifications)
- **Lucide Vue** (For clean and modern SVG icons)

## ✨ Features

Here is what you can do in the app:

- **View Tasks:** See all tasks in a grid layout with their images and priority.
- **Pagination:** Browse tasks page by page.
- **Filtering:** Filter tasks by category (server-side filtering).
- **CRUD Operations:**
  - **Create:** Add new tasks with validation.
  - **Update:** Edit task details.
  - **Delete:** Remove tasks with a confirmation popup.
  - **Complete:** Mark tasks as done directly from the list.
- **Status Handling:** You will see loading skeletons, error messages, or "No tasks found" states depending on the data.

## 🚀 How to Run the Project

1.  **Clone the project:**

    ```sh
    git clone <your-repo-link-here>
    cd osolutions-task-manager
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env` file in the root folder and add the API keys provided in the email:

    ```
    VITE_API_URL=...
    VITE_API_KEY=...
    ```

4.  **Run the app:**
    ```sh
    npm run dev
    ```

## 📂 Project Structure

I tried to keep the folder structure clean and organized:

- `src/services/`: Contains Axios instance and API calls (separated from stores).
- `src/stores/`: Pinia stores for Tasks and Categories.
- `src/views/`: Main pages (Home, Add, Edit, Details).
- `src/components/`: Reusable components like Navbar and Toast.
- `src/types/`: TypeScript interfaces to keep data consistent.

---

Thank you for reviewing my code!
