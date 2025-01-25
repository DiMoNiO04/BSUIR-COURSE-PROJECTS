//Подключаем заголовочные файл
#include"Functions.h"   
#include"Validation.h"
#include"Const.h"


//---------------------------------------------------Функции работы с учетными записями старт-------------------------------------------------
//Открытия файла учетных записей
void openingFileAccounts(account* (&accounts), int& amountOfAccounts, string fileAccounts) {

	ifstream reading(fileAccounts); //Поток для чтения из файла
	if (!reading.is_open()) {  //Если файла с учетными записями нету. Регистрируемся в качестве главного админа
		cout << REGISTR_AS_MAIN_ADMIN;
		cout << INPUT_LOGIN;              string newLogin = inputValidationPasswordOrLogin();
		cout << INPUT_PASSWORD;           string newPassword = inputValidationPasswordOrLogin();
		cout << INPUT_REPEAT_PASSWORD;    string repeatNewPassword = inputValidationPasswordOrLogin();
		amountOfAccounts++;                   //увеличение количество учетных записей в структуре на 1
		accounts[amountOfAccounts - 1].login = newLogin;
		accounts[amountOfAccounts - 1].role = ADMIN_MAIN;
		accounts[amountOfAccounts - 1].access = ACCESS;
		accounts[amountOfAccounts - 1].hash = generationHashForPassword(newPassword);
		accounts[amountOfAccounts - 1].salt = generateSalt(SALT_SIZE);
		savingAccount(accounts, amountOfAccounts, fileAccounts);   //Сохранение изменений в файл
		coutYellowText(YOU_HAVE_CREATED_FILE_AND_REGISTERED_MAIN_ADMIN);
		system("pause");
	}
	else { //Если файл с учетными записями есть
		readingFileAccounts(accounts, amountOfAccounts, fileAccounts);//Считываем данные из файла в массив
	}
	reading.close();  //Закрываем файл
}

//Считывание учетных записей в массив
void readingFileAccounts(account*(&accounts), int &amountOfAccounts, string fileAccounts){

	ifstream reading(fileAccounts);
	int numberAccount = 0;
	while (!reading.eof()) {  //Пока файл не пустой
		if (numberAccount < RESERVE_AMOUNT_OF_ACCOUNTS) {
			reading >> accounts[numberAccount].login   //Считываем данные
				>> accounts[numberAccount].hash
				>> accounts[numberAccount].salt
				>> accounts[numberAccount].role
				>> accounts[numberAccount].access;
			if (accounts[numberAccount].login.empty()) {
				break;
			}
			numberAccount++;  //Считаем количество учетных записей 
		}
	}
	amountOfAccounts = numberAccount;  //Количество аккаунтов
	reading.close();
}

//Сохраняем учетную запись
void savingAccount(account* accounts, int amountOfAccounts, string fileName) {

	ofstream record(fileName, ios::out); //Создаем поток для записи, открываем файл и делаем его пустым
	if (record) {  //если файл открылся

		//Записываем данные в файл
		for (int numberAccount = 0; numberAccount < amountOfAccounts; numberAccount++) {
			record << accounts[numberAccount].login << "  "
				<< accounts[numberAccount].hash << "  "
				<< accounts[numberAccount].salt << " "
				<< accounts[numberAccount].role << " ";
			if (numberAccount < amountOfAccounts - 1) { //Если элемент не последний делаем отступ на след строчку
				record << accounts[numberAccount].access << endl;
			}
			else {  //Если элемнт последний делаем отступ на след строчку
				record << accounts[numberAccount].access;
			}
		}
	}
	else {  //Если файл не открылся
		coutRedText( ERROR_OPEN_FAIL);
	}
	record.close();  //Закрываем файл
}

//Вывод всех учетных записей
void printAllAccounts(account* accounts, int amountOfAccounts) {

	system("cls");
	cout << setw(60); coutYellowText(ACCOUNTS);
	cout << setw(17)<<"Логин:" << setw(10) << "Роль:" << setw(14) << "Доступ:\n";
	for (int numberAccount = 0; numberAccount < amountOfAccounts; numberAccount++) {
		cout << "\nДанные №" << numberAccount + 1 << ": ";
		printAccount(accounts, numberAccount);
	}
	cout << endl;
}

