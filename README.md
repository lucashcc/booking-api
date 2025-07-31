# 🧾 Reservation System API

This is a RESTful API built with [NestJS](https://nestjs.com/) that allows users to register, authenticate, and manage **reservations**.

The system includes:

- ✅ Full CRUD for Users and Reservations  
- 🔐 JWT-based Authentication  
- 🧠 Validation with DTOs and `class-validator`  
- 🗃️ PostgreSQL via Docker  
- ⚙️ Prisma ORM  
- 🧪 Unit-Ready Service Architecture  
- 📄 Swagger for API documentation  

---

## 🚀 Technologies Used

| Tech               | Description                              |
|--------------------|------------------------------------------|
| **NestJS**         | Node.js framework for building APIs      |
| **PostgreSQL**     | Relational database (via Docker)         |
| **Prisma ORM**     | Type-safe ORM with PostgreSQL support    |
| **JWT**            | Authentication with access token         |
| **Swagger (OpenAPI)** | API documentation & testing         |
| **Docker**         | Containerized database & services        |

---

## 🐳 Database Setup (PostgreSQL via Docker)

This project uses **PostgreSQL** inside a Docker container.

### ✅ Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 📄 `docker-compose.yml`

Included in the root folder (or create it manually):

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: my_postgres_db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: your_user
      POSTGRES_PASSWORD: your_password
      POSTGRES_DB: your_db_name
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: always

volumes:
  pgdata:
```

▶️ Run the database

docker-compose up -d


🔐 Environment Variables
Create a .env file in the root directory:

env

DATABASE_URL="postgresql://your_user:your_password@localhost:5432/your_db_name"
JWT_SECRET=your_jwt_secret_here

⚠️ Make sure .env is listed in your .gitignore file.

🔧 Running the App
1. Install dependencies
npm install

2. Run Prisma migrations
npx prisma migrate dev

3. Generate Prisma Client
npx prisma generate

4. Start the application
npm run start:dev

The app will be available at:
📍 http://localhost:3000

📄 API Documentation with Swagger
Access the Swagger UI at:

👉 http://localhost:3000/api

All routes include detailed examples and request/response schemas for easy testing.

📬 Contact
Made by Lucas Cabral — feel free to reach out with questions or suggestions!