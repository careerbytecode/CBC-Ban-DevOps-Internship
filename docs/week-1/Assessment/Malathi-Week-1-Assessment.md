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
| Linux supports both the Command Line Interface (CLI) and Graphical User Interface (GUI).        | Windows is mainly operated through a graphical user interface (GUI).       |

- Linux is a free and secure operating system that is widely used by developers and companies for servers and cloud computing.   
- Windows is user-friendly and is commonly used for personal computers, office work, and gaming.

```text
                Operating Systems
                       │
          ┌────────────┴────────────┐
          │                         │
      Linux                     Windows
        │                         │
    Open Source               Closed Source
    Free                      Paid Licensed
    CLI + GUI                 Mainly GUI Focused
    Cloud & Servers           Personal PCs & Gaming
    More Secure               More Malware Targeted

```




---

### Q2.
Explain the role of the Linux Kernel. Why is it considered the core of the operating system?

### Answer

- The **Linux Kernel** is the **core part** of the Linux operating system.   
- It manages communication between the software and the hardware.   
- When a user runs a program or enters a command, the request goes through the shell to the Linux kernel.   
- The kernel then communicates with the hardware and returns the result to the application.  

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

* **Process Management:**
    * Creates,
    * runs,
    * schedules, and
    * stops programs.
* **Memory Management:**
    * Allocates and manages memory for running programs.
* **Device Management:**
    * Controls hardware devices such as the  
        * keyboard,  
        * mouse,  
        * printer, and  
        * storage devices using device drivers.  
* **File System Management:**
    * Reads,
    * writes, and
    * manages files stored on disks.
* **Security and Permissions:**
    * Controls user access and protects system resources.

```text
               APPLICATIONS
                    │
                    ▼
                 SHELL
                    │
                    ▼

         ┌────────────────────┐
         │      KERNEL        │
         └────────────────────┘

     ╱         │        │         ╲
Process     Memory    Device     File
  │            │         │         │
Create      RAM Mgmt  Drivers   Storage

             ╲        │        ╱
               SECURITY
      Users • Permissions • Access

                    │
                    ▼
                HARDWARE
```


### Why is it considered the core of the operating system?

- The Linux kernel is called the **core** of the operating system because it connects software with hardware and manages all important system resources.   
- Every program depends on the kernel to access the CPU, memory, storage, and other hardware devices.   
- Without the Linux kernel, the operating system cannot run applications or communicate with the hardware.  

### Real Example

Suppose we create a file using the command:

```bash
touch notes.txt
```

* The **Shell** receives the `touch notes.txt` command.
* The **Shell** sends the request to the **Linux Kernel**.
* The **Kernel** communicates with the storage device (hardware).
* The file **`notes.txt`** is created successfully.

This example shows how the Linux kernel manages communication between software and hardware.

<img width="1692" height="357" alt="image" src="https://github.com/user-attachments/assets/ebae09e5-4059-4223-bafd-a4d1fce27a70" />


---

### Q3.
Write the Linux commands to perform the following tasks:
- Create a directory named `DevOps`
- Create two subdirectories named `Linux` and `Git`
- Create one file inside each directory
- Display the complete directory structure

### Task 1: Create a directory named `DevOps`

```bash
mkdir DevOps
```

**Explanation:**
* `mkdir` means **make directory**.
* This command creates a new directory named **DevOps**.

---

### Task 2: Go inside the `DevOps` directory

```bash
cd DevOps
```

**Explanation:**

* `cd` means **change directory**.
* It moves you inside the `DevOps` directory.

---

### Task 3: Create two subdirectories named `Linux` and `Git`

```bash
mkdir Linux Git
```

**Explanation:**

* This command creates two directories:

  * `Linux`
  * `Git`

---

### Task 4: Create one file inside each directory

Create a file inside the **Linux** directory:

```bash
touch Linux/linux.txt
```

Create a file inside the **Git** directory:

```bash
touch Git/git.txt
```

**Explanation:**

* `touch` creates a new empty file.
* `Linux/linux.txt` means create **linux.txt** inside the **Linux** directory.
* `Git/git.txt` means create **git.txt** inside the **Git** directory.

