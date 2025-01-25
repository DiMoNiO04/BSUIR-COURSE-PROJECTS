#pragma once
//Подключаем заголовочные файлы
#include"Functions.h"
#include"User.h"
#include"Validation.h"
#include"SearchSort.h"
#include"Autorization.h"
#include"EditFunctions.h"
#include"Sha256.h"

//Главное меню админа
enum menuAdmin {
	EXIT_FROM_ADMIN,               //Выход из функционала админа
	WORK_WITH_PATIENTS,            //Работа с данным пациентов
	WORK_WITH_ACCOUNTS,            //Работа с аккаунтами
	DATA_PROCCESING_FOR_PATIENTS,  //Обработки данных о пацинетах
	EDIT_MY_PASSWORD               //Редактирование пароля
};

//Меню работы с учетными записями
enum menuWorkWithAccounts {
	EXIT_FROM_WORK_WITH_ACCOUNTS,  //Выход из работы с учетными записями
	VIEW_ACCOUNTS,                 //Просмотр аккаунтов
	ACTIVATION_ACCOUNTS,           //Активация аккаунтов
	BLOCKING_ACCOUNTS              //Блокировка аккаунтов
};

//Меню работы с данными пациентов
enum menuWorkWithPatients {
	EXIT_FROM_WORK_WITH_PATIENTS,  //Выход из работы с данными пациентов
	VIEW_PATIENTS,                 //Просмотр пациентов
	ADD_PATIENTS,                  //Добавление пациентов
	DELETE_PATIENTS,               //Удаление пациентов
	EDIT_PATIENTS                  //Редактирование пациентов
};

//Меню обработки данных о пациентах
enum menuProccesingPatientsData {
	EXIT_FROM_WORKING_WITH_PATIENTS,     //Выход из обработки данных о пациентах
	VIEW_PATIENTS_ALL,                   //Вывод информации о всех пациентах
	VIEW_NONRESIDENT_PATIENTS,           //Вывод иногородних пациентов
	SEARCH_PATIENTS,                     //Поиск 
	SORT_PATIENTS,                       //Сортировка
	FILTRATION_PATIENTS                  //Фильтрация
};


//Главное меню администратора
void menuAdmin();

//Меню обработки информации о пациентах
void menuProccesingPatientsData();

//Меню работы с данными пациентов
void menuWorkWithPatients();

//Меню работы с учетными записями
void menuWorkWithAccount();

//Работа с учетными записями
void workWithAccount(account*(& accounts), int &amountOfAccounts, int activeAccount);

//Работа с данными пациентов
void workWithPatients(dataPatients* (&patients), int& amountOfPatients);

//Функционал администратора
void admin(account*(&accounts), int &amountOfAccounts, int activeAccount, dataPatients* (&patients), int &amountOfPatients);

//Обработка данных о пациентах
void proccesingPatientsData(dataPatients* (&patients), int& amountOfPatients);