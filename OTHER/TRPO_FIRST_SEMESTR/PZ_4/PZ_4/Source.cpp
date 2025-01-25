#include<iostream>
#include<ctime>
#include<algorithm>
#include <iomanip>
#include <cstdlib>
using namespace std;

void creationMatrix(int** matrix, int row, int column);
void inputMatrix(int** matrix, int row, int column, int interval, int min, int max);
void deleteMatrix(int** matrix, int row);
void createArr(int* arr, int sizeTwo, int maxTwo, int minTwo, int intervalTwo);
void inputArr(int* arr, int sizeTwo);
double sredneeArr(int* arr, int sizeTwo, double sum, double srednee);
double sumArr(int* arr, int sizeTwo, double sum);
void removingDuplicateElements(int* arr, int sizeFour);
int maxElementMatrix(int** matrix, int rowFive, int colFive, int maxFive);
int minElementMatrix(int** matrix, int rowFive, int colFive, int minFive);
void translateMatrixInArr(int** matrix, int* arr, int rowFive, int colFive);
void inputMatrixTwo(int** matrix, int rowFive, int colFive, int maxIntervalFive, int minIntervalFive);


int main() {
	int row, column, min, max, interval = 0;
	srand(time(NULL));
	cout << "Task number 1" << endl;
	cout << "Enter the number of rows "; cin >> row;
	cout << "Enter the number of columns "; cin >> column;

	if (row <= 0 || column <= 0)
		cout << "Non-existent matrix ";
	else {

		cout << "Minimum element  ="; cin >> min;
		cout << "Maximum element  ="; cin >> max;
		if (max < min) cout << "Invalid input  \n";
		else {

			int** matrix = new int* [row];
			creationMatrix(matrix, row, column);

			cout << "Matrix:\n";
			inputMatrix(matrix, row, column, interval, min, max);
			deleteMatrix(matrix, row);

			system("pause");
		}

		cout << endl << "Task number 2  " << endl;
		int sizeTwo, minTwo, maxTwo, intervalTwo = 0;
		cout << "Enter the size of the array  "; cin >> sizeTwo;
		if (sizeTwo <= 0) cout << "Invalid input  \n";
		else {
			cout << "Enter minimum element : "; cin >> minTwo;
			cout << "Enter the maximum element : "; cin >> maxTwo;

			if (maxTwo < minTwo)cout << "Invalid input ";
			else {

				int* arr = new int[sizeTwo];
				createArr(arr, sizeTwo, maxTwo, minTwo, intervalTwo);

				double sum = 0;
				double srednee = 0;
				sum = sumArr(arr, sizeTwo, sum);
				srednee = sredneeArr(arr, sizeTwo, sum, srednee);

				cout << "\nThe sum of the array elements is = " << sum;
				cout << "\nAverage value of array elements  = " << srednee << endl;

				system("pause");
			}
		}

		cout << "\n Task number 3 \n";
		int row_1, col_1, row_2, col_2, row_3 = 0, col_3 = 0, newI, i, j, minThree, maxThree, multiply = 1;
		cout << "Enter the number of rows of the first matrix  : "; cin >> row_1;
		cout << "Enter the number of columns of the first matrix : "; cin >> col_1;
		cout << "Enter the number of rows of the second matrix : "; cin >> row_2;
		cout << "Enter the number of columns of the second matrix : "; cin >> col_2;
		cout << "Minimum element : "; cin >> minThree;
		cout << "Maximum element : "; cin >> maxThree;

		if (minThree > maxThree) {
			cout << "Invalid input " << endl;
			system("pause");
		}

		if (row_1 <= 0 || col_1 <= 0 || row_2 <= 0 || col_2 <= 0) {
			cout << "Non-existent matrix   " << endl;
			system("pause");
		}
		else {
			row_3 = row_1;
			col_3 = col_2;

			int** firstMatrix = new int* [row_1];
			int** secondMatrix = new int* [row_2];
			int** newMatrix = new int* [row_3];

			cout << endl;
			cout << "First matrix : " << endl;
			for (i = 0; i < row_1; i++) {
				firstMatrix[i] = new int[col_1];
				for (j = 0; j < col_1; j++) {
					firstMatrix[i][j] = rand() % (maxThree - minThree + 1) + minThree;
					cout << setw(3) << firstMatrix[i][j] << " ";
				}
				cout << endl;
			}
			cout << endl;
			cout << "Second matrix: " << endl;
			for (i = 0; i < row_2; i++) {
				secondMatrix[i] = new int[col_2];
				for (j = 0; j < col_2; j++) {
					secondMatrix[i][j] = rand() % (maxThree - minThree + 1) + minThree;
					cout << setw(3) << secondMatrix[i][j] << " ";
				}
				cout << endl;
			}
			cout << endl;
			if (col_1 != row_2) {
				cout << "Matrices cannot be multiplied !" << endl;
			}
			else {
				cout << " Result matrix :\n";
				for (i = 0; i < row_3; i++) {
					newMatrix[i] = new int[col_3];
					for (j = 0; j < col_3; j++) {
						newMatrix[i][j] = 0;
						for (newI = 0; newI < row_3; newI++) {
							newMatrix[i][j] += firstMatrix[i][newI] * secondMatrix[newI][j];
						}
					}
				}
				for (i = 0; i < row_3; i++) {
					for (j = 0; j < col_3; j++) {
						cout << setw(3) << newMatrix[i][j] << " ";
					}
					cout << endl;

				}
				for (i = 0; i < row_3; i++) {
					delete[] newMatrix[i];
				}
				delete[] newMatrix;
			}

			for (i = 0; i < row_1; i++) {
				delete[] firstMatrix[i];
			}
			delete[] firstMatrix;

			for (i = 0; i < row_2; i++) {
				delete[] secondMatrix[i];
			}
			delete[] secondMatrix;
			system("pause");
		}

		cout << endl << "\nTask number 4  " << endl;
		int sizeFour, minFour, maxFour, intervalFour = 0;
		double sumFour = 0, sredneeFour;
		cout << "Enter the size of the array  "; cin >> sizeFour;
		if (sizeFour <= 0) cout << "Invalid input  ";
		else {
			cout << "Enter minimum element: "; cin >> minFour;
			cout << "Enter the maximum element : "; cin >> maxFour;

			if (maxFour < minFour) cout << "Invalid input \n";
			else {

				int* arr = new int[sizeFour];

				cout << "Source array: " << endl;
				createArr(arr, sizeFour, maxFour, minFour, intervalFour);
				inputArr(arr, sizeFour);

				cout << "\nArray without repeating elements : ";
				removingDuplicateElements(arr, sizeFour);

				sort(arr, arr + sizeFour);
				cout << "Sorted array : ";
				inputArr(arr, sizeFour);
				cout << endl;
				cout << "Median of the array  = " << arr[sizeFour / 2];
				cout << endl;
			}
		}
	}

	cout << "\nTask number 5 \n";
	int rowFive, colFive, minFive, maxFive, sizeFive, minIntervalFive, maxIntervalFive;
	cout << "Enter the number of lines :"; cin >> rowFive;
	cout << "Enter the number of columns :"; cin >> colFive;
	cout << "Minimum element :"; cin >> minIntervalFive;
	cout << "Maximum element :"; cin >> maxIntervalFive;

	if (minIntervalFive > maxIntervalFive) {
		cout << "Invalid input ";
	}
	else {
		maxFive = minIntervalFive;
		minFive = maxIntervalFive;

		sizeFive = rowFive * colFive;
		int** matrix = new int* [rowFive];
		int* arr = new int[sizeFive];

		creationMatrix(matrix, rowFive, colFive);

		cout << "Matrix :\n";
		inputMatrixTwo(matrix, rowFive, colFive, maxIntervalFive, minIntervalFive);
		translateMatrixInArr(matrix, arr, rowFive, colFive);
		minFive = minElementMatrix(matrix, rowFive, colFive, minFive);
		maxFive = maxElementMatrix(matrix, rowFive, colFive, maxFive);

		cout << "Array from matrix :\n";
		inputArr(arr, sizeFive);

		if (minFive != maxFive) {
			cout << endl;
			cout << "Minimum element of an array : " << minFive << endl;
			cout << "Maximum array element :" << maxFive << endl;
		}
		else {
			cout << "\nNo maximum and minimum element";
		}
		cout << "\nMedian matrix : " << arr[sizeFive / 2] << endl;

		deleteMatrix(matrix, rowFive);
		delete[] arr;
	}
}

