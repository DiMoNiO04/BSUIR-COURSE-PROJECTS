#include<iostream>
#include<string>

using namespace std;

int main() {
	setlocale(LC_ALL, "RUS");
	string str;
	cout << "Введите строку  из '0' и '1' : "; cin >> str;

	size_t found = str.find_first_not_of("01");
	if (found != string::npos) cout << "Eсть символ из-за которого задача не может быть решена";
	else {
		string newStr;
		int count = 1, i;
		int n = str.size();

		for (i = 0; i < n; i++) {
			if (str[i] == str[i + 1]) count++;
			else {
				newStr += count + 48;
				count = 1;
			}
		}

		int s=0;
		for (i = 0; i < newStr.size(); i++) {
			if (newStr[i]-48 > s) s = newStr[i]-48;
		}

		cout << "\nМаксимально длиная группа из '0' и '1' = " << s << endl;;
		system("pause");
	}
}