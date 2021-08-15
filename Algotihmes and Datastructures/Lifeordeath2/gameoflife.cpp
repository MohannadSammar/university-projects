#include "gameoflife.h"


GameOfLife::GameOfLife(){
//    string s="glider4snark.txt", snarkfile="snark.txt", snarklinggliderfiled ="snarknglider.txt";

//    Field snark (snarkfile);
//    Field glider(s);
//    Field expected(snarklinggliderfiled);


//    Field result = snark | glider;


//    if (result == expected){

//        cout << "yay" << endl;

//}

//    snark |= glider;
//    if (snark != expected){

//        cout << "boo" << endl;
//    }

//    Field *p = new Field(snarkfile);
//    Field *p2= new Field(s);
//    Field *p3=  &result;
//    Field *p4= &snark;
//    Field *p5 = new Field(snarklinggliderfiled);

//    fields.push_back(p); //snark
//    fields.push_back(p2); //glider
//    fields.push_back(p3); //result
//    fields.push_back(p4); //snark after |=
//    fields.push_back(p5); //expected
    menu();

}

void GameOfLife:: menu(){
    int choice;
    cout<< "[1] to create field\n " << "[2] to print field\n " <<"[3] Run simulation\n " << "[4] Save\n " <<"[5] Load \n" << "[0] Exit ";
    cin>> choice;
    switch (choice) {

    case 1 :CreateField() ; break;
    case 2 :print() ; break;
    case 3:Runsimulation(); break;
    case 4:Save(); break;
    case 5:Load(); break;
    case 0:Exit(); break;
    }




}

void GameOfLife:: Exit(){

    for(unsigned int i=0;i<fields.size();i++){
        fields.at(i)->~Field();

    }
    cout << "~Thanks for playing~" << endl;

}

void GameOfLife:: Save(){
    unsigned long long choice;
    ofstream saveFile;
    system("CLS");
    cout <<"Which field would like to save?";
    cin >> choice;
    saveFile.open("lifeordeath.txt");
    saveFile  << fields.at(choice-1)->getRows() << "x" << fields.at(choice-1)->getColums() << " @ 0,0" << endl;
    saveFile  << fields.at(choice-1) << endl;

    cout << "Filed saved succesfully!" << endl;
    menu();


}
void GameOfLife:: Load(){
    string line;
    string substring;
    char glider;
    unsigned long long temprows = 0,tempcolums = 0, atbegining =0, atend = 0;
    unsigned int rows = 0;
    ifstream savefile("lifeordeath.txt");
    ifstream gliderfile("Glider.txt");
    ofstream Glider;
    cout <<"open glider?[Y/N]" ;
    cin >> glider;
    if(glider == 'y'){
        if(gliderfile.is_open() && (glider =='Y' || glider == 'y') )  {
            getline(gliderfile, line);
            int found;

            for(int i=0;i<line.length();i++)
            {
                if(line[i]=='x'){
                    string rows= line.substr(0,i);
                    temprows = stoi(rows);
                    string tmp = "@";
                    found = line.find(tmp);
                    string colums = line.substr(i+1,found-1);
                    tempcolums = stoi(colums);
                    break;
                }

            }
                      simulation = new char*[temprows];
              for(unsigned long long  i=0;i<temprows;i++ ){
                     simulation[i] = new char[tempcolums];
              }
                    while ( getline (gliderfile,line) )
            {
                        if(rows < temprows){
              for(unsigned int i=0;i<tempcolums;i++ ){
                  if(atbegining == i )
                  {

                  }
                 simulation[rows][i]=line[i];


            }
                        }
              rows++;


          }
                    gliderfile.close();
    }
    }else{
    if(savefile.is_open())  {
        getline(savefile, line);
                    int found;
        for(unsigned long long i=0;i<line.length();i++)
        {
            if(line[i]=='x'){
                string rows= line.substr(0,i);
                temprows = stoi(rows);
                string tmp = "@";
                found = line.find(tmp);
                string colums = line.substr(i+1,found-1);
                tempcolums = stoi(colums);
                break;
            }
        }

                  simulation = new char*[temprows];
          for(unsigned long long  i=0;i<temprows;i++ ){
                 simulation[i] = new char[tempcolums];
          }
                while ( getline (savefile,line) )
        {
                    if(rows < temprows){
          for(unsigned int i=0;i<tempcolums;i++ ){
             simulation[rows][i]=line[i];


        }
                    }
          rows++;


      }
                savefile.close();
}
    }




    Field* p = new Field(temprows,tempcolums,simulation);
    fields.push_back(p);
    system("CLS");
    cout<<"Load saved succesfully!" << endl;
    menu();
}

