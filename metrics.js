// metrics.js

const prometheus = require('prom-client');

// Create a Prometheus registry
const register = new prometheus.Registry();

// Create a histogram metric
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route'],
  registers: [register], // Attach the histogram to the registry
  buckets: [0.1, 0.5, 1, 2, 5], // Specify histogram buckets
});

module.exports = {
  register,
  httpRequestDuration,
};