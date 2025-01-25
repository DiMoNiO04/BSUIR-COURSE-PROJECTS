/*#include<iostream>
#include <string>
#include<ctime>
using namespace std;


void translationToString(int numberFirst, string str);
void translationToString(double numberTwo, string str);
void translationToString(int newNumber, int numberFirst, string str);
void massiv();
void massiv(int size);


int main() {
	srand(time(NULL));
	int numberFirst, newNumber = 0;
	double numberTwo;
	string str = " ";
	cout << "Please enter a whole natural number: "; cin >> numberFirst;
	cout << "Input your floating number: "; cin >> numberTwo;
	translationToString(numberFirst, str);
	translationToString(numberTwo, str);
	translationToString(newNumber, numberFirst, str);
	system("pause");
}

void translationToString(int numberFirst, string str) {
	cout << "\nExercises 1:" << endl;
	int d;
	char elementOfNumber = 0;
	if (numberFirst >= 0) {
		while (numberFirst != 0) {
			d = numberFirst % 10;
			numberFirst /= 10;
			elementOfNumber = (char)(d + 48);
			str = elementOfNumber + str;
		}
		cout << "String: " << str << endl << endl;
	}
	else {
		while (numberFirst != 0) {
			d = numberFirst % 10;
			numberFirst /= 10;
			elementOfNumber = (char)(-d + 48);
			str = elementOfNumber + str;
		}
		str = char(45) + str;
		cout << "String: " << str << endl << endl;
	}
}

void translationToString(double numberTwo, string str) {
	cout << "Exercises 2:\n";

	if (numberTwo == 0) {
		str = "0";
		cout << str;
	}

	else {

		bool isNegative = false;
		if (numberTwo < 0) {
			numberTwo *= -1;
			isNegative = true;
		}
		const double minValue = 1;
		const double maxValue = 10;
		int lastZeroCount = 0;
		int firstZeroCount = 0;
		while (numberTwo < minValue) {
			numberTwo *= 10;
			firstZeroCount++;
		}
		while (numberTwo >= maxValue) {
			numberTwo /= 10;
			lastZeroCount++;
		}

		int digit;
		int digitsCount = 17;
		while (digitsCount != 0) {
			digit = numberTwo;
			str += digit + '0';
			numberTwo = (numberTwo - digit) * 10;
			digitsCount--;
		}
		string firstZeroes;
		while (firstZeroCount != 0) {
			firstZeroes += "0";
			firstZeroCount--;
		}
		string lastZeroes;
		int dotIndex = 2 + lastZeroCount;
		while (lastZeroCount != 0) {
			lastZeroes += "0";
			lastZeroCount--;
		}
		str =  firstZeroes + str + lastZeroes;
		str.insert(dotIndex, ".");
		if (isNegative) {
			str = char(45) + str;
		}
		cout << str<<endl<<endl;
	}	
}


void translationToString(int newNumber, int numberFirst, string str) {
	int returnNumber;
	string print;
	newNumber = numberFirst;
	int d;
	char elementOfNumber = 0;

	int count = 0;
	while (numberFirst != 0) {
		count++;
		numberFirst /= 10;
	}

	cout << "Enter the number of numbers you want to translate into a string: "; cin >> returnNumber;
	if (returnNumber <= 0 || returnNumber > count) {
		cout << "Invalid numeric input\n\n";
	}
	else if (newNumber > 0) {
		while (newNumber != 0) {
			d = newNumber % 10;
			newNumber /= 10;
			elementOfNumber = (char)(d + 48);
			str = elementOfNumber + str;
		}

		for (int i = 0; i < returnNumber; i++) {
			print += str[i];
		}
		cout << "Your new number: " << print << endl << endl;
	}

	else {
		
		while (newNumber != 0) {
			d = newNumber % 10;
			newNumber /= 10;
			elementOfNumber = (char)(-d + 48);
			str = elementOfNumber + str;
		}
		
		for (int i = 0; i < returnNumber; i++) {
			print += str[i];
		}

		print = char(45) + print;

		cout << "Your new number: " << print << endl << endl;
	}
	massiv();
}

void massiv() {
	cout << "Exercises 3:" << endl;
	int size;
	cout << "Enter the size of the array "; cin >> size;
	if (size <= 0) {
		cout << "Invalid numeric input\n";
	}
	else {
		int* arr = new int[size];

		for (int i = 0; i < size; i++) {
			arr[i] = rand() % 10;
			cout << arr[i] << " ";
		}

		int element;
		cout << "\nEnter the number that "; cin >> element;
		if (element < 0 || element>9) {
			cout << "Non-existent array element";
		}
		else {
			int count = 0;
			for (int i = 0; i < size; i++) {
				if (arr[i] == element) {
					count++;
				}
			}
			cout << "The number of elements in the array you were looking for = " << count << endl;
		}
		delete[]arr;
		massiv(size);
	}
}

void massiv(int size) {
	cout << endl << "String type:\n";
	int* arr = new int[size];
	for (int i = 0; i < size; i++) {
		arr[i] = rand() % 10;
		cout << arr[i] << " ";
	}

	int d;
	char c = 0;
	string s = "";

	for (int i = 0; i < size; i++) {
		//highlighting each digit of a number
		d = arr[i];
		//conversion to symbolic type
		c = (char)(d + 48);
		//concatenation with original string
		s = s + c;
	}
	cout << "\nString: " << s << endl;;
	delete[]arr;
}
*/

