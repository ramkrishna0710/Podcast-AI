import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { usePlayerStore } from '../../state/usePlayerStore';
import { useSharedstate } from '../../features/tabs/SharedContext';
import { Colors, Fonts } from '../../utils/Constants';
import { fontR, screenHeight, screenWidth } from '../../utils/Scaling';
import VideoPlayer from './VideoPlayer';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../ui/Icon';
import CustomText from '../ui/CustomText';
import ControlsAndDetails from './ControlsAndDetails';

const FullScreenPlayer: FC<{
    progress: number;
    isPlaying: boolean;
    duration: number;
    togglePlayback: any;
    onSetDuration: any;
    handleProgress: any;
    videoRef: any;
    onSeek: any;
}> = ({ progress, isPlaying, duration, togglePlayback, onSetDuration, onSeek, handleProgress, videoRef }) => {

    const [colors] = useState(['#333', '#333'])
    const { currentPlayingPodcast } = usePlayerStore()

    const { collpasePlayer } = useSharedstate();

    return (

        <View style={styles.scrollContainer}>
            {currentPlayingPodcast?.type && (
                <VideoPlayer
                    progress={progress}
                    isPlaying={isPlaying}
                    onSetDuration={(t: any) => onSetDuration(t)}
                    handleProgress={handleProgress}
                    videoRef={videoRef}
                    duration={duration}
                    type={currentPlayingPodcast?.type}
                    uri={
                        currentPlayingPodcast?.type == 'audio'
                            ? currentPlayingPodcast?.audio_uri
                            : currentPlayingPodcast?.video_uri
                    }
                />
            )}
            {currentPlayingPodcast?.type == 'audio' && (
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: currentPlayingPodcast?.artwork }}
                        style={styles.img}
                    />
                </View>
            )}

            <LinearGradient
                colors={[...colors, 'rgba(0,0,0,0.9)']}
                style={styles.gradient}
            />

            <View style={styles.flexRowBetween}>
                <TouchableOpacity onPress={collpasePlayer}>
                    <Icon
                        name='chevron-down-sharp'
                        iconFamily='Ionicons'
                        size={fontR(20)}
                        color='#ccc'
                    />
                </TouchableOpacity>
                <CustomText fontFamily={Fonts.Black} variant='h6'>
                    {currentPlayingPodcast?.artist?.name}
                </CustomText>
                <TouchableOpacity>
                    <Icon
                        name='ellipsis-horizontal-sharp'
                        iconFamily='Ionicons'
                        size={fontR(20)}
                        color='#ccc'
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.albumContainer} />

            <ControlsAndDetails
                duration={duration}
                onSeek={(v: any) => {
                    onSeek(v);
                }}
                togglePlayback={togglePlayback}
                isPlaying={isPlaying}
                progress={progress}
            />

        </View>
    )
}

export default FullScreenPlayer

const styles = StyleSheet.create({
    flexRowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 3,
        justifyContent: 'space-between',
        padding: 10,
        marginTop: Platform.OS === 'ios' ? 50 : 30,
        paddingHorizontal: 15
    },
    scrollContainer: {
        width: '100%',
        backgroundColor: Colors.background,
    },
    albumContainer: {
        width: '100%',
        zIndex: 2,
        height: screenHeight * 0.52,
    },
    gradient: {
        height: screenHeight,
        width: screenWidth,
        zIndex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
    },
    imageContainer: {
        position: 'absolute',
        width: screenWidth * 0.9,
        height: screenHeight * 0.42,
        overflow: 'hidden',
        zIndex: 2,
        borderRadius: 10,
        alignSelf: 'center',
        top: screenHeight * 0.17,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
})