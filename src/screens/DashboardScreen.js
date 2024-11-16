import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';
import {rupiah} from '../utilities/currency';

const DashboardScreen = ({navigation}) => {
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const response = await client.get('/users/balance');
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.replace('Login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.balanceWrapper}>
        <Text style={styles.balance}>Current Balance:{balance}</Text>
        <Text style={styles.balance}>{rupiah(balance)}</Text>
      </View>
      <Button title="Deposit" onPress={() => navigation.navigate('Deposit')} />
      <Button
        title="Withdraw"
        onPress={() => navigation.navigate('Withdraw')}
      />
      <Button
        title="Transaction History"
        onPress={() => navigation.navigate('TransactionHistory')}
      />
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  balance: {fontSize: 18},
  balanceWrapper: {marginBottom: 16},
});

export default DashboardScreen;
