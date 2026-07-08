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

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/caa64886-1fdd-4a33-9403-10d052f89170" />



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
┌─────────────────────────────────────────────────────────────────────────────┐
│                         LINUX ARCHITECTURE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        APPLICATIONS                                 │   │
│   │                 User Programs & Tools                               │   │
│   │                                                                     │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │                         SHELL                               │   │   │
│   │   │                  User Interface (CLI / GUI)                 │   │   │
│   │   │                                                             │   │   │
│   │   │   ┌─────────────────────────────────────────────────────┐   │   │   │
│   │   │   │                     KERNEL                          │   │   │   │
│   │   │   │            Core of the Operating System             │   │   │   │
│   │   │   │                                                     │   │   │   │
│   │   │   │   ┌─────────────────────────────────────────────┐   │   │   │   │
│   │   │   │   │                  HARDWARE                   │   │   │   │   │
│   │   │   │   │      CPU • RAM • Disk • NIC • Devices       │   │   │   │   │
│   │   │   │   │         Physical Components                 │   │   │   │   │
│   │   │   │   └─────────────────────────────────────────────┘   │   │   │   │
│   │   │   └─────────────────────────────────────────────────────┘   │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   User Space → Interface → Operating System → Physical Hardware             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```
###  5 CORE RESPONSIBILITIES OF THE KERNEL  

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                        WHAT DOES THE KERNEL DO?                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                              ○ Process                                      │
│                       Create • Schedule • Terminate                         │
│                                   │                                         │
│                                   │                                         │
│  ○ Memory ──────────────── ◎ KERNEL ─────────────── ○ Device Drivers        │
│  Allocate RAM             Resource Manager          Hardware Communication   │
│                                   │                                         │
│                                   │                                         │
│                              ○ File System                                  │
│                       Read • Write • Storage Access                         │
│                                   │                                         │
│                                   │                                         │
│                              ○ Security                                     │
│                  Users • Permissions • Access Control                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```


### Why is it considered the core of the operating system?

- The Linux kernel is called the **core** of the operating system because it connects software with hardware and manages all important system resources.   
- Every program depends on the kernel to access the CPU, memory, storage, and other hardware devices.   
- Without the Linux kernel, the operating system cannot run applications or communicate with the hardware.

<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/22eed0a4-a62a-41e9-b3a2-143224759aaf" />

### Real Example

Suppose we create a file using the command:

```bash
touch notes.txt
```

<img width="1692" height="357" alt="image" src="https://github.com/user-attachments/assets/ebae09e5-4059-4223-bafd-a4d1fce27a70" />

* The **Shell** receives the `touch notes.txt` command.
* The **Shell** sends the request to the **Linux Kernel**.
* The **Kernel** communicates with the storage device (hardware).
* The file **`notes.txt`** is created successfully.

This example shows how the Linux kernel manages communication between software and hardware.






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

• `/proc/<PID>/status`   – Displays the process status, memory usage, and other details.  
• `/proc/<PID>/cmdline`  – Shows the command-line arguments used to start the process.  
• `/proc/<PID>/environ`  – Contains the environment variables of the process.  


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

> Note: Some files and symbolic links inside `/proc/<PID>` require root privileges. Therefore, seeing "Permission denied" for some entries is normal.

<img width="902" height="507" alt="image" src="https://github.com/user-attachments/assets/a550d2c4-fb5e-408f-9db2-c0cb3b923a65" />


**or**

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





### What does this command do?

```bash
alias rm='rm -i'
```

It creates an **alias** (a shortcut) so that every time you type:

```bash
rm filename
```

Linux actually runs:

```bash
rm -i filename
```

The `-i` option stands for **interactive**, which asks for confirmation before deleting a file.

---

### Without the alias

If you run:

```bash
rm notes.txt
```

The file is deleted **immediately** without any warning.

---

### With the alias

First create the alias:

```bash
alias rm='rm -i'
```

Now when you run:

```bash
rm notes.txt
```

Linux behaves as if you typed:

```bash
rm -i notes.txt
```

It asks:

```text
rm: remove regular empty file 'notes.txt'?
```

You must type:

```text
y
```

to delete the file, or

```text
n
```

to keep it.

<img width="1547" height="243" alt="image" src="https://github.com/user-attachments/assets/b5e98be7-bf13-4009-9e5e-1f6e39b280bf" />

