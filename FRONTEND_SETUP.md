# Earth Care App — Frontend Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Create `.env` file (already done):
```env
VITE_API_BASE_URL=http://localhost:8080
```

### 3. Start Development Server

```bash
npm run dev
```

Frontend will be available at **http://localhost:5173**

---

## 📁 Frontend Project Structure

```
frontend/
├── package.json              ✅ Dependencies & scripts
├── vite.config.js           ✅ Vite configuration
├── tailwind.config.js       ✅ Tailwind CSS with green theme
├── index.html               ✅ Entry HTML file
├── .env                     ✅ Environment variables
├── src/
│   ├── main.jsx            ✅ React entry point
│   ├── App.jsx             ✅ Router & providers
│   ├── index.css           ✅ Tailwind + custom CSS
│   ├── services/
│   │   └── api.js          ✅ Axios instance with JWT interceptor
│   ├── context/
│   │   ├── AuthContext.jsx ✅ Authentication state
│   │   └── ThemeContext.jsx ✅ Dark mode toggle
│   ├── hooks/
│   │   ├── useAuth.js      ✅ Auth hook
│   │   └── useTheme.js     ✅ Theme hook
│   ├── components/
│   │   └── common/
│   │       ├── Navbar.jsx            ✅ Navigation bar
│   │       ├── Footer.jsx            ✅ Footer
│   │       ├── ProtectedRoute.jsx    ✅ Route guard
│   │       └── AdminRoute.jsx        ✅ Admin route guard
│   └── pages/
│       ├── public/
│       │   ├── HomePage.jsx      ✅ Home page
│       │   ├── LoginPage.jsx     ✅ Login form
│       │   └── RegisterPage.jsx  ✅ Registration form
│       └── user/
│           └── DashboardPage.jsx ✅ User dashboard
```

---

## ✅ Components Created

### Core Infrastructure

| File | Status | Description |
|------|--------|-------------|
| api.js | ✅ | Axios instance with JWT interceptor + token refresh |
| AuthContext.jsx | ✅ | JWT auth state, login/logout, user profile |
| ThemeContext.jsx | ✅ | Dark mode toggle with localStorage persistence |
| useAuth.js | ✅ | Custom hook for auth context |
| useTheme.js | ✅ | Custom hook for theme context |

### Navigation & Layout

| File | Status | Description |
|------|--------|-------------|
| Navbar.jsx | ✅ | Responsive navbar with logo, links, auth buttons, notifications, theme toggle |
| Footer.jsx | ✅ | Footer with quick links, social icons, copyright |
| ProtectedRoute.jsx | ✅ | Route guard for authenticated users |
| AdminRoute.jsx | ✅ | Route guard for admin users |

### Public Pages

| File | Status | Description |
|------|--------|-------------|
| HomePage.jsx | ✅ | Hero section, stats, mission, CTAs, features |
| LoginPage.jsx | ✅ | Login form with email/username, password, remember me |
| RegisterPage.jsx | ✅ | Registration with validation (name, email, password, mobile) |

### User Pages

| File | Status | Description |
|------|--------|-------------|
| DashboardPage.jsx | ✅ | User dashboard with stats, quick actions, achievements |

### Router

| File | Status | Description |
|------|--------|-------------|
| App.jsx | ✅ | React Router setup with public/protected/admin routes |

---

## 🎨 Styling

### Colors (Tailwind Config)

```
Primary: Green (#22c55e → #15803d)
Secondary: Purple (#8b5cf6 → #6d28d9)
Accent: Pink (#ec4899 → #be185d)
```

### Dark Mode

Enabled via `class` strategy in `tailwind.config.js`. Toggle via ThemeContext.

### Custom CSS Classes

- `.gradient-primary` — Green gradient
- `.gradient-secondary` — Purple gradient
- `.card-shadow` — Hover shadow effect
- `.button-primary` — Green button
- `.button-secondary` — Purple button
- `.input-field` — Styled input
- `.badge` — Badge styles

---

## 🔌 API Integration

### Authentication Flow

1. **User registers** → `/api/v1/auth/register`
2. **User logs in** → `/api/v1/auth/login` → Get JWT token
3. **Store token** → localStorage (if "Remember Me") or sessionStorage
4. **All requests** → Axios interceptor adds `Authorization: Bearer <token>` header
5. **Token expires** → Axios interceptor detects 401
6. **Silent refresh** → POST `/api/v1/auth/refresh` → Get new token
7. **Retry request** → Original request with new token
8. **Logout** → Clear localStorage/sessionStorage

### Service Structure

All API calls go through `frontend/src/services/api.js` which handles:
- Base URL configuration
- JWT attachment
- Token refresh on 401
- Error handling

---

## 🚀 To Complete Frontend

