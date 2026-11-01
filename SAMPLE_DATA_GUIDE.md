# Earth Care App - Sample Data Guide

## Overview
This guide documents all the sample data that has been added to the Earth Care application's database for development and testing purposes.

## Database Initialization

The `backend/src/main/resources/db/init.sql` file contains comprehensive sample data for all application features:

### 1. User Accounts (5 test users)
- **Admin User** (admin@earthcare.com) - Full admin privileges
- **Arjun Sharma** (arjun@example.com) - 1200 points, Level 3
- **Priya Patel** (priya@example.com) - 800 points, Level 2
- **Rahul Verma** (rahul@example.com) - 450 points, Level 2
- **Sneha Singh** (sneha@example.com) - 200 points, Level 1

**Default Password**: `Password@123` (Bcrypt encoded for all users)

### 2. Daily Tasks (9 tasks)
| ID | Title | Category | Points | Coins | XP |
|----|-------|----------|--------|-------|-----|
| 1 | Plant a Tree | PLANTATION | 50 | 25 | 100 |
| 2 | Reduce Plastic Usage | WASTE | 20 | 10 | 40 |
| 3 | Save Water | WATER | 20 | 10 | 40 |
| 4 | Recycle Waste | WASTE | 25 | 12 | 50 |
| 5 | Use Public Transport | TRANSPORT | 30 | 15 | 60 |
| 6 | Clean Surroundings | CLEANLINESS | 40 | 20 | 80 |
| 7 | Save Electricity | ENERGY | 20 | 10 | 40 |
| 8 | Avoid Food Waste | FOOD | 15 | 8 | 30 |
| 9 | Join Environmental Campaign | AWARENESS | 35 | 18 | 70 |

### 3. Rewards Store (30 items)
Rewards are organized by category:

**Eco-Products** (15 items, 50-300 points)
- Bamboo Toothbrush (100 points)
- Organic Cotton T-Shirt (250 points)
- Recycled Notebook (75 points)
- Reusable Coffee Cup (150 points)
- Bamboo Cutlery Set (120 points)
- Hemp Tote Bag (180 points)
- Organic Seeds Pack (50 points)
- Bamboo Steamer (200 points)
- Natural Soap Set (140 points)
- Reusable Shopping Bags (85 points)
- Bamboo Cutting Board (110 points)
- Solar Phone Charger (300 points)
- Biodegradable Phone Case (95 points)
- Reusable Water Bottle (130 points)
- Organic Face Wash (120 points)

**Health & Wellness** (5 items, 90-280 points)
- Herbal Tea Collection (105 points)
- Organic Energy Bars (90 points)
- Yoga Mat (280 points)
- Meditation Cushion (160 points)
- Natural Supplements (140 points)

**Education** (5 items, 75-350 points)
- Eco-Guide eBook Bundle (75 points)
- Sustainability Course (350 points)
- Tree Planting Certificate (200 points)
- Carbon Footprint Analyzer (180 points)
- Environmental Documentary (220 points)

**Vouchers & Special Offers** (5 items, 300-1200 points)
- Amazon Eco-Store Gift Card ₹100 (500 points)
- 20% Discount - Green Products (300 points)
- Tree Planting Sponsorship (400 points)
- Monthly Organic Produce Box (550 points)
- Eco-Resort Weekend Getaway (1200 points)

### 4. Badges (30 badges across 4 tiers)

**BRONZE Badges** (10 badges, 10-200 points)
- Tree Planter (10)
- Water Saver (50)
- Plastic Fighter (75)
- Daily Champion (30)
- Green Start (100)
- Eco Warrior I (200)
- Community Helper (40)
- Waste Master (60)
- Energy Saver (45)
- Sustainable Start (35)

**SILVER Badges** (10 badges, 300-550 points)
- Reforestation Hero (500)
- Conservation Master (400)
- Plastic Terminator (450)
- Consistent Achiever (300)
- Eco Warrior II (500)
- Community Leader (350)
- Waste Recycling Pro (380)
- Energy Conservation Expert (420)
- Carbon Neutral Warrior (550)
- Green Influencer (320)

**GOLD Badges** (7 badges, 1000-1300 points)
- Forest Guardian (1000)
- Water Protector (1100)
- Ocean Savior (1200)
- Daily Streak Master (1000)
- Eco Warrior III (1000)
- Environmental Champion (1150)
- Zero Waste Advocate (1300)

