# Day 14 — Merged Supplementary Material

This file adds the practical notes, exercises, runbooks, or project artifacts from the second source repository. The main daily lesson remains `README.md`; use this supplement after completing its core labs.

---

## Source file: `README.md`

# Day 14 – Networking Fundamentals & Hands-on Checks

## Task
Get comfortable with core networking concepts and the commands you’ll actually run during troubleshooting.

You will:
- Map the **OSI vs TCP/IP models** in your own words
- Run essential connectivity commands
- Capture a mini network check for a target host/service

Keep it short, real, and repeatable.

---

## Expected Output
- A markdown file: `day-14-networking.md`
- Screenshots (optional) of key command outputs

---

## Quick Concepts (write 1–2 bullets each)
- OSI layers (L1–L7) vs TCP/IP stack (Link, Internet, Transport, Application)
- Where **IP**, **TCP/UDP**, **HTTP/HTTPS**, **DNS** sit in the stack
- One real example: “`curl https://example.com` = App layer over TCP over IP”

---

## Hands-on Checklist (run these; add 1–2 line observations)
- **Identity:** `hostname -I` (or `ip addr show`) — note your IP.
- **Reachability:** `ping <target>` — mention latency and packet loss.
- **Path:** `traceroute <target>` (or `tracepath`) — note any long hops/timeouts.
- **Ports:** `ss -tulpn` (or `netstat -tulpn`) — list one listening service and its port.
- **Name resolution:** `dig <domain>` or `nslookup <domain>` — record the resolved IP.
- **HTTP check:** `curl -I <http/https-url>` — note the HTTP status code.
- **Connections snapshot:** `netstat -an | head` — count ESTABLISHED vs LISTEN (rough).

Pick one target service/host (e.g., `google.com`, your lab server, or a local service) and stick to it for ping/traceroute/curl where possible.

---

## Mini Task: Port Probe & Interpret
1) Identify one listening port from `ss -tulpn` (e.g., SSH on 22 or a local web app).  
2) From the same machine, test it: `nc -zv localhost <port>` (or `curl -I http://localhost:<port>`).  
3) Write one line: is it reachable? If not, what’s the next check? (e.g., service status, firewall).

---

## Reflection (add to your markdown)
- Which command gives you the fastest signal when something is broken?
- What layer (OSI/TCP-IP) would you inspect next if DNS fails? If HTTP 500 shows up?
- Two follow-up checks you’d run in a real incident.

---

## Submission
1. Add `day-14-networking.md` to `2026/day-14/`
2. Commit and push to your fork

---

## Learn in Public
Post 2–3 lines on the commands you practiced and one interesting traceroute/curl finding.

Use hashtags:  
#90DaysOfDevOps  
#DevOpsKaJosh  
#TrainWithShubham

Happy Learning  
**TrainWithShubham**

---

## Source file: `day-14-networking.md`

# 🌐 Day 14 – Networking Fundamentals & Hands-on Checks

## 🎯 Objective

Today, I learned the basics of computer networking and practiced commonly used Linux networking commands. These commands are essential for troubleshooting connectivity, DNS, routing, HTTP requests, and open ports.

---

# 📚 Quick Concepts

## OSI Model vs TCP/IP Model

### OSI Model (7 Layers)

| Layer             | Purpose                            | Example               |
| ----------------- | ---------------------------------- | --------------------- |
| L7 - Application  | User-facing network services       | HTTP, HTTPS, DNS      |
| L6 - Presentation | Data formatting & encryption       | SSL/TLS               |
| L5 - Session      | Manages communication sessions     | NetBIOS               |
| L4 - Transport    | Reliable communication             | TCP, UDP              |
| L3 - Network      | Routing using IP addresses         | IP                    |
| L2 - Data Link    | Communication within local network | Ethernet, MAC Address |
| L1 - Physical     | Physical transmission              | Cable, Fiber, Wi-Fi   |

---

## TCP/IP Model (4 Layers)

| Layer       | Protocol Examples     |
| ----------- | --------------------- |
| Application | HTTP, HTTPS, DNS, SSH |
| Transport   | TCP, UDP              |
| Internet    | IP, ICMP              |
| Link        | Ethernet, Wi-Fi       |

---

## Where Common Protocols Fit

| Protocol     | Layer              |
| ------------ | ------------------ |
| HTTP / HTTPS | Application        |
| DNS          | Application        |
| TCP          | Transport          |
| UDP          | Transport          |
| IP           | Internet / Network |
| Ethernet     | Link / Data Link   |

---

## Real Example

When we run:

```bash
curl https://example.com
```

The request travels like this:

```text
Application (HTTP)
        ↓
Transport (TCP)
        ↓
Internet (IP)
        ↓
Link (Ethernet/Wi-Fi)
```

This means **HTTP works over TCP, which works over IP**.

---

# 🛠️ Hands-on Commands

## 1️⃣ Check System IP Address

### Command

```bash
hostname -I
```
or
```bash
ip addr show
```
<img width="1919" height="807" alt="Screenshot 2026-08-06 121936" src="https://github.com/user-attachments/assets/f4549c64-8882-47cd-b8aa-f3d5bdf18e5a" />


