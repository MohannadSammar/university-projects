/*
 * Author: S. Rapp (2020)
 *
 * This is based on the first google hit of "AVL in C++"
 * https://www.tutorialspoint.com/cplusplus-program-to-implement-avl-tree
 * by Karthikeya Boyini
 *
 * NOTE: It used to have a weird notion of right and left and partly some
 * 'C-ish old-style' that I fixed mostly. I also added a value field to make
 * it more interesting / useful. The root is now inside the AVLTree class
 * and not a global variable any more.
 */

#include <iostream>
#include <fstream>

#include "avltree.h"


using namespace std;

AVLTree::AVLTree()
    : root(nullptr)
{

}

void AVLTree::clear()
{
    if(clear(root))
    {
        //cout <<"\nTree deleted" << endl;
        root=nullptr;
    }
}
bool AVLTree::clear(Node* p)
{
    if (p == NULL)
    {
        return true;
    }
    clear(p->left);
    clear(p->right);
    //cout << "\n Deleting node: " << p->key;
    if(p==root)
    {
        root->left = nullptr;
        root->right=nullptr;
        return true;
    }
    delete p;
}
int AVLTree::height(Node* t) const
{

//if(t == nullptr){
//    return 1;
//}

//return max(height(t->left),height(t->right));


//}
    int h = 0;
    if(nullptr != t){
        int maxheight = max(height(t->left),height(t->right));
        h = maxheight +1;

    }
    return h;
}

//        int h = 0;
//    if (nullptr != t) {
//        int l_height = height(t->left);
//        int r_height = height(t->right);
//        int max_height = max(l_height, r_height);
//        h = max_height + 1;
//    }
//    return h; }


int AVLTree::difference(Node* t) const
{
//    if(t == nullptr){
//        return 1;
//    }
    int l_height = height(t->left);
    int r_height = height(t->right);
    return r_height - l_height;
    /*    return height(t->left) - height(t->right);*/
}

Node* AVLTree::left_rotation(Node* parent)
{
//    cout<<"Left Rotation on " << parent->key << endl;
    Node *t;
    t = parent->right;          // this will be our new root
    parent->right = t->left;    // hand over subtree
    t->left = parent;           // rotate parent down
    return t;                   // return new root
}

Node* AVLTree::right_rotation(Node* parent)
{
//    cout<<"Right Rotation on " << parent->key << endl;
    Node *t;
    t = parent->left;           // this will be our new root
    parent->left = t->right;    // hand over subtree
    t->right = parent;          // rotate parend down
    return t;                   // return new root
}

Node* AVLTree::rightLeft_rotation(Node* parent)
{
//    cout<<"Right-Left Rotation on " << parent->key << endl;
    parent->right = right_rotation(parent->right);  // right rotation on lower
    return left_rotation(parent);                   // and left rotation on upper
}

Node* AVLTree::leftRight_rotation(Node* parent)
{
//    cout<<"Left-Right Rotation on " << parent->key << endl;
    parent->left = left_rotation(parent->left);     // left rotation on lower
    return right_rotation(parent);                  // and right rotation on upper
}

Node* AVLTree::balance(Node* t)
{
    int d = difference(t);
    if (d < -1) {
        // trouble is in left side
        if (difference(t->left) < 0){
            // trouble is left-left, need to rotate right to balance.
            t = right_rotation(t);
        }else
            // trouble is left-right, need to rotate left-right to balance.
            t = leftRight_rotation(t);

    } else if (d > 1) {
        // trouble is in right side
        if (difference(t->right) > 0){
            // trouble is right-right, need to rotate left to balance.
            t = left_rotation(t);
        }else
            // trouble is right-left, need to rotate right-left to balance.
            t = rightLeft_rotation(t);

    }

    return t;
}

Node* AVLTree::insert(Node* p, int key, const string &value)
{
    if (p == nullptr) {
        // we can insert a new node
        p = new Node(key,value,nullptr,nullptr);
        return p;
    } else if (key< p->key) {
        p->left = insert(p->left, key, value);
        p = balance(p);
    } else if (key >= p->key) {
        p->right = insert(p->right, key, value);
        p = balance(p);
    } return p;
}

