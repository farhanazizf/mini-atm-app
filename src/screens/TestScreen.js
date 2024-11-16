import React from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Platform,
  View,
} from 'react-native';

const TestScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View>
        <TextInput style={styles.input} placeholder="Type here" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
});

export default TestScreen;
