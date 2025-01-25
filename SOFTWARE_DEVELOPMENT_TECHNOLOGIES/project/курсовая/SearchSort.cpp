//Подключаем заголовочный файл
#include"SearchSort.h" 

//------------------------------------------------Поиск начало----------------------------------------------------------------------------------
//Меню поиска
void menuSearch() {
	system("cls");   
	cout << "1. Поиск по фамилии\n"
		<< "2. Поиск по имени\n"
		<< "3. Поиск по диагнозу\n"
		<< "4. Поиск по месту жительства\n"
		<< "0. Выйти из меню поиска\n"
		<< "<< ";
}

//Главная функция меню поиска
void search(dataPatients* (&patients), int &amountOfPatients) {

	string searchString;
	bool isCountData = false;

	menuSearch();  //Вызов меню поиска
	int choiceSearch = inputNumber(BACK_FROM_SEARCH, SEARCH_FOR_TOWN);  //Выбор действия в меню и проверка на корректность ввода

	switch (choiceSearch) {  //Выбор какое действие выполнить 
	case SEARCH_FOR_SURNAME: {  //Поиск по фамилии(1)
		searchString = inputAndOutputSearchString(SURNAME, searchString);
		searchForSurname(patients, amountOfPatients, isCountData, searchString);
		break;
	}
	case SEARCH_FOR_NAME: {    //Поиск по имени(2)
		searchString = inputAndOutputSearchString(NAME, searchString);
		searchForName(patients, amountOfPatients, isCountData, searchString);
		break;
	}
	case SEARCH_FOR_DIAGNOSIS: { //Поиск по диагнозу(3)
		searchString = inputAndOutputSearchString(DIAGNOSIS, searchString);
		searchForDiagnosis(patients, amountOfPatients, isCountData, searchString);
		break;
	}
	case SEARCH_FOR_TOWN: {  //Поиск по городу(5)
		searchString = inputAndOutputSearchString(TOWN, searchString);
		searchForTown(patients, amountOfPatients, isCountData, searchString);
		break;
	}
	case BACK_FROM_SEARCH: //Назад (0)
		return;
	}
	system("pause");
	search(patients, amountOfPatients);
}

//Ввод искомых данных
string inputAndOutputSearchString(string SURNAME, string searchString) {

	system("cls");
	cout << "Введите данные " << SURNAME << " которые хотите найти : \n << ";
	searchString = inputValidationString(LETTERS_SYMBOLS);
	cout << setw(100) << FIND_DATA_AFTER_SEARCH;
	return searchString;
}

//Поиск по фамилии
void searchForSurname(dataPatients* patients, int amountOfPatients, int countData, string searchString) {  //Поиск по фамилии

	for (int numberOfPatientsSearch = 0; numberOfPatientsSearch < amountOfPatients; numberOfPatientsSearch++) {
		string str = patients[numberOfPatientsSearch].surname;  //Присваиваем str строку в которой будет искать substr
		size_t substr = str.find(searchString);   //Возвращаемый тип для возрата размера. Ищет в str строке первое вхождение другой строки substr
		if (substr != string::npos) {   //Пока не конец строки
			countData = true;     //Если подстрока имеется 
			printPatient(patients, numberOfPatientsSearch);  //Вывод найденных данных в консоль
		}
	}
	reSearch(patients, amountOfPatients, countData, searchString, SURNAME, searchForSurname);  //Если данные не найдены, повторный поиск
}

//Поиск по имени
void searchForName(dataPatients* patients, int amountOfPatients, int countData, string searchString) {  //Поиск по имени

	for (int numberOfPatientsSearch = 0; numberOfPatientsSearch < amountOfPatients; numberOfPatientsSearch++) {
		string str = patients[numberOfPatientsSearch].name;  //Присваиваем str строку в которой будет искать substr
		size_t substr = str.find(searchString);   //Возвращаемый тип для возрата размера. Ищет в str строке первое вхождение другой строки substr
		if (substr != string::npos) {  //Пока не конец строки
			countData = true;  //Если подстрока имеется 
			printPatient(patients,  numberOfPatientsSearch); //Выводим пациента в консоль
		}
	}
	reSearch(patients, amountOfPatients, countData, searchString, NAME, searchForName);   //Если данные не найдены, повторный поиск
}

