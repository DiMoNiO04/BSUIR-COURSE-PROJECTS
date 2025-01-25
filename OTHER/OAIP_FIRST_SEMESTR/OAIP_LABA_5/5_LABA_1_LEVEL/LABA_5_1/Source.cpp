#include<iostream>
using namespace std;

int main() {
	setlocale(LC_ALL, "RUS");
	int  rows, cols;
	cout << "Введите размеры матрицы:\n";
	cout << "Введите количество строк: "; cin >> rows;
	cout << "Введите количество столбцов:"; cin >> cols;
	if (rows <= 0 || cols <= 0) {
		cout << "Несуществующая матрица !!!";
	}
	else {
		int** matrix = new int*[rows];

		for (int i = 0; i < rows; i++) 
			matrix[i] = new int[cols];

		
		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < cols; j++) {
				cout << "arr[" << i << "][" << j << "] = ";
				cin >> matrix[i][j];
			}
			cout << endl;
		}

		cout << "Результирующая матрица:\n";

		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < cols; j++) {
				cout << matrix[i][j]<<" ";
			}
			cout << endl;
		}

		int s = 0;
		for (int j = 0; j < cols; j++)
			for (int i = 0; i < rows; i++) 
				if (matrix[i][j] == 0)
				{
					s++;
					break;
				}
		if (s == 0) {
			cout << "Нет столбцов содержащих хотя бы один ноль" << endl;
		}
		else {
			cout << " Количество столбцов содержащих ноль = " << s << endl;
		}
		for (int i = 0; i < rows; i++) {
			delete[]matrix[i];
		}

		delete[]matrix;
		system("pause");
	}
}