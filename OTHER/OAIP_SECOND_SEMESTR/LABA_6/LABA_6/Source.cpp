#include<iostream>
#include<string>
#include <windows.h>
#include <iomanip>
#include <ctime>


using namespace std;

enum menu {
	EXIT,
	LINE_SEARCH,
	BINARY_SEARCH,
	SORT,
	QUICK_SORT
};

int choiceMenu;

void menu();
void printArr(int* arr, int& size);
void lineSearch(int* arr, int& size);
void binarySearch(int* arr, int& size);
void sort(int* arr, int& size);
void swap(int* array, int first, int second);
void quickSort(int* arr, int leftSide, int rightSide);

int main() {

	SetConsoleCP(1251);
	SetConsoleOutputCP(1251);
	setlocale(LC_ALL, "ru");
	srand(time(NULL));

	int size=0;

	cout << "Введите размер массива: "; cin >> size;
	if (size < 1) {
		cout << "Неверный ввод размера массива";
		return 0;
	}
	else {
		int* arr = new int[size];
		for (int i = 0; i < size; i++) {
			arr[i] = rand() % 41 - 20;
		}

		menu();
		while (choiceMenu != EXIT) {
			
			system("cls");
			switch (choiceMenu) {
			case LINE_SEARCH: {
				lineSearch(arr, size);
				break;
			}
			case BINARY_SEARCH: {
				binarySearch(arr, size);
				break;
			}
			case SORT: {
				cout << "Исходный массив: ";
				printArr(arr, size);
				cout << "Сортировка методом прямого выбора по времени прибытия произведена" << endl;
				sort(arr, size);
				printArr(arr, size);
				break;
			}
			case QUICK_SORT: {
				cout << "Исходный массив: ";
				printArr(arr, size);
				cout << "Массив отсортирован с помощью быстрой сортировки" << endl;
				quickSort(arr, 0, size-1);
				printArr(arr, size);
				break;
			}
			case EXIT: {
				break;
			}
			}
			system("pause");
			system("cls");
			menu();
		}
	}
}

void menu() {

	cout << " 1. Линейный поиск числа в массиве" << endl
		<< " 2. Бинарный поиск числа в массиве" << endl
		<< " 3. Сортировка массива" << endl
		<< " 4. Сортировка методом quickSort массива" << endl
		<< " 0. Выход из программы" << endl
		<< "<< ";
	cin >> choiceMenu;
}

void printArr(int* arr, int& size) {
	
	cout << "Ваш массив: ";
	for (int i = 0; i < size; i++) {
		cout << arr[i] << " ";
	}
	cout << endl;
}

void lineSearch(int* arr, int& size) {

	printArr(arr, size);
	int searchNumber=0;
	cout << "Ввведите искомое число << ";  cin >> searchNumber;

	bool find = false;
	for (int i = 0; i < size; i++) {
		if (arr[i] == searchNumber) {
			cout << "Искомое число " << searchNumber << " найдено и находиться на позиции " << i + 1 << endl << endl;
			find = true;
			break;
		}
	}
	if (find == false) {
		cout << "Данного числа не найдена в массиве\n";
	}
}

void binarySearch(int* arr, int& size) {

	printArr(arr, size);
	int searchNumber = 0;
	cout << "Ввведите искомое число << ";  cin >> searchNumber;

	int lowest = 0, higher = size - 1;
	bool find = false;

	while (lowest <= higher) {
		int middle = (higher + lowest) / 2;
		int quess = arr[middle];
		if (arr[middle] == searchNumber) {
			cout << "Искомое число " << searchNumber << " найдено и находиться на позиции " << middle + 1 << endl << endl;
			find = true;
			break;
		}
		else if (searchNumber < quess) {
			higher = middle - 1;
		}
		else {
			lowest = middle + 1;
		}
	}
	if (find == false) {
		cout << "Данного числа не найдена в массиве\n";
	}
}

void sort(int* arr, int& size) {

	for (int i = 0; i < size - 1; i++) {
		int m = i;
		for (int j = i + 1; j < size; j++) {
			if (arr[j] < arr[m]) {
				m = j;
			}
		}
		int r = arr[m];
		arr[m] = arr[i];
		arr[i] = r;
	}
}

void quickSort(int* arr, int leftSide, int rightSide) {

	if (rightSide <= leftSide) {
		return;
	}

	int wall = leftSide, pivot = rightSide;
	for (int i = leftSide; i < rightSide; i++) {
		if (arr[i] < arr[pivot]) {
			swap(arr, i, wall);
			wall++;
		}
	}
	swap(arr, wall, pivot);
	quickSort(arr, leftSide, wall - 1);
	quickSort(arr, wall + 1, rightSide);
}

void swap(int* array, int first, int second){
	int temp = array[first];
	array[first] = array[second];
	array[second] = temp;
}