//Вывод одной учетной записи
void printAccount(account* accounts, int numberAccount) {
	
	cout << left << setw(10) << accounts[numberAccount].login << setw(10) << accounts[numberAccount].role;
	if (accounts[numberAccount].access == ACCESS) {
		cout << setw(10) << WITH_ACCESS;
	}
	else {
		cout << setw(10) << WITHOUT_ACCESS;
	}
	cout << endl;
}

//Выход из аккаунта
void exitFromAccount(account* (&accounts), int &amountOfAccounts, int activeAccount, dataPatients* (&patients), int &amountOfPatients, void user(account*(&accounts), int &amountOfAccounts, int activeAccount, dataPatients* (&patients), int &amountOfPatients)) {
	
	system("cls");
	cout << CONFIRMATION_EXIT_FROM_ACCOUNT;
	if (confirmation()) {  //Если согласны на выход из аккаунта
		autorization(accounts, amountOfAccounts, patients, amountOfPatients);
	}
	else {
		user(accounts, amountOfAccounts, activeAccount, patients, amountOfPatients);
	}
}

//Удаление аккаунта
void deleteAccounts(account* (&accounts), int& amountOfAccounts, int activeAccount, dataPatients*(&patients), int& amountOfPatients) {  //Передаем ссылку на массив, чтоб создать копию. Удаление данных

	printAllAccounts(accounts, amountOfAccounts);    //Вывод всех учетных записей
	cout << "\n\nДля того , чтобы вернуться назад нажмите - '0'\nВведите номер аккаунта от 1 до " << amountOfAccounts << " которого хотите удалить << ";
	int numberDeleteAccount = inputNumber(BACK, amountOfAccounts);  //Ввод номера данного , который хотите удалить

	if (numberDeleteAccount == BACK) {   //Если вернуться назад
		return;
	}
	else if (numberDeleteAccount == activeAccount + 1) {  //Если выбрали свой аккаунт
		coutRedText( NOT_DELETE_MAIN_ADMIN);
		return;
	}
	else {
		cout << CONFIRMATION_DELETE_ACCOUNT;
		if (confirmation()) {   //Если согласны на ужаление учетной записи
			numberDeleteAccount--;   //Уменьшаем на 1
			for (int numberOfAccount = numberDeleteAccount; numberOfAccount < amountOfAccounts - 1; numberOfAccount++) {
				accounts[numberOfAccount] = accounts[numberOfAccount + 1];
			}
			amountOfAccounts--;   //Уменьшаем количество аккаунтов
			savingAccount(accounts, amountOfAccounts, "accounts.txt");   //Сохраняем изменение
			coutGreenText(ACCOUNT_DELETE);
		}
		else {
			coutRedText(ACCOUNT_NOT_DELETE);
		}
	}
}

//Копирование аккаунтов
void copyAccount(account* (&accountsNew), account* (accountsOld), int amountOfAccounts) { //передаем два массива

	for (int numberAccount = 0; numberAccount < amountOfAccounts; numberAccount++) {
		accountsNew[numberAccount] = accountsOld[numberAccount];  //каждый элемент массива , присваиваем в новый массив
	}
}

