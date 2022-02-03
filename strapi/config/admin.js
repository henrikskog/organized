module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '7dff38e70ab1c1f3b8c70ee83aadeba2'),
  },
});
