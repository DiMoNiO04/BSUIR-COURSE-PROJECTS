#include"iostream"
#include"fstream"
#include"iomanip"
#include"string"

using namespace std;

enum mainMenu {
	EXIT_FROM_PROGRAM,
	VIEW,
	ADD,
	INDIVIDUAL
};

struct marks {
	int fisics = 0,
		math = 0,
		informat = 0;
};

struct student {
	string surname,
		numberOfGroup;
	marks marks;
	double averageMark = 0;
};


void mainMenu();
void readingFailInArr(student*(&students), int &amountOfStudents, string fileName);
void viewAllStudents(student* students, int amountOfStudents, string fileName);
void savingInFail(student* (&students), int& amountOfStudents, string fileName);
void addPatient(student* (&students), int& amountOfStudents, string fileName);
void viewAloneStudent(student* (&students), int& amountOfStudents, int numberStudent);
void individualTask(student* (&students), int& amountOfStudents);
void copyStudents(student* (&previosStudents), student* (&newStudents), int& amountOfStudents);
void passingInformationInStudents(student* (&previosStudents), student* (&newStudents), int& amountOfStudents, int oldAmountOfStudents);


int const
DATA_IS_EMPTY = 0,
MAX_SIZE_FOR_STRUCT = 100,
YES = 1,
GOOD_MARK_STUDENT = 7;


int main() {

	setlocale(LC_ALL, "RUS");
	string fileName;
	cout << "Для начало необходимо создать файл\nВведите название текстового файла\n<< ";  cin >> fileName;  

	int amountOfStudents = DATA_IS_EMPTY;
	student* students = new student[MAX_SIZE_FOR_STRUCT];

	int mainChoice = -1;
	while (mainChoice != EXIT_FROM_PROGRAM) {
		system("cls");
		mainMenu();
		cin >> mainChoice;

		switch (mainChoice) {
		case VIEW: {
			if (amountOfStudents == DATA_IS_EMPTY) {
				system("cls");
				cout << "Данных нет\nДобавьте сперва данные в файл\n\n";
				system("pause");
			}
			else {
				viewAllStudents(students, amountOfStudents, fileName);
			}
			break;
		}
		case ADD: {
			addPatient(students, amountOfStudents, fileName);
			break;
		}
		case INDIVIDUAL: {
			if (amountOfStudents == DATA_IS_EMPTY) {
				system("cls");
				cout << "Данных нет\nДобавьте сперва данные в файл\n\n";
				system("pause");
			}
			else {
				individualTask(students, amountOfStudents);
			}
			break;
		}
		case EXIT_FROM_PROGRAM: {
			break;
		}
		default: {
			cout << "Неверный числовой ввод. Повторите попытку\n";
		}
		}
	}

	system("cls");
	cout << "Вы вышли из программы\nВсего доброго!\n\n";
	system("pause");
	return 0;
}

void mainMenu() {
	system("cls");
	cout << "1. Просмотр\n"
		<< "2. Добавить данные в файл\n"
		<< "3. Найти информацию о студентах отличниках из интересующей вас группы\n"
		<< "0. Выйти из программы\n"
		<< "<< ";
}

void readingFailInArr(student* (&students), int& amountOfStudents, string fileName) {

	ifstream reading(fileName); 
	if (!reading.is_open()) {  
		cout << "Ошибка открытия файла";
	}
	else {
		int numberStudent = DATA_IS_EMPTY;
		while (!reading.eof()) {
			if (numberStudent < MAX_SIZE_FOR_STRUCT) {
				reading >> students[numberStudent].surname
					>> students[numberStudent].numberOfGroup
					>> students[numberStudent].marks.fisics
					>> students[numberStudent].marks.math
					>> students[numberStudent].marks.informat
					>> students[numberStudent].averageMark;
				if (students[numberStudent].surname.empty()) {
					break;
				}
				numberStudent++;
			}
		}
		amountOfStudents = numberStudent;
	}
	reading.close();  
}

void viewAllStudents(student* students, int amountOfStudents, string fileName) {

	readingFailInArr(students, amountOfStudents, fileName);
	cout << "№" << setw(20) << "Фамилия:" << setw(20) << "Номер группы:" << setw(20) << "Физика:" << setw(20) << "Математика:" << setw(20) << "Информатика:" << setw(20) << "Средняя оценка:";
	for (int numberStudent = 0; numberStudent < amountOfStudents; numberStudent++) {
		viewAloneStudent(students, amountOfStudents, numberStudent);
	}
	system("pause");
}

