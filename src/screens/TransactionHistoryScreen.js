import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import client from '../api/client';

const TransactionHistoryScreen = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await client.get('/users/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const renderTransaction = ({item}) => (
    <View style={styles.transaction}>
      <Text style={styles.type}>{item.type.toUpperCase()}</Text>
      <Text>Rp {item.amount}</Text>
      <Text>{new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={renderTransaction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  transaction: {padding: 12, borderBottomWidth: 1, borderColor: '#ccc'},
  type: {fontWeight: 'bold', fontSize: 16, marginBottom: 4},
});

export default TransactionHistoryScreen;
