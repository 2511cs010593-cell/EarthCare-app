# Requirements Document

## Introduction

Earth Care App is a full-stack professional environmental awareness and sustainability platform built with Java 21, Spring Boot 3, Spring Data JPA (Hibernate), Spring Security with JWT, Maven, MySQL, React.js with Vite, and Bootstrap/Tailwind CSS. The platform enables users to complete daily environmental tasks, earn rewards, participate in eco challenges, track pollution, register for events, read eco news, and engage in a community forum — all within a modern green-themed UI. An admin dashboard provides full content management and analytics capabilities.

---

## Glossary

- **System**: The Earth Care App platform (backend + frontend combined)
- **Backend**: The Spring Boot 3 REST API server
- **Frontend**: The React.js + Vite single-page application
- **User**: An authenticated individual with the ROLE_USER role
- **Admin**: An authenticated individual with the ROLE_ADMIN role
- **JWT**: JSON Web Token used for stateless authentication
- **JPA_Layer**: Spring Data JPA / Hibernate persistence layer
- **Auth_Service**: The Spring Security + JWT authentication and authorization module
- **Task_Service**: The backend service managing daily environmental tasks
- **Reward_Service**: The backend service managing points, coins, badges, and redemptions
- **Leaderboard_Service**: The backend service computing and returning user rankings
- **Tree_Service**: The backend service managing tree plantation submissions and admin approval
- **Waste_Service**: The backend service managing garbage/waste reports
- **Challenge_Service**: The backend service managing eco challenges
- **Pollution_Service**: The backend service managing pollution tracking data
- **Event_Service**: The backend service managing environmental events and registrations
- **News_Service**: The backend service managing eco news articles
- **Forum_Service**: The backend service managing community forum posts and comments
- **Notification_Service**: The backend service managing in-app notifications
- **Contact_Service**: The backend service managing contact form submissions
- **DTO**: Data Transfer Object — the payload structure exchanged between Frontend and Backend
- **Swagger**: OpenAPI 3.0 documentation interface served by the Backend
- **XP**: Experience Points awarded to the User upon task completion
- **Green_Coin**: Virtual currency awarded to the User upon task completion
- **Badge**: Achievement icon awarded based on User progress milestones
- **Streak**: Consecutive-day task completion count for a User
- **Dark_Mode**: An optional UI theme that inverts background and foreground colors

---

## Requirements

### Requirement 1: Public Home Page

**User Story:** As a visitor, I want to see an attractive home page with environmental information and navigation, so that I understand the platform's purpose and can decide to join.

#### Acceptance Criteria

1. THE Frontend SHALL render a hero section containing the title "Earth Care App", the tagline "Protect Nature, Save Earth, Build a Greener Future", animated Earth and tree illustrations, and at least one environmental background image.
2. THE Frontend SHALL display a navigation bar with the following links: Home, About, Tasks, Rewards, Challenges, Events, News, Community, Contact, Login, and Sign Up.
3. THE Frontend SHALL render call-to-action buttons labeled "Get Started", "Join Now", and "Explore Challenges" on the home page.
4. THE Frontend SHALL display at least one section each for: eco statistics, mission and vision, inspirational quotes, and featured green initiatives.
5. WHEN a visitor clicks "Get Started" or "Join Now", THE Frontend SHALL navigate the visitor to the Sign Up page.
6. WHEN a visitor clicks "Explore Challenges", THE Frontend SHALL navigate the visitor to the Challenges page.
7. THE Frontend SHALL be fully responsive, rendering correctly on screen widths from 320px to 1920px.

---

### Requirement 2: User Registration

**User Story:** As a visitor, I want to create an account, so that I can access the platform's features.

#### Acceptance Criteria