### Remaining Pages to Create (19 pages)

1. **Public Pages** (3)
   - [ ] ForgotPasswordPage
   - [ ] ResetPasswordPage
   - [ ] NewsPage (public news feed)

2. **User Pages** (11)
   - [ ] TasksPage
   - [ ] RewardsPage
   - [ ] TreePlantationPage
   - [ ] WasteReportPage
   - [ ] ChallengesPage
   - [ ] PollutionPage
   - [ ] EventsPage
   - [ ] CommunityPage (forum)
   - [ ] PostDetailPage
   - [ ] ProfilePage
   - [ ] ContactPage

3. **Admin Pages** (9)
   - [ ] AdminDashboardPage
   - [ ] AdminUsersPage
   - [ ] AdminNewsPage
   - [ ] AdminEventsPage
   - [ ] AdminChallengesPage
   - [ ] AdminTreeApprovalsPage
   - [ ] AdminWasteReportsPage
   - [ ] AdminPollutionPage
   - [ ] AdminContactsPage

### Remaining Components (20+)

1. **Task Components** (2)
   - [ ] TaskCard
   - [ ] TaskProgressBar

2. **Reward Components** (3)
   - [ ] RewardCard
   - [ ] BadgeGrid
   - [ ] LeaderboardTable

3. **Forum Components** (2)
   - [ ] PostCard
   - [ ] CommentList

4. **Chart Components** (2)
   - [ ] TaskTrendChart
   - [ ] PollutionChart

5. **Common Components** (11)
   - [ ] Spinner
   - [ ] Toast (wrapper)
   - [ ] Pagination
   - [ ] SearchFilter
   - [ ] Modal
   - [ ] Tabs
   - [ ] Badge
   - [ ] Card
   - [ ] Button (variants)
   - [ ] Alert
   - [ ] Breadcrumb

### Services (13)

- [ ] taskService.js
- [ ] rewardService.js
- [ ] treeService.js
- [ ] wasteService.js
- [ ] challengeService.js
- [ ] pollutionService.js
- [ ] eventService.js
- [ ] newsService.js
- [ ] forumService.js
- [ ] notificationService.js
- [ ] dashboardService.js
- [ ] adminService.js
- [ ] contactService.js

### Custom Hooks (3+)

- [ ] usePagination
- [ ] useNotifications
- [ ] useSearch
- [ ] useForm (optional)

---

## 📦 Build & Deploy

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

Output in `dist/` directory. Deploy with:
- Nginx
- Vercel
- AWS S3 + CloudFront
- Any static host

### Preview Build

```bash
npm run preview
```

---

## 🔐 Security Best Practices

✅ JWT tokens in storage (localStorage/sessionStorage)  
✅ Sensitive routes protected via ProtectedRoute  
✅ Admin routes protected via AdminRoute  
✅ Axios interceptor handles token refresh silently  
✅ Logout clears all storage  
✅ 401 errors redirect to login  
✅ CORS configured on backend

---

## ⚡ Performance Tips

- Lazy load pages with React.lazy() + Suspense
- Memoize components with React.memo()
- Use useCallback for event handlers
- Optimize images with next/image or img optimization
- Enable gzip compression
- Use CDN for assets
- Code split with React Router

---

## 🐛 Troubleshooting

**Frontend won't connect to backend**
- Ensure backend is running on port 8080
- Check `VITE_API_BASE_URL` in `.env`
- Check browser console for CORS errors

**Dark mode not working**
- Check localStorage: `localStorage.getItem('theme')`
- Verify `dark` class on `<html>` element

**Login not working**
- Check JWT token in storage
- Verify backend returns accessToken + refreshToken
- Check Axios interceptor in DevTools Network tab

**Protected routes showing blank**
- Check AuthContext is initialized
- Verify loading state in ProtectedRoute
- Check user data in browser DevTools

---

## 📚 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.3.1 | UI library |
| react-router-dom | 6.20.1 | Routing |
| axios | 1.6.2 | HTTP client |
| react-hot-toast | 2.4.1 | Toast notifications |
| tailwindcss | 3.4.1 | CSS framework |
| recharts | 2.10.3 | Charts |
| react-icons | 4.12.0 | Icon library |
| date-fns | 2.30.0 | Date utilities |

---

## 🎯 Next Steps

1. ✅ Frontend scaffold complete
2. ⏳ Create remaining 19 pages
3. ⏳ Create 20+ reusable components
4. ⏳ Implement 13 API services
5. ⏳ Add charts and visualizations
6. ⏳ Implement dark mode fully
7. ⏳ Add responsive design refinements
8. ⏳ Test all features
9. ⏳ Deploy to production

---

**Frontend is ready for pages and features! 🚀**