void GameOfLife:: print(){
    unsigned long long choice;
    cout<< " which Original field u would like printed?" << endl;
    cin >> choice;
    system("cls");
    cout << fields[choice-1];
    menu();

}
void GameOfLife:: CreateField(){
    unsigned long long  rows,colums;
    cout << "please write in the nummber of row "<<endl;
    cin >> rows;
    cout << "please write the number of colums"<<endl;
    cin >> colums;
    Field* p = new Field(rows, colums);
    fields.push_back(p);
    menu();

}

char GameOfLife:: AliveOrDead(const unsigned int life,const char word ){ //decision for what happens to the cell
    char p='.';
    if(word=='.'&& life == 3){
        p='X';
        return p;

    }

    if(word=='X'){
        if(life<2||life>3){
            p='.';
            return p;
        }else{
        if(life==2 || life ==3){
            return word;

        }

    }
    }
    return p;
}


char** GameOfLife::Rules(char** instant,unsigned long long fieldNum,char** simulation){ //goes through the array and checks each cell and its surounding and adds up a sum for how many alive cell around it is.
    unsigned int lifeordie;

    for(unsigned long long i=0; i<fields[fieldNum-1]->getRows();i++ ){
        for(unsigned long long j=0;j<fields[fieldNum-1]->getColums();j++){
            lifeordie = 0;

            if((i==0 && j==0))  //top left corner
            {
                if(instant[i][j+1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i+1][j]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i+1][j+1]=='.'){

                }else{
                    lifeordie++;
                }

                simulation[i][j] = AliveOrDead(lifeordie,instant[i][j]);
            }
            if(i==0 && j==fields.at(fieldNum-1)->getColums()-1){ //top right corner
                if(instant[i][j-1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i+1][j]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i+1][j-1]=='.'){

                }else{
                    lifeordie++;
                }
                simulation[i][j] = AliveOrDead(lifeordie,instant[i][j]);
            }

            if(i==fields.at(fieldNum-1)->getRows()-1 && j==0 ){ //bottom left
                if(instant[i][j+1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i-1][j]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i-1][j+1]=='.'){

                }else{
                    lifeordie++;
                }
                simulation[i][j] = AliveOrDead(lifeordie,instant[i][j]);
            }
            if(i==fields.at(fieldNum-1)->getRows()-1 && j==fields.at(fieldNum-1)->getColums()-1){// bottom right
                if(instant[i][j-1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i-1][j]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i-1][j-1]=='.'){

                }else{
                    lifeordie++;
                }
                simulation[i][j] = AliveOrDead(lifeordie,instant[i][j]);

            }

            if(i==0&& j>0&&j < fields.at(fieldNum-1)->getColums()-1){ //first row.
                if(instant[i][j-1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i][j+1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i+1][j-1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i+1][j]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i+1][j+1]=='.'){

                }else{
                    lifeordie++;
                }

                simulation[i][j] = AliveOrDead(lifeordie,instant[i][j]);

            }
            if(i>0&&j==0&&i < fields.at(fieldNum-1)->getRows()-1 ){//first colum
                if(instant[i-1][j]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i-1][j+1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i][j+1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i+1][j+1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i+1][j]=='.'){

                }else{
                    lifeordie++;
                }
                simulation[i][j] = AliveOrDead(lifeordie,instant[i][j]);
            }
            if(i>0&&j==fields.at(fieldNum-1)->getColums()-1&&i < fields.at(fieldNum-1)->getRows()-1 ){//last colum
                if(instant[i-1][j-1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i-1][j]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i][j-1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i+1][j-1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i+1][j]=='.'){

                }else{
                    lifeordie++;
                }
                simulation[i][j] = AliveOrDead(lifeordie,instant[i][j]);
            }
            if(i==fields.at(fieldNum-1)->getRows()-1&&j>0&&j < fields.at(fieldNum-1)->getColums()-1){ //LAST row.
                if(instant[i][j-1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i-1][j-1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i-1][j]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i-1][j+1]=='.'){

                }else{
                    lifeordie++;
                }
                if(instant[i][j+1]=='.'){

                }else{
                    lifeordie++;
                }

                simulation[i][j] = AliveOrDead(lifeordie,instant[i][j]);

        }
            if(i>0 && j>0 && i < fields.at(fieldNum-1)->getRows()-1 && j < fields.at(fieldNum-1)->getColums()-1){ //middle
                if(instant[i-1][j-1]=='.'){

                }else if(instant[i-1][j-1]=='X') {
                    lifeordie++;
                }
                if(instant[i-1][j]=='.'){

                }else if(instant[i-1][j]=='X'){
                    lifeordie++;
                }
                if(instant[i-1][j+1]=='.'){

                }else if(instant[i-1][j+1]=='X'){
                    lifeordie++;
                }
                if(instant[i][j-1]=='.'){

                }else if(instant[i][j-1]=='X'){
                    lifeordie++;
                }
                if(instant[i][j+1]=='.'){

                }else if(instant[i][j+1]=='X'){
                    lifeordie++;
                }
                if(instant[i+1][j-1]=='.'){

                }else if(instant[i+1][j-1]=='X'){
                    lifeordie++;
                }
                if(instant[i+1][j]=='.'){

                }else if(instant[i+1][j]=='X'){
                    lifeordie++;
                }
                if(instant[i+1][j+1]=='.'){

                }else if(instant[i+1][j+1]=='X'){
                    lifeordie++;
                }
                 simulation[i][j] = AliveOrDead(lifeordie,instant[i][j]);
            }

        }


}
    return simulation;
}

