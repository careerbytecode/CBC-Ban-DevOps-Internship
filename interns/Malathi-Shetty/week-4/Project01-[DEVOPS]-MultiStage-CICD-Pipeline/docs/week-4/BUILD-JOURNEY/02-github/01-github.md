# 02 — GitHub Setup

This is where we connected the FlavorForge project with GitHub.

The FlavorForge source code is stored in the GitHub repository:

`https://github.com/bymalathi/flavorforge-azure-devsecops-capstone`

A person following this BUILD-JOURNEY will be using **their own computer**, so they first need to prepare Git and GitHub authentication and then clone the repository.

For the actual FlavorForge project, **we used SSH to connect to GitHub**.

We are also documenting **PAT (Personal Access Token)** because it is another GitHub authentication method that can be recreated when HTTPS authentication is required.

---

# Step 1 — Check Git

Open a terminal.

Run:

```bash
git --version
```

If Git is already installed, you will see something similar to:

```text
git version 2.x.x
```

The exact version may be different.

### If Git is not installed

For Ubuntu/Debian:

```bash
sudo apt update
```

Then:

```bash
sudo apt install git -y
```

Check again:

```bash
git --version
```

Git should now be available.

---

# Step 2 — Configure Git

Git needs a name and email address for commits.

Set your name:

```bash
git config --global user.name "Your Name"
```

Set the email address associated with your GitHub account:

```bash
git config --global user.email "your-email@example.com"
```

Check the configuration:

```bash
git config --global --list
```

You should see entries similar to:

```text
user.name=Your Name
user.email=your-email@example.com
```

Use **your own name and email**.

Do not copy the Git identity from another person's computer.

---

# Step 3 — Check whether SSH is already configured

For the FlavorForge project, we used SSH.

First check whether an SSH directory already exists:

```bash
ls -la ~/.ssh
```

Look for a key such as:

```text
id_ed25519
id_ed25519.pub
```

You may also see another key type such as:

```text
id_rsa
id_rsa.pub
```

The file ending in `.pub` is the **public key**.

The file without `.pub` is the **private key**.

### Important

Never share your private SSH key.

For example, do **not** share:

```text
~/.ssh/id_ed25519
```

The public key can be added to GitHub:

```text
~/.ssh/id_ed25519.pub
```

---

# Step 4 — Create an SSH key if you don't have one

If you do not already have an SSH key, create one:

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

When asked where to save the key, press **Enter** to use the default location.

You may also create a passphrase when prompted.

After the key is created, check:

```bash
ls -la ~/.ssh
```

You should now see:

```text
id_ed25519
id_ed25519.pub
```

---

# Step 5 — Start the SSH agent

Run:

```bash
eval "$(ssh-agent -s)"
```

The SSH agent should start.

---

# Step 6 — Add your SSH key

Run:

```bash
ssh-add ~/.ssh/id_ed25519
```

If your SSH key has a different filename, use that filename instead.

---

# Step 7 — Copy your public SSH key

Run:

```bash
cat ~/.ssh/id_ed25519.pub
```

You will see a long line similar to:

```text
ssh-ed25519 AAAA... your-email@example.com
```

Copy the **complete public key**.

Do not copy the private key.

---

# Step 8 — Add the SSH key to GitHub

Open GitHub in your browser.

Go to:

**GitHub → Profile picture → Settings**

Then:

**SSH and GPG keys → New SSH key**

Enter:

| Field    | What to enter                         |
| -------- | ------------------------------------- |
| Title    | A name for your computer              |
| Key type | Authentication Key                    |
| Key      | Your copied `id_ed25519.pub` contents |

Click:

**Add SSH key**

GitHub may ask you to authenticate again.

Complete the verification.

---

# Step 9 — Test SSH authentication

Return to the terminal.

Run:

```bash
ssh -T git@github.com
```

The first time, SSH may ask whether you want to continue connecting to GitHub.

If prompted, type:

```text
yes
```

A successful authentication message confirms that your computer can authenticate with GitHub using SSH.

### Result

SSH authentication is now ready.

---

# Step 10 — PAT authentication

SSH was the method we used for the FlavorForge repository.

However, GitHub also supports authentication using a **Personal Access Token (PAT)**.

We document it here so that someone following this BUILD-JOURNEY can recreate the GitHub setup using HTTPS if required.

A PAT should be treated like a password.

Never put the actual token inside:

* GitHub repository files
* YAML files
* README files
* screenshots
* documentation
* scripts
* public posts

In documentation, use:

```text
<GITHUB_PAT>
```

instead of the real token.

---

# Step 11 — Create a GitHub PAT

Sign in to GitHub.

Go to:

**GitHub → Settings → Developer settings → Personal access tokens**

