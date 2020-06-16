var $$ = Dom7;
var api = 'http://api.home.theorbs.web.id/user';
var api_login = api + '/login';
var api_register = api + '/register';
var api_check = api + '/user/check';
var api_dashboard = api + '/home/dashboard';
var api_node_save = api + '/node/store';
var mqtt
var mqtt_profile = {
    host: 'broker.mqttdashboard.com',
    path: '/mqtt',
    port: 1883,
    wsPort: 8000,
    clientId: 'test123',
    timeout: 3000,
    username: '',
    password: '',
    keepalive: 60,
    isBinary: false
}

var app = new Framework7({
    root: '#app',
    name: 'QHome',
    id: 'com.ubaya.mike.qhome',
    version: '1.0.0',
    panel: {
        swipe: 'left'
    },
    theme: 'aurora',
    routes: [
        {
            path: '/index/',
            url: 'index.html'
        },
        {
            path: '/login/',
            url: 'pages/login.html',
            on: {
                pageAfterIn: function(e, page) {
                    app.panel.disableSwipe();
                    if(localStorage.token) {
                        app.request({
                            method: 'GET',
                            url: api_check,
                            headers: {
                                Accept: 'application/json',
                                Authorization: localStorage.token
                            },
                            success: function(data) {
                                var response = JSON.parse(data)
                                if (response['status']) {
                                    page.router.navigate('/dashboard/')
                                    return
                                }
                            },
                            error: function(data) {
                                app.dialog.alert('Login expired, please re-login');
                            }
                        })
                    }

                    $$('#btn-login').on('click', function() {
                        var username = $$('#username').val();
                        var password = $$('#password').val();

                        if (username == ''  || username == null || password == '' || password == null) {
                            app.dialog.alert('Please enter username and password!', 'Login Error!')
                            return
                        }

                        app.request({
                            method: 'POST',
                            url: api_login,
                            headers: {
                                Accept: 'application/json'
                            },
                            data: {
                                username: username,
                                password: password
                            },
                            success: function(data) {
                                var response = JSON.parse(data)
                                if (response['status']) {
                                    localStorage.id = response['id']
                                    localStorage.username = response['username']
                                    localStorage.name = response['name']
                                    localStorage.email = response['email']
                                    localStorage.role = response['role']
                                    localStorage.topic = response['topic']
                                    localStorage.home_id = response['home_id']
                                    localStorage.home_username = response['home_username']
                                    localStorage.home_name = response['home_name']
                                    localStorage.token = response['token']
                                    mqtt_profile.host = response['mqtt']['host']
                                    mqtt_profile.path = response['mqtt']['path']
                                    mqtt_profile.port = Number(response['mqtt']['port'])
                                    mqtt_profile.wsPort = Number(response['mqtt']['wsPort'])
                                    mqtt_profile.username = response['mqtt']['username']
                                    mqtt_profile.password = response['mqtt']['password']
                                    app.dialog.alert('Logged in Successfully!')
                                    page.router.navigate('/dashboard/')
                                } else {
                                    app.dialog.alert(response['message'], 'Login Failed!')
                                }
                            },
                            error: function(data) {
                                app.dialog.alert(data, 'Login Failed!');
                            }
                        })
                    })
                }
            }
        }, 
        {
            path: '/dashboard/',
            url: 'pages/dashboard.html',
            on: {
                pageInit: function(e, page) {

                }
            }
        }
    ],
    data: function () {
        return {
            username: localStorage.getItem('username') ?? null,
            password: localStorage.password ?? null
        }
    },
    methods: {
        mqtt_init: function() {
            mqtt = new Paho.MQTT.Client(mqtt_profile.host, Number(mqtt_profile.wsPort), mqtt_profile.path, mqtt_profile.clientId)
            mqtt.onMessageArrived = app.methods.mqtt_onMessage
            mqtt.connect({
                userName: mqtt_profile.username,
                password: mqtt_profile.password,
                mqttVersion: 4,
                onSuccess: function() {
                    app.dialog.alert('[MQTT] Connected')
                    app.methods.mqtt_publish('testtest', 'halohalo123')
                }
            })
        },
        mqtt_subscribe: function() {
            app.dialog.alert('subscribe')
        },
        mqtt_publish: function(topic, payload) {
            var message = new Paho.MQTT.Message(payload)
            message.destinationName = topic
            message.qos = 1
            message.retained = true
            mqtt.send(message)
        },
        mqtt_onMessage: function(message) {

        }
    },
    autoDarkTheme: false,
    init: true,
    initOnDeviceReady: true,
    on: {
        init: function () {
            app.dialog.alert('Hello World!')
            console.log('Hello World!')
        },
        pageInit: function() {
        }
    },
    clicks: {
        externalLinks: '.external'
    },
    touch: {
        tapHold: true,
        tapHoldDelay: 1000,
        tapHoldPreventClicks: true,
        iosTouchRipple: false,
        mdTouchRipple: false,
        auroraTouchRipple: true
    }
})

var mainView = app.views.create('.view-main', { url: '/index/' })

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    app.dialog.alert('test')
    app.methods.mqtt_init()
}