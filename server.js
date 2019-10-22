const express = require('express');
const app = express();
bodyParser = require('body-parser');
cors = require('cors');
const path = require('path');


app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));


const port = process.env.PORT || 4000;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const categoryRoutes = require('./routes/category.route');
const postRoutes = require('./routes/post.route');
const userRoutes = require('./routes/user.route');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/api/blog/category', categoryRoutes);
app.use('/api/blog/post', postRoutes);
app.use('/api/blog/user', userRoutes);
app.use('/api/blog/demo', categoryRoutes);


const server = app.listen(port, function(){
 console.log('Listening on port ' + port);
});
