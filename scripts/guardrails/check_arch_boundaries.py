"""Enforce front-end boundaries and static-export constraints."""

from __future__ import annotations

import re
from pathlib import Path

FRONT_END_ROOT = Path(__file__).resolve().parents[2]

IMPORT_PATTERN = re.compile(
    r"(?:import\s+[^;]*?\s+from\s+['\"]([^'\"]+)['\"]"
    r"|import\s+['\"]([^'\"]+)['\"])",
    re.DOTALL,
)

STATIC_EXPORT_REDIRECT_PATTERN = re.compile(
    r"import\s*\{(?P<imports>[^}]*)\}\s*from\s*['\"]next/navigation['\"]",
    re.DOTALL,
)

ALLOWED_IMPORTS: set[str] = set()

LAYER_RULES = {
    "features/application": {
        "forbidden_prefixes": (
            "@/shared/ui/",
            "@/components/",
        ),
        "forbidden_exact": (
            "@tanstack/react-query",
            "react",
            "react-hook-form",
        ),
        "forbidden_regex": (
            re.compile(r"^next/"),
            re.compile(r"^@/features/[^/]+/infrastructure/"),
            re.compile(r"^@/features/[^/]+/(admin|ui|presentation|hooks)/"),
        ),
    },
    "features/infrastructure": {
        "forbidden_prefixes": (
            "@/shared/ui/",
            "@/components/",
        ),
        "forbidden_exact": (
            "@tanstack/react-query",
            "react",
            "react-hook-form",
            "framer-motion",
        ),
        "forbidden_regex": (
            re.compile(r"^next/"),
            re.compile(r"^@/features/[^/]+/application/"),
            re.compile(r"^@/features/[^/]+/(admin|ui|presentation|hooks)/"),
        ),
    },
    "shared/application": {
        "forbidden_prefixes": (
            "@/shared/ui/",
            "@/components/",
        ),
        "forbidden_exact": (
            "@tanstack/react-query",
            "react",
            "react-hook-form",
            "framer-motion",
        ),
        "forbidden_regex": (re.compile(r"^next/"),),
    },
    "shared/infrastructure": {
        "forbidden_prefixes": (
            "@/shared/ui/",
            "@/components/",
        ),
        "forbidden_exact": (),
        "forbidden_regex": (re.compile(r"^next/"),),
    },
}


def _iter_target_files() -> list[Path]:
    """Return TypeScript/JavaScript source files under features/ and shared/."""
    targets: list[Path] = []
    bases = (FRONT_END_ROOT / "features", FRONT_END_ROOT / "shared")
    for base in bases:
        if not base.exists():
            continue
        for file_path in base.rglob("*"):
            if (
                file_path.suffix
                in {
                    ".ts",
                    ".tsx",
                    ".js",
                    ".jsx",
                }
                and file_path.is_file()
            ):
                targets.append(file_path)
    return targets


def _iter_app_files() -> list[Path]:
    """Return route source files that must remain statically exportable."""
    app_root = FRONT_END_ROOT / "app"
    if not app_root.exists():
        return []

    return [
        file_path
        for file_path in app_root.rglob("*")
        if file_path.suffix in {".ts", ".tsx", ".js", ".jsx"}
        and file_path.is_file()
    ]


def _detect_layer(file_path: Path) -> str | None:
    """Detect the architectural layer of a file from its path."""
    parts = file_path.relative_to(FRONT_END_ROOT).parts
    if "features" in parts:
        if "application" in parts:
            return "features/application"
        if "infrastructure" in parts:
            return "features/infrastructure"
        return None
    if "shared" in parts:
        if "application" in parts:
            return "shared/application"
        if "infrastructure" in parts:
            return "shared/infrastructure"
    return None


def _line_number(content: str, index: int) -> int:
    """Return the 1-based line number for the given character index."""
    return content.count("\n", 0, index) + 1


def _is_forbidden(module_spec: str, rule: dict) -> bool:
    """Return True if the import is forbidden by the layer rule."""
    if module_spec in ALLOWED_IMPORTS:
        return False

    if module_spec in rule["forbidden_exact"]:
        return True

    if any(
        module_spec.startswith(prefix) for prefix in rule["forbidden_prefixes"]
    ):
        return True

    if any(pattern.search(module_spec) for pattern in rule["forbidden_regex"]):
        return True

    return False


def main() -> int:
    """Run architecture and static-export checks and return exit code."""
    violations: list[str] = []

    public_cv_root = FRONT_END_ROOT / "public/cv"
    if public_cv_root.exists():
        violations.append(
            "public/cv [CV assets must not be included in the static export]"
        )

    for file_path in _iter_target_files():
        layer = _detect_layer(file_path)
        if layer is None:
            continue

        rule = LAYER_RULES[layer]
        rel_path = file_path.relative_to(FRONT_END_ROOT).as_posix()
        content = file_path.read_text(encoding="utf-8")

        for match in IMPORT_PATTERN.finditer(content):
            module_spec = match.group(1) or match.group(2)
            if not module_spec:
                continue
            if module_spec.startswith("."):
                continue

            if _is_forbidden(module_spec, rule):
                line = _line_number(content, match.start())
                violations.append(f"{rel_path}:{line}:{module_spec} [{layer}]")

    for file_path in _iter_app_files():
        rel_path = file_path.relative_to(FRONT_END_ROOT).as_posix()
        content = file_path.read_text(encoding="utf-8")

        for match in STATIC_EXPORT_REDIRECT_PATTERN.finditer(content):
            imported_names = match.group("imports")
            if re.search(r"\b(?:redirect|permanentRedirect)\b", imported_names):
                line = _line_number(content, match.start())
                violations.append(
                    f"{rel_path}:{line}:next/navigation redirect "
                    "[unsupported by output: export]"
                )

    if violations:
        print("Guardrail violations found:")
        for violation in violations:
            print(violation)
        return 1

    print(
        "OK: architecture boundaries, static-export constraints and "
        "private CV boundary hold."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
