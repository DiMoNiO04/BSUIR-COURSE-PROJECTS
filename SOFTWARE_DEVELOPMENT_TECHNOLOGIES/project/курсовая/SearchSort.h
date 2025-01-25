#pragma once
//Подключаем заголовочные файлы
#include"Functions.h"
#include "Autorization.h"
#include"Const.h"

//Меню поиска
enum searchMenu {
	BACK_FROM_SEARCH,     //Выход из меню поиска
	SEARCH_FOR_SURNAME,   //Поиск по фамилии
	SEARCH_FOR_NAME,      //Поиск по имени
	SEARCH_FOR_DIAGNOSIS, //Поиск по диагнозу
	SEARCH_FOR_TOWN,      //Поиск по месту жительства
};

//Меню сортировки
enum sortMenu {
	BACK_FROM_SORT,    //Выход из меню сортировки
	SORT_FOR_SURNAME,  //Сортировка по фамилии
	SORT_FOR_NAME,     //Сортировка по имени
	SORT_FOR_AGE,      //Сортировка по возрасту
	SORT_FOR_TOWN      //Сортировка по месту жительства
};

//Меню фильтрации
enum filtrationMenu {
	BACK_FROM_FILTR,             //Выход из меню фильтрации
	FILTR_FOR_GENDER,            //Фильтрация по полу
	FILTR_FOR_AGE_AND_DIAGNOSIS  //Фильтрация по возрасту и диагнозу
};


//----------------------------------------------------Поиск начало-----------------------------------------------------------------------------
//Меню поиска
void menuSearch();

//Главная функция меню поиска
void search(dataPatients* (&patients), int &amountOfPatients);

//Ввод искомых данных
string inputAndOutputSearchString(string SURNAME, string searchString);

//Поиск по фамилии
void searchForSurname(dataPatients* patients, int amountOfPatients, int countData, string searchString);

//Поиск по имени
void searchForName(dataPatients* patients, int amountOfPatients, int countData, string searchString);

//Поиск по диагнозу
void searchForDiagnosis(dataPatients* patients, int amountOfPatients, int countData, string searchString);

//Поиск по месту жительства
void searchForTown(dataPatients* patients, int amountOfPatients, int countData, string searchString);

//Повторный поиск
void reSearch(dataPatients* patients, int amountOfPatients, int countData, string searchString, string SURNAME, void searchForSurname(dataPatients* patients, int amountOfPatients, int contData, string searchString));
//-----------------------------------------------------------Поиск конец----------------------------------------------------------------------- 


//------------------------------------------------------------Cортировока старт----------------------------------------------------------------
//Меню сортировки
void menuSort();

//Главная функция сортировки
void sort(dataPatients* (&patients), int &amountOfPatients);

//Сортировка по фамилии,имени, месту жиельства
void sortForSurnameOrNameOrTown(dataPatients* patients, int amountOfPatients, int choiceSort, string SURNAME, bool isSortForSurnameAscending(dataPatients patients, dataPatients patientsPlus), bool isSortForSurnameDescending(dataPatients patients, dataPatients patientsPlus));

//Сортировка по возрасту
void sortForAge(dataPatients* patients, int amountOfPatients, int choiceSort);

//----------------------------------------------Функции сортировки по .... начало--------------------------------------------------------------
bool isSortForSurnameAscending(dataPatients patients, dataPatients patientsPlus);   //Сортировка по фамилии от А до Я
bool isSortForSurnameDescending(dataPatients patients, dataPatients patientsPlus);  //Сортировка по фамилии от Я до А
bool isSortForNameAscending(dataPatients patients, dataPatients patientsPlus);      //Сортировка по имени от А до Я
bool isSortForNameDescending(dataPatients patients, dataPatients patientsPlus);     //Сортировка по имени от Я до А
bool isSortForTownDescending(dataPatients patients, dataPatients patientsPlus);     //Сортировка по месту жительства от А до Я
bool isSortForTownAscending(dataPatients patients, dataPatients patientsPlus);      //Сортировка по месту жительства от Я до А
bool isSortForYearDescending(dataPatients patients, dataPatients patientsPlus);     //Сортировка года рождения по убыванию
bool isSortForYearAscending(dataPatients patients, dataPatients patientsPlus);      //Сортировка года рождения по возрастанию
bool isSortForMonthDescending(dataPatients patients, dataPatients patientsPlus);    //Сортировка месяца рождения по убыванию
bool isSortForMonthAscending(dataPatients patients, dataPatients patientsPlus);     //Сортировка месяца рождения по возрастаию
bool isSortForDayDescending(dataPatients patients, dataPatients patientsPlus);      //Сортировка дня рождения по убыванию
bool isSortForDayAscending(dataPatients patients, dataPatients patientsPlus);       //Сортировка дня рождения по возрастанию
//---------------------------------------------Функции сортировки по .... конец----------------------------------------------------------------
//----------------------------------------------------Сортировка конец-------------------------------------------------------------------------


//-------------------------------------------------------------Фильтрация начало---------------------------------------------------------------
//Меню фильтрации
void menuFiltration();

//Меню выбора фильтрации по полу
void menuFiltratonForGender();

//Главная функция фильтрации
void filtration(dataPatients* (&patients), int &amountOfPatients);

//Фильтрация по полу
void filtrForGender(dataPatients* patients, int amountOfPatients, int choiceFiltrGender, int MAN_GENDER, string MAN);
void filtrationForGender(dataPatients* patients, int amountOfPatients);

//Фильтрация по возрасту и диагнозу
void filtrationForAgeAndDiagnosis(dataPatients* patients, int amountOfPatients);
void filtrForAgeAndDiagnosis(dataPatients* patients, int amountOfPatients, int filtrAge, string filtrDiagnosis, SYSTEMTIME st);
//--------------------------------------------------------------Фильтрация конец---------------------------------------------------------------
