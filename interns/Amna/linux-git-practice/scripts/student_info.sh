#!/bin/bash

# Function to take input
get_input() {
    read -rp "Enter your Name: " name
    read -rp "Enter your College: " college
    read -rp "Enter your Course: " course
}

# Function to display information
display_info() {
    echo
    echo "=============================="
    echo "      Entered Information      "
    echo "=============================="
    echo "Name    : $name"
    echo "College : $college"
    echo "Course  : $course"
    echo "=============================="
}

# Main program
get_input
display_info
