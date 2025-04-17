import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomSafeAreView from '../../components/ui/CustomSafeAreView'
import LottieView from 'lottie-react-native'
import HomeHeader from '../../components/home/HomeHeader'
import AiPick from '../../components/home/AiPick'
import { usePlayerStore } from '../../state/usePlayerStore'
import { useQuery } from '@apollo/client'
import { GET_TRENDING_AND_TOPPICKS } from '../../graphQL/queries'
import PodcastList from '../../components/home/PodcastList'

const HomeScreen = () => {

  const { user } = usePlayerStore();
  const { data, loading, error } = useQuery(GET_TRENDING_AND_TOPPICKS, {
    variables: { userId: user?.id },
  });

  // console.log(user?.id);
  
  return (
    <CustomSafeAreView>
      <View style={styles.content}>
        <HomeHeader />

        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContainer}
        >
          <AiPick />

          <PodcastList data={data?.topPicks || []} title="Top Picks" />
          <PodcastList data={data?.trending || []} title="Trending" />

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
    marginTop: 15
  },
  scrollContent: {
    marginTop: 20,
    padding: 5
  },
  scrollContainer: {
    paddingBottom: 120
  }
})