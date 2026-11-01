# Implementation Plan: Earth Care App

## Overview

Full-stack environmental sustainability platform — Spring Boot 3 / Java 21 / MySQL backend with React 18 + Vite + Tailwind CSS frontend. Tasks build incrementally from project scaffold → backend security → data layer → business logic → REST API → frontend infrastructure → pages.

## Tasks

- [x] 1. Backend project scaffold
  - Create `backend/pom.xml` with Spring Boot 3.x parent; add dependencies: `spring-boot-starter-web`, `spring-boot-starter-security`, `spring-boot-starter-data-jpa`, `spring-boot-starter-mail`, `spring-boot-starter-validation`, `spring-boot-starter-thymeleaf`, `mysql-connector-j`, `lombok`, `jjwt-api 0.12`, `jjwt-impl 0.12`, `jjwt-jackson 0.12`, `springdoc-openapi-starter-webmvc-ui 2.x`, `mapstruct`
  - Create `backend/src/main/resources/application.properties` with datasource, JPA DDL-auto, mail, JWT secret/expiry, and file-upload settings
  - Create `backend/src/main/java/com/earthcare/EarthCareApplication.java` main class
  - Create package skeleton: `config`, `security`, `entity`, `repository`, `service`, `service/impl`, `controller`, `dto`, `exception`, `util`
  - _Requirements: 20.2, 23.2_

- [x] 2. MySQL schema and sample data
  - [x] 2.1 Write `backend/src/main/resources/db/init.sql` creating all tables: `users`, `roles`, `user_roles`, `tasks`, `user_tasks`, `rewards`, `reward_redemptions`, `badges`, `user_badges`, `tree_plantation`, `garbage_reports`, `challenges`, `user_challenges`, `events`, `registrations`, `news`, `posts`, `comments`, `post_likes`, `notifications`, `contacts`, `pollution_data` — with primary keys, foreign keys, indexes, and cascade rules matching the ER diagram
  - [x] 2.2 Add INSERT statements in `init.sql` for sample data: 2 roles, 5 users (1 admin + 4 users), 9 tasks, 5 rewards, 5 badges, 3 challenges, 5 events, 5 news articles, 3 posts, pollution data rows, and 2 tree plantation records
  - Configure `spring.sql.init.mode=always` and `spring.jpa.hibernate.ddl-auto=validate` in `application.properties`
  - _Requirements: 22.1, 22.2, 22.3, 22.4_

- [x] 3. JPA entities
  - [x] 3.1 Create `User`, `Role` entities in `entity/` package with all fields from design: `fullName`, `username`, `email`, `password`, `mobileNumber`, `profilePhotoUrl`, `emailVerified`, `verificationToken`, `verificationTokenExpiry`, `resetToken`, `resetTokenExpiry`, `totalPoints`, `greenCoins`, `xp`, `level`, `streak`, `lastActivityDate`, `createdAt`, `updatedAt`, `@ManyToMany roles`
  - [x] 3.2 Create `Task`, `UserTask` entities — `Task` fields: `title`, `description`, `category`, `iconUrl`, `rewardPoints`, `greenCoins`, `xpAwarded`, `active`; `UserTask` with `@ManyToOne` to `User` and `Task`, `completedDate`, `pointsAwarded`, `coinsAwarded`, `xpAwarded`
  - [x] 3.3 Create `Reward`, `RewardRedemption`, `Badge`, `UserBadge` entities — `RedemptionStatus` enum (PENDING/FULFILLED/CANCELLED), `BadgeTier` enum (BRONZE/SILVER/GOLD/PLATINUM/EARTH_HERO)
  - [x] 3.4 Create `TreePlantation` entity: `user`, `photoUrl`, `treeName`, `location`, `plantationDate`, `description`, `status` enum (PENDING/APPROVED/REJECTED), `rejectionReason`, `pointsAwarded`, `createdAt`
  - [x] 3.5 Create `GarbageReport` entity: `user`, `photoUrl`, `locationDescription`, `latitude`, `longitude`, `severityLevel`, `status` enum (PENDING/RESOLVED), `createdAt`
  - [x] 3.6 Create `Challenge`, `UserChallenge` entities — `Challenge` fields: `title`, `description`, `type` (WEEKLY/MONTHLY), `rewardPoints`, `deadline`, `participantCount`, `active`; `UserChallenge` with `status` enum (IN_PROGRESS/COMPLETED/EXPIRED)
  - [x] 3.7 Create `Event`, `Registration` entities — `Event` fields: `title`, `description`, `eventDate`, `location`, `availableSeats`, `active`; `Registration` with `user` and `event` FK
  - [x] 3.8 Create `News` entity: `title`, `summary`, `content`, `category`, `author`, `imageUrl`, `publishedAt`, `createdAt`
  - [x] 3.9 Create `Post`, `Comment`, `PostLike` entities — `Post`: `user`, `title`, `body`, `likeCount`, `createdAt`; `Comment`: `post`, `user`, `body`, `createdAt`; `PostLike`: `post`, `user`, unique constraint on `(post_id, user_id)`
  - [x] 3.10 Create `Notification` entity: `user`, `title`, `message`, `type`, `read`, `createdAt`
  - [x] 3.11 Create `PollutionData` entity: `type` (AIR/WATER/PLASTIC), `value`, `unit`, `location`, `recordedAt`, `createdAt`
  - [x] 3.12 Create `Contact` entity: `fullName`, `email`, `subject`, `message`, `createdAt`
  - _Requirements: 22.1, 22.2_

