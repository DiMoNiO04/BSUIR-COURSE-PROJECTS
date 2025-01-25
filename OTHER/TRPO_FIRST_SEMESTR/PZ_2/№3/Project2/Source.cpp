#include<iostream>
#include<math.h>
using namespace std;

int main() {
	setlocale(LC_ALL, "Rus");
	int a, b, i;

	cout << "Введите первое число"; cin >> a;
	cout << "Введите второе число"; cin >> b;
	cout << endl;


	for (i = 2; i < a; i++) {
		if (a % i == 0) {
			cout << a << "Не простое число " << endl;
			break;
		}
		else  if (i == a - 1) {
			cout << a << "Простое число " << endl;
			break;
		}
	}

	for (i = 2; i < b; i++) {
		if (b % i == 0) {
			cout << b << "Не простое число " << endl;
			break;
		}
		else  if (i == b - 1) {
			cout << b << "Простое число " << endl;
			break;
		}
	}
	cout << endl;

	for (i = min(a, b); i >= 1; i--) {
		if (a % i == 0 && b % i == 0) {
			cout << "НОД равен " << i<<endl;
			break;
		}
	}
	cout << endl;
	system("pause"); 
}
