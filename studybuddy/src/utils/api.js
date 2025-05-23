export async function saveProfile(profileData, token) {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save profile');
      }
  
      return data;
    } catch (error) {
      console.error('Profile save error:', error.message);
      throw error;
    }
  }

  export async function getProfile(token) {
    try {
      const response = await fetch('/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }
  
      return data;
    } catch (error) {
      console.error('Get profile error:', error.message);
      throw error;
    }
  }
  
  