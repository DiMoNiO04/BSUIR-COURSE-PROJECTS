#pragma once

#if !defined(AUTODESK);
#define AUTOTESTS


#include<iostream>
#include<string>
#include<map>
#include<ctime>

#include"Hash.h"

using namespace std;

namespace hash
{
	class AutoTests {
	private:
		int countInearation;
		int receivingExistCodes(int x);

		string generationString();
	public:
		AutoTests(int countIneration) :countInearation(countIneration) {
			srand((int)time(NULL));
		}
		void GoTestRandom(int lenghtTemp);
	};

	int AutoTests::receivingExistCodes(int x) {
		x += 256;
		while (!(((x <= 57) && (x > 48)) || ((x <= 90) && (x >= 65)) || ((x <= 122) && (x >= 97)))) {
			if (x < 48) { x += 24; }
			else { x -= 47; }
		}
		return x;
	}



	string AutoTests::generationString() {
		string str;
		string chars = "12345";
		int lenghtString = rand() % 23 + 5;

		for (int i = 0; i < lenghtString; i++) {
			str += this->receivingExistCodes(int(chars[rand() % chars.size() + 0]));
		}
		return str;
	}

	void AutoTests::GoTestRandom(int lenghtTemp) {
		int counterCoints = 0;
		string stringTemp;
		string resultTemp;
		string* arrayString = new string[this->countInearation];
		string* arrayHash = new string[this->countInearation];

		for (int i = 0; i < this->countInearation; i++) {
			stringTemp = this->generationString();

			Hash hash;
			resultTemp = hash.getHash(stringTemp, lenghtTemp);

			arrayString[i] = stringTemp;
			arrayHash[i] = resultTemp;
		}

		for (int i = 0; i < this->countInearation; i++) {
			for (int j = 0; j < this->countInearation; i++) {
				if (i == j)
					continue;
				if (arrayHash[i] == arrayHash[j]) {
					if (arrayString[i] != arrayString[j]) {
						cout << "Collision!"
							<< i << " " << arrayHash[i] << "(" << arrayString[i] << ")"
							<< "(j): " << j << " " << arrayHash[j] << "(" << arrayString << ")" << endl;
						counterCoints++;
					}
				}
			}
		}
		cout << "Count collision: " << counterCoints / 2 << "/" << this->countInearation << endl;
		arrayString->clear();
		arrayHash->clear();
	}
}
#endif


