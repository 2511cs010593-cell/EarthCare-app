# Design Document — Earth Care App

## Overview

Earth Care App is a full-stack environmental sustainability platform. Users complete daily eco-tasks, earn gamified rewards (points, XP, Green Coins, badges), plant trees, report waste, join challenges, track pollution, attend events, read news, and participate in a community forum. An admin dashboard provides full content management and analytics.

### Technology Stack

| Layer | Technology |
|---|---|
| Backend runtime | Java 21 |
| Backend framework | Spring Boot 3.x |
| Persistence | Spring Data JPA / Hibernate 6, MySQL 8 |
| Security | Spring Security 6, JWT (jjwt 0.12) |
| Build | Maven 3.9 |
| API docs | SpringDoc OpenAPI 3 / Swagger UI |
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| HTTP client | Axios 1.x |
| Routing | React Router v6 |
| State | React Context API |
| Charts | Recharts |

### High-Level Architecture Narrative

```
Browser (React SPA)
      │  HTTPS / REST JSON
      ▼
Spring Boot 3 (embedded Tomcat)
  ├── Security Filter Chain (JWT)
  ├── Controller Layer  (@RestController)
  ├── Service Layer     (@Service)
  ├── Repository Layer  (Spring Data JPA)
  └── MySQL 8 Database
```

Static assets are served independently (Vite dev server in development; Nginx / CDN in production). The React app communicates with the backend exclusively via a versioned REST API (`/api/v1/...`). JWT tokens authenticate every protected request.

---

## Architecture

### Layered MVC Backend

```
com.earthcare
├── config/          Spring beans, security config, CORS, OpenAPI
├── security/        JWT filter, token provider, UserDetailsService impl
├── entity/          JPA entity classes (one per DB table)
├── repository/      Spring Data JPA interfaces
├── service/         Business logic interfaces + implementations
├── controller/      @RestController classes, one per module
├── dto/             Request and Response record classes
├── exception/       Custom exceptions + @ControllerAdvice handler
└── util/            Email service, file storage, reward calculator
```

### Frontend Structure

```
src/
├── main.jsx                    entry point
├── App.jsx                     router root + theme provider
├── context/
│   ├── AuthContext.jsx          JWT state, login/logout helpers
│   └── ThemeContext.jsx         dark-mode toggle + localStorage
├── hooks/
│   ├── useAuth.js
│   ├── usePagination.js
│   └── useNotifications.js
├── services/
│   ├── api.js                  Axios instance + interceptors
│   ├── authService.js
│   ├── taskService.js
│   ├── rewardService.js
│   ├── treeService.js
│   ├── wasteService.js
│   ├── challengeService.js
│   ├── pollutionService.js
│   ├── eventService.js
│   ├── newsService.js
│   ├── forumService.js
│   ├── notificationService.js
│   └── contactService.js
├── components/
│   ├── common/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── AdminRoute.jsx
│   │   ├── Spinner.jsx
│   │   ├── Toast.jsx
│   │   ├── Pagination.jsx
│   │   └── SearchFilter.jsx
│   ├── home/
│   │   ├── HeroSection.jsx
│   │   ├── StatsSection.jsx
│   │   ├── MissionSection.jsx
│   │   └── QuotesCarousel.jsx
│   ├── tasks/
│   │   ├── TaskCard.jsx
│   │   └── TaskProgressBar.jsx
│   ├── rewards/
│   │   ├── RewardCard.jsx
│   │   ├── BadgeGrid.jsx
│   │   └── LeaderboardTable.jsx
│   ├── forum/
│   │   ├── PostCard.jsx
│   │   └── CommentList.jsx
│   └── charts/
│       ├── TaskTrendChart.jsx
│       └── PollutionChart.jsx
└── pages/
    ├── public/
    │   ├── HomePage.jsx
    │   ├── LoginPage.jsx
    │   ├── RegisterPage.jsx
    │   ├── ForgotPasswordPage.jsx
    │   ├── ResetPasswordPage.jsx
    │   ├── NewsPage.jsx
    │   ├── EventsPage.jsx
    │   └── ContactPage.jsx
    ├── user/
    │   ├── DashboardPage.jsx
    │   ├── TasksPage.jsx
    │   ├── RewardsPage.jsx
    │   ├── TreePlantationPage.jsx
    │   ├── WasteReportPage.jsx
    │   ├── ChallengesPage.jsx
    │   ├── PollutionPage.jsx
    │   ├── CommunityPage.jsx
    │   ├── PostDetailPage.jsx
    │   └── ProfilePage.jsx
    └── admin/
        ├── AdminDashboardPage.jsx
        ├── AdminUsersPage.jsx
        ├── AdminNewsPage.jsx
        ├── AdminEventsPage.jsx
        ├── AdminChallengesPage.jsx
        ├── AdminTreeApprovalsPage.jsx
        ├── AdminWasteReportsPage.jsx
        ├── AdminPollutionPage.jsx
        ├── AdminNotificationsPage.jsx
        └── AdminContactsPage.jsx
```

