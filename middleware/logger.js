function requestLogger(req, res, next) {
  const start = Date.now();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;

  const originalEnd = res.end;
  res.end = function (...args) {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    console.log(`[${new Date().toISOString()}] ${method} ${url} → ${statusCode} (${duration}ms) [${ip}]`);
    originalEnd.apply(res, args);
  };

  next();
}


module.exports = { requestLogger };