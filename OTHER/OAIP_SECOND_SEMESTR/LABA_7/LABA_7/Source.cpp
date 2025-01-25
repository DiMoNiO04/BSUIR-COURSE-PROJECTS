#include <iostream>
#include <conio.h>
#include <math.h> 

using namespace std;

double f(double x){
    return x * x - 9;
   // return sqrt(x) - pow(cos(x), 2) - 2;
}

double MP(double x0, double x2, double e){
    double x1, f0, f1, f2, z0, z1, r, d, p, q, D, zm0, zm1, zm2, zm, x;
    x1 = (x0 + x2) / 2;
    f0 = f(x0);    f1 = f(x1);    f2 = f(x2);
    do{
        z0 = x0 - x2;
        z1 = x1 - x2;
        r = f2;
        d = z0 * z1 * (z0 - z1);
        p = ((f0 - f2) * z1 - (f1 - f2) * z0) / d;
        q = -((f0 - f2) * (z1 * z1) - (f1 - f2) * (z0 * z0)) / d;
        D = sqrt(q * q - 4 * p * r);
        zm0 = (-q + D) / (2 * p);
        zm1 = (-q - D) / (2 * p);
        if (fabs(zm0) < fabs(zm1)) {
            zm = zm0;
        }
        else {
            zm = zm1;
        }
        x = x2 + zm;
        if (fabs(x - x1) < e) {
            break;
        }
        if (x < x1){
            x2 = x1;   f2 = f1;
        }
        else { 
            x0 = x1;   f0 = f1; 
        }
        x1 = x; f1 = f(x);
    } 
    while (true);
    return x;
}

int main()
{
    setlocale(LC_ALL, "ru");
    double a, b, h, x, eps;
    int n = 0;
    cout << "¬ведите левую границу интервала а = "; cin >> a;
    cout << "¬ведите правую границу интервала b = "; cin >> b;
    cout << "¬ведите шаг поиска h = "; cin >> h;
    cout << "¬ведите точность eps = "; cin >> eps;
    for (x = a; x <= b; x += h) {
        if (f(x) * f(x + h) < 0) {
            n++;
            cout << n << "-ый корень = " << MP(x, x + h, eps) << endl;
        }
    }
}