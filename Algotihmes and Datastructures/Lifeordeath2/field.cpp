#include "field.h"

Field::Field(const unsigned long long  rows, const unsigned long long  colums ){
    this->colums =colums;
    this->rows=rows;
    Game = new char* [rows];

    for(unsigned long long  i=0;i<rows;i++ ){
           Game[i] = new char[colums];
    }

    for(unsigned long long  i=0;i<rows;i++){
        for(unsigned long long  j=0;j<colums;j++){
            int random = rand()%3;
            if(random==0){
                Game[i][j] ='X';
            }else{
                Game[i][j] = '.';
            }


        }
    }
}

Field::Field(unsigned long long  rows, unsigned long long  colums, char** game){
    this->rows=rows;
    this->colums=colums;
    Game = new char* [rows];

    for(unsigned long long  i=0;i<rows;i++ ){
           Game[i] = new char[colums];
    }

    for(unsigned long long  i=0;i<rows;i++){
        for(unsigned long long  j=0;j<colums;j++){
            Game[i][j] = game[i][j];
        }
        }
}

Field::Field(string &f){ //Field constructor that takes a file reference and "auto loads" the file with that string name
    string line,substring;
    unsigned long long temprows = 0,tempcolums = 0, counter=0,inputbegin = 0, inputend= 0;
    ifstream s(f);
    ofstream thefield;
    if(s.is_open()){
        getline(s,line);
        int found;

        for(int i=0;i<line.length();i++)
        {
            if(line[i]=='x'){
                string rows= line.substr(0,i);
                temprows = stoi(rows);
                string tmp = "@";
                found = line.find(tmp);
                string colums = line.substr(i+1,found-2);
                tempcolums = stoi(colums);
                break;
            }

        }

        string tmp = ",";
        int pointpos = line.find(tmp);
        string begin = line.substr(found+2,pointpos-(found+2));
        string end = line.substr(pointpos+1,line.length()-1);
        inputend = stoi(end);
        inputbegin = stoi(begin);

          this->rows = temprows;
          this->colums = tempcolums;
          Game = new char* [temprows];
          for(unsigned long long  i=0;i<temprows;i++ ){
                 Game[i] = new char[tempcolums];
          }
          if(inputend == 0 && inputbegin == 0  ){
          while (getline (s,line))
          {

              if(counter < temprows){


                        for(unsigned long long  j=0;j<tempcolums;j++){
                            if(line[j] != '.'){

                            Game[counter][j]='X';

                            }else{
                                Game[counter][j] ='.';
                            }
                        }
              }

               counter++;

              }
          }else{

                            while(counter < temprows){
                                if(counter == inputend){
                                    while(getline (s,line)){
                                        unsigned long long inputpos = 0;
                                    for(inputpos = 0;inputpos < inputbegin ; inputpos++){
                                        Game[counter][inputpos] = '.';

                                    }
                                    for(unsigned long long j =0; j<line.length();j++ ){
                                        if(line[j] != '.'){
                                        Game[counter][inputpos] = 'X';
                                        inputpos++;
                                        }else{
                                            Game[counter][inputpos] = '.';
                                            inputpos++;
                                        }
                                    }
                                    while(inputpos <= tempcolums ){
                                        Game[counter][inputpos] = '.';
                                        inputpos++;
                                    }
                                    counter++;

                                }
                                }
                                for(unsigned long long  j=0;j<tempcolums;j++){
                                        Game[counter][j] ='.';



                                }





                              counter++;
                            }
          }


          }


        gameasstring = stringame();
}

void Field::Print(){
            for(unsigned long long  i=0;i<rows;i++){
                for(unsigned long long  j=0;j<colums;j++){
                    cout << Game[i][j] ;
                }
                cout<< endl;
            }
}

void Field:: setGame(char** game){
    for(unsigned long long  i=0;i<rows;i++){
        for(unsigned long long  j=0;j<colums;j++){
            this->Game[i][j] = game[i][j];
//        this->Game=game;
        }
    }
}

unsigned long long Field:: getRows(){
    return rows;
}

unsigned long long Field:: getColums(){
    return colums;
}

Field::~Field(){
    delete[] Game;
}

char** Field:: getGame(){
    return Game;
}

string Field::stringame(){
    string s= "";
    for(unsigned long long  i=0;i<rows;i++){
        for(unsigned long long  j=0;j<colums;j++){
            s= s + Game[i][j];


        }
        }
    return s;
}

string Field::stringgeter(){
    return gameasstring;
}

Field& Field::operator |= (Field f ){// like |  but does changes to Filed immediatly
    for(unsigned long long  i=0;i<f.getRows();i++){
        for(unsigned long long  j=0;j<f.getColums();j++){
            if(f.getGame()[i][j] == '.' && this->Game[i][j] == '.'){
                this->Game[i][j] = '.';
            }else{
                this->Game[i][j] = 'X';
            }
        }
        }

    return *this;

}

bool Field::operator==(Field& f){//compares the colums rows and fields of 2 Field objects and returns true if they are ALL the same
    if(f.getRows() == rows && f.getColums() == colums && f.stringgeter() == stringgeter() ){
        return  true;
    }return  false;


}

bool Field::operator!=(Field &f){ // like == just differnet returns lol
    if(f.getRows() == rows && f.getColums() == colums && f.stringgeter()== stringgeter() ){
        return  false;
    }return  true;


}

Field& Field::operator | (Field &f){// compares the the fields in an OR format,results are "saved" in a new Filed objects that gets returned
    Field* p= new Field(25,25);
    for(unsigned long long  i=0;i<rows;i++){
        for(unsigned long long  j=0;j<colums;j++){
            if(this->Game[i][j] == '.' && f.Game[i][j] == '.'){
                p->getGame()[i][j] = '.';
            }else{
                p->getGame()[i][j] = 'X';
            }
        }
        }
    return *p;
}


ostream& operator << (ostream& s,Field* f){ //goes through the Field and puts it in an output stream and returns it
    for(unsigned long long  i=0;i<f->getRows();i++){
        for(unsigned long long  j=0;j<f->getColums();j++){
            s << f->getGame()[i][j] ;
        }
       s<< endl;
    }
    return s;
}