void GameOfLife:: Runsimulation(){ //main function to run the simulation of game of life
    bool repeat = true;
    unsigned long long choice;
    char skip;

    system("cls");
    cout <<" please choose what field to simulate ";
    cin >> choice;
    cout << "\n Skip till a cycle?[Y/N]";
    cin >> skip;
    simulation = new char*[fields.at(choice-1)->getColums()];

    for(unsigned long long  i=0;i<fields.at(choice-1)->getRows();i++ ){
           simulation[i] = new char[fields.at(choice-1)->getColums()];
    }
    cout << fields[choice-1];
    genNum = 1;
    generations.clear();
    generations.push_back(generationConverter( fields.at(choice-1)->getGame(),choice));
    while (repeat){ // main loop
               fields.at(choice-1)->setGame(Rules(fields[choice-1]->getGame(),choice,simulation)); //call function rules to "run" the simulation
               if(CheckPreviousGenerations(simulation,choice)== true){
               generations.push_back(generationConverter( simulation,choice));
               usleep(500);
             if(skip=='N' || skip == 'n'){

                       system("cls");
               cout<< genNum<< endl;
                       cout << fields[choice-1];

                       genNum++;

}else{
            genNum++;

             }
               }else{
                   system("cls");
         cout << "\n" << genNum << "Has repeated it self" << endl;
         cout << fields[choice-1] << endl;
         repeat = false;

         menu();
 }
    }


        }




string GameOfLife::generationConverter(char **changable,unsigned long long choice){
    string thestring;
        for(unsigned int i = 0; i<fields.at(choice-1)->getRows(); i++ ){
            for(unsigned int j = 0; j<fields.at(choice-1)->getColums(); j++ ){
                thestring += changable[i][j];
            }
        }
        return thestring;
}

bool GameOfLife::CheckPreviousGenerations(char **currentGen,unsigned long long choice){
    string oldGenerations, current;

    if(generations.size() >= 1){
    for(unsigned int i = 0;i < fields.at(choice-1)->getRows(); i++){
        for(unsigned int j = 0;j < fields.at(choice-1)->getColums(); j++){

        current += (currentGen[i][j]);
    }}

    //    for(it = generations.begin(); it != generations.end(); it++){


    for(unsigned int i = 0; i < generations.size(); i++){

        oldGenerations="";

//        for(unsigned int f = 0; f < fields.at(choice-1)->getRows(); f++){
//            for(unsigned int j = 0;j < fields.at(choice-1)->getColums(); j++){

            oldGenerations = generations.at(i);

//        }}
       if(current.compare(oldGenerations) ==0 ){
        return false; //its similair to a previous one
       }
    }
    }
    return  true; // its not similair to a previous one
}