- [x] 4. Repositories
  - Create Spring Data JPA repository interfaces in `repository/` for every entity: `UserRepository` (findByEmail, findByUsername, findByVerificationToken, findByResetToken), `RoleRepository`, `TaskRepository`, `UserTaskRepository` (findByUserAndCompletedDate, findByUserAndTaskAndCompletedDate), `RewardRepository`, `RewardRedemptionRepository`, `BadgeRepository`, `UserBadgeRepository`, `TreePlantationRepository` (findByUser, findByStatus), `GarbageReportRepository` (findByUser, findByStatus), `ChallengeRepository` (findByActiveTrue), `UserChallengeRepository` (findByUserAndChallenge, findByUserAndStatus), `EventRepository`, `RegistrationRepository` (findByUserAndEvent), `NewsRepository` (findByCategoryAndTitleContaining with Pageable), `PostRepository` (findByTitleContaining with Pageable), `CommentRepository` (findByPost), `PostLikeRepository` (findByPostAndUser), `NotificationRepository` (findByUserOrderByCreatedAtDesc, countByUserAndReadFalse), `PollutionDataRepository` (findByTypeAndRecordedAtBetween), `ContactRepository`
  - _Requirements: 20.1_

- [ ] 5. DTOs (request and response records)
  - [ ] 5.1 Auth DTOs: `RegisterRequest` (fullName, username, email, mobileNumber, password), `LoginRequest` (usernameOrEmail, password, rememberMe), `AuthResponse` (accessToken, refreshToken, tokenType, userInfo), `RefreshTokenRequest`, `ForgotPasswordRequest`, `ResetPasswordRequest`, `ChangePasswordRequest`, `UpdateProfileRequest`, `UserResponse`
  - [ ] 5.2 Task DTOs: `TaskResponse` (id, title, description, category, iconUrl, rewardPoints, greenCoins, xpAwarded), `CompleteTaskResponse` (pointsAwarded, coinsAwarded, xpAwarded, badgeAwarded, message), `TaskProgressResponse` (totalTasks, completedToday, progressPercent)
  - [ ] 5.3 Reward DTOs: `RewardResponse`, `RedemptionResponse`, `BadgeResponse`, `UserStatsResponse` (totalPoints, greenCoins, xp, level, streak, nextLevelXp), `LeaderboardEntryResponse` (rank, userId, username, totalPoints, profilePhotoUrl)
  - [ ] 5.4 Tree DTOs: `TreePlantationRequest` (treeName, location, plantationDate, description), `TreePlantationResponse`, `TreeApprovalRequest` (status, rejectionReason)
  - [ ] 5.5 Waste DTOs: `GarbageReportRequest` (locationDescription, latitude, longitude, severityLevel), `GarbageReportResponse`
  - [ ] 5.6 Challenge DTOs: `ChallengeResponse` (id, title, description, type, rewardPoints, deadline, participantCount), `UserChallengeResponse` (challenge, status, joinedAt)
  - [ ] 5.7 Event DTOs: `EventResponse` (id, title, description, eventDate, location, availableSeats), `RegistrationResponse`
  - [ ] 5.8 News DTOs: `NewsResponse` (id, title, summary, category, author, imageUrl, publishedAt), `NewsRequest`, paginated wrapper `PageResponse<T>`
  - [ ] 5.9 Forum DTOs: `PostRequest` (title, body), `PostResponse` (id, title, body, authorUsername, likeCount, commentCount, createdAt), `CommentRequest`, `CommentResponse`
  - [ ] 5.10 Other DTOs: `NotificationResponse`, `PollutionDataResponse` (type, value, unit, location, recordedAt), `PollutionDataRequest`, `ContactRequest` (fullName, email, subject, message), `DashboardStatsResponse`, `AdminStatsResponse`, `ErrorResponse` (status, code, message)
  - _Requirements: 20.1, 20.4_