Create a new token using the token option available for your GitHub account.

Give the token a meaningful name.

Set an appropriate expiration.

Select only the permissions required for the work.

Generate the token.

### Important

GitHub may show the token only when it is created.

Copy it and store it securely.

Do not commit it to the FlavorForge repository.

For this BUILD-JOURNEY, we represent the token as:

```text
<GITHUB_PAT>
```

---

# Step 12 — Clone FlavorForge using SSH

This is the method we actually used for FlavorForge.

First go to the directory where you want to keep the project.

For example:

```bash
cd ~
```

Then clone the repository:

```bash
git clone git@github.com:bymalathi/flavorforge-azure-devsecops-capstone.git
```

Git will download the repository to your computer.

---

# Step 13 — Enter the cloned project

Run:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Check where you are:

```bash
pwd
```

You should now be inside your local FlavorForge project.

The exact home directory can be different for another user.

For example, another user may see:

```text
/home/theirname/flavorforge-azure-devsecops-capstone
```

That is normal.

---

# Step 14 — Verify the Git repository

Run:

```bash
git status
```

Git should recognize the directory as a repository.

You may see something similar to:

```text
On branch main
nothing to commit, working tree clean
```

The exact output can be different depending on the repository state.

---

# Step 15 — Verify the GitHub remote

Run:

```bash
git remote -v
```

For the SSH setup, you should see something similar to:

```text
origin  git@github.com:bymalathi/flavorforge-azure-devsecops-capstone.git (fetch)
origin  git@github.com:bymalathi/flavorforge-azure-devsecops-capstone.git (push)
```

This confirms that the local FlavorForge project is connected to the GitHub repository.

---

# Step 16 — Clone FlavorForge using HTTPS + PAT

This is the alternative authentication method.

If you choose HTTPS instead of SSH, go to the directory where you want the project:

```bash
cd ~
```

Clone using the HTTPS repository URL:

```bash
git clone https://github.com/bymalathi/flavorforge-azure-devsecops-capstone.git
```

Git may ask for credentials.

Enter:

```text
Username: your-github-username
Password: <GITHUB_PAT>
```

For the password prompt, enter the **PAT**, not your normal GitHub password.

### Important

Do not type:

```text
<GITHUB_PAT>
```

literally.

That is only a placeholder showing where your securely created PAT should be used.

---

# Step 17 — Enter the project after HTTPS cloning

Run:

```bash
cd ~/flavorforge-azure-devsecops-capstone
```

Then check:

```bash
git status
```

Git should recognize the directory as a repository.

---

# Step 18 — Verify the remote when using HTTPS

Run:

```bash
git remote -v
```

With HTTPS, the remote will look similar to:

```text
origin  https://github.com/bymalathi/flavorforge-azure-devsecops-capstone.git (fetch)
origin  https://github.com/bymalathi/flavorforge-azure-devsecops-capstone.git (push)
```

---

# Step 19 — Check the FlavorForge files

Run:

```bash
ls -la
```

You should see the project files.

You can also check the project structure:

```bash
tree -L 2
```

The exact output can change as the project evolves.

You should see directories and files belonging to the FlavorForge project.

---

# Step 20 — Final Git verification

Run:

```bash
git --version
```

Then:

```bash
git status
```

Then:

```bash
git remote -v
```

If using SSH, also verify:

```bash
ssh -T git@github.com
```

These checks confirm that:

1. Git is installed.
2. Git is configured.
3. The FlavorForge repository was cloned.
4. The local directory is a Git repository.
5. The GitHub remote is configured.
6. GitHub authentication is working.

---

# What we used for FlavorForge

For clarity:

| Item                | FlavorForge                                      |
| ------------------- | ------------------------------------------------ |
| GitHub repository   | `bymalathi/flavorforge-azure-devsecops-capstone` |
| Authentication used | **SSH**                                          |
| Clone method used   | **SSH**                                          |
| PAT                 | Documented as an alternative method              |
| Local project       | `flavorforge-azure-devsecops-capstone`           |

The important point is that the BUILD-JOURNEY documents both methods, but it does **not** change the actual history of how FlavorForge was created.

---

# Result

The FlavorForge repository is now available on the user's own machine.

Git is configured.

GitHub authentication is configured.

The repository is cloned.

The GitHub remote is verified.

➡️ **Continue to `03-application`.**

---

# Helpful references

If a command does not work, refer to the official documentation:

* Git documentation: https://git-scm.com/doc
* GitHub documentation: https://docs.github.com/
* GitHub SSH documentation: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
* GitHub PAT documentation: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
* FlavorForge GitHub repository: https://github.com/bymalathi/flavorforge-azure-devsecops-capstone