1. THE Frontend SHALL provide a registration form collecting: Full Name, Username, Email, Mobile Number, Password, Confirm Password, and an optional Profile Photo.
2. WHEN a visitor submits the registration form with all required fields valid, THE Auth_Service SHALL create a new User account with ROLE_USER and return an HTTP 201 response.
3. WHEN a visitor submits the registration form with a duplicate Email or Username, THE Auth_Service SHALL return an HTTP 409 response with a descriptive error message.
4. WHEN a visitor submits the registration form with a Password that does not match Confirm Password, THE Frontend SHALL display a validation error before submission.
5. WHEN a visitor submits the registration form with an Email that does not conform to RFC 5321 format, THE Auth_Service SHALL return an HTTP 400 response with a descriptive error message.
6. WHEN a visitor submits the registration form with a Mobile Number that is not 10 digits, THE Auth_Service SHALL return an HTTP 400 response with a descriptive error message.
7. WHEN a new User account is created, THE Auth_Service SHALL send an email verification link to the registered Email address.
8. WHEN a visitor clicks the email verification link, THE Auth_Service SHALL mark the User account as verified and redirect the visitor to the Login page.

---

### Requirement 3: User Login and Session Management

**User Story:** As a registered User, I want to log in securely and have my session remembered, so that I can access protected features without repeated logins.

#### Acceptance Criteria

1. THE Frontend SHALL provide a login form accepting either Email or Username, Password, and a "Remember Me" checkbox.
2. WHEN a User submits valid credentials, THE Auth_Service SHALL return a signed JWT access token and a refresh token with an HTTP 200 response.
3. WHEN a User submits invalid credentials, THE Auth_Service SHALL return an HTTP 401 response with a descriptive error message.
4. WHEN a User logs in successfully, THE Frontend SHALL store the JWT token and redirect the User to the User Dashboard.
5. WHEN a User checks "Remember Me", THE Frontend SHALL persist the token in localStorage; otherwise THE Frontend SHALL persist the token in sessionStorage.
6. WHEN a JWT token expires, THE Auth_Service SHALL accept a valid refresh token and issue a new JWT access token.
7. WHEN a User clicks Logout, THE Frontend SHALL clear all stored tokens and redirect the User to the home page.
8. THE Frontend SHALL display social login buttons for OAuth providers on the login page.

---

### Requirement 4: Forgot Password and Reset Password

**User Story:** As a User who has forgotten their password, I want to reset it via email, so that I can regain access to my account.

#### Acceptance Criteria

1. THE Frontend SHALL provide a "Forgot Password" link on the login page that navigates to a password-reset request form.
2. WHEN a User submits a valid Email on the password-reset request form, THE Auth_Service SHALL send a password-reset link to that Email and return an HTTP 200 response.
3. WHEN a User submits an Email that does not exist, THE Auth_Service SHALL return an HTTP 404 response with a descriptive error message.
4. WHEN a User clicks the password-reset link, THE Frontend SHALL display a form for entering and confirming a new password.
5. WHEN a User submits a new password via the reset form with a valid token, THE Auth_Service SHALL update the User's password, invalidate the reset token, and return an HTTP 200 response.
6. WHEN a User submits a new password via the reset form with an expired or invalid token, THE Auth_Service SHALL return an HTTP 400 response with a descriptive error message.

---

### Requirement 5: Profile Management and Change Password

**User Story:** As a logged-in User, I want to update my profile and change my password, so that I can keep my account information current and secure.

#### Acceptance Criteria

1. THE Frontend SHALL provide a profile page where the User can update Full Name, Mobile Number, and Profile Photo.
2. WHEN a User submits valid profile updates, THE Auth_Service SHALL persist the changes and return an HTTP 200 response with the updated User DTO.
3. THE Frontend SHALL provide a "Change Password" form requiring Current Password, New Password, and Confirm New Password.
4. WHEN a User submits the change-password form with a correct Current Password and matching new passwords, THE Auth_Service SHALL update the password and return an HTTP 200 response.
5. WHEN a User submits the change-password form with an incorrect Current Password, THE Auth_Service SHALL return an HTTP 400 response with a descriptive error message.

---

### Requirement 6: Role-Based Access Control

**User Story:** As a system operator, I want routes and API endpoints to be protected by role, so that Users cannot access Admin functionality.

#### Acceptance Criteria

