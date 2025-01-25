#include<iostream>

using namespace std;

int recFunction(int firstNumber, int secondNumber);
int function(int firstNumber, int secondNumber);

int main() {

	setlocale(LC_ALL, "RUS");
	int firstNumber, secondNumber;
	cout << "Введите первое число << "; cin >> firstNumber;
	cout << "Введите первое число << "; cin >> secondNumber;

	if (firstNumber != 0 || secondNumber != 0) {
		if (firstNumber < 0 || secondNumber < 0) {
			firstNumber = abs(firstNumber);
			secondNumber = abs(secondNumber);
		}
		cout << "\nРекурсивная функция:\nНОД чисел равен: " << recFunction(firstNumber, secondNumber);
		cout << "\n\nОбычная функция:\nНОД чисел равен: " << function(firstNumber, secondNumber);
	}
	else {
		cout << "Неверно введены числа, задача не может быть выполнена";
	}
}

int recFunction(int firstNumber, int secondNumber) {

	if (secondNumber % firstNumber == 0) 
		return firstNumber;
	else 
		recFunction(secondNumber % firstNumber, firstNumber);
}

int function(int firstNumber, int secondNumber) {

	while (firstNumber != secondNumber) {
		if (secondNumber > firstNumber) 
			secondNumber = secondNumber - firstNumber;
		else 
			firstNumber = firstNumber - secondNumber;
	}
	return secondNumber;
}