### React Router Route Definitions

```jsx
// App.jsx
<Routes>
  {/* Public */}
  <Route path="/"                  element={<HomePage />} />
  <Route path="/login"             element={<LoginPage />} />
  <Route path="/register"          element={<RegisterPage />} />
  <Route path="/forgot-password"   element={<ForgotPasswordPage />} />
  <Route path="/reset-password"    element={<ResetPasswordPage />} />
  <Route path="/news"              element={<NewsPage />} />
  <Route path="/events"            element={<EventsPage />} />
  <Route path="/contact"           element={<ContactPage />} />

  {/* Protected (ROLE_USER) */}
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard"       element={<DashboardPage />} />
    <Route path="/tasks"           element={<TasksPage />} />
    <Route path="/rewards"         element={<RewardsPage />} />
    <Route path="/tree"            element={<TreePlantationPage />} />
    <Route path="/waste"           element={<WasteReportPage />} />
    <Route path="/challenges"      element={<ChallengesPage />} />
    <Route path="/pollution"       element={<PollutionPage />} />
    <Route path="/community"       element={<CommunityPage />} />
    <Route path="/community/:id"   element={<PostDetailPage />} />
    <Route path="/profile"         element={<ProfilePage />} />
  </Route>

  {/* Admin (ROLE_ADMIN) */}
  <Route element={<AdminRoute />}>
    <Route path="/admin"                   element={<AdminDashboardPage />} />
    <Route path="/admin/users"             element={<AdminUsersPage />} />
    <Route path="/admin/news"              element={<AdminNewsPage />} />
    <Route path="/admin/events"            element={<AdminEventsPage />} />
    <Route path="/admin/challenges"        element={<AdminChallengesPage />} />
    <Route path="/admin/tree-approvals"    element={<AdminTreeApprovalsPage />} />
    <Route path="/admin/waste-reports"     element={<AdminWasteReportsPage />} />
    <Route path="/admin/pollution"         element={<AdminPollutionPage />} />
    <Route path="/admin/notifications"     element={<AdminNotificationsPage />} />
    <Route path="/admin/contacts"          element={<AdminContactsPage />} />
  </Route>
</Routes>
```

---

## Components and Interfaces

