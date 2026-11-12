# Day 21 — Week 3 Project: System Health-Check Tool (Bash + Python)

[← Day 20](../day-20/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Tracker](../LEARNING-TRACKER.md) | [Day 22 →](../day-22/README.md)

| | |
|---|---|
| **Phase** | Phase 1 - Foundations |
| **Week** | Week 3 — Bash & Python Automation |
| **Difficulty** | Beginner |
| **Estimated time** | 3.5 hours |

> **Rule for today:** do not just read. Type every command yourself, break things on purpose, fix them, and write down what you learned.

---

## 1. Daily Objectives

By the end of today you must be able to:

- [ ] Deliver a production-style automation tool
- [ ] Combine scripting, testing, documentation
- [ ] Create a reusable repository template

## 2. Prerequisites

- Days 15-20.
- Your lab from [LAB-ENVIRONMENT-SETUP.md](../LAB-ENVIRONMENT-SETUP.md) is running.
- Previous day's work is committed to GitHub.

## 3. Learning Topics

### 3.1 Project brief

Build `healthcheck`: checks CPU, memory, disk, key services, open ports, TLS expiry and HTTP endpoints; outputs human, JSON and Prometheus text formats; returns meaningful exit codes.

### 3.2 Quality bar

README, tests, lint, `--help`, semantic version, CHANGELOG, example systemd timer.

### 3.3 Repo template

Standard layout: `src/`, `tests/`, `docs/`, `Makefile`, `.gitignore`, `.editorconfig`, `LICENSE`.

## 4. Practical Labs

Work through these in order. Record the commands you ran and the output in `lab-notes.md` inside this folder.

1. [ ] Design checks as plugins/functions with a common result structure.
2. [ ] Implement 6 checks and 3 output formats.
3. [ ] Add tests and lint to `make ci`.
4. [ ] Write the systemd timer and sample alert rule.
5. [ ] Tag `v0.1.0`.

## 5. Real-World Scenario

> The SRE team will adopt your tool if it is documented, tested and safe. Prepare a 5-minute demo and a README for onboarding.

**Your task:** solve it in your lab, document the steps, the commands, what you verified, and what could go wrong in production.

## 6. Commands & Scripts

Type these yourself and adapt names/paths to your lab. Lines starting with `#` (or `//`) explain the step that follows. Review every command before running it; replace placeholders such as `<PID>`, `$VPC`, `USER`.

```bash
make setup lint test
./healthcheck --format json | jq .
./healthcheck --format prometheus
git tag -a v0.1.0 -m "first release" && git push --tags
systemctl cat healthcheck.timer
```

## 7. Extended Hands-On Practice & Reference Notes

Extra exercises, worked solutions, cheat sheets and runbooks for today's topic. Work through them after the core labs in Section 4 and the commands in Section 6.

### 7.1 Day 21 – Shell Scripting Cheat Sheet: Build Your Own Reference Guide

#### Task

You've spent the last several days learning Shell scripting — from basics to real-world projects. Now it's time to consolidate everything into a **personal cheat sheet** that you can use as a quick-reference guide for the rest of your DevOps journey.

The best way to revise is to **teach it back**. Writing a cheat sheet forces you to organize your understanding and identify gaps.

---

#### Expected Output
- A markdown file: `shell_scripting_cheatsheet.md`

---

#### Challenge Tasks

##### Task 1: Basics
Document the following with short descriptions and examples:
1. Shebang (`#!/bin/bash`) — what it does and why it matters
2. Running a script — `chmod +x`, `./script.sh`, `bash script.sh`
3. Comments — single line (`#`) and inline
4. Variables — declaring, using, and quoting (`$VAR`, `"$VAR"`, `'$VAR'`)
5. Reading user input — `read`
6. Command-line arguments — `$0`, `$1`, `$#`, `$@`, `$?`

---

##### Task 2: Operators and Conditionals
Document with examples:
1. String comparisons — `=`, `!=`, `-z`, `-n`
2. Integer comparisons — `-eq`, `-ne`, `-lt`, `-gt`, `-le`, `-ge`
3. File test operators — `-f`, `-d`, `-e`, `-r`, `-w`, `-x`, `-s`
4. `if`, `elif`, `else` syntax
5. Logical operators — `&&`, `||`, `!`
6. Case statements — `case ... esac`

---

##### Task 3: Loops
Document with examples:
1. `for` loop — list-based and C-style
2. `while` loop
3. `until` loop
4. Loop control — `break`, `continue`
5. Looping over files — `for file in *.log`
6. Looping over command output — `while read line`

---

##### Task 4: Functions
Document with examples:
1. Defining a function — `function_name() { ... }`
2. Calling a function
3. Passing arguments to functions — `$1`, `$2` inside functions
4. Return values — `return` vs `echo`
5. Local variables — `local`

---

##### Task 5: Text Processing Commands
Document the most useful flags/patterns for each:
1. `grep` — search patterns, `-i`, `-r`, `-c`, `-n`, `-v`, `-E`
2. `awk` — print columns, field separator, patterns, `BEGIN/END`
3. `sed` — substitution, delete lines, in-place edit
4. `cut` — extract columns by delimiter
5. `sort` — alphabetical, numerical, reverse, unique
6. `uniq` — deduplicate, count
7. `tr` — translate/delete characters
8. `wc` — line/word/char count
9. `head` / `tail` — first/last N lines, follow mode

---

##### Task 6: Useful Patterns and One-Liners
Include at least 5 real-world one-liners you find useful. Examples:
- Find and delete files older than N days
- Count lines in all `.log` files
- Replace a string across multiple files
- Check if a service is running
- Monitor disk usage with alerts
- Parse CSV or JSON from command line
- Tail a log and filter for errors in real time

---

##### Task 7: Error Handling and Debugging
Document with examples:
1. Exit codes — `$?`, `exit 0`, `exit 1`
2. `set -e` — exit on error
3. `set -u` — treat unset variables as error
4. `set -o pipefail` — catch errors in pipes
5. `set -x` — debug mode (trace execution)
6. Trap — `trap 'cleanup' EXIT`

---

##### Task 8: Bonus — Quick Reference Table
Create a summary table like this at the top of your cheat sheet:

| Topic | Key Syntax | Example |
|-------|-----------|---------|
| Variable | `VAR="value"` | `NAME="DevOps"` |
| Argument | `$1`, `$2` | `./script.sh arg1` |
| If | `if [ condition ]; then` | `if [ -f file ]; then` |
| For loop | `for i in list; do` | `for i in 1 2 3; do` |
| Function | `name() { ... }` | `greet() { echo "Hi"; }` |
| Grep | `grep pattern file` | `grep -i "error" log.txt` |
| Awk | `awk '{print $1}' file` | `awk -F: '{print $1}' /etc/passwd` |
| Sed | `sed 's/old/new/g' file` | `sed -i 's/foo/bar/g' config.txt` |

---

#### Format Guidelines