1. THE Auth_Service SHALL assign ROLE_USER to all newly registered accounts.
2. THE Auth_Service SHALL assign ROLE_ADMIN only to accounts explicitly promoted by an existing Admin.
3. WHEN a User attempts to access an Admin-only API endpoint, THE Auth_Service SHALL return an HTTP 403 response.
4. WHEN an unauthenticated visitor attempts to access a protected API endpoint, THE Auth_Service SHALL return an HTTP 401 response.
5. THE Frontend SHALL guard all protected routes; WHEN an unauthenticated visitor navigates to a protected route, THE Frontend SHALL redirect them to the Login page.
6. THE Frontend SHALL display Admin Dashboard navigation only to Users with ROLE_ADMIN.

---

### Requirement 7: Daily Environmental Tasks

**User Story:** As a logged-in User, I want to view and complete daily environmental tasks, so that I can earn rewards and contribute to sustainability.

#### Acceptance Criteria

1. THE Frontend SHALL display a Tasks page listing daily tasks including: Planting Trees, Reducing Plastic Usage, Saving Water, Recycling Waste, Using Public Transport, Cleaning Surroundings, Saving Electricity, Avoiding Food Waste, and Participating in Environmental Campaigns.
2. WHEN a User views the Tasks page, THE Task_Service SHALL return only tasks not yet completed by that User for the current calendar day.
3. WHEN a User clicks "Complete Task" on a task, THE Task_Service SHALL mark that task as completed for the User on the current date and invoke THE Reward_Service to award reward points, Green Coins, XP, and an appropriate Badge if a milestone is reached.
4. WHEN THE Reward_Service awards points, it SHALL record the transaction in the RewardRedemptions ledger and update the User's total reward points, Green Coin balance, and XP.
5. WHEN a task is completed, THE Frontend SHALL display a congratulations message and show the points, Green Coins, XP, and any Badge awarded.
6. WHEN a User attempts to complete the same task twice on the same calendar day, THE Task_Service SHALL return an HTTP 409 response.
7. THE Frontend SHALL display a progress bar indicating how many of the day's tasks the User has completed.

---

### Requirement 8: Rewards System

**User Story:** As a User, I want to view my earned rewards and redeem them for valuable items, so that I am motivated to continue eco-friendly behavior.

#### Acceptance Criteria

1. THE Frontend SHALL provide a Rewards page displaying the User's total reward points, Green Coin balance, XP, current level, current Streak, and progress bar toward the next level.
2. THE Frontend SHALL display a Rewards Store listing redeemable items: gift vouchers, discount coupons, eco-friendly products, tree plantation certificates, and special rewards, each showing the required point cost.
3. WHEN a User clicks "Redeem" on a store item and the User's reward points are greater than or equal to the item cost, THE Reward_Service SHALL deduct the points, create a redemption record, and return an HTTP 200 response.
4. WHEN a User clicks "Redeem" on a store item and the User's reward points are less than the item cost, THE Reward_Service SHALL return an HTTP 400 response with a descriptive error message.
5. THE Frontend SHALL display the User's earned Badges: Bronze, Silver, Gold, Platinum, and Earth Hero, with locked badges shown in greyscale.
6. THE Frontend SHALL display a Leaderboard showing the top-ranked Users by total reward points, including rank, username, and points.
7. WHEN THE Leaderboard_Service receives a leaderboard request, THE Leaderboard_Service SHALL return users sorted by total reward points in descending order.
8. WHEN a User maintains a Streak of 7 or more consecutive days, THE Reward_Service SHALL award a streak bonus reward.

---

### Requirement 9: Tree Plantation Module

**User Story:** As a User, I want to submit tree plantation records with photos and details for admin approval, so that my contribution is verified and rewarded.

#### Acceptance Criteria

1. THE Frontend SHALL provide a Tree Plantation submission form accepting: tree photo (image file), tree name, location, plantation date, and description.
2. WHEN a User submits a valid tree plantation record, THE Tree_Service SHALL persist the record with status PENDING and return an HTTP 201 response.
3. WHEN an Admin approves a pending tree plantation record, THE Tree_Service SHALL update the record status to APPROVED and invoke THE Reward_Service to award points to the submitting User.
4. WHEN an Admin rejects a pending tree plantation record, THE Tree_Service SHALL update the record status to REJECTED and store the rejection reason.
5. THE Frontend SHALL display the User's submitted tree plantation records with their current approval status.
6. THE Admin Dashboard SHALL display all PENDING tree plantation records with options to approve or reject each.

