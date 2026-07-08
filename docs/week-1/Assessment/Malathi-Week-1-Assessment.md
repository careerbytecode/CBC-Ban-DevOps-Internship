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

### Answer

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

### Answer

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

### Answer

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

### Answer

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

<img width="1200" height="42" alt="image" src="https://github.com/user-attachments/assets/df99ed93-c1e3-4ff3-81cf-2f2bd1570b4b" />




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

<img width="791" height="41" alt="image" src="https://github.com/user-attachments/assets/2b04711c-282a-49c1-b8e4-80e3e6d45c56" />




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

<img width="916" height="905" alt="image" src="https://github.com/user-attachments/assets/a438c5bb-ed99-4836-8550-8972e7ce41dc" />



## 4. Create a file named `practice.txt`

### Command

```bash
touch practice.txt
```

### Explanation

* `touch` creates a new empty file.
* Here, it creates a file named `practice.txt`.

<img width="892" height="26" alt="image" src="https://github.com/user-attachments/assets/bacd4d7a-3db2-4c83-8002-684dfde9342b" />




## 5. Copy the file into another directory

### Command

```bash
cp practice.txt DevOps/
```

### Explanation

* `cp` means **copy**.
* This command copies `practice.txt` into the `DevOps` directory.

> Note: This command copies practice.txt into the existing DevOps directory. The destination directory must already exist.

<img width="937" height="242" alt="image" src="https://github.com/user-attachments/assets/e37652ee-aafe-4a70-aaaf-55504292f93c" />




## Complete Commands

```bash
uname -a
hostname
history
touch practice.txt
cp practice.txt DevOps/
```

<img width="1297" height="1642" alt="image" src="https://github.com/user-attachments/assets/6606fb99-06b8-4959-8add-7441e28cf8d2" />




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

### Answer

## 1. `lscpu`

### Purpose

* The `lscpu` command displays detailed information about the CPU architecture, cores, threads, cache, and processor model.

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

<img width="797" height="1047" alt="image" src="https://github.com/user-attachments/assets/a630f34f-3099-4237-895a-8383816de0ae" />




## 2. `free`

### Purpose

* The `free` command displays the amount of used, free, and available RAM, along with swap memory usage.

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

<img width="870" height="90" alt="image" src="https://github.com/user-attachments/assets/38ae2df7-239c-461d-bf54-8e7aed02e7de" />




## 3. `df`

### Purpose

* The `df` (**Disk Free**) command displays the amount of **used** and **available disk space** on mounted file systems.
* It reports **filesystem usage**, not the physical storage devices.
* Unlike `lsblk`, `df` does **not** show disks or partitions. Instead, it shows how much space is used and available on mounted file systems.

### Syntax

```bash
df -h
```

### Example Output

```text
Filesystem      Size  Used Avail Use%  Mounted on
/dev/sdd       1007G   43G  913G   5%  /
```

<img width="822" height="576" alt="image" src="https://github.com/user-attachments/assets/87d629a4-3bf2-4102-a452-601869c4bbe9" />


### Real Example

* A system administrator can use df -h to check the available disk space before installing software, storing large files, or troubleshooting low disk space issues.



## Summary Table

| Command   | Purpose                                                          | Example   |
| --------- | ---------------------------------------------------------------- | --------- |
| `lscpu`   | Displays CPU (processor) information.                            | `lscpu`   |
| `free -h` | Displays memory (RAM) and swap usage in a human-readable format. | `free -h` |
| `df -h`   | Displays disk space usage in a human-readable format.            | `df -h`   |





Think of it as checking the **three main system resources** of a Linux system:

* **CPU** → `lscpu`
* **Memory (RAM)** → `free -h`
* **Disk Space** → `df -h`

These are three of the most commonly used system information commands in Linux.

<img width="892" height="1282" alt="image" src="https://github.com/user-attachments/assets/cf486323-f7a6-4a15-8b59-a5f95ccda3df" />


### Difference between df and lsblk

| Command | Shows                                                  |
| ------- | ------------------------------------------------------ |
| `df -h` | Disk space usage of **mounted file systems**           |
| `lsblk` | Physical storage devices, partitions, and mount points |


---

### Q7.
Explain the purpose of the following Linux directories:
- `/root`
- `/bin`
- `/sbin`
- `/dev`
- `/proc`

### Answer