//Одобрение заявки на активацию аккаунта
void activationAccount(account* (&accounts), int& amountOfAccounts, int activeAccount) {

	int amountOfAccountNoActivation = accountsWithoutAccess(accounts, amountOfAccounts);  //Количество аккаунтов без доступа
	account* accountsWithAccess = createArrOfAccountsWithoutAccess(accounts, amountOfAccounts, amountOfAccountNoActivation);  //Создание массива аккаунтов без доступа

	if (amountOfAccountNoActivation != DATA_EMPTY) {   
		printAccountsForConfirmAdd(accounts, amountOfAccounts);   //Вывод завок на регистрацию
		confirmApplication(accounts, accountsWithAccess, amountOfAccounts, amountOfAccountNoActivation, activeAccount);  //Функция выбора одобрения заявок
	}
	else {   //Проверка на наличие заявок
		coutBlueText( NO_APPLICATION_REQUESTS);
	}
}
void confirmApplication(account* (&accounts), account* (&accountsWithAccess), int amountOfAccounts, int amountOfAccountNoActivation, int activeAccount) {

	cout << ENTER_APPLICATION_NUMBER;
	int numberApplication = inputNumber(BACK, amountOfAccountNoActivation);  //Выбор номера заявки для активации

	if (numberApplication == BACK) {     //Если вернуться назад
		return;
	}
	else {
		coutBlueText(CONFIRMATION_ACTIVATION);
		if (confirmation()) {  //Если согласны на активацию аккаунта
			numberApplication--;  //Уменьшаем на 1
			for (int numberAccount = 0; numberAccount < amountOfAccounts; numberAccount++) {
				if (accounts[numberAccount].login == accountsWithAccess[numberApplication].login) {
					accounts[numberAccount].access = ACCESS;  //Меняем на доступ
					break;
				}
			}
			coutGreenText( ACCOUNT_ACTIVATED);
			savingAccount(accounts, amountOfAccounts, "accounts.txt");
		}
		else {
			coutRedText(ACCOUNT_NOT_ACTIVATED);
		}
	}
}

//Подсчет аккаунтов без доступа
int accountsWithoutAccess(account* (&accounts), int amountOfAccounts) {

	int amountOfAccountNoActivation = DATA_EMPTY;   //Инициалзация переменной счетчика аккаунтов без доступа
	for (int numberAccount = 0; numberAccount < amountOfAccounts; numberAccount++) {  
		if (accounts[numberAccount].access == NO_ACCESS) {  //Проверка на доступ аккаунта
			amountOfAccountNoActivation++;  //Увеличение аккаунтов без доступа
		}
	}
	return  amountOfAccountNoActivation;   //Возвращаем количество аккаунтов без доступа
}

//Запись аккаунтов без доступа в отдельный массив
account* createArrOfAccountsWithoutAccess(account* (&accounts), int amountOfAccounts, int amountOfAccountNoActivation) {

	account* accountsWithAccess = new account[amountOfAccountNoActivation];  //Выделяем память под новый массив
	amountOfAccountNoActivation = DATA_EMPTY;     //Инициализация счетчика аккаунтов без доступа
	for (int numberAccount = 0; numberAccount < amountOfAccounts; numberAccount++) {
		if (accounts[numberAccount].access == NO_ACCESS) {  //Проверка на доступ аккаунтв
			accountsWithAccess[amountOfAccountNoActivation].login = accounts[numberAccount].login;  //Переписываем данные в новый массив
			amountOfAccountNoActivation++;  //Увеличиваем количество аккаунтов без доступа
		}
	}
	return accountsWithAccess;  //Возвращаем указатель на массив аккаунтов без доступа
}

//Вывод акккаунтов не имеющих доступа
void printAccountsForConfirmAdd(account* (&accounts), int amountOfAccounts) {

	system("cls");
	cout << BACK_ON_0;
	coutYellowText(ACTIVATION_REQUESTS);
	cout << setw(17) << "Логин:" << setw(10) << "Роль:" << setw(14) << "Доступ:\n";
	int amountOfAccountNoActivation = DATA_EMPTY;  //Инициализация переменной счетчика аккаунтов без доступа
	for (int numberAccount = 0; numberAccount < amountOfAccounts; numberAccount++) {
		if (accounts[numberAccount].access == NO_ACCESS) {   //Проверка на доступ аккаунта и вывод соответ данных
			amountOfAccountNoActivation++;    //Увеличение аккаунтов без доступа
			cout << "Данные №" << amountOfAccountNoActivation << ": ";
			printAccount(accounts, numberAccount);
		}
	}
}

