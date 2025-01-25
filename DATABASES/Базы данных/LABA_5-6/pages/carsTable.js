module.exports = function(app, sql){


	app.get('/styles.css', (req, res) => {
		res.sendFile(__dirname + '/styles.css');
	});


	app.get('/cars', async function(req, res) {
		const data = await sql.query(`SELECT * FROM users`)
		const cars = data[0];
		
		res.send(`<!DOCTYPE html>

		<html>
		<head>
		<title>ddsdsd</title>
		<link rel="stylesheet" href="/styles.css"/></head>
			<body">
				<div style="max-width: 1500px; margin: 100px auto 0 auto; border: 1.5px solid black; background-color: #ede4e4; padding: 50px;">
					<a href="/">
						<button style="width: 200px; height: 50px; border-radius: 10px; cursor: pointer; font-size: 12px; text-decoration: none; color: black;">Перейти на главную страницу</button>
					</a>

					<a href="/searchStateNumber">
						<button style="width: 200px; height: 50px; border-radius: 10px; cursor: pointer; font-size: 12px; text-decoration: none; margin: 40px 0 0 40px; color: black;">Поиск</button>
					</a>

					<h1 style="font-size: 32px; text-align:center; margin-bottom: 30px;">Таблица 'Cars'</h1>
					
					<table style="width: 100%">
						<tbody>
							<th>ID</th>
							<th >Марка</th>
							<th >Модель</th>
							<th >Год выпуска</th>
							<th >Пробег</th>
							<th >Гос.номер</th>
							${cars.map(car => `
								<tr>
									<td style="border: 1px solid black; background-color: grey">${car.idCars}</td>
									<td style="border: 1px solid black">${car.brand}</td>
									<td style="border: 1px solid black">${car.model}</td>
									<td style="border: 1px solid black">${car.yearOfIssue}</td>
									<td style="border: 1px solid black">${car.mileage}</td>
									<td style="border: 1px solid black">${car.stateNumber}</td>
								</tr>
							`).join('')};
						</tbody>
					</table>

				</div
			</body>
		</html>`);
	})
}