- [ ] 6. Security layer
  - [ ] 6.1 Create `security/JwtTokenProvider.java`: `generateAccessToken(UserDetails)` (HS512, 15-min), `generateRefreshToken(UserDetails)` (7-day), `validateToken(String)`, `getUsernameFromToken(String)`; read secret and expiry from `application.properties`
  - [ ] 6.2 Create `security/JwtAuthFilter.java` extending `OncePerRequestFilter`: extract Bearer token, validate, load UserDetails, set `SecurityContextHolder` authentication
  - [ ] 6.3 Create `security/UserDetailsServiceImpl.java` implementing `UserDetailsService`: load user by username or email via `UserRepository`, build `UserDetails` with roles mapped to `GrantedAuthority`
  - [ ] 6.4 Create `config/SecurityConfig.java`: disable CSRF, stateless sessions, permit `/api/v1/auth/**`, `/api/v1/news/**`, `/api/v1/events` (GET), `/api/v1/contact`, `/swagger-ui/**`, `/v3/api-docs/**`; restrict `/api/v1/admin/**` to ROLE_ADMIN; add `JwtAuthFilter` before `UsernamePasswordAuthenticationFilter`; configure CORS to allow frontend origin
  - _Requirements: 3.2, 6.1, 6.3, 6.4, 20.5_

- [ ] 7. Exception handling
  - Create custom exception classes in `exception/`: `ResourceNotFoundException`, `DuplicateResourceException`, `BadRequestException`, `UnauthorizedException`, `FileStorageException`
  - Create `exception/GlobalExceptionHandler.java` with `@RestControllerAdvice` handling each custom exception plus `MethodArgumentNotValidException` (returning field-level errors), `AccessDeniedException` (403), and a catch-all `Exception` handler (500); all responses use `ErrorResponse` record
  - _Requirements: 20.2, 20.4_

- [ ] 8. Utility classes
  - [ ] 8.1 Create `util/EmailService.java` using `JavaMailSender`: `sendVerificationEmail(String email, String token)`, `sendPasswordResetEmail(String email, String token)` — use Thymeleaf HTML templates under `resources/templates/email/`
  - [ ] 8.2 Create `util/FileStorageService.java`: `storeFile(MultipartFile, String subDir)` validates MIME (jpeg/png/webp) and size (≤5 MB), saves to `uploads/{subDir}/`, returns relative URL; `deleteFile(String url)`
  - [ ] 8.3 Create `util/RewardCalculator.java`: `checkAndAwardBadge(User)` checks thresholds (BRONZE 100, SILVER 500, GOLD 1000, PLATINUM 5000, EARTH_HERO 10000 points) and awards missing badges; `updateStreak(User)` compares `lastActivityDate` with today
  - _Requirements: 2.7, 4.2, 7.3, 7.4, 8.8_

- [ ] 9. Auth service and controller
  - [ ] 9.1 Create `service/AuthService.java` interface + `service/impl/AuthServiceImpl.java`: `register(RegisterRequest)` → create User with encoded password, generate verification token, call `EmailService.sendVerificationEmail`, return HTTP 201; `verifyEmail(String token)` → set `emailVerified=true`, redirect to login; `login(LoginRequest)` → authenticate, generate JWT pair, return `AuthResponse`; `refreshToken(String)` → validate refresh token, issue new access token; `forgotPassword(String email)` → generate reset token, call `EmailService.sendPasswordResetEmail`; `resetPassword(ResetPasswordRequest)` → validate token/expiry, update password; `changePassword(ChangePasswordRequest, Long userId)`; `updateProfile(UpdateProfileRequest, MultipartFile, Long userId)`
  - [ ] 9.2 Create `controller/AuthController.java` mapping: `POST /api/v1/auth/register`, `GET /api/v1/auth/verify`, `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh`, `POST /api/v1/auth/forgot-password`, `POST /api/v1/auth/reset-password`, `PUT /api/v1/auth/profile` (multipart), `PUT /api/v1/auth/change-password`
  - _Requirements: 2.1–2.8, 3.1–3.7, 4.1–4.6, 5.1–5.5_

- [ ] 10. Task service and controller
  - [ ] 10.1 Create `service/TaskService.java` + `TaskServiceImpl`: `getAvailableTasksForUser(Long userId)` returns tasks not completed today; `completeTask(Long taskId, Long userId)` checks duplicate (409), marks complete, calls `RewardService.awardTaskRewards`, calls `RewardCalculator.checkAndAwardBadge` and `updateStreak`, triggers `NotificationService.createNotification`; `getTaskProgress(Long userId)` returns total/completed/percent
  - [ ] 10.2 Create `controller/TaskController.java`: `GET /api/v1/tasks` (available tasks), `POST /api/v1/tasks/{taskId}/complete`, `GET /api/v1/tasks/progress`; all endpoints require authentication
  - _Requirements: 7.1–7.7_

