# Edupyramids - College Site
---

````markdown
# Edupyramids College

Django REST API + React frontend for Edupyramids College project.

---

## Requirements

- **Python**: 3.12  
- **Django**: 5.2.5 (see `backend/requirements.txt`)  
- **Node.js**: v20.19.2  
- **npm**: (bundled with Node)  
- **React**: ^19.1.1  

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Spoken-tutorial/Edupyramids-College.git
cd Edupyramids-College
````

---

### 2. Backend (Django + DRF)

```bash
cd backend

# create & activate virtualenv
python -m venv .venv
source .venv/bin/activate       # Linux / macOS
# .venv\Scripts\activate        # Windows PowerShell

# install dependencies
pip install -r requirements.txt

# copy env file
cp .env.example .env

# run migrations
python manage.py migrate --settings=config.settings.dev

# start server
python manage.py runserver --settings=config.settings.dev
```

Backend runs at:
👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)
Health check: [http://127.0.0.1:8000/api/health/](http://127.0.0.1:8000/api/health/)

---

### 3. Frontend (React + Vite)

```bash
cd frontend

# install dependencies
npm install

# start dev server
npm run dev
```

Frontend runs at:
👉 [http://localhost:5173](http://localhost:5173)

---

## Folder Structure

```
Edupyramids-College/
├── backend/       # Django + DRF API
│   ├── config/    # settings, urls, wsgi
│   ├── apps/      # local apps
│   └── manage.py
├── frontend/      # React + Vite app
│   ├── src/       # components, pages
│   └── vite.config.js
├── .editorconfig
├── .gitignore
└── README.md
```

---

## Notes

* Use **Python 3.12** and **Node 20.x** for consistent results.
* Virtualenv (`.venv/`) and `node_modules/` are ignored in git.
* For production, update `prod.py` settings and environment variables.

```

---
```