---

### Why is it useful?

It helps prevent accidental deletion of important files because you get a confirmation prompt before each deletion.

This is especially useful for beginners and when working on important projects.

---

### Is it permanent?

No. The alias only works in the **current terminal session**.

If you close the terminal, it disappears.

To make it permanent, add it to your `~/.bashrc` file:

```bash
echo "alias rm='rm -i'" >> ~/.bashrc
source ~/.bashrc
```

Then every new terminal will automatically use `rm -i` whenever you type `rm`.




> The command `alias rm='rm -i'` creates a shortcut so that every `rm` command runs in interactive mode (`rm -i`), asking for confirmation before deleting files. This helps prevent accidental file deletion.




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



<img width="707" height="162" alt="image" src="https://github.com/user-attachments/assets/e6b4392e-4434-48fc-96b3-ac3538a56efc" />


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

<img width="1137" height="731" alt="image" src="https://github.com/user-attachments/assets/dd6dfcdc-b820-40b9-bd46-143fe9654a01" />


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

<img width="1002" height="487" alt="image" src="https://github.com/user-attachments/assets/cd914208-9485-4072-bf2f-ef848ec38655" />


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



*  **Local Repository** → Your **personal workspace** on your computer.
*  **Remote Repository** → The **shared online repository** where the project is stored and collaborators can contribute.

> **Think of it this way:** The **Local Repository** is like working on a document saved on your laptop, while the **Remote Repository** is like saving that document to GitHub so your team can access and collaborate on it.

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/0f38527d-3e5c-4f45-a854-19bb5ed58007" />


---

### Q12.
Write the Git commands to perform the following:
- Create a new branch
- Switch to the new branch
- Check available branches
- Merge the branch into the main branch
- Push the changes to GitHub

### Answer

## 1. Create a New Branch

### Command

```bash
git branch feature-branch
```

### Explanation

* `git branch` creates a new branch.
* Here, a branch named `feature-branch` is created.

### Real Example

A developer creates a separate branch to work on a new feature without affecting the `main` branch.

---

## 2. Switch to the New Branch

### Command

```bash
git switch feature-branch
```

> Older Git versions also support:

```bash
git checkout feature-branch
```

### Explanation

* `git switch` changes the current working branch to `feature-branch`.

### Real Example

After creating the branch, the developer switches to it and starts implementing the feature.

---

## 3. Check Available Branches

### Command

```bash
git branch
```


### Explanation

* Displays all local branches.
* The current branch is marked with an asterisk (`*`).

### Example Output

```text
* feature-branch
  main
```

### Real Example

A developer checks the list of branches before switching or merging.

---

## 4. Merge the Branch into the Main Branch

### Step 1

```bash
git switch main
```

### Step 2

```bash
git merge feature-branch
```

### Explanation

* First switch to the `main` branch.
* Then merge the changes from `feature-branch` into `main`.

### Real Example

After testing the feature, the developer merges it into the main branch.

> **Note:** For this assignment, these commands are shown as the standard Git workflow. They were **not executed** to avoid modifying the shared internship repository.

---

## 5. Push the Changes to GitHub

### Command

```bash
git push origin main
```

### Explanation

* `origin` is the remote repository.
* `main` is the branch being pushed to GitHub.

### Real Example

After merging locally, the updated `main` branch is pushed to GitHub so everyone can access the latest changes.

> **Note:** This command is shown for learning purposes and was **not executed** to avoid changing the shared repository.


---

## 6. Delete the Feature Branch (Optional)

After the feature has been merged into `main`, the feature branch is usually no longer needed and can be deleted.

### Delete the Local Branch

```bash
git branch -d feature-branch
```

### Delete the Remote Branch

```bash
git push origin --delete feature-branch
```

### Explanation

* `git branch -d` deletes the local branch after it has been merged.
* `git push origin --delete` removes the branch from the remote GitHub repository.

### Real Example

Once a feature has been successfully merged into the `main` branch, the development branch is deleted to keep the repository clean and organized.

> **Note:** These commands should only be used **after** the branch has been merged. Since the merge was not performed for this assignment, these commands were **not executed**.



---

# Practical Demonstration Performed

The following commands were actually executed as part of the hands-on practice:

