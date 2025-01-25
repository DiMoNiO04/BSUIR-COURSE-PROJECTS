#include<iostream>
#include <stdio.h>
#include <conio.h>

using namespace std;

int main()
{
    setlocale(LC_ALL, "RUS");
    int numberFirst, numberSecond;
    cout << "Введите первое число : "; cin >> numberFirst;
    cout << "Введите второе число : "; cin >> numberSecond;
    if (numberFirst == 0 || numberSecond == 0) {
        cout << "Для таких чисел НОД не существует";
    }
    while (numberFirst != numberSecond) {


    }

}

