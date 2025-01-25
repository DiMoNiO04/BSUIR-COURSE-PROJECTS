#include<iostream>
using namespace std;

int main()
{
	int time_of_the_year;
	cout << "Enter the month number "; cin >> time_of_the_year;
	switch (time_of_the_year) {
	case 12:
	case 1:
	case 2:
		cout << "January" << endl;
		cout << "Winter" << endl;
		break;
	case 3:
	case 4:
	case 5:
		cout << "Spring";
		break;
	case 6:
	case 7:
	case 8:
		cout << "Summer";
		break;
	case 9:
	case 10:
	case 11:
		cout << "Autumn";
		break;
	}
}