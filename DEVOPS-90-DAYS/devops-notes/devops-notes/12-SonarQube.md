# SonarQube Complete Notes: Beginner to Advanced

## A Complete DevOps, DevSecOps, CI/CD and Production Administration Guide

**Author:** Charlie MJ  
**Date:** November 8, 2026  
**Level:** Beginner to Advanced  
**Technology:** SonarQube Server, SonarQube Cloud, Docker, Kubernetes, Jenkins, GitHub Actions, GitLab CI/CD, Azure DevOps

# Part 1: Introduction to SonarQube

## 1. What Is SonarQube?

SonarQube is a code quality and code security analysis platform that continuously inspects source code to identify:

- Bugs.
- Security vulnerabilities.
- Code smells.
- Security hotspots.
- Duplicated code.
- Poor coding practices.
- Complex code.
- Maintainability problems.
- Missing test coverage information.
- Technical debt.

SonarQube performs static code analysis, meaning it analyzes source code without executing the application.

It helps development teams maintain code quality throughout the software development lifecycle.

### 1.1 Who Develops SonarQube?

- SonarQube is developed by SonarSource.
- The original Sonar project started in 2007.
- Its original objective was to make continuous code inspection as important as continuous integration.
- SonarSource develops the SonarQube platform and related code analysis products.

### 1.2 Is SonarQube a DevOps Tool?

Yes. SonarQube is commonly used in DevOps and DevSecOps environments.

It integrates with:

- Git.
- GitHub.
- GitLab.
- Bitbucket.
- Jenkins.
- GitHub Actions.
- GitLab CI/CD.
- Azure DevOps.
- Maven.
- Gradle.
- Docker.
- Kubernetes.
- Developer IDEs.

### 1.3 Why Do Organizations Use SonarQube?

Organizations use SonarQube to:

- Detect bugs before applications reach production.
- Identify security problems early.
- Maintain consistent coding standards.
- Reduce technical debt.
- Improve application maintainability.
- Enforce coding standards across development teams.
- Monitor software quality over time.
- Prevent poor-quality code from being merged.
- Introduce automated code quality checks into CI/CD pipelines.
- Support secure software development practices.

### 1.4 What Is Static Code Analysis?

Static code analysis is the process of examining source code without running the application.

For example:

    public class Calculator {

        public int divide(int a, int b) {
            return a / b;
        }
    }

A static analyzer may identify that the method does not handle division by zero.

SonarQube can identify certain problems by inspecting the code structure and data flow.

**Important:** SonarQube does not replace application testing. It complements unit tests, integration tests, security testing, and runtime monitoring.

### 1.5 What Is SAST?

SAST stands for Static Application Security Testing.

It examines source code to detect security vulnerabilities before an application is deployed.

Examples:

- SQL injection.
- Cross-site scripting.
- Command injection.
- Hardcoded credentials.
- Insecure cryptographic practices.
- Unsafe data handling.
- Certain authentication and authorization problems.

SonarQube provides static security analysis and, depending on the product, edition, language, and analyzer capabilities, advanced security analysis.

# Part 2: SonarQube Terminology and Fundamentals

## 2. Important SonarQube Terminology

### 2.1 Source Code

The human-readable programming instructions written by developers.

Examples:

- Java.
- Python.
- JavaScript.
- TypeScript.
- C#.
- Go.
- PHP.
- C and C++.

### 2.2 Static Analysis

Analyzing source code without executing the application.

### 2.3 Scanner

A SonarScanner is a client-side analysis tool.

Its responsibilities include:

- Reading project source code.
- Collecting analysis information.
- Applying language analyzers.
- Reading configuration.
- Importing supported external reports.
- Preparing an analysis report.
- Uploading the report to SonarQube Server or SonarQube Cloud.

### 2.4 Analysis

An analysis is a particular inspection of a project at a specific point in time.

Every successful analysis produces a new set of project quality information.

### 2.5 Project Key

A unique identifier used to identify a project in SonarQube.

Example:

    sonar.projectKey=company-payment-service

### 2.6 Project Name

The display name of a project.

    sonar.projectName=Payment Service

### 2.7 Project Version

A project version can be specified for identification and reporting purposes.

    sonar.projectVersion=1.0.0

### 2.8 Quality Profile

A collection of active coding rules for a programming language.

### 2.9 Quality Gate

A collection of conditions that determines whether a project meets the required quality standards.

### 2.10 Technical Debt

The estimated effort required to fix maintainability issues in a codebase.

### 2.11 New Code

New Code is the code introduced or changed relative to a configured baseline.

SonarQube uses this concept to encourage teams to maintain quality without requiring them to fix every historical problem immediately.

### 2.12 Main Branch

The primary development branch of a project.

Common examples:

- main.
- master.
- develop.

The actual main branch is configurable.

### 2.13 Branch Analysis

Analysis of a Git branch separately from the main branch.

### 2.14 Pull Request Analysis

Analysis of code changes proposed through a pull request.

It helps identify problems before changes are merged.

Branch and pull request analysis availability depends on the product and edition.

# Part 3: SonarQube Issues and Code Quality

## 3. Types of Issues in SonarQube

SonarQube identifies different types of problems.

### 3.1 Bugs

A bug is a coding problem that could cause incorrect application behavior.

Examples:

- Division by zero.
- Incorrect comparison.
- Null pointer dereference.
- Incorrect resource handling.
- Potential memory problems.
- Unreachable code.
- Incorrect logical conditions.

Example:

    public int calculate(int number) {
        return number / 0;
    }

This code contains a clear runtime problem.

### 3.2 Vulnerabilities

A vulnerability is a security weakness that may be exploitable by an attacker.

Examples:

- SQL injection.
- Cross-site scripting.
- Command injection.
- Insecure authentication.
- Unsafe deserialization.
- Hardcoded credentials.
- Insecure data handling.

SQL injection example:

    String query =
        "SELECT * FROM users WHERE username = '" + username + "'";

The problem is that user-controlled input is directly added to an SQL statement.

A safer approach is to use parameterized queries:

    String query =
        "SELECT * FROM users WHERE username = ?";

    PreparedStatement statement =
        connection.prepareStatement(query);

    statement.setString(1, username);

### 3.3 Code Smells

A code smell is a coding practice that makes software difficult to understand, maintain, or extend.

It does not necessarily mean the application is currently broken.

Examples:

- Very long methods.
- Large classes.
- Duplicated code.
- Unused variables.
- Too many parameters.
- Deeply nested conditions.
- Poor naming conventions.
- Repeated logic.
- Unnecessary complexity.

Example:

    def process():
        a = 10
        b = 20
        c = a + b
        print(c)

Possible improvements include better naming, separation of responsibilities, and appropriate documentation.

### 3.4 Security Hotspots

A Security Hotspot is security-sensitive code that requires human review.

A hotspot does not automatically mean that a vulnerability exists.

Examples:

- Cryptographic algorithms.
- File access.
- CORS configuration.
- Authentication-related code.
- Cookie security settings.
- Regular expressions.
- Permission handling.

Security hotspots should be reviewed and classified according to the actual security context.

### 3.5 Bugs vs Vulnerabilities vs Code Smells vs Hotspots

- Bug: The code may behave incorrectly.
- Vulnerability: The code contains a security weakness.
- Code smell: The code is difficult to maintain.
- Security hotspot: The code requires a security review.

## 4. Issue Severity

SonarQube severity terminology has evolved across versions and interfaces.

In the newer Clean Code model, issue severities include:

- Blocker.
- High.
- Medium.
- Low.
- Info.

Older versions and interfaces commonly use:

- Blocker.
- Critical.
- Major.
- Minor.
- Info.

Severity helps teams prioritize issues.

### 4.1 Blocker

An extremely serious problem that may cause severe application failures or significant security exposure.

### 4.2 High

A serious issue that should be prioritized.

### 4.3 Medium

A problem that should be addressed as part of normal development.

### 4.4 Low

A relatively minor issue.

### 4.5 Info

An informational finding.

**Important:** Do not confuse issue severity with software quality ratings.

# Part 4: SonarQube Quality Metrics

## 5. Important Code Quality Metrics

### 5.1 Code Coverage

Code coverage measures how much code is executed by automated tests.

Example:

- Total executable lines: 1000.
- Lines covered by tests: 800.
- Coverage: 80%.

Formula:

    Coverage = (Covered Lines / Total Executable Lines) × 100

SonarQube does not execute unit tests or independently generate coverage reports.

It imports coverage reports generated by external testing tools.

Examples:

- JaCoCo for Java.
- LCOV for JavaScript and TypeScript.
- pytest-cov for Python.
- Coverlet for .NET.

### 5.2 Line Coverage

Measures the percentage of executable lines executed by tests.

### 5.3 Branch Coverage

Measures the percentage of decision branches exercised by tests.

For example:

    if (age >= 18) {
        System.out.println("Adult");
    } else {
        System.out.println("Minor");
    }

A complete branch test should exercise both outcomes.

### 5.4 Duplicated Code

Measures repeated code blocks.

Code duplication creates problems because:

- Fixes must be repeated in multiple places.
- Changes become difficult to maintain.
- Bugs can be repeated.
- Development becomes less efficient.

### 5.5 Lines of Code

SonarQube measures code size and related project information.

### 5.6 Cyclomatic Complexity

Cyclomatic complexity measures the number of independent execution paths through code.

A simplified formula is:

    Cyclomatic Complexity = 1 + Number of Decision Points

Decision points may include:

- if.
- else if.
- for.
- while.
- case.
- Conditional expressions.

Higher complexity usually means more testing is needed.

### 5.7 Cognitive Complexity

Cognitive complexity estimates how difficult code is for humans to understand.

It considers factors such as:

- Nested conditions.
- Nested loops.
- Complex control flow.
- Logical structures.

Cyclomatic complexity measures paths; cognitive complexity focuses more on understandability.

### 5.8 Technical Debt

Technical debt is the estimated development effort required to correct maintainability problems.

Example:

    Total maintainability remediation effort: 12 hours

This means SonarQube estimates that approximately 12 hours of work may be required to resolve the identified maintainability issues.

### 5.9 Technical Debt Ratio

The technical debt ratio compares remediation effort with the estimated effort required to develop the software.

A simplified conceptual formula:

    Technical Debt Ratio =
    Remediation Cost / Development Cost × 100

A lower ratio generally indicates better maintainability.

### 5.10 Reliability Rating

Reliability rating is based on bugs.

### 5.11 Security Rating

Security rating is based on vulnerabilities.

