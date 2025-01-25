module.exports = function(app, sql){

	app.get('/', async function(req, res) {
		res.send(`<!DOCTYPE html>
		<html>
			<body">
				<div style="max-width: 1600px; margin: 100px auto 0 auto; border: 1.5px solid black; background-color: #ede4e4; padding: 100px 0;">
					<h1 style="font-size: 32px; text-align:center; margin-bottom: 100px;">Автогараж</h1>
					<div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
						<a href="/cars">
							<button style="width: 200px; height: 100px; border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: bold; text-decoration: none; color: black;">Cars</button>
						</a>
						<a href="/drivers">
							<button style="width: 200px; height: 100px; border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: bold; text-decoration: none; color: black;">Drivers</button>
						</a>
						<a href="/traffics">
							<button style="width: 200px; height: 100px; border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: bold; text-decoration: none; color: black;">Traffics</button>
						</a>
					</div>
				</div>
			</body>
		</html>`);
	})
}