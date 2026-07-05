# Linux Basics & Troubleshooting Commands

A quick reference guide for Linux beginners, System Administrators, DevOps Engineers, and Support Engineers.

---

# What is Linux?

Linux is an open-source operating system based on Unix. It acts as an interface between computer hardware and software applications. Linux is widely used in servers, cloud environments, networking devices, embedded systems, and desktop computers due to its stability, security, and flexibility.

## Linux Architecture

```text
+---------------------+
|   Applications      |
+---------------------+
|       Shell         |
+---------------------+
|      Kernel         |
+---------------------+
|      Hardware       |
+---------------------+
```

### Main Components

- **Kernel** – Core of the operating system that manages hardware resources.
- **Shell** – Command-line interpreter that executes user commands.
- **Filesystem** – Organizes files and directories.
- **Applications** – Programs that run on Linux.

---

# Basic Linux Commands

## Navigation Commands
Navigation commands in Linux are text-based instructions used to move through directories, view the folder hierarchy, and locate files within the file system via the command-line interface (CLI).

| Command | Description |
|----------|------------|
| `pwd` | Show current directory |
| `ls` | List files and directories |
| `ls -l` | Detailed listing |
| `ls -la` | Show hidden files |
| `cd <dir>` | Change directory |
| `cd ..` | Move one level up |
| `cd ~` | Go to home directory |

### Example

```bash
pwd
ls -la
cd /var/log
```

---

## File Management Commands
File management commands in Linux are terminal-based utilities used to create, organize, modify, view, and delete files and directories within the operating system

| Command | Description |
|----------|------------|
| `touch file.txt` | Create a file |
| `cat file.txt` | Display file content |
| `less file.txt` | View large files |
| `cp src dest` | Copy file |
| `mv src dest` | Move/Rename file |
| `rm file.txt` | Remove file |
| `rm -rf folder` | Remove directory recursively |
| `mkdir folder` | Create directory |
| `rmdir folder` | Remove empty directory |

### Example

```bash
touch demo.txt
cat demo.txt
cp demo.txt backup.txt
mv backup.txt newfile.txt
```

---

## File Search Commands
In Linux, file search commands are terminal utilities used to locate files, directories, or specific text across the system based on properties like name, size, type, or content

| Command | Description |
|----------|------------|
| `find` | Search files and directories |
| `locate` | Fast file search |
| `which` | Find command path |
| `whereis` | Locate binary/source/man page |

### Example

```bash
find / -name "*.log"
which python3
whereis ssh
```

---

## Text Processing Commands
Text processing commands in Linux are built-in command-line utilities used to search, filter, modify, rearrange, and extract data from text files or command outputs

| Command | Description |
|----------|------------|
| `grep` | Search text patterns |
| `sort` | Sort lines |
| `uniq` | Remove duplicates |
| `wc` | Count lines, words, characters |
| `cut` | Extract columns |
| `awk` | Pattern scanning and processing |
| `sed` | Stream editor |

### Example

```bash
grep "error" app.log
wc -l app.log
awk '{print $1}' file.txt
```

---

## User Commands
In Linux, user commands are programs or utilities that regular, non-administrative users can run from the terminal to interact with the operating system, manage files, check system status, and verify account identities

| Command | Description |
|----------|------------|
| `whoami` | Current user |
| `who` | Logged-in users |
| `id` | User and group information |
| `passwd` | Change password |
| `su` | Switch user |
| `sudo` | Execute as root |

### Example

```bash
whoami
id
sudo systemctl restart nginx
```

---

## Permissions Commands
Permissions in Linux are security settings that dictate who can view, modify, or execute files and directories. They form the core security foundation of the operating system, ensuring that only authorized users or processes can access specific system data and applications.

### The Three Classes of Users

Linux tracks three distinct levels of authorization for every single file and directory on the system:
- User (u): The individual account that owns the file.
- Group (g): A collection of users who share identical access privileges to the file.
- Others (o): Any account on the system that is not the owner and does not belong to the assigned group (often referred to as "the world").

### Permission Basic Types

| Symbol | Meaning |
|---------|---------|
| `r` | Read |
| `w` | Write |
| `x` | Execute |

### Common Commands

