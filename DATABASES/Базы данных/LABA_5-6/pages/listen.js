module.exports = function(app, port){

	app.listen(port, (err) => {
		if (err) {
			return console.log('something bad happened', err)
		}
		console.log(`server is listening on ${port}`)
	})
}