---

### Task 5: Display the complete directory structure

```bash
tree
```

**Example Output**

```text
DevOps
├── Git
│   └── git.txt
└── Linux
    └── linux.txt

2 directories, 2 files
```

> **Note:** If the `tree` command is not installed, install it first.

- Ubuntu/Debian:

```bash
sudo apt install tree
```

Or use:

```bash
ls -R
```

---

## Complete Commands

```bash
mkdir DevOps
cd DevOps
mkdir Linux Git
touch Linux/linux.txt
touch Git/git.txt
tree
```

<img width="1817" height="845" alt="image" src="https://github.com/user-attachments/assets/439d2bbc-1d1c-4cba-90f6-df568bbdf9c9" />



---

### Q4.
Explain the purpose of the following commands with one example each:
- `echo`
- `man`
- `uname`
- `hostname`
- `who`


## 1. `echo`

### Purpose

- The `echo` command is used to **display text or the value of a variable** in the terminal.

### Syntax

```bash
echo [text]
```

### Example

```bash
echo "Welcome to Week 1 Assignment of CareerByteCode DevOps Internship"
```

### Output

```text
Welcome to Week 1 Assignment of CareerByteCode DevOps Internship
```

### Real Example

- Display a welcome message or check the value of a variable while writing Bash scripts.

<img width="1172" height="47" alt="image" src="https://github.com/user-attachments/assets/7fa6bae6-bdfb-42ee-8ef8-6a18d5843e17" />


---

## 2. `man`

### Purpose

- The `man` (manual) command is used to **view the user manual** of a Linux command.   
- It provides information about the command, its options, and how to use it.

### Syntax

```bash
man [command]
```

### Example

```bash
man ls
```

### Real Example

- If we forget how the `ls` command works, we can use `man ls` to read its manual.

<img width="1512" height="1348" alt="image" src="https://github.com/user-attachments/assets/064b261d-13a4-414e-9995-e8c8ea3fee98" />


---

## 3. `uname`

### Purpose

- The `uname` command displays **system information**, such as the operating system name and kernel version.

### Syntax

```bash
uname [option]
```

### Example

```bash
uname -a
```

### Example Output

```text
Linux Deepak 6.6.114.1-microsoft-standard-WSL2 #1 SMP PREEMPT_DYNAMIC Mon Dec  1 20:46:23 UTC 2025 x86_64 x86_64 x86_64 GNU/Linux
```

<img width="1195" height="58" alt="image" src="https://github.com/user-attachments/assets/be06d481-2bd7-447c-a5f2-f315d0b4923a" />


| Part                                                 | Meaning                            | Equivalent Command    |
| ---------------------------------------------------- | ---------------------------------- | --------------------- |
| `Linux`                                              | Kernel Name (Operating System)     | `uname` or `uname -s` |
| `Deepak`                                             | Hostname (Computer name)           | `uname -n`            |
| `6.6.114.1-microsoft-standard-WSL2`                  | Kernel Release                     | `uname -r`            |
| `#1 SMP PREEMPT_DYNAMIC Mon Dec 1 20:46:23 UTC 2025` | Kernel Version (build information) | `uname -v`            |
| `x86_64`                                             | Machine Hardware Name              | `uname -m`            |
| `x86_64`                                             | Processor Type                     | `uname -p`            |
| `x86_64`                                             | Hardware Platform                  | `uname -i`            |
| `GNU/Linux`                                          | Operating System                   | `uname -o`            |

<img width="1200" height="222" alt="image" src="https://github.com/user-attachments/assets/06d391ff-6a8b-433d-a005-d69ffe81dd98" />


### Real Example

- A system administrator can use `uname -a` to check the Linux kernel version before installing software.

#### Common Commands