void AVLTree::show(Node* p, int l) const
{
    // tree is printed sideways. top line is right-most entry.
    // indentation according to level.
    int i;
    if (p != nullptr) {
        show(p->right, l + 1);
        for (i = 0; i < l; i++)
            cout << "    ";
        cout << p->key << endl;
        show(p->left, l + 1);
    }
}

void AVLTree::inorder(Node* t) const
{
    if (t == nullptr)
        return;
    inorder(t->left);
    cout << t->key << " " << t->value << endl;
    inorder(t->right);
}

void AVLTree::preorder(Node* t) const
{
    if (t == nullptr)
        return;
    cout << t->key << " " << t->value << endl;
    preorder(t->left);
    preorder(t->right);
}

void AVLTree::postorder(Node* t) const
{
    if (t == nullptr)
        return;
    postorder(t ->left);
    postorder(t ->right);
    cout << t->key << " " << t->value << endl;
}

// writeDot dumps the graph into a file that is usable with AT&T's Graphviz package
// see https://de.wikipedia.org/wiki/Graphviz
// and http://graphviz.org/download/
//
// NOTE: assumes that all keys are different.
// It kind of works with trees that have multiple nodes with the same key, but
// the image is wrong (as it then uses the same graphical node)
void AVLTree::writeDot(const string &filename) const
{
    ofstream fs(filename);
    fs << "digraph avl {" << endl;
    fs << "node [nodesep=0.8]" << endl;
    writeDot(fs, root);
    fs << "}" << endl;
}

void AVLTree::writeDot(ostream &fs, Node *p) const
{
    static int ctr=0; // counter for the faked null nodes

    if (nullptr==p) return;

    // recursively write out left subtree
    writeDot(fs, p->left);

    // write the current node
    // we will write also "white color" nullptrs as separate fake nodes
    // to be able to better differentiate 'only left' from 'only right'
    // nodes that would otherwise be rendered the same in dot's automatic layout.
    // To remove any ambiguity, we also color the non null childs
    // red or green (as in navigation lights used for ships and airplanes)
    if (p->left)
    {
        fs << "   " << p->key << " -> " << p->left->key << "[color=red]" << endl;
    }
    else
    {
        fs << "   " << p->key << " -> n" << ++ctr << "[color=white]" << endl;
        fs << "   n" << ctr << "[color=white, fontcolor=white]" << endl;
    }
    if (p->right)
    {
        fs << "   " << p->key << " -> " << p->right->key << "[color=darkgreen]" << endl;
    }
    else
    {
        fs << "   " << p->key << " -> n" << ++ctr << "[color=white]"  << endl;
        fs << "   n" << ctr << "[color=white, fontcolor=white]" << endl;
    }


    // recursively write out right subtree
    writeDot(fs, p->right);
    //separate nodes
    fs << endl;
}

void AVLTree::remove(int key){

    Node* tmp ;
    if(member(key) == true){
    tmp = remove(root,key);
    root = balance(tmp);
    }else{
//        cout << "key does not exsist" << endl;
    }

}

Node* AVLTree::remove(Node *&p, int key){
    if(key < p->key){
          remove(p->left,key);
     }
    if(key > p->key){
          remove(p->right,key);
     }

     if(key == p->key){
Node* tmp = nullptr;

                 if(p->left == nullptr || p->right == nullptr ){

                     if(p->left == nullptr && p->right != nullptr){ // right 1 child

                     tmp = p->right;
                     p = nullptr;
                     p = tmp;
                    return p;



                     }
                     if(p->left != nullptr && p->right == nullptr ){ //left  1 child
                                tmp = p->left;
                                p = nullptr;
                                p = tmp;
                                return p;



                             }
                     if (p->left == nullptr && p->right == nullptr){ // no child

                                p = nullptr;
                                root = balance(root);
                                return p;
                             }

}
                 if(p->left != nullptr && p->right != nullptr){ // 2 children
                    tmp = Biggest_left(p->left);

                    p->key = tmp->key;

                    p->value=tmp->value;

                    p->left = remove(p->left,tmp->key);

                 }


     return p = balance(p);


    }
     p = balance(p);

     return p;
}


Node* AVLTree::Biggest_left(Node *current){   // finds the biggest node of the left subtree with no children.
    if(current->right != nullptr){
        return Biggest_left(current->right);
    }
    if(current->right == nullptr){
        return current;
    }
    return current;

}

bool AVLTree::member(int key){
    return isitmemeber(root,key);
}

