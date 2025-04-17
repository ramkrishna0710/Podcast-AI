import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import CustomSafeAreView from '../../components/ui/CustomSafeAreView'
import { usePlayerStore } from '../../state/usePlayerStore'
import { useQuery } from '@apollo/client'
import { GET_USER_FAVOURITE } from '../../graphQL/queries'
import CustomHeader from '../../components/ui/CustomHeader'
import { fontR, screenHeight } from '../../utils/Scaling'
import CustomText from '../../components/ui/CustomText'
import PodcastItem from '../../components/podcast/PodcastItem'
import Icon from '../../components/ui/Icon'

const FavouriteScreen = () => {

  const { user } = usePlayerStore();

  const { data, loading, error } = useQuery(GET_USER_FAVOURITE, {
    variables: { userId: user?.id },
    skip: !user?.id
  });

  const favoritePodcasts = data?.user?.favoritePodcasts || [];

  const renderPodcastItem = ({ item }: any) => {
    const isFavourite = item.favoriteBy?.length > 0;

    return <PodcastItem item={{ ...item, isFavourite }} />
  }

  if (loading) {
    return (
      <CustomSafeAreView>
        <CustomHeader title='My Favourite' />
        <View style={styles.center}>
          <ActivityIndicator size={'large'} color={'#000'} />
        </View>
      </CustomSafeAreView>
    )
  }

  if (error) {
    return (
      <CustomSafeAreView>
        <CustomHeader title='My Favourite' />
        <View style={styles.center}>
          <CustomText variant='h5'>Failed to load favorites.</CustomText>
        </View>
      </CustomSafeAreView>
    )
  }

  return (
    <CustomSafeAreView>
      <CustomHeader title='My Favourite' />
      <FlatList
        data={favoritePodcasts}
        ListEmptyComponent={
          <View style={styles.container}>
            <Icon name='mic' iconFamily='Ionicons' size={fontR(40)} />
            <CustomText variant='h6' fontFamily='Satoshi-Medium'>No Favourite Podcast Found!</CustomText>
          </View>
        }
        renderItem={renderPodcastItem}
        keyExtractor={(item: any) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 20 }}
      />
    </CustomSafeAreView>
  )
}

export default FavouriteScreen

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})