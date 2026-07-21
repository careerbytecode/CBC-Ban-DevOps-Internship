#!/bin/bash

echo "Script name (\$0):        $0"
echo "First argument (\$1):     $1"
echo "Second argument (\$2):    $2"
echo "Number of args (\$#):     $#"
echo "All args with \$@:        $@"
echo "All args with \$*:        $*"
echo "Current PID (\$\$):        $$"

# Run a command, then check its exit status
ls /tmp > /dev/null 2>&1
echo "Exit status of ls (\$?):  $?"

ls /nonexistent_dir > /dev/null 2>&1
echo "Exit status after fail:  $?"
