#include <iostream>
#include <cstdlib>
#include <ctime>
#include <string>
#include "sha1.h"
#include "sha256.h"

using namespace std;

const int SALT_SIZE = 16; // длина соли
const int SYMBOLS_SIZE = 62; // набор символов, из которых генерируется соль

string generateSalt(int salt_size); // функция генерации соли

string getSymbolsForSalt(); // функция формирования набора символов
// вида: aA0bB1cC2dD3eE4fF5gG6hH7iI8jJ9kKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ

int main()
{
	setlocale(LC_ALL, "RUS");

	string pass = "grape"; // для примера

	cout << "sha1: " << sha1(pass) << endl;

	cout << "sha256: " << sha256(pass) << endl;

	string salt = generateSalt(SALT_SIZE); // генерируем соль
	cout << "salt: " << salt << endl;

	string hash_pass_with_salt = sha256(pass + salt); // простейшее хэширование с солью
	cout << "hash_pass_with_salt: " << hash_pass_with_salt << endl;

	hash_pass_with_salt = sha256(sha256(pass + salt) + sha256(pass)); // усложненный вариант (рекомендуется)
	cout << "hash_pass_with_salt: " << hash_pass_with_salt << endl;

	system("pause");
}

string generateSalt(int salt_size)
{
	string symbols = getSymbolsForSalt();
	cout << symbols << endl;

	srand(time(NULL));

	string salt;
	salt.reserve(salt_size);

	for (int i = 0; i < salt_size; i++)
	{
		salt.push_back(symbols[rand() % SYMBOLS_SIZE]);
	}

	return salt;
}


string getSymbolsForSalt()
{
	string symbols;
	symbols.reserve(SYMBOLS_SIZE);

	char little_letter = 'a';
	char big_letter = 'A';
	char number = '0';
	int i = 0;
	for (int k = 0; k < 26; k++)
	{
		symbols.push_back(little_letter++);
		symbols.push_back(big_letter++);
		if (k < 10) symbols.push_back(number++);
	}

	return symbols;
}


