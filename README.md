# Earth Care App — Environmental Sustainability Platform

A complete full-stack web application for environmental awareness and sustainability built with Java 21, Spring Boot 3, React 18, and MySQL 8.

## 🌍 Project Overview

Earth Care App is a gamified environmental sustainability platform where users complete daily eco-friendly tasks, earn rewards, plant trees, report pollution, join challenges, and engage with a community forum. The application includes role-based admin dashboard for content management and analytics.

### Key Features

✅ **User Authentication** — JWT-based auth with email verification, forgot/reset password  
✅ **Daily Tasks** — 9 environmental tasks with automatic reward/badge system  
✅ **Rewards System** — Points, Green Coins, XP, badges, leaderboard, streak tracking  
✅ **Gamification** — 5-tier badge system (Bronze → Earth Hero), levels, achievements  
✅ **Tree Plantation** — Submit tree photos with admin approval & rewards  
✅ **Waste Management** — Report garbage locations with photos & severity  
✅ **Eco Challenges** — Weekly & monthly challenges with bonus rewards  
✅ **Pollution Tracking** — Time-series charts for air, water, plastic pollution  
✅ **Environmental Events** — Browse and register for eco events  
✅ **Eco News** — Searchable, paginated news feed with categories  
✅ **Community Forum** — Create posts, comment, like, share ideas  
✅ **User Dashboard** — Personal stats, analytics, notifications  
✅ **Admin Dashboard** — Full CRUD for all content, analytics, user management  
✅ **Dark Mode** — Toggle dark/light theme with persistence  
✅ **Responsive Design** — Mobile-first green-themed UI  

---

## 🏗️ Technology Stack

### Backend
- **Runtime**: Java 21
- **Framework**: Spring Boot 3.2
- **Security**: Spring Security 6 + JWT (jjwt 0.12)
- **ORM**: Spring Data JPA / Hibernate 6
- **Database**: MySQL 8.0
- **Build**: Maven 3.9
- **API Docs**: SpringDoc OpenAPI 3 / Swagger UI
- **Utilities**: Lombok, MapStruct

### Frontend
- **Framework**: React 18 + Vite 5
- **Routing**: React Router v6
- **State**: React Context API
- **HTTP**: Axios 1.x with JWT interceptors
- **Styling**: Tailwind CSS 3 with custom green theme
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Forms**: React Hook Form + Zod validation

### Database
- **MySQL 8.0** with 23 tables:
  - Users, Roles, User_Roles
  - Tasks, User_Tasks
  - Rewards, RewardRedemptions, Badges, User_Badges
  - TreePlantation, GarbageReports
  - Challenges, UserChallenges
  - Events, Registrations
  - News, Posts, Comments, Post_Likes
  - Notifications, PollutionData, Contacts

---

## 📋 Prerequisites

