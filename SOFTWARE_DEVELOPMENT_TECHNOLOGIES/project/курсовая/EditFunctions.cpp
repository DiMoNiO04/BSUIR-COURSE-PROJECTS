//Подключаем заголовочные файлы
#include"EditFunctions.h"


//-----------------------------------------------Общие функции--------------------------------------------------------------------------------
//Ввод данных изменения
string inputEditString(string INPUT_DATA, string editData, string SYMBOLS) {

	cout << INPUT_DATA;
	editData = inputValidationString(SYMBOLS);
	return editData;
}

//Меню подтверждения действия изменения
void menuConfirmationEdit(string LOGIN) {
	cout << "\nВы уверены, что хотите изменить " << LOGIN << "?\n"
		<< "1. Да\n"
		<< "2. Нет\n"
		<< "<< ";
}
//--------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------Редактирование базы данных начало--------------------------------------------------------------
//Меню редактирования пациента
void menuEditDataPatient() {
	cout << "Выберите, что хотите изменить у данного пациента\n"
		<< "1. Фамилию\n"
		<< "2. Имя\n"
		<< "3. Отчество\n"
		<< "4. Пол\n"
		<< "5. Дату рождения\n"
		<< "6. Место жительство\n"
		<< "7. Номер телефона\n"
		<< "8. Диагноз\n"
		<< "0. Выйти из меню редактирования пациента\n"
		<< "<< ";
}

//Редактирование пациентов
void editDataPatient(dataPatients* (&patients), int& amountOfPatients) {

	printAllPatients(patients, amountOfPatients);  //Вывод всех пациентов
	cout << "\nВведите номер пациента от 1 до " << amountOfPatients << " данные, которого хотите изменить << ";
	int numberOfPatient = inputNumber(BACK, amountOfPatients);  //Проверка на корректный ввод номера пациента
	system("cls");

	if (numberOfPatient != BACK) { //Если не 0 (выход назад)

		string editData;
		numberOfPatient--;
		printPatient(patients, numberOfPatient);  //Вывод одного пациента данные которого хотим изменить
		menuEditDataPatient();   //Меню выбора редактирования
		int choiceEditDataPatient = inputNumber(EXIT_MENU_EDIT_PATIENT, DIAGNOSIS_EDIT);   //Проверка на корректный ввод 

		switch (choiceEditDataPatient) {   //Передаем выбор вида изменения
		case SURNAME_EDIT: {  //Редактирование фамилии
			surnamePatientEdit(patients, amountOfPatients, numberOfPatient, editData);
			break;
		}
		case NAME_EDIT: {   //Редактирование  имени
			namePatientEdit(patients, amountOfPatients, numberOfPatient, editData);
			break;
		}
		case PATRONYMIC_EDIT: {  //Редактирование отчества  
			patronymicPatientEdit(patients, amountOfPatients, numberOfPatient, editData);
			break;
		}
		case GENDER_EDIT: {  //Изменение пола
			genderPatientEdit(patients, amountOfPatients, numberOfPatient);
			break;
		}
		case DATA_OF_BIRTH_EDIT: {  //Редактирование даты рождения
			dataOfBirthPatientEdit(patients, amountOfPatients, numberOfPatient);  //Изменеие даты рождения
			break;
		}
		case TOWN_EDIT: {  //Редактирование места жительства
			townPatientEdit(patients, amountOfPatients, numberOfPatient, editData);
			break;
		}
		case PHONE_NUMBER_EDIT: {  //Редактирование номера телефона
			phonenumberPatientEdit(patients, amountOfPatients, numberOfPatient, editData);
			break;
		}
		case DIAGNOSIS_EDIT: {  //Редактирование диагноза
			diagnosisPatientEdit(patients, amountOfPatients, numberOfPatient, editData);
			break;
		}
		case EXIT_MENU_EDIT_PATIENT: { //Выход из меню редактирования
			break;
		}
		}
	}
	else {
		return;
	}
}

//Функция редактирования фамилии данного пациента
void surnamePatientEdit(dataPatients* patients, int amountOfPatients, int numberOfPatient, string editData) {

	editData = inputEditString(INPUT_SURNAME, editData, LETTERS_SYMBOLS); //Вводим новые данные
	menuConfirmationEdit(SURNAME);  //Меню подтверждения
	if (confirmation()) {  //Если согласны на изменение данных
		patients[numberOfPatient].surname = editData;  //Заменяем старые данные на новые
		savingPatients(patients, amountOfPatients, "patients.txt");  //Сохраняем изменения
		coutGreenText(DATA_BEEN_CHANGED);
	}
	else {
		coutRedText(DATA_HAS_NOT_BEEN_CHANGED);
	}
}

