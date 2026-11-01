import { useState, useEffect } from 'react';
import notificationService from '../services/notificationService';

/**
 * Custom hook that polls the unread notification count every 30 seconds
 * Returns the unread notification count
 */
export const useNotifications = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch unread count on mount
    const fetchUnreadCount = async () => {
      try {
        setIsLoading(true);
        const response = await notificationService.getUnreadCount();
        setUnreadCount(response?.count || response || 0);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch unread notification count:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnreadCount();

    // Set up polling interval - every 30 seconds
    const intervalId = setInterval(fetchUnreadCount, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return { unreadCount, isLoading, error };
};
