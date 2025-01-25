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


int main() {
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
		cout <<i+1<<". "<< arr[i].surname << setw(10) << arr[i].name << setw(15) << arr[i].patronymic << endl;
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
			setw(17) << arr[i].dateOfBirth.day << "." << arr[i].dateOfBirth.month << "." << arr[i].dateOfBirth.year << "." <<setw(20)<< arr[i].dateOfBirth.age << endl;
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