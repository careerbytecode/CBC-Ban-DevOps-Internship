#!/bin/bash

echo "Installing backend dependencies..."

cd backend
npm install

cd ../frontend

echo "Installing frontend dependencies..."

npm install

echo "Setup completed successfully"