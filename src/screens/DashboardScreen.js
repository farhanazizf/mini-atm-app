import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';
import {rupiah} from '../utilities/currency';
import Toast from 'react-native-toast-message';

const DashboardScreen = ({navigation}) => {
  const [balance, setBalance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBalance = useCallback(async () => {
    try {
      const response = await client.get('/users/balance');
      setBalance(response.data.balance);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Fetch Failed',
        text2: error.response?.data?.error || 'Please try again.',
      });

      if (error.status === 403) {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
      }
    }
  }, [navigation]);

  // Pull-to-refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBalance();
    setRefreshing(false);
  }, [fetchBalance]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.replace('Login');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: error.response?.data?.error || 'Please try again.',
      });
    }
  };

  useEffect(() => {
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.main}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        <View style={styles.balanceWrapper}>
          <Text style={styles.balance}>Current Balance</Text>
          <Text style={styles.balance}>{rupiah(balance)}</Text>
        </View>

        <TouchableHighlight style={styles.button}>
          <Button
            title="Deposit"
            onPress={() => navigation.navigate('Deposit')}
          />
        </TouchableHighlight>

        <TouchableHighlight style={styles.button}>
          <Button
            title="Withdraw"
            onPress={() => navigation.navigate('Withdraw')}
          />
        </TouchableHighlight>

        <TouchableHighlight style={styles.button}>
          <Button
            title="Transaction History"
            onPress={() => navigation.navigate('TransactionHistory')}
          />
        </TouchableHighlight>

        <TouchableHighlight style={styles.button}>
          <Button title="Logout" onPress={handleLogout} color="red" />
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {flex: 1, justifyContent: 'center', padding: 16},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  balance: {fontSize: 18},
  balanceWrapper: {
    marginBottom: 16,
    flex: 'flex',
    alignItems: 'center',
  },
  button: {
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default DashboardScreen;
