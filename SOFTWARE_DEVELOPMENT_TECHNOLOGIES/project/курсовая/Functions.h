#pragma once  //Защита от повторного включения реализуется директивой препроцессора
//Подключаем библиотеки и заголовочные файлы
#include<iostream>
#include<fstream>
#include<string>
#include <iomanip>
#include<algorithm>
#include<Windows.h>
#include<ctime>
#include<cstdlib>
using namespace std;  //Стандратное пространство имен


//Структура даты рождения
struct dateOfBirth {
	int day,   //День рождения
		month, //Месяц рождения
		year;  //Год рождения
};

//Структура всех данных
struct dataPatients {
	string surname;          //Фамилия пациента
	string name;             //Имя пациента
	string patronymic;       //Отчество пациента
	string gender;           //Пол пациента
	dateOfBirth dateOfBirth; //Дата рождения пациента
	string town;             //Место рождение пациента
	string phoneNumber;      //Номер телефона пациента
	string diagnosis;        //Диагноз пациента
};

//Структура учетных записей
struct account {
	string login;      //Логин
	string hash;       //Пароль
	string salt;       //Соль
	string role;       //Пользователь или администратор
	string access;     //Доступ
};


//-----------------------------------------Функции работы с данными пациентов старт------------------------------------------------------------
//Открытие файла с пациентами
void openingFilePatients(dataPatients* (&patients), int& amountOfPatients, string fileName);

//Вывод всех пациентов в консоль 
void printAllPatients(dataPatients* (&patients), int &amountOfPatients);

//Вывод одного пациента в консоль
void printPatient(dataPatients* patients, int numberPatient);

//Вывод шапки 
void printShapka();

//Сохранение данных пациентов в файл
void savingPatients(dataPatients* patients, int amountOfPatients, string fileName);

//Добавление пациента
void addPatient(dataPatients* (&patients), int& amountOfPatients);

//Копирование пациентов
void copy(dataPatients* (&patientstNew), dataPatients* (patientsOld), int amountOfPatients);

//Удаление пациента
void deletePatient(dataPatients* (&patients), int& amountOfPatients);

//Вывод всех иногородних пациентов
void printNonresidentPatients(dataPatients* patients, int amountOfData);

//Ввод даты рождения
void inputDateOfBirth(dataPatients* (&patients), int amountOfPatients);
//----------------------------------------Функции работы с данными пациентов конец-------------------------------------------------------------


//----------------------------------------Функции работы с учетными записями старт-------------------------------------------------------------
 //Открытие файла с учетными записями
void openingFileAccounts(account* (&accounts), int& amountOfAccounts, string fileName);

//Считывание учетных записей в массив
void readingFileAccounts(account* (&accounts), int& amountOfAccounts, string fileAccounts);

//Вывод всех учетных записей на экран
void printAllAccounts(account* accounts, int amountOfAccounts);

//Сохранение учетных записей в файл
void savingAccount(account* accounts, int amountOfAccounts, string fileName);

//Вывод одного аккаунта
void printAccount(account* accounts, int numberAccount);

//Копирование акаунтов
void copyAccount(account* (&accountsNew), account* (accountsOld), int amountOfAccounts);

//Подсчет аккаунтов без доступа
int accountsWithoutAccess(account* (&accounts), int amountOfAccounts);

//Запись аккаунтов без доступа в отдельный массив
account* createArrOfAccountsWithoutAccess(account* (&accounts), int amountOfAccounts, int amountOfAccountNoActivation);

//Вывод аккаунтов без доступа
void printAccountsForConfirmAdd(account* (&accounts), int amountOfAccounts);

//Одобрения заявки на активацию аккаунта
void confirmApplication(account* (&accounts), account* (&accountsWithAccess), int amountOfAccounts, int amountOfAccountNoActivation, int activeAccount);
void activationAccount(account* (&accounts), int& amountOfAccounts, int activeAccount);

//Удаление учетной записи
void deleteAccounts(account* (&accounts), int& amountOfAccounts, int activeAccount, dataPatients*(&patients), int &amountOfPatients);


//Блокировка заявки на активацию аккаунта
void blockingAccount(account* (&accounts), int& amountOfAccounts, int activeAccount);
void confirmBlocking(account* (&accounts), account* (&accountsWithAccess), int amountOfAccounts, int amountOfAccountWithActivation, int activeAccount);

//Подсчет аккаунтов с доступом
int accountsWithoAccess(account* (&accounts), int amountOfAccounts);

//Запись аккаунтов с доступом в отдельный массив
account* createArrOfAccountsWithAccess(account* (&accounts), int amountOfAccounts, int amountOfAccountWithActivation);

//Вывод акккаунтов имеющих доступа
void printAccountsForConfirmBlocking(account* (&accounts), int amountOfAccounts);

//Выход из аккаунта
void exitFromAccount(account*(&accounts), int &amountOfAccounts, int activeAccount, dataPatients* (&patients), int &amountOfPatients, void user(account* (&accounts), int &amountOfAccounts, int activeAccount, dataPatients* (&patients), int &amountOfPatients));
//--------------------------------------Функции работы с учетными записями конец--------------------------------------------------------------


//--------------------------------------------------Функции изменения цвета текста начало-----------------------------------------------------
//Красный цвет текста
void coutRedText(string LOGIN_IS_BUSY);

//Зеленый цвет текста
void coutGreenText(string LOGIN_IS_BUSY);

//Голубой цвет текста
void coutBlueText(string LOGIN_IS_BUSY);

//Желтый цвет текста
void coutYellowText(string LOGIN_IS_BUSY);
//--------------------------------------------------Функции изменения цвета текста конец-----------------------------------------------------