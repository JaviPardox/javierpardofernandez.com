export const academicTitle: Record<string, string> = {
    " $ ": "function-name",
    "ls ": "string",
    "-l ": "keyword",
    "| ": "default",
    "\n": "",
    "grep ": "function-name",
    "academics": "string",
};

export const organizationTitle: Record<string, string> = {
    " SELECT ": "keyword",
    "* ": "default",
    "\n": "",
    "FROM ": "keyword",
    "orgs": "default",
};

export const experienceTitle: Record<string, string> = {
    " class ": "keyword",
    "Experience": "class-name",
    ":": "",
    "\n": "",
    "\tdef ": "keyword",
    "__init__": "function-name",
    "(": "parentheses",
    "self": "python-function-attribute",
    "):\n": "parentheses",
    "\t\tsuper": "keyword",
    "()": "parentheses"
};

export const offerTitle: Record<string, string> = {
    " function ": "keyword",
    "WhatIOffer": "function-name",
    "(": "parentheses",
    ")": "parentheses",
    "\n": "",
    "{" : "braces",
    "return ": "keyword",
    "'Expertise'": "string",
    ";": "semicolon",
    "}": "braces",
};