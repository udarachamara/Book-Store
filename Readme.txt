clone or Zip the project from github

Required PHP >= 7.2
Node >= 10
Angular cli = 8

Laravel version 6
Angular version 8

create database => book_store

find .env inside backend project
change DB_USERNAME = your db user name
change DB_PASSWORD = your db password

Backend project
-------------------
# run this command

cd backend
composer install
php artisan migrate:fresh --seed
php artisan passport:install
php artisan serve

Frontend project
------------------
# run this command

cd frontend
npm install
ng serve ( or => npm start )

Admin user

email = admin@gmail.com
password = admin123