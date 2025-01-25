#pragma once
//Подключаем заголовочные файлы 
#include"Functions.h"
#include"Autorization.h"
#include"Validation.h"
#include"Const.h"

//Меню редактирования учетной записи
enum menuAccountEdit {
	EXIT_FROM_EDIT_ACCOUNT,   //Выход из редактирования учетной записи
	EDIT_LOGIN_ACCOUNT,       //Редактирование логина
	ACCESS_EDIT,              //Изменение доступа
	ROLE_EDIT,                //Изменение роли
};

//Меню редактирования пациента
enum menuEditDataPatient {
	EXIT_MENU_EDIT_PATIENT,  //Выход из меню редактирования пациента
	SURNAME_EDIT,            //Редактирование фамилии
	NAME_EDIT,               //Редактирование имени
	PATRONYMIC_EDIT,         //Редактирование отчества
	GENDER_EDIT,             //Изменение пола
	DATA_OF_BIRTH_EDIT,      //Редактирование даты рождения
	TOWN_EDIT,               //Редактирование места жительства
	PHONE_NUMBER_EDIT,       //Редактирование номера телефона
	DIAGNOSIS_EDIT,          //Редактировние диагноза
};


//-----------------------------------------------Общие функции---------------------------------------------------------------------------------
//Ввод данных изменения
string inputEditString(string INPUT_DATA, string editData, string SYMBOLS);

//Меню подтверждения действия изменения
void menuConfirmationEdit(string LOGIN);
//---------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------Редактирование базы данных начало--------------------------------------------------------------
//Меню редактирования пациента
void menuEditDataPatient();

//Редактирование пациентов
void editDataPatient(dataPatients* (&patients), int& amountOfPatients);

//Функция редактирования фамилии данного пациента
void surnamePatientEdit(dataPatients* patients, int amountOfPatients, int numberOfPatient, string editData);

//Функция редактирования имени данного пациента
void namePatientEdit(dataPatients* patients, int amountOfPatients, int numberOfPatient, string editData);

//Функция редактирования отчества данного паациента
void patronymicPatientEdit(dataPatients* patients, int amountOfPatients, int numberOfPatient, string editData);

//Функция изменения пола данного пациента
void genderPatientEdit(dataPatients* patients, int amountOfPatients, int numberOfPatient);

//Функция редактирования места жительства пациента
void townPatientEdit(dataPatients* patients, int amountOfPatients, int numberOfPatient, string editData);

//Функция редактиования номера телефона данного пациенат
void phonenumberPatientEdit(dataPatients* patients, int amountOfPatients, int numberOfPatient, string editData);

//Функция редактирования даты рождения
void dataOfBirthPatientEdit(dataPatients* (&patients), int& amountOfPatients, int numberOfPatient);

//Функция редактирования диагноза данного пациента
void diagnosisPatientEdit(dataPatients* patients, int amountOfPatients, int numberOfPatient, string editData);
//---------------------------------------------Редактирование базы данных конец----------------------------------------------------------------


//---------------------------------------------Редактирование учетных записей начало-----------------------------------------------------------
//Меню редактирования аккаунта
void menuAccountEdit();

//Редактирование данных учетной записи
void editAccount(account* (&accounts), int amountOfAccounts, int activeAccount);

//Функция изменение доступа учетной записи
void accessEdit(account* accounts, int amountOfAccounts, int numberAccount);

//Функция изменения роли учетной записи
void roleEdit(account* accounts, int amountOfAccounts, int numberAccount);

//Функция изменения пароля учетной записи
void passwordEdit(account* accounts, int amountOfAccounts, int numberOfAccount);

//Функция изменения логина учетной записи
void loginEdit(account* accounts, int amountOfAccounts, int numberAccount);
//---------------------------------------------Редактирование учетных записей конец------------------------------------------------------------
