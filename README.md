# CPU Load App

Proof-of-concept (POC) for a browser-based CPU load monitoring application.

- What is my computer's current average CPU load?
- How did the average CPU load change over a 10 minutes window?
- Has my computer been under heavy CPU load for 2 minutes or more? When? How many times?
- Has my computer recovered from heavy CPU load? When? How many times?

* ES6
* Node
* Express
* Next
* React
* Jest
* Socket.io

## PRODUCT REQS 💡

- [x] The front-end application should communicate with a local back-end service to retrieve CPU load average information
      from your computer (see below).
- [x] The front-end application should retrieve CPU load information every 10 seconds.
- [x] The front-end application should maintain a 10 minutes window of historical CPU load information.
  - [ ] Question: Should we save information from the previous visit in a cookie or start fresh on every page load?
- [x] The front-end application should alert the user to high CPU load.
- [x] The front-end application should alert the user when CPU load has recovered.

### High CPU Load

- Alert: When average CPU is over 1 for 2 minutes or more
- Recovered: When average CPU Load drops below 1 for 2 minutes or more

## TECH SPECS 🛠

### Requirements

Websocket Server emit messages to client every 10 seconds.

| Seconds     | Minutes    | # of messages |
| ----------- | ---------- | :-----------: |
| 10 seconds  | N/A        |   1 message   |
| 60 seconds  | 1 minute   |  6 messages   |
| 120 seconds | 2 minute   |  12 messages  |
| 600 seconds | 10 minutes |  60 message   |

#### Historical Data

Fetching data every 10 seconds and needing to maintain 10 minutes of historical data means the client will need to display
and keep track of 60 records maximum.

#### Alerting

When average CPU is over 1 for 2 minutes or more

- 12 consecutive messages with average over 1

#### Recovery

When average CPU Load drops below 1 for 2 minutes or more

- if alert trigger
- 12 consecutive messages with average under 1

### Getting Started

Clone Repo:<br />
`git clone git@github.com:jleajones/cpuload-app.git`;

`cd` into directory<br />

Run:<br />
`nvm use`

Run:<br />
`npm install`

Create `.env` file<br />
`cp .sample-env ./.env`

### Running the App

Application support multiple run configurations.

- [x] local configuration w/ node 💚
  - [x] test configuration
- [x] container configuration w/ Docker 🐳
  - [ ] test configuration
- [ ] production configuration

##### Bonus: Includes WebStorm run configurations

#### Local

- Run app:
  `npm run dev`
- Run test:
  `npm run test`

#### Container

- Run with Docker
  `docker-compose up`

#### Production

- Build client:
  `npm run build:client`
- Build server:
  `npm run build:server`
- Run:
  `npm run server`

## NEXT STEPS 📈

### UX

#### 1. Improve display of alerts and recoveries.

Maybe indicate how long before each alert recovered.

#### 2.Display information about each core.

### Tech Infrastructure

#### 1. Improve monitor algorithm.

Can improve the performance by only checking the data points when the average load changes from > 1 and < 1 or by
improving the logic as to how we populate the data points to monitor. This way we are not checking 12 points every 10
secs when its not possible to have an alert or monitor.

#### 1. Migrate to KOA.

Express has aged and has not been maintained properly.

#### 2. Persist Data in DB.

Allows for adding additional features

#### 3. Improve test coverage.  Add test for the server side code.

Improve Jest configuration to support testing in Node env.
Write unit tests and integration tests? Server is light now, but if we add DB support and build out the feature could become necessary.

#### 4. PropTypes, Flow, TypeScript

#### 5. CI/CD Integration