Your cheat sheet should be:
- Written in **Markdown** (`.md`)
- Organized with **clear headings** for each section
- Include **code blocks** with syntax highlighting (` ```bash `)
- Keep explanations **short** — 1-2 lines max per item
- Focus on **practical examples** over theory
- Something **you would actually refer back to** on the job

---

#### Submission
1. Add your `shell_scripting_cheatsheet.md` to `2026/day-21/`
2. Commit and push to your fork

---

#### Learn in Public

Share your cheat sheet on LinkedIn — help others revise too!

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

---

### 7.2 Day 21 – Shell Scripting Cheat Sheet

A practical quick-reference guide covering Bash basics, conditionals, loops, functions, text processing, DevOps one-liners, and error handling.

---

| Topic           | Key Syntax              | Example                                       |
| --------------- | ----------------------- | --------------------------------------------- |
| Make Executable | `chmod +x file.sh`      | `chmod +x script.sh`                          |
| Run Script      | `./file.sh`             | `./script.sh`                                 |
| Comment         | `# comment`             | `echo "Hi" # inline comment`                  |
| Variable        | `VAR="value"`           | `NAME="DevOps"`                               |
| Use Variable    | `$VAR`                  | `echo $NAME`                                  |
| Read Input      | `read VAR`              | `read USER`                                   |
| Arguments       | `$1 $2 $# $@ $?`        | `./script.sh arg1`                            |
| String Compare  | `[ "$a" = "$b" ]`       | `[ "$name" = "Linux" ]`                       |
| Integer Compare | `[ $a -gt 10 ]`         | `[ $num -eq 5 ]`                              |
| File Test       | `[ -f file ]`           | `[ -d /home ]`                                |
| If Condition    | `if [ cond ]; then`     | `if [ -f file ]; then echo OK; fi`            |
| Case Statement  | `case $v in ... esac`   | `case $1 in start) echo run ;; esac`          |
|  AND            | `cmd1 && cmd2`          | `mkdir test && cd test`                       |
|   OR            | `cmd1 \|\| cmd2`        | `cd dir \|\| pwd`                             |
| For Loop        | `for i in list; do`     | `for i in 1 2 3; do echo $i; done`            |
| C-Style For     | `for ((i=1;i<=3;i++))`  | `for ((i=1;i<=3;i++)); do touch f$i; done`    |
| While Loop      | `while [ cond ]; do`    | `while [ $a -lt 5 ]; do echo $a; done`        |
| Until Loop      | `until [ cond ]; do`    | `until ping -c1 google.com; do sleep 2; done` |
| Break           | `break`                 | `if [ $i -eq 5 ]; then break; fi`             |
| Continue        | `continue`              | `if [ $i -eq 2 ]; then continue; fi`          |
| Function        | `name() { ... }`        | `greet(){ echo "Hi"; }`                       |
| Function Arg    | `$1 inside function`    | `add(){ echo $(($1+$2)); }`                   |
| Return Status   | `return 0`              | `return 1`                                    |
| Capture Output  | `result=$(func)`        | `val=$(date)`                                 |
| Local Variable  | `local var=value`       | `local count=10`                              |
| grep            | `grep pattern file`     | `grep -i "error" log.txt`                     |
| awk             | `awk '{print $1}' file` | `awk -F: '{print $1}' /etc/passwd`            |
| sed             | `sed 's/a/b/g' file`    | `sed -i 's/foo/bar/g' file.txt`               |
| cut             | `cut -d: -f1 file`      | `cut -d: -f1 /etc/passwd`                     |
| sort            | `sort file`             | `sort -n numbers.txt`                         |
| uniq            | `sort file \| uniq`     | `sort file \| uniq -c`                        |
| tr              | `tr 'a-z' 'A-Z'`        | `echo hi \| tr 'a-z' 'A-Z'`                   |
| wc              | `wc -l file`            | `wc -w file.txt`                              |
| head            | `head -n 5 file`        | `head -n 10 log.txt`                          |
| tail            | `tail -f file`          | `tail -f app.log`                             |


#### Task 1: Basics

#### 1.Shebang(#!/bin/bash)
-  **What it does**: The shebang tells the system which shell to use to execute the script.
- **Why it matters**: Without it,the script will run with the default shell and might not work correctly
- **Example**:
    ```bash
    #!/bin/bash
    echo "Hello, world!"
    ```

#### 2.Running a script:
- `chmod +x script.sh`: Make the script executable.
- `./script.sh`: Run the script. The system uses the shebang (`#!/bin/bash`) to choose the shell. If there is no shebang, it uses the current shell.
- `bash script.sh`: Run the script directly with Bash, ignoring the shebang.


#### 3.Comments: 
- Comments are notes that you add to explain what your code does.The script ignores comments,but they are essential for making scripts easier to read and  maintain for yourself and others.

- **Single-line comments start with #. Inline comments come after a command.**
- **Exmaple**:
    ```bash
    # This is a single-line comment
    echo "Hello"  # This prints Hello(Inline comment)
    ```
- **This is a multi-line comment. It can span several lines.**
- **Example**:
```bash
<<'COMMENT'
Hi This is Amit as a devops engineer.
Learning a Josh-10 batch with Trainwaithshubham.
COMMENT
```

echo "This is after the comment block."


#### 4.Variables:
- **Declaring**: Store a value in a name (no spaces around =)
- **Example**: 
    ```bash
        NAME="Amit"
    ```
- **Using**: Add `$` before the variable name to get its value.
- **Example**:
    ```bash
    echo $NAME # Prints Amit
    ```
- **Quoting**:
 - **Double quotes " "**: Variable is replaced with its value.
    ```bash
    echo "Hello $NAME"   # Prints Hello Amit
    ```
 - **Single quotes ' '** : Variable is not replaced.
    ```bash
    echo 'Hello $NAME'   # Prints Hello $NAME literally
    ```

#### 5.Reading user input:
- The read command reads user input from standard input and stores it in a variable.
- **Example**:
    ```bash
    echo "Enter your name:"
    read NAME
    echo "Hello, $NAME!"
    ```

#### 6.Command-line arguments:

- $0: Script name	
- $1: First argument	
- $#: Number of arguments	
-  $@: All arguments	
- $?: Last command status

 ```bash
    #!/bin/bash
    # Show script name and arguments
    echo "Script name: $0"
    echo "First argument: $1"
    echo "Total arguments: $#"
    echo "All arguments: $@"

    ls /sanket                              # This directory does not exist
    echo "Exit status of last command: $?"  # Non-zero means(2) command failed

    ls /tmp                                 # This directory exists
    echo "Exit status of last command: $?"  # 0 means command succeeded

    ./script.sh                             # $0 = script.sh, no arguments
    ./script.sh Amit                      # $1 = Amit, $# = 1, $@ = Amit
    ./script.sh a b c                       # $1 = a, $# = 3, $@ = a b c
```

 # Task 2: Operators and Conditionals

#### 1.String Comparisons:
-  **= (Equal)**           : Checks if two strings are exactly the same.
-  **!= (Not equal)**      : Checks if two strings are different.
-  **-z (Zero Length)**    : Checks if a string is empty (its length is zero).
- **-n (Not Zero Length)** : Checks if a string is not empty (contains characters).
    ```bash
    name="Linux"
    [ "$name" = "Linux" ]

    name="Linux"
    [ "$name" != "Ubuntu" ]

    empty=""
    [ "$name" -z "$empty" ]

    name="Linux"
    [ "$name" -n "$name" ]
    ```
#### 2.Integer comparisons  
- **-eq (Equal)**            : Checks if two numbers are equal.
- **ne (Not equal)**         : Checks if two numbers are not equal.
- **-lt (Less than)**        : Checks if the first number is less than the second.
- **-gt (Greater than)**     : Checks if the first number is greater than the second.
- **-le (Less or equal)**    :  Checks if the first number is less than or equal to the second.
- **-ge (Greater or equal)** : Checks if the first number is greater than or equal to the second.

    ```bash
    a=10
    b=10
    [ $a -eq $b ]

    a=10
    b=20
    [ $a -ne $b ]

    a=5
    b=10
    [ $a -lt $b ]

    a=15
    b=10
    [ $a -gt $b ]

    a=10
    b=10
    [ $a -le $b ]

    a=20
    b=10
    [ $a -ge $b ]

    ```


#### 3.File test operators 
- **-f** : Checks if a regular file exists.
- **-d** : Checks if a path exists and is a directory.
- **-e** : Checks if the file or directory exists.
- **-r** : Checks if the file has read permission.
- **-w** : Checks if the file has write permission.
- **-x** : Checks if the file has execute permission
- **-s** : Check if a file is not empty

    ```bash
    file="test.txt"
    dir="myfolder"

    [ -f "$file" ]
    [ -d "$dir"  ]
    [ -e "$file" ]
    [ -r "$file" ]
    [ -w "$file" ]
    [ -x "$file" ]
    [ -s "$file" ]
    ```

#### 4.if, elif, else:
- **if**: Checks the first condition;if true,runs the code.
- **elif**: Checks another condition only if the previous ones were false.
- **else**: Runs a default block of code if none of the conditions were true

- **Syntax**:
    ```bash
    if [ condition ]; then
        commands
    elif [ condition ]; then
        commands
    else
        commands
    fi
    ```
- **Example**:

    ```bash
    FILE="config.txt"

    if [ -d "$FILE" ]; then
        echo "It's a directory."
    elif [ -f "$FILE" ]; then
        echo "It's a regular file."
    else
        echo "Path does not exist."
    fi
    ```
#### 5.Logical operators

- **&&** : Runs the next command only if the first command is true.
- **||** : Runs the next command only if the first command is false.
- **!**  : If the condition is true, it becomes false.If false,it becomes true.

- **Syntax**:
    ```bash
    command1 && command2
    command1 || command2
        ! command
    ```
    ```bash
    [ condition1 ] && [ condition2 ]
    [ condition1 ] || [ condition2 ]
        ! [ condition ]
    ```
- **Example**:
    ```bash
        mkdir test && cd test
        cd myfolder || pwd
        ! ls notfound.txt
    ```
    ```bash
        [ -f "test.txt" ] && [ -r "test.txt" ]
        [ -f "test.txt" ] || [ -d "backup" ]
            ! [ -f "test.txt" ]
    ```

#### 6.Case statements: 
- A case statement is a way to handle multiple conditions instead of using many if/elif blocks.

- **Syntax**:
    ```bash
    case $VARIABLE in
        pattern1)
            # Commands if VARIABLE matches pattern1
            ;;
        pattern2)
            # Commands if VARIABLE matches pattern2
            ;;
        *)
            # Default case (matches anything else)
            ;;
    esac
    ```

- **Example**:
    ```bash
    action="start"

    case $action in
        start)
            systemctl start nginx ;;
        stop)
            systemctl stop nginx ;;
        restart)
            systemctl restart nginx ;;
        status)
            systemctl status nginx ;;
        *)
            echo "Usage: start | stop | restart | status" ;;
    esac
    ```

#### Task 3: Loops

#### 1.for loop
- **a)** List-based for loop: Iterates over each item in a list.
- **Syntax**:
    ```bash
    for ITEM in list_of_items; do
        # Actions to perform for each ITEM
    done
    ```
