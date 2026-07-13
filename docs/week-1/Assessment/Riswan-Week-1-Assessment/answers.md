
\# CareerByteCode DevOps Internship - Week 1 Assessment Answers



\## Q1. What is Linux? Explain why it is widely used in servers and cloud environments.



Linux is an open-source operating system used to manage files, users, applications, processes, networking, and system resources.



It is widely used in servers and cloud environments because it is stable, secure, lightweight, and reliable. Most cloud servers run on Linux because it works well with automation, scripting, and DevOps tools.



In DevOps, Linux is very important because tools like Git, Docker, Kubernetes, Jenkins, Ansible, and Terraform are commonly used on Linux-based systems. It helps DevOps Engineers manage servers, troubleshoot issues, run applications, and automate daily tasks.



\---



\## Q2. Explain the difference between CLI and GUI. Which one is preferred by DevOps Engineers and why?



CLI stands for Command Line Interface. In CLI, we interact with the system by typing commands.



Example:



```bash

ls

pwd

mkdir devops

```



GUI stands for Graphical User Interface. In GUI, we use windows, icons, menus, and buttons.



DevOps Engineers mostly prefer CLI because it is faster, automation-friendly, and useful for managing remote servers. Most Linux servers in cloud environments do not have a GUI, so CLI is very important for DevOps work.



CLI commands can also be used in scripts, which helps automate repetitive tasks.



\---



\## Q3. Write the Linux commands to perform the following tasks.



\### Create a directory named DevOpsTraining



```bash

mkdir DevOpsTraining

```



\### Create three files inside the directory



```bash

cd DevOpsTraining

touch file1.txt file2.txt file3.txt

```



\### Copy one file



```bash

cp file1.txt file1\_copy.txt

```



\### Rename another file



```bash

mv file2.txt renamed\_file2.txt

```



\### Display all files in long listing format



```bash

ls -l

```



These commands help in creating folders, creating files, copying files, renaming files, and checking file details.



\---



\## Q4. Explain the purpose of the following Linux commands with one example each.



\### ls



The `ls` command is used to list files and directories.



Example:



```bash

ls

```



\### pwd



The `pwd` command shows the current working directory.



Example:



```bash

pwd

```



\### cd



The `cd` command is used to change directory.



Example:



```bash

cd DevOpsTraining

```



\### history



The `history` command shows previously executed commands.



Example:



```bash

history

```



\### clear



The `clear` command clears the terminal screen.



Example:



```bash

clear

```



These commands are used regularly while working on Linux systems.



\---



\## Q5. Write Linux commands to perform the following tasks.



\### Display the current user



```bash

whoami

```



\### Display today's date



```bash

date

```



\### Create a directory named scripts



```bash

mkdir scripts

```



\### Create a file named test.sh



```bash

touch test.sh

```



\### Remove the file test.sh



```bash

rm test.sh

```



These are basic Linux commands used for checking user information, date, creating folders, creating files, and deleting files.



\---



\## Q6. Research any three Linux commands useful for beginners and explain their purpose with examples.



\### 1. cat



The `cat` command is used to display the content of a file.



Example:



```bash

cat notes.txt

```



\### 2. echo



The `echo` command is used to print text on the terminal or write text into a file.



Example:



```bash

echo "Hello DevOps"

```



Write text into a file:



```bash

echo "Welcome to Linux practice" > notes.txt

```



\### 3. grep



The `grep` command is used to search text inside a file.



Example:



```bash

grep "error" log.txt

```



These commands are useful for beginners because they help in reading files, writing text, and searching logs. In DevOps, `grep` is very useful while troubleshooting application or server logs.



\---



\## Q7. Explain the purpose of the following Linux directories.



\### /etc



The `/etc` directory stores system configuration files.



Example: user configuration, network configuration, and service configuration files.



\### /usr



The `/usr` directory stores user programs, binaries, libraries, and documentation.



Example:



```bash

/usr/bin

```



\### /tmp



The `/tmp` directory stores temporary files created by applications or users.



\### /home



The `/home` directory stores home directories of normal users.



Example:



