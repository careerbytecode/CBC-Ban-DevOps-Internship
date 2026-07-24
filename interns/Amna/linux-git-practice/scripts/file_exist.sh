#!/bin/bash


read -rp "Enter a filename: " filename

if [[ -f $filename ]]
then
	echo "File found"
else
	echo "File not found"
fi

