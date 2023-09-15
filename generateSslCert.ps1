# generate an ssl cert a .cnf cert definition found in the 
openssl req `
    -newkey rsa:2048 `
    -x509 `
    -nodes `
    -keyout ./ssl/server.key ` # replace with correct file path
    -new `
    -out ./ssl/server.crt ` # replace with correct file path
    -config ./ssl/certdef.cnf ` # replace with correct file path
    -sha256 `
    -days 365