// 404 handler for unknown routes
const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: 'Not found' });
};

// General error handler
const generalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
};

module.exports = {
  notFoundHandler,
  generalErrorHandler
};