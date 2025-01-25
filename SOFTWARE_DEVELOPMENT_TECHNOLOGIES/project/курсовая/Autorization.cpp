//Подключаем заголовочный файл
#include "Autorization.h" 

//Главное меню авторизации
void mainMenu() {
    system("cls");
    cout << "1. Войти\n"
        << "2. Зарегистрироваться\n"
        << "0. Выход\n"
        << "<< ";
}

//Функция авторизации
void autorization(account*(&accounts), int &amountOfAccounts, dataPatients*(&patients), int &amountOfPatients) {

    mainMenu();           //Главное меню авторизации
    int choiceMain = inputNumber(EXIT, REGISTR);  //Выбор действия авторизации и проверка на корректный ввод
    system("cls");

    switch (choiceMain) { //Передаем выбор из главного меню
    case ENTRANCE: {    //Вход
        entrance(accounts, amountOfAccounts, patients, amountOfPatients);
        break;
    }
    case REGISTR: {  //Регистрация
        registration(accounts, amountOfAccounts, patients, amountOfPatients);
        break;
    }
    case EXIT: {  //Выход из программ
        exitFromProgram(accounts, amountOfAccounts, patients, amountOfPatients);
        break;
    }
    }
}

//Сверяем введенные логин и пароль 
int checkLoginAndPasswordForEntrance(account* (&accounts), int &amountOfAccounts, string hash, string validationLogin, dataPatients* (&patients), int &amountOfPatients) {

    bool input = false;  //Для проверки на корректный ввод для входа в систему
    for (int numberOfAccount = 0; numberOfAccount < amountOfAccounts; numberOfAccount++) {
        if (validationLogin == accounts[numberOfAccount].login && accounts[numberOfAccount].hash == hash && accounts[numberOfAccount].access == ACCESS) {  //Сверяем введеные данные с существующими
            if (accounts[numberOfAccount].role == USER) {  //Если данные пользователя
                user(accounts, amountOfAccounts, numberOfAccount, patients, amountOfPatients);
                input = true;  //Вошли
                break;
            }
            if (accounts[numberOfAccount].role == ADMIN) { //Если данные администратора
                input = true;  //Вошли
                admin(accounts,amountOfAccounts, numberOfAccount, patients, amountOfPatients);   //Вызываем функционал администартор
                break;
            }
            if (accounts[numberOfAccount].role == ADMIN_MAIN) { //Если данные главного администратора
                input = true;  //Вошли
                mainAdmin(accounts, amountOfAccounts, numberOfAccount, patients, amountOfPatients);   //Вызываем функционал главного админа
                break;
            }
            int activeAccount = numberOfAccount;  //Номер аккаунта под которым зашли
            return activeAccount;  //Возвращаем номер активного аккаунта
        }
    }
    if (input == false) {  //Если вход не выполнен
        system("cls");
        coutRedText(INCORRECT_LOGIN_AND_PASSWORD_INPUT);
        entrance(accounts, amountOfAccounts, patients, amountOfPatients);
    }
}

//Функция входа в систему
void entrance(account* (&accounts), int &amountOfAccounts,dataPatients*(&patients), int &amountOfPatients) {

    cout << LOGIN_AND_PASSWORD_INPUT;
    cout << LOGIN_INPUT; 
    string validationLogin; cin >> validationLogin;  //Вводим логин

    if (validationLogin == BACK_TO_AUTORIZATION) {  //Если вернулись назад
        autorization(accounts, amountOfAccounts, patients, amountOfPatients);  //Меню авторизации;
    }
    else {
        cout << PASSWORD_INPUT;
        string validationPassword = inputPassword();   //Вводим пароль и делаем ввод звездочками
        string hash = generationHashForPassword(validationPassword);  //Хешируем пароль
        checkLoginAndPasswordForEntrance(accounts, amountOfAccounts, hash, validationLogin, patients, amountOfPatients);  //Функция входа
    }
}

//Выход из программы
void exitFromProgram(account* (&accounts), int &amountOfAccounts, dataPatients*(&patients), int &amountOfPatients) {

    system("cls");
    cout << CONFIRMATION_EXIT_FROM_PROGRAM;
    if (confirmation()) {
        system("cls");
        cout << EXIT_FROM_PROGRAM;
        system("pause");
        return;
    }
    else {
        autorization(accounts, amountOfAccounts, patients, amountOfPatients);
    }
}

//Регистрация
void registration(account* (&accounts), int& amountOfAccounts, dataPatients* (&patients), int& amountOfPatients) {

    //Создаем новый временный массив и добавляем количество аккаунтов
    account* buf;
    buf = new account[amountOfAccounts];
    copyAccount(buf, accounts, amountOfAccounts);
    amountOfAccounts++;
    accounts = new account[amountOfAccounts];
    copyAccount(accounts, buf, --amountOfAccounts);

    //Заполняем данные для добавления
    cout << INPUT_DATA_FOR_REGIST;
    cout << INPUT_LOGIN;              string newLogin = inputValidationPasswordOrLogin();
    cout << INPUT_PASSWORD;           string newPassword = inputValidationPasswordOrLogin();
    cout << INPUT_REPEAT_PASSWORD;    string repeatNewPassword = inputValidationPasswordOrLogin();

    bool regist = true;   //Разрешение для регистрации
    for (int numberAccount = 0; numberAccount < amountOfAccounts; numberAccount++) {
        if (accounts[numberAccount].login == newLogin) {   //Если логин уже занят
            regist = false;  //Занят
            coutRedText(LOGIN_IS_BUSY);
            break;
        }
    }

    //Сверяем на корректный ввод пароля
    if (newPassword != repeatNewPassword) {
        coutRedText( PASSWORDS_DO_MOT_MATCH);
        regist = false;
    }

    else if (regist == true) {  //Если данные введены вверно
        cout << MENU_CONFIRMATION_REGISTRATION;
        int confirmation = inputNumber(YES, NO); //Подтверждение действия и проверка на корректный ввод
        if (confirmation == YES) {  //Если нет , то не сохраняем
            amountOfAccounts++;                   //увеличение количества пациентов в структуре на 1
            accounts[amountOfAccounts - 1].login = newLogin;
            accounts[amountOfAccounts - 1].role = USER;
            accounts[amountOfAccounts - 1].access = NOACCESS;
            accounts[amountOfAccounts - 1].hash = generationHashForPassword(newPassword);
            accounts[amountOfAccounts - 1].salt = generateSalt(SALT_SIZE);
            savingAccount(accounts, amountOfAccounts, "accounts.txt"); //Сохранение изменений в файл
            coutGreenText(YOU_ARE_REGISTERED);
        }
    }
    delete[]buf;      //Удаляем временный массив
    system("pause");
    autorization(accounts,amountOfAccounts, patients,amountOfPatients);
}
