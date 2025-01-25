#include<iostream>
using namespace std;

int main()
{
	int n,a,b,c,d,e;
	cout << "Enter the number n = "; cin >> n;
	a = 0;
	b = 1;
	c = 1;
	cout << "Fibonacci numbers: ";
	for (int e =0; e <n; e++) {
		d = a+b;
		a=b;
		b = d;
		cout << d << " ";
		c = c *d;
		
	}
	cout << endl;
	cout << "n! = " << c<<endl;
	return 0;
}