#include <iostream>
#include <algorithm>
#include <iomanip>
#include <ctime>
#include <string>

using namespace std;

struct DateOfBirth {
	int day;
	int month;
	int year;
	int age;
};

struct Student {
	string surname;
	string name;
	string patronymic;
	string city;

	DateOfBirth dateOfBirth;
};

enum sorting { surname = 1, name, patronymic, city, age };

Student* inputStudents(int amountOfStudents);
void printStudents(Student* arr, int amountOfStudents);
int ñommonName(Student* arr, int amountOfStudents);
void sorting(int* arr, int amountOfStudents);
bool compBySurname(Student student, Student studentPlus);
bool compByName(Student student, Student studentPlus);
bool compByPatronymic(Student student, Student studentPlus);
bool compByCity(Student student, Student studentPlus);
Student* countAge(Student* arr, int amountOfStudents);
void printStudents_N_P(Student* arr, int amountOfStudents);
bool compByAge(Student student, Student studentPlus);
double calculationOfAverageAge(Student* arr, int amountOfStudents);
void dadssad();

int main() {
	dadssad();
}

void dadssad() {
	time_t t = time(NULL);
	struct tm* T = new tm;
	localtime_s(T, &t);

	int amountOfStudents;
	cout << "Enter the number of students  : "; cin >> amountOfStudents;
	if (amountOfStudents < 1) {
		while (amountOfStudents < 1) {
			cout << "Entered incorrectly. Re-enter\n";
			cout << "Enter the number of students  : "; cin >> amountOfStudents;
		}
	}

	Student* arr = new Student[amountOfStudents];
	arr = inputStudents(amountOfStudents);
	arr = countAge(arr, amountOfStudents);
	cout << "\n   Students:\n";
	printStudents(arr, amountOfStudents);

	int indexName = 0;
	indexName = ñommonName(arr, amountOfStudents);
	if (indexName <= 1) {
		cout << "No common name\n";
	}
	else {
		cout << "\nMost common name " << arr[indexName].name << endl;
	}

	int view;
	cout << "\n1 - sort by surname\n2 - sort by name\n3 - sorting by patronymic\n4 - sort by city\n5 - sort by age";
	cout << "\n\nSelect sorting type : "; cin >> view;
	switch (view)
	{
	case surname:
		sort(arr, arr + amountOfStudents, compBySurname);
		printStudents_N_P(arr, amountOfStudents);
		break;
	case name:
		sort(arr, arr + amountOfStudents, compByName);
		printStudents_N_P(arr, amountOfStudents);
		break;
	case patronymic:
		sort(arr, arr + amountOfStudents, compByPatronymic);
		printStudents_N_P(arr, amountOfStudents);
		break;
	case city:
		sort(arr, arr + amountOfStudents, compByCity);
		printStudents_N_P(arr, amountOfStudents);
		break;
	case age:
		sort(arr, arr + amountOfStudents, compByAge);
		printStudents_N_P(arr, amountOfStudents);
		break;
	default:
		cout << " Incorrect input " << endl;
		break;
	}

}

