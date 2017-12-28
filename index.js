const server = require('./src');
const port = process.env.PORT || 3002;

server.listen(port, ()=>{
    console.log(`Server running on port localhost:${port}`);
});