//Поиск по диагнозу
void searchForDiagnosis(dataPatients* patients, int amountOfPatients, int countData, string searchString) {  //Поиск по диагнозу

	for (int numberOfPatientsSearch = 0; numberOfPatientsSearch < amountOfPatients; numberOfPatientsSearch++) {
		string str = patients[numberOfPatientsSearch].diagnosis;  //Присваиваем str строку в которой будет искать substr
		size_t substr = str.find(searchString);   //Возвращаемый тип для возрата размера. Ищет в str строке первое вхождение другой строки substr
		if (substr != string::npos) {  //Пока не конец строки
			countData = true;    //Если подстрока имеется
			printPatient(patients, numberOfPatientsSearch);  //Вывод пациента в консоль
		}
	}
	reSearch(patients, amountOfPatients, countData, searchString, DIAGNOSIS, searchForDiagnosis);    //Если данные не найдены, повторный поиск
}

//Поиск по месту жительства
void searchForTown(dataPatients* patients, int amountOfPatients, int countData, string searchString) {  //Поиск по месту жительства

	for (int numberOfPatientsSearch = 0; numberOfPatientsSearch < amountOfPatients; numberOfPatientsSearch++) {
		string str = patients[numberOfPatientsSearch].town;  //Присваиваем str строку в которой будет искать substr
		size_t substr = str.find(searchString); //Возвращаемый тип для возрата размера. Ищет в str строке первое вхождение другой строки substr
		if (substr != string::npos) {  //Пока не конец строки
			countData++;  //Если подстрока имеется
			printPatient(patients, numberOfPatientsSearch);   //Вывод пациента в консоль
		}
	}
	reSearch(patients, amountOfPatients, countData, searchString, TOWN, searchForDiagnosis);   //Если данные не найдены, повторный поиск
}

//Повторный поиск
void reSearch(dataPatients* patients, int amountOfPatients, int countData, string searchString, string SURNAME, void searchForSurname(dataPatients* patients, int amountOfPatients, int contData, string searchString)) { //Повторный поиск
	
	if (countData == false) {   //Если данные не найдены
		coutBlueText( DATA_NOT_FOUND);
		int continueOrBack = inputNumber(BACK_TO_SEARCH_MENU, CONTINUE);  //Выбираем продолжить поиск или вернуться в меню и проверяем на корректный ввод
		if (continueOrBack == CONTINUE) {  //Если выбрали продожить
			searchString = inputAndOutputSearchString(SURNAME, searchString);
			searchForSurname(patients, amountOfPatients, countData, searchString);  //выбираем выриант поиска 
		}
	}
}
//----------------------------------------------------Поиск конец-----------------------------------------------------------------------------


//-------------------------------------------------Сортировка начало---------------------------------------------------------------------------
//Меню сортировки
void menuSort() {
	system("cls");     
	cout << "1. Сортировка по фамилии\n"
		<< "2. Сортировка по имени\n"
		<< "3. Сортировка по возрасту\n"
		<< "4. Сортировка по месту жительства\n"
		<< "0. Выход из меню сортировки\n"
		<< "<< ";
}

//Главная функция сортировки
void sort(dataPatients* (&patients), int &amountOfPatients) {

	menuSort();  //Вызов меню сортировки
	int choiceSort = inputNumber(BACK_FROM_SORT, SORT_FOR_TOWN);  //Выбор действия в меню и проверка на корректность ввода
	system("cls");

	switch (choiceSort) {  //Выбор какое действие выполнить 
	case SORT_FOR_SURNAME: {  //Сортировка по фамилии(1)
		sortForSurnameOrNameOrTown(patients, amountOfPatients, choiceSort, SURNAME, isSortForSurnameAscending, isSortForSurnameDescending);
		break;
	}
	case SORT_FOR_NAME: {    //Сортировка по имени(2)
		sortForSurnameOrNameOrTown(patients, amountOfPatients, choiceSort, NAME, isSortForNameAscending, isSortForNameDescending);
		break;
	}
	case SORT_FOR_AGE: { //Сортировка по возрасту(3)
		sortForAge(patients, amountOfPatients, choiceSort);
		break;
	}
	case SORT_FOR_TOWN: {  //Сортировка по месту жительства(5)
		sortForSurnameOrNameOrTown(patients, amountOfPatients, choiceSort, TOWN, isSortForTownAscending, isSortForTownDescending);
		break;
	}
	case BACK_FROM_SORT: //Назад (0)
		return;
	}
	system("pause");
	sort(patients, amountOfPatients);
}

