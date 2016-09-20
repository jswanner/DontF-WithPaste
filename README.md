# Don't fuck with copy and paste

[![Don't Fuck With Paste - Chrome Web Store](https://developer.chrome.com/webstore/images/ChromeWebStore_Badge_v2_206x58.png)](https://chrome.google.com/webstore/detail/dont-fuck-with-paste/nkgllhigpcljnhoakjkgaieabnkmgdkb)

## Background

It annoys me to no end when a web application prevents me from being able to
paste content into an input field, or copy it out.  If I paste an incorrect
email address, that's my own damn fault.  I use tools like 1Password to
remember all kinds of things for me, and it's actually more error prone for me
to type out all the characters than it is for me to copy from 1Password and
paste into a text box.

## Solution

This is a dead simple Google Chrome extension that removes copy and paste
blocking.

## Configuration

There are some sites that do helpful things with copy and paste events, and for
those sites you want their paste event handlers to still work. In the options
for this extension, you can add an exclusion pattern that matches the site's
URL, which will prevent this extension from running on that site, and thereby
allowing the paste event to occur.
