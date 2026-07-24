#!/bin/bash

# Read the year from the user
echo "Enter a year:"
read year

# Check if it is a leap year
if (( (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0) ))
then
    echo "$year is a Leap Year."
    echo "February has 29 days."
    echo "The year has 366 days."
    
else
    echo "$year is Not a Leap Year."
    echo "February has 28 days."
    echo "The year has 365 days."
fi
