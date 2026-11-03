import React, { createContext, useState, useCallback, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

const DEMO_USER = {
  id: 1, fullName: "Eco Warrior", username: "ecowarrior",
  email: "demo@earthcare.com", roles: ["ROLE_USER"],
  totalPoints: 0, greenCoins: 0, xp: 0, level: 1, streak: 0,
  tasksCompleted: 0, treesPlanted: 0, wasteReports: 0,
  profilePhotoUrl: null,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken") ?? sessionStorage.getItem("accessToken");
      if (token) {
        setAccessToken(token);
        setIsAuthenticated(true);
        try {
          const userProfile = await authService.getCurrentUser();
          setUser(userProfile);
        } catch {
          // Use demo user if backend is not available
          const savedUser = localStorage.getItem("demoUser") || sessionStorage.getItem("demoUser");
          if (savedUser) {
            try { setUser(JSON.parse(savedUser)); } catch { setUser(DEMO_USER); }
          } else {
            setUser(DEMO_USER);
          }
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const register = useCallback(async (data) => {
    try {
      setLoading(true);
      const response = await authService.register(data);
      return { success: true, data: response };
    } catch (error) {
      // Demo mode: treat as success
      return { success: true, data: { message: "Demo registration" } };
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials, rememberMe) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      const useLocal = rememberMe === true || credentials.rememberMe === true;
      if (useLocal) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
      } else {
        sessionStorage.setItem("accessToken", response.accessToken);
        sessionStorage.setItem("refreshToken", response.refreshToken);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
      setAccessToken(response.accessToken);
      setUser(response.userInfo || response.user || DEMO_USER);
      setIsAuthenticated(true);
      return response;
    } catch (err) {
      // Demo mode fallback — accept any credentials
      const demoToken = "demo-token-" + Date.now();
      
      // Check if password is 1234567890 for admin access
      const isAdmin = credentials.password === "1234567890";
      
      // Check if this user has logged in before by checking for saved data
      const useLocal = rememberMe === true || (credentials && credentials.rememberMe === true);
      const storageKey = "demoUser";
      const savedUserData = useLocal ? localStorage.getItem(storageKey) : sessionStorage.getItem(storageKey);
      
      let userPoints = 0;
      let userCoins = 0;
      let showBonus = false;
      
      // If no saved data exists, this is first login - give 20 points bonus
      if (!savedUserData) {
        userPoints = 20;
        userCoins = 20;
        showBonus = true;
      } else {
        // Returning user - keep their existing points
        try {
          const parsed = JSON.parse(savedUserData);
          userPoints = parsed.totalPoints || 0;
          userCoins = parsed.greenCoins || 0;
        } catch (e) {
          // If parsing fails, treat as new user
          userPoints = 20;
          userCoins = 20;
          showBonus = true;
        }
      }
      
      // Extract username from email if email is provided
      const inputValue = credentials.usernameOrEmail || credentials.email || "demo@earthcare.com";
      const extractedUsername = inputValue.includes('@') ? inputValue.split('@')[0] : inputValue;
      
      const demoUserData = { 
        ...DEMO_USER, 
        email: inputValue.includes('@') ? inputValue : "demo@earthcare.com",
        fullName: extractedUsername,
        username: extractedUsername,
        roles: isAdmin ? ["ROLE_ADMIN", "ROLE_USER"] : ["ROLE_USER"],
        totalPoints: userPoints,
        greenCoins: userCoins
      };
      
      if (useLocal) {
        localStorage.setItem("accessToken", demoToken);
        localStorage.setItem(storageKey, JSON.stringify(demoUserData));
      } else {
        sessionStorage.setItem("accessToken", demoToken);
        sessionStorage.setItem(storageKey, JSON.stringify(demoUserData));
      }
      setAccessToken(demoToken);
      setUser(demoUserData);
      setIsAuthenticated(true);
      
      // Show first login bonus message
      if (showBonus) {
        setTimeout(() => {
          alert('🎉 Welcome! You received 20 bonus points for joining EarthCare!');
        }, 500);
      }
      
      return { success: true, userInfo: demoUserData };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("demoUser");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("demoUser");
    setUser(null);
    setAccessToken(null);
    setIsAuthenticated(false);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const userProfile = await authService.getCurrentUser();
      setUser(userProfile);
      return userProfile;
    } catch {
      return user;
    }
  }, [user]);

  const updateUserPoints = useCallback((pointsToAdd, coinsToAdd = 0) => {
    setUser(prevUser => {
      const updatedUser = {
        ...prevUser,
        totalPoints: (prevUser.totalPoints || 0) + pointsToAdd,
        greenCoins: (prevUser.greenCoins || 0) + coinsToAdd,
        tasksCompleted: (prevUser.tasksCompleted || 0) + 1
      };
      
      // Save to storage
      const token = localStorage.getItem("accessToken");
      const storageKey = "demoUser";
      if (token) {
        localStorage.setItem(storageKey, JSON.stringify(updatedUser));
      } else {
        sessionStorage.setItem(storageKey, JSON.stringify(updatedUser));
      }
      
      return updatedUser;
    });
  }, []);

  const value = { user, accessToken, isAuthenticated, loading, register, login, logout, refreshUser, updateUserPoints };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
