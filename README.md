# dbadapt-weather

Features:
* Autosuggestion interface allows automatic matching of US cities
* Jest test for API class and main application
* OpenWeatherMap.js API client is isomorphic will run in browser or node.js
* Data ETL script for extracting US city names (/util/filter_us.*)
* Dynamic data conversion between metric and imperial
* Current weather image display
* Wind direction converted from API degrees to compass direction
* Local proxy for development mode to avoid CORS issue in dev
* Fully containerized using 2-phase build definition
* Container def uses nginx reverse proxy to avoid CORS issues in production
* Full CI/CD using GCP Cloud Run with github action on trunk merge

Lastest trunk merge to 'main' can always be tested live at:

  https://dbadapt-weather-movn6w74va-uw.a.run.app/

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Containerize and run

  From the project root directory:

  ```shell
  $ docker build -t dbadapt/dbadapt-weather .
  $ docker run -it -p 80:80/tcp --rm --name react-app dbadapt/dbadapt-weather:latest
  ```

  You may then run the application via a local browser at http://localhost/

  Use Ctrl-C to terminate and automatically remove container

