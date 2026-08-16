#!/bin/bash

echo "Cleaning FlavorForge generated artifacts..."

rm -rf backend/node_modules
rm -rf frontend/node_modules

rm -rf backend/coverage
rm -rf frontend/coverage

rm -rf frontend/dist

echo "Cleanup completed successfully"