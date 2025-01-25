#include<iostream>
#include<math.h>
using namespace std;

int main(int argc, char* argv[])
{
    double x, y, z, m, q, w;
    cout << "x="; cin >> x;
    cout << "y="; cin >> y;
    cout << "z="; cin >> z;
    if (x + y + z > x * z * y) q = x + y + z;
    else q = x * z * y;
    if (x + y + z < x * y * z) w = x + y + z;
    else w = x * z * y;
    m = q / w;
    if (x / x == 1 && y / y == 1 && z / z == 1 && w!=0) {
            cout << "result = " << m << endl;
            system("pause");
            return 0;
    }
    else
        cout << "error";
}