- **Example**: Prints user IDs for root,ubuntu,and sanket
    ```bash
    for USER in root ubuntu sanket; do
        id "$USER"
    done
    ```

- **b)** C-style for loop: Loops using a numeric counter.
- **Syntax**:
    ```bash
    for (( initialization; condition; increment )); do
        # Actions to perform each iteration
    done
    ```
- **Example**: Creates file1.txt, file2.txt, and file3.txt
    ```bash
    for (( i=1; i<=3; i++ )); do
        touch "file$i.txt"
    done
    ```

#### 2.while loop:
- Repeats commands while the condition is true.
- **Syntax**:
    ```bash
    while [ condition ]; do
        # Actions to perform while condition is true
    done
    ```
- **Example**: Reads /etc/hostname line by line and prints each line
    ```bash
    while read LINE; do
        echo "$LINE"
    done < /etc/hostname
    ```

#### 3.until loop: 
- Repeats commands until the condition becomes true.
- **Syntax**:
    ```bash
    until [ condition ]; do
        # Actions to perform until condition becomes true
    done
    ```
- **Example**: Repeats every 3 seconds until the internet is reachable (ping to google.com succeeds),printing a message while it’s down.
    ```bash
    until ping -c 1 google.com; do
        echo "The internet is still down."
        echo "I will try again in 3 seconds..."
        sleep 3
    done
    ```

#### 4.Loop control 
- **a)** break: Stops the loop immediately.
- **Syntax**:
    ```bash
    for ITEM in list_of_items; do
        # Condition to stop loop
        break
    done
    ```
- **Example**: Prints .log files until error.log is found, then stops the loop.
    ```bash
    for FILE in *.log; do
        if [ "$FILE" = "error.log" ]; then
            break
        fi
        echo "$FILE"
    done
    ```

- **b)** continue: Skips the current iteration and moves to the next loop
- **Syntax**:
    ```bash
    for ITEM in list_of_items; do
        # Condition to skip current iteration
        continue
    done
    ```
- **Example**: Skips debug.log and prints all other .log files
    ```bash
    for FILE in *.log; do
        if [ "$FILE" = "debug.log" ]; then
            continue
        fi
        echo "$FILE"
    done
    ```

#### 5.Looping over files:
- `for file in *.log*`
        
    ```bash
        for FILE in *.log; do
            echo "Processing $FILE"
        done
    ```

#### 6.Looping over command output 
- `while read line`
    ```bash
    ls *.txt | while read LINE; do
        echo "File: $LINE"
    done
    ```

#### Task 4: Functions

#### 1.Defining a funtion:
- **Syntax**:
    ```bash
    function_name() {
        # commands
    }
    ```
- **Example**:
    ```bash
    say_hello() {
        
        echo "Hello!"
    }
    ```

#### 2.Calling a function:
- **Syntax**:
    ```bash
    function_name
    ```
- **Example**:
    ```bash
    say_hello
    ```

#### 3.Passing arguments to functions:
- $1, $2 inside functions
- **Syntax**
    ```bash
    function_name() {
        echo "$1"    # first argument
        echo "$2"    # second argument
    }
    function_name arg1 arg2
    ```
- **Example**:
    ```bash
    add(){
        num1=$1
        num2=$2
        sum=$(( num1 + num2 ))
        echo "The sum of $num1 and $num2 is: $sum"
    }
    add 2 3
    ```



#### 4.Return values:
- Use return for a status code (0–255) & echo gives a value you can use in a variable.

- **a)** return
- **Syntax**:
    ```bash
    function_name() {
        # commands
        return <status_code>   # 0–255
    }

    function_name
    echo $?   # captures the return status
    ```
- **Example**:
    ```bash
    check_service() {
        systemctl is-active --quiet "$1"
        if [ $? -eq 0 ]; then
            return 0    # service is running
        else
            return 1    # service is not running
        fi
    }

    check_service nginx
    if [ $? -eq 0 ]; then
        echo "sshd is running"
    else
        echo "sshd is not running"
    fi
    echo $?
    ```

- **b)** echo
- **Syntax**:
    ```bash
    function_name() {
        echo <value>        # output the value (value can be a number, string or command output)
    }

    result=$(function_name)   # capture the value in a variable
    echo $result             # use the value
    ```
- **Example**:
    ```bash
    get_disk_usage() {
        du -sh "$1" | awk '{print $1}'
    }

    usage=$(get_disk_usage /var/log)
    echo "Disk usage of /var/log: $usage"
    ```