Linux follows the Filesystem Hierarchy Standard (FHS), which defines the purpose of standard directories such as /bin, /sbin, /dev, and /proc. Although modern distributions may implement some directories as symbolic links (for example, /bin → /usr/bin), their logical purpose remains the same.

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



## 1. `/root`

### Purpose

→ `/root` is the **home directory of the root user (also called the superuser or system administrator)**.
Unlike normal users, the root user has permission to access and modify almost every file in the operating system.

The /root directory stores:
→ It stores the root user's personal files.
→ Bash configuration files (such as .bashrc and .profile, if present)
→ System administration scripts
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

<img width="922" height="112" alt="image" src="https://github.com/user-attachments/assets/c38f03fe-09e4-4703-bb51-f568f5c4a85d" />


```bash
sudo -i
cd /root
sudo ls /root
pwd
```

> Note: Only the root user or a user with `sudo` permission can access this directory.


<img width="802" height="641" alt="image" src="https://github.com/user-attachments/assets/8948e82a-0139-45ad-a08f-0e4025488f07" />


### Real Example

The system administrator stores important scripts (Backup scripts, Maintenance scripts) and configuration files inside `/root`.



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

<img width="2081" height="1277" alt="image" src="https://github.com/user-attachments/assets/79e1d758-f5cc-48a0-945e-177f2ee6d2bc" />


### Real Example

When we run:

```bash
ls
```

Linux executes the ls command from the system's executable directory (/bin or /usr/bin, depending on the distribution).

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

<img width="1007" height="1238" alt="image" src="https://github.com/user-attachments/assets/d6f6c6c9-03f7-4f7f-84e1-0fc0cfff3ec0" />


### Real Example

A system administrator can restart the system using:

```bash
sudo reboot
```

<img width="1915" height="1022" alt="image" src="https://github.com/user-attachments/assets/52e9cba6-71e0-48ef-930c-d38c0f49b14a" />


Checking a disk:
```bash
sudo fsck /dev/sda
```
- fsck repairs disks.
- Running fsck on a mounted writable filesystem may cause data corruption. It should normally be used on an unmounted filesystem.
- Never run it on your working system just for practice.



Creating a filesystem:
```bash
sudo mkfs.ext4 /dev/sdb1
```
- mkfs means: Make File System
- It formats a partition.
- Running it on a real drive erases data.


Note: 
On many modern Linux distributions, /sbin is a symbolic link to /usr/sbin.



### Difference between /bin and /sbin

| `/bin`                            | `/sbin`                            |
| --------------------------------- | ---------------------------------- |
| Commands for all users            | Commands mainly for administrators |
| Used in daily work                | Used for system maintenance        |
| Usually no root permission needed | Often requires `sudo`              |




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

<img width="2002" height="200" alt="image" src="https://github.com/user-attachments/assets/9ed65408-c92f-4a74-85b4-5b15fb9f106f" />


### Real Example


```bash
echo "Hello" > /dev/null
```


> /dev/null is a special device file known as the null device. Any data written to it is immediately discarded. This demonstrates how Linux treats devices as files.


> The text "Hello" is sent to the special device file /dev/null, where it is immediately discarded. This demonstrates how Linux treats devices as files and allows programs to interact with them using standard file operations. No output is expected because the data is discarded.

<img width="945" height="65" alt="image" src="https://github.com/user-attachments/assets/ba0841c2-b3fc-4e53-bfdd-908998d7c8f8" />


### Showing storage devices

```bash
lsblk
```
> The /dev directory contains device files that represent hardware devices. Programs access storage devices through these device files rather than interacting directly with the hardware.


Example output:

```bash
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 364.8M  1 disk
sdb      8:16   0 144.5M  1 disk
sdc      8:32   0    10G  0 disk [SWAP]
sdd      8:48   0     1T  0 disk /
```


> The disks shown by lsblk are represented by device files inside the /dev directory, such as /dev/sda, /dev/sdb, /dev/sdc, and /dev/sdd. Programs access storage devices through these device files.


<img width="797" height="227" alt="image" src="https://github.com/user-attachments/assets/07c438a4-a0ab-4a1f-894c-8a4e1acc3f8d" />




## 5. `/proc`

### Purpose

- `/proc` is a virtual filesystem that provides information about running processes and the Linux kernel.

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

### Useful files
Each process directory contains files that provide detailed information about that process. Some commonly used files are:

