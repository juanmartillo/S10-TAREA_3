import express, { Router } from 'express';
import bodyParser from 'body-parser';
import routerUser from './routers/userRouters'
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

app.use(cookieParser())
app.get("/", (req, res) => {
    res.send("Bienvenidos al arranque del servidor");
});

app.use('/api/users',routerUser )
export default app;
