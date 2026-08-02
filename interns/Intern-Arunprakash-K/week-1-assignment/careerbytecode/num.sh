#!/bin/bash

# Prompt for a number
read -p "Enter a number: " num

# Check the sign using if / elif / else
if [ "$num" -gt 0 ]; then
    echo "$num is positive."
elif [ "$num" -lt 0 ]; then
    echo "$num is negative."
else
    echo "$num is zero."
fi
