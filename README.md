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

## Usage

The easiest way to add a site to the blacklist is to click on the extension
icon ![inactive
icon](https://raw.githubusercontent.com/jswanner/DontFuckWithPaste/09339b4f43d5bac9ddbdeea75051c6d9c017951f/clipboard-inactive-32.png),
then optionally edit the auto-generated pattern, lastly click "Save":

![New pattern dialog
example](https://raw.githubusercontent.com/jswanner/DontFuckWithPaste/73e5d11eba02213ae28ac0ced28f54a1d1af6a09/dialog-example.png)

After that, the extension icon should now be blue, meaning the extension is
active for your current tab: ![active
icon](https://raw.githubusercontent.com/jswanner/DontFuckWithPaste/73e5d11eba02213ae28ac0ced28f54a1d1af6a09/clipboard-active-32.png)

## Version 2 Upgrade

Version 2 is a major update to the extension. It makes it much easier to ensure
the extension is only running on sites that are bad actors with copy & paste
events and it also provides visibility into the active/inactive state of the
extension for each tab.

In order to provide the smoothest experience as possible, the extension needs
to know when you change active tabs. In order for the extension to know about
that event, it needs the `tabs` permission, which Chrome describes as "can read
and change all your data on websites you visit." That description is very
scary, and is certainly not what this extension is doing. Being an open-sourced
project, you can always read all the code to see how this extension works, and
what it's [not] doing with your data.

To read more about the version 2 upgrade, see: [the wiki
page](https://github.com/jswanner/DontFuckWithPaste/wiki/Version-2.0).
