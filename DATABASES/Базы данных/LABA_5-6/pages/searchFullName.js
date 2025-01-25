module.exports = function(app, sql){

	app.get('/searchFullName', async function(req, res){
		const driverQuery = req.query.driverQuery
		const data = await sql.query(`SELECT * FROM users`);

		const drivers = data[0]
		res.send(`<!DOCTYPE html>
			<html>
				<body">
					<div style="max-width: 1500px; margin: 100px auto 0 auto; border: 1.5px solid black; background-color: #ede4e4; padding: 50px;">
						<a href="/drivers">
							<button style="width: 200px; height: 50px; border-radius: 10px; cursor: pointer; font-size: 12px; text-decoration: none; color: black;">Назад</button>
						</a>

						<form style="margin-top: 30px" method="get" action="">
							<input style="width: 200px; height: 30px; border-radius: 10px; cursor: pointer; font-size: 12px; text-decoration: none; color: black;" type="text" name="driverQuery" placeholder="Введите ФИО" />
							<button style="width: 200px; height: 30px; border-radius: 10px; cursor: pointer; font-size: 12px; text-decoration: none; color: black;">Поиск</button>
						</form>
							
						<h1 style="font-size: 32px; text-align:center; margin-bottom: 30px;">Найденые данные по запросу '${driverQuery}'</h1>

						<table style = "width: 100%;">
							<tbody>
								<th style="border: 1px solid black; background-color: grey">ID</th>
								<th style="border: 1px solid black; background-color: grey">ФИО</th>
								<th style="border: 1px solid black; background-color: grey">Категория груза</th>
								<th style="border: 1px solid black; background-color: grey">Дом. адрес</th>
								<th style="border: 1px solid black; background-color: grey">Рейтинг</th>
								<th style="border: 1px solid black; background-color: grey">Семеное положение</th>
								<th style="border: 1px solid black; background-color: grey">Телефон</th>
								<th style="border: 1px solid black; background-color: grey">Код номера</th>
								<th style="border: 1px solid black; background-color: grey">Дата рождения</th>
								<th style="border: 1px solid black; background-color: grey">Стаж работы</th>
								<th style="border: 1px solid black; background-color: grey">Гражданство</th>
								${drivers.map(driver => `
									<tr>
										<td style="border: 1px solid black; background-color: grey">${driver.idDrivers}</td>
										<td style="border: 1px solid black">${driver.fullName}</td>
										<td style="border: 1px solid black">${driver.category}</td>
										<td style="border: 1px solid black">${driver.address}</td>
										<td style="border: 1px solid black">${driver.reputation}</td>
										<td style="border: 1px solid black">${driver.familyStatus}</td>
										<td style="border: 1px solid black">${driver.phone}</td>
										<td style="border: 1px solid black">${driver.callCode}</td>
										<td style="border: 1px solid black">${driver.dateOfBirth}</td>
										<td style="border: 1px solid black">${driver.experience}</td>
										<td style="border: 1px solid black">${driver.citizenship}</td>
									</tr>
								`).join('')};
							</tbody>
						</table>

					</div
				</body>
			</html>`
		);
	})
}