//Функция редактирования имени данного пациента
void namePatientEdit(dataPatients* patients, int amountOfPatients, int numberOfPatient, string editData) {

	editData = inputEditString(INPUT_NAME, editData, LETTERS_SYMBOLS);  //Вводим новые данные
	menuConfirmationEdit(NAME);   //Меню подтверждения
	if (confirmation()) {  //Если согласны на изменение данных
		patients[numberOfPatient].name = editData;  //Заменяем старые данные на новые
		savingPatients(patients, amountOfPatients, "patients.txt");  //Сохраняем изменения
		coutGreenText(DATA_BEEN_CHANGED);
	}
	else {
		coutRedText(DATA_HAS_NOT_BEEN_CHANGED);
	}
}

//Функция редактирования отчества данного паациента
void patronymicPatientEdit(dataPatients* patients, int amountOfPatients, int numberOfPatient, string editData) {

	editData = inputEditString(INPUT_PATRONYMIC, editData, LETTERS_SYMBOLS);   //Вводим новые данные
	menuConfirmationEdit(PATRONYMIC);   //Меню подтверждения
	if (confirmation()) {  //Если согласны на изменение данных
		patients[numberOfPatient].patronymic = editData;  //Заменяем старые данные на новые
		savingPatients(patients, amountOfPatients, "patients.txt");  //Сохраняем изменения
		coutGreenText(DATA_BEEN_CHANGED);
	}
	else {
		coutRedText(DATA_HAS_NOT_BEEN_CHANGED);
	}
}

//Функция изменения пола данного пациента
void genderPatientEdit(dataPatients* patients, int amountOfPatients, int numberOfPatient) {

	menuConfirmationEdit(GENDER);  //Меню подтверждения
	if (confirmation()) {  //Если согласны на изменение пола
		if (patients[numberOfPatient].gender == MAN) {  //Если пол был мужской
			patients[numberOfPatient].gender = WOMAN;  //Заменяем на женский
		}
		else {  //Если пол был женский
			patients[numberOfPatient].gender = MAN;  //Заменяем на мужской
		}
		savingPatients(patients, amountOfPatients, "patients.txt");  //Сохраняем изменения
		coutGreenText(DATA_BEEN_CHANGED);
	}
	else {
		coutRedText(DATA_HAS_NOT_BEEN_CHANGED);
	}
}

//Функция редактирования места жительства пациента
void townPatientEdit(dataPatients* patients, int amountOfPatients, int numberOfPatient, string editData) {

	editData = inputEditString(INPUT_TOWN, editData, LETTERS_SYMBOLS);   //Вводим новые данные
	menuConfirmationEdit(TOWN);  //Меню подтверждения    
	if (confirmation()) {  //Если согласны на изменение данных
		patients[numberOfPatient].town = editData;  //Заменяем старые данные на новые
		savingPatients(patients, amountOfPatients, "patients.txt");  //Сохраняем изменения
		coutGreenText(DATA_BEEN_CHANGED);
	}
	else {
		coutRedText(DATA_HAS_NOT_BEEN_CHANGED);
	}
}

//Функция редактиования номера телефона данного пациенат
void phonenumberPatientEdit(dataPatients* patients, int amountOfPatients, int numberOfPatient, string editData) {

	editData = inputEditString(INPUT_PHONE_NUMBER, editData, NUMBER_SYMBOLS);   //Вводим новые данные
	menuConfirmationEdit(PHONE_NUMBER);    //Меню подтверждения
	if (confirmation()) {  //Если согласны на изменение данных
		patients[numberOfPatient].phoneNumber = editData;  //Заменяем старые данные на новые
		savingPatients(patients, amountOfPatients, "patients.txt");  //Сохраняем изменения
		coutGreenText(DATA_BEEN_CHANGED);
	}
	else {
		coutRedText(DATA_HAS_NOT_BEEN_CHANGED);
	}
}

