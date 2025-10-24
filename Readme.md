# 🌐 Explorify - Travel Wiki

![React](https://img.shields.io/badge/frontend-React-blue)
![Node.js](https://img.shields.io/badge/backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/database-MongoDB-brightgreen)

A web platform that allows users to **create, edit, and delete articles**, manage your profile and earn **medals** for their achievements.

The project includes **JWT authentication**, **Complete CRUD for articles**, **dynamic achievement system** and a **modern frontend in React**.

## 🚀 Technologies Used

### 🖥️ Frontend

- **React** with Hooks
- **React Router DOM**
- **Axios** for HTTP requests
- **React Quill** as a rich text editor
- **CSS Modules / Custom Styles**

### ⚙️ Backend

- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **JWT (jsonwebtoken)** for authentication
- **bcryptjs** to encrypt passwords
- **dotenv** for environment variables
- **CORS** for secure communication between client and server

---

## 📂 Project Structure

### 🧩 Backend (`/backend`)

```bash
📁 backend/
┣ 📁 config/
┣ 📁 controllers/
┣ 📁 models/
┣ 📁 middlewares/
┣ 📁 routes/
┣ 📁 utils/
┣ 📄 .env
┣ 📄 server.js
┣ 📄 package-lock.json
┗ 📄 package.json
```

### 💻 Frontend (`/frontend`)

```bash
📁 frontend/
┣ 📁 public/
┣ 📁 src/
┃ ┣ 📁 api/
┃ ┣ 📁 components/
┃ ┣ 📁 pages/
┃ ┣ 📁 routes/
┃ ┣ 📁 styles/
┃ ┃ ┣ 📁components/
┃ ┃ ┣ 📁 pages/
┃ ┣ 📄 App.css
┃ ┣ 📄 App.jsx
┃ ┣ 📄 index.css
┃ ┗ 📄 main.jsx
┃ 📄 index.html
┃ 📄 package-lock.json
┃ 📄 package.json
┗ 📄 vite.config.js
```

---

## 🔐 Authentication

Authentication is handled with **JWT (JSON Web Token)**:

1. The user registers or logs in.
2. The server generates a token signed with `process.env.JWT_SECRET`.
3. Protected routes use the `protect` middleware to validate the token.
4. The token is stored in `sessionStorage` on the frontend.

---

## 💻 Key Features

### 👥 Users

- Registration and login with password encryption.
- Profile editing.
- Account deletion (requires authentication).
- Password recovery (pending implementation).

### 🏅 Medals

- Dynamic achievement system that displays the **medals earned by the user**.
- Medals are stored in the user model (`User.js`).
- They are displayed in the user profile sorted by date (most recent at the top).

### 📰 Articles

- Create, edit, delete, and list articles.
- Each article contains:
  - Title
  - Content (HTML from Quill)
  - Tags
  - Creation date
  - Author
- Only the author can edit or delete their articles.

### 🧾 Tags

- Can be added and edited from the article modal.
- Multiple tags separated by commas.
- Allows filtering or searching articles by tag.

---

## 🛠️ Installation and Configuration

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ErickSR1601/Explorify.git
cd Explorify
```

### 2️⃣ Configure the Backend

```bash
cd backend
npm install
```

> ⚠️ Configure the `.env` file with your environment variables.

### 3️⃣ Start the server

```bash
npm run dev
```

### 4️⃣ Configure the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:
👉 <http://localhost:5173>  
and the backend at:
👉 <http://localhost:5000>

---

## 🧱 API Endpoints

### 👤 User

| Method   | Route                        | Description                                                   |
| -------- | ---------------------------- | ------------------------------------------------------------- |
| `POST`   | `/api/users/register`        | Create new user                                               |
| `POST`   | `/api/users/login`           | Log in and obtain token                                       |
| `GET`    | `/api/users/profile`         | Get authenticated user profile                                |
| `DELETE` | `/api/users/delete`          | Delete logged-in user account                                 |
| `PUT`    | `/api/users/forgot-password` | Password change (Forgotten password)                          |
| `PUT`    | `/api/users/change-password` | Password change (User wishes to change password)              |

### 📰 Articles

| Method   | Route                  | Description                             |
| -------- | ---------------------- | --------------------------------------- |
| `GET`    | `/api/articles`        | List all items                          |
| `POST`   | `/api/articles`        | Create new article                      |
| `PUT`    | `/api/articles/:id`    | Edit an article (single author)         |
| `DELETE` | `/api/articles/:id`    | Delete article (author only)            |
| `GET`    | `/api/articles/search` | Search articles by title or tags        |

---

## 🎨 User Interface

### 👤 User Profile

- Displays name, email address, and registration date.
- List of published articles.
- Section showing medals earned.
- Action buttons: change password, log out, delete account, return to home page.

### 📰 Article Editor

- **React Quill** editor with basic tools (bold, italics, lists, links, and titles).
- Field for editing tags.
- Modal with buttons to save or cancel.

---

## ⚡ NPM scripts

### Backend

```bash
npm run dev        # Run with nodemon
npm start          # Run production version
```

### Frontend

```bash
npm run dev        # Start in development mode
npm run build      # Generate production build
npm run preview    # Preview build
```

---

## ✨ Autor

**Erick Solis R.**  
📧 dev.ericksr.16@gmail.com  
💼 [LinkedIn](https://www.linkedin.com/in/ericksolisrojas/)  
📸 [Instagram](https://www.instagram.com/ericksr___/)

---

> 💡 “Exceed expectations and deliver exceptional results.”
> — _Erick Solis R._
