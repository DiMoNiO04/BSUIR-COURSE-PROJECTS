#include<iostream>
using namespace std;

int main() {
	int a, b, c;
	cout << "Enter the number "; cin >> a;
	b = 0;
	c = 0;
	while (a >=1) {
		b = a % 2 * pow(10, c)+b;
		a = a / 2;
		c++;

	}
	cout << b;
	return 0;
}