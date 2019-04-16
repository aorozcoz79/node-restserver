// ===================================
//  PUERTO 
// ===================================

process.env.PORT = process.env.PORT || 3000

// ===================================
//  ENTORNO 
// ===================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// ===================================
//  VENCIMIENTO DEL TOKEN 
// ===================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

// ===================================
//  SEED 
// ===================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

// ===================================
//  CONEXION A BD
// ===================================

let urlDB

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB

// ===================================
//  GOOGLE CLIENT ID
// ===================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '701053667746-mr0qm7i60dk15ni7e6vdqja3ker6vknv.apps.googleusercontent.com'