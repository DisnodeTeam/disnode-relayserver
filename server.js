var shortid = require('shortid');
var net = require('net');

var server = net.createServer();  
server.on('connection', NewConnection);

server.listen(7777, function() {  
  console.log('server listening to %j', server.address());
});

var Connections = [];

function NewConnection(socket){
    var newConnection = {
        socket: socket,
        connected: true,
        ignoredPings: 0,
        id: shortid.generate()
    };
    console.log("New connection: " + newConnection.id)
    Connections.push(newConnection);
    socket.on("data", function(data){
        data = JSON.parse(data);
        ParsePacket(newConnection,data);
    });

    socket.on("close", function(){
        HandleClose(newConnection);
    });

    socket.on("error", function(data){
        HandleError(newConnection, data);
    });
}

function ParsePacket(connection, data){
    console.log("Data: "+ connection.id + " = " + JSON.stringify(data))
}

function HandleError(connection, err){
     console.log("Error: "+ connection.id + " = " + err)
}

function HandleClose(connection){
     console.log("Close: "+ connection.id);
     var index = Connections.indexOf(connection);
     Connections.splice(index, 1);
}

function SendPacket(connection){
    
}