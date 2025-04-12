import { SafeAreaView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { Colors } from '../../utils/Constants';

interface CustomSafeAreViewProps {
    children: ReactNode;
    style?: ViewStyle;
}

const CustomSafeAreView: FC<CustomSafeAreViewProps> = ({ children, style }) => {
    return (
        <View style={[styles.container, style]}>
            <SafeAreaView />
            {children}
        </View>
    )
}

export default CustomSafeAreView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 2,
        paddingHorizontal: 5,
        backgroundColor: Colors.background,
    }
})