#### 5.Local variables: 
- Variables declared with local exist only inside the function and don’t affect the global environment.
- **Syntax**:
    ```bash
    function_name() {
        local var_name=value   # declare a variable local to the function
        # use var_name inside function
    }
    ```
- **Example**:
    ```bash
    count_files() {
        local total=$(ls "$1" | wc -l)   # local variable
        echo "Total files in $1: $total"
    }

    count_files /var/log

    echo $total   # empty, because 'total' is local
    ```

#### Task 5: Text Processing Commands

 ## 1.grep: Search for text patterns in files or input
- **Syntax**:
    ```bash
    grep [options] "pattern" file
    ```
- **-i**: ignore case.(Search without caring if letters are uppercase or lowercase.)
- **-r**: recursive search in directories.
- **-c**: count matching lines.
- **-n**: show line numbers.
- **-v**: lines that don’t match.
- **-E**: extended regex

- **Example**:
    ```bash
    grep -i "error" /var/log/syslog 
    Matches error, Error, ERROR

    grep -r "TODO" /home/user/sanket
    Search for “TODO” in all files under a project folder

    grep -c "failed login" /var/log/auth.log
    Count how many times “failed login” appears in auth logs

    grep -n "sshd" /etc/ssh/sshd_config
    Find “sshd” in SSH config and show line numbers

    grep -v "INFO" /var/log/syslog
    Returns everything except lines containing INFO.

    grep -E "error|fail" /var/log/syslog
    Search for lines containing either “error” or “fail”

    ```

#### 2.awk: 
- Process and extract text from files or input,especially by columns/fields.
- **Syntax**:
    ```bash
    awk 'pattern { action }' file
    ```
- **Example**:
    ```bash
    print columns: Extract and display specific columns from text.
    awk '{print $1, $2}' file
    awk '{print $1}' /etc/passwd
    ```
    ```bash
    field separator: Specify a custom delimiter instead of default spaces/tabs.
    awk -F":" '{print $1, $3}' file
    awk -F":" '{print $1, $3}' /etc/passwd
    ```
    ```bash
    patterns: Perform actions only on lines matching a pattern.
    awk '/pattern/ { action }' file
    awk '/root/ {print $1}' /etc/passwd
    ```
    ```bash
    BEGIN/END: Execute actions before or after processing the file
    awk 'BEGIN { ... } { ... } END { ... }' file
    awk 'BEGIN {print "Users list:"} {print $1} END {print "Done"}' /etc/passwd
    ```

#### 3.sed:
- To edit or transform text streams like replacing,deleting, or modifying lines.
- **Syntax**:
    ```bash
    sed [options] 'command' file
    ```
- **Example**:
    ```bash
    substitution: Substitute first match in a line
    sed 's/pattern/replacement/' file
    sed 's/error/ERROR/' file.txt
    ```
    ```bash    
    delete lines: Delete line 2.
    sed 'Nd' file
    sed '2d' file.txt
    ```

    ```bash
    In-place edit: Modify the file directly instead of just printing output.
    sed -i 's/pattern/replacement/g' file
    sed -i 's/error/ERROR/g' file.txt
    ```

#### 4.cut:
- Extract specific columns or fields from text using a delimiter.
- **Syntax**:
    ```bash
    cut -d "delimiter" -f N file
    -d: specify the field delimiter
    -f specify the field/column number(s) to extract.
    ```

- **Example**:
    ```bash
    Extract first column (username) from /etc/passwd
    cut -d ":" -f1 /etc/passwd
    ```

#### 5.sort:
- Arrange lines in a file alphabetically,numerically,reverse,or remove duplicates
- **Syntax**:
    ```bash
    sort [options] file
    -n: numeric sort
    -r: reverse order
    -u: remove duplicates (unique)
    ```

- **Example**:
    ```bash
    Alphabetical sort (default): sort file.txt
    Numeric sort: sort -n numbers.txt
    Reverse order: sort -r file.txt
    Unique lines only: sort -u file.txt
    ```
#### 6.uniq:
- Removes consecutive duplicate lines,also count occurrences. 
- **Syntax**:
    ```bash
    uniq [options] [input_file]
    ```

- **Example**
    ```bash
    # uniq works correctly for all duplicates only if input is sorted.
    sort file.txt | uniq          # remove all duplicates
    sort file.txt | uniq -c       # count occurrences
    uniq -u file.txt              # show only unique lines
    ```

#### 7.tr:
- Translates/deletes characters from input.
- **Syntax**:
    ```bash
        tr [options] SET1 [SET2]
    ```
- **Example**:
    ```bash
        echo "hello"     | tr 'a-z' 'A-Z'   # convert to uppercase
        echo "hello 123" | tr -d '0-9'  # delete digits
    ```

#### 8.wc:
- Provides counts for lines,words, or characters in a file
- **Syntax**
    ```bash
        wc [options] [file]
    ```

- **Example**
    ```bash
        wc -l file.txt    # line count
        wc -w file.txt    # word count
        wc -c file.txt    # character count
    ```

#### 9.head/tail:
- Display the first or last N lines of a file; tail -f follows live updates.
- **Syntax**:
    ```bash
        head/tail [options] filename
    ```

- **Example**:
    ```bash
        head -n 5 file.txt                  # first 5 lines
        tail -n 5 file.txt                  # last 5 lines
        tail -f /var/log/nginx/access.log   # live updates
    ```

#### Task 6 Useful Patterns and One-Liners

- ### Find and delete files older than N days
    ```bash
    find /var/log -type f -name "*.log" -mtime +15 -exec rm -f {} \;
    ```
- ### Count lines in all .log files
    ```bash
    wc -l /var/log/*.log
    ```
- ### Replace a string across multiple files
    ```bash
    sed -i 's/db.oldserver.com/db.newserver.com/g' /etc/myapp/conf.d/*.conf
    ```
- ### Check if a service is running
    ```bash
    systemctl is-active --quiet nginx && echo "Running" || echo "Stopped"
    ```

- ### Monitor disk usage with alerts
    ```bash
    df -h | awk '$5+0 > 80 {print $0}' | mail -s "Disk Usage Alert on $(hostname)" your.email@example.com
    ```

- ### Tail a log and filter for errors in real time
    ```bash
    tail -f /var/log/syslog | grep -E 'ERROR|CRITICAL'
    ```

#### Task 7: Error Handling and Debugging

##### Exit codes
- **$?**: Stores a exit status of a command,script or function
- **exit 1**: Non-zero indicates failure or a specific error condition.
- **exit 0**: Success

- **Example**:
    ```bash
    #!/bin/bash

    ls myfile.txt

    echo "Exit status of ls command: $?"

    if [ -f myfile.txt ]; then
        echo "File exists"
        exit 0
    else
        echo "File does not exist"
        exit 1
    fi
    ```

    | Command              | Meaning                               |
    | -------------------- | ------------------------------------- |
    | `ls myfile.txt`      | Tries to list the file                |
    | `$?`                 | Shows exit status of the last command |
    | `0`                  | Success (file exists)                 |
    | Non-zero (e.g., `2`) | Error (file does not exist)           |
    | `exit 0`             | Script ends successfully              |
    | `exit 1`             | Script ends with failure              |


##### set -e,set -u ,set -o pipefail ,set -x ,trap 'cleanup' EXIT