void creationMatrix(int** matrix, int row, int column) {
	for (int i = 0; i < row; i++) {
		matrix[i] = new int[column];
	}
}

void inputMatrix(int** matrix, int row, int column, int interval, int min, int max) {

	interval = (max - min + 1);
	for (int i = 0; i < row; i++) {
		for (int j = 0; j < column; j++) {
			matrix[i][j] = rand() % interval + min;
			cout << matrix[i][j] << "\t";
		}
		cout << endl;
	}
}

void deleteMatrix(int** matrix, int row) {

	for (int i = 0; i < row; i++) {
		delete[]matrix[i];
	}

	delete[]matrix;
}

void createArr(int* arr, int sizeTwo, int maxTwo, int minTwo, int intervalTwo) {
	intervalTwo = (maxTwo - minTwo + 1);
	for (int i = 0; i < sizeTwo; i++) {
		arr[i] = rand() % intervalTwo + minTwo;
	}
}

void inputArr(int* arr, int sizeTwo) {
	for (int i = 0; i < sizeTwo; i++) {
		cout << arr[i] << " ";
	}
}

double sumArr(int* arr, int sizeTwo, double sum) {
	for (int i = 0; i < sizeTwo; i++) {
		cout << arr[i] << " ";
		sum += arr[i];
	}
	return sum;
}

