# Don't fuck with paste

## Background

It annoys me to no end when a web application prevents me from being
able to paste content into an input field.  If I paste an incorrect
email address, that's my own damn fault.  I use tools like 1Password to
remember all kinds of things for me, and it's actually more error prone
for me to type out all the characters than it is for me to copy from
1Password and paste into a text box.

## Solution

This is a dead simple Google Chrome extension that removes paste
blocking.

## Going forward

As it stands, this extension only looks for input fields with an onpaste
attribute, and removes the value of that attribute.  So, I know there
are some problems with this approach:

1. There are probably some sites that use the onpaste attribute for
   things other than just preventing paste, and this extension will
   completely kill that functionality.
2. I'm sure there are other ways to prevent someone from pasting than
   just "return false;" in the onpaste attribute.  Those kinds of
   blocks are not currently being handled.
