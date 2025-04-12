import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomSafeAreView from '../../components/ui/CustomSafeAreView'
import LottieView from 'lottie-react-native'
import HomeHeader from '../../components/home/HomeHeader'
import AiPick from '../../components/home/AiPick'

const HomeScreen = () => {
  return (
    <CustomSafeAreView>
      <View style={styles.content}>
        <HomeHeader />

        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContainer}
        >
          <AiPick/>
        </ScrollView>
      </View>

      <LottieView
        source={require('../../assets/animation/music.json')}
        autoPlay
        loop
        enableMergePathsAndroidForKitKatAndAbove
        hardwareAccelerationAndroid
        style={styles.lottie}
      />
    </CustomSafeAreView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  lottie: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    width: 300,
    height: 300,
    opacity: 0.8
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
  scrollContent: {
    marginTop: 20,
    padding: 5
  },
  scrollContainer: {
    paddingBottom: 250
  }
})