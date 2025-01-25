//Подключаем библиотеки
#include<iostream>
#include<random>
#include<iomanip>

using namespace std;  //Стандартное пространство имен

struct Stack {    //Структура однонаправленного стека
	int info;     //Информационая часть стека
	Stack* next;  //Адресная часть стека(указатель на след элемент)
}*top, * t;       //Вершина стека - top, текущий указатель - t

enum mainChoice {  //Меню для свитча
	EXIT,          //Выход(0)
	CREATE,        //Создать стек(1)
	ADD,           //Добавить стек(2)
	VIEW,          //Просмотреть стек(3)
	DELETE,        //Удалить стек(4)
	SORT,          //Сортировать стек(5)
	INDIVIDUAL     //Индивидуальное задание(6)
};

void menu();                      //Главное меню
Stack* InStack(Stack* p, int in); //Добавление элемента в стек
void View(Stack* p);              //Просматриваем стек  
void Del_All(Stack*& p);          //Удаляем стек
Stack* Del_Otr(Stack* b);         //Индивидуальное задание
void Sort_info(Stack* p);         //Сортировка стека

int main() {                   //Главная функция
	setlocale(LC_ALL, "RUS");  //Подключаем русскую клавиатура
	srand(time(NULL));         //Всегда разный рандом
	menu();                    //Вызов главного меню
	system("pause");           //Задержка консоли
	system("cls");             //Очисткак консоли
	cout << "До свидания!\n";
	return 0;
}

void menu() {
	int in, size, choice;

	while (true) {
		cout << "1. Создать стек\n2. Добавить данные в стек\n3. Просмотр стека\n4. Удалить стек\n5. Cортировка стека\n6. Удалить из созданного стека отрицательные элементы.\n0. Выход\n<< "; cin >> choice;
		switch (choice) {
		case CREATE: case ADD: {
			if (choice == CREATE && top != NULL) {
				cout << "Данные пусты!";
				break;
			}
			cout << "Сколько данных хотите добавить << "; cin >> size;
			if (size <= 0) {
				cout << "Неправильный ввод.\n";
			}
			else {
				for (int number = 0; number < size; number++) {
					in = rand() % 21 - 10;  //Формируем случайные числа
					top = InStack(top, in); //Добавляем в вершину
				}
				if (choice == CREATE) {
					cout << "Создан стек размером на " << size << " элементов" << endl;
				}
				else {
					cout << "Добавлено в стек " << size << " элементов" << endl;
				}
			}
			system("pause");
			system("cls");
			break;
		}
		case VIEW: {           //Просмотр стека
			if (top == NULL) {  //Проверяем если стек пуст
				cout << "Стек пуст\n";
				system("pause");
				system("cls");
				break;
			}
			cout << setw(30) << "Стек: " << endl;
			View(top);  //Выводим стек
			system("pause");
			system("cls");
			break;
		}
		case DELETE: {
			Del_All(top);
			cout << "Стек освобожден!" << endl;
			system("pause");
			system("cls");
			break;
		}
		case SORT: {
			if (top == NULL)
			{
				cout << "Стек пуст\n";
				system("pause");
				system("cls");
				break;
			}
			cout << setw(30) << "Стек: " << endl;
			Sort_info(top);
			View(top);
			system("pause");
			system("cls");
			break;
		}
		case INDIVIDUAL: {
			if (top == NULL)
			{
				cout << "Стек пуст\n";
				system("pause");
				system("cls");
				break;
			}
			top = Del_Otr(top);
			cout << setw(30) << "Новый стек без отрицательных чисел:" << endl;
			View(top);
			system("pause");
			system("cls");
			break;
		}
		case EXIT: {
			if (top != NULL) {
				Del_All(top);
			}
			return;
		}
		default: {
			cout << "Неверный ввод. Повторите попытку\n";
			system("pause");
			system("cls");
		}
		}
	}
}

Stack* InStack(Stack* p, int in) {  //Добавление элемента в стек
	Stack* t = new Stack;  //Создание нового адреса
	t->info = in;  //Информационая часть вершины , становится новый элемент
	t->next = p;   //Адресом следующего элемента за t (новая вершина)
	return t;      //Изменение вершины стека
}


void View(Stack* p) {  //Просматриваем стек
	Stack* t = p;
	while (t != NULL) {   //Пока стек не пустой
		cout << " " << t->info << endl;   //Выводим на экран информационную часть
		t = t->next;  //Переставляем указатель t на следующий элемент
	}
	cout << endl;
}

void Del_All(Stack*& p) {  //Алгоритм освобождения памяти
	Stack* t;
	while (p != NULL) {
		t = p;
		p = p->next;
		delete t;   //Освобождение захваченной ранее памяти
	}
}

Stack* Del_Otr(Stack* b) {  //Индивидуальное задание
	b = InStack(b, 21);  //Добавляем любое число
	Stack* p = b;        //Предыдущий р вершине
	t = p->next;         //Текущий t= второму
	while (t != NULL) {  //Пока не пуст
		if (t->info < 0) { //Если ИЧ меньше 0
			p->next = t->next;
			delete t;  //Удаляем нынешний t
			t = p->next; //Переходим к новому адресу следующем за t
		}
		else {
			p = t;
			t = t->next;
		}
	}
	//Удаление из вершины добавленного элемента
	t = b;
	b = b->next;
	delete t;  //Освобождение захваченной ранее памяти
	return b;
}

void Sort_info(Stack* p) {  //Сортировка стека
	Stack* t = NULL, * t1;
	int r;
	do {
		for (t1 = p; t1->next != t; t1 = t1->next) {
			if (t1->info > t1->next->info) {
				r = t1->info;
				t1->info = t1->next->info;
				t1->next->info = r;
			}
		}
		t = t1;
	} while (p->next != t);
}