double sredneeArr(int* arr, int sizeTwo, double sum, double srednee) {

	srednee = sum / sizeTwo;
	return srednee;
}

void removingDuplicateElements(int* arr, int sizeFour) {
	for (int i = 0; i < sizeFour; i++) {
		for (int j = i + 1; j < sizeFour; j++) {
			if (arr[i] == arr[j]) {
				for (int k = j; k < sizeFour - 1; k++) {
					arr[k] = arr[k + 1];
				}
				sizeFour--;
				j--;
			}
		}
		cout << arr[i] << " ";
	}
	cout << endl;
}
int maxElementMatrix(int** matrix, int rowFive, int colFive, int maxFive) {
	for (int i = 0; i < rowFive; i++) {
		for (int j = 0; j < colFive; j++) {
			if (matrix[i][j] > maxFive) {
				maxFive = matrix[i][j];
			}
		}
	}
	return maxFive;
}

int minElementMatrix(int** matrix, int rowFive, int colFive, int minFive) {
	for (int i = 0; i < rowFive; i++) {
		for (int j = 0; j < colFive; j++) {
			if (matrix[i][j] < minFive) {
				minFive = matrix[i][j];
			}
		}
	}
	return minFive;
}

void translateMatrixInArr(int** matrix, int* arr, int rowFive, int colFive) {
	for (int i = 0; i < rowFive; i++) {
		for (int j = 0; j < colFive; j++) {
			arr[i * colFive + j] = matrix[i][j];
		}
	}
}

void inputMatrixTwo(int** matrix, int rowFive, int colFive, int maxIntervalFive, int minIntervalFive) {
	for (int i = 0; i < rowFive; i++) {
		for (int j = 0; j < colFive; j++) {
			matrix[i][j] = rand() % (maxIntervalFive - minIntervalFive + 1) + minIntervalFive;
			cout << setw(3) << matrix[i][j] << " ";
		}
		cout << endl;
	}
}
