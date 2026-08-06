read -p "Enter first number: " a
read -p "Enter second number: " b
if [$a -gt $b]
then
    echo"------------------------------"	
    echo "a is the biggest number and a is: $a"
else
    echo "-----------------------------"	
    echo "b is the bigest number and b is : $b"
fi