//Сортировка по фамилии,имени, месту жиельства
void sortForSurnameOrNameOrTown(dataPatients* patients, int amountOfPatients, int choiceSort, string SURNAME, bool isSortForSurnameAscending(dataPatients patients, dataPatients patientsPlus), bool isSortForSurnameDescending(dataPatients patients, dataPatients patientsPlus)) {

	cout << "Сортировка данных по " << SURNAME << ":\n1.От А до Я\n2.От Я до А\n0.Назад\n << ";
	int sortSelection = inputNumber(BACK, DESCENDING);  //Выбор вида сортировки и проверка на корректный ввод
	system("cls");

	if (sortSelection == ASCENDING) {   //Если от А до Я
		sort(patients, patients + amountOfPatients, isSortForSurnameAscending);  //Сортировка от А до Я
		cout << setw(80) << "Пациенты отсортированы по " << SURNAME << "(A - Я)\n";
		printAllPatients(patients, amountOfPatients);   //Вывод отсортированных данных пациентов
	}
	else if (sortSelection == DESCENDING) {  //Если от Я до А
		sort(patients, patients + amountOfPatients, isSortForSurnameDescending);  //Сортировка от Я до А
		cout << setw(80) << "Пациенты отсортированы по " << SURNAME << "(Я - А)\n";
		printAllPatients(patients, amountOfPatients);    //Вывод отсортированных данных пациентов
	}
}

//Сортировка по возрасту
void sortForAge(dataPatients* patients, int amountOfPatients, int choiceSort) {

	cout << MENU_SORT_FOR_AGE;
	int sortSelection = inputNumber(BACK, DESCENDING);  //Выбор вида сортировки и проверка на корректный ввод
	system("cls");   //Очистка консоли

	if (sortSelection == ASCENDING) {   //Если выбор по возрастанию
		sort(patients, patients + amountOfPatients, isSortForDayAscending);   // Функции 
		sort(patients, patients + amountOfPatients, isSortForMonthAscending); // сортировки
		sort(patients, patients + amountOfPatients, isSortForYearAscending);  //Возраста по возрастанию
		cout << setw(80) << SORT_FOR_AGE_ASCENDING;
		printAllPatients(patients, amountOfPatients);   //Вывод всех отсортированных данных в консоль
	}
	else if (sortSelection == DESCENDING) {   //Если по выбор по убыванию
		sort(patients, patients + amountOfPatients, isSortForDayDescending);  //Функции
		sort(patients, patients + amountOfPatients, isSortForMonthDescending);//Сортирвки
		sort(patients, patients + amountOfPatients, isSortForYearDescending); //Возраста по убыванию
		cout << setw(80) << SORT_FOR_AGE_DESCENDING;
		printAllPatients(patients, amountOfPatients);  //Вывод всех отсортированных данных в консоль
	}
}

