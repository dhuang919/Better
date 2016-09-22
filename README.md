# Better

[![Build Status](https://travis-ci.org/betterhabits/Better.svg?branch=master)](https://travis-ci.org/betterhabits/Better) [![Coverage Status](https://coveralls.io/repos/github/betterhabits/Better/badge.svg?branch=master)](https://coveralls.io/github/betterhabits/Better?branch=master)

> Get Better.  
![Better demo](https://cloud.githubusercontent.com/assets/13752714/15801337/c9b6feb4-2a5f-11e6-841a-6f8146c7c7a3.gif)

View the [demo](https://appetize.io/app/61j9jyc2yce3rj73wq6xv9va6w?device=iphone6&scale=75&orientation=portrait&osVersion=9.3) on [appetize.io](https://appetize.io/)

## Team

  - __Product Owner__: Pedro Torres-Mackie
  - __Scrum Master__: Justin Bitely
  - __Development Team__: Pierre Teo Jun Sheng, Derek Huang

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Once the application is up and running on Xcode's iOS simulator, simply follow the on-boarding process to get started on your very first habit!

## Requirements

- node >= 4.4.0
- npm >= 3.8.1
- react-native-cli 0.1.10
- mongodb 2.1.7
- Xcode 7.3
- iPhone 6 simulator running iOS 9.3

## Development

### Installing Dependencies

In the root directory:

```sh
npm install
```

In the ios directory:

```sh
pod install
```

Once all dependencies are installed, set the `localServer` to `true` on line 21 in `index.ios.js`. This enables development on http://localhost:3000. Then start up:

```sh
mongod
npm run local
react-native start
```
Start up Xcode and build the app on the iPhone 6 simulator running iOS 9.3

React Native makes it incredibly easy to develop as you would in a web browser. When any changes are made, simply hit `CMD + R` (on Mac) to reload with your changes.

To run tests, simply run

```sh
npm test
```

### Roadmap

View the project roadmap [here](https://github.com/hrr12-thundercats/thesis/issues)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
