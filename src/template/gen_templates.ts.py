#!/bin/env python3
"""gen_templates.ts.py reads from the templates directory and creates templates.ts with the contents of each file bound to a unique variable.
"""

from pathlib import Path


def main():
    search_dir = Path(__file__).parent / "templates"

    found_files = {}
    for p in search_dir.glob("*.kfftemplate"):
        with p.open("r") as f:
            found_files[p.name.replace(".kfftemplate", "")] = f.read()

    templates_ts_contents = """/**
 * This file was generated using gen_templates.ts.py from the templates directory.
 * Please do not change manually. Instead, modify the template files and then re-generate this file.
 */

export class TemplateStrings {
"""

    for key in found_files:
        value: str = found_files[key]
        templates_ts_contents += f"    {key} = `{value.replace('`', '')}`\n"

    templates_ts_contents += "}\n"

    templates_ts = Path(__file__).parent / "templates.ts"
    with templates_ts.open("w") as f:
        f.write(templates_ts_contents)


if __name__ == "__main__":
    main()