bool AVLTree::isitmemeber(Node *p, int key){

    if(p->key == key){
        cout << p->height << endl;

        return true;

    }
    if(p->key > key){
        if(p->left != nullptr){
        return isitmemeber(p->left,key);
    }else{
            return false;
        }
    }
    if(p->key < key){
        if(p->right != nullptr){
        return isitmemeber(p->right,key);
    }else{
            return false;
        }
    }
    if(p == root){
        return true;
    }
}

bool AVLTree::set(int key, string value){
    Node* tmp;
    tmp = fineAndReplace(root,key);
    if(tmp != nullptr){
//        tmp->value = value;
//        tmp->key = stoi(value);
//        checkifcorrect(tmp);
        remove(key);
        insert(root,key,tmp->value);
//        cout << key <<" got replaced by" << value << endl;
    }else{
//        cout << "Key does not excist!"<< endl;
    }

}

bool AVLTree::find(int key, string &value){
    Node* tmp = fineAndReplace(root,key);
    if (tmp==nullptr){
        return false;
    }else{
        value = tmp->value;
        return true;
    }

}

void AVLTree::checkifcorrect(Node *p){
    if(p->key < p->right->key){
        int tmp = p->key;
        p->key = p->right->key;
        p->right->key = tmp;

    }
}

Node* AVLTree::fineAndReplace(Node *&p, int key){
    if(p->key == key){
        return p;
    }
    if(p->key > key){
        if(p->left != nullptr){
        return fineAndReplace(p->left,key);
    }else{
            return nullptr;
        }
    }
    if(p->key < key){
        if(p->right != nullptr){
        return fineAndReplace(p->right,key);
    }else{
            return nullptr;
        }
    }

}


bool AVLTree::probe(int key, string value){
    Node* tmp;
    tmp = probeinsert(root,key,value);

    if (tmp == nullptr){
//        cout << "Member excists!" << endl;
        return false
    ;}else{


    root = balance(tmp);

    CalculateRotation(root);

        return true;
    }


}
Node* AVLTree::probeinsert(Node *p, int key, string value){
    Node* tmp;
    if(p==nullptr){

        p = new Node (key,value,nullptr,nullptr);
//       p->height = calculateNodeHeight(root,p->key);
//       p = balance(p);
//       cout <<p->height << endl;

        return p;
    }
    if(p->key == key){
        if(p->value == value){
        return nullptr;
        }else{
            tmp= probeinsert(p->right,key,value);
        }
//            p = balance(p);
    }
    if(p->key > key){
        tmp = probeinsert(p->left,key,value);
        if(tmp != nullptr){
        p->left = tmp;
        }

//    p = balance(p);
    }
    if(p->key < key){
        tmp = probeinsert(p->right,key,value);
        if(tmp!=nullptr){
            p->right=tmp;
        }

    }
    p = balance(p);
    return p;
}







//int AVLTree::calculateNodeHeight(Node *p, int key){
//    if (p == nullptr){
//        return 1;
//    }
//    if(p->key == key){
//        return 1;
//    }
//    if(p->key > key){
//        return calculateNodeHeight(p->left,key) +1;
//    }
//    if (p->key < key){
//        return calculateNodeHeight(p->right,key)+1;
//    }

//    return 0;
//}




int AVLTree::CalculateRotation(Node *p){
    if(p == root){
        p->height = max(CalculateRotation(p->right),CalculateRotation(p->left)) +1 ;
     }
    if(p == nullptr){
        return 0 ;
        }
    if(p  != nullptr){
//        p->left->height = p->height + 1 ;
//        CalculateRotation(p->left);
         p->height = max(CalculateRotation(p->right),CalculateRotation(p->left)) +1 ;
    }

    return p->height;

}
/*r

    if(isitmemeber(root,key) == false){
        insert(key,value);
        return  true;
    }else{
        cout <<"its already a memeber" << endl;
        return false;
    }



    root->height = 0;
    int h = 0;
    if(p->left == nullptr && p->right == nullptr){
        return h;
    }
    if(p->left!= nullptr){
        p->left->height = nodeHeight(p->left) +1  ;
        h = p->left->height;
    }else{
        p->height = h ;
        return h;
    }
    if(root->right != nullptr){
        p->right->height = nodeHeight(p->right) +1  ;
        h = p->right->height;
    }else{
        return h;
    }




*/