| Command               | Meaning                                   | Example                                                                        |
| --------------------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| `set -e`              | Exit immediately if a command fails       | `set -e`<br>`false` → script stops immediately                                 |
| `set -u`              | Error if using an unset variable          | `set -u`<br>`echo $name` → error if `name` is not set                          |
| `set -o pipefail`     | Fail if any command in a pipeline fails   | `set -o pipefail`<br>`false \| true` → returns failure                         |
| `set -x`              | Debug mode (show commands before running) | `set -x`<br>`echo "Hello"` → prints `+ echo Hello`                             |
| `trap 'cleanup' EXIT` | Run `cleanup` function when script exits  | `trap 'cleanup' EXIT`<br>`cleanup() { echo "Cleaning up..."; }` → runs on exit |

---

## 8. Assignments (independent work)

Complete without copying from the lesson. Look things up in official documentation when needed.

| # | Assignment | Expected outcome |
|---|---|---|
| 1 | Write a CHANGELOG. | You can demonstrate, without notes: *deliver a production-style automation tool* — with evidence committed to `day-21/`. |
| 2 | Record a terminal demo (asciinema). | You can demonstrate, without notes: *combine scripting, testing, documentation* — with evidence committed to `day-21/`. |
| 3 | Write a 'how to extend with a new check' section. | You can demonstrate, without notes: *create a reusable repository template* — with evidence committed to `day-21/`. |

## 9. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Checks are slow | Add timeouts and run checks concurrently. |
| False positives | Make thresholds configurable and document defaults. |

**Troubleshooting challenge:** deliberately break one thing from today's lab, then diagnose and fix it using only logs, status commands and documentation. Write the symptom -> cause -> fix in `lab-notes.md`.

## 10. Security, Reliability & Cost Considerations

- **Security:** Run as non-root where possible; avoid shelling out with untrusted input; never expose metrics publicly without auth.
- **Reliability:** What fails first here? How would you detect it and recover?
- **Cost:** Which resources from today keep costing money or time if left running? Clean them up and note it.

## 11. Daily Completion Checklist

- [ ] Read and understand the learning material.
- [ ] Complete all practical exercises.
- [ ] Execute commands independently.
- [ ] Complete the real-world scenario.
- [ ] Troubleshoot at least one issue.
- [ ] Complete the daily assignment.
- [ ] Answer the interview questions.
- [ ] Document important findings.
- [ ] Push work to GitHub.
- [ ] Complete the self-assessment.

## 12. Daily Deliverables

- [ ] Practical lab completed.
- [ ] Screenshots or terminal evidence saved (`evidence/`).
- [ ] Documentation written (`lab-notes.md`).
- [ ] GitHub repository updated.
- [ ] Day-specific: scenario write-up and assignment outputs committed.

## 13. Interview Preparation

Answer each question aloud in 60–90 seconds, then write a 3-line answer in `interview.md`.

1. How do you design exit codes for monitoring?
2. Why multiple output formats?
3. How do you make a script maintainable?
4. What would you add next?
5. **Scenario:** The SRE team will adopt your tool if it is documented, tested and safe. Explain how you would approach it, what you would check first, and how you would prevent recurrence.

## 14. Self-Assessment

Rate yourself **0** (cannot do) · **1** (with help) · **2** (alone, slowly) · **3** (alone, confidently, can teach it).

| Check | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Is it installable and documented? | ☐ | ☐ | ☐ | ☐ |
| Does it have tests? | ☐ | ☐ | ☐ | ☐ |
| Could a teammate use it without me? | ☐ | ☐ | ☐ | ☐ |
| Deliver a production-style automation tool | ☐ | ☐ | ☐ | ☐ |
| Combine scripting, testing, documentation | ☐ | ☐ | ☐ | ☐ |
| Create a reusable repository template | ☐ | ☐ | ☐ | ☐ |

> Any item below **2** goes onto your revision list in [LEARNING-TRACKER.md](../LEARNING-TRACKER.md).

## 15. GitHub Submission

Commit today's work under `day-21/` in your own repository:

```text
day-21/
├── README.md        # this guide (keep; tick your checkboxes)
├── lab-notes.md     # commands, outputs, what broke and how you fixed it
├── interview.md     # your answers
├── scripts/         # scripts, manifests, code created today
└── evidence/        # screenshots / terminal output (no secrets!)
```

```bash
git switch -c day-21
git add day-21/
git commit -m "day-21: week 3 project"
git push -u origin day-21
gh pr create --fill   # review your own PR, then merge
```

**Milestone commit/tag today:** Week 3 project: healthcheck tool v0.1.0.

**Before you push:** run `gitleaks detect` (or check manually) — no tokens, keys, passwords or real account IDs in files or screenshots.

## 16. Time Allocation

| Activity | Minutes |
|---|---|
| Read and take notes (Sections 3, 9) | 42 |
| Hands-on labs and commands (Sections 4–6) | 94 |
| Assignment + troubleshooting (Sections 7–8) | 42 |
| Interview practice, documentation, Git push (Sections 11–14) | 32 |
| **Total** | **210 (≈ 3.5 h)** |

## 17. Daily Reflection

**What did I learn?**


**What problems did I encounter?**


**How did I solve them?**


**What do I need to revise?**


**One thing I will automate or improve tomorrow:**

## 18. Personal Learning Journal — 🐳 Day 21 - Advanced Containerization: Multi-Stage Builds & Security

> Notes from my own 90-days journal for this day (from the *90days_DevOps_Challenge* journal).

#### 📅 Date

04 August 2026

---

### 🚀 Introduction

"Hands-on practice is where real learning happens. 🐳🚀"

Today, I took my containerization skills a step further by deploying a Golang & Vanilla JS full-stack application with a MariaDB database. Instead of just making it work, I focused heavily on **multi-stage builds, minimal image sizing, and security scanning**.

Containerizing applications is one thing, but making them lightweight, secure, and production-ready is where the real value lies! 🔐

---

### 📚 Key Highlights & Implementations

#### 📄 1. Multi-Stage Dockerfile Strategy

In compiled languages like Golang, you don't need the Go compiler or the source code in your final production image—you only need the compiled binary. A multi-stage build solves this by using multiple `FROM` statements.

**Example Multi-Stage Dockerfile:**
```dockerfile
# Stage 1: Build Environment
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

# Stage 2: Minimal Runtime Environment
FROM alpine:3.21
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
```
By copying only the compiled binary (`main`) into the lightweight `alpine:3.21` runtime, we discard all build dependencies.

#### ⚡ 2. Extreme Size Optimization

Using the multi-stage build strategy, I successfully squashed the final application image size down to an impressive **3.86MB**!
- A standard `golang` image can easily exceed 800MB.
- `golang:alpine` reduces it to around 300MB.
- A multi-stage build with a bare `alpine` runtime brings it down to just a few megabytes.

#### 🔒 3. Security Hardening (Non-Root User)

By default, Docker containers run as the `root` user. If an attacker breaches the container, they gain root privileges inside it. To prevent this, we enforce non-root user permissions (`appuser:appgroup`) directly in the Dockerfile.

```dockerfile
# Inside the runtime stage
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```
Now, the application executes safely under an unprivileged account.

#### 🔍 4. Vulnerability Auditing with Docker Scout

I integrated `Docker Scout` to scan images and detect potential vulnerabilities before they reach production. Scout compares the layers and dependencies against a constantly updated vulnerability database (CVEs).

```bash
# Get a quick vulnerability summary
docker scout quickview my-golang-app:latest
```

#### 🌐 5. Full-Stack Connectivity

Connected the Go backend, static frontend, and MariaDB server seamlessly into an active running container environment using a shared Docker network, ensuring the frontend could dynamically query the database via the secure Go API.

---

### 🔗 Resources

