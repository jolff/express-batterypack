# ExpressJS Batterypack

ExpressJS is a wonderful framework to implement webservices. It is kind of easy to implement (kind of) restful microservices.
This package aims at being of help with utilities and middlewares which are needed often, like:

- Setting up and configuring an app
- Getting infos from the environment
- Validate request bodies
- Answering requests in a canonical way

All this features are implemented using only two additional packages on top of express - which are itself free of dependencies:

- [dotenv](https://www.npmjs.com/package/dotenv) for loading an environment from an `.env`-file
- [zod](https://www.npmjs.com/package/zod) for validation

## Features

- Result / ApiRequestResult
- App setup
- Environment Check
- Middlewares
  - Body validation with zod
  - JWT Auth
  - Basic Auth