### 5.12 Maintainability Rating

Maintainability rating is based on technical debt ratio.

### 5.13 Rating Scale

SonarQube uses A-to-E quality ratings:

- A: Best.
- B: Good.
- C: Moderate.
- D: Poor.
- E: Worst.

A rating of A represents a stronger quality result than E.

# Part 5: SonarQube Products and Editions

## 6. SonarQube Product Family

### 6.1 SonarQube Server

SonarQube Server is a self-managed platform installed on infrastructure controlled by an organization.

It can run on:

- Linux.
- Windows-supported environments.
- Docker.
- Kubernetes or OpenShift, where supported.

Organizations manage:

- Installation.
- Database.
- Authentication.
- Storage.
- Backups.
- Upgrades.
- Security.
- Availability.

### 6.2 SonarQube Community Build

Community Build is the free self-managed option.

It is suitable for:

- Learning.
- Personal projects.
- Small development environments.
- Basic source-code analysis.
- Local experimentation.

Check the current feature documentation for its supported branch and pull request capabilities.

Do not assume that Community Build offers every feature available in paid Server editions.

### 6.3 Developer Edition

Provides additional capabilities for professional development teams.

Depending on the current release and subscription, capabilities include:

- Branch analysis.
- Pull request analysis.
- Additional language and security capabilities.
- Development platform integration.

### 6.4 Enterprise Edition

Designed for larger organizations.

Additional capabilities include enterprise-level reporting, portfolio management, governance, and other advanced features.

### 6.5 Data Center Edition

Designed for high-availability and large-scale deployments.

It supports a clustered architecture and is intended for organizations with demanding availability and scalability requirements.

### 6.6 SonarQube Cloud

SonarQube Cloud is the managed SaaS offering.

Advantages:

- No self-hosted SonarQube server.
- No database administration.
- Managed infrastructure.
- Integration with supported DevOps platforms.
- Centralized code quality and security analysis.

### 6.7 SonarQube for IDE

Formerly known as SonarLint.

It integrates into developer IDEs.

Supported IDE integrations include:

- Visual Studio Code.
- IntelliJ IDEA.
- Visual Studio.
- Eclipse.

Benefits:

- Early feedback.
- Local code analysis.
- Detection of problems while writing code.
- Connection with server-side quality standards through supported connected modes.

### 6.8 Which Product Should You Choose?

- Learning and local testing: Community Build.
- Professional self-hosted development: Developer Edition or higher, depending on requirements.
- Large enterprise: Enterprise or Data Center Edition.
- Managed cloud environment: SonarQube Cloud.
- Local developer feedback: SonarQube for IDE.

Always verify the current licensing and feature comparison before selecting an edition.

# Part 6: SonarQube Architecture

## 7. SonarQube Architecture Overview

A typical SonarQube environment consists of:

- SonarQube Server.
- Database.
- SonarScanner.
- Language analyzers.
- Plugins.
- CI/CD server.
- Developer IDE.
- Git repository.

### 7.1 SonarQube Server Components

The server has three important internal components.

#### A. Web Server

Responsible for:

- Web interface.
- User authentication.
- Project management.
- Configuration.
- REST API access.
- User interaction.

Default web port:

    9000

#### B. Search Engine

SonarQube uses Elasticsearch-based search infrastructure.

It supports:

- Searching issues.
- Searching projects.
- Searching rules.
- Indexing analysis information.
- Supporting UI search operations.

#### C. Compute Engine

The Compute Engine processes uploaded analysis reports.

Its responsibilities include:

- Processing reports.
- Calculating project measures.
- Updating issues.
- Updating quality gate results.
- Persisting analysis information.
- Updating project data.

### 7.2 Database

The database stores persistent SonarQube information, including:

- Project configuration.
- User information.
- Permissions.
- Quality profiles.
- Quality gates.
- Issues.
- Analysis history.
- Project measures.
- Other application data.

PostgreSQL is commonly used for production installations.

The database is not accessed directly by SonarScanners.

### 7.3 SonarScanner

The scanner runs on the machine executing the analysis.

For example:

- Jenkins agent.
- GitHub Actions runner.
- GitLab runner.
- Azure DevOps agent.
- Developer workstation.

The scanner analyzes code and sends its report to the SonarQube server.

### 7.4 Language Analyzers

Language analyzers provide the rules and analysis logic required to inspect source code.

Examples:

- Java analyzer.
- Python analyzer.
- JavaScript analyzer.
- TypeScript analyzer.
- C# analyzer.
- Go analyzer.

### 7.5 Plugins

Plugins extend SonarQube functionality.

Examples include:

- Language support.
- Authentication integration.
- Additional analysis capabilities.
- SCM integration.
- External integrations.

Only install compatible and trusted plugins.

### 7.6 Architecture Communication

Important communication rules:

- Scanner communicates with SonarQube Server.
- SonarQube Server communicates with its database.
- Developers access SonarQube through a browser.
- CI/CD tools execute scanners.
- The scanner does not communicate directly with the SonarQube database.
- The database should not be publicly exposed.

### 7.7 SonarQube Analysis Flow

1.  Developer writes source code.
2.  Developer commits and pushes changes.
3.  Git repository receives the changes.
4.  CI/CD pipeline starts.
5.  Build tools compile the application if required.
6.  Unit tests execute.
7.  Coverage tools generate reports.
8.  SonarScanner analyzes source code.
9.  Scanner uploads the analysis report.
10. Compute Engine processes the report.
11. Results are stored in the database and search indexes are updated.
12. SonarQube calculates the Quality Gate status.
13. CI/CD pipeline retrieves the result.
14. Developer reviews and fixes identified issues.

### 7.8 Example Real-World Architecture

    Developer
        |
        v
    IDE + SonarQube for IDE
        |
        v
    Git Repository
        |
        v
    CI/CD Pipeline
        |
        +---- Build Application
        |
        +---- Execute Unit Tests
        |
        +---- Generate Coverage
        |
        +---- Run SonarScanner
                    |
                    v
             SonarQube Server
                    |
            +-------+-------+
            |       |       |
            v       v       v
           Web   Search  Compute
            |       |       |
            +-------+-------+
                    |
                    v
                 Database
                    |
                    v
              Quality Gate
                    |
                    v
              Pipeline Result

# Part 7: SonarQube Installation

## 8. System Requirements

Actual requirements depend on the SonarQube release and project size.

As a starting point for a small server installation:

- 64-bit operating system.
- At least 4 GB RAM.
- At least 2 CPU cores.
- Approximately 30 GB disk space.
- Adequate free disk space.
- Supported database for production.
- Supported operating system and architecture.

For large installations, substantially more memory, CPU, and disk resources may be required.

Always check the official requirements for your selected release.

### 8.1 Linux Prerequisites

SonarQube's search engine requires suitable Linux kernel and file descriptor settings.

Common settings include:

``` bash
sudo sysctl -w vm.max_map_count=524288
sudo sysctl -w fs.file-max=131072
```

Persist the settings in the appropriate Linux configuration files.

Verify:

    sysctl vm.max_map_count
    sysctl fs.file-max

### 8.2 Java Requirements

Do not assume that every SonarQube release requires the same Java version.

- SonarQube Server releases have their own runtime requirements.
- Some distributions bundle the required runtime.
- Scanners and build tools may have separate Java requirements.
- Maven and Gradle projects may need a suitable JDK to compile the application.

Check the documentation for the exact server and scanner versions.

## 9. Install SonarQube Using Docker

Docker is one of the easiest ways to learn SonarQube.

### 9.1 Install Docker

Install Docker Engine or Docker Desktop.

Verify:

``` bash
docker --version
```

Check Docker:

``` bash
docker ps
```

### 9.2 Run SonarQube

For a quick local evaluation:

``` bash
docker run -d \
  --name sonarqube \
  -p 9000:9000 \
  sonarqube:community
```

This uses the Community Build image tag where available.

For repeatable deployments, pin a supported version rather than relying on a moving tag.

### 9.3 Open SonarQube

Open:

    http://localhost:9000

Default credentials for a fresh instance:

``` yaml
Username: admin
Password: admin
```

Change the password during initial setup.

### 9.4 Check Container Status

``` bash
docker ps
```

### 9.5 View Logs

``` bash
docker logs -f sonarqube
```

### 9.6 Stop SonarQube

``` bash
docker stop sonarqube
```

### 9.7 Start SonarQube

``` bash
docker start sonarqube
```

### 9.8 Remove Container

``` bash
docker rm -f sonarqube
```

**Important:** A simple container without persistent volumes is suitable for experimentation, not a reliable production deployment.

## 10. Install SonarQube Using Docker Compose

Docker Compose allows SonarQube and PostgreSQL to run together.

It is more suitable for a persistent development environment.

### 10.1 Create Project Directory

``` bash
mkdir sonarqube-docker
cd sonarqube-docker
```

### 10.2 Create docker-compose.yml

    services:

      db:
        image: postgres:17
        container_name: sonarqube-db

        environment:
          POSTGRES_USER: sonar
          POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
          POSTGRES_DB: sonar

        volumes:
          - postgresql_data:/var/lib/postgresql/data

        networks:
          - sonarnet

        healthcheck:
          test: ["CMD-SHELL", "pg_isready -U sonar -d sonar"]
          interval: 10s
          timeout: 5s
          retries: 10

      sonarqube:
        image: sonarqube:community
        container_name: sonarqube

        depends_on:
          db:
            condition: service_healthy

        environment:
          SONAR_JDBC_URL: jdbc:postgresql://db:5432/sonar
          SONAR_JDBC_USERNAME: sonar
          SONAR_JDBC_PASSWORD: ${POSTGRES_PASSWORD}

        ports:
          - "9000:9000"

        volumes:
          - sonarqube_data:/opt/sonarqube/data
          - sonarqube_extensions:/opt/sonarqube/extensions
          - sonarqube_logs:/opt/sonarqube/logs

        networks:
          - sonarnet

    volumes:
      postgresql_data:
      sonarqube_data:
      sonarqube_extensions:
      sonarqube_logs:

    networks:
      sonarnet:
        driver: bridge

Use a PostgreSQL version supported by your exact SonarQube release. The version above is an example, not a universal compatibility guarantee.

### 10.3 Create .env File

    POSTGRES_PASSWORD=replace-with-a-strong-password

Never commit the `.env` file to Git.

### 10.4 Start Services

``` bash
docker compose up -d
```

### 10.5 Check Containers

``` bash
docker compose ps
```

### 10.6 Check SonarQube Logs