```bash
git branch feature-branch
git branch
git switch feature-branch
touch demo.txt
git add .
git commit -m "Add demo file"
git push -u origin feature-branch
git switch main
```

These commands successfully:

* Created a new branch.
* Switched to the new branch.
* Added a sample file.
* Committed the changes.
* Pushed the new branch to GitHub.
* Switched back to the `main` branch.

> The merge and push to `main` were intentionally **not performed** to avoid modifying the internship repository.

---

## Complete Git Workflow

```bash
git branch feature-branch
git switch feature-branch
git branch
git switch main
git merge feature-branch
git push origin main
```

---

## Summary Table

| Task                     | Command                                         |
| ------------------------ | ----------------------------------------------- |
| Create a new branch      | `git branch feature-branch`                     |
| Switch to the new branch | `git switch feature-branch`                     |
| Check available branches | `git branch`                                    |
| Merge into `main`        | `git switch main`<br>`git merge feature-branch` |
| Push changes to GitHub   | `git push origin main`                          |











---

### Q13.
Research any **three commonly used Git commands** that were not covered during the training and explain their purpose.


Since your training already covered commands like `git branch`, `git checkout/switch`, `git merge`, `git push`, etc., choose commands that are genuinely different. A good set is:

* `git status`
* `git log`
* `git diff`

These are among the most commonly used Git commands in daily development.

---

# Q13.

Research any **three commonly used Git commands** that were not covered during the training and explain their purpose.

---

# Answer

## 1. `git status`

### Purpose

The `git status` command displays the current state of the Git repository.

It shows:

* The current branch.
* Modified files.
* Untracked files.
* Staged files that are ready to be committed.

### Syntax

```bash
git status
```

### Example Output

```text
On branch main

Changes not staged for commit:
  modified: README.md

Untracked files:
  demo.txt
```

### Real Example

Before committing changes, a developer uses `git status` to verify which files have been modified or staged.

---

## 2. `git log`

### Purpose

The `git log` command displays the commit history of a Git repository.

It shows information such as:

* Commit ID (SHA)
* Author
* Date
* Commit message

### Syntax

```bash
git log
```

### Example Output

```text
commit 20d6ade...
Author: Malathi
Date: Tue Jul 8 2026

    Add demo file
```

### Real Example

A developer uses `git log` to review previous commits or find the commit where a bug was introduced.

---

## 3. `git diff`

### Purpose

The `git diff` command displays the differences between files or commits.

It helps developers review changes before committing them.

### Syntax

```bash
git diff
```

### Example Output

```text
- Hello World
+ Hello Git
```

### Real Example

Before creating a commit, a developer runs `git diff` to review all modifications made to the project files.

---

## Summary Table

| Command      | Purpose                                        | Example      |
| ------------ | ---------------------------------------------- | ------------ |
| `git status` | Displays the current status of the repository. | `git status` |
| `git log`    | Displays the commit history.                   | `git log`    |
| `git diff`   | Displays differences between files or commits. | `git diff`   |

---

### Commands Used for Hands-on Practice

You can run the following commands safely to capture screenshots:

```bash
git status
git log --oneline
git diff
```

> **Note:** If `git diff` shows no output, it means there are no uncommitted changes. To see a difference, make a small change to a file without committing it, then run `git diff` again.

If git diff shows nothing

Make a small temporary change.

For example,
```bash
echo "Practice line" >> sample.txt
```
Now run
```bash
git diff
```
You'll see the changes.

After taking the screenshot, remove the temporary file:
```bash
rm sample.txt
```
These three commands are commonly used by developers and DevOps engineers and complement the basic Git commands covered during training.


---

### Q14.
What is a GitHub Repository? Explain why a README file is important in every GitHub project.


### Answer

## What is a GitHub Repository?

A **GitHub Repository (Repository or Repo)** is an online storage space on GitHub that contains a project's files, folders, source code, and complete version history managed using Git.

It allows developers to:

* Store project files securely.
* Track changes made to the project.
* Collaborate with other developers.
* Manage different versions of the project.
* Share projects publicly or privately.

A repository can contain source code, documentation, images, configuration files, and other resources related to a project.

---

## Real Example

For this internship, the repository **`CBC-Ban-DevOps-Internship`** is hosted on GitHub. It contains the project structure, weekly assignments, documentation, and other files that interns work on collaboratively.

