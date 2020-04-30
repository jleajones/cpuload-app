# CPU Load POC (Proof of Concept)
Javascript project for datadog 🐶.
- ES6
- Node
- Express
- Next
- React

## PRODUCT REQS 💡


## TECH SPECS 🛠
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
#### Migrate to KOA
Express has aged and has not been maintained properly.
#### Persist Data in DB
Allows for adding additional features