| Command    | Stands for                  | Purpose                                                      |
| ---------- | --------------------------- | ------------------------------------------------------------ |
| `uname`    | *(same as `-s` by default)* | Displays the **kernel name** (e.g., `Linux`).                |
| `uname -s` | **System**                  | Displays the **kernel name** (e.g., `Linux`).                |
| `uname -a` | **All**                     | Displays all available system information.                   |
| `uname -r` | **Release**                 | Displays the Linux **kernel release** (version number).      |
| `uname -m` | **Machine**                 | Displays the machine hardware architecture (e.g., `x86_64`). |
| `uname -n` | **Node**                    | Displays the system hostname (computer name).                |
| `uname -v` | **Version**                 | Displays the Linux kernel build version and build date.      |
| `uname -p` | **Processor**               | Displays the processor type.                                 |
| `uname -i` | **Hardware Platform**       | Displays the hardware platform.                              |
| `uname -o` | **Operating System**        | Displays the operating system (e.g., `GNU/Linux`).           |


<img width="1215" height="447" alt="image" src="https://github.com/user-attachments/assets/7e79e399-1f48-425e-b000-fc75d4068858" />

---

## 4. `hostname`

### Purpose

- The `hostname` command displays the **name of the current computer (host)** on the network.

### Syntax

```bash
hostname
```

### Example

```bash
hostname
```

### Example Output

```text
ubuntu / Deepak
```

<img width="587" height="56" alt="image" src="https://github.com/user-attachments/assets/69d1e397-bf3d-4925-bf42-842916189b2d" />



### Real Example

- When connecting to another computer over a network, we can use the hostname to identify the system.

#### Common Commands

| Command       | Purpose                                                                           | Example Output                           |
| ------------- | --------------------------------------------------------------------------------- | ---------------------------------------- |
| `hostname`    | Displays the current hostname (computer name).                                    | `Deepak`                                 |
| `hostname -I` | Displays the IP address(es) assigned to the system.                               | `192.168.x.x 192.168.x.x`                |
| `hostnamectl` | Displays detailed hostname and system information **(on systems using systemd)**. | Hostname, OS, Kernel, Architecture, etc. |
| `hostname -f` | Displays the Fully Qualified Domain Name (FQDN), if configured.                   | `server.example.com`                     |
| `hostname -A` | Displays all configured hostnames (if available).                                 | Depends on the system                    |

<img width="682" height="425" alt="image" src="https://github.com/user-attachments/assets/06ec4a5b-6e35-415c-a76b-e75c6e8c2b9c" />



---

## 5. `who`

### Purpose

- The `who` command displays **the users who are currently logged in** to the Linux system.

### Syntax

```bash
who
```

### Example

```bash
who
```

### Example Output

```text
malathi  pts/1        2026-07-07 05:32
```

<img width="547" height="47" alt="image" src="https://github.com/user-attachments/assets/a384ffac-4662-4a7e-8dd4-fef9792c932e" />


### Real Example

- On a shared Linux server, an administrator can use `who` to see which users are currently logged in.


#### Common Commands

| Command    | Purpose                                                                  | Example Output                                                 |
| ---------- | ------------------------------------------------------------------------ | -------------------------------------------------------------- |
| `who`      | Displays the users currently logged in to the system.                    | `malathi pts/1 2026-07-07 05:32`                               |
| `who am i` | Displays information about the current login session.                    | `malathi pts/1 2026-07-07 05:32` *(may show no output in WSL)* |
| `who -b`   | Displays the last system boot time.                                      | `system boot 2026-07-07 05:32`                                 |
| `who -q`   | Displays the usernames of logged-in users and the total number of users. | `malathi`<br>`# users=1`                                       |
| `who -H`   | Displays the output with column headings.                                | `NAME LINE TIME COMMENT`                                               |

> Note: On WSL2, who am i may not display any output because WSL does not create a traditional Linux login session. This is expected behavior.

<img width="632" height="250" alt="image" src="https://github.com/user-attachments/assets/1e8c15df-31e6-42a8-9cbf-0724ac90b6d3" />


---

## Summary Table

| Command    | Purpose                              | Example                   |
| ---------- | ------------------------------------ | ------------------------- |
| `echo`     | Displays text or variable values.    | `echo "Welcome to Linux"` |
| `man`      | Opens the manual page for a command. | `man cat`                  |
| `uname`    | Displays system information.         | `uname -s`                |
| `hostname` | Displays the computer's hostname.    | `hostname`                |
| `who`      | Shows the users currently logged in. | `who`                     |


