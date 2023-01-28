import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true})) //used when we want to use form data
// cors is used for security. allow selective things to be responded from backend
app.use(cors())
app.use(cookieParser())

//morgan logger
// it prints info about API req and res in console
app.use(morgan('tiny'))

export default app