• /proc/<PID>/status   – Displays the process status, memory usage, and other details.
• /proc/<PID>/cmdline  – Shows the command-line arguments used to start the process.
• /proc/<PID>/environ  – Contains the environment variables of the process.


```bash
ls /bin | head
ls /sbin | head
ls /dev | head
ls /proc | head
```

<img width="970" height="1042" alt="image" src="https://github.com/user-attachments/assets/68fcc151-d138-4a38-8142-4a8d322d73f1" />


```bash
ls /proc/1
```

> Note: Some files and symbolic links inside /proc/<PID> require root privileges. Therefore, seeing "Permission denied" for some entries is normal.

<img width="902" height="507" alt="image" src="https://github.com/user-attachments/assets/a550d2c4-fb5e-408f-9db2-c0cb3b923a65" />


## or

```bash
cat /proc/1/status
```

> Here, 1 is the PID of the first process started by the Linux kernel (typically systemd on modern Linux systems). Viewing /proc/1/status displays information such as the process name, state, PID, memory usage, and capabilities.

<img width="2441" height="1067" alt="image" src="https://github.com/user-attachments/assets/71245cfe-8eee-4d93-99c0-d26b9d8fa875" />



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

<img width="2221" height="1457" alt="image" src="https://github.com/user-attachments/assets/ae69e278-89f3-4ebd-9b55-b4dfeee25f99" />

<img width="982" height="1190" alt="image" src="https://github.com/user-attachments/assets/8643aceb-7fda-4ae6-b0f1-556b138a50a4" />



## Summary

| Directory | Meaning | Purpose | Example Command |
|-----------|---------|---------|-----------------|
| `/root` | Root User Home | Stores the personal files of the root (administrator) user. | `ls /root` *(or `sudo ls /root` if permission is denied)* |
| `/bin` | Binary | Contains essential executable commands available to all users. | `ls /bin` |
| `/sbin` | System Binary | Contains essential system administration commands, mainly used by administrators. | `ls /sbin` |
| `/dev` | Devices | Contains device files that represent hardware and virtual devices. | `ls /dev` |
| `/proc` | Process Information | Virtual filesystem that provides live information about running processes and the Linux kernel. | `cat /proc/cpuinfo` |

> Quick Memory Tip:
> /root → Root user's home directory
> /bin → Essential user commands
> /sbin → System administration commands
> /dev → Device files representing hardware
> /proc → Live process and system information

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

### Answer

- A **file** is used to store data such as text, images, programs, or videos.
- A **directory** (also called a folder) is used to organize and store files and other directories.

Just like a filing cabinet, a **directory** acts as a container, while **files** are the actual documents stored inside it.

---

## Difference Between a File and a Directory

| File                                                                             | Directory                                                  |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| A file stores data or information.                                               | A directory stores files and other directories.            |
| A file cannot contain other files.                                               | A directory can contain multiple files and subdirectories. |
| Files may have extensions such as .txt, .pdf, .jpg, or .sh. Unlike Windows, Linux does not require file extensions to identify file types. | Directories usually do not have extensions.                |
| Files are used to store content.                                                 | Directories are used to organize content.                  |
| Example: `notes.txt`, `script.sh`, `image.png`                                   | Example: `Documents`, `Downloads`, `DevOps`                |

---

## Linux Directory Structure Example

```text
Home
│
├── Documents
│   ├── report.pdf
│   └── notes.txt
│
├── Pictures
│   └── image.png
│
└── DevOps
    ├── Linux
    │   └── linux.txt
    └── Git
        └── git.txt
```

In the above example:

* `Documents`, `Pictures`, `DevOps`, `Linux`, and `Git` are **directories**.
* `report.pdf`, `notes.txt`, `image.png`, `linux.txt`, and `git.txt` are **files**.

<img width="1126" height="311" alt="image" src="https://github.com/user-attachments/assets/d39dd029-7dc0-40a1-b199-5f367709e07c" />

<img width="307" height="327" alt="image" src="https://github.com/user-attachments/assets/bc2c36a2-9f9b-4e35-8ab6-136f74ba0a77" />


---

## Practical Example

### Step 1: Create a directory

```bash
mkdir FileDirectoryDemo
```

### Step 2: Move into the directory

```bash
cd FileDirectoryDemo
```

<img width="1022" height="140" alt="image" src="https://github.com/user-attachments/assets/5a78692b-d716-48e8-953e-f7a6729a66a9" />


### Step 3: Create a file

