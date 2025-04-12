import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { AI_PICK } from '../../graphQL/queries'
import { usePlayerStore } from '../../state/usePlayerStore'
import CustomText from '../ui/CustomText'

const AiPick = () => {

    const { user } = usePlayerStore();
    // console.log('User:', user?.id);
    const [fetching, setFetching] = useState(false)

    const [fetchAI, { data, loading, error }] = useLazyQuery(AI_PICK, {
        variables: { userId: user?.id },
        fetchPolicy: 'network-only'
    });

    const handleFetchAI = async () => {
        setFetching(true);
        try {
            const res = await fetchAI();
            console.log(res?.data)
        } catch (err) {
            console.error(`AI Fetch Error: ${err}`)
        }
        setFetching(false)
    };

    const aiPodcast = data?.getRecommendedPodcasts?.[0];


    // console.log('User ID:', user?.id);
    // console.log('Raw data:', data);
    // console.log('Recommended array:', data?.getRecommendedPodcasts);
    // console.log('AI Podcast:', aiPodcast);
    // console.log('Error:', error);


    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <CustomText variant='h2' fontFamily='Satoshi-Medium'>
                    Let Podcast AI Pick Best for You!
                </CustomText>
                <TouchableOpacity style={styles.button} onPress={handleFetchAI}>
                    <CustomText>Let's go</CustomText>
                </TouchableOpacity>
            </View>
            <View style={styles.section2}>
                {
                    fetching || loading ? (
                        <ActivityIndicator size={'large'} color={'#ccc'} />
                    ) : error ? (
                        <CustomText>
                            Error Fetching AI Pick
                        </CustomText>
                    ) : <TouchableOpacity
                        onPress={() => {
                            if (aiPodcast?.artwork) {

                            } else {
                                handleFetchAI();
                            }
                        }}
                        style={styles.img}
                    >
                        <Image
                            style={styles.img}
                            source={
                                aiPodcast?.artwork
                                    ? { uri: aiPodcast?.artwork }
                                    : require('../../assets/icons/profile.jpeg')
                            }
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default AiPick

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 160,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    section: {
        width: '45%',
    },
    button: {
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#222',
        width: '100%'
    },
    section2: {
        width: '45%',
        borderWidth: 1,
        height: 150,
        borderColor: '#ccc',
        overflow: 'hidden',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})