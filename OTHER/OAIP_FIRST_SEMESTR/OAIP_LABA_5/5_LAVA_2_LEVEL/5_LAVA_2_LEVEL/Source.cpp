#include<iostream>
#include<ctime>
using namespace std;

int main() {
	setlocale(LC_ALL, "rus");
	srand(time(NULL));
	int rows, cols;
	cout << "Введите количество строк динамического массива: "; cin >> rows;
	cout << "Введите количество столбцов динамичского массива:"; cin >> cols;
	if (rows <= 0 || cols <= 0) cout << "Несуществующая матрица\n";
	else {
		int** matrix = new int* [rows];

		for (int i = 0; i < rows; i++) {
			matrix[i] = new int[cols];
		}

		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < cols; j++) {
				cout << "matrix[" << i << "][" << j << "] = ";
				cin >> matrix[i][j];
			}
			cout << endl;
		}

		cout << "Matrix: \n";
		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < cols; j++) {
				cout << matrix[i][j]<<" ";
			}
			cout << endl;
		}

		int specialElement = 0;
		for (int j = 0; j < cols; j++) {
			int max = 0;
			int summa = 0;
			for (int i = 0; i < rows; i++) {
				if (matrix[i][j] > max) {
					max = matrix[i][j];
				}
				summa = summa + matrix[i][j];

			}
			if (summa - max < max) 
				specialElement++;
		}

		if (specialElement >= 1)
			cout << endl << "Особых элементов матрицы , которые больше суммы всех элементов в столбце  = " << specialElement << endl;
		else cout << "\nМатрица не содержит особых элементов\n";
	}
}