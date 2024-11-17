import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

/**
 * Fungsi untuk memeriksa token JWT.
 * @returns {Promise<boolean>} - Mengembalikan true jika token valid, atau false jika token kedaluwarsa/tidak ada.
 */

export const checkToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
    const decoded = jwtDecode(token);
    // console.log('token_decode', decoded);
    if (!token) {
      return false; // Token tidak ditemukan
    }

    const currentTime = Date.now() / 1000; // Waktu sekarang dalam detik
    if (decoded.exp < currentTime) {
      // Token kedaluwarsa
      await AsyncStorage.removeItem('token'); // Hapus token dari AsyncStorage
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
