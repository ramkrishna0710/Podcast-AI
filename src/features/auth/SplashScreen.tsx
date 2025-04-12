import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../utils/Constants'
import { screenHeight, screenWidth } from '../../utils/Scaling'
import { mmkvStorage } from '../../state/storage'
import { resetAndNavigate } from '../../utils/NavigationUtils'
import CustomStatusBar from '../../components/statusbar/CustomStatusbar'

const SplashScreen = () => {

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const token = mmkvStorage.getItem('token');
      if (token) {
        resetAndNavigate('UserBottomTab');
      } else {
        resetAndNavigate('LoginScreen');
      }
    }, 1000);

    return () => clearTimeout(timeoutId);

  }, []);

  return (
    <View style={styles.container}>
      <CustomStatusBar barStyle="light-content" />
      <Image
        source={require('../../assets/icons/logo.png')}
        style={styles.logoImage}
      />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screenHeight * 0.6,
    width: screenWidth * 0.6,
    resizeMode: 'contain'
  }
})