//Функция редактирования даты рождения
void dataOfBirthPatientEdit(dataPatients*(&patients), int &amountOfPatients, int numberOfPatient) {

	//Ввод даты рождения пациента
	int day, month, year;
	while (true) { //Выполняем цикл пока не будет правильный ввод
		  //Вводим день, месяц, год по календарному принципу
		cout << DAY;    cin >> day;
		cout << MONTH;  cin >> month;
		cout << YEAR;   cin >> year;
		if (validationInputData(day, month, year)) {  //Если данные введены правильно и соответсвуют корректному тип присваиваиваем значения
			menuConfirmationEdit(DATA_OF_BIRTH);  //Меню подтверждения    
			if (confirmation()) {  //Если согласны на изменение данных
				patients[numberOfPatient].dateOfBirth.day = day;
				patients[numberOfPatient].dateOfBirth.month = month;
				patients[numberOfPatient].dateOfBirth.year = year;
				savingPatients(patients, amountOfPatients, "patients.txt");  //Сохраняем изменения
				coutGreenText(DATA_BEEN_CHANGED);
			}
			else {
				coutRedText(DATA_HAS_NOT_BEEN_CHANGED);
			}
			break;
		}
		else {  //Если данные введены неправильно , повторный ввод
			coutRedText(INCCORECT_INPUT_DATE_OF_BIRTH);
		}
	}
}

//Функция редактирования диагноза данного пациента
void diagnosisPatientEdit(dataPatients* patients, int amountOfPatients, int numberOfPatient, string editData) {

	editData = inputEditString(INPUT_DIAGNOSIS, editData, LETTERS_SYMBOLS);   //Вводим новые данные
	menuConfirmationEdit(DIAGNOSIS);   //Меню подтверждения
	if (confirmation()) {  //Если согласны на изменение данных
		patients[numberOfPatient].diagnosis = editData;  //Заменяем старые данные на новые
		savingPatients(patients, amountOfPatients, "patients.txt");  //Сохраняем изменения
		coutGreenText(DATA_BEEN_CHANGED);
	}
	else {
		coutRedText(DATA_HAS_NOT_BEEN_CHANGED);
	}
}
//---------------------------------------------Редактирование базы данных конец---------------------------------------------------------------


//---------------------------------------------Редактирование учетных записей начало-----------------------------------------------------------
//Меню редактирования аккаунта
void menuAccountEdit() {
	cout << "\n\nВыберите данные, которые хотите изменить\n"
		<< "1. Логин\n"
		<< "2. Доступ\n"
		<< "3. Роль\n"
		<< "0. Назад\n"
		<< "<< ";
}

//Редактирование данных учетной записи
void editAccount(account* (&accounts), int amountOfAccounts, int activeAccount) {

	printAllAccounts(accounts, amountOfAccounts);   //Вывод всех учетных записей
	cout << "\n\nДля того , чтобы вернуться назад нажмите - '0'\nВведите номер аккаунта от 1 до " << amountOfAccounts << " который хотите изменить << ";
	int numberEditAccount = inputNumber(BACK, amountOfAccounts);  //Ввод номера учетной записи, которую хотим редактировать

	if (numberEditAccount - 1 == activeAccount) {  //Если выбрали свой аккаунт, редактировать нельзя
		HANDLE hOutput = GetStdHandle(STD_OUTPUT_HANDLE);
		SetConsoleTextAttribute(hOutput, FOREGROUND_RED);
		cout << YOU_NOT_EDIT_ACCOUNT;
		SetConsoleTextAttribute(hOutput, FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE);
	}
	else if (numberEditAccount != BACK) {  //Если не выбрали вернуться назад
		system("cls");
		numberEditAccount--;
		cout << DATA_ACCOUNT_FOR_EDIT;
		printAccount(accounts, numberEditAccount);  //Вывод данных выбранной учетной записи
		menuAccountEdit();    //Меню редактирования учетной записи
		int choiceAccountEdit = inputNumber(EXIT_FROM_EDIT_ACCOUNT, ROLE_EDIT);

		switch (choiceAccountEdit) {
		case EDIT_LOGIN_ACCOUNT: {   //Редактирование логина
			loginEdit(accounts, amountOfAccounts, numberEditAccount);
			break;
		}
		case ACCESS_EDIT: {   //Измение доступа
			accessEdit(accounts, amountOfAccounts, numberEditAccount);
			break;
		}
		case ROLE_EDIT: {   //Изменение роли
			roleEdit(accounts, amountOfAccounts, numberEditAccount);
			break;
		}
		case EXIT_FROM_EDIT_ACCOUNT: { //Выход из редактирования аккаунта
			break;
		}
		}
	}
}

