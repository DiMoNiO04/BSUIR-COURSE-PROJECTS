#include"AutoTest.h"
#include<iostream>
#include<string>
#include<vector>
#include<cstdlib>

using namespace hash;

int main() {
	Hash hash;

	string str;
	int len;

	cin >> str >> len;
	cout << hash.getHash(str, len) << endl;
	//AutoTests test(1500);
	//test.GoTestRandom(6);

	system("pause");
	return 0;
}