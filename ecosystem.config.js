module.exports = {
  apps: [
    {
      name: "aip",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3321", // using the port from their NEXTAUTH_URL
      cwd: "/home/ubuntu/aip",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
