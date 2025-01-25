#include <iostream>
using namespace std;

int NODrecursia(int numberFirst, int numberSecond)
{
    if (numberSecond == 0) return numberFirst;
    else return NODrecursia(numberSecond, numberFirst % numberSecond);
}

int NOD(int numberFirst, int numberSecond) {

    while (numberSecond != numberFirst) {
        if (numberSecond > numberFirst)  numberSecond = numberSecond - numberFirst;
        else numberFirst = numberFirst - numberSecond;
    }
    return numberSecond;
}

int main() {
    setlocale(LC_ALL, "RUS");
    int numberFirst, numberSecond;
    cout << "Введите первое число : "; cin >> numberFirst;
    cout << "Введите второе число : "; cin >> numberSecond;

    if (numberFirst == 0 || numberSecond == 0) cout << "НОД таких чисел не существует\n";
    else {
        numberFirst = fabs(numberFirst);
        numberSecond = fabs(numberSecond);

        cout <<endl<< "НОД чисел  через рекурсивную функцию = " << NODrecursia(numberFirst, numberSecond);
        cout << endl << "НОД чисел через обычную функцию " << NOD(numberFirst, numberSecond);

        if (NODrecursia(numberFirst, numberSecond) == NOD(numberFirst, numberSecond))
            cout << "\n\nРекурсивная и обычная функция равны\n";
        else cout << endl << "Не равны";
    }  
    system("pause");
}