```bash
touch docs.txt
file docs.txt
```

### Step 4: View the contents

```bash
ls
```

### Example Output

```text
docs.txt: empty
```
It demonstrates that Linux recognizes it as a file.

<img width="871" height="72" alt="image" src="https://github.com/user-attachments/assets/41d4edbc-94bc-4f4f-8c60-1f74e56f69c9" />


---

## Another Example

Create a directory with a file inside it:

```bash
mkdir Projects
touch Projects/project1.txt
tree
```

### Example Output

```text
Projects
└── project1.txt

1 directory, 1 file
```

<img width="337" height="411" alt="image" src="https://github.com/user-attachments/assets/3946f6c1-d55a-483d-82c9-67d2caf4590f" />


---

## Real Example

Suppose we are working on a DevOps project:

* Create a directory named **OnlineBankingApp** to organize your project.
* Inside the directory, create the following files:

  * `README.md`
  * `script.sh`
  * `docker-compose.yml`

Here, **OnlineBankingApp** is the **directory**, while `README.md`, `script.sh`, and `docker-compose.yml` are **files**.

<img width="2700" height="1220" alt="image" src="https://github.com/user-attachments/assets/fa9c7af6-7cea-4077-b037-17dfaf835231" />


---

## Summary Table

| Feature                 | File                     | Directory                                     |
| ----------------------- | ------------------------ | --------------------------------------------- |
| Purpose                 | Stores data              | Organizes files and folders                   |
| Can contain other files |  No                     |  Yes                                         |
| Can contain directories |  No                     |  Yes                                         |
| Stores actual data      |  Yes                    |  No (stores references to files and directories) |
| Example                 | `notes.txt`, `script.sh` | `Documents`, `DevOps`, `Projects`             |

---

### Quick Memory Tip

*  **File** → Stores **data** (text, images, programs, etc.).
*  **Directory** → Stores **files and folders** to keep everything organized.

> Think of a **directory** as a **folder** in a filing cabinet, and a **file** as a **document** stored inside that folder. This makes it easy to organize and manage data in Linux.



---

### Q9.
A file was accidentally moved to another directory, and you don't know its location. Which Linux command(s) would you use to find it?

### Answer

If a file has been accidentally moved and its location is unknown, Linux provides commands such as **`find`** and **`locate`** to search for it.

---

## 1. `find` Command

### Purpose

→ The `find` command searches for files and directories within a specified location based on different criteria such as name, type, size, or modification time.

### Syntax

```bash
find [starting_directory] -name "filename"
```

### Example

Search for a file named `practice.txt` from the current directory:

```bash
find . -name "practice.txt"
```

<img width="990" height="52" alt="image" src="https://github.com/user-attachments/assets/5dcea84d-9b91-4a9c-b2bc-1db24f19de50" />


Search the entire system (may require `sudo`):

```bash
sudo find / -name "practice.txt"
```
> **Note:** Searching the entire system using `sudo find /` may take some time and can display "Permission denied" messages for directories you cannot access. 

### Example Output

```text
/home/malathi/projects/CBC-Ban-DevOps-Internship/interns/Malathi-Shetty/Home/DevOps/practice.txt
find: ‘/mnt/d/$RECYCLE.BIN/S-1-5-18’: Permission denied
find: ‘/mnt/d/app/malat/admin/orcl/adump’: Permission denied
find: ‘/mnt/d/app/malat/admin/orcl/dpdump’: Permission denied
...
```

<img width="1032" height="230" alt="image" src="https://github.com/user-attachments/assets/e4369ce4-8772-4a43-a356-13c964c35d63" />


### Real Example

If you accidentally moved `README.md` to another folder and cannot remember where it is, use:

```bash
find . -name "README.md"
```

This command searches all subdirectories of the current directory and displays the file's location.

<img width="947" height="112" alt="image" src="https://github.com/user-attachments/assets/d1f01ad0-008e-47cf-84d2-729a7ce24175" />


---

## 2. `locate` Command

### Purpose

→ The `locate` command searches for files using a pre-built database, making it much faster than `find`.

### Install plocate (if locate is not available)

```bash
sudo apt install plocate
```

<img width="1185" height="735" alt="image" src="https://github.com/user-attachments/assets/ed59a89a-6c2c-44f5-8653-1b9546bf7b9b" />


### Important Note

#### If the database is outdated, update it using:

```bash
sudo updatedb
```

