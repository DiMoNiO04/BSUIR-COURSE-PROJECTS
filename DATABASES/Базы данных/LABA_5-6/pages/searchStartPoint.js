module.exports = function(app, sql){

	app.get('/searchStartPoint', async function(req, res){
		const startPointQuery = req.query.startPointQuery
		const data = await sql.query(`SELECT * FROM users`);
		const traffics = data[0]

		res.send(`<!DOCTYPE html>
		<html>
			<body">
				<div style="max-width: 1500px; margin: 100px auto 0 auto; border: 1.5px solid black; background-color: #ede4e4; padding: 50px;">
					<a href="/traffics">
						<button style="width: 200px; height: 50px; border-radius: 10px; cursor: pointer; font-size: 12px; text-decoration: none; color: black;">Назад</button>
					</a>

					<form style="margin-top: 30px" method="get" action="">
						<input style="width: 200px; height: 30px; border-radius: 10px; cursor: pointer; font-size: 12px; text-decoration: none; color: black;" type="text" name="startPointQuery" placeholder="Введите начальный пункт" />
						<button style="width: 200px; height: 30px; border-radius: 10px; cursor: pointer; font-size: 12px; text-decoration: none; color: black;">Поиск</button>
					</form>

					<h1 style="font-size: 32px; text-align:center; margin-bottom: 30px;">Найденые данные по запросу '${startPointQuery}'</h1>

					<table style="width: 100%">
						<tbody>
							<th style="border: 1px solid black; background-color: grey">ID</th>
							<th style="border: 1px solid black; background-color: grey">Пункт отправления</th>
							<th style="border: 1px solid black; background-color: grey">Конечный пункт</th>
							<th style="border: 1px solid black; background-color: grey">Длина пути</th>
							<th style="border: 1px solid black; background-color: grey">Количество остановок</th>
							<th style="border: 1px solid black; background-color: grey">ID Машины</th>
							<th style="border: 1px solid black; background-color: grey">ID Водителя</th>
							${traffics.map(traffic => `
								<tr>
									<td style="border: 1px solid black; background-color: grey">${traffic.idTraffics}</td>
									<td style="border: 1px solid black">${traffic.startPoint}</td>
									<td style="border: 1px solid black">${traffic.endPoint}</td>
									<td style="border: 1px solid black">${traffic.trafficLength}</td>
									<td style="border: 1px solid black">${traffic.countStops}</td>
									<td style="border: 1px solid black; font-size: 20px; font-weight: bold;"> <a href="/car/${traffic.idCars}">${traffic.idCars}</a> </td>
									<td style="border: 1px solid black; font-size: 20px; font-weight: bold;"> <a href="/driver/${traffic.idDrivers}">${traffic.idDrivers}</a> </td>
								</tr>
							`).join('')};
						</tbody>
					</table>

				</div
			</body>
		</html>`);
	})
}