---

# Why is a README File Important?

A **README** file is the first document users see when they open a GitHub repository. It provides essential information about the project and helps others understand how to use or contribute to it.

A README file typically includes:

* Project title and description.
* Purpose of the project.
* Installation instructions.
* Usage instructions.
* Features.
* Folder structure.
* Technologies used.
* Contribution guidelines.
* License information.
* Contact information.

A well-written README makes a project easier to understand and improves collaboration among developers.

---

## Real Example

When someone visits a GitHub repository, they can read the **README.md** file to understand:

* What the project does.
* How to install and run it.
* Which technologies are used.
* How to contribute to the project.

Without a README, new users may find it difficult to understand the project's purpose or how to use it.

---

## Advantages of a README File

* Explains the purpose of the project.
* Helps users install and use the project correctly.
* Provides documentation for developers.
* Makes collaboration easier.
* Improves the professionalism of the repository.
* Serves as the project's homepage on GitHub.

---

## Summary Table

| Topic                 | Description                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **GitHub Repository** | An online storage location on GitHub that contains a project's files, folders, source code, and version history managed using Git. |
| **README File**       | A documentation file that explains the project, its purpose, installation steps, usage, and other important information.           |

---

## Quick Comparison

| GitHub Repository                                        | README File                                      |
| -------------------------------------------------------- | ------------------------------------------------ |
| Stores the complete project and its version history.     | Explains the project and how to use it.          |
| Contains source code, files, folders, and documentation. | Contains project documentation and instructions. |
| Used for version control and collaboration.              | Used for understanding and onboarding users.     |
| Can contain multiple files and folders.                  | Usually a single file named `README.md`.         |

---

### Key Points to Remember

* **GitHub Repository** → Stores and manages the complete project with version control.
* **README.md** → Explains what the project is, how to use it, and how others can contribute.

> **In simple terms:** A **GitHub repository** is like a **project folder stored online**, while the **README.md** file is the **user guide** that explains everything about that project.




---

### Q15.
Explain the purpose of the following GitHub features:
- Star
- Watch
- Fork
- Issues
- Pull Requests

### Answer

## GitHub Features Overview

GitHub provides several features that make it easier for developers to collaborate, manage projects, and contribute to open-source software.

---

## 1.  Star

### Purpose

The **Star** feature allows users to bookmark or show appreciation for a GitHub repository.

It helps users:

* Save repositories for future reference.
* Show that they like or support a project.
* Discover popular repositories based on the number of stars.

### Real Example

> If you find a useful DevOps project on GitHub, you can **Star** it so that it appears in your starred repositories for easy access later.

I starred my **CBC-Ban-DevOps-Internship** repository so it appears in my **Starred Repositories** list, making it easy to find later.


---

## 2.  Watch

### Purpose

The **Watch** feature allows users to receive notifications about activity in a repository.

Depending on the notification settings, GitHub can notify users about:

* New commits
* New issues
* Pull requests
* Discussions
* Releases

### Real Example

> A developer watches an open-source project to stay updated whenever new changes or releases are made.

I used the **Watch** option to choose how I want to receive notifications whenever activity happens in the repository.



---

## 3.  Fork

### Purpose

The **Fork** feature creates a personal copy of another user's repository under your own GitHub account.

A fork allows you to:

* Experiment with changes safely.
* Develop new features independently.
* Contribute to open-source projects without affecting the original repository.

### Real Example

During this internship, I forked the **CBC-Ban-DevOps-Internship** repository from the original repository into my own GitHub account before starting the assignments.



---

## 4.  Issues

### Purpose

The **Issues** feature is used to: 
 - report bugs, 
 - request new features, 
 - ask questions, or 
 - track tasks within a project.

Issues help teams organize and discuss work before implementing changes.

### Real Example

> If a user discovers a bug in a project, they can create an Issue describing the problem so that the developers can investigate and fix it.

The repository currently has no open issues, but this page is where developers can create and track bugs, feature requests, and project tasks.

---

## 5.  Pull Requests (PR)

### Purpose

A **Pull Request (PR)** is used to propose changes from one branch or fork to another repository or branch.

It allows team members to:

* Review code.
* Discuss changes.
* Suggest improvements.
* Approve or reject contributions before merging.

