#!/bin/bash

read -rp "Enter a number: " number

if (($number%2 == 0));
then 
	echo "You have entered an even number."
else
	echo "You have entered an odd number."
fi
