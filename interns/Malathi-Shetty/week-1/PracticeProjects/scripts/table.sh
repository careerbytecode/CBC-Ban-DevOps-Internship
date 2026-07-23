#!/bin/bash

# Read a number from the user
echo "Enter a number:"
read num

echo "Multiplication Table of $num"

for i in {1..10}
do
    echo "$num x $i = $((num * i))"
done