> **Note:** The `locate` command may not be installed by default on all Linux distributions. The database should be updated before using `locate`; otherwise, recently created files may not appear in the search results.

### Syntax

```bash
locate filename
```

### Example

```bash
locate deploy.sh
```

<img width="1002" height="112" alt="image" src="https://github.com/user-attachments/assets/cc59fd59-a4ea-4e47-b75e-685f1a1b84b3" />


### Example Output

```text
/home/malathi/projects/CBC-Ban-DevOps-Internship/interns/Malathi-Shetty/CloudMonitor/scripts/deploy.sh
```
> **Note:** This command quickly searches the file database and displays every location where `deploy.sh` exists.


---

## Difference Between `find` and `locate`

| `find`                                | `locate`                                                            |
| ------------------------------------- | ------------------------------------------------------------------- |
| Searches the filesystem in real time. | Searches a pre-built database.                                      |
| Slower, but always up to date. especially on large systems.        | Much Faster, but results may be outdated if the database is not updated. |
| Does not require a database. since it finds newly created files immediately. | Requires the `updatedb` database to find newly created files.  |
| Can search by name, size, permissions, type, date, etc. | Mainly searches by filename/path.  |

<img width="2101" height="156" alt="image" src="https://github.com/user-attachments/assets/93e7a7cd-e43f-4cc9-9af7-f0df772a231f" />


---

## Summary Table

| Command  | Purpose                                          | Example                       |
| -------- | ------------------------------------------------ | ----------------------------- |
| `find`   | Searches for files and directories in real time. | `find . -name "practice.txt"` |
| `locate` | Quickly searches for files using a database.     | `locate practice.txt`         |

---


*  **`find`** → Searches the **actual filesystem** (slower but always accurate).
*  **`locate`** → Searches a **database** (faster but may need `updatedb` to show recent changes).

> Tip: Use `find` when you need the most accurate and up-to-date results. Use `locate` when you need a quick filename search and the database has already been updated.





---

### Q10.
Suppose you accidentally deleted a file using the `rm` command. What precautions should you follow in the future to avoid deleting important files?

### Answer

The `rm` command permanently deletes files and directories from the system. Unlike Windows, deleted files are **not moved to a Recycle Bin or Trash** by default. Therefore, it is important to follow safe practices before using the `rm` command.

---

## Precautions to Avoid Deleting Important Files

### 1. Confirm Before Deleting

Use the `-i` (interactive) option to ask for confirmation before deleting each file.

#### Example

```bash
rm -i important.txt
```

This prompts:

```text
rm: remove regular file 'important.txt'?
```

---

### 2. Check the File Before Deleting

Verify that the file exists and that it is the correct file.

#### Example

```bash
ls
```

or

```bash
ls -l important.txt
```

This helps prevent deleting the wrong file.

---

### 3. Use `pwd` to Verify Your Current Directory

Before running `rm`, check that you are in the correct directory.

#### Example

```bash
pwd
```

---

### 4. Create Backups of Important Files

Keep copies of important files before deleting or modifying them.

#### Example

```bash
cp important.txt important_backup.txt
```

If the original file is deleted accidentally, the backup can be restored.

<img width="1147" height="378" alt="image" src="https://github.com/user-attachments/assets/f42f486c-5220-423b-8fab-500e1c55b641" />


---

### 5. Avoid Using `rm -rf` Unless Necessary

The `-r` option removes directories recursively, and `-f` forces deletion without confirmation.

```bash
rm -rf directory_name
```

<img width="1007" height="157" alt="image" src="https://github.com/user-attachments/assets/0dcbc3a4-bd1f-4e37-8c6c-ba27cb6db7c2" />


Use this command only when you are absolutely sure, as it can permanently delete large amounts of data.

---

### 6. Use Wildcards Carefully

Before using wildcards (`*`), check which files will be affected.

Instead of directly running:

```bash
rm *.txt
```

First verify the files:

```bash
ls *.txt
```

<img width="1112" height="457" alt="image" src="https://github.com/user-attachments/assets/f4c8bb15-00bd-4939-a6bd-a179fdfc64d3" />


---

### 7. Use Interactive Mode by Default (Optional)

You can make `rm` ask for confirmation every time by creating an alias.

```bash
alias rm='rm -i'
```

<img width="1547" height="243" alt="image" src="https://github.com/user-attachments/assets/b5e98be7-bf13-4009-9e5e-1f6e39b280bf" />