- [ ] 11. Reward service and controller
  - [ ] 11.1 Create `service/RewardService.java` + `RewardServiceImpl`: `awardTaskRewards(User, Task)` adds points/coins/XP, updates user level, saves `RewardRedemption` ledger entry, calls `NotificationService`; `getUserStats(Long userId)` returns stats DTO; `redeemReward(Long rewardId, Long userId)` checks balance ≥ cost (else 400), deducts, creates redemption, notifies; `getUserBadges(Long userId)`; `getLeaderboard()` returns users sorted by totalPoints desc
  - [ ] 11.2 Create `controller/RewardController.java`: `GET /api/v1/rewards` (store listing), `POST /api/v1/rewards/{rewardId}/redeem`, `GET /api/v1/rewards/stats`, `GET /api/v1/rewards/badges`, `GET /api/v1/rewards/leaderboard`
  - _Requirements: 8.1–8.8_

- [ ] 12. Tree Plantation service and controller
  - [ ] 12.1 Create `service/TreeService.java` + `TreeServiceImpl`: `submitTreePlantation(TreePlantationRequest, MultipartFile, Long userId)` calls `FileStorageService.storeFile`, persists with PENDING status, notifies; `getUserSubmissions(Long userId)`; `approveTreePlantation(Long id)` → status APPROVED, award points, notify; `rejectTreePlantation(Long id, String reason)` → status REJECTED, notify; `getPendingSubmissions()` (admin)
  - [ ] 12.2 Create `controller/TreeController.java`: `POST /api/v1/tree` (multipart), `GET /api/v1/tree/my`; admin endpoints `GET /api/v1/admin/tree-approvals`, `PUT /api/v1/admin/tree-approvals/{id}/approve`, `PUT /api/v1/admin/tree-approvals/{id}/reject`
  - _Requirements: 9.1–9.6_

- [ ] 13. Waste Management service and controller
  - [ ] 13.1 Create `service/WasteService.java` + `WasteServiceImpl`: `submitGarbageReport(GarbageReportRequest, MultipartFile, Long userId)` stores file, persists report, notifies; `getUserReports(Long userId)`; `getAllReports()` (admin); `resolveReport(Long id)` updates status RESOLVED, notifies user
  - [ ] 13.2 Create `controller/WasteController.java`: `POST /api/v1/waste` (multipart), `GET /api/v1/waste/my`; admin endpoints `GET /api/v1/admin/waste-reports`, `PUT /api/v1/admin/waste-reports/{id}/resolve`
  - _Requirements: 10.1–10.5_

- [ ] 14. Challenge service and controller
  - [ ] 14.1 Create `service/ChallengeService.java` + `ChallengeServiceImpl`: `getActiveChallenges()` returns active challenges with participant counts; `joinChallenge(Long challengeId, Long userId)` checks duplicate (409), creates `UserChallenge` IN_PROGRESS, increments participant count, notifies; `completeChallenge(Long userChallengeId)` → COMPLETED, award bonus points, notify; `expireChallenges()` `@Scheduled` job sets EXPIRED for past-deadline IN_PROGRESS entries; admin CRUD: `createChallenge`, `updateChallenge`, `deleteChallenge`
  - [ ] 14.2 Create `controller/ChallengeController.java`: `GET /api/v1/challenges`, `POST /api/v1/challenges/{id}/join`, `GET /api/v1/challenges/my`; admin endpoints under `/api/v1/admin/challenges` (GET/POST/PUT/DELETE)
  - _Requirements: 11.1–11.6_

- [ ] 15. Pollution Tracking service and controller
  - Create `service/PollutionService.java` + `PollutionServiceImpl`: `getPollutionData(String type, LocalDate from, LocalDate to)` returns list of `PollutionDataResponse`; admin CRUD: `createEntry`, `updateEntry`, `deleteEntry`
  - Create `controller/PollutionController.java`: `GET /api/v1/pollution` (query params: type, from, to); admin endpoints under `/api/v1/admin/pollution` (POST/PUT/DELETE)
  - _Requirements: 12.1–12.4_

- [ ] 16. Event service and controller
  - Create `service/EventService.java` + `EventServiceImpl`: `getUpcomingEvents()` returns events ordered by eventDate asc; `registerForEvent(Long eventId, Long userId)` checks seats > 0 (else 400), duplicate (409), decrements seats, creates `Registration`, notifies; `getUserRegisteredEvents(Long userId)`; admin CRUD: `createEvent`, `updateEvent`, `deleteEvent`
  - Create `controller/EventController.java`: `GET /api/v1/events`, `POST /api/v1/events/{id}/register`, `GET /api/v1/events/my`; admin endpoints under `/api/v1/admin/events` (GET/POST/PUT/DELETE)
  - _Requirements: 13.1–13.6_

