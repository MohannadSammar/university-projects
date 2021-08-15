#include<iostream>

#include "avltree.h"
#include "test.h"
#include "benchmark.h"

using namespace std;

void menu(AVLTree avl)
{
    char c;
    int key;
    string value;
//    bigInsertionTest(avl);
//    removeTest(avl);
//    findTest(avl);
    while (true) {
        cout << "1. Insert Element" << endl;
        cout << "2. Show Balanced AVL Tree" << endl;
        cout << "3. Traverse in-order" << endl;
        cout << "4. Traverse pre-order" << endl;
        cout << "5. Traverse post-order" << endl;
        cout << "7. remove" << endl;
        cout << "8. Check if memebr" << endl;
        cout << "9. Find and replace "<< endl;
        cout << "6. Exit" << endl;
        cout << "Enter your Choice: ";
        cin >> c;
        switch (c) {
        case '1':
            cout << "Enter key to be inserted (int): ";
            cin >> key;
            cout << "Enter value to be inserted (string): ";
            cin >> value;
            avl.probe(key, value);
            break;
        case '2':
            if (avl.empty()) {
                cout << "Tree is Empty" << endl;
                continue;
            }
            cout << "Balanced AVL Tree:" << endl;
            avl.show();
            cout<<endl;
            break;
        case '3':
            cout << "Inorder Traversal:" << endl;
            avl.inorder();
            cout << endl;
            break;
        case '4':
            cout << "Preorder Traversal:" << endl;
            avl.preorder();
            cout << endl;
            break;
        case '5':
            cout << "Postorder Traversal:" << endl;
            avl.postorder();
            cout << endl;
            break;
        case '6':
            return;
        case '7':
            cout << "Enter key to be deleted (int): ";
            cin >> key;

            avl.remove(key);
            break;
        case '8':
            cout << "enter key to check ";
            cin >> key;
           if(avl.member(key)==false){
           cout << "is not a member" << endl;

           }else{
           cout << "is a memember" << endl;
           }
            break;
        case '9' :
            cout << "enter key" ;
            cin >> key;
            cout << "enter value";
            cin >> value;
            avl.set(key,value);
            break;
        default:
            cout << "Not understood. Enter a number between 1 and 6." << endl;
        }
    }
}

int main() {

    AVLTree avl;

    bigInsertionTest(avl);
//    removeTest(avl);
//    findTest(avl);

//    benchmark();
//    return 0;

    menu(avl);
    return 0;
}
