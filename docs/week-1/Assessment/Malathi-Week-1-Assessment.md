# 🚀 CareerByteCode DevOps Internship

# Week 1 Assignment 

## Instructions

- Answer all questions in your own words.
- Execute the commands wherever applicable.
- Include screenshots for practical questions.
- Submit your work in PDF or Markdown format.
- Upload your scripts to your GitHub repository.
- Explore a few additional concepts beyond the training wherever required.

---

## Questions

### Q1.
What is the difference between a Linux Operating System and a Windows Operating System? Mention at least **five differences**.


| Linux                                                                        | Windows                                                                    |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Linux is open-source, so anyone can view and modify its source code.         | Windows is closed-source, so only Microsoft can modify its source code.    |
| Linux is usually free to download and use.                                   | Windows usually requires a paid license.                                   |
| Linux is more secure and gets fewer viruses and malware.                     | Windows is more commonly targeted by viruses and malware.                  |
| Linux is widely used for servers, cloud computing, and software development. | Windows is mainly used on personal computers, offices, and gaming systems. |
| Linux uses commands in the terminal along with a graphical interface.        | Windows is mainly operated through a graphical user interface (GUI).       |

Linux is a free and secure operating system that is widely used by developers and companies for servers and cloud computing. 
Windows is user-friendly and is commonly used for personal computers, office work, and gaming.


### Q2.
Explain the role of the Linux Kernel. Why is it considered the core of the operating system?


### Answer

The **Linux Kernel** is the **core part** of the Linux operating system. It manages communication between the software and the hardware. When a user runs a program or enters a command, the request goes through the shell to the Linux kernel. The kernel then communicates with the hardware and returns the result to the application.

### Linux Architecture

```text
+----------------------+
|     Applications     |
+----------------------+
           |
           v
+----------------------+
|        Shell         |
+----------------------+
           |
           v
+----------------------+
|     Linux Kernel     |
+----------------------+
           |
           v
+----------------------+
|      Hardware        |
+----------------------+
```

### Role of the Linux Kernel

The Linux kernel performs several important tasks:

* **Process Management:** Creates, runs, schedules, and stops programs.
* **Memory Management:** Allocates and manages memory for running programs.
* **Device Management:** Controls hardware devices such as the keyboard, mouse, printer, and storage devices using device drivers.
* **File System Management:** Reads, writes, and manages files stored on disks.
* **Security and Permissions:** Controls user access and protects system resources.

### Why is it considered the core of the operating system?

The Linux kernel is called the **core** of the operating system because it connects software with hardware and manages all important system resources. Every program depends on the kernel to access the CPU, memory, storage, and other hardware devices. Without the Linux kernel, the operating system cannot run applications or communicate with the hardware.

### Real Example

Suppose you create a file using the command:

```bash
touch notes.txt
```

* The **Shell** receives the `touch notes.txt` command.
* The **Shell** sends the request to the **Linux Kernel**.
* The **Kernel** communicates with the storage device (hardware).
* The file **`notes.txt`** is created successfully.

This example shows how the Linux kernel manages communication between software and hardware.


### Q3.
Write the Linux commands to perform the following tasks:
- Create a directory named `DevOps`
- Create two subdirectories named `Linux` and `Git`
- Create one file inside each directory
- Display the complete directory structure

### Q4.
Explain the purpose of the following commands with one example each:
- `echo`
- `man`
- `uname`
- `hostname`
- `who`

### Q5.
Write Linux commands to perform the following:
- Display the current Linux version
- Display the system hostname
- View command history
- Create a file named `practice.txt`
- Copy the file into another directory

### Q6.
Research any **three Linux commands** that help you obtain system information. Explain their purpose with examples.

### Q7.
Explain the purpose of the following Linux directories:
- `/root`
- `/bin`
- `/sbin`
- `/dev`
- `/proc`

### Q8.
Differentiate between a **File** and a **Directory** in Linux. Explain with suitable examples.

### Q9.
A file was accidentally moved to another directory, and you don't know its location. Which Linux command(s) would you use to find it?

### Q10.
Suppose you accidentally deleted a file using the `rm` command. What precautions should you follow in the future to avoid deleting important files?

### Q11.
Explain the difference between a **Local Repository** and a **Remote Repository** in Git.

### Q12.
Write the Git commands to perform the following:
- Create a new branch
- Switch to the new branch
- Check available branches
- Merge the branch into the main branch
- Push the changes to GitHub

### Q13.
Research any **three commonly used Git commands** that were not covered during the training and explain their purpose.

### Q14.
What is a GitHub Repository? Explain why a README file is important in every GitHub project.

### Q15.
Explain the purpose of the following GitHub features:
- Star
- Watch
- Fork
- Issues
- Pull Requests

### Q16.
Write a Bash shell script to display the multiplication table of a number entered by the user.

### Q17.
Write a Bash shell script to check whether a given year is a **Leap Year** or **Not a Leap Year**.

### Q18.
Write a Bash shell script that accepts a user's **Name** and displays the following message five times using a **for loop**:

**Welcome to CareerByteCode DevOps Internship, <Name>**

### Q19.
Research any **two popular Linux distributions** used in cloud environments. Explain their features and where they are commonly used.

### Q20.
Create a GitHub repository named **week1-practice-set3** and upload:
- Linux command practice
- Two Bash shell scripts
- A well-formatted README.md
- Minimum **5 Git commits**
- Screenshots of your terminal output

---

## 🎥 Q21. Self-Speech Video (Mandatory)

Record a **3-minute self-speech video** covering the following:

- Introduce yourself.
- Share what you learned during the first week.
- Which Linux command did you use the most?
- Which Git concept did you understand well?
- What additional concept did you learn by exploring on your own?
- What are your goals for the upcoming weeks?

---

**Best of Luck! 🚀**  
**CareerByteCode DevOps Internship**
