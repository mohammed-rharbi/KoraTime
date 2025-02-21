import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FootballSpinner = () => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/football-spinner.png')}
        style={[
          styles.football,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};


const LoadingOverlay = ({ theme = 'default' }) => {
  return (
    <View style={styles.overlay}>
      {theme === 'football' ? (
        <FootballSpinner />
      ) : (
        <ActivityIndicator size="large" color="#2ecc71" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  container: {
    alignItems: 'center',
  },
  football: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
});

export default LoadingOverlay;