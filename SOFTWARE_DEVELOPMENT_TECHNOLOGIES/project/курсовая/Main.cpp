//Подключаем заголовочные файлы старт
#include"Functions.h"
#include "Autorization.h"

int main() {
	//Руссификация консоли
	SetConsoleCP(1251);  //Установка кодовой страницы win-cp 1251 и поток ввода
	SetConsoleOutputCP(1251);  //Установка кодовой страницы win-cp 1251 и поток ввода

	 //Считывание файлов пациентов и учетных записей в массив
	int amountOfAccounts = DATA_EMPTY;                                      //Количество учетных записей в файле
	string fileAccounts = "accounts.txt";                                   //Название для файла с учетными записями
	account* accounts = new account[RESERVE_AMOUNT_OF_ACCOUNTS];            //Создание структуры для записи учетных записей из файла
	openingFileAccounts(accounts, amountOfAccounts, fileAccounts);          //Открытие файла учетных записей

	int amountOfPatients = DATA_EMPTY;                                      //Количество пациентов в файле                            
	string filePatients = "patients.txt";                                   //Название файла для пациентов
	dataPatients* patients = new dataPatients[RESERVE_AMOUNT_OF_ACCOUNTS];  //Создание структуры для записи пациентов из файла
	openingFilePatients(patients, amountOfPatients, filePatients);              //Открытие файла с пациентами

	autorization(accounts, amountOfAccounts, patients, amountOfPatients);   //Функция авторизации
	
	return 0;
}