### JWT Security Filter Chain

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
          .csrf(AbstractHttpConfigurer::disable)
          .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))
          .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/v1/auth/**",
                             "/api/v1/news/**",
                             "/api/v1/events",
                             "/api/v1/contact",
                             "/swagger-ui/**",
                             "/v3/api-docs/**").permitAll()
            .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated()
          )
          .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
```

`JwtAuthFilter` (extends `OncePerRequestFilter`):
1. Extract `Authorization: Bearer <token>` header.
2. Call `JwtTokenProvider.validateToken(token)`.
3. Load `UserDetails` via `UserDetailsServiceImpl`.
4. Set `SecurityContextHolder` authentication.
5. Continue filter chain.

`JwtTokenProvider`:
- `generateAccessToken(UserDetails)` — 15-minute expiry, signed HS512.
- `generateRefreshToken(UserDetails)` — 7-day expiry.
- `validateToken(String)` — parse, verify signature, check expiry.
- `getUsernameFromToken(String)` — extract subject claim.

### Global Exception Handler

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(404).body(new ErrorResponse(404, "NOT_FOUND", ex.getMessage()));
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleConflict(DuplicateResourceException ex) {
        return ResponseEntity.status(409).body(new ErrorResponse(409, "CONFLICT", ex.getMessage()));
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(BadRequestException ex) {
        return ResponseEntity.status(400).body(new ErrorResponse(400, "BAD_REQUEST", ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        List<FieldError> errors = ex.getBindingResult().getFieldErrors()
            .stream().map(e -> new FieldError(e.getField(), e.getDefaultMessage())).toList();
        return ResponseEntity.status(400).body(new ErrorResponse(400, "VALIDATION_ERROR", errors));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleForbidden(AccessDeniedException ex) {
        return ResponseEntity.status(403).body(new ErrorResponse(403, "FORBIDDEN", ex.getMessage()));
    }
}
```

`ErrorResponse` record: `int status, String code, Object message`.

### Axios Instance and Interceptors

```js
// services/api.js
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token') ?? sessionStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401 && !err.config._retry) {
      err.config._retry = true;
      const { data } = await axios.post('/api/v1/auth/refresh', { refreshToken: getRefreshToken() });
      storeTokens(data);
      err.config.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(err.config);
    }
    return Promise.reject(err);
  }
);
```

### File Upload Handling

Backend `FileStorageService`:
- Stores uploaded files under `uploads/trees/` and `uploads/waste/`.
- Validates MIME type (image/jpeg, image/png, image/webp) and max size (5 MB).
- Returns a relative URL stored in the entity's `photoUrl` field.
- Controller uses `@RequestParam MultipartFile photo` with `consumes = MULTIPART_FORM_DATA_VALUE`.

Frontend:
- `<input type="file" accept="image/*">` sends multipart form data via Axios with `Content-Type: multipart/form-data`.

### Email Service

`EmailService` (JavaMailSender):
- `sendVerificationEmail(String email, String token)` — sends HTML email with link `/api/v1/auth/verify?token=<token>`.
- `sendPasswordResetEmail(String email, String token)` — sends HTML email with link `/reset-password?token=<token>`.
- Tokens are UUID strings stored in the `Users` table with expiry timestamps (24 h for verification, 1 h for reset).
- Templates use Thymeleaf HTML email layout.

---

## Data Models

### JPA Entities

#### User
```java
@Entity @Table(name = "users")
public class User {
    @Id @GeneratedValue Long id;
    String fullName, username, email, password, mobileNumber;
    String profilePhotoUrl;
    boolean emailVerified;
    String verificationToken; LocalDateTime verificationTokenExpiry;
    String resetToken; LocalDateTime resetTokenExpiry;
    int totalPoints, greenCoins, xp, level, streak;
    LocalDate lastActivityDate;
    LocalDateTime createdAt, updatedAt;
    @ManyToMany(fetch = EAGER) Set<Role> roles;
}
```

#### Role
```java
@Entity @Table(name = "roles")
public class Role {
    @Id @GeneratedValue Long id;
    @Enumerated(STRING) RoleName name; // ROLE_USER, ROLE_ADMIN
}
```

#### Task
```java
@Entity @Table(name = "tasks")
public class Task {
    @Id @GeneratedValue Long id;
    String title, description, category, iconUrl;
    int rewardPoints, greenCoins, xpAwarded;
    boolean active;
    LocalDateTime createdAt;
}
```

#### UserTask
```java
@Entity @Table(name = "user_tasks")
public class UserTask {
    @Id @GeneratedValue Long id;
    @ManyToOne User user;
    @ManyToOne Task task;
    LocalDate completedDate;
    int pointsAwarded, coinsAwarded, xpAwarded;
    LocalDateTime createdAt;
}
```

#### Reward
```java
@Entity @Table(name = "rewards")
public class Reward {
    @Id @GeneratedValue Long id;
    String title, description, category, imageUrl;
    int pointsCost;
    boolean available;
    LocalDateTime createdAt;
}
```

#### RewardRedemption
```java
@Entity @Table(name = "reward_redemptions")
public class RewardRedemption {
    @Id @GeneratedValue Long id;
    @ManyToOne User user;
    @ManyToOne Reward reward;
    int pointsSpent;
    @Enumerated(STRING) RedemptionStatus status; // PENDING, FULFILLED, CANCELLED
    LocalDateTime redeemedAt;
}
```

#### Badge
```java
@Entity @Table(name = "badges")
public class Badge {
    @Id @GeneratedValue Long id;
    String name, description, iconUrl;
    @Enumerated(STRING) BadgeTier tier; // BRONZE, SILVER, GOLD, PLATINUM, EARTH_HERO
    int requiredPoints;
}
```

#### UserBadge
```java
@Entity @Table(name = "user_badges")
public class UserBadge {
    @Id @GeneratedValue Long id;
    @ManyToOne User user;
    @ManyToOne Badge badge;
    LocalDateTime awardedAt;
}
```
