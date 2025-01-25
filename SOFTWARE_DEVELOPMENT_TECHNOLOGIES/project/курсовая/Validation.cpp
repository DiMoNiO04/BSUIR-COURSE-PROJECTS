//Подключаем заголовочный файл
#include "Validation.h"


 //Ввод и проверка на корректный ввод
int inputNumber(int left_range, int right_range) {

	int number;   //Номер данного
	while (true) { //Выполняем цикл пока не будет правильный ввод
		cin >> number;  //Вводим номер 
		if (isNumberNumeric() && isNumberRangeCorrect(number, left_range, right_range)) {  //Если данные введены правильно
			return number;   //Возвращаем номер выбраного действия
		}
		else {  //Если данные введены неправильно , повторный ввод
			coutRedText(INCORRECT_INPUT);
		}
	}
}
bool isNumberNumeric() {

	if (cin.get() == '\n') {  //Еще один вызов функции, которая считывает данные из входного потока данных
		return true;
	}
	else {
		cin.clear();   //Сбрасывает флаг ошибок, в потивном случае вызов сin не сработает
		cin.ignore(256, '\n'); //Очистка потока(отбрасываем максимальное число символов, которое может содерать поток, до первого перевода строки включительно)
		return false;
	}
}

//Проверка номера данного , попадающей под границы выбора
bool isNumberRangeCorrect(int number, int left_range, int right_range) {

	if ((number >= left_range) && (number <= right_range)) {    //Если входит в допустимые границы
		return true;  //Возвращаем данные
	}
	else {    //Если не входит в допустимые границы 
		return false;  //Повторяем ввод
	}
}

//Проверка вводимой даты рождения
bool validationInputData(int day, int month, int year) {

	//Проверка вводимой даты рождения по календарному принципу
	if (day < BORDER_DAYS_START || month < JANUARY || month > BORDER_MONTH_END)
		return false;
	else if (month == FEBRUARY && day > FEBRUARURY_DAYS)
		return false;
	else if ((month == JANUARY || month == MARCH || month == MAY || month == JULY || month == AUGUST || month == OCTOBER || month == DECEMBER) && day > FULL_MONTH)
		return false;
	else if ((month == APRIL || month == JUNE || month == SEPTEMBER || month == NOVEMBER) && day > NO_FULL_MONTH)
		return false;
	else if (year < BORDER_YEAR_START || year >= BORDER_YEAR_END)
		return false;
	else
		return true;
}

int inputday(int left_range, int right_range) {

	int number;   //Номер данного
	while (true) { //Выполняем цикл пока не будет правильный ввод
		cin >> number;  //Вводим номер 
		if (isNumberNumeric() && isNumberRangeCorrect(number, left_range, right_range)) {  //Если данные введены правильно
			return number;   //Возвращаем номер выбраного действия
		}
		else {  //Если данные введены неправильно , повторный ввод
			coutRedText(INCORRECT_INPUT);
		}
	}
}

//Функция ввода пароля и делаем его звездочками
string inputPassword() {
	
	string password;  //Пароль
	int ch = 0;
	while (true) {
		ch = _getch(); //Считываем и возвращаем поссимвольно , но не возвращаем

		if (ch == KEY_ENTER) {  //Если нажимаем ENTER, завершаем ввод
			break;
		}
		else if (ch == KEY_DELETE) { //Если нажимаем DELETE
			cout << (char)KEY_DELETE << " " << (char)KEY_DELETE;//При нажатии delete  удаляем звездочки с консоли
			if (!password.empty()) {  //Пока строка не пустая
				password.erase(password.length() - 1); //удаляет из строки password  с символа с индексом длина строки-1
			}
		}
		else {  //При вводе правильных символов
			cout << "*";
			password = password + (char)ch; //Заменяем на звездочки
		}
	}
	return password;
}


//-----------------------------------------------------Хеширование паролей старт---------------------------------------------------------------
//Функция генерации соли
string generateSalt(int salt_size){

	string symbols = getSymbolsForSalt();
	srand(time(NULL));
	string salt;
	salt.reserve(salt_size);

	for (int i = 0; i < salt_size; i++)
	{
		salt.push_back(symbols[rand() % SYMBOLS_SIZE]);
	}
	return salt;
}

//Функция формирования набора символов
string getSymbolsForSalt(){

	string symbols;
	symbols.reserve(SYMBOLS_SIZE);

	char little_letter = 'a';
	char big_letter = 'A';
	char number = '0';
	int i = 0;
	for (int k = 0; k < 26; k++){
		symbols.push_back(little_letter++);
		symbols.push_back(big_letter++);
		if (k < 10) symbols.push_back(number++);
	}
	return symbols;
}

//Функция генерациии соли для пароля
string generationHashForPassword(string password) {

	string salt = generateSalt(SALT_SIZE); // генерируем соль

	string hash = sha256(sha256(password) + sha256(password));
	return hash;
}
//----------------------------------------------------Хеширование паролей конец---------------------------------------------------------------


//---------------------------------------------------Проверка на допустимые символы в пароле и логине старт------------------------------------
//Проверка на корректный ввод пароля и логина
string inputValidationPasswordOrLogin() {

	string editPassword;
	while (true) {
		cin >> editPassword;  //Вводим данные
		if (isLoginPasswordRangeCorrect(editPassword)) {  //Если данные введены правильно
			return editPassword;   //Возвращаем строку
		}
		else {  //Если данные введены неправильно , повторный ввод
			coutRedText(INCORRECT_INPUT);
		}
	}
}

//Проверка на ввод правильности символов
bool isLoginPasswordRangeCorrect(string editData) {

	size_t found = editData.find_first_not_of("QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890"); //Символы которые может содежать
	if (editData != EXIT_FROM_INPUT) {  //Если не выбрали шаг назад
		if (found != string::npos || editData.length() < MIN_SYMBOLS_FOR_INPUT) {
			return false;
		}
		else {    //Если не входит в допустимые границы 
			return true;  //Повторяем ввод
		}
	}
}
//--------------------------------------------------Проверка на допустимые символы в пароле и логине конец-------------------------------------

//Корректный ввод строки
string inputValidationString(string SYMBOLS) {
	
	string str;
	while (true) { //Выполняем цикл пока не будет правильный ввод
		getline(cin, str);
		if (isStringRangeCorrect(str, SYMBOLS)) {  //Если данные введены правильно
			return str;
		}
		else {  //Если данные введены неправильно , повторный ввод
			coutRedText(INCORRECT_INPUT);
		}
	}
}

//Корректный ввод строки
bool isStringRangeCorrect(string str, string SYMBOLS) {

	size_t found = str.find_first_not_of(SYMBOLS); //Символы которые может содежать
	if (SYMBOLS == NUMBER_SYMBOLS) {
		if (str.length() != 13 && str.length() != 11) {
			return false;
		}
	}
	if (found != string::npos) {
		return false;
	}
	else {    //Если не входит в допустимые границы 
		return true;  //Повторяем ввод
	}
}

//Подтверждение действия
int confirmation() {

	int confirmation = inputNumber(YES, NO);  //Выбираем да или нет
	if (confirmation == YES) {   //Если да 
		return true;
	}
	else {   //Если нет
		return false;
	}
}
