import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, Alert, AsyncStorage } from 'react-native';
import {
    Container, Header, Title,
    Drawer, Button, Fab, Body, Icon, Left, Right,
    CardItem
} from 'native-base';
import { Actions } from 'react-native-router-flux';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            UserID: '',
            active: false,
            data: [],
            loading: false,
            Total: 0,
        };
    }


    render() {
        return (
            
                <Container>
                    <Header hasTabs>
                        
                        <Body>
                            <Title>Dashboard</Title>
                        </Body>
                        <Right />
                    </Header>

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


export default Dashboard;