//----------------------------------------Функции сортировки по ... начало---------------------------------------------------------------------
bool isSortForSurnameAscending(dataPatients patients, dataPatients patientsPlus) {     //Сортировка по фамилии от А до Я
	return patients.surname < patientsPlus.surname;                                    //Сортировка компаратором, определяет какое значение больше-меньше
}
bool isSortForSurnameDescending(dataPatients patients, dataPatients patientsPlus) {    //Сортировка по фамилии от Я до А
	return patients.surname > patientsPlus.surname;                                    //Сортировка компаратором, определяет какое значение больше-меньше
}
bool isSortForNameAscending(dataPatients patients, dataPatients patientsPlus) {        //Сортировка по имени от А до Я
	return patients.name < patientsPlus.name;                                          //Сортировка компаратором, определяет какое значение больше-меньше
}
bool isSortForNameDescending(dataPatients patients, dataPatients patientsPlus) {       //Сортировка по имени от Я до А
	return patients.name > patientsPlus.name;                                          //Сортировка компаратором, определяет какое значение больше-меньше
}
bool isSortForTownDescending(dataPatients patients, dataPatients patientsPlus) {       //Сортировка по месту жительства от Я до А
	return patients.town < patientsPlus.town;                                          //Сортировка компаратором, определяет какое значение больше-меньше
}
bool isSortForTownAscending(dataPatients patients, dataPatients patientsPlus) {        //Сортировка по месту жительства от А до Я
	return patients.town > patientsPlus.town;                                          //Сортировка компаратором, определяет какое значение больше-меньше
}
bool isSortForYearDescending(dataPatients patients, dataPatients patientsPlus) {       //Сортировка года рождения по убыванию
	return patients.dateOfBirth.year < patientsPlus.dateOfBirth.year;                  //Сортировка компаратором, определяет какое значение больше-меньше
}
bool isSortForYearAscending(dataPatients patients, dataPatients patientsPlus) {        //Сортировка года рождения по возрастанию
	return patients.dateOfBirth.year > patientsPlus.dateOfBirth.year;                  //Сортировка компаратором, определяет какое значение больше-меньше
}
bool isSortForMonthDescending(dataPatients patients, dataPatients patientsPlus) {      //Сортировка месяца рождения по убыванию
	return patients.dateOfBirth.month < patientsPlus.dateOfBirth.month;                //Сортировка компаратором, определяет какое значение больше-меньше
}
bool isSortForMonthAscending(dataPatients patients, dataPatients patientsPlus) {       //Сортировка месяца рождения по возрастанию
	return patients.dateOfBirth.month > patientsPlus.dateOfBirth.month;                //Сортировка компаратором, определяет какое значение больше-меньше
}
bool isSortForDayDescending(dataPatients patients, dataPatients patientsPlus) {        //Сортировка дня рождения по убыванию
	return patients.dateOfBirth.day < patientsPlus.dateOfBirth.day;                    //Сортировка компаратором, определяет какое значение больше-меньше
}
bool isSortForDayAscending(dataPatients patients, dataPatients patientsPlus) {         //Сортировка дня рождения по возрастанию
	return patients.dateOfBirth.day > patientsPlus.dateOfBirth.day;                    //Сортировка компаратором, определяет какое значение больше-меньше
}
//----------------------------------------------Функции сортировки по .... конец--------------------------------------------------------------
//----------------------------------------------------------Сортировка конец-------------------------------------------------------------------


//------------------------------------------------------------Фильтрация данных начало---------------------------------------------------------
//Меню фильтрации
void menuFiltration() {
	system("cls"); 
	cout << "1. Фильтрация по полу\n"
		<< "2. Фильтрация по возрасту и диагнозу\n"
		<< "0. Выход из меню фильтрации\n"
		<< "<< ";
}

//Выбор пола для фильтрации
void menuFiltratonForGender() {
	cout << "1. Вывести пациентов мужского пола\n"
		<<"2. Вывести пациентов женского пола\n"
		<<"0. Назад\n"
		<<"<< ";
}

//Главная функция фильтрации
void filtration(dataPatients* (&patients), int &amountOfPatients) {

	menuFiltration();  //Вызов меню фильтрации
	int choiceFiltr = inputNumber(BACK_FROM_FILTR, FILTR_FOR_AGE_AND_DIAGNOSIS); //Выбор вида фильтрации и корректный ввод
	system("cls");

	switch (choiceFiltr) {  //Выбор какое действие выполнить 
	case FILTR_FOR_GENDER: {  //Фильтрация по полу
		filtrationForGender(patients, amountOfPatients);
		break;
	}
	case FILTR_FOR_AGE_AND_DIAGNOSIS: {    //Фильтрация по возрасту и диагнозу
		filtrationForAgeAndDiagnosis(patients, amountOfPatients);
		break;
	}
	case BACK_FROM_FILTR: //Назад (0)
		return;
	}
}