| Command | Description |
|----------|------------|
| `chmod` | Change permissions |
| `chown` | Change ownership |
| `chgrp` | Change group ownership |

### Example

```bash
chmod 755 script.sh
chmod 644 file.txt
chown user:user file.txt
```

---

## Archive & Compression Commands
Archive and compression commands are tools used in computer terminal interfaces (like Linux, macOS, or Unix) to group multiple files together and make them take up less disk space.

| Command | Description |
|----------|------------|
| `tar -cvf` | Create archive |
| `tar -xvf` | Extract archive |
| `gzip` | Compress file |
| `gunzip` | Uncompress file |
| `zip` | Create ZIP archive |
| `unzip` | Extract ZIP archive |

### Example

```bash
tar -cvf backup.tar folder/
tar -xvf backup.tar
```

---

## Network Commands
Networking commands are terminal instructions used to manage, troubleshoot, and analyze network connections on a computer.

| Command | Description |
|----------|------------|
| `ping` | Test connectivity |
| `ip addr` | Show IP addresses |
| `ip route` | Show routing table |
| `ss -tulnp` | Show listening ports |
| `curl` | Send HTTP requests |
| `wget` | Download files |

### Example

```bash
ping google.com
ip addr
curl https://example.com
```

---

## Process Commands
Process commands are terminal instructions used to view, monitor, and manage the active programs running on a computer's operating system.

| Command | Description |
|----------|------------|
| `ps -ef` | List running processes |
| `top` | Real-time process monitoring |
| `kill PID` | Stop process |
| `pkill name` | Kill process by name |
| `jobs` | Show background jobs |
| `bg` | Run in background |
| `fg` | Bring to foreground |

### Example

```bash
ps -ef | grep nginx
kill 1234
while true; do echo "$(date): $(uptime)" >> uptime_continuous.txt; sleep 5; done &
fg %1
```

---

## System Information Commands
System information commands are terminal instructions used to check your computer's hardware specs, operating system details, and resource availability.

| Command | Description |
|----------|------------|
| `uname -a` | OS and kernel details |
| `hostname` | System hostname |
| `uptime` | System uptime |
| `date` | Current date and time |
| `free -h` | Memory usage |
| `df -h` | Disk usage |
| `lsblk` | Block devices |

### Example

```bash
uname -a
free -h
df -h
```

---

## Service Management Commands

| Command | Description |
|----------|------------|
| `systemctl status <service>` | Check service status |
| `systemctl start <service>` | Start service |
| `systemctl stop <service>` | Stop service |
| `systemctl restart <service>` | Restart service |
| `systemctl enable <service>` | Enable at boot |

### Example

```bash
systemctl status nginx
systemctl restart nginx
```

---

# Linux Troubleshooting Commands

## System Health

```bash
uname -a
hostnamectl
uptime
date
```

---

## CPU & Memory Troubleshooting

```bash
top
htop
free -h
vmstat 1
mpstat -P ALL 1
```

---

## Disk Troubleshooting

```bash
df -h
du -sh *
lsblk
fdisk -l
```

---

## Process Troubleshooting

```bash
ps -ef
top
pgrep nginx
kill PID
kill -9 PID
```

---

## Network Troubleshooting

```bash
ip addr
ip route
ping google.com
ss -tulnp
traceroute google.com
nslookup google.com
dig google.com
```

---

## Service Troubleshooting

```bash
systemctl status nginx
systemctl restart nginx
journalctl -u nginx
journalctl -xe
```

---

## Log Analysis

```bash
tail -f /var/log/messages
tail -f /var/log/syslog
grep ERROR app.log
less app.log
```

---

## User Troubleshooting

```bash
who
id username
last
passwd username
```

---

# Quick Troubleshooting Checklist

When a Linux server becomes slow or unresponsive:

```bash
uptime
top
free -h
df -h
vmstat 1
iostat -x 1
ss -tulnp
journalctl -xe
```

### Check

- CPU utilization
- Memory usage
- Disk usage
- Disk I/O wait
- Network connectivity
- Service health
- System logs

---

# Combining Commands with Pipes (|)

A pipe (`|`) sends the output of one command as input to another command.

Syntax:

```bash
command1 | command2
```

---

## 1. Search for a Word and Count Matches

