Ewooral: lets set up ssh on my machine and link it to my github

GitHub Copilot: To set up SSH on your Linux machine and link it to your GitHub account, follow these steps:

1. **Open Terminal**: Launch your terminal application.

2. **Check for Existing SSH Keys**: First, check if you already have SSH keys generated.
   ```bash
   ls -al ~/.ssh
   ```
   Look for files named `id_rsa.pub` or `id_ed25519.pub`. If you see such files, you can skip the key generation step. If not, proceed to generate a new SSH key.

3. **Generate a New SSH Key**: Replace `your_email@example.com` with your GitHub email address.
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
   When prompted to "Enter a file in which to save the key," press Enter to accept the default location.

4. **Start the SSH Agent in the Background**:
   ```bash
   eval "$(ssh-agent -s)"
   ```

5. **Add Your SSH Key to the SSH Agent**:
   ```bash
   ssh-add ~/.ssh/id_ed25519
   ```

6. **Copy the SSH Key to Your Clipboard**:
   - For Ubuntu or Debian-based systems, you can install xclip and then copy the SSH key to your clipboard:
     ```bash
     sudo apt-get install xclip
     xclip -selection clipboard < ~/.ssh/id_ed25519.pub
     ```
   - For other Linux distributions, you might need to manually open the file and copy the contents.

7. **Add Your SSH Key to Your GitHub Account**:
   - Go to GitHub and log in.
   - Click your profile photo, then click **Settings**.
   - In the user settings sidebar, click **SSH and GPG keys**.
   - Click **New SSH key** or **Add SSH key**.
   - In the "Title" field, add a descriptive label for the new key, e.g., "My Linux machine".
   - Paste your key into the "Key" field.
   - Click **Add SSH key**.

8. **Test Your SSH Connection**:
   ```bash
   ssh -T git@github.com
   ```
   If everything is set up correctly, you will see a message saying you've successfully authenticated, but GitHub does not provide shell access.

This process will link your machine with your GitHub account via SSH, allowing you to securely push and pull changes without needing to use a password.