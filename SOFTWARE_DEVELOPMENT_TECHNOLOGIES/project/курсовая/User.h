#pragma once    //Защита от повторного включения реализуется директивой препроцессора
//Подключаем заголовочные файлы
#include "Functions.h"
#include"User.h"
#include "Validation.h"
#include "Autorization.h"
#include "SearchSort.h"
#include"EditFunctions.h"
#include "Const.h"

//Главное меню пользователя
enum mainMenuUser {
	EXIT_FROM_USER,         //Выход из функционала пользоавтеля
	VIEW_ALL_PATIENTS,      //Просмотр всех пациентов
	VIEW_NONRESIDENT,       //Вывод иногородних пациентов
	SEARCH,                 //Поиск
	SORT,                   //Сортировка
	FILTRATION,             //Фильтрация
	EDIT_PASSWORD,			//Изменить пароль
};

//Главное меню пользователя
void mainUserMenu();

//Функционал пользователя
void user(account*(&accounts), int &amountOfAccounts, int numberOfAccount, dataPatients*(&patients), int &amountOfPatients);