//Блокировка заявки на активацию аккаунта
void blockingAccount(account* (&accounts), int& amountOfAccounts, int activeAccount) {

	int amountOfAccountWithActivation = accountsWithoAccess(accounts, amountOfAccounts);  //Количество аккаунтов без доступа
	account* accountsWithAccess = createArrOfAccountsWithAccess(accounts, amountOfAccounts, amountOfAccountWithActivation);  //Создание массива аккаунтов без доступа

	if (amountOfAccountWithActivation != DATA_EMPTY) {
		printAccountsForConfirmBlocking(accounts, amountOfAccounts);   //Вывод завок на регистрацию
		confirmBlocking(accounts, accountsWithAccess, amountOfAccounts, amountOfAccountWithActivation, activeAccount);  //Функция выбора одобрения заявок
	}
	else {   //Проверка на наличие заявок
		coutBlueText(NO_BLOCK_REQUESTS);
	}
}
void confirmBlocking(account* (&accounts), account* (&accountsWithAccess), int amountOfAccounts, int amountOfAccountWithActivation, int activeAccount) {

	coutBlueText(ENTER_FOR_BLOCKING);
	int numberApplication = inputNumber(BACK, amountOfAccountWithActivation);  //Выбор номера заявки для активации

	if (numberApplication == BACK) {     //Если вернуться назад
		return;
	}
	else if (accounts[numberApplication - 1].login == accounts[activeAccount].login) {  //Если вы хотите заблокировать свой аккаунтт
		coutRedText( YOU_CANNOT_BLOCK_YOUR_ACCOUNT);
		return;
	}
	else if (accounts[numberApplication - 1].role == ADMIN_MAIN) {   //Если хотите заблокировать главного админа
		coutRedText( YOU_CANNOT_DISABLE_MAIN_ADMIN);
		return;
	}
	else {
		coutBlueText(CONFIRMATION_BLOCKING);
		if (confirmation()) {  //Если согласны на активацию аккаунта
			numberApplication--;  //Уменьшаем на 1
			for (int numberAccount = 0; numberAccount < amountOfAccounts; numberAccount++) {
				if (accounts[numberAccount].login == accountsWithAccess[numberApplication].login) {
					accounts[numberAccount].access = NO_ACCESS;  //Меняем на доступ
					break;
				}
			}
			coutGreenText(ACCOUNT_BLOCKING);
			savingAccount(accounts, amountOfAccounts, "accounts.txt");
		}
		else {
			coutRedText( ACCOUNT_NOT_BLOCKED);
		}
	}
}

//Подсчет аккаунтов с доступа
int accountsWithoAccess(account* (&accounts), int amountOfAccounts) {

	int amountOfAccountWithActivation = DATA_EMPTY;   //Инициалзация переменной счетчика аккаунтов без доступа
	for (int numberAccount = 0; numberAccount < amountOfAccounts; numberAccount++) {
		if (accounts[numberAccount].access == ACCESS) {  //Проверка на доступ аккаунта
			amountOfAccountWithActivation++;  //Увеличение аккаунтов без доступа
		}
	}
	return  amountOfAccountWithActivation;   //Возвращаем количество аккаунтов без доступа
}

//Запись аккаунтов с доступов в отдельный массив
account* createArrOfAccountsWithAccess(account* (&accounts), int amountOfAccounts, int amountOfAccountWithActivation) {

	account* accountsWithAccess = new account[amountOfAccountWithActivation];  //Выделяем память под новый массив
	amountOfAccountWithActivation = DATA_EMPTY;     //Инициализация счетчика аккаунтов без доступа
	for (int numberAccount = 0; numberAccount < amountOfAccounts; numberAccount++) {
		if (accounts[numberAccount].access == ACCESS) {  //Проверка на доступ аккаунтв
			accountsWithAccess[amountOfAccountWithActivation].login = accounts[numberAccount].login;  //Переписываем данные в новый массив
			amountOfAccountWithActivation++;  //Увеличиваем количество аккаунтов без доступа
		}
	}
	return accountsWithAccess;  //Возвращаем указатель на массив аккаунтов без доступа
}