---

## Real Example

Suppose you want to delete `notes.txt`.

Instead of directly running:

```bash
rm notes.txt
```

Use:

```bash
ls -l notes.txt
rm -i notes.txt
```

This allows you to verify the file and confirm before deleting it.

---

## Summary Table

| Precaution                           | Example Command                         |
| ------------------------------------ | --------------------------------------- |
| Ask for confirmation before deleting | `rm -i important.txt`                   |
| Check the file before deleting       | `ls -l important.txt`                   |
| Verify the current directory         | `pwd`                                   |
| Create a backup                      | `cp important.txt important_backup.txt` |
| Avoid force deletion                 | Avoid `rm -rf` unless necessary         |
| Verify wildcard matches              | `ls *.txt` before `rm *.txt`            |
| Enable interactive mode              | `alias rm='rm -i'`                      |

---

### Quick Memory Tip

*  **Check first** → `pwd`, `ls`
*  **Backup important files** → `cp`
*  **Delete safely** → `rm -i`
*  **Avoid using** `rm -rf` unless you are completely sure.

> **Remember:** Once a file is deleted using `rm`, it is generally difficult to recover. Always verify the file and its location before deleting it.



---

### Q11.
Explain the difference between a **Local Repository** and a **Remote Repository** in Git.

### Answer

A **Git repository** is a storage location where Git tracks files, folders, and their version history. Repositories can be **Local** (stored on your computer) or **Remote** (stored on a server such as GitHub).

---

## Difference Between Local Repository and Remote Repository

| Local Repository                                      | Remote Repository                                                |
| ----------------------------------------------------- | ---------------------------------------------------------------- |
| Stored on your own computer.                          | Stored on a remote server such as GitHub, GitLab, or Bitbucket.  |
| Used to make changes, commits, and test code locally. | Used to share code and collaborate with others.                  |
| Does not require an internet connection.              | Usually requires an internet connection to push or pull changes. |
| Every developer has their own local repository.       | Multiple developers can access the same remote repository.       |
| Changes remain only on your computer until pushed.    | Stores the latest shared version of the project.                 |

---

## How They Work Together

```text
                 Remote Repository
                    (GitHub)
                        ▲
             git push   │   git pull
                        │
                        ▼
              Local Repository (Git)
                   Your Computer
```

* **`git push`** uploads local commits to the remote repository.
* **`git pull`** downloads the latest changes from the remote repository to the local repository.

---

## Local Repository

### Purpose

A **Local Repository** is the Git repository stored on your own computer. It allows you to develop, edit files, commit changes, and view version history without an internet connection.

### Example

Create a local repository:

```bash
mkdir MyProject
cd MyProject
git init
```

This creates a new Git repository in the current directory.

### Real Example

A developer writes code and commits changes locally:

```bash
git add .
git commit -m "Added login feature"
```

The changes are saved only in the local repository until they are pushed.

---

## Remote Repository

### Purpose

A **Remote Repository** is hosted on a remote server, allowing multiple developers to share, back up, and collaborate on the same project.

### Example

Connect a local repository to GitHub:

```bash
git remote add origin https://github.com/username/MyProject.git
```

Push changes to GitHub:

```bash
git push -u origin main
```

### Real Example

After completing a feature locally, a developer pushes the commits to GitHub so that other team members can access the updated code.

---

## Summary Table

| Feature           | Local Repository                | Remote Repository                 |
| ----------------- | ------------------------------- | --------------------------------- |
| Location          | Your computer                   | GitHub, GitLab, Bitbucket, etc.   |
| Internet Required |  No                            |  Yes (for push/pull operations)  |
| Main Purpose      | Develop and commit code locally | Share and collaborate on projects |
| Access            | Single developer                | Multiple developers               |
| Example Commands  | `git init`, `git commit`        | `git push`, `git pull`            |

---

### Quick Memory Tip

*  **Local Repository** → Your **personal workspace** on your computer.
*  **Remote Repository** → The **shared online repository** where the project is stored and collaborators can contribute.

> **Think of it this way:** The **Local Repository** is like working on a document saved on your laptop, while the **Remote Repository** is like saving that document to GitHub so your team can access and collaborate on it.


---

### Q12.
Write the Git commands to perform the following:
- Create a new branch
- Switch to the new branch
- Check available branches
- Merge the branch into the main branch
- Push the changes to GitHub

### Answer

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
