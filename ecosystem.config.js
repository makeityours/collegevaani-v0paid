module.exports = {
  apps: [
    {
      name: "collegevaani",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      watch: false,
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      error_file: "/var/log/collegevaani/error.log",
      out_file: "/var/log/collegevaani/out.log",
      time: true,
    },
    {
      name: "collegevaani-cron",
      script: "./scripts/scheduled-tasks.js",
      watch: false,
      instances: 1,
      autorestart: true,
      cron_restart: "0 */6 * * *", // Restart every 6 hours
      env: {
        NODE_ENV: "production",
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      error_file: "/var/log/collegevaani/cron-error.log",
      out_file: "/var/log/collegevaani/cron-out.log",
      time: true,
    }
  ]
} 