//Функция изменение доступа учетной записи
void accessEdit(account* accounts, int amountOfAccounts, int numberAccount) {

	menuConfirmationEdit(ACCES);   //Меню подтверждения
	if (confirmation()) {   //Если согласны
		if (accounts[numberAccount].access == NO_ACCESS) {   //Если было без доступа
			accounts[numberAccount].access = ACCESS;     //Заменяем на с доступом
		}
		else {   //Если было с доступом
			accounts[numberAccount].access = NO_ACCESS;    //Заменяем на без доступа
		}
		savingAccount(accounts, amountOfAccounts, "accounts.txt");   //Сохраняем изменения
		coutGreenText(DATA_BEEN_CHANGED);
	}
	else {
		coutRedText(DATA_HAS_NOT_BEEN_CHANGED);
	}
}

//Функция изменения роли учетной записи
void roleEdit(account* accounts, int amountOfAccounts, int numberAccount) {

	menuConfirmationEdit(ROLE);    //Меню подтверждения
	if (confirmation()) {   //Если согласны   
		if (accounts[numberAccount].role == USER) {   //Если был пользователь
			accounts[numberAccount].role = ADMIN;     //Заменяем на админа
		}
		else {     //Если был админ
			accounts[numberAccount].role = USER;  //Заменяем на пользователя
		}
		savingAccount(accounts, amountOfAccounts, "accounts.txt"); //Сохраняем изменение
		coutGreenText(DATA_BEEN_CHANGED);
	}
	else {
		coutRedText(DATA_HAS_NOT_BEEN_CHANGED);
	}
}

//Функция изменения пароля учетной записи
void passwordEdit(account* accounts, int amountOfAccounts, int numberOfAccount) {

	bool edit = false;
	cout << INPUT_PASSWORD<< BACK_ON_0;
	string password = inputValidationPasswordOrLogin();  //Пароль вводим

	if (password != EXIT_FROM_INPUT) {
		cout << REPEAT_PASSWORD;
		string validationPassword = inputValidationPasswordOrLogin();

		if (validationPassword != EXIT_FROM_INPUT) {
			if (password == validationPassword) {
				menuConfirmationEdit(PASSWORD);
				if (confirmation()) {  //Если согласны на изменения пароля
					accounts[numberOfAccount].hash = generationHashForPassword(password);  //Генерируем хеш
					accounts[numberOfAccount].salt = generateSalt(SALT_SIZE);  //Генерируем соль
					savingAccount(accounts, amountOfAccounts, "accounts.txt");  //Сохраняем изменения
					edit = true;
					coutGreenText(PASSWORD_SUCCESSFULLY_CHANGED);
				}
			}
			else {
				coutRedText(PASSWORDS_DO_NOT_MATCH);
			}
		}
	}
	if (edit == false) {
		coutRedText(PASSWORD_HAS_NOT_BEEN_CHANGED);
	}
}

//Функция изменения логина учетной записи
void loginEdit(account* accounts, int amountOfAccounts, int numberAccount) {

	cout << INPUT_LOGIN<< BACK_ON_0;
	string login = inputValidationPasswordOrLogin();  //Вводим логин
	if (login != EXIT_FROM_INPUT) {   //Если не выбрали вернуться назад
		bool correct = true;   //Разрешение для регистрации
		for (int numberAccount = 0; numberAccount < amountOfAccounts; numberAccount++) {
			if (accounts[numberAccount].login == login) {   //Если логин уже занят
				correct = false;  //Занят
				coutRedText( LOGIN_IS_BUSY);
				break;
			}
		}
		if (correct == true) {  //Если логин введен верно
			menuConfirmationEdit(LOGIN);  //Меню подтверждения
			if (confirmation()) {  //Если согласны на изменения данных
				accounts[numberAccount].login = login;  //Заменяем старые данные на новые
				savingAccount(accounts, amountOfAccounts, "accounts.txt");  //Сохраняем изменения
				coutGreenText(DATA_BEEN_CHANGED);
			}
			else {
				coutRedText(DATA_HAS_NOT_BEEN_CHANGED);
			}
		}
	}
}
//---------------------------------------------Редактирование учетных записей конец------------------------------------------------------------



