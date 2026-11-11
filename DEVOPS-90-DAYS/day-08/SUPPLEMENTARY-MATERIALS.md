# Day 08 — Merged Supplementary Material

This file adds the practical notes, exercises, runbooks, or project artifacts from the second source repository. The main daily lesson remains `README.md`; use this supplement after completing its core labs.

---

## Source file: `README.md`

# Day 08 – Cloud Server Setup: Docker, Nginx & Web Deployment

## Task
Today's goal is to **deploy a real web server on the cloud** and learn practical server management.

You will:
- Launch a cloud instance (AWS EC2 or Utho)
- Connect via SSH
- Install Nginx
- Configure security groups for web access (port 80 by default for nginx)
- Extract and save logs to a file
- Verify your webpage is accessible from the internet

This is real DevOps work - exactly what you'll do in production.

---

## Expected Output
By the end of today, you should have:

1. A markdown file named: `day-08-cloud-deployment.md`
2. Screenshots showing:
   - SSH connection to your server
   - Nginx welcome page accessible from browser
   - Log file contents
3. The log file: `nginx-logs.txt`

---

## Prerequisites
- AWS account (Free Tier) OR Utho account
- Basic understanding of Linux commands (Days 1-7)
- SSH client (Terminal on Mac/Linux, PuTTY on Windows)

---

## Guidelines

### Part 1: Launch Cloud Instance & SSH Access (15 minutes)

**Step 1: Create a Cloud Instance**


**Step 2: Connect via SSH**


---

### Part 2: Install Docker & Nginx (20 minutes)

**Step 1: Update System**


**Step 3: Install Nginx**

**Verify Nginx is running:**

---

### Part 3: Security Group Configuration (10 minutes)

**Test Web Access:**
Open browser and visit: `http://<your-instance-ip>`

You should see the **Nginx welcome page**!

📸 **Screenshot this page** - you'll need it for submission

---

### Part 4: Extract Nginx Logs (15 minutes)

**Step 1: View Nginx Logs**

**Step 2: Save Logs to File**

**Step 3: Download Log File to Your Local Machine**
```bash
# On your local machine (new terminal window)
# For AWS:
scp -i your-key.pem ubuntu@<your-instance-ip>:~/nginx-logs.txt .

# For Utho:
scp root@<your-instance-ip>:~/nginx-logs.txt .
```

---


## Documentation Template

Create your `day-08-cloud-deployment.md` with this structure:

## Commands Used
[List the key commands you used]

## Challenges Faced
[Describe any issues and how you solved them]

## What I Learned
[3-5 bullet points of key learnings]

---


## Why This Matters for DevOps

This exercise teaches you:
- **Cloud infrastructure provisioning** - launching and configuring servers
- **Remote server management** - SSH, security, access control
- **Service deployment** - installing and running applications
- **Log management** - accessing and analyzing logs
- **Security** - configuring firewalls and security groups

These are core skills for any DevOps engineer working in production.

---


## Submission
1. Fork this `90DaysOfDevOps` repository
2. Navigate to the `2026/day-08/` folder
3. Add your `day-08-cloud-deployment.md` file
4. Add your `nginx-logs.txt` file
5. Add screenshots (name them: `ssh-connection.png`, `nginx-webpage.png`, `docker-nginx.png`)
6. Commit and push your changes to your fork

---

## Learn in Public
Share your Day 08 progress on LinkedIn:

- Post 2-3 lines on deploying your first cloud server
- Share screenshot of your Nginx webpage
- Mention one challenge you faced and solved
- Optional: Share your instance IP (if comfortable)

Use hashtags:
```
#90DaysOfDevOps
#DevOpsKaJosh
#TrainWithShubham
```

Happy Learning
**TrainWithShubham**

---

## Source file: `day-08-cloud-deployment.md`

# Day 08 – Cloud Server Setup: Docker, Nginx & Web Deployment

## Part 1: Launch Cloud Instance & SSH Access  
Step 1: Created a Ubuntu EC2 Instance in AWS account  

Step 2: Connect via SSH  
- Setup the security group for SSH connection (Port 22)  
- Access the AWS EC2 instance from local system using Git bash terminal  
  `ssh -i "private-key.pem" username@public-ip/hostname`

-----

## Part 2: Install Docker & Nginx  
Step 1: Update System  
`sudo apt update && sudo apt upgrade -y`

Step 2: Install Nginx
```
sudo apt install nginx
systemctl start nginx
systemctl enable nginx
```

<img width="1919" height="816" alt="Screenshot 2026-07-30 234838" src="https://github.com/user-attachments/assets/b1714345-fbff-45a9-bb50-baa28f9f72d1" />

Step 3: Install docker
```
sudo apt install docker.io
systemctl start dokcer
systemctl enable docker
```
<img width="1708" height="131" alt="Screenshot 2026-07-30 235412" src="https://github.com/user-attachments/assets/c3b9336e-4cb7-4e2f-b715-0234eff688cf" />

---------

## Part 3: Security Group Configuration
- Setup the security group fot http traffic (Port 80)  
- Test Web Access: Open browser and visit: http://<instance-ip>

<img width="1910" height="543" alt="Screenshot 2026-07-31 000711" src="https://github.com/user-attachments/assets/8de59113-d2b9-4727-a2a6-a4f41f55822b" />

------------

## Part 4: Extract Nginx Logs  
Step 1: View Nginx Logs
`journalctl -u nginx`

Step 2: Save Logs to File
`sudo cat /var/log/nginx/access.log > nginx-logs.txt`

Step 3: Download Log File to Your Local Machine  
`scp -i "Mylinux-server.pem" ubuntu@13.232.139.224:/home/ubuntu/nginx-logs.txt ./nginx-logs.txt`

--------------

## Commands Used  
- ssh -i "private-key.pem" username@public-ip/hostname  
- sudo apt update && sudo apt upgrade -y  
- systemctl status <service>  
- journalctl -u <service>  
- scp -i "Mylinux-server.pem" ubuntu@13.232.139.224:/home/ubuntu/nginx-logs.txt ./nginx-logs.txt
