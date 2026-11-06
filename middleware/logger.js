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

function refererVerifier(req, res, next) {
  if (process.env.NODE_ENV === "production") {
    const referer = req.get("Referer");
    if (!referer || !referer.includes("centrum-kosmosu")) {
      return res.status(403).json({ error: "Dostęp zabroniony — nieprawidłowy nagłówek Referer." });
    }
  }
  next();
}

module.exports = { requestLogger, refererVerifier };