``` bash
docker compose logs -f sonarqube
```

### 10.7 Stop Services

``` bash
docker compose down
```

Persistent volumes remain unless explicitly removed.

### 10.8 Remove Everything Including Data

``` bash
docker compose down -v
```

**Warning:** This deletes the associated persistent volumes and database data.

### 10.9 Why PostgreSQL?

An embedded evaluation database is not appropriate for a production SonarQube installation.

PostgreSQL provides:

- Persistent database storage.
- Production-oriented database management.
- Backup and restore tools.
- Better operational control.
- Support for larger installations.

## 11. Install SonarQube from ZIP

This is another installation method.

### 11.1 Download SonarQube

Download the appropriate distribution from the official SonarSource website.

### 11.2 Extract the Package

Linux example:

``` bash
sudo mkdir -p /opt/sonarqube

sudo unzip sonarqube.zip -d /opt/
```

### 11.3 Configure User Permissions

Run SonarQube as a dedicated non-root operating system user.

Do not run the service as root.

### 11.4 Start SonarQube on Linux

``` bash
cd /opt/sonarqube/bin/linux-x86-64

./sonar.sh start
```

To run in console mode:

    ./sonar.sh console

### 11.5 Stop SonarQube

    ./sonar.sh stop

### 11.6 Windows

Use the Windows distribution and its provided startup scripts.

For example:

    bin\windows-x86-64\StartSonar.bat

For production, follow the supported service and operating system installation guidance.

# Part 8: First SonarQube Project

## 12. Create Your First Project

After installing SonarQube:

1.  Open the web interface.
2.  Log in.
3.  Select Create Project or the equivalent project onboarding option.
4.  Enter a project display name.
5.  Enter a unique project key.
6.  Select the main branch.
7.  Choose a new-code definition.
8.  Generate an analysis token.
9.  Select your analysis method.

Example:

    Project Name: Python Application
    Project Key: python-application
    Main Branch: main

## 13. Generate an Authentication Token

A token authenticates a scanner with SonarQube.

Steps:

1.  Open your user account.
2.  Navigate to Security.
3.  Generate a token.
4.  Give the token a descriptive name.
5.  Select an appropriate token type and scope where supported.
6.  Copy the token immediately.
7.  Store it securely.

### 13.1 Why Use Tokens?

Tokens:

- Avoid using personal account passwords in automation.
- Support automated analysis.
- Can be revoked.
- Can be managed according to permissions and scope.

### 13.2 Token Security

Never:

- Commit tokens to Git.
- Publish tokens in GitHub repositories.
- Store tokens in source code.
- Share tokens in screenshots.
- Print tokens in CI/CD logs.

Use:

- Jenkins Credentials.
- GitHub Actions Secrets.
- GitLab CI/CD Variables.
- Azure DevOps Variable Groups.
- Secret managers.

# Part 9: SonarScanner

## 14. What Is SonarScanner?

SonarScanner is the analysis client that connects source code projects to SonarQube.

It runs during a build or CI/CD process.

Its primary functions are:

- Analyze source code.
- Collect analysis information.
- Read configuration.
- Import external reports.
- Upload analysis results.

## 15. Types of SonarScanners

### 15.1 SonarScanner CLI

A general-purpose scanner.

Useful for:

- Python.
- JavaScript.
- TypeScript.
- PHP.
- Other supported projects without a specialized build integration.

### 15.2 SonarScanner for Maven

Used for Maven projects.

Example:

``` bash
mvn clean verify sonar:sonar
```

### 15.3 SonarScanner for Gradle

Used for Gradle projects.

Example:

    ./gradlew clean test sonar

Use the task name and configuration appropriate to the installed plugin version.

### 15.4 SonarScanner for .NET

Used with .NET projects.

Typical workflow:

    dotnet sonarscanner begin /k:"my-dotnet-project"

    dotnet build

    dotnet sonarscanner end

Provide the authentication token securely through the supported configuration.

### 15.5 SonarScanner for NPM

Used with supported JavaScript and TypeScript build environments.

### 15.6 SonarScanner for Python

A scanner integration for Python projects.

### 15.7 Jenkins SonarQube Integration

Jenkins can use the SonarQube Scanner plugin and the appropriate scanner installation.

# Part 10: SonarQube Configuration

## 16. sonar-project.properties

For projects using SonarScanner CLI, a configuration file can be created in the project root.

Filename:

    sonar-project.properties

Example:

    # Unique project identifier
    sonar.projectKey=my-project

    # Project display name
    sonar.projectName=My Application

    # Project version
    sonar.projectVersion=1.0.0

    # Source directories
    sonar.sources=src

    # Test directories
    sonar.tests=tests

    # Source encoding
    sonar.sourceEncoding=UTF-8

    # SonarQube Server URL
    sonar.host.url=http://localhost:9000

Do not put authentication tokens in this file.

### 16.1 Important Configuration Properties

- `sonar.projectKey`: Unique project identifier.
- `sonar.projectName`: Project display name.
- `sonar.projectVersion`: Project version.
- `sonar.sources`: Source directories.
- `sonar.tests`: Test directories.
- `sonar.test.inclusions`: Test file patterns.
- `sonar.exclusions`: Files excluded from analysis.
- `sonar.sourceEncoding`: Source file encoding.
- `sonar.host.url`: SonarQube Server URL.
- `sonar.token`: Analysis token when passed as a supported analysis parameter.
- `sonar.organization`: Organization identifier for applicable SonarQube Cloud analysis.
- `sonar.projectBaseDir`: Project analysis base directory.
- `sonar.scm.provider`: SCM provider selection when necessary.
- `sonar.javascript.lcov.reportPaths`: JavaScript/TypeScript coverage report.
- `sonar.python.coverage.reportPaths`: Python coverage report.
- `sonar.coverage.jacoco.xmlReportPaths`: Java JaCoCo XML coverage report.

### 16.2 Source Exclusions

