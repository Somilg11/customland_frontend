# Homepage CMS Admin Panel

This project is a full-stack **Homepage CMS Admin Panel** that allows for dynamic management of content sections like Hero, About, Logos, and Footer. It includes a drag-and-drop interface for reordering sections, CRUD functionality, and a user-facing homepage.

---

## 🧱 Tech Stack

### Frontend
- [Next.js 14 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/) for styled components
- [dnd-kit](https://dndkit.com/) for drag-and-drop reordering
- [axios](https://axios-http.com/) for HTTP requests
- [lucide-react](https://lucide.dev/) icons
- [react-hot-toast](https://react-hot-toast.com/) for notifications

### Backend
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)

---

## 📁 Folder Structure

```
.
├── app
│   ├── admin
│   │   ├── page.tsx              # Admin dashboard
│   │   └── components
│   │       ├── SectionCard.tsx  # Draggable card component
│   │       ├── DragHandle.tsx   # Drag handle
│   │       └── SectionTypeBadge.tsx
│   ├── page.tsx                 # User-facing homepage
│   └── components
│       └── Section.tsx          # Render section based on type
├── components/ui                # ShadCN components
├── server
│   ├── controllers
│   │   └── sectionController.ts
│   ├── models
│   │   └── Section.ts
│   └── routes
│       └── sectionRoutes.ts
├── .env
├── README.md
└── ...
```

---

## 🧩 Features

### ✅ Admin Panel
- Create, edit, and delete homepage sections
- Drag and drop reordering
- Persist section order in MongoDB

### ✅ Homepage
- Dynamically renders content sections in the saved order

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/homepage-cms
cd homepage-cms
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Configure Environment
Create a `.env` file in the root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGO_URI=mongodb://localhost:27017/homepagecms
PORT=5000
```

### 4. Start Backend
```bash
cd server
npm run dev
```

### 5. Start Frontend
```bash
cd app
npm run dev
```

---

## 🛠 Drag-and-Drop Details
- `useSortable` from `@dnd-kit/sortable` is used on each `SectionCard`.
- `DndContext` and `SortableContext` wrap the card list.
- Order changes are sent to the backend with `/api/sections/reorder`.

---

## 🧪 API Endpoints

### `/api/sections`
- `GET` – Get all sections ordered
- `POST` – Create a section

### `/api/sections/:id`
- `GET` – Get a section by ID
- `PUT` – Update section content/type
- `DELETE` – Delete a section

### `/api/sections/reorder`
- `POST` – Update order of all sections
---

## 📸 Screenshots
<image src="./public/image.png" alt="admin_panel">

---

## 📄 License
This project is licensed under the MIT License.