- [ ] 17. News service and controller
  - Create `service/NewsService.java` + `NewsServiceImpl`: `getNews(String category, String search, Pageable)` returns `Page<NewsResponse>` sorted by publishedAt desc; admin `createNews(NewsRequest)`, `updateNews(Long id, NewsRequest)`, `deleteNews(Long id)`
  - Create `controller/NewsController.java`: `GET /api/v1/news` (public, query params: category, search, page, size), `GET /api/v1/news/{id}`; admin endpoints under `/api/v1/admin/news` (POST/PUT/DELETE)
  - _Requirements: 14.1–14.6_

- [ ] 18. Forum service and controller
  - Create `service/ForumService.java` + `ForumServiceImpl`: `getPosts(String search, Pageable)` returns page of `PostResponse`; `createPost(PostRequest, Long userId)` persists post, returns 201; `deletePost(Long postId, Long userId)` checks ownership (403 if not owner), deletes post + comments cascade, returns 204; `addComment(Long postId, CommentRequest, Long userId)`; `likePost(Long postId, Long userId)` checks duplicate (409), increments likeCount; `getPostWithComments(Long postId)`
  - Create `controller/ForumController.java`: `GET /api/v1/forum/posts`, `POST /api/v1/forum/posts`, `GET /api/v1/forum/posts/{id}`, `DELETE /api/v1/forum/posts/{id}`, `POST /api/v1/forum/posts/{id}/comments`, `POST /api/v1/forum/posts/{id}/like`
  - _Requirements: 15.1–15.7_

- [ ] 19. Notification service and controller
  - Create `service/NotificationService.java` + `NotificationServiceImpl`: `createNotification(Long userId, String title, String message, String type)`; `getUserNotifications(Long userId)` returns list sorted by createdAt desc; `markAsRead(Long notificationId, Long userId)` updates `read=true`; `getUnreadCount(Long userId)`; admin `broadcastNotification(String title, String message)` creates notifications for all users
  - Create `controller/NotificationController.java`: `GET /api/v1/notifications`, `PUT /api/v1/notifications/{id}/read`, `GET /api/v1/notifications/unread-count`; admin `POST /api/v1/admin/notifications/broadcast`
  - _Requirements: 19.1–19.3, 16.3–16.4_

- [ ] 20. Contact service and controller
  - Create `service/ContactService.java` + `ContactServiceImpl`: `submitContact(ContactRequest)` validates email format, persists, returns 201; `getAllContacts()` (admin)
  - Create `controller/ContactController.java`: `POST /api/v1/contact` (public); `GET /api/v1/admin/contacts` (admin)
  - _Requirements: 18.1–18.3_

- [ ] 21. Admin and Dashboard controllers
  - Create `controller/DashboardController.java`: `GET /api/v1/dashboard/stats` returns `DashboardStatsResponse` (totalPoints, redeemedRewards, completedTasks, plantedTrees, wasteReports, activeChallenges, registeredEvents, unreadNotifications) for the authenticated user
  - Create `controller/AdminController.java`: `GET /api/v1/admin/stats` returns `AdminStatsResponse` (totalUsers, totalTasksCompleted, totalTreesPlanted, totalWasteReports, totalChallenges, totalEvents, totalNews); `GET /api/v1/admin/users` (search by username/email query param); `GET /api/v1/admin/users/{id}`, `PUT /api/v1/admin/users/{id}/role`
  - _Requirements: 17.1–17.5_

- [ ] 22. OpenAPI / Swagger configuration
  - Create `config/OpenApiConfig.java` with `@OpenAPIDefinition` setting title "Earth Care App API", version "1.0", and description; configure `SecurityScheme` for Bearer JWT so Swagger UI shows the Authorize button; verify all controller endpoints appear at `/swagger-ui.html`
  - _Requirements: 20.3_

- [ ] 23. Checkpoint — Backend complete
  - Ensure the Spring Boot application starts without errors against the MySQL schema
  - Verify Swagger UI loads at `/swagger-ui.html` and lists all endpoints
  - Ensure all tests pass, ask the user if questions arise.

- [x] 24. Frontend project scaffold
  - Init Vite + React project: `npm create vite@latest frontend -- --template react`
  - Install dependencies: `react-router-dom`, `axios`, `tailwindcss`, `@headlessui/react`, `recharts`, `react-toastify`, `react-hot-toast`, `react-hook-form`, `@hookform/resolvers`, `zod`, `react-icons`, `date-fns`
  - Configure `tailwind.config.js` with custom green-themed color palette (`primary`, `secondary`, `accent`) and dark-mode `class` strategy
  - Create `frontend/.env` with `VITE_API_BASE_URL=http://localhost:8080`
  - Create `src/index.css` importing Tailwind base/components/utilities, plus CSS custom properties for dark mode colors
  - _Requirements: 21.1, 21.8_

