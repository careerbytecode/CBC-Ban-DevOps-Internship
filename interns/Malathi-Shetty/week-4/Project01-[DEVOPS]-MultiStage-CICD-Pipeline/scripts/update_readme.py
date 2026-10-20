from pathlib import Path

readme = Path("README.md")
status_file = Path("docs/generated/PROJECT_STATUS.md")

start_marker = "<!-- AUTO_STATUS_START -->"
end_marker = "<!-- AUTO_STATUS_END -->"

readme_content = readme.read_text(encoding="utf-8")
status_content = status_file.read_text(encoding="utf-8")

start = readme_content.index(start_marker)
end = readme_content.index(end_marker)

updated = (
    readme_content[: start + len(start_marker)]
    + "\n\n"
    + status_content.strip()
    + "\n\n"
    + readme_content[end:]
)

# Only write if the content has actually changed
if updated != readme_content:
    readme.write_text(updated, encoding="utf-8")
    print("README updated successfully")
else:
    print("README already up to date")
