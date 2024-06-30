# USEFUL GIT INFORMATION


Ewooral: why does my git push in the name of my other account but not the account that has my current codebase

GitHub Copilot: When Git pushes commits in the name of a different account than the one you intend to use, it's typically due to the Git configuration settings for either the global user or the repository-specific user. Git allows you to set user information on two levels:

1. **Global Level**: Applies to all repositories on your system unless overridden by local settings.
2. **Local Level**: Applies to a specific repository, overriding global settings.

Here's how to troubleshoot and resolve the issue:

### Step 1: Check Current Configuration
First, check the current Git configuration for both global and local (repository-specific) settings.

- **Global User Info**: Run the following commands in your terminal to see the global Git username and email:
  ```bash
  git config --global user.name
  git config --global user.email
  ```

- **Local User Info**: Navigate to your repository directory in the terminal and run these commands to see the local Git username and email:
  ```bash
  git config user.name
  git config user.email
  ```

### Step 2: Update Configuration
Based on what you find, you can update the Git configuration as needed:

- **To Change Global User Info**: If you want to update the global username and email, use:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

- **To Change Local User Info**: If you prefer to set or change the username and email for the current repository only, omit the `--global` flag:
  ```bash
  git config user.name "Your Name"
  git config user.email "your.email@example.com"
  ```

### Step 3: Correcting Author Information for Previous Commits
If you've already made commits with the incorrect user information and need to correct them, you can amend the author information of the most recent commit using:
```bash
git commit --amend --author="Your Name <your.email@example.com>"
```
For changing the author information on multiple commits, more complex commands involving `git rebase` or using a script might be necessary, which should be done with caution to avoid disrupting the commit history for others.

### Additional Checks
- **SSH Keys**: If you're using SSH keys, ensure that the SSH key associated with your current account is added to your SSH agent and that the correct key is linked to your GitHub account.
- **Credential Manager**: If you're on Windows, the Git Credential Manager might have stored credentials for the other account. You might need to update or clear these credentials.

After updating your Git configuration, future commits should reflect the correct user information. Remember to push any changes to the remote repository to reflect these updates.