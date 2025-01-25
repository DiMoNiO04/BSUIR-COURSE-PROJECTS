#include<iostream>
#include<math.h>
using namespace std;

int main() {
	double a, b, h, x, y, s, w,eps;
	int k;
	cout << "a= "; cin >> a;
	cout << "b= "; cin >> b;
	cout << "h= "; cin >> h;
	cout << "eps=  "; cin >> eps;
	cout << "    x         S(x)          Y(x)        |Y(x)-S(x)| n" << endl;
	for (x = a; x <= b; x += h)
	{
		y = x * atan(x) - log(sqrt(1 + x * x));
		s = 0; w = -1; k = 0;
		do {
			k++;
			w *= -x * x;
			s += w / (2 * k * (2 * k - 1));
		} while (fabs(w / (2 * k * (2 * k - 1)) > eps));
		printf("   %4.2lf     %9.6lf     %9.6lf    %9.6lf   %d\n",
			x, s, y, fabs(s - y), k);
	}
}