### Real Example

> After completing a new feature in the `feature-branch`, a developer creates a Pull Request to request that the changes be merged into the `main` branch.

After completing my internship work in my forked repository, I created a **Pull Request** to request that my changes be reviewed and merged into the original repository.

---

## Summary Table

| Feature             | Purpose                                           | Real Example                                       |
| ------------------- | ------------------------------------------------- | -------------------------------------------------- |
|  **Star**          | Bookmark or show appreciation for a repository.   | Starred the internship repository for quick access. |
|  **Watch**        | Receive notifications about repository activity.  | Get notified when a project is updated.            |
|  **Fork**         | Create your own copy of a repository.             | Fork an open-source project before contributing.   |
|  **Issues**       | Report bugs, request features, or track tasks.    | Report a bug found in a project.                   |
|  **Pull Request** | Request that code changes be reviewed and merged. | Submit completed work for review before merging.   |

---

## GitHub Collaboration Workflow

```text
                GitHub Repository
                        │
        ┌───────────────┼───────────────┐
        │               │               │
       Star           Watch           Fork
        │               │               │
 Save Repository   Get Notifications   Create Your Copy
                                            │
                                            ▼
                                     Make Changes
                                            │
                                            ▼
                                      Create Pull Request
                                            │
                                            ▼
                                      Code Review
                                            │
                                            ▼
                                       Merge to Main

                 Issues
                     │
     Report Bugs • Request Features • Track Tasks
```

---

### Key Points to Remember

* **Star** → Save or appreciate a repository.
* **Watch** → Receive notifications about repository updates.
* **Fork** → Create your own copy of a repository.
* **Issues** → Report bugs, request features, or track project tasks.
* **Pull Request** → Submit changes for review before merging into the main project.

> **In simple terms:** **Star** helps you save projects, **Watch** keeps you updated, **Fork** lets you create your own copy, **Issues** help track bugs and tasks, and **Pull Requests** enable code review and collaboration before changes are merged.

---


### Q16.
Write a Bash shell script to display the multiplication table of a number entered by the user.

### Answer

## Bash Shell Script

```bash
#!/bin/bash

# Read a number from the user
echo "Enter a number:"
read num

echo "Multiplication Table of $num"

for i in {1..10}
do
    echo "$num x $i = $((num * i))"
done
```

---

## Explanation

- `#!/bin/bash` specifies that the script should be executed using the Bash shell.
- `echo` displays text on the terminal.
- `read num` accepts a number entered by the user and stores it in the variable `num`.
- `for i in {1..10}` runs the loop from **1 to 10**.
- `$((num * i))` performs arithmetic multiplication.
- `echo` prints each line of the multiplication table.

---

## Example Execution

```text
Enter a number:
5

Multiplication Table of 5

5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50
```

---

## How to Run the Script

### Step 1: Create the script file

```bash
nano table.sh
```

Paste the script and save it.

---

### Step 2: Give execute permission

```bash
chmod +x table.sh
```

---

### Step 3: Run the script

```bash
./table.sh
```

---

## Real Example

Suppose the user enters **7**.

The script displays:

```text
Multiplication Table of 7

7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70
```

---

## Flow of the Script

```text
        Start
          │
          ▼
  Read Number (num)
          │
          ▼
 Print Heading
          │
          ▼
   Loop from 1 to 10
          │
          ▼
 Calculate num × i
          │
          ▼
 Display Result
          │
          ▼
        End
```

---

## Summary

| Step | Command / Statement | Purpose |
|------|----------------------|---------|
| 1 | `read num` | Reads a number from the user. |
| 2 | `for i in {1..10}` | Loops from 1 to 10. |
| 3 | `$((num * i))` | Calculates the multiplication. |
| 4 | `echo` | Displays each line of the multiplication table. |


---

### Q17.
Write a Bash shell script to check whether a given year is a **Leap Year** or **Not a Leap Year**.


### Answer

## Bash Shell Script

```bash
#!/bin/bash

# Read the year from the user
echo "Enter a year:"
read year

# Check if it is a leap year
if (( (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0) ))
then
    echo "$year is a Leap Year."
    echo "February has 29 days."
    echo "The year has 366 days."
else
    echo "$year is Not a Leap Year."
    echo "February has 28 days."
    echo "The year has 365 days."
fi
```