- **Java**: JDK 21+ ([download](https://www.oracle.com/java/technologies/downloads/#java21))
- **Node.js**: v20+ ([download](https://nodejs.org/))
- **Maven**: 3.9+ ([download](https://maven.apache.org/download.cgi))
- **MySQL**: 8.0+ ([download](https://dev.mysql.com/downloads/mysql/))
- **Git**: Latest version

---

## 🚀 Quick Start Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd earth-care-app
```

### 2. Database Setup

**Start MySQL server** and create database:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE IF NOT EXISTS earthcare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE earthcare_db;
```

Exit MySQL and run the SQL init script:

```bash
mysql -u root -p earthcare_db < backend/src/main/resources/db/init.sql
```

This creates all 23 tables and inserts sample data.

### 3. Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Configure database credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/earthcare_db
spring.datasource.username=root
spring.datasource.password=<your-mysql-password>
```

Build and run the backend:

```bash
mvn clean install
mvn spring-boot:run
```

Backend will start at **http://localhost:8080**

Swagger UI available at **http://localhost:8080/swagger-ui.html**

### 4. Frontend Setup

In a new terminal, navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file with:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Start development server:

```bash
npm run dev
```

Frontend will start at **http://localhost:5173**

---

## 📝 Environment Variables

### Backend (.properties)

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/earthcare_db
spring.datasource.username=root
spring.datasource.password=root

# JWT
app.jwt.secret=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
app.jwt.access-token-expiration=900000  # 15 minutes in ms
app.jwt.refresh-token-expiration=604800000  # 7 days in ms

# File Upload
spring.servlet.multipart.max-file-size=5MB
app.file.upload-dir=uploads

# Email (configure for production)
spring.mail.host=smtp.gmail.com
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password

# Frontend URL (for email links and CORS)
app.frontend.url=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## 👥 Default Credentials

After database initialization, login with:

**Admin Account**
- Email/Username: `admin` / `admin@earthcare.com`
- Password: `Password@123`

**Test Users**
- arjun / arjun@example.com — 1200 points
- priya / priya@example.com — 800 points
- rahul / rahul@example.com — 450 points
- sneha / sneha@example.com — 200 points

All passwords: `Password@123`

---

## 🔌 API Endpoints

### Public Endpoints
```
POST   /api/v1/auth/register              — User registration
POST   /api/v1/auth/login                 — User login
GET    /api/v1/auth/verify?token=...      — Email verification
POST   /api/v1/auth/forgot-password       — Request password reset
POST   /api/v1/auth/reset-password        — Reset password
GET    /api/v1/news                       — Paginated news feed
GET    /api/v1/events                     — Upcoming events
POST   /api/v1/contact                    — Contact form submission
GET    /uploads/**                        — Serve uploaded images
```

### Protected User Endpoints
```
GET    /api/v1/dashboard/stats            — User dashboard stats
GET    /api/v1/tasks                      — Available daily tasks
POST   /api/v1/tasks/{id}/complete        — Complete a task
GET    /api/v1/rewards                    — Rewards store
POST   /api/v1/rewards/{id}/redeem        — Redeem a reward
GET    /api/v1/rewards/stats              — User reward stats
GET    /api/v1/rewards/leaderboard        — Leaderboard
POST   /api/v1/tree                       — Submit tree plantation
GET    /api/v1/tree/my                    — My tree submissions
POST   /api/v1/waste                      — Submit waste report
GET    /api/v1/waste/my                   — My waste reports
GET    /api/v1/challenges                 — Active challenges
POST   /api/v1/challenges/{id}/join       — Join challenge
GET    /api/v1/pollution                  — Pollution data (with filters)
GET    /api/v1/events/my                  — My registered events
POST   /api/v1/events/{id}/register       — Register for event
GET    /api/v1/forum/posts                — Forum posts (paginated)
POST   /api/v1/forum/posts                — Create post
POST   /api/v1/forum/posts/{id}/comments  — Add comment
POST   /api/v1/forum/posts/{id}/like      — Like post
GET    /api/v1/notifications              — User notifications
PUT    /api/v1/notifications/{id}/read    — Mark notification as read
PUT    /api/v1/auth/profile               — Update profile
PUT    /api/v1/auth/change-password       — Change password
```

### Admin Endpoints
```
GET    /api/v1/admin/stats                — Platform statistics
GET    /api/v1/admin/users                — Search users
PUT    /api/v1/admin/users/{id}/role      — Update user role
GET    /api/v1/admin/news                 — Manage news
POST   /api/v1/admin/news                 — Create news
PUT    /api/v1/admin/news/{id}            — Update news
DELETE /api/v1/admin/news/{id}            — Delete news
GET    /api/v1/admin/tree-approvals       — Pending tree approvals
PUT    /api/v1/admin/tree-approvals/{id}/approve  — Approve tree
PUT    /api/v1/admin/tree-approvals/{id}/reject   — Reject tree
GET    /api/v1/admin/waste-reports        — All waste reports
PUT    /api/v1/admin/waste-reports/{id}/resolve   — Resolve report
GET    /api/v1/admin/challenges           — Manage challenges
POST   /api/v1/admin/challenges           — Create challenge
PUT    /api/v1/admin/challenges/{id}      — Update challenge
DELETE /api/v1/admin/challenges/{id}      — Delete challenge
GET    /api/v1/admin/events               — Manage events
POST   /api/v1/admin/events               — Create event
PUT    /api/v1/admin/events/{id}          — Update event
DELETE /api/v1/admin/events/{id}          — Delete event
GET    /api/v1/admin/pollution            — Manage pollution data
POST   /api/v1/admin/pollution            — Add pollution entry
PUT    /api/v1/admin/pollution/{id}       — Update entry
DELETE /api/v1/admin/pollution/{id}       — Delete entry
GET    /api/v1/admin/contacts             — All contact submissions
POST   /api/v1/admin/notifications/broadcast  — Broadcast notification

GET    /swagger-ui.html                   — Full Swagger UI documentation
```

---

## 📁 Project Structure

```
earth-care-app/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/earthcare/
│       │   ├── EarthCareApplication.java
│       │   ├── config/          (Spring, Security, OpenAPI config)
│       │   ├── security/        (JWT, UserDetails)
│       │   ├── entity/          (21 JPA entities)
│       │   ├── repository/      (Spring Data JPA interfaces)
│       │   ├── service/         (Business logic interfaces)
│       │   ├── service/impl/    (Service implementations)
│       │   ├── controller/      (REST API controllers)
│       │   ├── dto/             (Request/Response DTOs)
│       │   ├── exception/       (Custom exceptions + handler)
│       │   └── util/            (Email, file storage, rewards calc)
│       └── resources/
│           ├── application.properties
│           └── db/init.sql      (23 tables + sample data)
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env
│   └── src/
│       ├── main.jsx
│       ├── App.jsx              (Router setup)
│       ├── index.css            (Tailwind + custom CSS)
│       ├── context/             (Auth, Theme contexts)
│       ├── hooks/               (useAuth, useNotifications, usePagination)
│       ├── services/            (Axios services)
│       ├── components/
│       │   ├── common/          (Navbar, Footer, ProtectedRoute, etc.)
│       │   ├── home/            (HeroSection, Stats, Mission, Quotes)
│       │   ├── tasks/           (TaskCard, TaskProgressBar)
│       │   ├── rewards/         (RewardCard, BadgeGrid, Leaderboard)
│       │   ├── forum/           (PostCard, CommentList)
│       │   └── charts/          (TaskTrendChart, PollutionChart)
│       └── pages/
│           ├── public/          (Home, Login, Register, News, Events, etc.)
│           ├── user/            (Dashboard, Tasks, Rewards, Tree, Waste, etc.)
│           └── admin/           (AdminDashboard, Users, News, Events, etc.)
├── README.md (this file)
├── .gitignore
└── [documentation & diagrams] (ER, Use Case, Class, Sequence, DFD, Architecture)
```

---

## 🔐 Security Features

- **JWT Authentication**: 15-minute access tokens + 7-day refresh tokens
- **Password Encryption**: BCrypt with salt
- **Role-Based Access Control**: ROLE_USER, ROLE_ADMIN
- **Email Verification**: UUID tokens with 24-hour expiry
- **Password Reset**: Secure token-based reset with 1-hour expiry
- **CSRF Protection**: Disableeature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a Pull Request

---

## 📄 License

This project is open source under the MIT License.

---

## 👨‍💻 Author

**Earth Care Team** — Building a greener future, one task at a time.

For issues, questions, or contributions, please open an issue or contact the development team.

---

**Happy coding! 🌱 Let's make Earth green again!**
ect_Report.pdf`

---

## 🤝 Contributing

1. Create a fs frontend URL
- Check browser console for specific origin rejection

---

## 📚 Documentation

- **API Docs**: http://localhost:8080/swagger-ui.html
- **ER Diagram**: `docs/ER_Diagram.png`
- **Use Case Diagram**: `docs/UseCase_Diagram.png`
- **Class Diagram**: `docs/Class_Diagram.png`
- **Sequence Diagrams**: `docs/Sequence_Diagrams.png`
- **Architecture Diagram**: `docs/Architecture_Diagram.png`
- **DFD Level 0**: `docs/DFD_Level_0.png`
- **DFD Level 1**: `docs/DFD_Level_1.png`
- **Project Report**: `docs/Proje is image (jpeg/png/webp)

**CORS Errors**
- Ensure backend CORS config includeure MySQL server is running: `mysql -u root -p`
- Check credentials in `application.properties`
- Verify database exists: `SHOW DATABASES;`

**Port Already in Use**
- Backend (8080): `lsof -i :8080` then `kill -9 <PID>`
- Frontend (5173): `lsof -i :5173` then `kill -9 <PID>`

**JWT Token Issues**
- Clear browser localStorage: `localStorage.clear()`
- Ensure secret matches in `application.properties`

**File Upload Issues**
- Create `uploads/` directory in project root
- Check file size ≤5 MB
- Verify MIME typost_id+user_id)

Indexes on frequently queried columns (email, username, user_id, status, etc.)

---

## 🧪 Testing

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

---

## 📦 Build for Production

### Backend
```bash
cd backend
mvn clean package -DskipTests
java -jar target/earth-care-app-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
# Output in dist/ — serve with Nginx or similar
```

---

## 🐛 Troubleshooting

**MySQL Connection Error**
- Ensost_Likes**
- Post has Many comments (cascade delete)
- Post has Many likes (cascade delete, unique constraint on peReports, Posts, Comments, etc.

**Tasks & User_Tasks**
- Each User_Tasks marks a unique completion of a Task on a date
- Unique constraint on (user_id, task_id, completed_date)

**Rewards & RewardRedemptions**
- Ledger-style table tracking all reward transactions
- Supports task rewards, challenge bonuses, and redemptions

**Challenges & UserChallenges**
- User_Challenges tracks join date, completion status, and deadline expiry
- @Scheduled job marks IN_PROGRESS as EXPIRED post-deadline

**Posts, Comments, Plantation, Garbagd for stateless API
- **CORS**: Configured for localhost:5173
- **Token Refresh**: Silent refresh on 401 via interceptor
- **File Upload Validation**: MIME type + size checks
- **SQL Injection Prevention**: Parameterized queries via JPA

---

## 📊 Database Schema

### Key Tables & Relationships

**Users** — Central entity
- 1-to-Many with Tasks (via User_Tasks)
- 1-to-Many with Rewards (via Reward_Redemptions)
- 1-to-Many with Badges (via User_Badges)
- Many-to-Many with Roles (via User_Roles)
- 1-to-Many with TreeP