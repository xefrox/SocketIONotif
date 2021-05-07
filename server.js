const SocketServer = require('websocket').server
const http = require('http')


const server = http.createServer((req,res) => {

})

server.listen(3000,()=>{
	console.log('Listening on port 3000...')
})


wsServer = new SocketServer({httpServer:server})

const conns = []

wsServer.on('request',(req)=>{
	const conn = req.accept()
	console.log('new Connection')
	conns.push(conn)

	conn.on('message',(mes)=>{
		conns.forEach(element=>{
			if (element != conn) {
				element.sendUTF(mes.utf8Data)
			}
		})
	})

	conn.on('close',(resCode,des)=>{
		console.log('connection closed')
		conns.splice(conns.indexOf(conn),1)
	})
})