# 🐚 Bash Shell Scripting Cheat Sheet

A quick-reference Bash Shell Scripting guide for:

* Linux Administrators
* DevOps Engineers
* SREs
* Cloud Engineers
* Support Engineers
* Interview Preparation

---

# 1. What is Shell Scripting?

Shell scripting is writing Linux commands in a file and executing them automatically.

Benefits:

* Automation
* Reusability
* Faster administration
* Reduced manual effort

---

# 2. Shebang
The full form of BASH is Bourne Again SHell
```bash
#!/bin/bash
```

Specifies which interpreter executes the script.

---

# 3. Variables
A variable in Bash scripting is a temporary storage location that holds a value, such as a piece of text or a number.
```bash
name="Linux"
version=9

echo $name
echo $version
```

---

# 4. User Input

```bash
read -p "Enter Name: " name

echo "Hello $name"
```

---

# 5. Command Line Arguments
| Variable | Description |
| -------- | ----------- |
| `$1` | Represents the first argument passed to the script. |
| `$2` | Represents the second argument passed to the script. |
| `$#` | Represents the total number of arguments passed to the script. |

```bash
#!/bin/bash
echo "First parameter (\$1)  : $1"
echo "Second parameter (\$2) : $2"
echo "Third parameter (\$3)  : $3"
echo "Total count (\$#)      : $#"
```

Run:

```bash
./script.sh John Admin
```

---

# 6. Special Variables

| Variable    | Meaning                           | Example               |
| ----------- | --------------------------------- | --------------------- |
| `$0`        | Script name                       | `echo $0`             |
| `$1`        | First argument                    | `echo $1`             |
| `$2`        | Second argument                   | `echo $2`             |
| `$#`        | Number of arguments               | `echo $#`             |
| `$*`        | All arguments                     | `echo $*`             |
| `$@`        | All arguments individually        | `echo "$@"`           |
| `$$`        | Current PID                       | `echo $$`             |
| `$!`        | Background PID                    | `sleep 60 &; echo $!` |
| `$?`        | Previous command status           | `echo $?`             |
| `$_`        | Last argument of previous command | `mkdir test; echo $_` |
| `$HOME`     | Home directory                    | `echo $HOME`          |
| `$USER`     | Current user                      | `echo $USER`          |
| `$PWD`      | Current directory                 | `echo $PWD`           |
| `$HOSTNAME` | Hostname                          | `echo $HOSTNAME`      |
| `$RANDOM`   | Random number                     | `echo $RANDOM`        |
| `$LINENO`   | Current line number               | `echo $LINENO`        |

---

# 7. Command Substitution
Command substitution is a feature in Bash that allows you to run a command and save its output directly into a variable or use it inside another command.

```bash
today=$(date)

echo $today
```

Old syntax:

```bash
today=`date`
```

---

# 8. Arithmetic Operations
An arithmetic operation in Bash is a mathematical calculation performed on integers (whole numbers) using specific built-in syntax like (( )) or $(( )).

```bash
a=10
b=20

sum=$((a+b))

echo $sum
```

---

# 9. String Operations
A string operation in Bash is any action used to manipulate, modify, measure, or extract text data.
Length:

```bash
echo ${#name}
```

Substring:

```bash
echo ${name:0:5}
```

Replace:

```bash
echo ${name/Linux/Unix}
```

Uppercase:

```bash
echo ${name^^}
```

Lowercase:

```bash
echo ${name,,}
```

---



# 10. Conditions
A condition in Bash is a logical test used to determine whether a specific state or rule is true or false.
## If

```bash
if [ $a -gt 10 ]
then
    echo "True"
fi
```

## If Else

```bash
if [ $a -gt 10 ]
then
    echo "Valid"
else
    echo "Invalid"
fi
```

## If Elif Else

```bash
if [ $marks -ge 90 ]
then
    echo "A"
elif [ $marks -ge 70 ]
then
    echo "B"
else
    echo "C"
fi
```

---

# 11. Comparison Operators
A comparison operator in Bash is a symbol or keyword used inside a condition to evaluate the relationship between two values.

## Numeric

| Operator | Meaning          |
| -------- | ---------------- |
| `-eq`    | Equal            |
| `-ne`    | Not Equal        |
| `-gt`    | Greater Than     |
| `-lt`    | Less Than        |
| `-ge`    | Greater or Equal |
| `-le`    | Less or Equal    |

## String

| Operator | Meaning   |
| -------- | --------- |
| `=`      | Equal     |
| `!=`     | Not Equal |
| `-z`     | Empty     |
| `-n`     | Not Empty |

---

# 12. Logical Operators

```bash
&&   # AND
||   # OR
!    # NOT
```

Example:

```bash
if [ $a -gt 5 ] && [ $b -lt 10 ]
then
    echo "True"
fi
```

---

