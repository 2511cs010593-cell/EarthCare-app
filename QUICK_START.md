# ⚡ Quick Start (5 Minutes)

## Prerequisites Installed?
- [ ] Java 21
- [ ] Maven 3.9+
- [ ] MySQL 8.0+
- [ ] Node.js 20+
- [ ] npm

If not, install from: https://drive.google.com/file/d/1YourDownloadLink (install prerequisites first)

---

## 🚀 Run in 3 Steps

### Step 1: Setup Database (2 min)

**Terminal 1:**
```bash
mysql -u root -p
```
Enter your MySQL password, then:
```sql
CREATE DATABASE earthcare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

Load data:
```bash
mysql -u root -p earthcare_db < backend/src/main/resources/db/init.sql
```

### Step 2: Run Backend (1 min)

**Terminal 2:**
```bash
cd backend
```

Edit `src/main/resources/application.properties` line 5:
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Then:
```bash
mvn clean install
mvn spring-boot:run
```

✅ Wait for: `Started EarthCareApplication in X.XXX seconds`

### Step 3: Run Frontend (2 min)

**Terminal 3:**
```bash
cd frontend
npm install
npm run dev
```

✅ Wait for: `Local: http://localhost:5173/`

---

## 🎯 Access App

| URL | Purpose |
|-----|---------|
| http://localhost:5173 | **Frontend** (Open in browser) |
| http://localhost:8080/swagger-ui.html | **API Docs** |

---

## 🔑 Login Credentials

```
Email: admin@earthcare.com
Password: Password@123
```

---

## ✅ You're Done!

If you see dashboard with stats → **App is working!** 🎉

---

## 🛑 Stop App

Press `Ctrl+C` in each terminal

---

## 📞 Stuck?

Check `RUN_APPLICATION.md` for detailed troubleshooting
