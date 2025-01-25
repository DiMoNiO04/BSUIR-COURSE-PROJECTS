#include<iostream>
#include<string>

using namespace std;


struct Tree {
	int key;
	string surname;
	Tree* left, * right;
} *root;

enum mainMenu {
	EXIT,
	CREATE,
	ADD,
	VIEW,
	DELETE_FOR_KEY,
	FIND,
	COUNT_SYMBOLS,
	DELETE_TREE
};

enum mainViewMenu {
	EXIT_FROM_VIEW,
	DIRECT_BYPASS,
	REVERSE_BYPASS,
	ASCENDING_KEY,
	TREE_VIEW
};

enum mainTaskMenu {
	DIRECT_TASK=1,
	REVERSE_TASK,
	ASCENDING_TASK
};

void mainMenu();
void mainViewMenu();
void createTree(int number, string surname);
void addInTree(int number, string surname);
void DirectView(Tree* root);
void ReverseView(Tree* root);
void AscendingOrderView(Tree* root);
void View_Tree(Tree* p, int level);
void view();
void Del_Tree(Tree* t);
void findForKey(int number);
void DirectViewTask(Tree* root);
void ReverseViewTask(Tree* root);
void AscendingOrderViewTask(Tree* root);
void individualTask();


int main() {
	setlocale(LC_ALL, "RUS");
	string surname;
	int mainChoice, number=0;

	while (true) {
		system("pause");
		system("cls");
		mainMenu();
		cin >> mainChoice;

		switch (mainChoice) {
		case CREATE: {
			createTree(number, surname);
			break;
		}
		case ADD: {
			addInTree(number, surname);
			break;
		}
		case VIEW: {
			view();
			break;
		}
		case DELETE_FOR_KEY: {

			if (!root) {
				cout << " Создайте дерево !\n";
				break;
			}
			cout << "Введите ключ который нужно удалить: "; cin >> number;
			Tree* Del, * Prev_Del, * R, * Prev_R;
			Del = root;
			Prev_Del = NULL;
			while (Del != NULL && Del->key != number) {
				Prev_Del = Del;
				if (Del->key > number) {
					Del = Del->left;
				}
				else {
					Del = Del->right;
				}
			}
			if (Del == NULL) { // Элемент не найден
				cout << "Ключ не найден!\n";
				break;
			}
			//-------------------- Поиск элемента R для замены --------------------------------
			if (Del->right == NULL) {
				R = Del->left;
			}
			else {
				if (Del->left == NULL) {
					R = Del->right;
				}
				else {
					//---------------- Ищем самый правый узел в левом поддереве -----------------
					Prev_R = Del;
					R = Del->left;
					while (R->right != NULL) {
						Prev_R = R;
						R = R->right;
					}
					//----------- Нашли элемент для замены R и его предка Prev_R -------------
					if (Prev_R == Del) {
						R->right = Del->right;
					}
					else {
						R->right = Del->right;
						Prev_R->right = R->left;
						R->left = Prev_R;
					}
				}
			}
			if (Del == root) {
				root = R; // Удаляя корень, заменяем его на R
			}
			else {
				//------- Поддерево R присоединяем к предку удаляемого узла -----------
				if (Del->key < Prev_Del->key) {
					Prev_Del->left = R; // На левую ветвь
				}
				else {
					Prev_Del->right = R; // На правую ветвь
				}
			}
			delete Del;
			cout << "Ключ удален!\n";
			break;
		}
		case FIND: {
			findForKey(number);
			break;
		}
		case COUNT_SYMBOLS: {
			individualTask();
			break;
		}
		case DELETE_TREE: {
			Del_Tree(root);
			cout << "Дерево удалено!\n";
			root = NULL;
			break;
		}
		case EXIT: {
			if (root != NULL) {
				Del_Tree(root);
			}
			return 0;
		}
		}
	}
}

void mainMenu() {
	cout << "1. Создать дерево\n"
		<< "2. Добавить\n"
		<< "3. Просмотр\n"
		<< "4. Удаление по ключу\n"
		<< "5. Поиск по ключу\n"
		<< "6. Количество символов во всех стороках дерева\n"
		<< "7. Очитить дерево\n"
		<< "0. Выход из программы\n"
		<< "<< ";
}

void mainViewMenu() {
	cout << "В каком порядке вывести данные ?\n"
		<< "1. Прямым обходом\n"
		<< "2. Обратным обходом\n"
		<< "3. Впорядке возрастания ключа\n"
		<< "4. Просмотр в виде дерева\n"
		<< "<< ";
}

void createTree(int number, string surname) {

	cout << "Создаем корень дерева:\n";
	cout << "Введите ключ корня << "; cin >> number;
	cout << "Введите фамилию << "; cin >> surname;
	Tree* t = new Tree;
	t->key = number;
	t->surname = surname;
	t->left = t->right = NULL;
	root = t;
}