```bash

/home/rizwan

/home/ubuntu

```



\### /root



The `/root` directory is the home directory of the root user. The root user is the administrator user in Linux.



Understanding these directories is important because DevOps Engineers often work with configuration files, scripts, logs, and user directories.



\---



\## Q8. What is the difference between a relative path and an absolute path?



An absolute path gives the complete location of a file or directory starting from the root directory.



Example:



```bash

/home/rizwan/careerbytecode-week1/scripts/student\_details.sh

```



A relative path gives the location based on the current working directory.



Example:



```bash

scripts/student\_details.sh

```



The main difference is that an absolute path starts from the root location, while a relative path depends on where we are currently present in the terminal.



\---



\## Q9. Suppose you cannot find a file that you created yesterday. Which Linux command would you use to locate it?



I would use the `find` command to locate the file.



If I know the file name:



```bash

find . -name "notes.txt"

```



If I only know the file extension:



```bash

find . -name "\*.txt"

```



If I want to find files modified recently:



```bash

find . -mtime -1

```



Here, `.` means search from the current directory. The `find` command is useful because it can search files by name, extension, location, or modified time.



\---



\## Q10. What command would you use to check the permissions of a file? How would you give read and write permission to the file owner?



To check file permissions, I would use:



```bash

ls -l

```



To give read and write permission to the file owner, I would use:



```bash

chmod u+rw file.txt

```



Another method is:



```bash

chmod 600 file.txt

```



Here, `chmod` is used to change file permissions. `u+rw` means adding read and write permission for the owner of the file.



File permissions are important because they control who can read, write, or execute a file.



\---



\## Q11. What is Version Control? Explain how Git helps developers manage project changes.



Version Control is a system that tracks and manages changes in files and source code.



Git is a distributed version control system. It helps developers save changes using commits, create branches, compare changes, revert mistakes, and collaborate with other team members.



Git helps track:



\- What changed

\- Who changed it

\- When it changed

\- Why it changed



In real projects, Git is important because multiple developers can work on the same project without losing code history.



\---



\## Q12. Write the Git commands to perform the following tasks.



\### Configure Git username and email



```bash

git config --global user.name "Rizwan Siddiqui"

git config --global user.email "rizwansiddiqui483@gmail.com"

```



\### Initialize a repository



```bash

git init

```



\### Add all files



```bash

git add .

```



\### Commit the changes



```bash

git commit -m "Initial commit"

```



\### Check repository status



```bash

git status

```



These commands are used to set up Git, track files, save changes, and check the current status of the repository.



\---



\## Q13. Research any three Git commands that were not discussed during the training.



\### 1. git log



The `git log` command shows commit history.



Example:



```bash

git log --oneline

```



\### 2. git diff



The `git diff` command shows changes made in files before committing.



Example:



```bash

git diff

```



\### 3. git stash



The `git stash` command temporarily saves uncommitted changes.



Example:



```bash

git stash

```



To bring the changes back:



```bash

git stash pop

```



These commands are useful in real project work because they help check history, review changes, and manage unfinished work safely.



\---



\## Q14. What is GitHub? Explain the purpose of the following.



GitHub is an online platform used to store and manage Git repositories. It helps developers collaborate, review code, maintain project history, and share projects.



\### Repository



A repository is a project folder stored on GitHub. It contains code, files, commits, branches, and documentation.



\### Clone



Clone means copying a remote GitHub repository to the local machine.



Example:



```bash

git clone <repository-url>

```



\### Branch



A branch is a separate line of development where we can work on new features without affecting the main code.



Example:



```bash

git branch feature-script

```



\### Commit



A commit is a saved record of changes in Git.



Example:



```bash

git commit -m "Added Linux practice"

```



\### Pull Request



A Pull Request is a request to merge changes from one branch into another. It is mainly used for code review and collaboration.



\---



\## Q15. Why is a README.md file important in every GitHub repository? Mention at least five points.



A `README.md` file is important because:



1\. It explains the purpose of the project.

2\. It helps others understand how to use the project.

3\. It provides installation or execution steps.

4\. It documents tools, commands, and scripts used.

