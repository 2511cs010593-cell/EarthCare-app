# 🚀 How to Run Earth Care App

Complete step-by-step guide to run the application locally.

---

## 📋 Prerequisites

Install these before starting:

### 1. Java 21
- **Download**: https://www.oracle.com/java/technologies/downloads/#java21
- **Verify**:
```bash
java -version
```
Should show: `java 21.x.x`

### 2. Maven 3.9+
- **Download**: https://maven.apache.org/download.cgi
- **Verify**:
```bash
mvn -version
```
Should show: `Apache Maven 3.9.x`

### 3. MySQL 8.0+
- **Download**: https://dev.mysql.com/downloads/mysql/
- **Verify**:
```bash
mysql --version
```
Should show: `mysql Ver 8.x.x`

### 4. Node.js 20+ & npm
- **Download**: https://nodejs.org/
- **Verify**:
```bash
node -version
npm -version
```

### 5. Git
- **Download**: https://git-scm.com/

---

## ⚙️ Step 1: Database Setup (MySQL)

### Start MySQL Server

**Windows (Command Prompt as Admin):**
```bash
# If MySQL installed as service, it auto-starts
# Or manually start:
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld"
```

**macOS:**
```bash
brew services start mysql
# Or
mysql.server start
```

**Linux:**
```bash
sudo systemctl start mysql
# Or
sudo service mysql start
```

### Verify MySQL is Running

```bash
mysql -u root -p
```

Enter password (if set during installation). You should see:
```
mysql>
```

Type `exit` to quit.

### Create Database

Open terminal/command prompt:

```bash
mysql -u root -p
```

Enter your MySQL root password. Then run:

```sql
CREATE DATABASE IF NOT EXISTS earthcare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### Load Sample Data

Run the SQL init script:

```bash
mysql -u root -p earthcare_db < backend/src/main/resources/db/init.sql
```

Enter your MySQL password. Wait for completion (~5-10 seconds).

**Verify:** Open MySQL again:
```bash
mysql -u root -p earthcare_db
SHOW TABLES;
```

You should see 23 tables (users, roles, tasks, rewards, etc.)

---

## 🔧 Step 2: Backend Setup (Spring Boot)

### Navigate to Backend

```bash
cd backend
```

### Update Database Credentials

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/earthcare_db
spring.datasource.username=root
spring.datasource.password=<YOUR_MYSQL_PASSWORD>
```

Replace `<YOUR_MYSQL_PASSWORD>` with your actual MySQL root password.

### Build Backend

```bash
mvn clean install
```

This downloads all dependencies (~300MB) and compiles the code. Takes 2-5 minutes first time.

### Run Backend

```bash
mvn spring-boot:run
```

**Wait for these messages:**
```
INFO 12345 --- [main] com.earthcare.EarthCareApplication : 
    Starting EarthCareApplication using Java 21.x.x
...
INFO 12345 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer : 
    Tomcat started on port(s): 8080 (http)
INFO 12345 --- [main] com.earthcare.EarthCareApplication : 
    Started EarthCareApplication in X.XXX seconds
```

✅ Backend is running at **http://localhost:8080**

### Test Backend

Open browser: http://localhost:8080/swagger-ui.html

You should see Swagger API documentation with all endpoints.

**Leave this terminal running!** Keep backend process active.

---

## 💻 Step 3: Frontend Setup (React + Vite)

### Open New Terminal/Command Prompt

(Keep backend terminal running in background)

### Navigate to Frontend

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

This downloads all npm packages (~500MB). Takes 1-3 minutes.

### Start Frontend Dev Server

```bash
npm run dev
```

**Wait for these messages:**
```
  VITE v5.0.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

✅ Frontend is running at **http://localhost:5173**

**Browser will auto-open.** If not, open manually: http://localhost:5173

---

## ✅ Verify Everything Works

### Test Login

1. Go to http://localhost:5173
2. Click "Get Started" or "Login"
3. Use demo credentials:
   - **Email:** admin@earthcare.com
   - **Password:** Password@123
4. Click "Login"
5. Should redirect to dashboard showing stats

### Test API

1. Open http://localhost:8080/swagger-ui.html
2. Expand "Auth Controller"
3. Click "POST /api/v1/auth/login"
4. Click "Try it out"
5. Enter JSON:
```json
{
  "usernameOrEmail": "admin",
  "password": "Password@123"
}
```
6. Click "Execute"
7. Should return JWT token

---

## 🎯 Access Points

Once running, access the app at:

| Component | URL | Purpose |
|-----------|-----|---------|
| Frontend | http://localhost:5173 | Web app interface |
| Backend | http://localhost:8080 | REST API server |
| Swagger UI | http://localhost:8080/swagger-ui.html | API documentation |
| MySQL | localhost:3306 | Database (use MySQL client) |

---

## 🧪 Test Users

After database initialization, you have these accounts:

### Admin Account
- Email: `admin@earthcare.com`
- Username: `admin`
- Password: `Password@123`
- Role: Admin

### Regular Users
1. Email: `arjun@example.com` | Username: `arjun` | Points: 1200
2. Email: `priya@example.com` | Username: `priya` | Points: 800
3. Email: `rahul@example.com` | Username: `rahul` | Points: 450
4. Email: `sneha@example.com` | Username: `sneha` | Points: 200

**All passwords:** `Password@123`

---

## 🛑 Stop the Application

### Stop Backend
In backend terminal: Press `Ctrl+C`

### Stop Frontend
In frontend terminal: Press `Ctrl+C`

### Stop MySQL
```bash
# Windows (Admin Command Prompt)
net stop MySQL80