**PLATINUM Badges** (3 badges, 4500-10000 points)
- Mother Earth Protector (5000)
- Global Impact Maker (4500)
- Planet Savior (10000)

### 5. Challenges (30 challenges)

**Daily Challenges** (10 challenges, 10-30 points each)
- No Plastic Day (20 points)
- Water Conservation Hour (15 points)
- Walk Don't Drive (25 points)
- Lights Off Challenge (10 points)
- Plant a Seed (30 points)
- Reuse Challenge (20 points)
- Screen-Free Hour (15 points)
- Compost Challenge (20 points)
- Clean Your Space (15 points)
- Share Knowledge (10 points)

**Weekly Challenges** (10 challenges, 50-100 points each)
- Plastic-Free Day (50 points)
- Save 100L Water (75 points)
- Zero Emission Day (60 points)
- Energy Efficient Home (55 points)
- Plant 5 Trees (100 points)
- Organize Cleanup (70 points)
- Recycle Old Electronics (65 points)
- Sustainable Meals (50 points)
- Volunteer 2 Hours (80 points)
- Spread Awareness (60 points)

**Monthly Challenges** (10 challenges, 120-500 points each)
- Week Without Plastic (200 points)
- Extreme Water Saver (180 points)
- Carbon Neutral Week (250 points)
- Major Cleanup Drive (200 points)
- Plant 100 Trees (500 points)
- Waste Audit (120 points)
- Sustainability Project (250 points)
- Environmental Campaign (300 points)
- Impact Measurement (150 points)
- Zero Waste Month (500 points)

### 6. N-themed content
- Coordinates are actual Indian city locations for accuracy
- Challenge deadlines are set relative to current date (NOW())
- All data is inserted using INSERT IGNORE to prevent conflicts
- Database automatically handles timestamps for created_at/updated_at
- Default locale is set to UTF8MB4 for proper emoji and special character support
**PLANTATION** - Tree planting initiatives
- **WASTE** - Plastic and garbage collection
- **WATER** - Water conservation
- **ENERGY** - Electricity and energy saving
- **TRANSPORT** - Carbon-free transportation
- **CLEANLINESS** - Area cleaning and maintenance
- **FOOD** - Food waste prevention
- **AWARENESS** - Environmental education and advocacy

## Notes

- All sample data uses realistic environmentalpoints per task
**Challenges Reward**: 10-500 points per challenge
**Badges Requirement**: 10-10000 points based on tier
**Rewards Cost**: 50-1200 points to redeem

## Environmental Categories

- Summary

| Entity | Count | Status |
|--------|-------|--------|
| Users | 5 | Active |
| Daily Tasks | 9 | All active |
| Rewards | 30 | All available |
| Badges | 30 | 4 tiers (Bronze, Silver, Gold, Platinum) |
| Challenges | 30 | All active |
| News Articles | 20 | All published |
| Plastic Locations | 20 | All pending completion |
| Events | 5 | All active |
| Tree Plantations | 2 | Mixed (1 approved, 1 pending) |
| Pollution Data Points | 18 | Historical data |

## Point System

**Tasks Reward**: 10-50 y pending locations
POST /api/v1/plastic-locations/{id}/complete      - Mark location as completed
```

## Sample Login Credentials

**Admin User**
```
Username: admin
Email: admin@earthcare.com
Password: Password@123
```

**Test Users**
```
Username: arjun, Email: arjun@example.com, Password: Password@123
Username: priya, Email: priya@example.com, Password: Password@123
Username: rahul, Email: rahul@example.com, Password: Password@123
Username: sneha, Email: sneha@example.com, Password: Password@123
```

## Data     - Get specific news article
GET  /api/v1/news?category=X         - Filter by category
```

### Plastic Locations (Live Tracker)
```
GET  /api/v1/plastic-locations                     - Get all 20 locations
GET  /api/v1/plastic-locations/nearby?latitude=X&longitude=Y&radiusKm=5
                                                    - Get nearby locations within radius
GET  /api/v1/plastic-locations/nearby-pending?latitude=X&longitude=Y&radiusKm=5
                                                    - Get nearbts (points, XP, level, streak)
GET  /api/v1/rewards/badges          - Get 30 badges (earned/not earned status)
GET  /api/v1/rewards/leaderboard     - Get top 50 leaderboard
```

