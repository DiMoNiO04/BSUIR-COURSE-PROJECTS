#include<iostream>
using namespace std;

void perimeterÑalculation(int width, int length, int perimeter);
void printPerimeterÑalculation(int perimeter);
void squareCalculation(int width, int length, int square);
void printSquareCalculation(int square);
void drawingRectangle(int width, int length);
void fibonacchiNumber(int number, int a, int b, int fibonacciNumbers);
void facrotialNumber(int number, int factorialNumber, int  fibonacciNumbers, int a, int b);
void printFactorial(int factorialNumber);
void printFibonacchi(int fibonacciNumbers);
void determiningTheTypeOfTheFirstNumber(int numberFirst);
void determiningTheTypeOfTheSecondNumber(int numberSecond);
void node(int numberFirst, int numberSecond);
void binaryRepresentationOfANumber(int numb, int binaryRepresentationNumber, int count);
void printBinaryRepresentationOfANumber(int binaryRepresentationNumber);

int main()
{
	cout << "Exercises 1:\n";
	int width, length;
	cout << "Enter the  width = "; cin >> width;
	cout << "Enter the length = "; cin >> length;
	if (width <= 0 || length <= 0) {
		cout << "invalid numeric input\n";
	}
	else {
		int perimeter = 0;
		perimeterÑalculation(width, length, perimeter);
		int square = 0;
		squareCalculation(width, length, square);
		drawingRectangle(width, length);
	}

	cout << "\nExercises 2:\n";
	int number, fibonacciNumbers = 0;
	cout << "Enter the number  =  "; cin >> number;
	if (number <= 0) {
		cout << "Invalid numeric input\n";
	}
	else {
		int a = 0, b = 1;
		int factorialNumber = 1;
		cout << "Fibonacci numbers: ";
		fibonacchiNumber(number, a, b, fibonacciNumbers);
		facrotialNumber(number, factorialNumber, fibonacciNumbers, a, b);
	}

	cout << "\nExercises 3:\n";
	int numberFirst, numberSecond;
	cout << "Enter the first number: "; cin >> numberFirst;
	cout << "Enter the second number: "; cin >> numberSecond;
	cout << endl;
	determiningTheTypeOfTheFirstNumber(numberFirst);
	determiningTheTypeOfTheSecondNumber(numberSecond);
	node(numberFirst, numberSecond);

	cout << "\nExercises 4:\n";
	int numb, binaryRepresentationNumber = 0, count = 0;
	cout << "Enter the number "; cin >> numb;
	binaryRepresentationOfANumber(numb, binaryRepresentationNumber, count);
}

void perimeterÑalculation(int width, int length, int perimeter) {
	perimeter = (width + length) * 2;
	printPerimeterÑalculation(perimeter);
}

void printPerimeterÑalculation(int perimeter) {
	cout << "Perimiter = " << perimeter << endl;
}

void squareCalculation(int width, int length, int square) {
	square = width * length;
	printSquareCalculation(square);
}

void printSquareCalculation(int square) {
	cout << "Square = " << square << "\n" << endl;
}

void drawingRectangle(int width, int length) {
	for (int i = width; i > 0; i--) {
		for (int j = length; j > 0; j--) {
			cout << "!";
		}
		cout << endl;
	}
}

void fibonacchiNumber(int number, int a, int b, int fibonacciNumbers) {
	for (int e = 0; e < number; e++) {
		fibonacciNumbers = a + b;
		a = b;
		b = fibonacciNumbers;
		printFibonacchi(fibonacciNumbers);
	}
}

void printFibonacchi(int fibonacciNumbers) {
	cout << fibonacciNumbers << " ";
}

void facrotialNumber(int number, int factorialNumber, int  fibonacciNumbers, int a, int b) {
	for (int i = 1; i <= number; i++) {
		factorialNumber = factorialNumber * i;
	}
	printFactorial(factorialNumber);
}

void printFactorial(int factorialNumber) {
	cout << endl;
	cout << "The factorial of a number is  = " << factorialNumber << endl;
}

void determiningTheTypeOfTheFirstNumber(int numberFirst) {
	for (int i = 2; i < numberFirst; i++) {
		if (numberFirst % i == 0) {
			cout << numberFirst << " Not a prime number" << endl;
			break;
		}
		else  if (i == numberFirst - 1) {
			cout << numberFirst << " Prime number" << endl;
			break;
		}
	}
}

void determiningTheTypeOfTheSecondNumber(int numberSecond) {
	for (int i = 2; i < numberSecond; i++) {
		if (numberSecond % i == 0) {
			cout << numberSecond << " Not a prime number" << endl;
			break;
		}
		else  if (i == numberSecond - 1) {
			cout << numberSecond << " Prime number" << endl;
			break;
		}
	}
}

void node(int numberFirst, int numberSecond) {
	for (int i = min(numberFirst, numberSecond); i >= 1; i--) {
		if (numberFirst % i == 0 && numberSecond % i == 0) {
			cout << "NOD = " << i << endl;
			break;
		}
	}
}

void binaryRepresentationOfANumber(int numb, int binaryRepresentationNumber, int count) {
	while (numb >= 1) {
		binaryRepresentationNumber = numb % 2 * pow(10, count) + binaryRepresentationNumber;
		numb = numb / 2;
		count++;
	}
	printBinaryRepresentationOfANumber(binaryRepresentationNumber);
}

void printBinaryRepresentationOfANumber(int binaryRepresentationNumber) {
	cout << binaryRepresentationNumber;
}