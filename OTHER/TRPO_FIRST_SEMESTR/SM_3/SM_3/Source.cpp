#include <iostream>
#include <string>
#include <fstream>

using namespace std;

struct exam {
	string nameOfExam;
	int mark = 0;
	double averageMarkLabs = 0;
	int studentId = 0;
};

exam* readExamFromFile(string fileName, int& size);
void rewritingLines();
exam* resizeArray(int& oldSize, int newSize, exam* exams);
void writeExamInFile(string fileName, exam* exams, int size);


int main() {
	int size = 1;
	exam* exams = readExamFromFile("file.txt", size);
	writeExamInFile("file.txt", exams, size);
	fstream file("file.txt");
	int sizeOfFile = 0;

	file.seekg(0, ios::end);
	sizeOfFile = file.tellg();
	cout << "Size of File " << sizeOfFile << " byte" << endl;

	file.close();
	rewritingLines();
	system("pause");
	return 0;
}

exam* readExamFromFile(string fileName, int& size){
	ifstream file(fileName);
	if (!file.is_open())
	{
		return nullptr;
	}
	size <= 0 ? size = 10 : size = size;
	
	exam* exams = new exam[size];
	int numberOfLines = 0;
	while (!file.eof()) {
		if (numberOfLines == size){
			exams = resizeArray(size, size + 1,exams);
		}	
		file >> exams[numberOfLines].nameOfExam;
		file >> exams[numberOfLines].mark;
		file >> exams[numberOfLines].averageMarkLabs;
		file >> exams[numberOfLines].studentId;
		numberOfLines++;
	}

	exams = resizeArray(size, numberOfLines - 1,exams);
	file.close();
	return exams;
}

exam* resizeArray(int& oldSize, int newSize, exam*exams){
	if (oldSize == newSize) {
		return exams;
	}

	exam* newArray = new exam[newSize];
	oldSize = newSize < oldSize ? newSize : oldSize;

	for (int i = 0; i < oldSize; i++){
		newArray[i] = exams[i];
	}

	oldSize = newSize;
	delete[] exams;
	return newArray;
}

void writeExamInFile(string fileName, exam* exams, int size){
	ofstream file(fileName);
	if (!file.is_open()) {
		return;
	}

	for (int i = size - 1; i >= 0; i--) {
		file << exams[i].nameOfExam << " ";
		file << exams[i].mark << " ";
		file << exams[i].averageMarkLabs << " ";
		file << exams[i].studentId << endl;
	}
	file.close();
} 

void rewritingLines() {
	ifstream in("file.txt");
	ofstream out("S3.txt");
	string line;
	string letter;

	cout << "Enter letter:\n";
	cin >> letter;

	while (getline(in, line)) {
		if (line.find(letter) != string::npos) {
			out << line << '\n';
		}
	}
}