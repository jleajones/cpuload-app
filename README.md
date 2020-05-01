# CPU Load App
Proof-of-concept (POC) for a browser-based CPU load monitoring application.

- What is my computer's current average CPU load?
- How did the average CPU load change over a 10 minute window?
- Has my computer been under heavy CPU load for 2 minutes or more? When? How many times?
- Has my computer recovered from heavy CPU load? When? How many times?



- ES6
- Node
- Express
- Next
- React
- Jest
- Socket.io

## PRODUCT REQS 💡

- [x] The front-end application should communicate with a local back-end service to retrieve CPU load average information from your computer (see below).
- [x] The front-end application should retrieve CPU load information every 10 seconds.
- [ ] The front-end application should maintain a 10 minute window of historical CPU load information.
  - [ ] Question: Should we cookie information from the previous visit or start fresh on every page load?
- [ ] The front-end application should alert the user to high CPU load.
- [ ] The front-end application should alert the user when CPU load has recovered.

### High CPU Load

- Alert: When average CPU is over 1 for 2 mins or more
- Recovered: When average CPU Load drops below 1 for 2 mins or more

## TECH SPECS 🛠

### Requirements

#### Historical Data
Fetching data every 10 seconds and needing to maintain 10mins of historical data means the client will need to display and keep track of 60 records maximum.

  | Seconds     | Minutes    | # of messages |
  | ----------- | ---------- | :-----------: |
  | 10 seconds  | N/A        |   1 message   |
  | 60 seconds  | 1 minute   |  6 messages   |
  | 600 seconds | 10 minutes |  60 message   |


#### Alerting

### Getting Started

Clone Repo:<br />
`git clone git@github.com:jleajones/cpuload-app.git`;

`cd` into directory<br />

Run:<br />
`npm install`

Create `.env` file<br />
`cp .sample-env ./.env`

### Running the App

Application support multiple run configurations.

- [x] local configuration w/ node 💚
  - [x] test configuration
- [ ] container configuration w/ Docker 🐳
  - [ ] test configuration
- [ ] production configuration

##### Bonus: Includes WebStorm run configurations

#### Local

- Run app:
  `npm run dev`
- Run test:
  `npm run test`

#### Container

TBD - Docker integration

#### Production

- Build client:
  `npm run build:client`
- Build server:
  `npm run build:server`
- Run:
  `npm run server`

## NEXT STEPS 📈

#### 1. Migrate to KOA.

Express has aged and has not been maintained properly.

#### 2. Persist Data in DB.

Allows for adding additional features

#### 3. Add Tests for Server.

Improve Jest configuration to support testing in Node env.
Write unit tests and integration tests? Server is light now, but if we add DB support and build out the feature could become necessary.
