import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  input: {borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4},
  loading: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Loading;
