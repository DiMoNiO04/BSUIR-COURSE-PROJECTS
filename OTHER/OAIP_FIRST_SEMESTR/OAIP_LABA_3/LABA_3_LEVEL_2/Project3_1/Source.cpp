#include<iostream>
#include<math.h>
using namespace std;

int main() {
	double a, b, h, x, y,s, w, q;
	int n, k;
	cout << "a= "; cin >> a;
	cout << "b= "; cin >> b;
	cout << "h= "; cin >> h;
	cout << "n= "; cin >> n;
	cout << "        x       s(x)         y(x)       |Y(x)-S(x)|" << endl;
	for (x = a; x <= b; x += h)
	{
		
		y = x*atan(x)-log(sqrt(1+x*x));
        s = 0; w = -1;
		for (k = 1; k <= n; k++) 
		{
			w *= -x * x; 
			s += w/ (2 * k * (2 * k - 1));
		}
		printf("   %4.2lf     %9.6lf     %9.6lf    %9.6lf\n",
			x, s, y, fabs(s - y));
	}
}