//Фильтрация по полу
void filtrationForGender(dataPatients* patients, int amountOfPatients) {

	menuFiltratonForGender();   //Меню фильтрации по полу
	int choiceFiltrGender = inputNumber(BACK, WOMAN_GENDER);  //Выбираем пол для фильтрации
	if (choiceFiltrGender == MAN_GENDER) {   //Если мужской пол
		filtrForGender(patients, amountOfPatients, choiceFiltrGender, MAN_GENDER, MAN);  //Выводим мужчин
	}
	else if (choiceFiltrGender == WOMAN_GENDER) {   //Если женский пол
		filtrForGender(patients, amountOfPatients, choiceFiltrGender, WOMAN_GENDER, WOMAN);   //Выводим женщиг
	}
}
void filtrForGender(dataPatients* patients, int amountOfPatients, int choiceFiltrGender, int MAN_GENDER, string MAN) {

	bool correct = false;  //Для проверки есть ли пациенты с таким полом
	cout << setw(60) << "Пациенты " << MAN << " пола:\n";
	for (int numberPatient = 0; numberPatient < amountOfPatients; numberPatient++) {
		if (patients[numberPatient].gender == MAN) {
			correct = true;
			printPatient(patients, numberPatient);
		}
	}
	if (correct == false) {   //Пациентов с таким гендерным полом нет
		coutBlueText(NO_PATIENTS_GENDER);
	}
}

//Фильтрация по возрасту и диагнозу
void filtrationForAgeAndDiagnosis(dataPatients* patients, int amountOfPatients) {  

	//Устанавливаем нанешнюю дату
	SYSTEMTIME st;
	GetLocalTime(&st);
	cout << st.wDay << " " << st.wMonth << " " << st.wYear << endl;

	cout << WHO_AGE_AND_DIAGNOSIS;
	cout << "Старше << ";   //Вводим возраст , который хотим найти
	int filtrAge = inputNumber(MIN_AGE, MAX_AGE);
	cout << "Диагноз << ";  //Вводим диагноз , который хотим найти
	string filtrDiagnosis = inputValidationString(LETTERS_SYMBOLS);
	cout << "\nПациенты старше " << filtrAge << " лет и с диагнозом " << filtrDiagnosis << ":\n";
	filtrForAgeAndDiagnosis(patients, amountOfPatients, filtrAge, filtrDiagnosis, st);
}
void filtrForAgeAndDiagnosis(dataPatients* patients, int amountOfPatients, int filtrAge, string filtrDiagnosis, SYSTEMTIME st) {

	int patientAge, patientMonth, patientDay;
	bool isCountData = false;
	//Высчитываем полное количество лет у пациентов
	for (int numberPatient = 0; numberPatient < amountOfPatients; numberPatient++) {
		patientAge = st.wYear - patients[numberPatient].dateOfBirth.year;
		patientMonth = st.wMonth - patients[numberPatient].dateOfBirth.month;
		patientDay = st.wDay - patients[numberPatient].dateOfBirth.day;
		if (patientMonth < 0 || patientDay < 0) patientAge = patientAge - 1;
		if (patientMonth < 0 && patientDay <= 0) patientMonth = 12 + patientMonth - 1;
		if (patientMonth < 0 && patientDay > 0) patientMonth = 12 + patientMonth;
		if (patientMonth >= 0 && patientDay < 0) patientDay = patients[numberPatient].dateOfBirth.day + patientDay;
		if (filtrAge <= patientAge && filtrDiagnosis == patients[numberPatient].diagnosis) {
			isCountData = true;
			printPatient(patients, numberPatient);  //Вывод одного пациента в консоль
		}
	}
	if (isCountData == false) {
		coutRedText(SEARCH_NOT_FOUND);
	}
}
//-----------------------------------------------------------Фильтрация данных конец-----------------------------------------------------------
