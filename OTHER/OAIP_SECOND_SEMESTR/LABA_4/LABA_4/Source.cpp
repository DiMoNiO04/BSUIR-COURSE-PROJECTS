#include<iostream>

using namespace std;  //Стандартное пространство имен

//Выбор в главном меню
enum mainChoice {
	EXIT,       //Выход
	CREATE,     //Создание очереди
	ADD,        //Добавление в очередь
	VIEW,       //Просмотр очереди
	INDIVIDUAL, //Индивидульное задание
	DELETE      //Удаление очереди
};


//Создаем структуру очереди
struct Spis2 {
	int info;  //Информационая часть
	Spis2* prev, * next;  //Адресная часть
} *top, * finish, * t;  //Указатели на начало и конец очереди


void menu();  //Меню
void Creat(Spis2** top, Spis2** finish, int in);  //Создание очереди
void Add(Spis2** top, Spis2** finish, int beginOrEnd, int in);  //Добавить в очередь
void View(int beginOrEnd, Spis2* t);   //Просмотр очереди
void Del_All(Spis2** top);   //Удаление очереди
void Zadanie(Spis2** b, Spis2** e);


int main() {
	setlocale(LC_ALL, "RUS");  //Подключаем русскую раскладку
	menu();  //Вызов меню
	system("pause");  //Задержка консоли
	system("cls");    //Очистка консоли
	cout << "До свидания!" << endl;
	return 0;
}


void menu() {
	int in, choice, beginOrEnd;
	while (true) {
		cout << "1. Создать очередь\n2. Добавить в очередь\n3. Просмотреть очередь\n4. Поменять местами крайние элементы очереди.\n5. Удалить очередь\n0. Выход\n<< "; cin >> choice;
		switch (choice) {
		case CREATE: {  
			cout << "Начальная информация очереди << "; cin >> in;
			Creat(&top, &finish, in);  //Создание очереди
			system("pause");  
			system("cls");
			break;
		}
		case ADD: {
			if (top) {
				cout << "Элемент очереди << "; cin >> in;
				cout << "Добавить в начало - 0, в конец - 1?\n<< "; cin >> beginOrEnd;
				Add(&top, &finish, beginOrEnd, in);  //Добавление в очередь
				if (beginOrEnd == 0 || beginOrEnd == 1) {
					if (beginOrEnd == 0) {
						t = top;
					}
					else {
						t = finish;
					}
				}
				else {
					cout << "Неправильный выбор\n";
				}
			}
			else {
				cout << "Для начала вы должны создать очередь, а затем сможете добавить в нее\n";
			}
			system("pause");
			system("cls");
			break;
		}
		case VIEW: {
			if (!top) {
				cout << "Очередь пуста!\n";
				system("pause");
				system("cls");
				break;
			}
			else {
				cout << "Просмотреть с начала - 0 , просмотреть с конца - 1\n<< "; cin >> beginOrEnd;
				if (beginOrEnd == 0) {
					t = top;
					cout << "Очередь сначала: " << endl;
				}
				else {
					t = finish;
					cout << "Очередь с конца" << endl;
				}
				View(beginOrEnd, t);  //Просмотр очереди
				system("pause");
				system("cls");
				break;
			}
			system("pause");
			system("cls");
			break;
		}
		case INDIVIDUAL: {
			cout << "\nИзначальная очередь: ";
			View(beginOrEnd, t);  //Просмотр очереди
			Zadanie(&top, &finish);
			cout << "\nОчередь с поменяными крайними элемента: ";
			View(beginOrEnd, t);  //Просмотр очереди
			system("pause");
			system("cls");
			break;
		}
		case DELETE: {
			Del_All(&top);   //Удаление очереди
			cout << "Очередь удалена\n";
			system("pause");
			system("cls");
			break;
		}
		case EXIT: {
			if (top != NULL) {
				Del_All(&top);  //Удаление очереди
			}
			return;
		}
		default: {
			cout << "Неправильный ввод. Повторите попытку";
			system("pause");
			system("cls");
		}
		}
	}
}

void Creat(Spis2** top, Spis2** finish, int in) {
	t = new Spis2;   //Захват памяти, формируется конкретный адрес в ОП
	t->info = in;  //Ввод переменной и формирование ИЧ
	t->next = t->prev = NULL;  //Формируем адресные части
	*top = *finish = t;  //Устанавливаем указатели начала и конца на созданный первый элемент
}

void Add(Spis2** top, Spis2** finish, int beginOrEnd, int in) {
	t = new Spis2;  //Захват памяти, формируется конкретный адрес в ОП
	t->info = in;   //Ввод переменной и формирование ИЧ
	if (beginOrEnd == 0) {  //Если добавление в начало
		t->prev = NULL;    //Предыдущего нет
		t->next = *top;    //Новый элемент связываем с первым
		(*top)->prev = t;  //Изменяем адрес бывшего первого
		*top = t;          //Переставляем указатель начала на новый
	}
	else if(beginOrEnd == 1){  //Если добавление в конец
		t->next = NULL;      //Следующего нет
		t->prev = *finish;   //Связываем новый элемент с последним
		(*finish)->next = t; //Изменяем адрес бывшего последнего
		*finish = t;         //Переставляем указатель конца на новый
	}
}


void View(int beginOrEnd, Spis2* t) {
	while (t) {  //Пока очередь не пуста
		cout << t->info << "  ";  //Выводим ИЧ
		if (beginOrEnd == 0) { //Если вывод с начало
			t = t->next;   //Переставляем указатель на следующий
		}
		else {            //Если вывод с конца
			t = t->prev;  //Переставляем указатель на предыдущий
		}
	}
	cout << endl;
}

void Del_All(Spis2** top) {
	while (*top) {   //Пока очередь не пуста
		t = *top;   //Переставляем указатель на начало
		*top = (*top)->next;   //Начало новое следующий
		delete t;   //Освобождение захваченной ранее памяти
	}
}


void Zadanie(Spis2** b, Spis2** e){
	int a;
	a = top->info;
	top->info = finish->info;
	finish->info = a;
}
