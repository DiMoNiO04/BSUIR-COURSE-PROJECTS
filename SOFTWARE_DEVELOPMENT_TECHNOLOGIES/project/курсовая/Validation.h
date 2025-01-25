#pragma once  //Защита от повторного включения реализуется директивой препроцессора
//Подключаем заголовочные файлы     
#include "Autorization.h"
#include "Sha256.h"
#include <conio.h>
#include"Functions.h"
#include"Const.h"


//Ввод и проверка на корректный ввод
int inputNumber(int left_range, int right_range);  
bool isNumberNumeric();

//Проверка номера данного , попадающей под границы выбора
bool isNumberRangeCorrect(int number, int left_range, int right_range);

//Проверка вводимой даты рождения
bool validationInputData(int day, int month, int year);

//Пароль звездочками
string inputPassword();

//Корректный ввод строки
bool isStringRangeCorrect(string str, string SYMBOLS);
string inputValidationString(string SYMBOLS);

//Функция подтверждения
int confirmation();


//---------------------------------------------Функции хеширования старт-----------------------------------------------------------------------
// функция генерации соли
string generateSalt(int salt_size);
// функция формирования набора символов
string getSymbolsForSalt();
//Генерация хеша
string generationHashForPassword(string password);
//---------------------------------------------Функции хеширования конец-----------------------------------------------------------------------


//---------------------------------------------Проверка на допустимые сиволы в пароле и логине старт-------------------------------------------
//Проверка на корректный ввод пароля и логина
string inputValidationPasswordOrLogin();
//Проверка на ввод правильности символов
bool isLoginPasswordRangeCorrect(string edit);
//----------------------------------------------Проверка на допустимые символы в пароле и логине конец-----------------------------------------
