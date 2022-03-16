import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Switch
} from 'react-native';

import MainLayout from "./MainLayout";
import { HeaderBar } from "../components";
import { COLORS, SIZES, FONTS, icons, dummyData } from "../constants";

const SectionTitle = ({title}) => {
    return (
        <View
            style={{
                marginTop: SIZES.padding
            }}
        >
            <Text
                style={{
                    color: COLORS.lightGray3,
                    ...FONTS.h4
                }}
            >
                {title}
            </Text>
        </View>
    )
}

const Setting = ({title, value, type, onPress}) =>{
    if (type == "button") {

        return (
            <TouchableOpacity 
                style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center'
                }}
                onPress={onPress}
            >
                <Text
                    style={{
                        flex: 1,
                        color: COLORS.white,
                        ...FONTS.h3
                    }}
                >
                    {title}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            marginRight: SIZES.radius,
                            color: COLORS.lightGray3,
                            ...FONTS.h3
                        }}
                    >
                        {value}
                    </Text>
                    <Image 
                        source={icons.rightArrow}
                        style={{
                            height: 15,
                            width: 15,
                            tintColor: COLORS.white
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    } else {

        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        flex: 1,
                        color: COLORS.white,
                        ...FONTS.h3
                    }}
                >
                    {title}
                </Text>
                <Switch 
                    value={value}
                    onValueChange={(value) => onPress(value)}
                />
            </View>
        )
    }
}

const Profile = () => {

    const [faceID, setFaceID] = useState(true);

    return (
        <MainLayout>
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: COLORS.black
                }}
            >
                {/*Header*/}
                {<HeaderBar title='Profile'/>}

                {/*detail*/}
                <ScrollView>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.radius
                        }}
                    >
                        {/*Email && ID*/}
                            <View
                                style={{
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        ...FONTS.h3
                                    }}
                                >
                                    {dummyData.profile.email}
                                </Text>
                                <Text
                                    style={{
                                        color: COLORS.lightGray3,
                                        ...FONTS.body4
                                    }}
                                >
                                    ID: {dummyData.profile.id}
                                </Text>
                            </View>
                        {/*status*/}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >   
                                <Image 
                                    source={icons.verified}
                                    style={{
                                        width: 25,
                                        height: 25
                                    }}
                                />
                                <Text
                                    style={{
                                        marginLeft: SIZES.base,
                                        color: COLORS.lightGreen,
                                        ...FONTS.body4
                                    }}
                                >
                                    Verified
                                </Text>
                            </View>
                        </View>
                        {/*APP*/}
                        <SectionTitle 
                            title="APP" 
                        />
                        <Setting 
                            title="Launch Screen"
                            value="Home"
                            type="button"
                            onPress={()=> console.log("Home pressed")}
                        />
                        <Setting 
                            title="Appearance"
                            value="Dark"
                            type="button"
                            onPress={()=> console.log("Appearance pressed")}
                        />
                        {/*ACCOUNT*/}
                        <SectionTitle 
                            title="ACCOUNT" 
                        />
                        <Setting 
                            title="Payment currency"
                            value="USD"
                            type="button"
                            onPress={()=> console.log("Payment currency pressed")}
                        />
                        <Setting 
                            title="Language"
                            value="Englis"
                            type="button"
                            onPress={()=> console.log("Language pressed")}
                        />
                        {/*SECURITY*/}
                        <SectionTitle 
                            title="SECURITY" 
                        />
                        <Setting 
                            title="FaceID"
                            value={faceID}
                            type="switch"
                            onPress={(value)=> setFaceID(value)}
                        />
                        <Setting 
                            title="Password setting"
                            value=""
                            type="button"
                            onPress={()=> console.log("Password setting pressed")}
                        />
                        <Setting 
                            title="Change password"
                            value=""
                            type="button"
                            onPress={()=> console.log("Change password pressed")}
                        />
                        <Setting 
                            title="2-Factor Authentication"
                            value=""
                            type="button"
                            onPress={()=> console.log("2-FA pressed")}
                        />

                </ScrollView>
            </View>
            </MainLayout>
    )
}

export default Profile;