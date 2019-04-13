// ===================================
//  PUERTO 
// ===================================

process.env.PORT = process.env.PORT || 33000

// ===================================
//  ENTORNO
// ===================================


process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// ===================================
//  ENTORNO
// ===================================

let urlDB

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://aorozcoz79:9Mu3i2h4sUve5Fee@cluster0-rrjtr.mongodb.net/cafe?retryWrites=true'
}

process.env.URLDB = urlDB