- [ ] 25. Frontend core infrastructure
  - [ ] 25.1 Create `src/services/api.js`: Axios instance with `baseURL = import.meta.env.VITE_API_BASE_URL`; request interceptor attaching `Authorization: Bearer <token>` from localStorage or sessionStorage; response interceptor handling 401 → silent refresh via `POST /api/v1/auth/refresh`, retry original request
  - [ ] 25.2 Create `src/context/AuthContext.jsx`: state for `user`, `accessToken`, `isAuthenticated`, `loading`; `login(credentials)` calls `authService.login`, stores tokens per "rememberMe", sets user state; `logout()` clears storage, resets state; `refreshUser()` fetches current user profile; export `useAuth` hook
  - [ ] 25.3 Create `src/context/ThemeContext.jsx`: state for `darkMode` (initialized from localStorage `theme`); `toggleTheme()` flips class on `<html>` element and persists to localStorage; export `useTheme` hook
  - [ ] 25.4 Create all service modules in `src/services/`: `authService.js`, `taskService.js`, `rewardService.js`, `treeService.js`, `wasteService.js`, `challengeService.js`, `pollutionService.js`, `eventService.js`, `newsService.js`, `forumService.js`, `notificationService.js`, `contactService.js` — each exporting typed functions calling the Axios instance
  - [ ] 25.5 Create custom hooks: `src/hooks/useAuth.js` (re-export from context), `useNotifications.js` (polls unread count every 30s), `usePagination.js` (page/size state + handlers)
  - _Requirements: 21.1, 21.2, 21.3, 21.6_

- [ ] 26. Common components
  - [x] 26.1 Create `src/components/common/Navbar.jsx`: logo + nav links (Home, Tasks, Rewards, Challenges, Events, News, Community, Contact); show Login/Register when unauthenticated; show Dashboard, Profile, Admin (if ROLE_ADMIN), Logout when authenticated; notification bell with unread count badge; dark-mode toggle button; fully responsive with mobile hamburger menu
  - [x] 26.2 Create `src/components/common/Footer.jsx`: links, social icons, copyright
  - [x] 26.3 Create `src/components/common/ProtectedRoute.jsx`: reads `isAuthenticated` from `AuthContext`; if false redirects to `/login`; renders `<Outlet />` otherwise
  - [x] 26.4 Create `src/components/common/AdminRoute.jsx`: checks user role includes ROLE_ADMIN; redirects to `/dashboard` if not admin; renders `<Outlet />` otherwise
  - [ ] 26.5 Create `src/components/common/Spinner.jsx` (centered loading spinner) and `src/components/common/Toast.jsx` (wrapper around react-hot-toast)
  - [ ] 26.6 Create `src/components/common/Pagination.jsx` (prev/next + page numbers) and `src/components/common/SearchFilter.jsx` (search input + optional category select)
  - _Requirements: 21.1, 21.4, 21.5, 6.5, 6.6_

- [ ] 27. Home page components and page
  - [ ] 27.1 Create `src/components/home/HeroSection.jsx`: full-viewport hero with title "Earth Care App", tagline "Protect Nature, Save Earth, Build a Greener Future", animated Earth/tree SVG illustrations, "Get Started" and "Join Now" CTA buttons linking to `/register`, "Explore Challenges" button linking to `/challenges`; CSS keyframe animations on background/illustrations
  - [ ] 27.2 Create `src/components/home/StatsSection.jsx`: animated counter cards for eco stats (e.g., trees planted, users, tasks completed)
  - [ ] 27.3 Create `src/components/home/MissionSection.jsx`: mission and vision text with green-themed cards
  - [ ] 27.4 Create `src/components/home/QuotesCarousel.jsx`: auto-rotating carousel of environmental inspirational quotes
  - [x] 27.5 Create `src/pages/public/HomePage.jsx`: compose HeroSection, StatsSection, MissionSection, QuotesCarousel, and a "Featured Green Initiatives" section
  - _Requirements: 1.1–1.8_

- [ ] 28. Auth pages
  - [x] 28.1 Create `src/pages/public/RegisterPage.jsx`: form with Full Name, Username, Email, Mobile Number, Password, Confirm Password, optional profile photo upload; client-side validation (password match, 10-digit mobile, email format); calls `authService.register`; shows success toast and redirects to `/login`
  - [x] 28.2 Create `src/pages/public/LoginPage.jsx`: form with email/username, password, "Remember Me" checkbox; social login placeholder buttons; "Forgot Password" link; calls `authService.login` via `AuthContext.login`; redirects to `/dashboard` on success
  - [ ] 28.3 Create `src/pages/public/ForgotPasswordPage.jsx`: email input form; calls `authService.forgotPassword`; shows confirmation message
  - [ ] 28.4 Create `src/pages/public/ResetPasswordPage.jsx`: reads `?token=` from URL; new password + confirm form; calls `authService.resetPassword`; redirects to `/login` on success
  - _Requirements: 2.1–2.8, 3.1–3.8, 4.1–4.6_

