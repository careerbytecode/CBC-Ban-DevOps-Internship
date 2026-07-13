# Linux Command Practice

## Q3 Commands

mkdir DevOpsTraining
cd DevOpsTraining
touch file1.txt file2.txt file3.txt
ls
cp file1.txt file1_copy.txt
mv file2.txt renamed_file2.txt
ls -l
cd ..

## Q5 Basic Commands

whoami
date
mkdir -p scripts
touch test.sh
ls -l test.sh
rm test.sh
ls

## Q6 Useful Commands

echo "Welcome to Linux practice" > notes.txt
cat notes.txt

echo "Hello DevOps"

echo "This is my DevOps practice file" > practice.txt
cat practice.txt

echo "error: application failed" > log.txt
echo "success: application started" >> log.txt
grep "error" log.txt

## Q8 Path Practice

pwd
ls scripts
cd scripts
pwd
cd ..
pwd

## Q9 Find Command

find . -name "notes.txt"
find . -name "*.txt"
find . -mtime -1

## Q10 Permission Commands

touch permission-demo.txt
ls -l permission-demo.txt
chmod u+rw permission-demo.txt
ls -l permission-demo.txt
chmod 600 permission-demo.txt
ls -l permission-demo.txt