# macOS
brew services stop mysql
# Or
mysql.server stop

# Linux
sudo systemctl stop mysql
```

---

## 🐛 Troubleshooting

### Problem: "Connection refused" when running backend

**Solution:** MySQL not running
```bash
# Verify MySQL is running
mysql -u root -p

# If fails, start MySQL:
# Windows: net start MySQL80
# macOS: brew services start mysql
# Linux: sudo systemctl start mysql
```

### Problem: "Port 8080 already in use"

**Solution:** Kill process using port 8080
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8080
kill -9 <PID>
```

### Problem: "Port 5173 already in use"

**Solution:** Kill process using port 5173
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5173
kill -9 <PID>
```

### Problem: "Unable to connect to database"

**Solution:** Check credentials in `application.properties`
```bash
# Verify connection manually
mysql -h localhost -u root -p earthcare_db

# If fails, recreate database
mysql -u root -p
CREATE DATABASE earthcare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### Problem: "Node modules not installed"

**Solution:** Reinstall npm packages
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Problem: "Maven build fails"

**Solution:** Clean and rebuild
```bash
cd backend
mvn clean
mvn install
mvn spring-boot:run
```

---

## 📊 Expected Behavior

### HomePage
- Shows hero section with "Earth Care App" title
- Displays 4 stat cards (Users, Trees, Tasks, Challenges)
- Shows mission and vision sections
- CTA buttons: "Get Started", "Join Now", "Explore Challenges"

### Login Flow
- Click "Login"
- Enter email: `admin@earthcare.com`
- Enter password: `Password@123`
- Click "Login"
- Redirect to Dashboard

### Dashboard
- Shows 6 stat cards (Points, XP, Trees, Tasks Today, Challenges, Notifications)
- Shows quick action cards
- Shows achievements section

### Dark Mode
- Click moon icon in navbar
- UI switches to dark theme
- Preference saved in localStorage

---

## 📦 Project Structure

```
earth-care-app/
├── backend/
│   ├── pom.xml
│   ├── src/main/
│   │   ├── java/com/earthcare/
│   │   │   ├── EarthCareApplication.java
│   │   │   ├── entity/           (21 JPA entities)
│   │   │   ├── repository/       (Spring Data JPA)
│   │   │   ├── service/
│   │   │   ├── controller/
│   │   │   ├── config/
│   │   │   ├── security/
│   │   │   ├── dto/
│   │   │   ├── exception/
│   │   │   └── util/
│   │   └── resources/
│   │       ├── application.properties
│   │       └── db/init.sql
│   └── target/              (Build output)
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── services/        (API calls)
│   │   ├── context/         (Auth, Theme)
│   │   ├── hooks/           (Custom hooks)
│   │   ├── components/      (UI components)
│   │   └── pages/           (Page components)
│   └── node_modules/        (Dependencies, created by npm install)
│
├── RUN_APPLICATION.md       (This file)
├── SETUP_SUMMARY.md
├── FRONTEND_SETUP.md
└── README.md
```

---

## ✨ Next Steps After Running

1. **Explore the app:**
   - Login with demo credentials
   - View dashboard
   - Check different pages

2. **Test API endpoints:**
   - Go to Swagger UI
   - Try different API calls
   - See request/response examples

3. **Implement remaining features:**
   - Create remaining 19 pages
   - Add 20+ components
   - Implement 13 services

4. **Deploy to production:**
   - Build backend: `mvn clean package`
   - Build frontend: `npm run build`
   - Deploy to cloud (AWS, Azure, Heroku, etc.)

---

## 💡 Pro Tips

### Faster Backend Startup
```bash
# Skip tests during build
mvn spring-boot:run -DskipTests

# Or during install
mvn clean install -DskipTests
```

### Debug Frontend Issues
- Open Chrome DevTools: `F12`
- Go to "Console" tab
- Check for errors
- Go to "Network" tab to see API calls
- Go to "Application" → "Storage" → "Local Storage" to see saved tokens

### Debug Backend Issues
- Check `application.properties` for log level
- Change to: `logging.level.com.earthcare=DEBUG`
- Restart backend
- Check console for detailed logs

### Hot Reload Frontend
- Frontend automatically reloads when you save files
- Just save the file in editor
- Browser refreshes automatically

---

## 🎉 Success!

If you see:
- Frontend running at http://localhost:5173 ✅
- Backend running at http://localhost:8080 ✅
- Can login with demo credentials ✅
- Dashboard displays correctly ✅

**Congratulations! Earth Care App is running successfully!** 🌍♻️🌱

---

## 📞 Need Help?

Refer to these files for detailed info:

- **Backend Setup:** SETUP_SUMMARY.md
- **Frontend Setup:** FRONTEND_SETUP.md
- **Requirements:** .kiro/specs/earth-care-app/requirements.md
- **Design:** .kiro/specs/earth-care-app/design.md
- **Tasks:** .kiro/specs/earth-care-app/tasks.md

---

**Happy coding! Let's build a greener Earth! 🌱**
