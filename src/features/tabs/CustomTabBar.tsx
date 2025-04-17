import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useSharedstate } from './SharedContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { BOTTOM_TAB_HEIGHT, Colors, Fonts } from '../../utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { FavouriteTabIcon, HomeTabIcon, SearchTabIcon } from './TabIcon'

const CustomTabBar: FC<BottomTabBarProps> = (props) => {

    const { translationY } = useSharedstate();
    const { state, navigation } = props;
    const bottom = useSafeAreaInsets();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: -translationY.value }]
        }
    })

    return (
        <Animated.View
            style={[styles.tabBarContainer, {
                paddingBottom: bottom.bottom
            }]}
        >
            {state.routes?.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        onLongPress={onLongPress}
                        onPress={onPress}
                        style={styles.tabItem}
                    >
                        {route.name == 'Home' && <HomeTabIcon focused={isFocused} />}
                        {route.name == 'Search' && <SearchTabIcon focused={isFocused} />}
                        {route.name == 'Favourite' && <FavouriteTabIcon focused={isFocused} />}

                    </TouchableOpacity>
                )
            })}
        </Animated.View>
    )
}

export default CustomTabBar

const styles = StyleSheet.create({
    tabBarContainer: {
        backgroundColor: Colors.backgroundDark,
        width: '100%',
        position: 'absolute',
        height: BOTTOM_TAB_HEIGHT,
        paddingTop: 10,
        bottom: 0,
        zIndex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tabItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30.13%'
    },
    focusedTabItem: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary
    },
    pressedTabItem: {
        opacity: 0.7,
    },
    tabLabel: {
        fontFamily: Fonts.Medium,
        fontSize: RFValue(10),
        color: '#B3B3B3',
    },
    focusedTabLabel: {
        color: '#fff'
    }
})
