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

As it stands, this extension just allows the browser to accept all
`paste` events, and skips any other `paste` event handlers.  So, I know
there are some problems with this approach:

1. There are some sites that use the onpaste attribute for things other
   than just preventing paste, and this extension will completely kill
   that functionality.
2. It would be much nicer if there was a white list of URLs where this
   extensions intervention is skipped.
