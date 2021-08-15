#ifndef GAMEOFLIFE_H
#define GAMEOFLIFE_H
#include "field.h"
#include <chrono>
#include <thread>
#include <fstream>
#include <string>
#include <unistd.h>
#include <list>
#include <deque>
#include <iterator>
class GameOfLife
{
private:
        vector <Field*> fields;
        char** simulation; //Secondaru Array that works to copy the the cells
        deque <string> generations;
        unsigned int genNum = 1;
public:

    void menu();
    GameOfLife();
    void Exit();
    void Save();
    void Load();
    void print();
    void CreateField();
    bool CheckPreviousGenerations(char** currentGen,unsigned long long choice);
    char AliveOrDead(unsigned int life,char word ); //checks if the cell should live or die or be born
    string generationConverter(char** changable,unsigned long long choice);
    char** Rules(char** instant,unsigned long long fieldNum,char** simulation); //goes through the array and checks each cell and its surounding and adds up a sum for how many alive cell around it is.
    void Runsimulation();
    int simulationforprak4(Field *f);

};

#endif // GAMEOFLIFE_H