---

### Requirement 10: Waste Management Module

**User Story:** As a User, I want to report garbage and waste locations with photos, so that authorities and the community are informed.

#### Acceptance Criteria

1. THE Frontend SHALL provide a Waste Report submission form accepting: garbage photo (image file), location description, GPS coordinates (optional), and severity level.
2. WHEN a User submits a valid waste report, THE Waste_Service SHALL persist the record and return an HTTP 201 response.
3. THE Admin Dashboard SHALL list all submitted waste reports with options to mark each as RESOLVED or PENDING.
4. WHEN an Admin marks a waste report as RESOLVED, THE Waste_Service SHALL update the record status and invoke THE Notification_Service to notify the reporting User.
5. THE Frontend SHALL display the User's submitted waste reports with their current status.

---

### Requirement 11: Eco Challenges Module

**User Story:** As a User, I want to join weekly and monthly eco challenges, so that I can earn extra rewards and stay engaged.

#### Acceptance Criteria

1. THE Frontend SHALL display a Challenges page listing active weekly and monthly eco challenges, each showing title, description, reward points, deadline, and number of participants.
2. WHEN a User clicks "Join Challenge", THE Challenge_Service SHALL create a UserChallenge record linking the User to the Challenge with status IN_PROGRESS and return an HTTP 201 response.
3. WHEN a User has already joined a Challenge, THE Challenge_Service SHALL return an HTTP 409 response if the User attempts to join again.
4. WHEN a User completes all required tasks of a Challenge before the deadline, THE Challenge_Service SHALL update the UserChallenge status to COMPLETED and invoke THE Reward_Service to award the challenge bonus points.
5. WHEN a Challenge deadline passes and a User has not completed it, THE Challenge_Service SHALL update the UserChallenge status to EXPIRED.
6. THE Admin Dashboard SHALL provide CRUD operations for Challenges including creating, reading, updating, and deleting challenge records.

---

### Requirement 12: Pollution Tracking Module

**User Story:** As a User, I want to view pollution data visualized as charts, so that I can understand environmental conditions.

#### Acceptance Criteria

1. THE Frontend SHALL display a Pollution Tracking page with charts for air pollution, water pollution, and plastic pollution levels.
2. THE Pollution_Service SHALL expose an endpoint returning pollution metrics by type (air, water, plastic) and time period.
3. WHEN the Frontend requests pollution data, THE Pollution_Service SHALL return data as a JSON array of time-series records suitable for chart rendering.
4. THE Admin Dashboard SHALL provide CRUD operations for pollution data entries.

---

### Requirement 13: Environmental Events Module

**User Story:** As a User, I want to browse and register for environmental events, so that I can participate in community activities.

#### Acceptance Criteria

1. THE Frontend SHALL display an Events page listing upcoming events with title, description, date, location, and available seats.
2. WHEN a User clicks "Register" on an event and available seats are greater than zero, THE Event_Service SHALL create a Registration record and decrement available seats, then return an HTTP 201 response.
3. WHEN a User attempts to register for an event with zero available seats, THE Event_Service SHALL return an HTTP 400 response with a descriptive error message.
4. WHEN a User attempts to register for the same event twice, THE Event_Service SHALL return an HTTP 409 response.
5. THE Frontend SHALL display the User's registered events on the User Dashboard.
6. THE Admin Dashboard SHALL provide CRUD operations for Events.

---

### Requirement 14: Eco News Module

**User Story:** As a User, I want to read eco news articles, and as an Admin I want to manage them, so that the community stays informed.

#### Acceptance Criteria