//Вывод акккаунтов имеющих доступа
void printAccountsForConfirmBlocking(account* (&accounts), int amountOfAccounts) {

	system("cls");
	cout << BACK_ON_0;
	coutYellowText(BLOCKING_REQUESTS);
	cout <<endl<< setw(17) << "Логин:" << setw(10) << "Роль:" << setw(14) << "Доступ:\n";
	int amountOfAccountNoActivation = DATA_EMPTY;  //Инициализация переменной счетчика аккаунтов без доступа
	for (int numberAccount = 0; numberAccount < amountOfAccounts; numberAccount++) {
		if (accounts[numberAccount].access == ACCESS) {   //Проверка на доступ аккаунта и вывод соответ данных
			amountOfAccountNoActivation++;    //Увеличение аккаунтов без доступа
			cout << "Данные №" << amountOfAccountNoActivation << ": ";
			printAccount(accounts, numberAccount);
		}
	}
}
//----------------------------------------------------Функции работы с учетными записями конец-------------------------------------------------



//---------------------------------------------------Функции работы данными пациентов начало------------------------------------------------------
//Чтение данных пациентов в структуру
void openingFilePatients(dataPatients* (&patients), int& amountOfPatients, string fileName) {

	ifstream reading(fileName); //поток для чтения из файла
	int numberPatients = 0;
	while (!reading.eof()) {    //Пока файл не пустой
		if (numberPatients < RESERVE_AMOUNT_OF_PATIENT) {
			reading >> patients[numberPatients].surname
				>> patients[numberPatients].name
				>> patients[numberPatients].patronymic
				>> patients[numberPatients].gender
				>> patients[numberPatients].dateOfBirth.day
				>> patients[numberPatients].dateOfBirth.month
				>> patients[numberPatients].dateOfBirth.year
				>> patients[numberPatients].town
				>> patients[numberPatients].phoneNumber
				>> patients[numberPatients].diagnosis;
			if (patients[numberPatients].surname.empty()) {
				break;
			}
			numberPatients++;   //Считаем количество пациентов
		}
	}
	amountOfPatients = numberPatients;  //Присваиваем количество пациентов
	reading.close();  //Закрываем файл
}

//Добавление пациента
void addPatient(dataPatients* (&patients), int& amountOfPatients) {

	//Создаем новый временный массив
	dataPatients* buf;
	buf = new dataPatients[amountOfPatients];
	copy(buf, patients, amountOfPatients);

	//Добавляем количество пациентов
	amountOfPatients++;
	patients = new dataPatients[amountOfPatients];
	copy(patients, buf, --amountOfPatients);

	//Заполняем данные для добавления
	system("cls");
	cout << INPUT_DATA;
	cout << INPUT_ADD_SURNAME;        patients[amountOfPatients].surname = inputValidationString(LETTERS_SYMBOLS);
	cout << INPUT_ADD_NAME;           patients[amountOfPatients].name = inputValidationString(LETTERS_SYMBOLS);
	cout << INPUT_ADD_PATRONYMIC;     patients[amountOfPatients].patronymic = inputValidationString(LETTERS_SYMBOLS);
	cout << INPUT_ADD_GENDER;         patients[amountOfPatients].gender = inputValidationString(LETTERS_SYMBOLS);
	cout << INPUT_ADD_DATE_BIRTH;     inputDateOfBirth(patients, amountOfPatients); cin.ignore();
	cout << INPUT_ADD_TOWN;           patients[amountOfPatients].town = inputValidationString(LETTERS_SYMBOLS);
	cout << INPUT_ADD_PHONE;          patients[amountOfPatients].phoneNumber = inputValidationString(NUMBER_SYMBOLS);
	cout << INPUT_ADD_DIAGNOSIS;      patients[amountOfPatients].diagnosis = inputValidationString(LETTERS_SYMBOLS);

	cout << CONFIRMATION_ADD;
	if (confirmation()) {   //Если согласны на добавление пациента
		amountOfPatients++;   //Увеличиваем количество пациентов
		savingPatients(patients, amountOfPatients, "patients.txt");   //Сохраняем изменения
		coutGreenText(DATA_HAS_ADD);
	}
	else {
		coutRedText(DATA_NOT_HAS_ADD);
	}
	delete[]buf;  //Удаляем временный массив
}

