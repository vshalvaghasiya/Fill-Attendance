import React from 'react';
import { Platform } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Dashboard from '../pages/Dashboard/Dashboard';
const Navigator = (props) => {
    return (
        <Router
            barButtonIconStyle={{ tintColor: '#000' }}
            navBarButtonColor='#000'
            navigationBarStyle={{
                ...Platform.select({
                    android: {
                        //  marginTop: StatusBar.currentHeight
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    }
                })
            }}
        >
            <Scene key="root">
                <Scene
                    type='reset'
                    key="dashboard"
                    component={Dashboard} hideNavBar={'true'}
                    // initial={props.isLogin}
                />
            </Scene>
        </Router>
    );
};

export default Navigator;