void viewAloneStudent(student* (&students), int& amountOfStudents, int numberStudent) {

	cout << "\nДанные №" << numberStudent + 1 << ": ";
		cout << students[numberStudent].surname << setw(20) << students[numberStudent].numberOfGroup << setw(20) << students[numberStudent].marks.fisics <<
			setw(20) << students[numberStudent].marks.math << setw(20) << students[numberStudent].marks.informat << setw(20) << students[numberStudent].averageMark;
		cout << endl;
}

void savingInFail(student* (&students), int& amountOfStudents, string fileName) {

	ofstream record(fileName, ios::out); 
	if (record) { 
		
		
		for (int numberStudent = 0; numberStudent < amountOfStudents; numberStudent++) {
			record << students[numberStudent].surname << "  "
				<< students[numberStudent].numberOfGroup << "  "
				<< students[numberStudent].marks.fisics << "  "
				<< students[numberStudent].marks.math << "  "
				<< students[numberStudent].marks.informat << "  ";

			if (numberStudent < amountOfStudents - 1) {
				record << students[numberStudent].averageMark << endl;
			}
			else {  
				record << students[numberStudent].averageMark;
			}
		}
	}
	else { 
		cout << "Ошибка открытия файла";
	}
	record.close();  
}

void addPatient(student* (&students), int& amountOfStudents, string fileName) {

	student* temporaryStudents = new student[amountOfStudents];
	copyStudents(students, temporaryStudents, amountOfStudents);
	amountOfStudents++;
	students = new student[amountOfStudents];
	passingInformationInStudents(temporaryStudents, students, amountOfStudents, amountOfStudents - 1);

	system("cls");
	cout << "Заполните данные:\n";
	cout << "Фамилия: ";                cin >> students[amountOfStudents-1].surname;
	cout << "Номер группы: ";           cin >> students[amountOfStudents-1].numberOfGroup;
	cout << "Оценка по физике: ";       cin >> students[amountOfStudents-1].marks.math;
	cout << "Оценка по математике: ";   cin >> students[amountOfStudents-1].marks.fisics;
	cout << "Оценка по информатике: ";  cin >> students[amountOfStudents-1].marks.informat;
	students[amountOfStudents - 1].averageMark = (students[amountOfStudents - 1].marks.fisics + students[amountOfStudents - 1].marks.math + students[amountOfStudents - 1].marks.informat) / 3.0;
	cout << "Средняя оценка = " << students[amountOfStudents - 1].averageMark;

	int confirmation = 0;
	cout << "\n\nВы уверены что хотите добавить пациента?\n1. Да\n2. Нет\n<< "; cin >> confirmation;
	if (confirmation == YES) {
		savingInFail(students, amountOfStudents, fileName);
	}
	else {
		amountOfStudents--;
	}
}

void copyStudents(student* (&previosStudents), student* (&newStudents), int& amountOfStudents) {
	for (int numberStudent = 0; numberStudent < amountOfStudents; numberStudent++) {
		newStudents[numberStudent] = previosStudents[numberStudent];
	}
}

void passingInformationInStudents(student* (&previosStudents), student* (&newStudents), int& amountOfStudents, int oldAmountOfStudents) {
	for (int numberStudent = 0; numberStudent < oldAmountOfStudents; numberStudent++) {
		newStudents[numberStudent] = previosStudents[numberStudent];
	}
}

void individualTask(student* (&students), int& amountOfStudents) {

	system("cls");
	string searchGroup;
	cout << "Введите номер группы из которой хотите вывести студентов-отличников\n<< ";
	cin >> searchGroup;

	system("cls");
	cout << "Cтуденты отличники из группы №" << searchGroup << " :\n\n";
	bool count = false;
	for (int numberStudent = 0; numberStudent < amountOfStudents; numberStudent++) {
		if (searchGroup == students[numberStudent].numberOfGroup && students[numberStudent].averageMark > GOOD_MARK_STUDENT) {
			count = true;
			viewAloneStudent(students, amountOfStudents, numberStudent);
		}
	}
	if (count == false) {
		cout << "Данные не найдены или некоректно введены";
	}
	cout << endl;
	system("pause");
}