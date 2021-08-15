#ifndef FIELD_H
#define FIELD_H
#include <iostream>
#include <vector>
#include <unistd.h>
#include <fstream>
#include <string>
using namespace std;

class Field
{
private:
    char** Game;
    unsigned long long  colums,rows;
    string gameasstring;
public:
    Field(const unsigned long long  rows, const unsigned long long  colums);
    Field(string &s);
    Field(unsigned long long  rows, unsigned long long  colums, char** game); // second constructor for when u want to load a Game
    void Print();
    bool   operator ==   (Field &f);
    bool   operator !=   (Field &f);
    Field& operator |    (Field &f);
    Field& operator |=   (Field f );
    string stringame();
    string stringgeter();
    char** getGame();
    void setGame(char** game);
    unsigned long long  getRows();
    unsigned long long getColums();
    friend ostream& operator << (ostream &s, Field *f);
     ~Field();
};


   ostream& operator << (ostream& s, Field* f );


#endif // FIELD_H