# 13. Case Statement
A case statement in Bash is a control flow tool used to match a single value against multiple possible patterns.
```bash
case $1 in
start)
    echo "Starting"
    ;;
stop)
    echo "Stopping"
    ;;
*)
    echo "Invalid"
    ;;
esac
```

---

# 14. Loops
A loop in Bash is a control structure that repeats a block of code multiple times automatically. Instead of writing the same line of code over and over, you write it once inside a loop and tell Bash how many times to run it.

## For Loop

```bash
for i in {1..5}
do
    echo $i
done
```

## While Loop

```bash
while read line
do
    echo $line
done < file.txt
```

## Until Loop

```bash
until [ $count -gt 5 ]
do
    echo $count
done
```

---

# 15. Break & Continue

break and continue are loop control statements used in Bash scripting to alter the execution flow of for, while, or until loops based on specific conditions.

```bash
break
continue
```

# 1. The `break` Statement

The `break` statement immediately terminates the current loop and transfers control to the first command after the loop.

## Syntax

```bash
break
```
---
## Example 1: Exit a Loop

```bash
#!/bin/bash

for i in {1..10}
do
    if [ "$i" -eq 5 ]; then
        break
    fi

    echo "Number: $i"
done

echo "Loop Finished"
```

### Output

```text
Number: 1
Number: 2
Number: 3
Number: 4
Loop Finished
```

---

## Real-World Example: Wait for a Service

A deployment script waits until a service becomes available before proceeding.

```bash
#!/bin/bash

while true
do
    if curl -s http://localhost:8080 > /dev/null
    then
        echo "Service is up!"
        break
    fi

    echo "Waiting for service..."
    sleep 2
done

echo "Continuing deployment..."
```

### Explanation

- Continuously checks whether the service is available.
- Once the service responds successfully, `break` exits the loop.
- The deployment script continues with the next steps.

---

# 2. The `continue` Statement

The `continue` statement skips the remaining commands in the current iteration and immediately starts the next iteration of the loop.

## Syntax

```bash
continue
```



## Example 1: Skip One Iteration

```bash
#!/bin/bash

for i in {1..5}
do
    if [ "$i" -eq 3 ]; then
        continue
    fi

    echo "Number: $i"
done
```

### Output

```text
Number: 1
Number: 2
Number: 4
Number: 5
```

---

## Real-World Example: Skip a User

Skip processing a specific user during a configuration task.

```bash
#!/bin/bash

for user in admin guest bob alice
do
    if [ "$user" == "guest" ]; then
        continue
    fi

    echo "Configuring environment for $user"
done
```

### Output

```text
Configuring environment for admin
Configuring environment for bob
Configuring environment for alice
```

### Explanation

- The `guest` user is ignored.
- The remaining users are processed normally.

---

# `break` vs `continue`

| Feature | `break` | `continue` |
|----------|----------|------------|
| Exits the loop | ✅ Yes | ❌ No |
| Skips current iteration | ❌ No | ✅ Yes |
| Continues remaining iterations | ❌ No | ✅ Yes |
| Stops loop completely | ✅ Yes | ❌ No |
| Common use case | Stop when a condition is met | Skip unwanted data |

---

# Common DevOps Use Cases

## `break`

- Wait for a service to become healthy.
- Stop checking once a file exists.
- Exit after finding the required resource.
- End polling after success.

### Example

```bash
while true
do
    if kubectl get pods | grep Running
    then
        echo "Application is running."
        break
    fi

    sleep 5
done
```

---

## `continue`

- Skip empty files.
- Ignore specific users.
- Skip failed servers and continue processing.
- Ignore commented lines in configuration files.

### Example

```bash
for server in server1 server2 server3
do
    if [ "$server" == "server2" ]; then
        continue
    fi

    echo "Deploying application on $server"
done
```

---

# Quick Reference

| Statement | Action | Typical Use Case |
|-----------|--------|------------------|
| `break` | Exits the loop immediately | Stop after finding the required result |
| `continue` | Skips the current iteration | Ignore specific items and continue processing |

---

# Best Practices

- Use `break` when no further loop iterations are required.
- Use `continue` to skip invalid or unnecessary data.
- Avoid deeply nested loop control statements.
- Keep loop conditions simple and readable.
- Add comments when using `break` or `continue` in complex scripts.
- Test loops with different input scenarios before using them in production.

---

# Summary

| Statement | Description |
|-----------|-------------|
| `break` | Immediately exits the current loop and continues execution after the loop. |
| `continue` | Skips the rest of the current iteration and starts the next iteration of the loop. |

---

# 16. Functions
A function in Bash is a reusable block of code designed to perform a specific task. Instead of writing the exact same code multiple times throughout your script, you group it into a function, give it a name, and call that name whenever you need it.

```bash
greet() {
    echo "Hello $1"
}

greet John
```

