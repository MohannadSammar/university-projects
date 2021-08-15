namespace java com.rpc

struct Package {
    1: list<string> Messeges = 0,
    2: i32 Lastint = 1,
}
service History {
    Package getHistory(1:i32 Start),
}