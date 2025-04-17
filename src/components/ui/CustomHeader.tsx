import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import CustomText from './CustomText'
import { Fonts } from '../../utils/Constants'
import { fontR } from '../../utils/Scaling'

const CustomHeader: FC<{ title: string }> = ({ title }) => {
    return (
        <View style={styles.flexRow}>
            <CustomText fontFamily={Fonts.Medium} fontSize={fontR(14)}>
                {title}
            </CustomText>
            <Image
                source={require('../../assets/icons/logo.png')}
                style={styles.img}
            />
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    img: {
        width: 140,
        height: 35,
        resizeMode: 'contain',
    },
    flexRow: {
        gap: 10,
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5
    }
})