//Ввод даты рождения
void inputDateOfBirth(dataPatients*(&patients), int amountOfPatients) {
	//Ввод даты рождения пациента
	int day, month, year;
	while (true) { //Выполняем цикл пока не будет правильный ввод
		  //Вводим день, месяц, год по календарному принципу
		cout << DAY;    cin >> day;
		cout << MONTH;  cin >> month;
		cout << YEAR;   cin >> year;
		if (validationInputData(day, month, year)) {  //Если данные введены правильно и соответсвуют корректному тип присваиваиваем значения
			patients[amountOfPatients].dateOfBirth.day = day;
			patients[amountOfPatients].dateOfBirth.month = month;
			patients[amountOfPatients].dateOfBirth.year = year;
			break;
		}
		else {  //Если данные введены неправильно , повторный ввод
			coutRedText( INCCORECT_INPUT_DATE_OF_BIRTH);
		}
	}
}

//Добавление пациента , увеличиваем размер структуры
void copy(dataPatients* (&patientstNew), dataPatients* (patientsOld), int amountOfPatients) {

	for (int numberPatient = 0; numberPatient < amountOfPatients; numberPatient++) {
		patientstNew[numberPatient] = patientsOld[numberPatient];  //каждый элемент массива , присваиваем в новый массив
	}
}

//Сохрание данных пациентов в файл
void savingPatients(dataPatients * patients, int amountOfPatients, string fileName) {

	ofstream record(fileName, ios::out); //Создаем поток для записи, открываем файл и делаем его пустым
	if (record) {  //если файл открылся

		//Записываем данные в файл
		for (int numberPatient = 0; numberPatient < amountOfPatients; numberPatient++) {
			record << patients[numberPatient].surname << "  "
				<< patients[numberPatient].name << "  "
				<< patients[numberPatient].patronymic << "  "
				<< patients[numberPatient].gender << "  "
				<< patients[numberPatient].dateOfBirth.day << " "
				<< patients[numberPatient].dateOfBirth.month << " "
				<< patients[numberPatient].dateOfBirth.year << "  "
				<< patients[numberPatient].town << "  "
				<< patients[numberPatient].phoneNumber << " ";

			if (numberPatient < amountOfPatients - 1) { //Если элемент не последний делаем отступ на след строчку
				record << patients[numberPatient].diagnosis << endl;
			}
			else {  //Если элемнт последний делаем отступ на след строчку
				record << patients[numberPatient].diagnosis;
			}
		}
	}
	else {  //Если файл не открылся
		coutRedText(ERROR_OPEN_FAIL);
	}
	record.close();  //Закрываем файл
}

//Удаление пациента
void deletePatient(dataPatients* (&patients), int& amountOfPatients) {

	printAllPatients(patients, amountOfPatients);  //Вывод всех пациентов
	cout << "\n\nДля того , чтобы вернуться назад нажмите - '0'\nВведите номер пациента от 1 до " << amountOfPatients << " которого хотите удалить << ";
	int numberDeletePatient = inputNumber(BACK, amountOfPatients);  //Ввод номера данного , который хотите удалить

	if (numberDeletePatient == BACK) {  //Если выбрали вернуться назад
		return;
	}
	else {
		cout << CONFIRMATION_DELETE_PATIENT;
		if (confirmation()) {   //Если подтверддили действие
			numberDeletePatient--;  //Уменьшаем номер пациента
			for (int numberOfPatient = numberDeletePatient; numberOfPatient < amountOfPatients - 1; numberOfPatient++) {
				patients[numberOfPatient] = patients[numberOfPatient + 1];
			}
			amountOfPatients--;  //Уменьшаем количетво пациентов
			savingPatients(patients, amountOfPatients, "patients.txt");   //Сохраняем изменение
			coutGreenText(PATIENT_DELETE);
		}
		else {
			coutRedText(PATIENT_NOT_DELETE);
		}
	}
}