- [x] 29. User dashboard page
  - Create `src/pages/user/DashboardPage.jsx`: fetches `GET /api/v1/dashboard/stats`; displays stat cards (total points, redeemed rewards, completed tasks, planted trees, waste reports, active challenges, registered events, unread notifications); renders `TaskTrendChart` for task completion over time; renders `NotificationPanel` listing recent notifications with read/unread status and mark-as-read action
  - _Requirements: 16.1–16.4_

- [ ] 30. Tasks page
  - Create `src/components/tasks/TaskCard.jsx`: shows task icon, title, description, reward points/coins/XP, "Complete Task" button; disabled state after completion; loading state during submission
  - Create `src/components/tasks/TaskProgressBar.jsx`: shows X of Y tasks completed today with animated progress bar
  - Create `src/pages/user/TasksPage.jsx`: fetches available tasks from `GET /api/v1/tasks`; renders `TaskProgressBar` + grid of `TaskCard`; on complete calls `POST /api/v1/tasks/{id}/complete`; shows congratulations toast with rewards awarded; handles 409 gracefully
  - _Requirements: 7.1–7.7_

- [ ] 31. Rewards page
  - Create `src/components/rewards/RewardCard.jsx`: shows reward image, title, description, point cost, "Redeem" button; disabled if insufficient points
  - Create `src/components/rewards/BadgeGrid.jsx`: shows all 5 badge tiers; earned badges in full color, locked in greyscale with lock icon
  - Create `src/components/rewards/LeaderboardTable.jsx`: ranked table with rank, avatar, username, total points; highlights current user's row
  - Create `src/pages/user/RewardsPage.jsx`: fetches stats (`/api/v1/rewards/stats`), rewards store, badges, leaderboard; renders user stats bar (points, coins, XP, level, streak), `BadgeGrid`, rewards store grid, `LeaderboardTable`; handles redeem action with 400/success feedback
  - _Requirements: 8.1–8.8_

- [ ] 32. Tree Plantation page
  - Create `src/pages/user/TreePlantationPage.jsx`: submission form (photo upload, tree name, location, date, description); calls `POST /api/v1/tree` as multipart/form-data; displays user's submission history table with status chips (PENDING/APPROVED/REJECTED)
  - _Requirements: 9.1–9.5_

- [ ] 33. Waste Report page
  - Create `src/pages/user/WasteReportPage.jsx`: submission form (photo upload, location description, optional GPS coordinates, severity select); calls `POST /api/v1/waste` as multipart; displays user's reports table with status chip and resolved indicator
  - _Requirements: 10.1–10.5_

- [ ] 34. Challenges page
  - Create `src/pages/user/ChallengesPage.jsx`: fetches active challenges; displays challenge cards with title, description, type badge (WEEKLY/MONTHLY), reward points, deadline countdown, participant count, "Join Challenge" button; joined challenges show "In Progress" state; calls `POST /api/v1/challenges/{id}/join`; handles 409
  - _Requirements: 11.1–11.4_

- [ ] 35. Pollution Tracking page
  - Create `src/components/charts/PollutionChart.jsx`: Recharts `LineChart` component accepting `data`, `type`, `label` props
  - Create `src/pages/user/PollutionPage.jsx`: date-range picker; fetches pollution data for air/water/plastic; renders three `PollutionChart` instances side by side in a responsive grid
  - _Requirements: 12.1–12.3_

- [ ] 36. Events page (public + user registration)
  - Create `src/pages/public/EventsPage.jsx`: fetches `GET /api/v1/events`; displays event cards with title, date, location, available seats; "Register" button calls `POST /api/v1/events/{id}/register`; handles 400 (no seats) and 409 (already registered); registered events shown with checkmark
  - _Requirements: 13.1–13.5_

- [ ] 37. News page
  - Create `src/pages/public/NewsPage.jsx`: `SearchFilter` for title search + category dropdown; paginated list of news cards (title, summary, category badge, author, date) via `GET /api/v1/news`; `Pagination` component; responsive grid layout
  - _Requirements: 14.1–14.2, 14.6_

- [ ] 38. Community Forum pages
  - Create `src/components/forum/PostCard.jsx`: shows title, author, date, like count, comment count, "Like" button, link to post detail
  - Create `src/components/forum/CommentList.jsx`: renders list of comments with author and timestamp
  - Create `src/pages/user/CommunityPage.jsx`: `SearchFilter`, paginated post list using `PostCard`; "New Post" form (title + body); calls `POST /api/v1/forum/posts`; handles search + pagination
  - Create `src/pages/user/PostDetailPage.jsx`: fetches `GET /api/v1/forum/posts/:id`; full post body; like button calls `POST /api/v1/forum/posts/{id}/like`; `CommentList`; add comment form; delete post button (shown only to author)
  - _Requirements: 15.1–15.7_