### Observation

* Displays the IP address assigned to the machine.
* Useful to identify the host on the network.

---

## 2️⃣ Check Network Connectivity

### Command

```bash
ping google.com
```
<img width="1372" height="252" alt="Screenshot 2026-08-06 122009" src="https://github.com/user-attachments/assets/83bfaf1a-e58d-405f-bfe5-6a6a4e0966e4" />


### Observation

* Packet loss: **0%**
* Average latency: **18 ms**
* Confirms internet connectivity.

---

## 3️⃣ Check Network Path

### Command

```bash
traceroute google.com
```
<img width="1841" height="243" alt="Screenshot 2026-08-06 122047" src="https://github.com/user-attachments/assets/b6481926-21f4-4658-b5b7-b53b3c6d01ce" />

### Observation

* Shows the route packets take to reach the destination.
* A few timeout (`* * *`) hops are normal because some routers block ICMP.

---

## 4️⃣ View Listening Ports

### Command

```bash
ss -tulpn
```
<img width="1873" height="253" alt="Screenshot 2026-08-06 122109" src="https://github.com/user-attachments/assets/15de4f6a-544a-404a-b5f6-0031081a585a" />

### Observation

* SSH service is listening on **Port 22**.
* Confirms the service is ready to accept connections.

---

## 5️⃣ DNS Lookup

### Command

```bash
dig google.com
```

<img width="1919" height="706" alt="Screenshot 2026-08-06 122137" src="https://github.com/user-attachments/assets/fc48aad3-ca7f-4c58-9650-3c5a0888e0a4" />

### Observation

* DNS successfully resolved the domain name into an IP address.

---

## 6️⃣ Check HTTP Response

### Command

```bash
curl -I https://google.com
```
<img width="1914" height="445" alt="Screenshot 2026-08-06 122224" src="https://github.com/user-attachments/assets/e7f483a6-5a44-4038-b12f-8d31c32b9db4" />

### Observation

* Status Code **200** means the website is reachable and working correctly.

---

## 7️⃣ View Active Connections

### Command

```bash
netstat -an | head
```
<img width="1300" height="344" alt="Screenshot 2026-08-06 122335" src="https://github.com/user-attachments/assets/11748495-0ee5-47ae-b051-109140838e66" />

### Observation

This command provides a quick overview of current network connections.

---

# 🔎 Mini Task – Port Probe

## Step 1

Find an open port.

```bash
ss -tulpn
```
---

## Step 2

Test the port.

```bash
nc -zv localhost 22
```

<img width="804" height="143" alt="Screenshot 2026-08-06 123232" src="https://github.com/user-attachments/assets/8cb15608-e24e-47cd-a9b3-56515a36cc24" />

### Observation

* The port is reachable.
* SSH service is running successfully.

### If Connection Fails

Check:

* Is the service running?

```bash
systemctl status sshd
```

* Is the firewall blocking the port?

```bash
sudo firewall-cmd --list-all
```
<img width="1092" height="448" alt="Screenshot 2026-08-06 125123" src="https://github.com/user-attachments/assets/9394ac0a-4939-4f46-a005-295300e5e622" />

---

# 💡 Troubleshooting Summary

| Problem            | First Command  |
| ------------------ | -------------- |
| No Internet        | ping           |
| DNS Issue          | dig / nslookup |
| Website Down       | curl           |
| Port Issue         | ss             |
| Route Issue        | traceroute     |
| Active Connections | netstat        |

---

# 📝 Reflection

### Which command gives the fastest signal when something is broken?

**ping**

It quickly tells whether the destination is reachable and shows latency or packet loss.

---

### If DNS fails, which layer would you inspect?

* **Application Layer (OSI)**
* **Application Layer (TCP/IP)**

Because DNS is an application-layer protocol.

---

### If HTTP 500 appears, which layer would you inspect?

The network is working because the server responded.

I would investigate:

* Web server logs
* Application logs
* Backend service
* Database connectivity

---

### Two follow-up checks in a real incident

1. Verify whether the required service is running.

```bash
systemctl status <service-name>
```

2. Check firewall rules and open ports.

```bash
ss -tulpn
```

or

```bash
firewall-cmd --list-all
```

---

# 📌 Commands Practiced Today

```bash
hostname -I
ip addr show
ping google.com
traceroute google.com
tracepath google.com
ss -tulpn
dig google.com
nslookup google.com
curl -I https://google.com
netstat -an | head
nc -zv localhost 22
systemctl status sshd
firewall-cmd --list-all
```

---

# 🎯 Key Takeaways

* Learned the difference between the **OSI** and **TCP/IP** networking models.
* Understood where common protocols like **HTTP, HTTPS, DNS, TCP, UDP, and IP** fit.
* Practiced essential Linux networking commands used for real-world troubleshooting.
* Verified connectivity, routing, DNS resolution, HTTP responses, and listening ports.
* Performed a basic port probe and learned the first troubleshooting steps when a service is unreachable.

---

**#90DaysOfDevOps #DevOpsKaJosh #TrainWithShubham**
