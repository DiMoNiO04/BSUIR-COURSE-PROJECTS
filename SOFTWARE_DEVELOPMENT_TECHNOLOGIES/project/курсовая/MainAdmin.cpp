//Подключаем заголовочный файл
#include"MainAdmin.h"


//Меню главного администратора
void mainMenuMainAdmin() {
	system("cls");
	coutYellowText( MAIN_ADMIN_FUNCTIONALITY);
	cout << "1. Работа с учетными записями\n"
		<< "2. Обработка данных о пациентах\n"
		<< "3. Изменение своего пароля\n"
		<< "0. Выйти из функционала главного администратора\n"
		<< "<< ";
}

//Меню работы с учетными записями
void menuWorkWithAccounts() {
	system("cls");
	coutYellowText(MAIN_ADMIN_FUNCTIONALITY);
	cout << "1. Просмотр всех учетных записей\n"
		<< "2. Редактирование учетных записей\n"
		<< "3. Удаление учетных записей\n"
		<< "0. Выйти из работы с учетными записями\n"
		<< "<< ";
}

//Работа с учетными записями
void workWithAccounts(account* (&accounts), int& amountOfAccounts, int activeAccount, dataPatients* (&patients), int amountOfPatients) {

	menuWorkWithAccounts();   //Меню работы с учетными записями
	int choiceWorkWithAccounts = inputNumber(EXIT_FROM_WORKING_WITH_ACCOUNTS, DELETE_ACCOUNTS);  //Выбор действия и проверка на численный ввод

	switch (choiceWorkWithAccounts) {   //Передаем выбор действия 
	case VIEW_ALL_ACCOUNTS: {  //Просмотр всех учетных записей
		printAllAccounts(accounts, amountOfAccounts);
		break;
	}
	case EDIT_ACCOUNTS: {  //Редактирование учетных записей
		editAccount(accounts, amountOfAccounts, activeAccount);
		break;
	}
	case DELETE_ACCOUNTS: {  //Удаление учетных записей
		deleteAccounts(accounts, amountOfAccounts, activeAccount, patients, amountOfPatients);
		break;
	}
	case EXIT_FROM_WORKING_WITH_ACCOUNTS: {  //Выход из работы с учетными записями
		return;
	}
	}
	system("pause");
	workWithAccounts(accounts, amountOfAccounts, activeAccount, patients, amountOfPatients);
}

//Функционал главного администратора
void mainAdmin(account* (&accounts), int& amountOfAccounts, int activeAccount, dataPatients* (&patients), int& amountOfPatients) {

	mainMenuMainAdmin();   //Меню работы с учетными записями
	int choiceMainAdmin = inputNumber(EXIT_FROM_MAIN_ADMIN, EDIT_PASSWORD_MAIN_ADMIN);  //Выбор действия и проверка на численный ввод

	switch (choiceMainAdmin) {   //Передаем выбор действия 
	case WORK_WITH_ACCOUNTS_FOR_MAIN_ADMIN: {  //Работа с учетными записями
		workWithAccounts(accounts, amountOfAccounts, activeAccount, patients, amountOfPatients);
		break;
	}
	case PROCCESSING_PATIENTS: {  //Обработка данных о пациентах
		if (amountOfPatients != DATA_EMPTY) {  //Если есь пациенты в массиве
			proccesingPatientsData(patients, amountOfPatients);
		}
		else {
			coutBlueText(PATIENTS_NO);
		}
		break;
	}
	case EDIT_PASSWORD_MAIN_ADMIN: {  //Редактирование пароля
		passwordEdit(accounts, amountOfAccounts, activeAccount);
		break;
	}
	case EXIT_FROM_MAIN_ADMIN: {  //Выход из функционала главного администратора
		exitFromAccount(accounts, amountOfAccounts, activeAccount, patients, amountOfPatients, mainAdmin);
		return;
	}
	}
	system("pause");
	mainAdmin(accounts, amountOfAccounts, activeAccount, patients, amountOfPatients);
}
