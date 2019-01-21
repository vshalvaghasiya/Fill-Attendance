import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, Alert, AsyncStorage } from 'react-native';
import {
    Container, Header, Title,
    Drawer, Button, Fab, Body, Icon, Left, Right,
    CardItem
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import { Spinner } from '../../common/Spinner';

import CardTransaction from '../../cards/CardTransactionList';
import SideBar from '../../Drawer/SideBar';
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
        this._ViewPDF = this._ViewPDF.bind(this);
        this.editRecord = this.editRecord.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
    }

    componentWillMount() {
        AsyncStorage.getItem('userID').then((value) => {
            this.setState({ UserID: value });
            this.GetTransaction();
        }).done();
    }

    getLstDayOfMonFnc(date) {
        return new Date(date.getDate(), date.getMonth(), 0).getDate()
    }

    GetTransaction() {
        this.setState({ loading: true });
        const MyObject = Parse.Object.extend('DailyReport');
        const query = new Parse.Query(MyObject);
        query.descending('BillDate');
        query.equalTo("UserID", this.state.UserID);
        query.limit = 1000;
        query.find().then((results) => {
            this.setState({ loading: false });
            this.setState({ data: results });
            var msgTotal = results.reduce(function (prev, cur) {
                return Number(prev) + Number(cur.get('Price'));
            }, 0);
            this.setState({ Total: msgTotal });
        }, (error) => {
            this.setState({ loading: false });
            console.error(error);
        });
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    _ViewPDF(PDF) {
        if (!!PDF) {
            Actions.viewPDF({ PDF: PDF._url });
        } else {
            Alert.alert('Message..!', 'Bill not found');
        }
    }

    deleteRecord(data) {
        Alert.alert(
            'Are you sure delete?',
            '',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.actionSheet(data) },
            ],
            { cancelable: false }
        )
    }

    actionSheet(data) {
        this.setState({ loading: true });
        const MyObject = Parse.Object.extend('DailyReport');
        const query = new Parse.Query(MyObject);
        query.get(data.id).then((object) => {
            object.destroy().then((response) => {
                var date = new Date(data.get('BillDate'));
                const obj = Parse.Object.extend('Monthly');
                const query1 = new Parse.Query(obj);
                let selectedMonth = date.getMonth() + 1;
                query1.equalTo("ID", selectedMonth.toString());
                query1.find().then((results) => {
                    let total = Number(results[0].get('Total')) - Number(data.get('Price'));
                    const MyObject = Parse.Object.extend('Monthly');
                    const query2 = new Parse.Query(MyObject);
                    query2.get(results[0].id).then((object) => {
                        object.set("Total", total.toString());
                        object.save().then((response) => {
                            this.setState({ loading: false });
                            this.GetTransaction();
                        }, (error) => {
                            this.setState({ loading: false });
                            Alert.alert('Failed!' + error.message);
                        });
                    });
                }, (error) => {
                    this.setState({ loading: false });
                    Alert.alert('Failed!' + error.message);
                });
            }, (error) => {
                this.setState({ loading: false });
            });
        });
    }

    editRecord(data) {
        if (!!data) {
            Actions.editTransaction({ data: data });
        } else {
            Alert.alert('Message..!', 'Data not found');
        }
    }

    renderTransactionList() {
        if (this.state.loading) {
            return (
                <View style={styles.center3}>
                    <Text style={{ padding: 20, fontSize: 18 }}>{this.state.message}</Text>
                    <Spinner size="large" />
                </View>
            );
        }
        if (this.state.data && this.state.data.length > 0) {
            console.log(this.state.data);
            return this.state.data.map((item, index) =>
                <CardTransaction
                    key={`index-${index}`}
                    items={item}
                    index={index}
                    _ViewPDF={this._ViewPDF}
                    editRecord={this.editRecord}
                    deleteRecord={this.deleteRecord}
                />
            );
        }
        return (
            <View style={styles.center3}>
                <Text style={{ padding: 20, fontSize: 18 }}>{this.state.message}</Text>
            </View>
        );
    }

    render() {
        const { margin } = styles;
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' type='Entypo' style={[Platform.OS === 'ios' ?
                                { color: '#000000' } : { color: '#FFFFFF' }]} onPress={this.openDrawer} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Dashboard</Title>
                    </Body>
                    <Right />
                </Header>

                <CardItem>
                    <Left>
                        <Button transparent >
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}> Total Transcation</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent>
                            <Icon active
                                type='MaterialCommunityIcons'
                                name="currency-inr"
                                style={{ color: 'black' }} />
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{this.state.Total}</Text>
                        </Button>
                    </Right>
                </CardItem>

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
                            name="plus" />
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