1. THE Frontend SHALL display a News page listing eco news articles with title, summary, category, author, and publication date.
2. WHEN a visitor or User requests the news list, THE News_Service SHALL return paginated news articles sorted by publication date descending.
3. WHEN an Admin creates a news article with valid data, THE News_Service SHALL persist the article and return an HTTP 201 response.
4. WHEN an Admin updates a news article, THE News_Service SHALL persist the changes and return an HTTP 200 response with the updated article DTO.
5. WHEN an Admin deletes a news article, THE News_Service SHALL remove the record and return an HTTP 204 response.
6. THE Frontend SHALL support search and category filter for news articles.

---

### Requirement 15: Community Forum Module

**User Story:** As a User, I want to create posts, comment, and like content in a community forum, so that I can share eco-friendly ideas with others.

#### Acceptance Criteria

1. THE Frontend SHALL display a Community page listing forum posts with title, author, creation date, like count, and comment count.
2. WHEN a User submits a new forum post with a title and body, THE Forum_Service SHALL persist the post and return an HTTP 201 response.
3. WHEN a User submits a comment on a post, THE Forum_Service SHALL persist the comment linked to the post and return an HTTP 201 response.
4. WHEN a User clicks "Like" on a post, THE Forum_Service SHALL increment the like count for that post and record the User's like, then return an HTTP 200 response.
5. WHEN a User attempts to like the same post twice, THE Forum_Service SHALL return an HTTP 409 response.
6. THE Frontend SHALL support search and pagination for forum posts.
7. WHEN a User deletes their own post, THE Forum_Service SHALL remove the post and all associated comments, then return an HTTP 204 response.

---

### Requirement 16: User Dashboard

**User Story:** As a logged-in User, I want a personal dashboard summarizing my activity, so that I can track my progress at a glance.

#### Acceptance Criteria

1. THE Frontend SHALL render a User Dashboard displaying: total reward points, redeemed rewards count, completed tasks count, planted trees count, submitted waste reports count, active challenges count, registered events count, and unread notifications count.
2. THE Frontend SHALL display analytics charts on the User Dashboard showing task completion trends over time.
3. THE Frontend SHALL display a Notifications panel listing the User's recent notifications with read/unread status.
4. WHEN a User marks a notification as read, THE Notification_Service SHALL update the notification status and return an HTTP 200 response.

---

### Requirement 17: Admin Dashboard

**User Story:** As an Admin, I want a comprehensive dashboard to manage all platform content and view analytics, so that I can keep the platform running effectively.

#### Acceptance Criteria

1. THE Frontend SHALL render an Admin Dashboard accessible only to ROLE_ADMIN Users displaying: total registered users, total tasks completed, total trees planted, total waste reports, total active challenges, total events, and total news articles.
2. THE Admin Dashboard SHALL display graphical analytics charts for user registrations over time, task completions over time, and module usage distribution.
3. THE Admin Dashboard SHALL provide management interfaces for: Users, News, Garbage Reports, Challenges, Events, Notifications, Tree Plantation approvals, and Pollution data.
4. WHEN an Admin searches for a User by username or email, THE Auth_Service SHALL return matching User records.
5. THE Admin Dashboard SHALL display all Contact form submissions with sender name, email, subject, and message.

---

### Requirement 18: Contact Module

**User Story:** As a visitor or User, I want to submit a contact message to the platform team, so that I can ask questions or report issues.

#### Acceptance Criteria

1. THE Frontend SHALL display a Contact page with a form collecting: Full Name, Email, Subject, and Message.
2. WHEN a visitor or User submits a valid contact form, THE Contact_Service SHALL persist the submission and return an HTTP 201 response.
3. WHEN a visitor or User submits the contact form with an invalid Email format, THE Contact_Service SHALL return an HTTP 400 response with a descriptive error message.

---

### Requirement 19: Notifications System

**User Story:** As a User, I want to receive in-app notifications for key events, so that I stay informed about my activity and platform updates.

#### Acceptance Criteria

1. THE Notification_Service SHALL create a notification for the User WHEN any of the following events occur: task completion, badge awarded, reward redeemed, challenge status change, waste report status change, tree plantation approval or rejection, and event registration confirmation.
2. THE Frontend SHALL display a notification bell icon in the navigation bar showing the count of unread notifications.
3. WHEN a User opens the notifications panel, THE Notification_Service SHALL return all notifications for that User sorted by creation date descending.

