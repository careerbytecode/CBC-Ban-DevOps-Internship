# Linux Command Practice

This file contains Linux commands practiced during Week 1 of the DevOps internship assessment.

## Basic Linux Commands

Display the current date and time:

```bash
date
```

Display the current logged-in user:

```bash
whoami
```

Display the current working directory:

```bash
pwd
```

Clear the terminal screen:

```bash
clear
```

Show command history:

```bash
history
```

Show calendar:

```bash
cal
```

Show specific month:

```bash
cal feb 2026
```

## File and Directory Commands

Create a directory named `training`:

```bash
mkdir training
```

Go inside the directory:

```bash
cd training
```

Create two files:

```bash
touch file1 file2
```

Display files:

```bash
ls
```

Rename one file:

```bash
mv file1 file3
```

Delete the other file:

```bash
rm file2
```

## File Permission Commands

Check file permissions:

```bash
ls -l file3
```

Display detailed file information:

```bash
stat file3
```

Add write permission for the owner:

```bash
chmod u+w file3
```

## File Search Commands

Find a file inside the `/home` directory:

```bash
find /home -name "file3"
```

Find a file using part of its name:

```bash
find /home -name "*file*"
```

Search the whole system:

```bash
sudo find / -name "file3"
```

## Additional Linux Commands Explored

Count lines, words, and characters in a file:

```bash
wc file3
```

Create a symbolic link:

```bash
ln -s file3 shortcut.txt
```

Create a hard link:

```bash
ln file3 hardlink.txt
```

Show detailed file information:

```bash
stat hardlink.txt
```
