# 🪟 Windows Setup Guide (PowerShell)

Your errors show PowerShell syntax issues. Here's the Windows-specific solution:

---

## ❌ Problems You're Facing

1. `mvn : The term 'mvn' is not recognized` → Maven not installed or not in PATH
2. `The '<' operator is reserved for future use` → PowerShell redirect syntax different
3. `Cannot find path 'C:\Users\...\backend\backend'` → Already in backend folder

---

## ✅ Solution

### Step 1: Install Maven

**Check if Maven is installed:**
```powershell
mvn -version
```

If error, **install Maven**:

1. Download: https://maven.apache.org/download.cgi
2. Download: `apache-maven-3.9.x-bin.zip`
3. Extract to: `C:\Program Files\apache-maven-3.9.x`
4. Add to PATH:
   - Right-click "This PC" → Properties
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", click "New"
   - Variable name: `MAVEN_HOME`
   - Variable value: `C:\Program Files\apache-maven-3.9.x`
   - Click OK
5. Add Maven bin to PATH:
   - Edit "Path" variable
   - Click "New"
   - Add: `C:\Program Files\apache-maven-3.9.x\bin`
   - Click OK, OK, OK
6. **Restart PowerShell** and test:
```powershell
mvn -version
```

Should show Maven version.

---

### Step 2: Install Java 21

**Check if Java is installed:**
```powershell
java -version
```

If error, **install Java 21**:

1. Download: https://www.oracle.com/java/technologies/downloads/#java21
2. Choose: Windows x64 Installer
3. Run installer and install
4. Java automatically adds to PATH
5. **Restart PowerShell** and test:
```powershell
java -version
```

Should show Java 21.

---

### Step 3: Set Up Database (PowerShell)

**Start MySQL:**
```powershell
# If installed as service, it auto-starts
# Check if running:
Get-Service | Where-Object {$_.Name -like "*mysql*"}

# If not running, start it:
Start-Service MySQL80
```

**Create database - Use Command Prompt (not PowerShell):**

Open **Command Prompt** (not PowerShell):
```cmd
mysql -u root -p
```

Enter password. Then:
```sql
CREATE DATABASE earthcare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

**Load SQL data - Command Prompt:**

Still in Command Prompt:
```cmd
cd C:\Users\Niharika\Desktop\AD
mysql -u root -p earthcare_db < backend/src/main/resources/db/init.sql
```

Enter password. Wait for completion.

---

### Step 4: Update Backend Config

**Open PowerShell** (now that Java & Maven are installed):

```powershell
cd C:\Users\Niharika\Desktop\AD
```

**Edit backend config:**
```powershell
notepad backend\src\main\resources\application.properties
```

Find line 5 (around `spring.datasource.password`):

Change:
```properties
spring.datasource.password=root
```

To your MySQL password (if you set one during MySQL installation).

Save and close.

---

### Step 5: Run Backend (PowerShell)

```powershell
cd C:\Users\Niharika\Desktop\AD\backend
mvn clean install
```

Wait 3-5 minutes for downloads and compilation.

Then:
```powershell
mvn spring-boot:run
```

**Wait for message:**
```
Started EarthCareApplication in X.XXX seconds
```

✅ Backend is running at http://localhost:8080

**Keep this PowerShell window open!**

---

### Step 6: Run Frontend (New PowerShell)

Open **new PowerShell window** (keep backend running):

```powershell
cd C:\Users\Niharika\Desktop\AD\frontend
npm install
npm run dev
```

Wait for:
```
Local:   http://localhost:5173/
```

✅ Frontend is running at http://localhost:5173

**Browser should auto-open.**

---

## 🎯 Access the App

1. **Frontend:** http://localhost:5173
2. **API Docs:** http://localhost:8080/swagger-ui.html

**Login with:**
- Email: `admin@earthcare.com`
- Password: `Password@123`

---

## 🛑 Stop the App

In each PowerShell window: Press `Ctrl+C`

---

## 📝 Important Windows Commands

| Task | Command |
|------|---------|
| List services | `Get-Service` |
| Start MySQL | `Start-Service MySQL80` |
| Stop MySQL | `Stop-Service MySQL80` |
| Current directory | `pwd` or `Get-Location` |
| List files | `ls` or `Get-ChildItem` |
| Change directory | `cd path` |
| Edit file | `notepad filename` |
| Kill process | `Get-Process \| Where-Object {$_.Port -eq 8080}` |

---

## ⚠️ If Maven/Java Still Not Working

**Use Command Prompt instead of PowerShell:**

All commands work in Command Prompt:
```cmd
mvn spring-boot:run
npm run dev
mysql -u root -p
```

Command Prompt is more reliable for Java/Maven on Windows.

---

## 🎉 Success!

If you see:
- ✅ PowerShell shows `mvn -version` (Maven)
- ✅ PowerShell shows `java -version` (Java)
- ✅ Backend running at localhost:8080
- ✅ Frontend running at localhost:5173
- ✅ Can login with credentials

**App is working!** 🌍

---

## 💡 Pro Tip

Use **Command Prompt** for Java/Maven:
```cmd
cd C:\Users\Niharika\Desktop\AD
cd backend
mvn spring-boot:run
```

Use **PowerShell** for npm:
```powershell
cd C:\Users\Niharika\Desktop\AD
cd frontend
npm run dev
```

Or use **VS Code Terminal** (has both)

---

## 📞 Still Having Issues?

1. **Maven not found after install:**
   - Restart computer (not just PowerShell)
   - Verify path: `echo $env:MAVEN_HOME`

2. **Java not found:**
   - Restart computer
   - Verify: `java -version`

3. **MySQL connection error:**
   - Use Command Prompt, not PowerShell
   - Verify MySQL running: `Get-Service MySQL80`

4. **Port 8080 in use:**
   - Find process: `Get-Process | Where-Object {$_.HandleCount -gt 0}`
   - Or use different port in application.properties

---

**Ready? Follow the steps above step-by-step!** 🚀
