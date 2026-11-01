# Earth Care App - API Endpoints Checklist

## Authentication Endpoints ✓

### User Registration
- **POST** `/api/v1/auth/register`
- **Status**: ✓ Working
- **Test**: Use any new username/email combination
- **Response**: Returns UserResponse with user details

### User Login  
- **POST** `/api/v1/auth/login`
- **Status**: ✓ Working
- **Test Users**:
  - Email: admin@earthcare.com, Password: Password@123
  - Email: arjun@example.com, Password: Password@123
  - Email: priya@example.com, Password: Password@123
- **Response**: Returns AuthResponse with JWT token and refresh token

### Refresh Token
- **POST** `/api/v1/auth/refresh`
- **Status**: ✓ Working
- **Response**: Returns new JWT token

### Get Current User Profile
- **GET** `/api/v1/auth/profile`
- **Auth Required**: Yes (Bearer Token)
- **Status**: ✓ Working
- **Response**: Returns UserResponse with profile details

### Update User Profile
- **PUT** `/api/v1/auth/profile`
- **Auth Required**: Yes (Bearer Token)
- **Status**: ✓ Working
- **Response**: Returns updated UserResponse

---

## Tasks Endpoints ✓

### Get All Daily Tasks
- **GET** `/api/v1/tasks`
- **Auth Required**: Yes (Bearer Token)
- **Status**: ✓ Working
- **Returns**: 9 daily tasks available
- **Sample Data**: Plant a Tree, Reduce Plastic Usage, Save Water, Recycle Waste, Use Public Transport, Clean Surroundings, Save Electricity, Avoid Food Waste, Join Environmental Campaign
- **Points Range**: 15-50 points per task
- **Response**: List of TaskResponse objects

### Complete a Task
- **POST** `/api/v1/tasks/{taskId}/complete`
- **Auth Required**: Yes (Bearer Token)
- **Status**: ✓ Working
- **Test**: Use taskId 1-9
- **Response**: CompleteTaskResponse with points awarded

### Get Task Progress
- **GET** `/api/v1/tasks/progress`
- **Auth Required**: Yes (Bearer Token)
- **Status**: ✓ Working
- **Response**: TaskProgressResponse with completion stats for the day

---

## Rewards Endpoints ✓

### Get All Rewards
- **GET** `/api/v1/rewards`
- **Status**: ✓ Working
- **Returns**: 30 rewards across 4 categories
  - **Eco-Products** (15 items): Bamboo items, organic products, reusable items (50-300 points)
  - **Health & Wellness** (5 items): Yoga mat, meditation cushion, tea (90-280 points)
  - **Education** (5 items): Courses, ebooks, certificates (75-350 points)
  - **Vouchers** (5 items): Amazon cards, discounts, sponsorships (300-1200 points)
- **Response**: List of RewardResponse objects

### Redeem a Reward
- **POST** `/api/v1/rewards/{rewardId}/redeem`
- **Auth Required**: Yes (Bearer Token)
- **Status**: ✓ Working
- **Test**: Use rewardId 1-35 (30 rewards available)
- **Response**: RedemptionResponse with transaction details

### Get User Stats
- **GET** `/api/v1/rewards/stats`
- **Auth Required**: Yes (Bearer Token)
- **Status**: ✓ Working
- **Returns**: UserStatsResponse with:
  - Total points
  - Green coins
  - XP (Experience points)
  - Current level
  - Streak count
- **Response**: UserStatsResponse object

### Get User Badges
- **GET** `/api/v1/rewards/badges`
- **Auth Required**: Yes (Bearer Token)
- **Status**: ✓ Working
- **Returns**: All 30 badges with earned/not-earned status
  - **BRONZE** (10 badges): 10-200 points required
  - **SILVER** (10 badges): 300-550 points required
  - **GOLD** (7 badges): 1000-1300 points required
  - **PLATINUM** (3 badges): 4500-10000 points required
- **Response**: List of BadgeResponse objects

### Get Leaderboard
- **GET** `/api/v1/rewards/leaderboard`
- **Status**: ✓ Working (No auth required)
- **Returns**: Top 50 users ranked by points
- **Response**: List of LeaderboardEntryResponse objects

---

## Challenges Endpoints ✓

### Get Active Challenges
- **GET** `/api/v1/challenges`
- **Status**: ✓ Working
- **Returns**: 30 active challenges
  - **Daily Challenges** (10): 10-30 points each
  - **Weekly Challenges** (10): 50-100 points each
  - **Monthly Challenges** (10): 120-500 points each
- **Response**: List of ChallengeResponse objects

### Join a Challenge
- **POST** `/api/v1/challenges/{challengeId}/join`
- **Auth Required**: Yes (Bearer Token)
- **Status**: ✓ Working
- **Test**: Use challengeId 1-33 (30 challenges available)
- **Response**: UserChallengeResponse with join status

### Get User's Challenges
- **GET** `/api/v1/challenges/my`
- **Auth Required**: Yes (Bearer Token)
- **Status**: ✓ Working
- **Returns**: Challenges joined by authenticated user
- **Response**: List of UserChallengeResponse objects

---

## News Endpoints ✓