Student* inputStudents(int amountOfStudents) {

	Student* arr = new Student[amountOfStudents];

	for (int i = 0; i < amountOfStudents; i++) {
		cout << "\nStudent " << i + 1 << " :" << endl;
		cout << "Enter the name of the student " << i + 1 << ": ";
		cin >> arr[i].surname >> arr[i].name >> arr[i].patronymic;
		cout << "Enter his city : "; cin >> arr[i].city;
		cout << "Enter your date of birth : ";
		cin >> arr[i].dateOfBirth.day >> arr[i].dateOfBirth.month >> arr[i].dateOfBirth.year;
		if (arr[i].dateOfBirth.day < 1 || arr[i].dateOfBirth.day > 31 || arr[i].dateOfBirth.month < 1 || arr[i].dateOfBirth.month>12) {
			cout << "The data of birth was entered incorrectly. Re-enter\n";
			i--;
		}
	}
	return arr;
}

void printStudents(Student* arr, int amountOfStudents) {
	for (int i = 0; i < amountOfStudents; i++) {
		cout << i + 1 << ". " << arr[i].surname << setw(10) << arr[i].name << setw(15) << arr[i].patronymic << endl;
	}
}

int ñommonName(Student* arr, int amountOfStudents) {
	int sameName = 0, checkName = 0, indexName = 0;
	for (int i = 0; i < amountOfStudents; i++) {
		sameName = 0;
		for (int j = i + 1; j < amountOfStudents; j++) {
			if (arr[i].name == arr[j].name) {
				checkName++;
				if (sameName < checkName) {
					checkName = sameName;
					indexName++;
				}
			}
		}
	}
	return indexName;
}


Student* countAge(Student* arr, int amountOfStudents) {

	for (int i = 0; i < amountOfStudents; i++) {
		int age = 0;
		age = 2021 - arr[i].dateOfBirth.year;
		if (arr[i].dateOfBirth.month > 12) {
			age--;
		}
		else if (arr[i].dateOfBirth.month == 12 && arr[i].dateOfBirth.day > 12) {
			age--;
		}
		arr[i].dateOfBirth.age = age;
	}
	return arr;
}



void printStudents_N_P(Student* arr, int amountOfStudents) {
	for (int i = 0; i < amountOfStudents; i++) {
		cout << arr[i].surname << " " << arr[i].name[0] << "." << arr[i].patronymic[0] << "." << setw(13) << arr[i].city <<
			setw(17) << arr[i].dateOfBirth.day << "." << arr[i].dateOfBirth.month << "." << arr[i].dateOfBirth.year << "." << setw(20) << arr[i].dateOfBirth.age << endl;
	}
}

bool compByName(Student student, Student studentPlus) {
	return student.surname < studentPlus.surname;
}

bool compBySurname(Student student, Student studentPlus) {
	return student.name < studentPlus.name;
}

bool compByPatronymic(Student student, Student studentPlus) {
	return student.patronymic < studentPlus.patronymic;
}

bool compByCity(Student student, Student studentPlus) {
	return student.city < studentPlus.city;
}

bool compByAge(Student student, Student studentPlus) {
	return student.dateOfBirth.age < studentPlus.dateOfBirth.age;
}

double calculationOfAverageAge(Student* arr, int amountOfStudents) {
	double sumAge = 0;
	for (int i = 0; i < amountOfStudents; i++) {
		sumAge = sumAge + arr[i].dateOfBirth.age;
	}
	double averageAge;
	averageAge = sumAge / amountOfStudents;
	return averageAge;
}





	




