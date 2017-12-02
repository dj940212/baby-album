import Koa from 'koa'
import cors from 'koa-cors'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import Router from 'router/routes'
import config from 'config'
import database from 'middlewares/database'


const app = new Koa()
const router = Router()

database()
app.use(cors({}))
app.use(logger())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(config.port)
console.log("server is starting at port " + config.port)