---

## Explanation

- `#!/bin/bash` specifies that the script should be executed using the Bash shell.
- `echo` displays a message to the user.
- `read year` accepts the year entered by the user and stores it in the variable `year`.
- The `if` statement checks the leap year conditions:
  - If the year is divisible by **400**, it is a leap year.
  - OR if the year is divisible by **4** but **not divisible by 100**, it is a leap year.
  - Otherwise, it is **not** a leap year.

---

## Leap Year Rules

A year is a **Leap Year** if:

- It is divisible by **400**, **or**
- It is divisible by **4** but **not divisible by 100**.

Examples:

| Year | Result |
|------|--------|
| 2024 | Leap Year |
| 2025 | Not a Leap Year |
| 1900 | Not a Leap Year |
| 2000 | Leap Year |

---

## Example Execution

### Example 1

```text
Enter a year:
2024

2024 is a Leap Year.
```

### Example 2

```text
Enter a year:
2025

2025 is Not a Leap Year.
```

---

## How to Run the Script

### Step 1: Create the script file

```bash
nano leapyear.sh
```

Paste the script and save it.

---

### Step 2: Give execute permission

```bash
chmod +x leapyear.sh
```

---

### Step 3: Run the script

```bash
./leapyear.sh
```

---

## Flow of the Script

```text
          Start
            │
            ▼
     Read Year Input
            │
            ▼
   Is year divisible by 400?
        │            │
      Yes            No
       │              │
       ▼              ▼
 Leap Year     Divisible by 4
               and not by 100?
                  │        │
                Yes        No
                 │          │
                 ▼          ▼
          Leap Year   Not a Leap Year
                 │
                 ▼
                End
```

---

## Real Example

A developer can use this script to determine whether a given year has **365** or **366** days before processing date-related calculations or generating yearly reports.

---

## Summary Table

| Step | Command / Statement | Purpose |
|------|----------------------|---------|
| 1 | `read year` | Reads the year entered by the user. |
| 2 | `if` condition | Checks the leap year rules. |
| 3 | `echo` | Displays whether the year is a Leap Year or Not a Leap Year. |


---

### Q18.
Write a Bash shell script that accepts a user's **Name** and displays the following message five times using a **for loop**:

**Welcome to CareerByteCode DevOps Internship, <Name>**

### Answer

## Bash Script

```bash
#!/bin/bash

# Read the user's name
echo "Enter your name:"
read name

# Display the welcome message five times
for i in {1..5}
do
    echo "$i. Welcome to CareerByteCode DevOps Internship, $name"
done
```

---

## Explanation

* `#!/bin/bash` tells the system to execute the script using the Bash shell.
* `read name` accepts the user's name from the keyboard and stores it in the variable `name`.
* `for i in {1..5}` creates a loop that runs **five times**.
* `echo` displays the welcome message during each iteration of the loop.
* `$name` prints the value entered by the user.

---

## Sample Output

```text
Enter your name:
Malathi

1. Welcome to CareerByteCode DevOps Internship, Malathi
2. Welcome to CareerByteCode DevOps Internship, Malathi
3. Welcome to CareerByteCode DevOps Internship, Malathi
4. Welcome to CareerByteCode DevOps Internship, Malathi
5. Welcome to CareerByteCode DevOps Internship, Malathi
```

---

## Real Example

A company can use a `for` loop in a Bash script to repeatedly display a welcome message, send reminders, or perform the same task multiple times for new employees during onboarding or to repeatedly display notifications while testing automation scripts.

---

## Commands to Run

```bash
chmod +x welcome.sh
./welcome.sh
```

## Flow of the Script

```text
        Start
          │
          ▼
 Ask the user to enter a name
          │
          ▼
     Read the name
          │
          ▼
   Start for loop (1 to 5)
          │
          ▼
Display:
"Welcome to CareerByteCode
DevOps Internship, <Name>"
          │
          ▼
 Repeat until 5 iterations
          │
          ▼
         End
```

---


## Summary Table

| Component         | Purpose                                                    |
| ----------------- | ---------------------------------------------------------- |
| `#!/bin/bash`     | Specifies that the script should run using the Bash shell. |
| `read name`       | Accepts the user's name as input.                          |
| `for i in {1..5}` | Repeats the loop five times.                               |
| `echo`            | Displays the welcome message.                              |
| `$name`           | Prints the name entered by the user.                       |


