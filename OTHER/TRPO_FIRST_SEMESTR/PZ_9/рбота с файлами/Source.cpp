#include<iostream>
#include<string>
#include<fstream>

using namespace std;

int main() {
	setlocale(LC_ALL, "RUS");
	string path = "myFile.txt";
	/*
	//запись в файл

	ofstream fout;
	fout.open(str);
	if (!fout.is_open()) {
		cout << "Ошибка открытия файла!";
	}
	else {
		for (int i = 0; i < 5; i++) {
			cout << "Введите число !" << endl;
			int number;
			cin >> number;
			fout << number;
			fout << "\n";
		}
	}
	fout.close();


	//считывание с файла

	ifstream fin;
	fin.open(path);
	if (!fin.is_open()) {
		cout << "Ошибка открытия файла";
	}
	else {
		cout << "Файл открыт"<<endl;
		string str;
		
		while (!fin.eof()) {
			str = "";
			getline(fin, str);
			cout << str << endl;
		}
	}
	fin.close();
	return 0;

	setlocale(LC_ALL, "RUS");
	string path = "myFile.txt";
	fstream fs;
	fs.open(path, fstream::in | fstream::out | fstream::app);

	if (!fs.is_open()) {
		cout << "Ошибка открытия файла!" << endl;
	}
	else {
		string msg;
		int value;
		cout << "Файл открыт!" << endl;
		cout << "Нажмите 1 для записи сообщения в файл:" << endl;
		cout << "Нажмите 2 для считывания всех сообщений из файла:" << endl;
		cin >> value;

		if (value == 1) {
			cout << "Введите ваше сообщения!" << endl;
			cin >> msg;
			fs << msg << "\n";
		}

		if (value == 2) {
			while (!fs.eof()) {
				msg = "";
				fs >> msg;
				cout << msg << endl;
			}

		}
	}
	fs.close();
	return 0;
	*/
}