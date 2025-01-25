#include<iostream>
#include<string>

using namespace std;

int main() {
	setlocale(LC_ALL, "RUS");
	string str,strNew;
	cout << "Введите строку состоящую из целого числа : "; cin >> str;

	size_t found = str.find_first_not_of("1234567890");
	if (found != string::npos) cout << "Eсть символ из-за которого строка не содерит целое число ";
	else {
		int n = str.length();

		bool w = true;
		for (int i = 0; i < n / 2; i++)
			if (str[i] != str[n - 1 - i]) w = false;

		if (w) cout << "Число симметрично\n";
		else cout << "Число не симметрично\n";

		if (n < 3) cout << "Строка состоит менее чем из 3 символов" << endl;
		else {
			strNew = str.substr(n - 3, 3);
			cout << "" << strNew << endl;
		}
	}
		
}