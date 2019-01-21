import React, { Component } from 'react';
import { Platform, View, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import {
    Container, Header, Title,
    Drawer, Button, Fab, Body, Icon, Left, Right,
    CardItem
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import { scanImage } from '../../helper/Constant';
class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            UserID: '',
        };
    }


    render() {
        const { margin } = styles;
        return (
            <Container>
                <Header hasTabs>

                    <Body>
                        <Title>Dashboard</Title>
                    </Body>
                    <Right />
                </Header>

                <ScrollView style={margin}>
                    <View style={{flexDirection:'row', marginLeft: 40, marginRight: 40}}>
                        <View>
                            <TouchableOpacity
                                style={styles.fingerprint}
                            >
                                <Image source={scanImage} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center', marginTop: 10 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>User Enter</Text>
                            </View>
                        </View>
                       <View style={{flex:1}}></View> 
                        <View>
                            <TouchableOpacity
                                style={styles.fingerprint}
                            >
                                <Image source={scanImage} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center', marginTop: 10 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>User Exit</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={{ width: 50, height: 50, position: 'absolute', right: 0, bottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                    >
                        <Icon
                            type='Entypo'
                            name="share" />
                    </Fab>
                </View>

            </Container>
        );
    }
}

const styles = {
    margin: {
        margin: 20,
    }
};

export default Dashboard;