### Challenges
```
GET  /api/v1/challenges              - Get active challenges (30 total)
POST /api/v1/challenges/{id}/join    - Join a challenge
GET  /api/v1/challenges/my           - Get user's challenges
```

### News
```
GET  /api/v1/news                    - Get all news articles (20 articles)
GET  /api/v1/news/{id}           GET  /api/v1/auth/profile            - Get current user profile
PUT  /api/v1/auth/profile            - Update user profile
```

### Tasks
```
GET  /api/v1/tasks                   - Get available tasks (9 tasks)
POST /api/v1/tasks/{id}/complete     - Complete a task
GET  /api/v1/tasks/progress          - Get task progress for day
```

### Rewards
```
GET  /api/v1/rewards                 - Get all 30 rewards
POST /api/v1/rewards/{id}/redeem     - Redeem a reward
GET  /api/v1/rewards/stats           - Get user staples)
- Neem Tree planted in Andheri East, Mumbai (APPROVED)
- Mango Tree planted in Koregaon Park, Pune (PENDING)

### 10. Pollution Data (18 time-series records)
Sample pollution measurements for:
- Air Quality Index (AQI) for Mumbai
- Water pH levels for Mumbai River
- Plastic density (kg/km²) for Juhu Beach

## API Endpoints

### Authentication
```
POST /api/v1/auth/register           - Register new user
POST /api/v1/auth/login              - Login user
POST /api/v1/auth/refresh            - Refresh JWT token
ngitude coordinates
- Difficulty levels (EASY, MEDIUM, HARD)
- Points reward (45-160 points)
- Status: PENDING (available for users to complete)

### 8. Events (5 upcoming events)
- City Clean-Up Drive (Central Park, Mumbai) - 200 seats
- Tree Plantation Marathon (Eco Valley, Pune) - 150 seats
- Climate Awareness Seminar (Town Hall, Bengaluru) - 300 seats
- Plastic-Free Workshop (Community Center, Delhi) - 80 seats
- Solar Energy Expo (Exhibition Center, Chennai) - 500 seats

### 9. Tree Plantation Records (2 samottles, 90 points
- Elliot's Beach (13.0489, 80.2433) - 28 bags, 65 points
- Bessie Beach (13.0445, 80.2636) - 12 microplastics, 45 points

**Bangalore** (4 locations)
- Ulsoor Lake (12.9716, 77.5946) - 70 mixed, 140 points
- Fort Area (12.9352, 77.6245) - 38 bottles, 82 points
- Vidhana Soudha (12.9766, 77.6412) - 22 bags, 55 points

**Delhi** (2 locations)
- Yamuna River (28.7041, 77.1025) - 65 mixed, 130 points
- Lodi Gardens (28.6292, 77.2197) - 48 bottles, 95 points

All locations have:
- Realistic latitude/lo 73.8479) - 60 mixed, 120 points

**Chennai** (4 locations)
- Marina Beach (13.0827, 80.2707) - 55 mixed, 110 points
- Temple Beach (13.1939, 80.1829) - 45 b0760, 72.8777) - 50 bottles, 100 points
- Gateway of India (19.1136, 72.8697) - 30 bags, 75 points
- Thane Coastal Road (19.2183, 72.9781) - 75 mixed, 150 points
- Alibag Beach (19.0176, 73.8994) - 15 microplastics, 50 points
- Osho Garden Area (18.5195, 73.8554) - 35 bottles, 80 points
- Mahim Causeway (19.0760, 72.8860) - 80 mixed, 160 points

**Pune** (4 locations)
- City Center Park (18.5204, 73.8567) - 40 bottles, 85 points
- Viman Nagar (18.5240, 73.9022) - 25 bags, 60 points
- Koregaon Park (18.4758,al-world coordinates across major Indian cities:

**Mumbai** (6 locations)
- Juhu Beach (19.ews Articles (20 articles)
Environmental news covering:
- Reforestation initiatives
- Pollution & climate change
- Renewable energy
- Wildlife conservation
- Urban green initiatives
- Plastic reduction
- Water conservation
- Air quality improvement
- Student environmental movements
- Coastal protection
- Green transport
- Community gardens
- Biodiversity monitoring
- Organic farming
- Solar adoption
- Waste management
- River restoration
- Green business growth

### 7. Plastic Pickup Locations (20 locations)
Re