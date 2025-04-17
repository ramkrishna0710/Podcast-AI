import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { usePlayerStore } from '../../state/usePlayerStore';
import CustomText from '../ui/CustomText';

const PodcastList: FC<{ data: any[]; title: string }> = ({ data, title }) => {

    const { currentPlayingPodcast, user, setCurrentPlayingPodcast, resetPlayer } = usePlayerStore();

    const togglePlayPodcast = async (item: any) => {
        if (currentPlayingPodcast?.id === item.id) {
            resetPlayer();
        } else {
            resetPlayer();
            setCurrentPlayingPodcast(item);
        }
    };

    return (
        <View style={styles.container}>
            <CustomText variant='h4' fontFamily='Satoshi-Medium'>
                {title}
            </CustomText>

            <FlatList
                data={data}
                style={styles.flatListContainer}
                horizontal
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <CustomText variant='h4' fontFamily='Satoshi-Medium'>
                            There are no data
                        </CustomText>
                    </View>
                }
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => togglePlayPodcast(item)}
                        style={styles.imageContainer}>
                        <Image source={{ uri: item?.artwork }} style={styles.image} />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default PodcastList

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    emptyContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        opacity: 0.5,
    },
    imageContainer: {
        marginInline: 10,
    },
    flatListContainer: {
        marginTop: 20,
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 10,
    }
})