```bash
grep "ERROR" app.log | wc -l
```

Example:
- Find all lines containing "ERROR"
- Count the number of matches

---

## 2. Extract First Column

```bash
cat users.txt | awk '{print $1}'
```

Output:

```text
john
mary
alex
```

---

## 3. Find Unique Values

```bash
cat users.txt | sort | uniq
```

Removes duplicate entries.

---

## 4. Count Unique Values

```bash
cat users.txt | sort | uniq -c
```

Output:

```text
3 john
2 mary
1 alex
```

---

## 5. Find Top 10 Frequent Entries

```bash
cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -10
```

Use case:
- Find top IP addresses accessing a web server.

---

## 6. Search Errors and Show Specific Column

```bash
grep "ERROR" app.log | awk '{print $1}'
```

Displays first column from matching lines.

---

## 7. Show Running Processes for a Service

```bash
ps -ef | grep nginx
```

Shows nginx-related processes.

---

## 8. Count Running Processes

```bash
ps -ef | grep nginx | wc -l
```

Counts matching processes.

---

## 9. Get Usernames from /etc/passwd

```bash
cat /etc/passwd | cut -d':' -f1
```

Output:

```text
root
daemon
bin
sys
```

---

## 10. Find Largest Directories

```bash
du -sh * | sort -hr
```

Sort directories by size.

---

## 11. Find Failed Login Attempts

```bash
grep "Failed" /var/log/auth.log | wc -l
```

Counts failed login attempts.

---

## 12. Display Specific Row and Column

Get row 5 and column 2:

```bash
awk 'NR==5 {print $2}' file.txt
```

---

## 13. Show Last 100 Errors

```bash
grep "ERROR" app.log | tail -100
```

Displays the latest 100 errors.

---

## 14. Search Multiple Keywords

```bash
grep -E "ERROR|WARNING|FAILED" app.log
```

Searches for multiple patterns.

---

## 15. Count Errors by Type

```bash
grep "ERROR" app.log | awk '{print $5}' | sort | uniq -c
```

Useful for log analysis.

---

## 16. Show Open Ports

```bash
ss -tulnp | grep LISTEN
```

Displays listening ports.

---

## 17. Find Services Using Port 80

```bash
ss -tulnp | grep ":80"
```

Shows processes using port 80.

---

## 18. Find Memory-Hungry Processes

```bash
ps aux --sort=-%mem | head -10
```

Shows top memory-consuming processes.

---

## 19. Find CPU-Hungry Processes

```bash
ps aux --sort=-%cpu | head -10
```

Shows top CPU-consuming processes.

---

## 20. Search Recursively and Count Matches

```bash
grep -r "database" /etc | wc -l
```

Counts occurrences of "database" under `/etc`.

---

# Most Common Pipelines Used in Production

## Top IP Addresses

```bash
awk '{print $1}' access.log | sort | uniq -c | sort -nr | head
```

## Count Errors

```bash
grep "ERROR" app.log | wc -l
```

## Find Largest Files

```bash
du -sh * | sort -hr | head
```

## Monitor Logs

```bash
tail -f app.log | grep ERROR
```

## Check Open Ports

```bash
ss -tulnp | grep LISTEN
```

## Find Active Users

```bash
who | awk '{print $1}' | sort | uniq
```

## Get Usernames

```bash
cat /etc/passwd | cut -d':' -f1
```

## Top Memory Consumers

```bash
ps aux --sort=-%mem | head
```

## Top CPU Consumers

```bash
ps aux --sort=-%cpu | head
```

## Count Failed Logins

```bash
grep "Failed" /var/log/auth.log | wc -l
```

# Top 20 Linux Commands Every Engineer Should Know

```bash
pwd
ls -la
cd
mkdir
rm
cp
mv
cat
grep
find
chmod
chown
ps -ef
top
free -h
df -h
ip addr
ping
systemctl
journalctl
```

---

# Useful Linux Shortcuts

| Shortcut | Description |
|-----------|------------|
| `Ctrl + C` | Stop running command |
| `Ctrl + Z` | Suspend process |
| `Ctrl + D` | Logout/Exit shell |
| `Ctrl + L` | Clear screen |
| `Ctrl + R` | Search command history |
| `history` | View command history |

---


