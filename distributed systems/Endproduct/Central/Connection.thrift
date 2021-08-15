namespace java com.rpc

struct Package {
    1: list<string> Messeges = 0,
    2: i32 Lastint = 1,
}

service SensorConnection {
    string SendSensorData(1:string Data),
    Package getLostData(1:i32 Start),
}