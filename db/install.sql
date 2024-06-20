DROP DATABASE IF EXISTS open_weather_test;
DROP USER IF EXISTS open_weather_admin;
CREATE USER open_weather_admin WITH PASSWORD 'open_weather_admin';
CREATE DATABASE open_weather_test OWNER 'open_weather_admin';