<img width="742" height="197" alt="image" src="https://github.com/user-attachments/assets/a3532b77-6891-4a08-a861-e78b476fd79e" />


---

### Q5.
Write Linux commands to perform the following:
- Display the current Linux version
- Display the system hostname
- View command history
- Create a file named `practice.txt`
- Copy the file into another directory

---

## 1. Display the current Linux version

### Command

```bash
uname -a
```

### Explanation

* `uname` displays system information.
* `-a` displays all available system information, including the kernel version.

### Example Output

```text
Linux Deepak 6.6.114.1-microsoft-standard-WSL2 #1 SMP PREEMPT_DYNAMIC Mon Dec 1 20:46:23 UTC 2025 x86_64 x86_64 x86_64 GNU/Linux
```

---

## 2. Display the system hostname

### Command

```bash
hostname
```

### Explanation

* `hostname` displays the name of the current computer.

### Example Output

```text
Deepak
```

---

## 3. View command history

### Command

```bash
history
```

### Explanation

* `history` displays the list of previously executed commands in the terminal.

### Example Output

```text
1  pwd
2  ls
3  mkdir DevOps
4  cd DevOps
5  history
```

---

## 4. Create a file named `practice.txt`

### Command

```bash
touch practice.txt
```

### Explanation

* `touch` creates a new empty file.
* Here, it creates a file named `practice.txt`.

---

## 5. Copy the file into another directory

### Command

```bash
cp practice.txt DevOps/
```

### Explanation

* `cp` means **copy**.
* This command copies `practice.txt` into the `DevOps` directory.

---

## Complete Commands

```bash
uname -a
hostname
history
touch practice.txt
cp practice.txt DevOps/
```

---

## Summary Table

| Task                                 | Command                   |
| ------------------------------------ | ------------------------- |
| Display the current Linux version    | `uname -a`                |
| Display the system hostname          | `hostname`                |
| View command history                 | `history`                 |
| Create `practice.txt`                | `touch practice.txt`      |
| Copy the file into another directory | `cp practice.txt DevOps/` |






---

### Q6.
Research any **three Linux commands** that help you obtain system information. Explain their purpose with examples.

---

## 1. `lscpu`

### Purpose

* The `lscpu` command displays information about the system's CPU (processor).

### Syntax

```bash
lscpu
```

### Example Output

```text
Architecture:        x86_64
CPU(s):              4
Model name:          Intel(R) Core(TM) i5-9300H CPU @ 2.40GHz
```

### Real Example

* A system administrator can use `lscpu` to check the processor architecture and the number of CPUs before installing software.

---

## 2. `free`

### Purpose

* The `free` command displays information about the system's memory (RAM) and swap space.

### Syntax

```bash
free -h
```

### Example Output

```text
               total        used        free
Mem:            5.8Gi       1.6Gi       3.9Gi
Swap:           10Gi          0B        10Gi
```

### Real Example

* A user can use `free -h` to check the available memory before running large applications.

---

## 3. `df`

### Purpose

* The `df` (Disk Free) command displays information about disk space usage on mounted file systems.

### Syntax

```bash
df -h
```

### Example Output

```text
Filesystem      Size  Used Avail Use%  Mounted on
/dev/sdd       1007G   43G  913G   5%  /
```

### Real Example

* A system administrator can use `df -h` to check the available disk space before saving large files or installing software.

---

## Summary Table

| Command   | Purpose                                                          | Example   |
| --------- | ---------------------------------------------------------------- | --------- |
| `lscpu`   | Displays CPU (processor) information.                            | `lscpu`   |
| `free -h` | Displays memory (RAM) and swap usage in a human-readable format. | `free -h` |
| `df -h`   | Displays disk space usage in a human-readable format.            | `df -h`   |



---


Think of it as checking the **three main hardware resources** of a Linux system:

* **CPU** → `lscpu`
* **Memory (RAM)** → `free -h`
* **Disk Storage** → `df -h`

These are three of the most commonly used system information commands in Linux.



---

### Q7.
Explain the purpose of the following Linux directories:
- `/root`
- `/bin`
- `/sbin`
- `/dev`
- `/proc`

---

## Linux Directory Structure