- **Project Code & Configuration:** [GitHub Repository](https://lnkd.in/dQ7z8-C8)

---

### 🔗 LinkedIn Post

Hands-on practice is where real learning happens. 🐳🚀
Day 21 of #90DaysOfDevOps ✅

Today, I took my containerization skills a step further by deploying a Golang & Vanilla JS full-stack application with a MariaDB database—focusing heavily on multi-stage builds, minimal image sizing, and security scanning.

📚 Key Highlights & Implementations:
📄 Multi-Stage Dockerfile Strategy: Configured multi-stage builds using golang:1.21-alpine for compiling the binary and a minimal alpine:3.21 runtime to keep the footprint light.
⚡ Extreme Size Optimization: Successfully squashed the final application image size down to an impressive 3.86MB!
🔒 Security Hardening: Enforced non-root user permissions (appuser:appgroup) directly in the Dockerfile to follow strict container security standards.
🔍 Vulnerability Auditing: Ran image security scans using Docker Scout to detect and address potential vulnerabilities early in the cycle.
🌐 Full-Stack Connectivity: Connected the Go backend, static frontend, and MariaDB server seamlessly into an active running container environment.

Containerizing applications is one thing, but making them lightweight, secure, and production-ready is where the real value lies! 🔐

🔗 Explore the project code & configuration here: https://lnkd.in/dQ7z8-C8

#90DaysOfDevOps #Docker #Golang #DevOps #DockerScout #ContainerSecurity #Microservices #CloudComputing #LearningInPublic #TrainWithShubham

## 19. Challenge Notes — Day 21: Docker Networking, Volumes, and Compose

> Notes for this day from the *90 Days DevOps Challenge* repository (AWS-focused daily guide).

[![](https://img.youtube.com/vi/nMbGQ9my7TY/0.jpg)](https://www.youtube.com/watch?v=nMbGQ9my7TY)

[Watch the video](https://www.youtube.com/watch?v=nMbGQ9my7TY)

1. Docker Networking

---

##### Summary

Docker networking enables containers to communicate with each other and with external networks. Docker provides several network drivers tailored to specific use cases.

| Network Mode | Description                                         | Use Case                                 |
| ------------ | --------------------------------------------------- | ---------------------------------------- |
| bridge       | Default internal network with NAT and IP assignment | Local isolated containers                |
| host         | Shares host network stack (no isolation)            | High-performance apps                    |
| none         | Disables networking completely                      | Secure or offline containers             |
| overlay      | Enables cross-host networking                       | Distributed microservices in Swarm       |
| macvlan      | Assigns MAC address from physical NIC               | Legacy apps requiring Layer 2 visibility |
| ipvlan       | Similar to macvlan with Layer 3 separation          | High-scale apps                          |

##### Internals

* Uses Linux namespaces for isolation
* Virtual Ethernet pairs (veth) connect containers to host bridge (docker0)
* iptables/NAT handles external access
* Internal DNS at 127.0.0.11

##### Lab Examples

**Bridge Network:**

```sh
docker network create my_bridge_net
docker run -dit --name app1 --network my_bridge_net alpine sh
docker run -dit --name app2 --network my_bridge_net alpine sh
docker exec app1 ping app2
```

**Host Network:**

```sh
docker run --rm -d --network host nginx
curl http://localhost:80
```

**None Network:**

```sh
docker run -dit --name isolated --network none alpine
```

**Overlay Network (Docker Swarm):**

```sh
docker swarm init
docker network create --driver overlay my_overlay_net
docker service create --replicas 2 --network my_overlay_net --name web nginx
```

**Macvlan Network:**

```sh
docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 \
  macvlan_net
docker run -dit --name mac_container --network macvlan_net alpine
```

2. Docker Storage

---

##### Storage Options

| Type        | Description                                             | Use Case                  |
| ----------- | ------------------------------------------------------- | ------------------------- |
| Volumes     | Managed by Docker, stored under /var/lib/docker/volumes | Recommended for most apps |
| Bind Mounts | Maps host path to container                             | Dev or advanced use       |
| tmpfs       | RAM-only storage, non-persistent                        | Temporary secrets/logs    |

##### Volumes

```sh
docker volume create mydata
docker run -dit --name volume-container -v mydata:/app/data alpine sh
docker exec -it volume-container sh -c "echo 'persistent log' > /app/data/log.txt"
docker rm -f volume-container
docker run --rm -v mydata:/app/data alpine cat /app/data/log.txt
```

##### Bind Mount

```sh
mkdir -p /tmp/logs
echo "Hello from host" > /tmp/logs/hello.txt
docker run --rm -v /tmp/logs:/data alpine cat /data/hello.txt
```

##### tmpfs Mount

```sh
docker run --rm \
  --tmpfs /app/temp \
  alpine sh -c "echo secret > /app/temp/secret && cat /app/temp/secret"
```

3. Docker Compose

---

##### Overview

Tool for defining and running multi-container Docker apps using YAML.

##### Benefits

* Declarative configuration
* Simplified orchestration
* Built-in networking
* Portable across environments

##### Example File

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "5000:5000"
    depends_on:
      - redis
    networks:
      - appnet

  redis:
    image: redis
    networks:
      - appnet

networks:
  appnet:
```

##### Flask + Redis Lab Example

**Directory Structure:**

```
docker-compose-demo/
├── app.py
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

**app.py**

```python
from flask import Flask
import redis
app = Flask(__name__)
r = redis.Redis(host='redis', port=6379)

@app.route('/')
def count():
    r.incr('hits')
    return f"Viewed {r.get('hits').decode('utf-8')} times."

if __name__ == '__main__':
    app.run(host='0.0.0.0')
```

**requirements.txt**

```
flask
redis
```

**Dockerfile**

```Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```

**docker-compose.yml**

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "5000:5000"
    depends_on:
      - redis
    networks:
      - appnet

  redis:
    image: redis
    networks:
      - appnet

networks:
  appnet:
```

**Commands:**

```sh
docker-compose up --build
docker-compose down -v
```

### Attachments

- [Day 21 Docker Networking, Volumes, and Compose.pdf](Day%2021%20Docker%20Networking%2C%20Volumes%2C%20and%20Compose.pdf)

## 20. Cohort Practice — Day 21: Shell Scripting Cheat Sheet: Build Your Own Reference Guide

> From the *90DaysOfDevops* cohort repository (task brief and practice notes).

#### Task

You've spent the last several days learning Shell scripting — from basics to real-world projects. Now it's time to consolidate everything into a **personal cheat sheet** that you can use as a quick-reference guide for the rest of your DevOps journey.

The best way to revise is to **teach it back**. Writing a cheat sheet forces you to organize your understanding and identify gaps.

---

#### Expected Output
- A markdown file: `shell_scripting_cheatsheet.md`

---

#### Challenge Tasks

##### Task 1: Basics
Document the following with short descriptions and examples:
1. Shebang (`#!/bin/bash`) — what it does and why it matters
2. Running a script — `chmod +x`, `./script.sh`, `bash script.sh`
3. Comments — single line (`#`) and inline
4. Variables — declaring, using, and quoting (`$VAR`, `"$VAR"`, `'$VAR'`)
5. Reading user input — `read`
6. Command-line arguments — `$0`, `$1`, `$#`, `$@`, `$?`

---

##### Task 2: Operators and Conditionals
Document with examples:
1. String comparisons — `=`, `!=`, `-z`, `-n`
2. Integer comparisons — `-eq`, `-ne`, `-lt`, `-gt`, `-le`, `-ge`
3. File test operators — `-f`, `-d`, `-e`, `-r`, `-w`, `-x`, `-s`
4. `if`, `elif`, `else` syntax
5. Logical operators — `&&`, `||`, `!`
6. Case statements — `case ... esac`

---

##### Task 3: Loops
Document with examples:
1. `for` loop — list-based and C-style
2. `while` loop
3. `until` loop
4. Loop control — `break`, `continue`
5. Looping over files — `for file in *.log`
6. Looping over command output — `while read line`

---

##### Task 4: Functions
Document with examples:
1. Defining a function — `function_name() { ... }`
2. Calling a function
3. Passing arguments to functions — `$1`, `$2` inside functions
4. Return values — `return` vs `echo`
5. Local variables — `local`

---

##### Task 5: Text Processing Commands
Document the most useful flags/patterns for each:
1. `grep` — search patterns, `-i`, `-r`, `-c`, `-n`, `-v`, `-E`
2. `awk` — print columns, field separator, patterns, `BEGIN/END`
3. `sed` — substitution, delete lines, in-place edit
4. `cut` — extract columns by delimiter
5. `sort` — alphabetical, numerical, reverse, unique
6. `uniq` — deduplicate, count
7. `tr` — translate/delete characters
8. `wc` — line/word/char count
9. `head` / `tail` — first/last N lines, follow mode

---

##### Task 6: Useful Patterns and One-Liners
Include at least 5 real-world one-liners you find useful. Examples:
- Find and delete files older than N days
- Count lines in all `.log` files
- Replace a string across multiple files
- Check if a service is running
- Monitor disk usage with alerts
- Parse CSV or JSON from command line
- Tail a log and filter for errors in real time

---

##### Task 7: Error Handling and Debugging
Document with examples:
1. Exit codes — `$?`, `exit 0`, `exit 1`
2. `set -e` — exit on error
3. `set -u` — treat unset variables as error
4. `set -o pipefail` — catch errors in pipes
5. `set -x` — debug mode (trace execution)
6. Trap — `trap 'cleanup' EXIT`

---

##### Task 8: Bonus — Quick Reference Table
Create a summary table like this at the top of your cheat sheet:

| Topic | Key Syntax | Example |
|-------|-----------|---------|
| Variable | `VAR="value"` | `NAME="DevOps"` |
| Argument | `$1`, `$2` | `./script.sh arg1` |
| If | `if [ condition ]; then` | `if [ -f file ]; then` |
| For loop | `for i in list; do` | `for i in 1 2 3; do` |
| Function | `name() { ... }` | `greet() { echo "Hi"; }` |
| Grep | `grep pattern file` | `grep -i "error" log.txt` |
| Awk | `awk '{print $1}' file` | `awk -F: '{print $1}' /etc/passwd` |
| Sed | `sed 's/old/new/g' file` | `sed -i 's/foo/bar/g' config.txt` |

---

#### Format Guidelines

Your cheat sheet should be:
- Written in **Markdown** (`.md`)
- Organized with **clear headings** for each section
- Include **code blocks** with syntax highlighting (` ```bash `)
- Keep explanations **short** — 1-2 lines max per item
- Focus on **practical examples** over theory
- Something **you would actually refer back to** on the job

---

#### Submission
1. Add your `shell_scripting_cheatsheet.md` to `2026/day-21/`
2. Commit and push to your fork

---

#### Learn in Public

Share your cheat sheet on LinkedIn — help others revise too!

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**

##### Notes: shell_scripting_cheatsheet

##### Task 1: Basics
1. Shebang (`#!/bin/bash`) — what it does and why it matters
#!/bin/bash -> this is indicate which shell is used 


2. Running a script — `chmod +x`, `./script.sh`, `bash script.sh`
chmod +x is used to assgin the execute permission to all the user group and other member 
./script.sh is execute the script with permission if permission not assign not execute
bash script.sh is used to execute with out permission

3. Comments — single line (`#`) and inline
 this is used to comment the single line

<<comment
this is 
multi line

comment

4. Variables — declaring, using, and quoting (`$VAR`, `"$VAR"`, `'$VAR'`)
$VAR - this is Replace variable with value
"$VAR"	- this Replace with value and keep spaces
'$VAR'- this print exactly $VAR




5. Reading user input — `read`
 - it is used to the user input in run time

6. Command-line arguments — `$0`, `$1`, `$#`, `$@`, `$?`
$0 - is the script file name
$1 - is the first args
$# - is the total number of argument how many args passed
#@ - is the print the total number of args
$? - Exit Status of Previous Command



##### Task 2: Operators and Conditionals
Document with examples:
1. String comparisons — `=`, `!=`, `-z`, `-n`
= -> equal to , check the two string equal or not
!= -> not equal to , check two string are different
-z -> empty string
-n -> string length is not zero

2. Integer comparisons — `-eq`, `-ne`, `-lt`, `-gt`, `-le`, `-ge`
-eq -> this is equal to
-ne -> not equal to
-lt -> this is less than
-gt -> this is greater than
-le -> this is less than equal to
-ge -> this is greater than equal to


3. File test operators — `-f`, `-d`, `-e`, `-r`, `-w`, `-x`, `-s`
-f -> regular files
-d -> regular directory
-e -> file or directory exists
-r -> readable
-w -> writable
-x -> executable
-s -> file exists and size


4. `if`, `elif`, `else` syntax

if - check first condition
elif - check second condition if first conditon is false
else - check last condition if all condioon is false


5. Logical operators — `&&`, `||`, `!`

&& -> logical and operator second command run only if the first command success both conadition true

|| -> local or operator second command run only in first command fails
    one condition true 

! -> Not operator - reverse condition 

6. Case statements — `case ... esac`

-> case is used when you have multiple choices / options
instead of writing many if elif else conditions, you can use case

this is like a switch statement in java , python



##### Task 3: Loops
Document with examples:
1. `for` loop — list-based and C-style
-> for loop is used when you want to execute the same block of code multiple times
- > repeat this task for each item.

2. `while` loop
-> while loop runs as long as the condition is true.

3. `until` loop
-> until is the  opposite  of while.

4. Loop control — `break`, `continue`
-> break is used to break (exit) the statement(loop) is condition is trun 
-> continue is used to skip true condition and run next condition

5. Looping over files — `for file in *.log`
-> in this loop print all the file with .log extension one by one which 
6. Looping over command output — `while read line`

while read line is one of the most important patterns is  shell scripting.
it is used when you want to read command output line by line.

---



##### Task 4: Functions
Document with examples:
1. Defining a function — `function_name() { ... }`
-> function in shell scripting are used to group a set of commands so they can bee reused multiple times.

instead of wrting the same code again and again , put it inside the function and call it whenever needed.

2. Calling a function
-> after defining a function , you execute it by writing its name.

-> function is called by function name only
function call is execute after the function defination

3. Passing arguments to functions — `$1`, `$2` inside functions
-> in shell scripting there are two different types of arguments
    i - script arguments
        - script argument passed when the script is execute time after the script file right side is $1 and send args is $2

    ii - function arguments
        - function argument is passed when function called statement

4. Return values — `return` vs `echo`

    - > returns an exit status (0- 255) from a function.
    - > echo - prints /output text

5. Local variables — `local`
    -> local keyword is used to define variable  local
    -> in shell scripting local is used inside a function to create a variable that exists only within that function.
    -> without local variable  , a variable can affect the entire script.


---

##### Task 5: Text Processing Commands
Document the most useful flags/patterns for each:
1. `grep` — search patterns, `-i`, `-r`, `-c`, `-n`, `-v`, `-E`
    - grep -i - ignore case search without caring uppercase and lowercase
    - grep -r - search inside all files and sub directories.
    - frep -c - count match 
        = grep -c "error" app.log
            error count and print the output in integer 
    - grep -n - show the line number
    - grep -v - invert match - show the lines that do not match.

2. `awk` — print columns, field separator, patterns, `BEGIN/END`

- begin and end are special blocks in awk
    - BEGIN -> Before reading any line
    - MAIN -> for every line
    - END -> After reading all lines



3. `sed` — substitution, delete lines, in-place edit
- sed stands for Stream Editor
- sed replace text in config files
delete lines
update enviornment variables
modify YAML , Nginx, Apache and application configs

substitution (s)- sed 's/old/new' file.txt
delete(d) - delete the line
in-place(-i) - normally sed only print output.


4. `cut` — extract columns by delimiter
    example
        extract first column cut -d ':' -f1 file.txt
        -d -> delimiter
        -f -> field number

5. `sort` — alphabetical, numerical, reverse, unique
    - sort lines alphabetically
    -n - numeric sort
    -r - reverse sort
    
    
6. `uniq` — deduplicate, count
    - uniq - removes adjacent duplicate lines
    

7. `tr` — translate/delete characters
- tr - translate / deleted characters
            convert lowercase to uppercase
8. `wc` — line/word/char count
    -> count the work in a files
        coomand output

9. `head` / `tail` — first/last N lines, follow mode
    -> head - show the first 10 lines
    -> tail - show last 10 lines


---

##### Task 6: Useful Patterns and One-Liners
Include at least 5 real-world one-liners you find useful. Examples:
- Find and delete files older than N days
    find /var/log -type f -mtime +30
    find /var/log -type f -mtime +30 -delete

- Count lines in all `.log` files
    wc -l *.log
    count the lines in each .log file

- Replace a string across multiple files
    - sed -i 's/old_string/new_string/g' file.txt

- Check if a service is running
    - systemctl is-active nginx

- Monitor disk usage with alerts

#!/bin/bash

threshold=80

usage=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')

if [ "$usage -ge "$threshold" ]
then
    echo "Alert: Disk usage is ${usage}%"
else
    echo "Disk usage is normal : ${usage}%"
fi

- Parse CSV or JSON from command line
- Tail a log and filter for errors in real time

---

##### Task 7: Error Handling and Debugging
Document with examples:
1. Exit codes — `$?`, `exit 0`, `exit 1`
- $? - previous command exit code
- exit 0 - script completed successfully
- exit 1 - script failed

2. `set -e` — exit on error
- Exit immedeiately if a command faiils

3. `set -u` — treat unset variables as error
- treat undefined variables as errors

4. `set -o pipefail` — catch errors in pipes
- if any command in pipeline fails whole pipeline fails

5. `set -x` — debug mode (trace execution)

- 
6. Trap — `trap 'cleanup' EXIT`
- when the script exist, automatically run clean up function.

---

##### Task 8: Bonus — Quick Reference Table
Create a summary table like this at the top of your cheat sheet:

| Topic | Key Syntax | Example |
|-------|-----------|---------|
| Variable | `VAR="value"` | `NAME="DevOps"` |
| Argument | `$1`, `$2` | `./script.sh arg1` |
| If | `if [ condition ]; then` | `if [ -f file ]; then` |
| For loop | `for i in list; do` | `for i in 1 2 3; do` |
| Function | `name() { ... }` | `greet() { echo "Hi"; }` |
| Grep | `grep pattern file` | `grep -i "error" log.txt` |
| Awk | `awk '{print $1}' file` | `awk -F: '{print $1}' /etc/passwd` |
| Sed | `sed 's/old/new/g' file` | `sed -i 's/foo/bar/g' config.txt` |

---
variable
========
var="devops"
var="sre"

use varibale
============
$var
echo $var

arguments
=========
$0 - script file
$1 - first args
$2 - second args
$# - args count
$@- all args

if =
====
if [ condition ]; then

if else 
=======
if ---- else ----- fi




function defination
===================
name() {
    echo "hii"
}

function call
==============
name

function args
=============
$1 
name $1

grep -i - ignore case

awk '{print $1}' print column

sed -i sed in place edit

## 21. Hands-on Project — Day 21: RDS with Terraform (PostgreSQL)

> From the *90daysofdevops* hands-on repository (scripts, Terraform, Kubernetes and pipeline code are in the `files/hands-on-projects` folder of this day).

#### 📖 Overview
Today’s focus: **Provision Amazon RDS (PostgreSQL)** using Terraform with production‑minded defaults: **Multi‑AZ**, **subnet group** in private subnets, **parameter group**, **automated backups**, **encryption**, and **least‑privilege network access** from your app tier.

This module plugs into:
- **Day 14** VPC & subnets (use **private** subnets for RDS)
- **Day 16** Security Groups (allow DB from app/web SG as needed)
- Optional: **Day 19** ASG (app connects to this DB)

---

#### 🎯 Learning Goals
- Model an RDS **Subnet Group** and **Parameter Group**.  
- Create an **RDS instance** (PostgreSQL) with backups, encryption, and Multi‑AZ.  
- Restrict network access via a dedicated **DB Security Group**.  
- (Optional) Store DB credentials in **Secrets Manager** automatically.

---

#### 🛠️ Lab Setup & Tasks

```bash
# 1) Initialize
terraform -chdir=terraform init

# 2) Plan (replace values)
terraform -chdir=terraform plan   -var='vpc_id=vpc-0123'   -var='private_subnet_ids=["subnet-a","subnet-b"]'   -var='app_security_group_ids=["sg-app123"]'   -var='db_name=appdb' -var='db_username=appuser'   -var='multi_az=true' -var='allocated_storage=20'

# 3) Apply
terraform -chdir=terraform apply -auto-approve   -var='vpc_id=vpc-0123'   -var='private_subnet_ids=["subnet-a","subnet-b"]'   -var='app_security_group_ids=["sg-app123"]'   -var='db_name=appdb' -var='db_username=appuser'

# 4) Retrieve connection details
terraform -chdir=terraform output
# (If secrets are enabled) fetch password from Secrets Manager:
# aws secretsmanager get-secret-value --secret-id <output: secret_arn>
```

**Notes**
- By default, this module **generates a strong password** and stores it in **Secrets Manager** (encrypted). You can disable this and pass your own via `db_password` if you prefer.  
- RDS is deployed in **private subnets**. Make sure your app has network path (via NAT or endpoints as needed).

---

#### 💡 Challenge
- Add a **read replica** and point read traffic via a separate connection string.  
- Configure a **Route53 private hosted zone** CNAME for the DB endpoint.  
- Add parameter overrides (e.g., `max_connections`) per environment using `var.db_parameters`.

---

#### ✅ Checklist
- [ ] DB subnet group spans at least **2 private subnets**  
- [ ] **Multi‑AZ** (optional) and backups enabled  
- [ ] **Encryption at rest** (KMS) and in transit (require TLS)  
- [ ] Access restricted to **app SGs** only  
- [ ] Password stored securely (Secrets Manager or SSM)

---

#### 📌 Commit
```bash
git add day21-rds-with-terraform
git commit -m "day21: RDS PostgreSQL with subnet group, parameter group, backups, Multi-AZ, and Secrets Manager"
git push
```

### Files

- [terraform/main.tf](files/hands-on-projects/terraform/main.tf)
- [terraform/outputs.tf](files/hands-on-projects/terraform/outputs.tf)
- [terraform/variables.tf](files/hands-on-projects/terraform/variables.tf)


---

[← Day 20](../day-20/README.md) | [Roadmap](../90-DAY-ROADMAP.md) | [Day 22 →](../day-22/README.md)
