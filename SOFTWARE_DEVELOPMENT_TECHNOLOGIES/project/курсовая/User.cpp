//Подключаем заголовочный файл
#include"User.h" 


//Главное меню пользователя
void mainUserMenu() {
	system("cls");      
	coutYellowText(USER_FUNCTIONALITY);
    cout << "1. Просмотр всех пациентов\n"
		<< "2. Вывести всех иногородних пациентов\n"
		<< "3. Поиск данных\n"
		<< "4. Сортировка данных\n"
		<< "5. Фильтрация данных\n"
		<< "6. Изменить пароль\n"
		<< "0. Выйти из функционала пользователя\n"
		<< "<< ";
}

//Функционал пользователя
void user(account*(&accounts), int &amountOfAccounts, int activeAccount, dataPatients*(&patients), int &amountOfPatients) {

	mainUserMenu();  //Вызов главного меню пользователя
	int choiceUser = inputNumber(EXIT_FROM_USER, EDIT_PASSWORD);  //Выбор действия пользователя и проверка на численный ввод

	switch (choiceUser) {   //Передаем выбор действия от пользователя
	case VIEW_ALL_PATIENTS: {  //Просмотр всех пациентов
		if (amountOfPatients != DATA_EMPTY) {  //Если есть пациенты в массиве
			printAllPatients(patients, amountOfPatients);
		}
		else {  //Если нет пациентов в массиве
			coutBlueText(NO_PATIENTS);
		}
		break;
	}
	case VIEW_NONRESIDENT: {   //Иногородние пациенты
		if (amountOfPatients != DATA_EMPTY) {  //Если есть пациенты в массиве
			printNonresidentPatients(patients, amountOfPatients);
		}
		else {  //Если нет пациентов в массиве
			coutBlueText(NO_PATIENTS);
		}
		break;
	}
	case SEARCH: {  //Поиск
		if (amountOfPatients != DATA_EMPTY) {  //Если есть пациенты в массиве
			search(patients, amountOfPatients);
		}
		else {  //Если нет пациентов в массиве
			coutBlueText(NO_PATIENTS);
		}
		break;
	}
	case SORT: {  //Сортировка 
		if (amountOfPatients != DATA_EMPTY) {  //Если есть пациенты в массиве
			sort(patients, amountOfPatients);
		}
		else {  //Если нет пациентов в массиве
			coutBlueText(NO_PATIENTS);
		}
		break;
	}
	case FILTRATION: {  //Фильтрация
		if (amountOfPatients != DATA_EMPTY) {  //Если есть пациенты в массиве
			filtration(patients, amountOfPatients);
		}
		else {  //Если нет пациентов в массиве
			coutBlueText(NO_PATIENTS);
		}
		break;
	}
	case EDIT_PASSWORD: {  //Изменить пароль  
		passwordEdit(accounts, amountOfAccounts, activeAccount);
		break;
	}
	case EXIT_FROM_USER: {  //Выход из аккаунта админа
		exitFromAccount(accounts, amountOfAccounts, activeAccount, patients, amountOfPatients, user);
		return;
	}
	}
	system("pause");
	user(accounts, amountOfAccounts, activeAccount, patients, amountOfPatients);
}