### Get All News Articles
- **GET** `/api/v1/news`
- **Status**: ✓ Working
- **Returns**: All 20 news articles
- **Topics Covered**:
  - Reforestation (tree planting initiatives)
  - Pollution & Climate Change
  - Renewable Energy
  - Wildlife Conservation
  - Urban Green Initiatives
  - Plastic Reduction
  - Water Conservation
  - Air Quality
  - Environmental Education
  - Coastal Protection
  - Green Transport
  - Community Gardens
  - Biodiversity
  - Organic Farming
  - Solar Energy
  - Waste Management
  - River Restoration
  - Business & Economy
- **Response**: PageResponse with news items

### Filter News by Category
- **GET** `/api/v1/news?category={category}`
- **Status**: ✓ Working
- **Parameters**:
  - category (optional): Filter by category like RECYCLING, CLIMATE, OCEAN, ENERGY, etc.
  - search (optional): Search by title/content
  - page (optional): Page number (default: 0)
  - size (optional): Page size (default: 10)
- **Response**: PageResponse with filtered news

### Get News Article by ID
- **GET** `/api/v1/news/{id}`
- **Status**: ✓ Working
- **Test**: Use newsId 1-25 (20 articles available)
- **Response**: NewsResponse with full article details

---

## Plastic Location Endpoints ✓

### Get All Plastic Pickup Locations
- **GET** `/api/v1/plastic-locations`
- **Status**: ✓ Working
- **Returns**: All 20 plastic pickup locations with:
  - Latitude/Longitude coordinates
  - Plastic type (BOTTLES, BAGS, MIXED, MICROPLASTICS)
  - Quantity to clean
  - Points reward (45-160 points)
  - Difficulty level (EASY, MEDIUM, HARD)
  - Location description
- **Response**: List of PlasticLocationResponse objects

### Get Nearby Plastic Locations (Live Tracker)
- **GET** `/api/v1/plastic-locations/nearby?latitude={lat}&longitude={lng}&radiusKm={radius}`
- **Status**: ✓ Working
- **Parameters**:
  - latitude (required): User's latitude
  - longitude (required): User's longitude
  - radiusKm (optional): Search radius in kilometers (default: 5km)
- **Returns**: Locations within specified radius
- **Test**: 
  - Mumbai center: latitude=19.0760, longitude=72.8777, radiusKm=10
  - Pune center: latitude=18.5204, longitude=73.8567, radiusKm=10
  - Chennai center: latitude=13.0827, longitude=80.2707, radiusKm=10
  - Bangalore center: latitude=12.9716, longitude=77.5946, radiusKm=10
  - Delhi center: latitude=28.7041, longitude=77.1025, radiusKm=10
- **Response**: List of nearby PlasticLocationResponse objects

### Get Nearby Pending Locations
- **GET** `/api/v1/plastic-locations/nearby-pending?latitude={lat}&longitude={lng}&radiusKm={radius}`
- **Status**: ✓ Working
- **Parameters**: Same as nearby endpoint
- **Returns**: Only PENDING locations within radius
- **Response**: List of pending PlasticLocationResponse objects

### Get Location Details
- **GET** `/api/v1/plastic-locations/{locationId}`
- **Status**: ✓ Working
- **Test**: Use locationId 1-20 (20 locations available)
- **Response**: Full PlasticLocationResponse with details

### Mark Location as Completed
- **POST** `/api/v1/plastic-locations/{locationId}/complete`
- **Auth Required**: Yes (Bearer Token)
- **Status**: ✓ Working
- **Test**: Use locationId 1-20
- **Response**: Updated PlasticLocationResponse with COMPLETED status

---

## Sample Testing Workflow

### 1. Register & Login
```
POST /api/v1/auth/register
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Test@123456",
  "fullName": "Test User",
  "mobileNumber": "9876543210"
}

POST /api/v1/auth/login
{
  "usernameOrEmail": "test@example.com",
  "password": "Test@123456"
}
```

### 2. Get Available Tasks
```
GET /api/v1/tasks
Headers: Authorization: Bearer {token}
```

### 3. Complete a Task
```
POST /api/v1/tasks/1/complete
Headers: Authorization: Bearer {token}
```

### 4. View Rewards
```
GET /api/v1/rewards
```

### 5. Join a Challenge
```
POST /api/v1/challenges/1/join
Headers: Authorization: Bearer {token}
```

### 6. Find Nearby Plastic Locations
```
GET /api/v1/plastic-locations/nearby?latitude=19.0760&longitude=72.8777&radiusKm=5
```

### 7. Get News Articles
```
GET /api/v1/news?category=REFORESTATION&page=0&size=10
```

---

## Data Summary

| Resource | Count | Status |
|----------|-------|--------|
| Users | 5 | Ready |
| Tasks | 9 | All active |
| Rewards | 30 | All available |
| Badges | 30 | 4 tiers |
| Challenges | 30 | All active |
| News | 20 | All published |
| Plastic Locations | 20 | All pending |
| Events | 5 | All active |

---

## Notes

✓ All endpoints are fully implemented and working
✓ Sample data is comprehensive and realistic
✓ Location data uses real Indian city coordinates
✓ All timestamps are relative to current date
✓ Authentication uses JWT bearer tokens
✓ All sensitive operations require authentication
✓ Pagination is available for large datasets
✓ Filtering and search features are functional
