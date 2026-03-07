import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import {productRouter} from './routes/productRoute.js';
import {authRouter} from './routes/authRoute.js';
import {userRouter} from './routes/userRoute.js';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

// Session configuration
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

// View engine setup
app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('layout', 'layout');

// Static files
app.use(express.static('public'));

// Routes
app.use('/products', productRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.render('home');
});
app.listen(5000,()=>{
    console.log(`Server is running on port ${PORT}`);
});