```text
                 /
          (Root Directory)
                 │
 ┌──────┬──────┬──────┬──────┬
 │      │      │      │      │
root   bin    sbin   dev    proc
```

The `/` (root directory) is the top-level directory in Linux. All other directories are inside it.

---

## 1. `/root`

### Purpose

→ `/root` is the **home directory of the root user (also called the superuser or system administrator)**.
Unlike normal users, the root user has permission to access and modify almost every file in the operating system.

The /root directory stores:
→ It stores the root user's personal files.
→ Bash configuration files
→ Administrative scripts
→ System configuration backups

### Important Note

Do **not** confuse:

```bash
/
```
with 
```bash
/root
```
They are different.

| Directory | Meaning                                             |
| --------- | --------------------------------------------------- |
| `/`       | Root directory (top of the entire Linux filesystem) |
| `/root`   | Home directory of the root user                     |



### Example

View the directory:

```bash
ls /root
```
If permission is denied:
```bash
sudo ls /root
```

```bash
sudo -i
cd /root
sudo ls /root
pwd
```

> Note: Only the root user or a user with `sudo` permission can access this directory.

### Real Example

The system administrator stores important scripts (Backup scripts, Maintenance scripts) and configuration files inside `/root`.

---

## 2. `/bin`

### Purpose

→ `/bin` stands for Binary.
→ `/bin` contains **essential executable programs (user commands)** that are needed for basic system operation.

These commands are available to all users.

### Why are they called binaries?

Programs are stored in machine-executable format called **binary executables**.

When you type:
```bash
ls
```
Linux searches for executable programs in directories listed in the PATH environment variable. Traditionally, many essential commands were stored in /bin, but on modern Linux distributions, /bin is often a symbolic link to /usr/bin.

### Common Commands

* `ls`
* `cp`
* `mv`
* `rm`
* `cat`
* `echo`
* `pwd`
* `mkdir`

### Example

```bash
ls /bin
```

### Real Example

When we run:

```bash
ls
```

Linux executes the cp command from the system's executable directory (/bin or /usr/bin, depending on the distribution).

or

When we type:

```bash
cp file1.txt file2.txt
```

Linux executes the `cp` program located in `/bin`.


However, on Ubuntu 24.04 (and many modern Linux distributions),

```bash
/bin
```

is actually a symbolic link to
```bash
/usr/bin
```
So the command really comes from
```bash
/usr/bin/ls
```


---

## 3. `/sbin`

### Purpose

→ `/sbin` stands for **System Binary**.
→ `/sbin` contains **essential system administration commands**.

These commands are mainly used by the **root user, system administrators** to manage the system.

Some of these commands require administrator privileges (`sudo`).

### Common Commands

* `reboot`
* `shutdown`
* `fsck`
* `mkfs`
* `iptables`

### Example

```bash
ls /sbin
```
or

```bash
which fsck
```
```bash
which mkfs.ext4
```
This proves the commands exist without using them.

### Real Example

A system administrator can restart the system using:

```bash
sudo reboot
```

Checking a disk:
```bash
sudo fsck /dev/sda
```
- fsck repairs disks.
- Running it on the wrong disk can corrupt data.
- Never run it on your working system just for practice.



Creating a filesystem:
```bash
sudo mkfs.ext4 /dev/sdb1
```
- mkfs means: Make File System
- It formats a partition.
- Running it on a real drive erases data.

---

### Difference between /bin and /sbin

| `/bin`                            | `/sbin`                            |
| --------------------------------- | ---------------------------------- |
| Commands for all users            | Commands mainly for administrators |
| Used in daily work                | Used for system maintenance        |
| Usually no root permission needed | Often requires `sudo`              |




---

## 4. `/dev`

### Purpose

→ `/dev` stands for **Devices**.
→ `/dev` contains **device files** that represent hardware devices.

- Linux treats **hardware devices like files**.
- Every hardware component is represented by a device file inside `/dev`.
- This allows programs to communicate with hardware using standard file operations.

### Common Device Files

| Device File   | Purpose                         |
| ------------- | ------------------------------- |
| `/dev/sda`    | Hard disk                       |
| `/dev/null`   | Discards all data written to it |
| `/dev/tty`    | Terminal device                 |
| `/dev/random` | Random number generator         |
| `/dev/zero`   | Produces unlimited zeros        |


