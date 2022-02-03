/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    api_root: 'http://192.168.68.59:1337/api',
    db_host: '127.0.0.1',
    db_port: '3306',
    database_url: '',
    db_url: 'mysql://root:@127.0.9.1:3306/note-organization',
  },
}
