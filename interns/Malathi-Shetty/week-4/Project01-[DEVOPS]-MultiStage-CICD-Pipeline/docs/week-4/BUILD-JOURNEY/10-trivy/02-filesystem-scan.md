# Trivy Filesystem Scan

## Objective

The objective of the Trivy filesystem scan is to scan the FlavorForge source repository for known vulnerabilities in application dependencies and identify security issues before the application is packaged and deployed.

The filesystem scan is executed from the root of the FlavorForge repository.

## Scan Location

```text
flavorforge-azure-devsecops-capstone/
```

The scan covers the repository contents, including the application dependency lock files.

## Step 1 — Create the Trivy Report Directory

Create a directory to store the filesystem scan reports:

```bash
mkdir -p reports/trivy
```

## Step 2 — Run the Filesystem Scan

Run Trivy against the complete repository:

```bash
trivy fs \
  --format table \
  . | tee reports/trivy/filesystem-report.txt
```

### What this command does

* `trivy fs` — performs a filesystem scan.
* `--format table` — displays the results in a readable table.
* `.` — scans the current repository directory.
* `tee` — displays the result in the terminal and saves it to a report file.

## Step 3 — Filesystem Scan Result

The scan completed successfully and detected one known vulnerability in the frontend dependency tree.

The result was:

```text
Total: 1
UNKNOWN: 0
LOW: 0
MEDIUM: 0
HIGH: 1
CRITICAL: 0
```

The detected vulnerability was:

| Library      | Vulnerability       | Severity | Installed Version | Fixed Version |
| ------------ | ------------------- | -------- | ----------------- | ------------- |
| react-router | GHSA-qwww-vcr4-c8h2 | HIGH     | 7.18.1            | 7.18.2, 8.3.0 |

The vulnerability was reported in:

```text
frontend/package-lock.json
```

Trivy reported the vulnerability as fixed and identified the available fixed versions as `7.18.2` and `8.3.0`.

## Step 4 — Generate the JSON Report

Generate a machine-readable JSON report:

```bash
trivy fs \
  --format json \
  -o reports/trivy/filesystem-report.json \
  .
```

The command completed successfully.

## Step 5 — Verify the Generated Reports

Verify the generated report files:

```bash
ls -lh reports/trivy/
```

The verification produced:

```text
filesystem-report.json
filesystem-report.txt
```

The verified report sizes were approximately:

```text
filesystem-report.txt   2.2K
filesystem-report.json  2.5K
```

## Generated Evidence

The filesystem scan generated two report formats:

```text
reports/trivy/filesystem-report.txt
reports/trivy/filesystem-report.json
```

The text report provides a human-readable security summary, while the JSON report provides structured output that can be consumed by automation and pipeline processes.

## Security Finding

The filesystem scan identified one HIGH-severity vulnerability in `react-router`.

This finding is intentionally documented rather than suppressed because the purpose of DevSecOps scanning is to provide visibility into dependency security risks.

The scan itself completed successfully and produced both required report formats.

## Azure DevOps Pipeline Integration

The same filesystem scan is integrated into the Azure DevOps pipeline in the `TrivyScan` stage.

The pipeline executes:

```yaml
trivy fs \
  --format table \
  . | tee reports/trivy/filesystem-report.txt
```

and:

```yaml
trivy fs \
  --format json \
  -o reports/trivy/filesystem-report.json \
  .
```

The generated reports are then published as the pipeline artifact:

```yaml
- publish: reports/trivy
  artifact: trivy-filesystem
  displayName: "Publish Filesystem Reports"
```

This ensures that filesystem security results are retained as pipeline evidence.

## Evidence

![Filesystem scan evidence](/screenshots/build-journey/trivy/Trivy%20filesystem%20evidence.png)

![Text report evidence](/screenshots/build-journey/trivy/filesystem-report-txt.png)

![json-report-verification](/screenshots/build-journey/trivy/Verify%20the%20JSON%20report.png)


## Verification Summary

The Trivy filesystem scan was successfully executed against the FlavorForge repository.

The verification confirmed:

* Trivy filesystem scanning is working.
* The vulnerability database was available and updated before scanning.
* Vulnerability scanning was enabled.
* Secret scanning was enabled.
* The repository dependency files were analyzed.
* One HIGH-severity dependency vulnerability was identified.
* A human-readable TXT report was generated.
* A machine-readable JSON report was generated.
* Both reports were stored under `reports/trivy/`.
* The same scan commands are integrated into the Azure DevOps pipeline.
* The reports are configured to be published as a pipeline artifact.

This completes the filesystem scanning step of the FlavorForge DevSecOps implementation.
