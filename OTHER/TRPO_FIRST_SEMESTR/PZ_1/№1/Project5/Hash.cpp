#include<iostream>
using namespace std;

int main()
{
	setlocale(LC_ALL, "Russian");
	int a;
	cout << "Введите целое трехзначное число \n"; cin >> a;
	if (999>= a >= 100) {
		if (a % 2 == 0) {
			cout << "Четное";
		}
		else {
			cout << "Нечетное";
		}
	}
	else {
		cout << "Error";
	}
}