#!/bin/sh

./wait-for database:27017
npm run data:import
npm start
