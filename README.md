# Topcoder Submission Review Micro-app

## Complete Deployment

- For complete deployment, make sure to follow 'deployment.md' step by step

## Requirements

- node - v10.22.1
- npm - v6.14.6

## Technology Stack

- React 16.12
- Router via [Reach Router](https://reach.tech/router/)
- CSS Modules with SCSS via [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)
- [React Inline SVG](https://github.com/airbnb/babel-plugin-inline-react-svg)

## NPM Commands

| Command               | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `npm start`           | Run server which serves production ready build from `dist` folder |
| `npm run dev`         | Run app in the development mode                                   |
| `npm run dev-https`   | Run app in the development mode using HTTPS protocol              |
| `npm run build`       | Build app for production and puts files to the `dist` folder      |
| `npm run analyze`     | Analyze dependencies sizes and opens report in the browser        |
| `npm run lint`        | Check code for lint errors                                        |
| `npm run format`      | Format code using prettier                                        |

## Local Deployment

Inside the project folder run:

- `npm i` - install dependencies
- `npm run dev` - run app in development mode
- As this app can be loaded only inside a frame single-spa, you have to run a `mfe-core` frame app and configure it to use the URL `http://localhost:8503/topcoder-submission-review-app.js`.

### Run Mock API server: [Mock server is not used for now]

```bash
cd local/mock-server

npm install

npm run start
```

This would host Mock API on http://local.topcoder-dev.com:8504.

## Verification

Please check [verification.md](verification.md)
