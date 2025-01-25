#pragma once
//Подключаем заголовочные файлы
#include"Functions.h"
#include"User.h"
#include"Validation.h"
#include"SearchSort.h"
#include"Autorization.h"
#include"EditFunctions.h"
#include"Sha256.h"


//Главное меню главного администратора
enum mainMenuMainAdmin {
	EXIT_FROM_MAIN_ADMIN,               //Выход из функционала главного админа
	WORK_WITH_ACCOUNTS_FOR_MAIN_ADMIN,  //Работа с учетными записями от главного админа
	PROCCESSING_PATIENTS,               //Обработка данных о пацинетах
	EDIT_PASSWORD_MAIN_ADMIN            //Редактирование пароля
};

//Меню работы с учетными записями
enum menuWorkkWithAccounts {
	EXIT_FROM_WORKING_WITH_ACCOUNTS,         //Выход из работы с учетными записями
	VIEW_ALL_ACCOUNTS,                       //Просмотр всех учетных записей
	EDIT_ACCOUNTS,                           //Редактирование учетных записей
	DELETE_ACCOUNTS                          //Удаление учетных записей
};


//Меню главного администратора
void mainMenuMainAdmin();

//Меню работы с учетными записями
void menuWorkWithAccounts();

//Работа с учетными записями
void workWithAccounts(account* (&accounts), int& amountOfAccounts, int activeAccount, dataPatients* (&patients), int amountOfPatients);

//Функционал главного администратора
void mainAdmin(account* (&accounts), int& amountOfAccounts, int activeAccount, dataPatients* (&patients), int& amountOfPatients);