import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

/**
 * Fungsi untuk memeriksa token JWT.
 * @returns {Promise<boolean>} - Mengembalikan true jika token valid, atau false jika token kedaluwarsa/tidak ada.
 */

export const checkToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      return false; // Token tidak ditemukan
    }

    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Waktu sekarang dalam detik

    if (decoded.exp < currentTime) {
      // Token kedaluwarsa
      await AsyncStorage.removeItem('accessToken'); // Hapus token dari AsyncStorage
      return false;
    }

    return true; // Token valid
  } catch (error) {
    console.error('Error in checkToken:', error);
    return false;
  }
};

/**
 * Fungsi untuk menghapus token dari AsyncStorage.
 * Dapat digunakan saat logout atau token kedaluwarsa.
 */
export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};