---

### Q19.
Research any **two popular Linux distributions** used in cloud environments. Explain their features and where they are commonly used.

### Answer

# 1. Ubuntu Server

## Purpose

**Ubuntu Server** is one of the most popular Linux distributions used for cloud computing, web hosting, virtualization, and DevOps. It is developed by **Canonical Ltd.** and is known for its ease of use, stability, and long-term support (LTS) releases.

### Features

* Free and open-source.
* Long Term Support (LTS) versions receive security updates for **5 years**.
* Large software repository with thousands of packages.
* Easy package management using `apt`.
* Excellent support for Docker, Kubernetes, and cloud platforms.
* Beginner-friendly and widely used in DevOps environments.

### Common Uses

* Cloud servers
* Web hosting
* Virtual machines
* Docker and Kubernetes
* DevOps and CI/CD pipelines

### Real Example

A company can deploy an **Ubuntu Server** virtual machine on **AWS**, **Microsoft Azure**, or **Google Cloud Platform (GCP)** to host a web application or run containerized applications using Docker.

---

# 2. Red Hat Enterprise Linux (RHEL)

## Purpose

**Red Hat Enterprise Linux (RHEL)** is a commercial Linux distribution developed by **Red Hat**. It is widely used in enterprise environments because of its reliability, security, and professional support.

### Features

* Enterprise-grade stability and security.
* Commercial support from Red Hat.
* Regular security updates and patches.
* Uses the `dnf` package manager.
* Certified for many enterprise applications and hardware.
* Excellent support for virtualization and cloud computing.

### Common Uses

* Enterprise servers
* Banking and financial systems
* Government organizations
* Large corporate data centers
* Mission-critical cloud applications

### Real Example

Many banks and large organizations run their production servers on **RHEL** because it provides long-term support, enhanced security, and professional technical support.

---

## Difference Between Ubuntu Server and RHEL

| Feature           | Ubuntu Server              | Red Hat Enterprise Linux (RHEL)          |
| ----------------- | -------------------------- | ---------------------------------------- |
| Developer         | Canonical Ltd.             | Red Hat                                  |
| License           | Free and Open Source       | Commercial (Subscription-based)          |
| Package Manager   | `apt`                      | `dnf`                                    |
| Best For          | Cloud, DevOps, Web Hosting | Enterprise Servers                       |
| Support           | Community + Paid Support   | Professional Enterprise Support          |
| Popular Cloud Use | AWS, Azure, GCP            | AWS, Azure, GCP, Enterprise Data Centers |

---

## Cloud Environment Overview

```text
                    Cloud Platforms
                           │
      ┌────────────────────┴────────────────────┐
      │                                         │
 Ubuntu Server                           RHEL
      │                                         │
 ├─ Web Hosting                        ├─ Enterprise Servers
 ├─ Docker & Kubernetes                ├─ Banking Systems
 ├─ DevOps & CI/CD                     ├─ Government Systems
 ├─ Virtual Machines                   ├─ Data Centers
 └─ Cloud Applications                 └─ Mission-Critical Applications
```

---

## Summary Table

| Distribution  | Package Manager | Main Features                                                               | Common Uses                                              |
| ------------- | --------------- | --------------------------------------------------------------------------- | -------------------------------------------------------- |
| Ubuntu Server | `apt`           | Free, beginner-friendly, LTS support, excellent cloud and container support | Cloud computing, web servers, DevOps, Docker, Kubernetes |
| RHEL          | `dnf`           | Enterprise security, stability, commercial support                          | Enterprise servers, banking, government, data centers    |

---

### Commands

Although you may not have both distributions installed, you can identify your current Linux distribution using:

```bash
cat /etc/os-release
```

Example Output (Ubuntu):

```text
PRETTY_NAME="Ubuntu 24.04 LTS"
NAME="Ubuntu"
VERSION="24.04 LTS"
ID=ubuntu
```





---

### Q20.
Create a GitHub repository named **week1-practice-set3** and upload:
- Linux command practice
- Two Bash shell scripts
- A well-formatted README.md
- Minimum **5 Git commits**
- Screenshots of your terminal output