### Example

```bash
ls /dev
```

### Real Example

```bash
echo "Hello" > file.txt
```

> When we save a file using echo "Hello" > file.txt, the Linux kernel communicates with the storage device through the device layer represented in /dev.

---

## 5. `/proc`

### Purpose

- `/proc` stands for **Processes**.  
- `/proc` is a **virtual directory** created by the Linux kernel.

- Unlike normal directories, /proc is a virtual filesystem.

- It is created by the Linux kernel while the system is running.

- The files do not exist permanently on the disk.

Instead, Linux generates them dynamically to provide information about:

* Running processes
* CPU
* Memory
* Kernel
* System status
* Hardware

The files inside `/proc` are generated dynamically by the Linux kernel when they are accessed.

### Common Files

| File            | Purpose            |
| --------------- | ------------------ |
| `/proc/cpuinfo` | CPU information    |
| `/proc/meminfo` | Memory information |
| `/proc/version` | Kernel version     |
| `/proc/uptime`  | System uptime      |
| `/proc/loadavg` | CPU load average   |


### Example

```bash
ls /proc
```
Those numbers are **PIDs (Process IDs)**.

> Numeric directories inside /proc represent running processes, where each directory name is the Process ID (PID).

```bash
ls /bin | head
ls /sbin | head
ls /dev | head
ls /proc | head
```




### Real Example

A DevOps engineer checks available memory before deploying an application:

To check CPU information:

```bash
cat /proc/cpuinfo
```

To check memory information:

```bash
cat /proc/meminfo
```

To check Kernel version:

```bash
cat /proc/version
```


Uptime
```bash
cat /proc/uptime
```
Load Average
```bash
cat /proc/loadavg
```
> Most files in /proc are read-only and provide live system information.

---

| Directory | Full Meaning        | Purpose                                                      | Example Command     |
| --------- | ------------------- | ------------------------------------------------------------ | ------------------- |
| `/root`   | Root User Home      | Stores files of the root (administrator) user                | `ls /root`          |
| `/bin`    | Binary              | Essential commands for all users                             | `ls /bin`           |
| `/sbin`   | System Binary       | Essential system administration commands                     | `ls /sbin`          |
| `/dev`    | Devices             | Contains device files representing hardware                  | `ls /dev`           |
| `/proc`   | Process Information | Virtual filesystem containing process and system information | `cat /proc/cpuinfo` |


---

* **`/root` → Root User** → Home directory of the root (administrator) user.
* **`/bin` → Basic Commands** → Basic Essential commands for everyone.
* **`/sbin` → System Commands** → System Commands mainly for the system administrator.
* **`/dev` → Devices** → Represents hardware devices as files.
* **`/proc` → Processes** → Shows information about running processes and the system.

---

| Directory | Command                                                | What it shows                               |
| --------- | ------------------------------------------------------ | ------------------------------------------- |
| `/root`   | `ls /root` *(or `sudo ls /root` if permission denied)* | Files inside the root user's home directory |
| `/bin`    | `ls /bin`                                              | Essential user commands                     |
| `/sbin`   | `ls /sbin`                                             | System administration commands              |
| `/dev`    | `ls /dev`                                              | Device files                                |
| `/proc`   | `ls /proc`                                             | Process and system information              |


> "The root user's home directory is /root, everyone uses /bin, admins use /sbin, hardware is in /dev, and live system information is in /proc."


### Commands to Avoid

| Command                      | Reason                                                  |
| ---------------------------- | ------------------------------------------------------- |
| `sudo mkfs.ext4 /dev/sdb1`   | Formats a disk and destroys data.                       |
| `sudo fsck /dev/sdX`         | Can repair filesystem errors and should not be run on mounted filesystems unless specifically required.; unsafe on a mounted system. |
| `rm -rf /`                   | Deletes the entire filesystem. Never run.               |
| `dd if=... of=/dev/sda`      | Can overwrite a disk completely.                        |
| `mkfs` on any real partition | Erases data.                                            |


---

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