Example:

    sonar.exclusions=**/node_modules/**,**/build/**,**/dist/**,**/vendor/**

Exclusions help avoid scanning unnecessary generated and third-party code.

### 16.3 Test Inclusions

Example:

    sonar.test.inclusions=**/*.test.js,**/*.spec.js

### 16.4 Configuration Precedence

SonarQube analysis settings can be supplied through different locations:

- Scanner configuration files.
- Project configuration.
- CI/CD configuration.
- Server-side project settings.
- Command-line parameters.

Command-line `-D` parameters can override file-based values for the analysis.

Always check the precedence rules for the particular property.

# Part 11: First SonarQube Analysis

## 17. Run SonarScanner CLI

### 17.1 Check Scanner Installation

``` bash
sonar-scanner --version
```

### 17.2 Configure Token

Linux:

``` bash
export SONAR_TOKEN="your-token"
```

PowerShell:

    $env:SONAR_TOKEN = "your-token"

### 17.3 Run Scanner

``` bash
sonar-scanner
```

The scanner reads `sonar-project.properties` from the project directory.

### 17.4 Complete Command Example

``` bash
sonar-scanner \
  -Dsonar.projectKey=my-project \
  -Dsonar.sources=src \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token="$SONAR_TOKEN"
```

### 17.5 Docker Scanner Example

``` bash
docker run --rm \
  -v "$(pwd):/usr/src" \
  -w /usr/src \
  -e SONAR_HOST_URL="http://host.docker.internal:9000" \
  -e SONAR_TOKEN="$SONAR_TOKEN" \
  sonarsource/sonar-scanner-cli:latest
```

The Docker image, server URL, network configuration, and scanner compatibility must match your environment.

For Linux containers, configure networking so the scanner can reach the host or service.

### 17.6 Verify Analysis

Open the SonarQube dashboard.

Review:

- Quality Gate.
- Bugs.
- Vulnerabilities.
- Code Smells.
- Security Hotspots.
- Coverage.
- Duplications.
- Maintainability.
- Reliability.
- Security.

### 17.7 Analysis Troubleshooting

Common problems:

- Incorrect project key.
- Invalid token.
- Server unavailable.
- Wrong source directory.
- Incorrect coverage report path.
- Unsupported language or scanner version.
- Missing Git history.
- Insufficient scanner permissions.

# Part 12: Rules and Quality Profiles

## 18. SonarQube Rules

A rule is an individual code inspection condition.

Examples:

- Avoid unused variables.
- Avoid duplicated code.
- Use secure cryptographic algorithms.
- Avoid unsafe SQL construction.
- Avoid overly complex methods.
- Use proper exception handling.

### 18.1 Rule Properties

A rule can include:

- Rule ID.
- Rule name.
- Description.
- Language.
- Type.
- Severity.
- Tags.
- Remediation guidance.
- Default configuration.

### 18.2 Rule Activation

Rules can be:

- Activated.
- Deactivated.
- Configured where supported.
- Assigned through quality profiles.

### 18.3 Rule Search

Rules can be searched using:

- Language.
- Severity.
- Type.
- Tags.
- Repository.
- Rule status.

## 19. Quality Profiles

A Quality Profile defines the active rules for a particular programming language.

Example:

    Java Quality Profile
        |
        +---- Null safety rules
        |
        +---- Security rules
        |
        +---- Maintainability rules
        |
        +---- Reliability rules

### 19.1 Sonar Way

Sonar Way is the built-in default profile for supported languages.

It provides a recommended baseline of rules.

### 19.2 Custom Quality Profile

Organizations can customize coding standards.

Example:

    Company Java Profile
        |
        +---- Sonar Way rules
        |
        +---- Company naming rules
        |
        +---- Additional security rules
        |
        +---- Custom coding standards

### 19.3 Why Use Custom Profiles?

- Enforce company coding standards.
- Reduce unnecessary findings.
- Introduce stricter security checks.
- Standardize rules across development teams.
- Adapt rules to programming languages.

### 19.4 Best Practices

- Start with Sonar Way.
- Avoid activating too many rules at once.
- Test custom rules before organization-wide deployment.
- Review false positives.
- Keep profiles consistent across projects.

# Part 13: Quality Gates

## 20. What Is a Quality Gate?

A Quality Gate is a collection of conditions used to determine whether code meets required quality standards.

It produces:

- Passed.
- Failed.

A failed gate can be used to stop a CI/CD pipeline or prevent a pull request from being merged.

### 20.1 Example Quality Gate Conditions

A team might define the following requirements for new code:

- Reliability rating must be A.
- Security rating must be A.
- Maintainability rating must meet the agreed standard.
- Coverage must be at least 80%.
- Duplicated lines must remain below 3%.
- Security hotspots must be reviewed.

These are example organizational thresholds, not universal mandatory values.

### 20.2 Sonar Way Quality Gate

SonarQube provides a default Quality Gate called Sonar Way.

It provides a recommended starting point.

### 20.3 Custom Quality Gate

Organizations can create custom gates.

Example:

    Company Quality Gate

    New Code:
        Reliability Rating: A
        Security Rating: A
        Maintainability Rating: A
        Coverage: >= 80%
        Duplicated Lines: < 3%

### 20.4 Quality Gate Workflow

1.  Developer pushes code.
2.  CI/CD pipeline starts.
3.  SonarScanner performs analysis.
4.  SonarQube processes the report.
5.  Quality Gate evaluates conditions.
6.  The pipeline receives the result.
7.  A failed result can block the merge or release.

### 20.5 Why Quality Gates Matter

They automate code quality enforcement.

Without Quality Gates, teams may identify problems but fail to enforce corrective action.

### 20.6 Quality Gate vs Quality Profile

- Quality Profile: Defines which rules are applied.
- Quality Gate: Defines whether project quality requirements are satisfied.

# Part 14: New Code and Clean as You Code

## 21. What Is New Code?

New Code represents code added or changed relative to a configured baseline.

SonarQube can evaluate new code separately from the overall codebase.

### 21.1 New Code Definitions

Common approaches include:

- Previous version.
- Number of days.
- Reference branch.
- Specific analysis or date, where supported.

### 21.2 Previous Version

New code is identified relative to a previous project version or analysis baseline.

### 21.3 Number of Days

Changes within a defined number of days can be treated as new code.

### 21.4 Reference Branch

A target branch is used as a comparison baseline.

For example:

    feature/payment-update
            |
            v
    Compare against
            |
            v
    main

### 21.5 Clean as You Code

Clean as You Code is a software quality approach.

The principle is:

- Keep new code clean.
- Fix problems introduced by new changes.
- Avoid increasing technical debt.
- Gradually improve legacy code.

### 21.6 Why Not Fix All Old Issues Immediately?

Large applications may contain thousands of historical issues.

Fixing everything at once can:

- Delay development.
- Introduce unnecessary changes.
- Increase regression risk.
- Consume significant engineering time.

A better strategy is to enforce quality on new code and improve legacy code gradually.

# Part 15: Branch and Pull Request Analysis

## 22. Branch Analysis

Branch analysis allows SonarQube to inspect different branches separately.

Examples:

- main.
- develop.
- feature/login.
- feature/payment.
- release/1.0.

Benefits:

- Separate quality results.
- Branch-specific issue tracking.
- Better visibility into code changes.
- Support for release quality management.

Availability depends on the selected product and edition.

## 23. Pull Request Analysis

Pull Request Analysis inspects code changes proposed for merging.

Typical process:

1.  Developer creates a feature branch.
2.  Developer pushes changes.
3.  Pull request is opened.
4.  CI/CD pipeline runs tests.
5.  SonarScanner analyzes the pull request.
6.  SonarQube evaluates new code.
7.  Quality Gate result is reported.
8.  Developers fix issues.
9.  Pull request is merged after required checks pass.

### 23.1 Benefits

- Prevents poor-quality changes from entering the main branch.
- Detects vulnerabilities earlier.
- Improves collaboration.
- Supports code review.
- Encourages Clean as You Code.

### 23.2 Pull Request Decoration

Pull request decoration displays analysis information directly inside supported DevOps platforms.

Examples:

- GitHub pull requests.
- GitLab merge requests.
- Bitbucket pull requests.
- Azure DevOps pull requests.

The exact integration requirements depend on the platform, product, and edition.

# Part 16: Coverage and Test Reports

## 24. Code Coverage Integration

SonarQube imports coverage information from external testing tools.

It does not replace the test framework.

### 24.1 Coverage Workflow

1.  Execute automated tests.
2.  Generate coverage reports.
3.  Configure SonarQube report paths.
4.  Execute scanner.
5.  Review coverage in the dashboard.

### 24.2 Java Coverage Using JaCoCo

Install and configure JaCoCo in the Maven project.

Example:

``` bash
mvn clean verify
```

Configure:

    sonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml

Then analyze:

``` bash
mvn sonar:sonar
```

Ensure that the XML report exists before analysis.

### 24.3 Python Coverage Using pytest-cov

Install:

``` bash
pip install pytest pytest-cov
```

Run:

    pytest --cov=app --cov-report=xml

Configure:

    sonar.python.coverage.reportPaths=coverage.xml

Run:

``` bash
sonar-scanner
```

### 24.4 JavaScript Coverage Using Jest

Install the required testing dependencies.

Run:

``` bash
npm test -- --coverage
```

Configure:

    sonar.javascript.lcov.reportPaths=coverage/lcov.info

### 24.5 .NET Coverage

Common tools include:

- Coverlet.
- Visual Studio Test.
- .NET test tooling.

Configure the appropriate supported coverage report path and format.

### 24.6 Coverage Problems

If coverage displays 0%, investigate:

- Was the test command executed?
- Was coverage generated?
- Does the report exist?
- Is the report path correct?
- Is the correct report format being used?
- Was the report generated before scanning?
- Do report paths match the source file paths?
- Are source files excluded?

### 24.7 Test Execution Reports vs Coverage Reports

These are different concepts.

Test execution reports describe:

- Which tests ran.
- How many tests executed.
- Test results.

Coverage reports describe:

- Which source lines were executed.
- Which branches were covered.
- How much code was tested.

SonarQube imports these reports; it does not generate them itself.

# Part 17: SonarQube with Programming Languages

## 25. Java Projects

Common technologies:

- Java.
- Maven.
- Gradle.
- JaCoCo.
- JUnit.
- Spring Boot.

Example:

``` bash
mvn clean verify sonar:sonar \
  -Dsonar.projectKey=java-project \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token="$SONAR_TOKEN"
```

Recommended workflow:

1.  Compile.
2.  Run unit tests.
3.  Generate coverage.
4.  Run SonarQube analysis.
5.  Evaluate Quality Gate.

## 26. Python Projects

Common technologies:

- Python.
- pytest.
- pytest-cov.
- pylint.
- SonarScanner.

Example:

``` bash
pip install pytest pytest-cov
```

Run tests:

    pytest --cov=app --cov-report=xml

Run analysis:

``` bash
sonar-scanner
```

## 27. JavaScript and TypeScript Projects

Common technologies:

- Node.js.
- npm.
- Jest.
- Vitest.
- LCOV.

Example:

``` bash
npm install
npm test -- --coverage
sonar-scanner
```

## 28. .NET Projects

Common technologies:

- C#.
- .NET SDK.
- MSBuild.
- NUnit.
- xUnit.
- Coverlet.

Typical process:

    dotnet sonarscanner begin /k:"dotnet-project"

    dotnet build

    dotnet test

    dotnet sonarscanner end

Configure coverage import according to the generated report.

## 29. Go Projects

Common tools:

- Go compiler.
- Go test.
- Go coverage.

Example:

    go test ./... -coverprofile=coverage.out

Use a supported report format and scanner configuration for the installed Go analyzer.

## 30. C and C++ Projects

SonarQube provides specialized analysis capabilities for C and C++.

Important considerations:

- Compilation information.
- Build configuration.
- Supported compiler environments.
- Coverage reports.
- Language-specific analyzer requirements.

Follow the CFamily analyzer documentation for configuration.

# Part 18: SonarQube with Jenkins

## 31. What Is Jenkins?

Jenkins is an automation server used to build, test, and deploy applications.

It is commonly used in CI/CD pipelines.

SonarQube integrates with Jenkins to automate code analysis.

### 31.1 Why Integrate SonarQube with Jenkins?

- Automatically analyze code.
- Enforce coding standards.
- Detect security issues.
- Import test coverage.
- Check Quality Gate status.
- Prevent poor-quality releases.
- Display results during CI/CD execution.

### 31.2 Architecture

    Developer
        |
        v
    Git Repository
        |
        v
    Jenkins
        |
        +---- Checkout
        |
        +---- Build
        |
        +---- Unit Tests
        |
        +---- Coverage
        |
        +---- SonarQube Scanner
                    |
                    v
              SonarQube Server
                    |
                    v
               Quality Gate
                    |
                    v
                 Jenkins
                    |
            +-------+-------+
            |               |
            v               v
          Pass             Fail
            |               |
            v               v
        Continue        Stop Pipeline

## 32. Jenkins SonarQube Integration Steps

### Step 1: Install Jenkins

Install Jenkins on a supported operating system.

Verify:

    java -version

### Step 2: Install SonarQube

Start SonarQube Server and confirm it is accessible.

### Step 3: Install Jenkins Plugin

Open:

    Manage Jenkins
        |
        v
    Plugins
        |
        v
    Available Plugins

Search for:

    SonarQube Scanner

Install the plugin.

### Step 4: Configure SonarQube Server

Open:

    Manage Jenkins
        |
        v
    System
        |
        v
    SonarQube Servers

Configure:

- Server name.
- Server URL.
- Authentication token.

Store the token in Jenkins Credentials.

### Step 5: Configure Scanner

Open:

    Manage Jenkins
        |
        v
    Tools
        |
        v
    SonarQube Scanner

Configure the scanner installation.

### Step 6: Create Jenkins Pipeline

Create a Jenkins pipeline for the application.

### 32.1 Jenkinsfile Example

``` groovy
pipeline {

    agent any

    environment {
        SONAR_HOST_URL = 'http://sonarqube:9000'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }

        stage('Unit Tests') {
            steps {
                sh 'mvn test'
            }
        }

        stage('SonarQube Analysis') {
            steps {

                withSonarQubeEnv('SonarQube') {

                    sh '''
                        mvn sonar:sonar \
                        -Dsonar.projectKey=jenkins-java-project
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {

                timeout(time: 5, unit: 'MINUTES') {

                    waitForQualityGate(
                        abortPipeline: true
                    )
                }
            }
        }

    }
}
```

The configured SonarQube installation name must match the Jenkins configuration.

The SonarQube server must be able to send a webhook to Jenkins for the Quality Gate callback.

### 32.2 Configure Webhook

In SonarQube:

    Administration
        |
        v
    Configuration
        |
        v
    Webhooks

Add the Jenkins endpoint:

    https://jenkins.example.com/sonarqube-webhook/

Use the correct reachable Jenkins URL.

### 32.3 What Does waitForQualityGate Do?

It waits for SonarQube to process the analysis and return the Quality Gate result.

If configured to abort the pipeline, a failed Quality Gate stops the pipeline.

### 32.4 Common Jenkins Problems

- Invalid server URL.
- Invalid token.
- Missing scanner configuration.
- Incorrect project key.
- Jenkins cannot reach SonarQube.
- SonarQube cannot reach Jenkins webhook.
- Missing Maven dependencies.
- Incorrect coverage path.
- Unsupported scanner version.
- Pipeline permissions problems.

# Part 19: SonarQube with GitHub Actions

## 33. What Is GitHub Actions?

GitHub Actions is an automation platform integrated into GitHub.

It executes workflows when events occur.

Examples:

- Push.
- Pull request.
- Release.
- Scheduled execution.
- Manual workflow dispatch.

## 34. GitHub Actions Integration

### Step 1: Create a SonarQube Project

Create the project in SonarQube.

### Step 2: Generate Token

Generate a project analysis token or another appropriately scoped token.

### Step 3: Configure GitHub Secrets

Open:

    GitHub Repository
        |
        v
    Settings
        |
        v
    Secrets and variables
        |
        v
    Actions

Add:

    SONAR_TOKEN
    SONAR_HOST_URL

### Step 4: Create Workflow

Create:

    .github/workflows/sonarqube.yml

Example for a Maven project:

    name: SonarQube Analysis

    on:
      push:
        branches:
          - main

      pull_request:

    jobs:

      sonarqube:
        name: SonarQube Analysis

        runs-on: ubuntu-latest

        steps:

          - name: Checkout Repository
            uses: actions/checkout@v4
            with:
              fetch-depth: 0

          - name: Set Up Java
            uses: actions/setup-java@v4
            with:
              distribution: temurin
              java-version: '21'

          - name: Build and Analyze
            env:
              SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
              SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}

            run: |
              mvn clean verify sonar:sonar \
                -Dsonar.projectKey=my-project \
                -Dsonar.host.url=$SONAR_HOST_URL \
                -Dsonar.token=$SONAR_TOKEN

Use Java and action versions compatible with the project and your SonarScanner release. Pin third-party actions to verified immutable commit SHAs in security-sensitive production workflows.

### 34.1 Why fetch-depth: 0?

Full Git history helps SonarQube obtain SCM information and perform reliable new-code analysis.

### 34.2 Pull Request Quality Gate

With the appropriate SonarQube product and DevOps integration:

- Analyze pull requests.
- Evaluate new code.
- Publish quality information.
- Enforce required checks.

# Part 20: SonarQube with GitLab CI/CD

## 35. GitLab Integration

SonarQube can be integrated into GitLab pipelines.

Typical stages:

- Build.
- Test.
- Coverage.
- SonarQube analysis.
- Quality Gate.
- Deployment.

### 35.1 GitLab CI/CD Variables

Configure:

    SONAR_TOKEN
    SONAR_HOST_URL

Use masked and protected variables where appropriate.

### 35.2 .gitlab-ci.yml Example

    stages:
      - build
      - test
      - quality

    build:
      stage: build
      script:
        - mvn clean compile

    test:
      stage: test
      script:
        - mvn test

    sonarqube:
      stage: quality

      image: maven:3.9-eclipse-temurin-21

      variables:
        GIT_DEPTH: "0"

      script:
        - >
          mvn verify sonar:sonar
          -Dsonar.projectKey=gitlab-java-project
          -Dsonar.host.url=$SONAR_HOST_URL
          -Dsonar.token=$SONAR_TOKEN

      allow_failure: false

This is a basic analysis example. Add the appropriate Quality Gate waiting mechanism and project-specific build configuration.

### 35.3 GitLab Benefits

- Automated source analysis.
- Merge request quality checks.
- Centralized quality reports.
- Security issue detection.
- CI/CD enforcement.

# Part 21: SonarQube with Azure DevOps

## 36. Azure DevOps Integration

SonarQube integrates with Azure DevOps for code analysis and pipeline automation.

Typical integration steps:

1.  Install the supported SonarQube extension.
2.  Create a SonarQube service connection.
3.  Configure authentication.
4.  Configure project analysis.
5.  Execute the scanner.
6.  Publish analysis results.
7.  Enforce Quality Gate status.

### 36.1 Typical Pipeline Stages

    Checkout
       |
       v
    Prepare Analysis
       |
       v
    Build
       |
       v
    Test
       |
       v
    Analyze
       |
       v
    Publish Quality Gate
       |
       v
    Deployment

The exact task names and configuration depend on the installed extension version.

# Part 22: Security Analysis and DevSecOps

## 37. SonarQube as a DevSecOps Tool

DevSecOps integrates security into the software development and delivery process.

SonarQube contributes by detecting source-code security issues during development and CI/CD.

### 37.1 Common Security Vulnerabilities

- SQL injection.
- Cross-site scripting.
- Command injection.
- Path traversal.
- Insecure deserialization.
- Hardcoded credentials.
- Weak cryptographic practices.
- Insecure configuration.
- Unsafe data handling.

### 37.2 SQL Injection

SQL injection occurs when untrusted input changes the structure of an SQL query.

Bad practice:

    query = "SELECT * FROM users WHERE name = '" + username + "'"

Safer approach:

    cursor.execute(
        "SELECT * FROM users WHERE name = ?",
        (username,)
    )

The placeholder syntax depends on the database driver.

### 37.3 Cross-Site Scripting

XSS occurs when untrusted content is inserted into a web page in a way that allows script execution.

Prevention includes:

- Context-aware output encoding.
- Safe rendering APIs.
- Input validation.
- Content Security Policy.
- Avoiding unsafe HTML injection.

### 37.4 Command Injection

Command injection occurs when untrusted input affects operating system commands.

Safer approaches include:

- Avoiding shell execution where possible.
- Using structured process APIs.
- Validating allowed arguments.
- Restricting execution privileges.

### 37.5 Hardcoded Secrets

Examples:

- Passwords.
- API keys.
- Cloud access keys.
- Database credentials.
- Authentication tokens.

Secrets should be stored in a secure secret-management system.

### 37.6 Taint Analysis

Taint analysis follows untrusted input through the application.

Important concepts:

- Source: Where untrusted data enters.
- Propagation: How data moves through the application.
- Sink: A sensitive operation that uses the data.
- Sanitization: A safe transformation that makes data appropriate for its intended use.

Example:

    HTTP Request
          |
          v
    User Input
          |
          v
    Application Logic
          |
          v
    SQL Query
          |
          v
    Database

If untrusted input reaches a dangerous operation without appropriate protection, it may represent a vulnerability.

### 37.7 OWASP

OWASP publishes application security guidance.

SonarQube can associate supported findings with security standards and classifications, including relevant OWASP and CWE categories.

Examples:

- Broken access control.
- Injection.
- Security misconfiguration.
- Cryptographic failures.
- Authentication weaknesses.

Do not assume SonarQube alone provides complete OWASP compliance.

### 37.8 SonarQube vs Dedicated SAST Tools

SonarQube combines maintainability, reliability, and security analysis.

Dedicated application security products may provide additional capabilities such as:

- More extensive security testing.
- Advanced data-flow analysis.
- Specialized application security workflows.
- Broader vulnerability management.

Use the appropriate combination of tools based on organizational risk.

### 37.9 SAST vs DAST vs SCA

**SAST:**

- Examines source code.
- Does not require a running application.
- Finds certain coding vulnerabilities.

**DAST:**

- Tests a running application.
- Examines behavior from an external perspective.
- Can identify runtime security problems.

**SCA:**

- Analyzes third-party dependencies.
- Identifies known vulnerabilities in libraries and packages.
- Helps manage open-source component risks.

These tools complement each other.

# Part 23: Advanced SonarQube Administration

## 38. User Management

SonarQube administrators manage users and access.

Common tasks:

- Create users.
- Deactivate users.
- Manage groups.
- Assign permissions.
- Configure authentication.
- Manage project access.

### 38.1 Groups

Groups allow administrators to manage permissions centrally.

Example:

    Administrators
    Developers
    Security-Team
    Project-Managers
    Auditors

Use groups rather than manually assigning every permission to individual users.

## 39. Permissions

SonarQube supports different levels of permissions.

Examples include:

- Global administration.
- Execute analysis.
- Browse projects.
- Administer projects.
- Manage quality gates.
- Manage quality profiles.
- View source code.
- Manage users and groups.

Assign the minimum permissions necessary.

## 40. Authentication

Authentication establishes a user's identity.

Possible integration methods include supported:

- Local accounts.
- LDAP.
- SAML.
- GitHub.
- GitLab.
- Bitbucket.
- Azure DevOps.

Availability depends on the edition and configuration.

## 41. Authorization

Authorization determines what an authenticated user can do.

Examples:

- View project.
- Execute analysis.
- Change settings.
- Administer project.
- Manage quality profiles.

Authentication and authorization are different.

## 42. Token Management

Good token practices:

- Use project-scoped tokens where available.
- Use dedicated service accounts when appropriate.
- Rotate credentials according to policy.
- Revoke unused tokens.
- Store secrets securely.
- Avoid exposing tokens in logs.

# Part 24: Plugins and Custom Rules

## 43. SonarQube Plugins

Plugins extend SonarQube's capabilities.

Examples:

- Additional language support.
- SCM integration.
- Authentication integration.
- Custom analysis features.

### 43.1 Install Plugins

Possible installation methods depend on the plugin and SonarQube release.

Common approaches:

- Marketplace installation.
- Manual installation using compatible plugin packages.

### 43.2 Plugin Installation Steps

1.  Check compatibility.
2.  Download the trusted plugin.
3.  Install it using the supported procedure.
4.  Restart SonarQube when required.
5.  Verify successful startup.
6.  Check the logs.

### 43.3 Plugin Risks

- Version incompatibility.
- Server startup failure.
- Security vulnerabilities.
- Increased memory consumption.
- Unsupported plugins.

Do not install arbitrary plugin JAR files from unknown sources.

## 44. Custom Rules

Organizations may need rules that are not available by default.

Custom rules can enforce organization-specific coding standards.

Examples:

- Naming conventions.
- Company security requirements.
- Internal framework restrictions.
- Architecture conventions.

### 44.1 Custom Rule Development

A typical custom analyzer/plugin development process involves:

1.  Create a compatible plugin project.
2.  Add required SonarQube APIs.
3.  Define a rule repository.
4.  Implement rule logic.
5.  Register the rules.
6.  Build the plugin.
7.  Test it.
8.  Install it in a compatible environment.
9.  Activate rules in a Quality Profile.

Custom rule development is language-analyzer-specific.

For many teams, modifying Quality Profiles is sufficient; custom plugins should be developed only when necessary.

# Part 25: SonarQube REST API

## 45. What Is the SonarQube API?

SonarQube provides a Web API for automation and integration.

It allows scripts and external applications to interact with SonarQube.

Common uses:

- Retrieve Quality Gate status.
- Read project measures.
- Search issues.
- Create or manage projects where permitted.
- Retrieve project information.
- Automate administration.

### 45.1 API URL

Example:

    http://localhost:9000/api/

### 45.2 Check System Status

``` bash
curl http://localhost:9000/api/system/status
```

### 45.3 Check System Health

``` bash
curl -u "$SONAR_TOKEN:" \
  http://localhost:9000/api/system/health
```

### 45.4 Retrieve Quality Gate Status

``` bash
curl -u "$SONAR_TOKEN:" \
  "http://localhost:9000/api/qualitygates/project_status?projectKey=my-project"
```

### 45.5 Search Project Issues

``` bash
curl -u "$SONAR_TOKEN:" \
  "http://localhost:9000/api/issues/search?componentKeys=my-project"
```

### 45.6 Retrieve Project Measures

``` bash
curl -u "$SONAR_TOKEN:" \
  "http://localhost:9000/api/measures/component?component=my-project&metricKeys=bugs,vulnerabilities,code_smells,coverage"
```

### 45.7 API Security

- Use authentication tokens.
- Never expose tokens.
- Use HTTPS.
- Apply minimum permissions.
- Avoid hardcoding credentials.
- Check the API documentation for your installed version.

API endpoints and parameters can change between releases.

# Part 26: Webhooks and Automation

## 46. What Is a Webhook?

A webhook is an HTTP notification sent by one system to another when an event occurs.

SonarQube can send notifications after analysis processing.

### 46.1 Webhook Use Cases

- Notify Jenkins.
- Notify CI/CD services.
- Trigger external automation.
- Report Quality Gate status.
- Update development dashboards.
- Notify project teams.

### 46.2 Jenkins Webhook

Example:

    https://jenkins.example.com/sonarqube-webhook/

Configure the URL in SonarQube's webhook settings.

### 46.3 Webhook Security

- Use HTTPS.
- Protect the receiving endpoint.
- Configure a secret where supported.
- Validate incoming requests.
- Avoid accepting arbitrary unauthenticated notifications.

# Part 27: Production Deployment

## 47. Production Architecture

A production deployment needs more than a running container.

Important components:

- SonarQube Server.
- Supported external database.
- Persistent storage.
- Reverse proxy.
- HTTPS.
- Authentication.
- Backup system.
- Monitoring.
- Firewall rules.
- Resource monitoring.

### 47.1 Production Network Architecture

    Developer / CI Agents
              |
              v
          HTTPS / 443
              |
              v
         Reverse Proxy
              |
              v
        SonarQube Server
              |
              v
           Database
              |
              v
        Backup Storage

### 47.2 HTTPS

Never expose a production SonarQube instance over unsecured public HTTP.

Use:

- Nginx.
- Apache HTTP Server.
- An appropriate load balancer.
- TLS certificates.
- Secure proxy configuration.

### 47.3 Database Security

- Use a supported database.
- Use a dedicated database account.
- Use strong passwords.
- Restrict network access.
- Back up the database.
- Monitor database performance.
- Keep database software supported.

### 47.4 Storage

Persistent storage is required for appropriate SonarQube data and operational needs.

Do not rely on temporary container storage.

### 47.5 Firewall

Expose only the necessary network ports.

Typical considerations:

- Port 443 for HTTPS.
- Internal SonarQube web port.
- Internal database port.
- Required CI/CD communication.

Do not expose the database to the public internet.

### 47.6 High Availability

High availability is an enterprise architecture concern.

Data Center Edition provides a clustered architecture designed for higher availability and scale.

A single-node Docker Compose deployment is not a high-availability architecture.

### 47.7 Kubernetes Deployment

SonarQube can be deployed in supported Kubernetes environments.

Important components include:

- Kubernetes cluster.
- SonarQube deployment.
- Persistent storage.
- External database.
- Ingress.
- Secrets.
- Resource limits.
- Monitoring.
- Backup and recovery.

For production, use the official installation guidance and supported deployment method.

Do not assume that simply creating a generic Kubernetes Deployment guarantees a supported or resilient SonarQube installation.

# Part 28: Backup, Restore and Upgrade

## 48. SonarQube Backup

Backups protect important SonarQube information.

Important backup considerations:

- Database backup.
- Required configuration.
- Plugin inventory.
- Configuration files.
- Encryption and secret management.
- Backup retention.
- Off-site backup storage.

The database is the primary persistent store of SonarQube project and configuration data.

Follow the official backup guidance for your release.

### 48.1 PostgreSQL Backup

Example:

    pg_dump -U sonar -d sonar -F c -f sonar_backup.dump

### 48.2 PostgreSQL Restore

Example:

    pg_restore \
      -U sonar \
      -d sonar \
      sonar_backup.dump

Perform restores according to the database and SonarQube recovery procedure.

### 48.3 Restore Considerations

A recovery procedure may require:

1.  Stop SonarQube.
2.  Restore the database backup.
3.  Restore required compatible configuration and plugin files.
4.  Follow the documented search-index recovery process.
5.  Restart SonarQube.
6.  Verify system health.
7.  Validate project analysis information.

Do not assume a database dump alone is a complete backup of every required operational artifact.

## 49. SonarQube Upgrade

Upgrades introduce newer features, bug fixes, and security improvements.

### 49.1 Upgrade Preparation

1.  Read release notes.
2.  Check upgrade-path requirements.
3.  Check supported database versions.
4.  Check plugin compatibility.
5.  Take a database backup.
6.  Back up required configuration.
7.  Test in a staging environment.
8.  Schedule the upgrade.

### 49.2 Upgrade Process

The exact steps depend on the installation type and release.

Common steps include:

- Stop the existing server.
- Back up required data.
- Install the target release.
- Configure database connection.
- Restore compatible plugins and configuration.
- Start the new server.
- Complete database migration when prompted.
- Verify health and project data.

### 49.3 Upgrade Best Practices

- Never upgrade production without a backup.
- Never skip required intermediate releases.
- Verify plugin compatibility.
- Test with a staging installation.
- Read the official migration documentation.

# Part 29: Monitoring and Troubleshooting

## 50. Monitoring SonarQube

Administrators should monitor:

- CPU usage.
- RAM usage.
- Disk usage.
- Database performance.
- Search engine health.
- Compute Engine activity.
- Background task queue.
- Analysis duration.
- Failed analysis jobs.
- Server availability.

### 50.1 Health Endpoint

``` bash
curl http://localhost:9000/api/system/health
```

### 50.2 Status Endpoint

``` bash
curl http://localhost:9000/api/system/status
```

### 50.3 Container Monitoring

``` bash
docker stats
```

### 50.4 Docker Logs

``` bash
docker logs -f sonarqube
```

### 50.5 Important Log Files

Common log locations inside a ZIP-based or container installation include:

- `web.log`
- `ce.log`
- `es.log`
- `sonar.log`

Their purposes include:

**web.log**

- Web server activity.
- Authentication and UI-related errors.

**ce.log**

- Compute Engine processing.
- Analysis report processing errors.

**es.log**

- Search engine activity.
- Elasticsearch-related problems.

**sonar.log**

- General server startup and operational information.

## 51. Common SonarQube Problems and Solutions

### 51.1 SonarQube Does Not Start

Possible causes:

- Insufficient RAM.
- Incorrect permissions.
- Unsupported Java runtime.
- Incorrect database settings.
- Invalid configuration.
- Linux kernel limits.
- Search engine startup failure.

Troubleshooting:

``` bash
docker logs sonarqube
```

Check system resources and release requirements.

### 51.2 Scanner Cannot Connect

Possible causes:

- Wrong server URL.
- Server not running.
- Firewall blocking traffic.
- DNS problem.
- Incorrect container networking.

Verify:

``` bash
curl http://localhost:9000/api/system/status
```

### 51.3 Authentication Failed

Possible causes:

- Incorrect token.
- Revoked token.
- Expired token, where applicable.
- Insufficient permissions.
- Incorrect secret variable.

Generate or configure a valid token.

### 51.4 Analysis Fails

Investigate:

- Scanner version.
- Server compatibility.
- Project key.
- Source paths.
- Build errors.
- File permissions.
- Unsupported language features.

### 51.5 Coverage Shows 0%

Investigate:

- Coverage generation.
- Report location.
- Report format.
- Analysis configuration.
- Source file matching.

### 51.6 Quality Gate Fails

Open the Quality Gate details.

Identify the failed condition.

Common reasons:

- Coverage below threshold.
- Duplications above threshold.
- Reliability rating failure.
- Security rating failure.
- Maintainability rating failure.

Fix the relevant issue and rerun analysis.

### 51.7 Background Tasks Remain Pending

Possible causes:

- Compute Engine resource constraints.
- Database performance.
- Large analysis reports.
- Search engine problems.

Review the Compute Engine logs and system resources.

### 51.8 SonarQube Runs Slowly

Possible improvements:

- Increase available memory.
- Increase CPU resources.
- Use suitable storage.
- Exclude generated code.
- Exclude vendor directories.
- Optimize CI build agents.
- Monitor database performance.
- Avoid unnecessary repeated scans.

# Part 30: Advanced DevOps Practices

## 52. SonarQube in a DevOps Lifecycle

A professional DevOps lifecycle may look like:

    Plan
      |
      v
    Code
      |
      v
    Commit
      |
      v
    Build
      |
      v
    Unit Tests
      |
      v
    Coverage
      |
      v
    SonarQube Analysis
      |
      v
    Quality Gate
      |
      v
    Security Validation
      |
      v
    Package
      |
      v
    Deploy
      |
      v
    Monitor

SonarQube is primarily involved in source-code quality and security inspection before deployment.

It is not a replacement for infrastructure monitoring, runtime observability, DAST, or dependency vulnerability scanning.

## 53. SonarQube Best Practices

### 53.1 Start with Sonar Way

Use built-in recommended rules as a baseline.

### 53.2 Focus on New Code

Use Clean as You Code.

### 53.3 Integrate with CI/CD

Run analysis automatically on relevant commits and pull requests.

### 53.4 Enforce Quality Gates

Use agreed thresholds to protect the main branch.

### 53.5 Generate Coverage Reports

Make sure coverage reports are produced before analysis.

### 53.6 Secure Tokens

Store credentials in CI/CD secret stores.

### 53.7 Avoid Unnecessary Exclusions

Exclude generated and third-party code where appropriate, but do not exclude important application code just to improve metrics.

### 53.8 Review Security Hotspots

Treat hotspots as a security review workflow.

### 53.9 Fix False Positives

Investigate and document false positives rather than ignoring all findings.

### 53.10 Maintain Consistent Quality Profiles

Use common standards across teams.

### 53.11 Monitor SonarQube

Monitor resources, background tasks, logs, and database health.

### 53.12 Keep Software Updated

Use supported SonarQube, scanner, database, and plugin versions.

# Part 31: SonarQube Advanced Concepts

## 54. Monorepo Analysis

A monorepo contains multiple applications or services in one Git repository.

SonarQube can analyze projects using appropriate project configuration and supported analysis approaches.

Important considerations:

- Project boundaries.
- Source directories.
- Test directories.
- Independent build processes.
- Separate project keys when appropriate.
- Coverage report paths.
- Shared code.
- CI/CD execution efficiency.

## 55. Multi-Module Projects

A multi-module project contains multiple related modules.

Examples:

    company-application/
        |
        +---- module-api/
        |
        +---- module-service/
        |
        +---- module-database/
        |
        +---- module-common/

Configure analysis according to the build tool and SonarScanner integration.

## 56. Analysis Scope

Analysis scope determines which files SonarQube inspects.

Important concepts:

- Source files.
- Test files.
- File inclusions.
- File exclusions.
- Generated code.
- Third-party code.
- Binary files.

Good scope configuration improves performance and reduces unnecessary findings.

## 57. SCM Integration

SCM integration provides source-control information.

Examples:

- Git.
- Branch information.
- Commit history.
- Author information.
- Blame information.

A complete Git checkout is useful in CI/CD.

## 58. Background Tasks

After a scanner uploads an analysis report, SonarQube processes it asynchronously.

The Compute Engine manages background processing.

Administrators can inspect task status and identify processing failures.

## 59. Project Portfolios

Portfolios allow organizations to monitor multiple projects together.

They are useful for:

- Enterprise governance.
- Quality overview.
- Security overview.
- Project comparisons.
- Management reporting.

Availability depends on the selected edition.

## 60. Quality Governance

Organizations can define centralized governance policies.

Examples:

- One standard Quality Gate.
- Language-specific Quality Profiles.
- Project permission templates.
- Common security standards.
- Reporting requirements.

# Part 32: SonarQube vs Other Tools

## 61. SonarQube vs SonarQube for IDE

**SonarQube Server:**

- Centralized analysis.
- Project dashboards.
- Quality Gates.
- Team-level reporting.
- CI/CD integration.

**SonarQube for IDE:**

- Local IDE feedback.
- Early issue detection.
- Developer productivity.
- Supported connected-mode functionality.

Both complement each other.

## 62. SonarQube vs Jenkins

Jenkins is a CI/CD automation server.

SonarQube is a code quality and security analysis platform.

Jenkins executes the pipeline; SonarQube analyzes source code and evaluates quality.

## 63. SonarQube vs Checkmarx

Checkmarx focuses on application security testing.

SonarQube combines code quality and security analysis.

The right choice depends on the organization's application security requirements.

## 64. SonarQube vs Snyk

Snyk focuses strongly on developer security, including open-source dependency and container security capabilities.

SonarQube focuses on code quality and static source-code analysis, with additional security capabilities.

They can be used together.

## 65. SonarQube vs Trivy

Trivy is commonly used to scan:

- Container images.
- Filesystems.
- Infrastructure as Code.
- Dependencies.
- Kubernetes-related assets.

SonarQube is not a replacement for these specialized scanning workflows.

## 66. SonarQube vs OWASP ZAP

OWASP ZAP is a Dynamic Application Security Testing tool.

It tests running web applications.

SonarQube performs static source-code analysis.

They address different security testing requirements.

# Part 33: Practical Hands-On Labs

## 67. Lab 1: Install SonarQube with Docker

**Objective:** Start a local SonarQube environment.

Tasks:

1.  Install Docker.
2.  Run SonarQube.
3.  Open port 9000.
4.  Log in.
5.  Change the default password.
6.  Check server status.
7.  Explore the dashboard.

Commands:

``` bash
docker run -d \
  --name sonarqube \
  -p 9000:9000 \
  sonarqube:community
```

Check:

``` bash
docker logs -f sonarqube
```

## 68. Lab 2: Analyze a Python Application

**Objective:** Perform your first source-code analysis.

Tasks:

1.  Create a Python project.
2.  Install SonarScanner.
3.  Create `sonar-project.properties`.
4.  Generate a token.
5.  Configure `SONAR_TOKEN`.
6.  Run the scanner.
7.  Review the dashboard.
8.  Fix detected issues.

## 69. Lab 3: Configure Coverage

**Objective:** Import Python coverage reports.

Commands:

``` bash
pip install pytest pytest-cov

pytest --cov=app --cov-report=xml
```

Configure:

    sonar.python.coverage.reportPaths=coverage.xml

Run analysis and verify coverage.

## 70. Lab 4: Create a Custom Quality Gate

**Objective:** Understand automated quality enforcement.

Tasks:

1.  Open Quality Gates.
2.  Create a custom gate.
3.  Add conditions for new code.
4.  Assign it to your project.
5.  Introduce a controlled code quality problem.
6.  Run analysis.
7.  Observe the failed Quality Gate.
8.  Correct the issue.
9.  Run analysis again.

## 71. Lab 5: Create a Custom Quality Profile

**Objective:** Learn rule management.

Tasks:

1.  Open Quality Profiles.
2.  Select a language.
3.  Copy the default profile.
4.  Activate or deactivate selected rules.
5.  Assign the profile to a project.
6.  Run a new analysis.
7.  Compare the findings.

## 72. Lab 6: Integrate SonarQube with Jenkins

**Objective:** Automate code analysis.

Tasks:

1.  Install Jenkins.
2.  Install SonarQube.
3.  Configure the Jenkins plugin.
4.  Add SonarQube credentials.
5.  Configure the scanner.
6.  Create a Jenkinsfile.
7.  Execute the pipeline.
8.  Configure the webhook.
9.  Add Quality Gate enforcement.
10. Test a failed Quality Gate.

## 73. Lab 7: Integrate SonarQube with GitHub Actions

**Objective:** Perform automatic analysis on GitHub.

Tasks:

1.  Create a GitHub repository.
2.  Create a SonarQube project.
3.  Generate an analysis token.
4.  Configure GitHub secrets.
5.  Create a workflow.
6.  Push code.
7.  Inspect the workflow.
8.  Review SonarQube results.
9.  Test pull request analysis if supported by your edition.

## 74. Lab 8: Production-Style Deployment

**Objective:** Learn production administration.

Tasks:

1.  Deploy SonarQube.
2.  Configure PostgreSQL.
3.  Configure persistent volumes.
4.  Configure HTTPS.
5.  Configure authentication.
6.  Create secure analysis tokens.
7.  Configure backups.
8.  Test recovery.
9.  Configure monitoring.
10. Document the operational procedure.

# Part 34: DevOps Interview Questions and Answers

## 75. Beginner-Level Questions

### Q1. What is SonarQube?

SonarQube is a platform for continuous code quality and security inspection using static code analysis.

### Q2. Why do we use SonarQube?

To detect bugs, vulnerabilities, code smells, duplication, and maintainability issues before deployment.

### Q3. What is static code analysis?

Analyzing source code without executing the application.

### Q4. Is SonarQube a DevOps tool?

Yes. It integrates with CI/CD pipelines to automate code quality and security checks.

### Q5. What is SonarScanner?

A client-side tool that analyzes source code and uploads analysis reports to SonarQube.

### Q6. What is a bug?

A coding problem that can cause incorrect application behavior.

### Q7. What is a vulnerability?

A security weakness that may be exploited by an attacker.

### Q8. What is a code smell?

A maintainability problem that makes code difficult to understand or modify.

### Q9. What is a Security Hotspot?

Security-sensitive code that requires human review.

### Q10. What is a Quality Gate?

A collection of conditions used to determine whether code meets required quality standards.

## 76. Intermediate-Level Questions

### Q11. What is a Quality Profile?

A collection of active coding rules for a particular programming language.

### Q12. What is Sonar Way?

A built-in recommended Quality Profile provided for supported languages.

### Q13. What is technical debt?

The estimated effort needed to correct maintainability issues.

### Q14. What is code coverage?

The percentage of code executed by automated tests.

### Q15. Does SonarQube execute unit tests?

No. External testing tools execute tests and generate reports that SonarQube imports.

### Q16. What is code duplication?

Repeated code blocks that increase maintenance effort.

### Q17. What is cyclomatic complexity?

A measure of the number of independent paths through code.

### Q18. What is cognitive complexity?

A measure of how difficult code is for humans to understand.

### Q19. What is Clean as You Code?

A development approach that focuses on keeping new and changed code clean.

### Q20. What is New Code?

Code introduced or changed relative to a configured baseline.

### Q21. What is the difference between Quality Profile and Quality Gate?

A Quality Profile determines which rules are applied; a Quality Gate determines whether the quality conditions are satisfied.

### Q22. What is a SonarQube token?

An authentication credential used by scanners and automation to access SonarQube.

## 77. Advanced-Level Questions

### Q23. Explain SonarQube architecture.

It consists of the web server, search engine, Compute Engine, database, analyzers, and scanners.

### Q24. What is the role of the Compute Engine?

It processes uploaded analysis reports, calculates metrics, updates issues, and evaluates analysis results.

### Q25. Does SonarScanner connect directly to PostgreSQL?

No. It communicates with SonarQube Server.

### Q26. Why is PostgreSQL recommended for production?

It is a supported external database suitable for persistent production deployments.

### Q27. What is a SonarQube webhook?

An HTTP notification sent when an event, such as analysis completion, occurs.

### Q28. How does Jenkins integrate with SonarQube?

Through the Jenkins SonarQube integration plugin, scanner execution, server credentials, and Quality Gate handling.

### Q29. What is pull request analysis?

Analysis of code changes proposed for merging into another branch.

### Q30. What is branch analysis?

Separate analysis of a particular project branch.

### Q31. What is taint analysis?

Following untrusted data through an application to identify potentially dangerous data flows.

### Q32. What is the difference between SAST and DAST?

SAST analyzes source code; DAST tests a running application.

### Q33. How do you fail a CI/CD pipeline when a Quality Gate fails?

Configure the pipeline to wait for the analysis result and stop execution when the Quality Gate is failed.

### Q34. How do you troubleshoot a failed analysis?

Review scanner logs, server logs, authentication, project configuration, network connectivity, compatibility, and background task status.

### Q35. How do you secure a production SonarQube server?

Use HTTPS, strong authentication, scoped tokens, a protected database, backups, least-privilege permissions, and supported software versions.

### Q36. What is SonarQube Data Center Edition?

An enterprise deployment option designed for high availability and horizontal scaling.

### Q37. What happens after a scanner uploads an analysis report?

The Compute Engine processes it, updates the project's information, and makes the results available in SonarQube.

### Q38. What is the difference between SonarQube Server and SonarQube Cloud?

Server is self-managed; Cloud is a managed SaaS offering.

### Q39. Why should full Git history be available in CI?

It helps SCM blame information and new-code analysis work reliably.

### Q40. What is the purpose of a Quality Gate in a pull request?

It helps prevent changes that do not meet agreed quality requirements from being merged.

# Part 35: Quick Reference Commands

## 78. Docker Commands

Start SonarQube:

``` bash
docker run -d \
  --name sonarqube \
  -p 9000:9000 \
  sonarqube:community
```

Check running containers:

``` bash
docker ps
```

View logs:

``` bash
docker logs -f sonarqube
```

Stop:

``` bash
docker stop sonarqube
```

Start:

``` bash
docker start sonarqube
```

Remove:

``` bash
docker rm -f sonarqube
```

Monitor resources:

``` bash
docker stats
```

## 79. Scanner Commands

Check scanner:

``` bash
sonar-scanner --version
```

Run analysis:

``` bash
sonar-scanner
```

Debug analysis:

``` bash
sonar-scanner -X
```

## 80. Maven Commands

Build:

``` bash
mvn clean compile
```

Run tests:

``` bash
mvn test
```

Build and test:

``` bash
mvn clean verify
```

Analyze:

``` bash
mvn sonar:sonar
```

## 81. Python Commands

Install coverage:

``` bash
pip install pytest pytest-cov
```

Run tests:

    pytest

Generate coverage:

    pytest --cov=app --cov-report=xml

Run scanner:

``` bash
sonar-scanner
```

## 82. System API Commands

Check status:

``` bash
curl http://localhost:9000/api/system/status
```

Check health:

``` bash
curl http://localhost:9000/api/system/health
```

Retrieve Quality Gate:

``` bash
curl -u "$SONAR_TOKEN:" \
  "http://localhost:9000/api/qualitygates/project_status?projectKey=my-project"
```

# Part 36: SonarQube Learning Roadmap

## 83. Beginner Level

Learn:

- What SonarQube is.
- Static code analysis.
- SAST fundamentals.
- Bugs.
- Vulnerabilities.
- Code smells.
- Security hotspots.
- Quality Profiles.
- Quality Gates.
- Basic metrics.

Practical work:

- Install SonarQube with Docker.
- Create a project.
- Generate a token.
- Install SonarScanner.
- Analyze a small application.
- Review findings.

## 84. Intermediate Level

Learn:

- Architecture.
- PostgreSQL integration.
- Docker Compose.
- Project configuration.
- Coverage integration.
- New Code definitions.
- Custom Quality Profiles.
- Custom Quality Gates.
- Branch analysis.
- Pull request analysis.
- REST API basics.

Practical work:

- Analyze Java.
- Analyze Python.
- Analyze JavaScript.
- Configure coverage.
- Create custom rules profiles.
- Build custom quality gates.

## 85. Advanced Level

Learn:

- Jenkins integration.
- GitHub Actions.
- GitLab CI/CD.
- Azure DevOps.
- Webhooks.
- Authentication.
- Authorization.
- Security analysis.
- Taint analysis.
- Plugin management.
- Custom rules.
- API automation.
- Production monitoring.
- Backup and recovery.

Practical work:

- Build a complete Jenkins pipeline.
- Block a failed Quality Gate.
- Integrate GitHub pull requests.
- Automate Quality Gate reporting.
- Deploy SonarQube with PostgreSQL.

## 86. Expert Level

Learn:

- Enterprise architecture.
- Data Center Edition.
- High availability.
- Capacity planning.
- Performance tuning.
- Large monorepos.
- Multi-module analysis.
- Enterprise governance.
- Centralized quality management.
- Upgrade strategies.
- Disaster recovery.
- Advanced security integrations.

Practical work:

- Build a production-style deployment.
- Implement backup and restore.
- Configure enterprise authentication.
- Design monitoring.
- Document operational runbooks.
- Implement quality governance across multiple projects.

# Part 37: Real-World DevOps Scenario

## 87. Scenario: Prevent Bad Code from Reaching Production

Imagine an organization developing an e-commerce application.

Technologies:

- Java.
- Spring Boot.
- Maven.
- GitHub.
- Jenkins.
- SonarQube.
- Docker.
- Kubernetes.

### Step 1: Developer Writes Code

A developer creates a new payment service.

### Step 2: Developer Pushes Code

The code is pushed to GitHub.

### Step 3: Jenkins Starts

Jenkins detects the repository change and starts a pipeline.

### Step 4: Build

Jenkins compiles the application.

### Step 5: Unit Tests

Jenkins executes automated tests.

### Step 6: Coverage

JaCoCo generates coverage reports.

### Step 7: SonarQube Analysis

SonarScanner analyzes the source code.

It detects:

- Bugs.
- Vulnerabilities.
- Code smells.
- Duplicated code.
- Coverage information.

### Step 8: Quality Gate

SonarQube evaluates the configured conditions.

### Step 9: Pipeline Decision

If the gate passes:

- Continue the pipeline.
- Build the Docker image.
- Push the image to the registry.
- Deploy to Kubernetes.

If the gate fails:

- Stop the pipeline.
- Notify the developer.
- Review issues.
- Fix the code.
- Run the pipeline again.

### Step 10: Production Deployment

Only approved code proceeds through the organization's deployment controls.

**Important:** SonarQube is one quality control in the delivery process. Production releases should also pass the required tests, security checks, approvals, and deployment validations.

# Part 38: Final SonarQube Cheat Sheet

## 88. Important Concepts to Remember

- SonarQube performs static code analysis.
- SAST means Static Application Security Testing.
- SonarScanner analyzes code and uploads reports.
- SonarQube Server processes analysis results.
- The Web Server provides the user interface and API.
- The Search Engine supports search and indexing.
- The Compute Engine processes analysis reports.
- PostgreSQL stores persistent application data.
- SonarScanner does not connect directly to the database.
- A Bug affects reliability.
- A Vulnerability affects security.
- A Code Smell affects maintainability.
- A Security Hotspot requires human security review.
- A Quality Profile contains coding rules.
- A Quality Gate evaluates quality conditions.
- Technical Debt estimates maintainability remediation effort.
- Code Coverage comes from external testing tools.
- SonarQube does not execute your unit tests.
- New Code supports Clean as You Code.
- Jenkins can automate SonarQube analysis.
- GitHub Actions can automate SonarQube analysis.
- GitLab CI/CD can automate SonarQube analysis.
- Azure DevOps can integrate SonarQube.
- Webhooks notify external systems after analysis.
- REST APIs support automation.
- Production installations need persistent storage and a supported external database.
- Production systems should use HTTPS and secure credentials.
- Backups and tested recovery procedures are essential.
- Quality Gates help prevent poor-quality code from reaching important branches and releases.

# Part 39: Official Documentation and Learning Resources

Always use official documentation for release-specific configuration, installation, compatibility, and licensing.

## 89. Official SonarSource Resources

- SonarQube Server documentation:  
  > [https://docs.sonarsource.com/sonarqube-server/](https://docs.sonarsource.com/sonarqube-server/)

- SonarQube Cloud documentation:  
  > [https://docs.sonarsource.com/sonarqube-cloud/](https://docs.sonarsource.com/sonarqube-cloud/)

- SonarQube for IDE:  
  > [https://docs.sonarsource.com/sonarqube-for-ide/](https://docs.sonarsource.com/sonarqube-for-ide/)

- SonarSource website:  
  > [https://www.sonarsource.com/](https://www.sonarsource.com/)

- SonarQube downloads:  
  > [https://www.sonarsource.com/products/sonarqube/downloads/](https://www.sonarsource.com/products/sonarqube/downloads/)

- SonarSource GitHub:  
  > [https://github.com/SonarSource](https://github.com/SonarSource)

## 90. Additional DevOps Learning Resources

- Jenkins documentation:  
  > [https://www.jenkins.io/doc/](https://www.jenkins.io/doc/)

- Docker documentation:  
  > [https://docs.docker.com/](https://docs.docker.com/)

- Kubernetes documentation:  
  > [https://kubernetes.io/docs/](https://kubernetes.io/docs/)

- GitHub Actions documentation:  
  > [https://docs.github.com/en/actions](https://docs.github.com/en/actions)

- GitLab CI/CD documentation:  
  > [https://docs.gitlab.com/ci/](https://docs.gitlab.com/ci/)

- OWASP:  
  > [https://owasp.org/](https://owasp.org/)

- PostgreSQL documentation:  
  > [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)

# Conclusion

SonarQube is an important tool in modern DevOps and DevSecOps environments.

It helps development teams continuously inspect source code, identify bugs, detect security problems, improve maintainability, reduce technical debt, and enforce consistent quality standards.

A professional DevOps engineer should understand more than simply installing SonarQube and running a scanner.

They should be able to:

- Explain SonarQube architecture.
- Install and configure SonarQube.
- Configure PostgreSQL.
- Manage users and permissions.
- Configure Quality Profiles.
- Create Quality Gates.
- Integrate coverage reports.
- Automate analysis through CI/CD.
- Integrate with Jenkins, GitHub, GitLab, and Azure DevOps.
- Understand static security analysis.
- Troubleshoot failed scans.
- Monitor server health.
- Perform backups and upgrades.
- Design production-ready deployments.
- Enforce code quality throughout the software delivery lifecycle.

**Recommended learning strategy:** Start with a local Docker installation, analyze a small application, integrate coverage, create a Quality Gate, and then implement a complete Jenkins pipeline that prevents failed-quality code from progressing to deployment.

That practical experience will give you a strong foundation for using SonarQube in real-world DevOps environments.
