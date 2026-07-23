# 💻 Class 5 Demo App

The exact files used in the live demo on **Sunday, 19 July 2026**.

```
demo-app/
├── azure-pipelines.yml           ← the ORIGINAL file used in class (unedited)
├── azure-pipelines-template.yml  ← cleaned-up version to copy for your own work
└── sampleapp/
    ├── Dockerfile
    ├── app.py                    ← Flask "Hello from Azure DevOps!"
    └── requirements.txt
```

---

## ⚠️ About `azure-pipelines.yml`

This is kept **exactly as it was on screen in class**, so it matches the recording. It contains values specific to the mentor's environment:

| Value in the file | What it actually is | Yours will be |
|---|---|---|
| `pool: name: shgfkasdh` | The mentor's self-hosted agent pool | Your pool name, or `vmImage: ubuntu-latest` |
| `containerRegistry: my-docker-registry` | The mentor's service connection name | **Your** service connection name |
| `imageRepository: cbcacr` | Repository name inside ACR | Any name you like, e.g. `sampleapp` |
| `trigger: - master` | The mentor's branch | `main` or `master` — check with `git branch` |

**Copying this file unchanged will fail.** Use `azure-pipelines-template.yml` instead and change the three marked values.

---

## ▶️ Run the app locally first

Always cheaper than debugging inside a pipeline:

```bash
docker build -t sampleapp:test ./sampleapp
docker run -p 5000:5000 sampleapp:test
# open http://localhost:5000  →  "Hello from Azure DevOps!"
```

---

📘 Full explanation: [Building the CI Pipeline](../pipelines-ci.md)

_Part of the CareerByteCode Bangalore — Cloud & DevOps Internship Program._
