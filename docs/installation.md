## Dali-Mgmt Build and Installation

Steps under OSX to get Dali-Mgmt built as iOS application and run locally against a local Dali-Server.

Prerequisites:
- [Xcode](https://itunes.apple.com/us/app/xcode/id497799835) for iOS development
- [React Native](https://facebook.github.io/react-native/docs/getting-started.html) dependencies installed, node.js and watchman
- [Yarn](https://yarnpkg.com/en/docs/install) dependency manager for node.js
- [Dali-Server](https://github.com/att-innovate/dali-server) installed and running locally


### Prepare Dali-Mgmt

To download all the dependencies using the yarn dependency manager type following command in a terminal at the root of this project

	yarn

Run packager server for React Native, ideally in a different terminal also at the root of this project

    yarn start


### Build and Run Dali-Mgmt as iOS Application

First create some test marks in Dali-Server

    curl -X GET -H "Accept: application/json" -H "Content-Type: application/json" 127.0.0.1:8085/admin/reset
    curl -X POST -H "Accept: application/json" -H "Content-Type: application/json" 127.0.0.1:8085/mark/ -d '{"id":"11111", "Label":"Front Door","Type":"undefined","Content":""}'
    curl -X POST -H "Accept: application/json" -H "Content-Type: application/json" 127.0.0.1:8085/mark/ -d '{"id":"2222", "Label":"Living Room","Type":"undefined","Content":""}'

Run Dali-Mgmt locally in the iPhone simulator

	yarn run ios

The first time Dali-Mgmt comes up it will ask for the address of the Dali-Server, in our case, running it locally it would be `http://127.0.0.1:8085`.
After you entered the address and clicked the save button you should see:


![firststart](https://github.com/att-innovate/dali-mgmt/blob/master/docs/firststart.png)


### Build Standalone Application for iPhone

To build a standalone application to be run on an iPhone please refer to the [React Native documentation](https://facebook.github.io/react-native/docs/running-on-device.html).


### Additional Thanks

The application design was inspired by the todo application in the book [React Native in Action](https://www.manning.com/books/react-native-in-action).

And the application is using two additional external React Native components:
- [react-native-display](https://github.com/sundayhd/react-native-display)
- [react-native-modal-picker](https://github.com/fabriziomoscon/react-native-modal-picker)