### Answer

For your assessment, keep the answers concise and include your repository link.

### Q19. Research any two popular Linux distributions used in cloud environments. Explain their features and where they are commonly used.

**Answer:**

### 1. Ubuntu Server

**Features:**

* Open-source and user-friendly.
* Long Term Support (LTS) versions provide updates for 5 years.
* Large software repository and community support.
* Supports Docker, Kubernetes, and cloud platforms.

**Common Uses:**

* Web servers
* Application servers
* Cloud Virtual Machines (AWS, Azure, Google Cloud)
* DevOps and CI/CD environments

---

### 2. Red Hat Enterprise Linux (RHEL)

**Features:**

* Enterprise-grade Linux distribution.
* High security and stability.
* Long-term support with regular security updates.
* Certified for enterprise applications.

**Common Uses:**

* Enterprise servers
* Banking and financial systems
* Government organizations
* Production cloud environments

---

### Summary Table

| Linux Distribution              | Key Features                          | Common Uses                                     |
| ------------------------------- | ------------------------------------- | ----------------------------------------------- |
| Ubuntu Server                   | Open-source, LTS support, easy to use | Cloud VMs, Web Servers, DevOps                  |
| Red Hat Enterprise Linux (RHEL) | Enterprise support, secure, stable    | Enterprise servers, Banking, Production systems |

---

## Q20. Create a GitHub repository named `week1-practice-set3` and upload the required files.

**Answer:**

GitHub Repository:

**[https://github.com/shettymalathib/week1-practice-set3](https://github.com/shettymalathib/week1-practice-set3)**

The repository contains:

* Linux command practice documentation
* Bash shell scripts
* A well-formatted `README.md`
* More than 5 meaningful Git commits
* Screenshots of terminal output demonstrating Linux commands and Bash scripts

### Repository Structure

```text
week1-practice-set3/
│.
├── Practice from file-management scripts
│   ├── file1.txt
│   └── file2.txt
├── README.md
├── linux
│   ├── linux-cheatsheet.md
│   └── linux-commands.md
├── screenshots
│   ├── Linux-commands-1.png
│   ├── Linux-commands-2.png
│   ├── Linux-commands-3.png
│   ├── Linux-commands-4.png
│   ├── Linux-commands-5.png
│   ├── back-up.png
│   ├── create files.png
│   ├── file-management.png
│   ├── git-commit.png
│   └── system-health-script.png
└── scripts
    ├── backup.sh
    ├── file-management.sh
    └── system-health.sh

5 directories, 18 files
```




---

## 🎥 Q21. Self-Speech Video (Mandatory)

Record a **3-minute self-speech video** covering the following:

- Introduce yourself.
> Hello everyone. My name is Malathi Shetty. I am currently participating in the CareerByteCode DevOps Internship. I am excited to learn DevOps tools and technologies through practical assignments and hands-on exercises. This is my first week of the internship, and I have learned many new concepts related to Linux, Git, GitHub, and Bash scripting.
- Share what you learned during the first week.
> During the first week, I learned the Linux file system, commonly used Linux commands, file and directory management, permissions, and navigation using the terminal. I also learned how to write simple Bash shell scripts, such as a multiplication table script, a leap year checker, a backup script, and a system health script.
- Which Linux command did you use the most?
> The Linux commands I used the most were ls, cd, pwd, mkdir, touch, cp, mv, rm, and git commands while working on my assignments. I especially used ls and pwd very frequently to check my current directory and files.
- Which Git concept did you understand well?
> The Git concept I understood well was branching. I learned how to create a new branch, switch between branches, commit changes, and push a branch to GitHub. I also understood the difference between a local repository and a remote repository.
- What additional concept did you learn by exploring on your own?
> Apart from the training material, I explored additional Linux commands. I also learned how to create backup scripts, monitor system information, and organize project files using a proper folder structure and a README file.
- What are your goals for the upcoming weeks?
> In the upcoming weeks, my goal is to improve my Linux skills, become more confident with Git and GitHub, learn Docker, Kubernetes, and CI/CD pipelines, and gain practical knowledge that will help me become a DevOps Engineer. Thank you. I am looking forward to learning more during this internship.

---

**Best of Luck! 🚀**  
**CareerByteCode DevOps Internship**