//Вывод всех данных в консоль
void printAllPatients(dataPatients* (&patients), int& amountOfPatients) {

	printShapka();
	for (int numberPatient = 0; numberPatient < amountOfPatients; numberPatient++) {  //Выводим все данные в консоль
		cout << "Данные № " << numberPatient + 1 << ": ";
		printPatient(patients, numberPatient);  //Вывод по одному пациенту в консоль
	}
}

//Вывод шапки
void printShapka() {

	cout << setw(100) << "Пациенты №4 Городской больницы г.Минска\n\n\n";
	cout << setw(40) << "ФИО" << setw(35) << "Пол" << setw(24) << "Дата рождения" << setw(20) << "Место жительства" <<
		setw(18) << "Номер телефона" << setw(15) << "Диагноз\n" << endl;
}

//Вывод всех иногодних студентов
void printNonresidentPatients(dataPatients* patients, int amountOfData) {

	bool correct = false;  //Для проверки имеются ли иногордние пациента
	cout << setw(100); coutYellowText(NONRESIDENT_PATIENTS);
	printShapka();
	for (int numberPatient = 0; numberPatient < amountOfData; numberPatient++) {
		if (patients[numberPatient].town != NO_NONRESIDENT) {  //Если город иногородний
			correct = true;
			cout << "Данные №" << numberPatient + 1 << ": ";
			printPatient(patients, numberPatient);  //Вывод одного пациента в консоль
		}
	}
	if (correct == false) {   //Если нет иногородних пациентов
		coutBlueText(NOT_NONRESIDENT_PATIENTS);
	}
}

//Вывод данных одного пациента
void printPatient(dataPatients* patients, int numberPatient) {

	cout <<setw(15)<< patients[numberPatient].surname << setw(16) << patients[numberPatient].name << setw(20) << patients[numberPatient].patronymic << setw(15) << patients[numberPatient].gender<<setw(10);
	if (patients[numberPatient].dateOfBirth.day < 10) {
		cout << "0" << patients[numberPatient].dateOfBirth.day << ".";
	}
	else {
		cout << patients[numberPatient].dateOfBirth.day << ".";
	}
	if (patients[numberPatient].dateOfBirth.month < 10) {
		cout << "0" << patients[numberPatient].dateOfBirth.month << ".";
	}
	else {
		cout << patients[numberPatient].dateOfBirth.month << ".";
	}
	cout << patients[numberPatient].dateOfBirth.year << setw(18) << patients[numberPatient].town << setw(18) << patients[numberPatient].phoneNumber << setw(18) << patients[numberPatient].diagnosis << endl;

	cout << "____________________________________________________________________________________________________________________________________________________________________" << endl;

}
//---------------------------------------------------Функции работы с данными пациентов конец-------------------------------------------------------


//--------------------------------------------------Функции изменения цвета текста начало-----------------------------------------------------
//Красный цвет текста
void coutRedText(string LOGIN_IS_BUSY) {
	HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
	SetConsoleTextAttribute(hConsole, FOREGROUND_RED);
	cout << LOGIN_IS_BUSY;
	SetConsoleTextAttribute(hConsole, FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE);
}

//Зеленый цвет текста
void coutGreenText(string LOGIN_IS_BUSY) {
	HANDLE  hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
	SetConsoleTextAttribute(hConsole, FOREGROUND_GREEN);
	cout << LOGIN_IS_BUSY;
	SetConsoleTextAttribute(hConsole, FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE);
}

//Голубой цвет текста
void coutBlueText(string LOGIN_IS_BUSY) {
	HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
	SetConsoleTextAttribute(hConsole, FOREGROUND_BLUE);
	cout << LOGIN_IS_BUSY;
	SetConsoleTextAttribute(hConsole, FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE);
}

//Желтый цвет текста
void coutYellowText(string LOGIN_IS_BUSY) {
	HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
	SetConsoleTextAttribute(hConsole, FOREGROUND_BLUE | FOREGROUND_RED);
	cout << LOGIN_IS_BUSY;
	SetConsoleTextAttribute(hConsole, FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE);
}
//--------------------------------------------------Функции изменения цвета текста начало-----------------------------------------------------