void addInTree(int number, string surname) {

	if (root == NULL) {
		cout << "Создайте сначала корень дерева\n";
	}
	else {
		cout << "Введите ключ << "; cin >> number;
		cout << "Введите фамилию << "; cin >> surname;

		Tree* prev, * t;
		bool find = true;
		t = root;
		prev = t;

		while (t && find) {
			prev = t;
			if (number == t->key) {
				find = false;
				cout << "Ключ уже используется в программу. Ключ должен быть уникален!";
			}
			else {
				if (number < t->key) {
					t = t->left;
				}
				else {
					t = t->right;
				}
			}
		}

		if (find) {
			Tree* t = new Tree;
			t->key = number;
			t->surname = surname;
			t->left = t->right = NULL;
			if (number < prev->key) {
				prev->left = t;
			}
			else {
				prev->right = t;
			}
		}
	}
}

void DirectView(Tree* root) {

	if (root) {
		cout << "Ключ: " << root->key << " ФИО: " << root->surname << endl;
		DirectView(root->left);
		DirectView(root->right);
	}
}

void ReverseView(Tree* root) {

	if (root) {
		ReverseView(root->left);
		ReverseView(root->right);
		cout << "Ключ: " << root->key << " ФИО: " << root->surname << endl;
	}
}

void AscendingOrderView(Tree* root) {

	if (root) {
		AscendingOrderView(root->left);
		cout << "Ключ: " << root->key << " ФИЛ: " << root->surname << endl;
		AscendingOrderView(root->right);
	}
}

void View_Tree(Tree* p, int level) {

	string str;
	if (p) {
		View_Tree(p->right, level + 1);
		for (int i = 0; i < level; i++) {
			str = str + "  ";
		}
		cout << str << p->key << "-" << p->surname << endl;
		View_Tree(p->left, level + 1);
	}
}

void view() {

	if (root == NULL) {
		cout << "Создайте дерево!";
	}
	else {
		int choiceView;
		mainViewMenu();
		cin >> choiceView;

		switch (choiceView) {
		case DIRECT_BYPASS: {
			DirectView(root);
			break;
		}
		case REVERSE_BYPASS: {
			ReverseView(root);
			break;
		}
		case ASCENDING_KEY: {
			AscendingOrderView(root);
			break;
		}
		case TREE_VIEW: {
			View_Tree(root, 0);
			break;
		}
		case EXIT_FROM_VIEW: {
			break;
		}
		}
	}
}

void Del_Tree(Tree* t) {

	if (t != NULL) {
		Del_Tree(t->left);
		Del_Tree(t->right);
		delete t;
	}
}

void findForKey(int number) {

	if (!root) {
		cout << "Создайте дерево!\n";
	}
	cout << "Введите ключ, который хотите найти << "; cin >> number;
	Tree* t = root;

	while (root != NULL) {
		if (root->key == number) {
			cout << "Результат поиска: " << "Ключ: " << root->key << "   ФИО: " << root->surname << endl;
			break;
		}
		else {
			if (number < root->key) {
				root = root->left;
			}
			else {
				root = root->right;
			}
		}
	}
	if (root == NULL) {
		cout << "Значение не найдено" << endl;
	}
	root = t;
}

void DirectViewTask(Tree* root){
	if (root) {
		cout << "Ключ: " << root->key << "   ---> " << root->surname.length() <<endl;
		DirectViewTask(root->left); // Правое поддерево
		DirectViewTask(root->right); // Левое поддерево
	}
}

void ReverseViewTask(Tree* root){
	if (root)
	{
		ReverseViewTask(root->left); // Правое поддерево
		ReverseViewTask(root->right); // Левое поддерево
		cout << "Ключ: " << root->key << "   ---> " << root->surname.length() << endl;
	}
}

void AscendingOrderViewTask(Tree* root){
	if (root) {
		AscendingOrderViewTask(root->left); // Левое поддерево
		cout << "Ключ: " << root->key << "   ---> " << root->surname.length() << endl;
		AscendingOrderViewTask(root->right); // Правое поддерево
	}
}

void individualTask() {

	if (root == NULL) {
		cout << " Создайте дерево !";
	}
	else {
		int choiceCount = 0;
		cout << "В каком порядке выводить количество символов в строках дерева:\n 1. Прямым обходом\n2. Обратным обходом\n3. В порядке возрастания ключа\n<< "; cin >> choiceCount;
		switch (choiceCount) {
		case DIRECT_TASK: {
			DirectViewTask(root);
			break;
		}
		case REVERSE_TASK: {
			ReverseViewTask(root);
			break;
		}
		case ASCENDING_TASK: {
			AscendingOrderViewTask(root);
			break;
		}
		}
	}
}



