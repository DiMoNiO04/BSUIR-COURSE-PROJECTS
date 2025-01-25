#pragma once//Конкретный исходный файл при компиляции подключается строго один раз
//Подключаем заголовочные файлы
#include "Functions.h"
#include "Validation.h"
#include "Sha256.h"
#include"User.h"
#include"Admin.h"
#include"Const.h"
#include"MainAdmin.h"

//Главноем меню авторизции
enum mainMenu {
	EXIT,     //Выход из системы
	ENTRANCE, //Войти
	REGISTR   //Зарегистрироваться
};

//Главное меню
void mainMenu();

//Функция авторизации
void autorization(account* (&accounts), int &amountOfAccounts, dataPatients* (&patients), int &amountOfPatients);

//Сверяем введеные пароль и логин
int checkLoginAndPasswordForEntrance(account* (&accounts), int &amountOfAccounts, string hash, string validationLogin, dataPatients*(& patients), int &amountOfPatients);

//Вход в систему
void entrance(account*(&accounts), int &amountOfAccounts, dataPatients*(&patients), int &amountOfPatients);

//Выход из программы
void exitFromProgram(account* (&accounts), int &amountOfAccounts, dataPatients*(&patients), int &amountOfPatients);

//Регистрация
void registration(account* (&accounts), int& amountOfAccounts, dataPatients* (&patients), int& amountOfPatients);
