/*
middleware
    auth
        jwt
        basic
    validation
        zod
responding
    respond
    respondWithError
    respondWithSuccess
env-checker
api-request-result
create-app
*/
import dotenv from "dotenv"
dotenv.config()

import { createAppAndListen } from "./create-app"

export default createAppAndListen
