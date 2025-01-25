//Подключаем заголовочный файл
#include"Admin.h"

//Главное меню администратора
void menuAdmin() {
	system("cls");
	coutYellowText(ADMIN_FUNCTIONALITY);
	cout << "1. Работа с данными пациентов\n"
		<< "2. Работа с учетными записями\n"
		<< "3. Обработка данных о пациентах\n"
		<< "4. Изменить пароль\n"
		<< "0. Выйти из функционала администратора\n"
		<< "<< ";
}

//Меню обработки информации о пациентах
void menuProccesingPatientsData() {
	system("cls");
	cout << "1. Просмотр информации о всех пациентах\n"
		<< "2. Просмотр информации об иногордних пациентах\n"
		<< "3. Поиск\n"
		<< "4. Сортировка\n"
		<< "5. Фильтрация\n"
		<< "0. Выход из обработки данных о пациентах\n"
		<< "<< ";
}

//Меню работы с данными пациентов
void menuWorkWithPatients() {
	system("cls");
	coutYellowText(ADMIN_FUNCTIONALITY);
	cout << "1. Просмотр всех пациентов\n"
		<< "2. Добавить пациента\n"
		<< "3. Удалить пациента\n"
		<< "4. Редактировать данные пациента\n"
		<< "0. Выйти из редактирования данных пациентов\n"
		<< "<< ";
}

//Меню работы с учетными записями
void menuWorkWithAccount() {
	system("cls");
	coutYellowText( ADMIN_FUNCTIONALITY);
	cout << "1. Просмотреть аккаунты\n"
		<< "2. Активация аккаунтов\n"
		<< "3. Блокировка аккаунтов\n"
		<< "0. Выйти из работы с аккаунтами\n"
		<< "<< ";
}

//Работа с учетными записями
void workWithAccount(account*(&accounts), int& amountOfAccounts, int activeAccount) {

	menuWorkWithAccount();   //Меню работы с учетными записями
	int choiceWorkWithAccounts = inputNumber(EXIT_FROM_WORK_WITH_ACCOUNTS, BLOCKING_ACCOUNTS);  //Выбор действия и проверка на численный ввод
	
	switch (choiceWorkWithAccounts) {   //Передаем выбор действия 
	case VIEW_ACCOUNTS: {  //Просмотр всех учетных записей
		printAllAccounts(accounts, amountOfAccounts);
		break;
	}
	case ACTIVATION_ACCOUNTS: {   //Активация неодобренных заявок
		activationAccount(accounts, amountOfAccounts, activeAccount);
		break;
	}
	case BLOCKING_ACCOUNTS: {     //Блокировка аккаунтов
		blockingAccount(accounts, amountOfAccounts, activeAccount);
		break;
	}
	case EXIT_FROM_WORK_WITH_ACCOUNTS: {  //Выход из работы с учетными записями
		return;
	}
	}
	system("pause");
	workWithAccount(accounts, amountOfAccounts, activeAccount);
}

//Работа с данными пациентов
void workWithPatients(dataPatients* (&patients), int& amountOfPatients) {

	menuWorkWithPatients();  //Вызов меню работы с базой данных
	int choiceWorkWithPatients = inputNumber(EXIT_FROM_WORKING_WITH_PATIENTS, EDIT_PATIENTS);  //Выбор действия  и проверка на численный ввод

	switch (choiceWorkWithPatients) {   //Передаем выбор действия 
	case VIEW_PATIENTS: {  //Просмотр всех пациентов
		if (amountOfPatients != DATA_EMPTY) {  //Если есть пациенты в массиве
			printAllPatients(patients, amountOfPatients);
		}
		else {
			coutBlueText(NO_PATIENTS);
		}
		break;
	}
	case ADD_PATIENTS: {  //Добавление пациента
		addPatient(patients, amountOfPatients);
		break;
	}
	case DELETE_PATIENTS: {   //Удаление пациента
		if (amountOfPatients != DATA_EMPTY) {//Если есть пациенты в массиве
			deletePatient(patients, amountOfPatients);
		}
		else {
			coutBlueText(NO_PATIENTS);
		}
		break;
	}
	case EDIT_PATIENTS: {  //Редактирование пациентов
		if (amountOfPatients != DATA_EMPTY) {//Если есть пациенты в массиве
			editDataPatient(patients, amountOfPatients);
		}
		else {
			coutBlueText(NO_PATIENTS);
		}
		break;
	}
	case EXIT_FROM_WORKING_WITH_PATIENTS: {  //Выход из работы с данными пациентами
		return;
	}
	}
	system("pause");
	workWithPatients(patients, amountOfPatients);
}

//Обработка данных о пациентах
void proccesingPatientsData(dataPatients* (&patients), int& amountOfPatients) {

	menuProccesingPatientsData();  //Вызов меню режима обработки данных о пациентах
	int choiceProccessingPatientsData = inputNumber(EXIT_FROM_WORKING_WITH_PATIENTS, FILTRATION_PATIENTS);  //Выбор действия и проверка на численный ввод

	switch (choiceProccessingPatientsData) {   //Передаем выбор действия от пользователя
	case VIEW_PATIENTS_ALL: {  //Просмотр всех пациентов
		printAllPatients(patients, amountOfPatients);
		break;
	}
	case VIEW_NONRESIDENT_PATIENTS: {   //Иногородние пациенты
		printNonresidentPatients(patients, amountOfPatients);
		break;
	}
	case SEARCH_PATIENTS: {  //Поиск
		search(patients, amountOfPatients);
		break;
	}
	case SORT_PATIENTS: {  //Сортировка 
		sort(patients, amountOfPatients);
		break;
	}
	case FILTRATION_PATIENTS: {  //Фильтрация
		filtration(patients, amountOfPatients);
		break;
	}
	case EXIT_FROM_WORKING_WITH_PATIENTS: {
		return;
	}
	}
	system("pause");
	proccesingPatientsData(patients, amountOfPatients);
}

//Функционал администратора
void admin(account* (&accounts), int& amountOfAccounts, int activeAccount, dataPatients* (&patients), int& amountOfPatients) {

	menuAdmin();  //Вызов главного меню админа
	int choiceAdmin = inputNumber(EXIT_FROM_ADMIN, EDIT_MY_PASSWORD);  //Выбор действия админа и проверка на численный ввод
	system("cls");

	switch (choiceAdmin) {     //Передаем выбор действия от пользователя
	case WORK_WITH_PATIENTS: {  //Работа с данными пациентов
		workWithPatients(patients, amountOfPatients);
		break;
	}
	case WORK_WITH_ACCOUNTS: {  //Работа с учетными записями
		workWithAccount(accounts, amountOfAccounts, activeAccount);
		break;
	}
	case DATA_PROCCESING_FOR_PATIENTS: { //Обработка данных о пациентах
		if (amountOfPatients != DATA_EMPTY) {  //Если есь пациенты в массиве
			proccesingPatientsData(patients, amountOfPatients);
		}
		else {
			coutBlueText(NO_PATIENTS);
			system("pause");
		}
		break;
	}
	case EDIT_MY_PASSWORD: { //Изменение пароля админа
		passwordEdit(accounts, amountOfAccounts, activeAccount);
		break;
	}
	case EXIT_FROM_ADMIN: {  //Выход из аккаунта админа
		exitFromAccount(accounts, amountOfAccounts, activeAccount, patients, amountOfPatients, admin);
		return;
	}
	}
	admin(accounts, amountOfAccounts, activeAccount, patients, amountOfPatients);
}