- [ ] 39. Profile page
  - Create `src/pages/user/ProfilePage.jsx`: two sections — "Edit Profile" (Full Name, Mobile Number, profile photo upload with preview) and "Change Password" (current + new + confirm); both sections call respective auth endpoints; success/error toasts
  - _Requirements: 5.1–5.5_

- [ ] 40. Contact page
  - Create `src/pages/public/ContactPage.jsx`: contact form (Full Name, Email, Subject, Message) with react-hook-form + zod validation; calls `POST /api/v1/contact`; success message and form reset on submit
  - _Requirements: 18.1–18.3_

- [ ] 41. Admin Dashboard page
  - Create `src/pages/admin/AdminDashboardPage.jsx`: fetches `GET /api/v1/admin/stats`; stat cards (total users, tasks completed, trees planted, waste reports, challenges, events, news); Recharts `BarChart` for user registrations over time and task completions over time; `PieChart` for module usage distribution; sidebar navigation to all admin sub-pages
  - _Requirements: 17.1–17.2_

- [ ] 42. Admin management pages
  - [ ] 42.1 Create `src/pages/admin/AdminUsersPage.jsx`: searchable table of all users (username, email, role, joined date); search by username/email; role assignment dropdown calling `PUT /api/v1/admin/users/{id}/role`
  - [ ] 42.2 Create `src/pages/admin/AdminNewsPage.jsx`: CRUD table for news articles; "Add News" and "Edit" modal forms with all fields; delete with confirmation; calls admin news endpoints
  - [ ] 42.3 Create `src/pages/admin/AdminEventsPage.jsx`: CRUD table for events; modal form for create/edit; delete confirmation
  - [ ] 42.4 Create `src/pages/admin/AdminChallengesPage.jsx`: CRUD table for challenges; modal form with type select, deadline date picker, reward points input
  - [ ] 42.5 Create `src/pages/admin/AdminTreeApprovalsPage.jsx`: table of PENDING tree submissions with photo thumbnail, user, tree name, location, date; "Approve" and "Reject" (with reason modal) action buttons
  - [ ] 42.6 Create `src/pages/admin/AdminWasteReportsPage.jsx`: table of all waste reports with photo, user, location, severity, status; "Mark Resolved" button
  - [ ] 42.7 Create `src/pages/admin/AdminPollutionPage.jsx`: CRUD table for pollution data entries; form with type select, value, unit, location, recorded-at date
  - [ ] 42.8 Create `src/pages/admin/AdminNotificationsPage.jsx`: "Broadcast Notification" form (title + message); table of sent notifications
  - [ ] 42.9 Create `src/pages/admin/AdminContactsPage.jsx`: read-only table of all contact submissions with sender name, email, subject, message, and timestamp
  - _Requirements: 17.3–17.5, 9.6, 10.3, 11.6, 12.4, 13.6, 14.3–14.5_

- [x] 43. App.jsx — router wiring and theme provider
  - Create `src/App.jsx`: wrap entire app in `ThemeContext.Provider` and `AuthContext.Provider`; define all `<Routes>` per design (public, protected via `ProtectedRoute`, admin via `AdminRoute`); add `<Toaster />` from react-hot-toast at root
  - Create `src/main.jsx`: mount `<App />` into `#root` with `BrowserRouter`
  - _Requirements: 21.1, 21.2_

- [ ] 44. Charts components
  - Create `src/components/charts/TaskTrendChart.jsx`: Recharts `AreaChart` showing task completions per day for the past 30 days; accepts `data` prop of `[{date, count}]`
  - _Requirements: 16.2_

- [ ] 45. Checkpoint — Frontend complete
  - Ensure the Vite dev server starts without errors (`npm run dev`)
  - Verify all routes render correct page components
  - Ensure protected and admin routes redirect correctly when unauthenticated
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 46. README and setup documentation
  - Create `README.md` at project root with: project overview, technology stack table, prerequisites (Java 21, Node 20, MySQL 8, Maven 3.9), step-by-step backend setup (clone, configure `application.properties`, run `mvn spring-boot:run`), step-by-step frontend setup (install deps, configure `.env`, run `npm run dev`), environment variable reference for both backend and frontend, Swagger UI URL, default admin credentials
  - _Requirements: 23.1, 23.5_

- [ ] 47. Final checkpoint
  - Ensure all backend tests pass and the Spring Boot app starts against the MySQL database
  - Ensure all frontend components compile without TypeScript/lint errors
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints at tasks 23, 45, and 47 ensure incremental validation
- The `@Scheduled` expiry job in task 14.1 requires `@EnableScheduling` on the main class