Return Value:

```bash
sum() {
    echo $(($1+$2))
}

result=$(sum 10 20)
```

---

# 17 File Handling

Create:

```bash
touch file.txt
```

Read:

```bash
cat file.txt
```

Append:

```bash
echo "Hello" >> file.txt
```


---

# 18. File Test Operators

| Operator | Description      |
| -------- | ---------------- |
| `-f`     | File Exists      |
| `-d`     | Directory Exists |
| `-r`     | Readable         |
| `-w`     | Writable         |
| `-x`     | Executable       |
| `-s`     | Not Empty        |

---

# 19. Redirection

```bash
>       # Overwrite
>>      # Append
<       # Input
2>      # Error
2>&1    # Merge stdout/stderr
```

Examples:

```bash
ls > files.txt
date >> log.txt
```

---

# 20. Pipes

```bash
cat file.txt | grep error
```

---

# 21. Regular Expressions

```bash
#!/bin/bash
email=$1
if [[ $email =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]
then
    echo "Valid"
fi
```

---

# 22. Here Document

```bash
cat << EOF
Hello
Linux
EOF
```
```bash
cat > test.txt << EOF
Hello
Linux
EOF
```
---

# 23. Here String

```bash
grep root <<< "root admin user"
```
```bash
grep -o root <<< "root admin user"
```
---


# 27. Process Management

```bash
./script.sh &
wait
kill PID
echo $$
```

---

# 28. Exit Codes

```bash
echo $?
exit 0
```

Common:

```text
0   Success
1   Error
127 Command Not Found
```

---

# 29. Logging

```bash
echo "$(date) Script Started" >> script.log
```

---

# 30. Cron Jobs

Edit:

```bash
crontab -e
```

Example:

```bash
0 2 * * * /home/user/backup.sh
```

---

# 31. Debugging

```bash
bash -x script.sh

set -x
set +x
```

---

# 32. Error Handling

```bash
set -e
set -u
set -o pipefail

set -euo pipefail
```

---

# 33. History Expansion

| Command   | Description            |
| --------- | ---------------------- |
| `history` | Show history           |
| `!!`      | Previous command       |
| `!100`    | Run command #100       |
| `!grep`   | Last grep command      |
| `!$`      | Last argument          |
| `!*`      | All previous arguments |

---

# 34. Special Characters & Operators

| Symbol | Meaning                  |      |    |
| ------ | ------------------------ | ---- | -- |
| `$`    | Variable                 |      |    |
| `#`    | Comment                  |      |    |
| `;`    | Command separator        |      |    |
| `:`    | Null command             |      |    |
| `.`    | Current directory/source |      |    |
| `..`   | Parent directory         |      |    |
| `~`    | Home directory           |      |    |
| `*`    | Wildcard                 |      |    |
| `?`    | Single-char wildcard     |      |    |
| `{}`   | Group commands           |      |    |
| `()`   | Subshell                 |      |    |
| `[]`   | Test condition           |      |    |
| `[[]]` | Advanced condition       |      |    |
| `      | `                        | Pipe |    |
| `>`    | Redirect                 |      |    |
| `>>`   | Append                   |      |    |
| `<`    | Input redirect           |      |    |
| `&&`   | AND                      |      |    |
| `      |                          | `    | OR |
| `&`    | Background               |      |    |
| `!`    | Negation/history         |      |    |

---

# 35. Production Script Template

```bash
#!/bin/bash

set -euo pipefail

LOG_FILE="/tmp/script.log"

log() {
    echo "$(date '+%F %T') : $1" | tee -a "$LOG_FILE"
}

log "Script Started"

# Adding '|| true' prevents set -e from killing the script when Nginx is stopped
if systemctl is-active nginx >/dev/null || true
then
    # We must manually verify the state since the condition itself won't catch the failure status anymore
    if systemctl is-active --quiet nginx; then
        log "Nginx Running"
    else
        log "Nginx Not Running"
    fi
fi

log "Script Completed"

```

---

# 36. Common Real-World Scripts

Disk Usage:

```bash
#!/bin/bash
set -euo pipefail

# Capture the percentage number safely
usage=$(df --output=pcent / | awk 'NR==2 {print $1}' | tr -d '%')

# Using double parentheses prevents strict mode from crashing when usage is under 80
if (( usage > 80 )); then
    echo "Disk Critical: Current usage is ${usage}%"
else
    echo "Disk OK: Current usage is ${usage}%"
fi
```

Top Memory Processes:

```bash
ps aux --sort=-%mem | head
```

Top CPU Processes:

```bash
ps aux --sort=-%cpu | head
```

Failed Login Count:

```bash
grep "Failed" /var/log/auth.log | wc -l
```

Top IPs:

```bash
awk '{print $1}' access.log | sort | uniq -c | sort -nr | head
```

---

