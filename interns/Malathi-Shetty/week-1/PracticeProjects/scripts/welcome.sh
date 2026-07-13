#!/bin/bash

# Read the user's name
echo "Enter your name:"
read name

# Display the welcome message five times
for i in {1..5}
do
    echo "$i. Welcome to CareerByteCode DevOps Internship, $name"
done