---

### Requirement 20: Backend Architecture and API Standards

**User Story:** As a developer, I want the backend to follow a consistent architecture with full documentation, so that the system is maintainable and integrable.

#### Acceptance Criteria

1. THE Backend SHALL implement a layered MVC architecture with distinct Entity, Repository, Service, Controller, and DTO layers for every module.
2. THE Backend SHALL implement a global exception handler using @ControllerAdvice that maps all application exceptions to structured JSON error responses with HTTP status, error code, and message fields.
3. THE Backend SHALL expose Swagger/OpenAPI 3.0 documentation at the /swagger-ui.html endpoint listing all REST API endpoints with request/response schemas.
4. THE Backend SHALL validate all incoming DTO fields using Jakarta Bean Validation annotations and return HTTP 400 with field-level error details for validation failures.
5. THE Backend SHALL secure all non-public REST API endpoints with JWT Bearer token authentication.
6. THE JPA_Layer SHALL use a MySQL database with proper foreign key relationships, indexes on frequently queried columns, and cascade rules defined per entity relationship.

---

### Requirement 21: Frontend Architecture and UX Standards

**User Story:** As a developer, I want the frontend to follow consistent patterns with good UX features, so that the application is maintainable and pleasant to use.

#### Acceptance Criteria

1. THE Frontend SHALL use React Router for all client-side routing with protected route wrappers that redirect unauthenticated Users to the login page.
2. THE Frontend SHALL use React Context API for global state management of authentication state and user profile data.
3. THE Frontend SHALL use Axios for all HTTP requests to the Backend, with a configured interceptor that attaches the JWT Bearer token to every authenticated request.
4. THE Frontend SHALL display toast notifications for success, error, and informational events.
5. THE Frontend SHALL display loading spinners or skeleton screens during data-fetching operations.
6. THE Frontend SHALL support Dark Mode toggle, persisting the user's preference in localStorage.
7. THE Frontend SHALL implement search, filter, and pagination controls on all list pages (Tasks, News, Challenges, Events, Forum, Leaderboard).
8. THE Frontend SHALL apply a green-themed color palette with CSS animations on the home page and key UI elements.

---

### Requirement 22: Database Schema

**User Story:** As a developer, I want a complete, normalized MySQL database schema with sample data, so that the application can be set up and demonstrated immediately.

#### Acceptance Criteria

1. THE JPA_Layer SHALL define the following tables: Users, Roles, User_Roles, Tasks, User_Tasks, Rewards, RewardRedemptions, Badges, User_Badges, TreePlantation, GarbageReports, Challenges, UserChallenges, Events, Registrations, News, Posts, Comments, Post_Likes, Notifications, Leaderboard, Contacts, PollutionData.
2. THE JPA_Layer SHALL define foreign key relationships between all related tables as specified in the ER Diagram.
3. THE Backend SHALL include a SQL initialization script providing sample data for all tables sufficient to demonstrate all features.
4. WHEN the Backend starts with a fresh database, THE JPA_Layer SHALL apply all schema migrations without manual intervention.

---

### Requirement 23: Deliverables and Documentation

**User Story:** As a project evaluator, I want complete documentation and diagrams alongside the source code, so that the project can be understood, set up, and evaluated.

#### Acceptance Criteria

1. THE System SHALL include a README.md file with project overview, technology stack, prerequisites, setup instructions for backend and frontend, and environment variable reference.
2. THE System SHALL include a Maven pom.xml configured with all required dependencies for Spring Boot 3, Spring Security, Spring Data JPA, MySQL Connector, Lombok, MapStruct, SpringDoc OpenAPI, and JWT libraries.
3. THE System SHALL include the following diagrams: ER Diagram, Use Case Diagram, Class Diagram, Sequence Diagram, DFD Level 0, DFD Level 1, and Architecture Diagram.
4. THE System SHALL include a professional project report covering introduction, objectives, system analysis, design, implementation, testing, and conclusion sections.
5. THE System SHALL be runnable in IntelliJ IDEA or Eclipse by following only the steps described in the README.md.
