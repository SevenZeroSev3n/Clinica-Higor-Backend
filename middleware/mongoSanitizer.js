// backend/middleware/mongoSanitizer.js
// Implementação customizada para evitar o conflito com req.query

const sanitize = (obj) => {
    if (obj && typeof obj === 'object') {
        for (const key in obj) {
            if (key.includes('$')) {
                // Remove chaves que contenham $ (operadores de MongoDB)
                delete obj[key]; 
            } else {
                // Sanitiza recursivamente
                obj[key] = sanitize(obj[key]);
            }
        }
    }
    return obj;
};

const mongoSanitizer = (req, res, next) => {
    if (req.body) {
        req.body = sanitize(req.body);
    }
    // Ignoramos req.query, req.params e req.headers, resolvendo o erro de compatibilidade
    next();
};

module.exports = mongoSanitizer;