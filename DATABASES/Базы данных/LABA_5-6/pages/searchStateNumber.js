module.exports = function(app, sql){

	app.get('/searchStateNumber', async function(req, res){
		const stateNumberQuery = req.query.stateNumberQuery
		const data = await sql.query(`SELECT * FROM users`);
		const cars = data[0]

		res.send(`<!DOCTYPE html>
		<html>
			<body">
				<div style="max-width: 1500px; margin: 100px auto 0 auto; border: 1.5px solid black; background-color: #ede4e4; padding: 50px;">
					<a href="/cars">
						<button style="width: 200px; height: 50px; border-radius: 10px; cursor: pointer; font-size: 12px; text-decoration: none; color: black;">Назад</button>
					</a>

					<form style="margin-top: 30px" method="get" action="">
						<input style="width: 200px; height: 30px; border-radius: 10px; cursor: pointer; font-size: 12px; text-decoration: none; color: black;" type="text" name="stateNumberQuery" placeholder="Введите гос.номер машины" />
						<button style="width: 200px; height: 30px; border-radius: 10px; cursor: pointer; font-size: 12px; text-decoration: none; color: black;">Поиск</button>
					</form>

					<h1 style="font-size: 32px; text-align:center; margin-bottom: 30px;">Найденые данные по запросу '${stateNumberQuery}'</h1>
					
					<table style="width: 100%">
						<tbody>
							<th style="border: 1px solid black; background-color: grey">ID</th>
							<th style="border: 1px solid black; background-color: grey">Марка</th>
							<th style="border: 1px solid black; background-color: grey">Модель</th>
							<th style="border: 1px solid black; background-color: grey">Год выпуска</th>
							<th style="border: 1px solid black; background-color: grey">Пробег</th>
							<th style="border: 1px solid black; background-color: grey">Гос.номер</th>
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