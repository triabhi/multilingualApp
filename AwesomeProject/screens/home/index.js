import React, { useState, useEffect, } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'

const Home = (props) => {
    return (
        <>
            <Text style={style.wantTxt}>I want too...</Text>
            <View style={style.appBg}>
                <TouchableWithoutFeedback onPress={() => {
                    props.navigation.navigate('Profile')
                }}>
                    <View style={style.container}>
                        <Text style={{ fontSize: 13, color: 'white', alignSelf: 'center' }}>Post a new Place</Text>
                        <Image source={require('../../assets/home.png')}
                            style={{ height: 40, width: 40, borderRadius: 5, alignSelf: 'center', marginTop: 20 }} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={style.containerTwo}>
                    <Text style={{ fontSize: 13, color: 'black', alignSelf: 'center' }}>Find Roommates</Text>
                    <Image source={require('../../assets/foot.png')}
                        style={{ height: 50, width: 40, borderRadius: 5, alignSelf: 'center', marginTop: 20 }} />
                </View>
            </View>
        </>
    )

}

const style = StyleSheet.create({
    appBg: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 50 },
    container: { height: 250, width: 150, justifyContent: 'center', backgroundColor: 'blue', borderRadius: 20, marginHorizontal: 20 },
    containerTwo: { height: 250, width: 150, justifyContent: 'center', backgroundColor: 'grey', borderRadius: 20, marginHorizontal: 20 },
    postTxt: { fontSize: 13, color: 'black' },
    findTxt: { fontSize: 13, color: 'black' },
    wantTxt: { fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start', left: 25, color: 'black', marginVertical: 20 }
})

export default Home