5\. It improves the professional look of the repository.

6\. It can include screenshots and output examples.

7\. It helps trainers, recruiters, or team members quickly understand the work.



A good README makes the repository more clear and professional.



\---



\## Q16. Write a Bash shell script that accepts your Name, College, and Branch as input and displays the details in a formatted output.



Script name:



```bash

student\_details.sh

```



Script:



```bash

\#!/bin/bash



echo "Enter your Name:"

read name



echo "Enter your College:"

read college



echo "Enter your Branch:"

read branch



echo "-----------------------------"

echo "       Student Details        "

echo "-----------------------------"

echo "Name    : $name"

echo "College : $college"

echo "Branch  : $branch"

echo "-----------------------------"

```



Run commands:



```bash

chmod +x scripts/student\_details.sh

./scripts/student\_details.sh

```



This script uses the `read` command to accept user input and then displays the details in a formatted way.



\---



\## Q17. Write a Bash shell script to check whether a given number is Positive, Negative, or Zero.



Script name:



```bash

number\_check.sh

```



Script:



```bash

\#!/bin/bash



echo "Enter a number:"

read number



if \[ $number -gt 0 ]

then

&#x20;   echo "The number is Positive."

elif \[ $number -lt 0 ]

then

&#x20;   echo "The number is Negative."

else

&#x20;   echo "The number is Zero."

fi

```



Run commands:



```bash

chmod +x scripts/number\_check.sh

./scripts/number\_check.sh

```



This script uses `if`, `elif`, and `else` conditions to check whether the entered number is positive, negative, or zero.



\---



\## Q18. Write a Bash shell script using a for loop to display the numbers from 1 to 20.



Script name:



```bash

numbers\_1\_to\_20.sh

```



Script:



```bash

\#!/bin/bash



echo "Numbers from 1 to 20 are:"



for i in {1..20}

do

&#x20;   echo $i

done

```



Run commands:



```bash

chmod +x scripts/numbers\_1\_to\_20.sh

./scripts/numbers\_1\_to\_20.sh

```



This script uses a `for` loop to print numbers from 1 to 20.



\---



\## Q19. Research any two DevOps tools that were not covered during the training. Explain what they are used for and why organizations use them.



\### 1. Terraform



Terraform is an Infrastructure as Code tool. It is used to create and manage cloud infrastructure using code.



Organizations use Terraform because it reduces manual cloud portal work, keeps infrastructure consistent, supports multiple cloud providers, and helps track infrastructure changes.



Example use case:



A DevOps Engineer can use Terraform to create Azure resources like resource groups, virtual networks, virtual machines, storage accounts, and Kubernetes clusters.



\### 2. Ansible



Ansible is an automation and configuration management tool. It is used to configure servers, install packages, manage users, and automate repetitive tasks.



Organizations use Ansible because it reduces manual server work, uses simple YAML playbooks, and can manage multiple servers together.



Example use case:



A DevOps Engineer can use Ansible to install Nginx on multiple Linux servers at the same time.



Terraform and Ansible are useful in DevOps because they help automate infrastructure and server configuration.



\---



\## Q20. Create a GitHub repository named careerbytecode-week1 and upload the following.



Repository name:



```bash

careerbytecode-week1

```



I created a GitHub repository named `careerbytecode-week1` and added the following:



\- Well-formatted README.md

\- Linux command practice

\- Bash shell scripts

\- Screenshots of commands executed

\- At least 5 Git commits



Git commands used:



```bash

git init

git status

git add README.md

git commit -m "Added README file"



git add linux-practice/linux-commands.md

git commit -m "Added Linux command practice"



git add scripts/student\_details.sh

git commit -m "Added student details script"



git add scripts/number\_check.sh

git commit -m "Added number check script"



git add scripts/numbers\_1\_to\_20.sh

git commit -m "Added numbers loop script"



git log --oneline

```



To push the repository to GitHub:



```bash

git branch -M main

git remote add origin https://github.com/RizwanSid7/careerbytecode-week1.git

git push -u origin main

```



This completes the practical part of the assessment.



\---



