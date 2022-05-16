# Don't f*** with copy and paste

[Don't F*** With Paste - Chrome Web Store](https://chrome.google.com/webstore/detail/dont-f-with-paste/nkgllhigpcljnhoakjkgaieabnkmgdkb)

## Background

It annoys me to no end when a web application prevents me from being able to
paste content into an input field, or copy it out.  If I paste an incorrect
email address, that's my own damn fault.  I use tools like 1Password to
remember all kinds of things for me, and it's actually more error prone for me
to type out all the characters than it is for me to copy from 1Password and
paste into a text box.

## Solution

This is a dead simple Google Chrome extension that removes copy, cut and paste
blocking, by preventing sites from interfering with "copy", "cut", and "paste"
browser events.

This extension does not try to prevent a site from also interfering with
keyboard shortcuts related to those browser actions (control-v, command-v,
etc.), nor does this extension prevent sites from interfering with the
"contextmenu" event (right click menu). For those super annoying sites that
interfere with keyboard shortcuts and context menu, using Edit -> Paste from
the browser's menu might be required.

## Usage

The easiest way to activate the extension for a given site is to click on the
extension icon ![inactive
icon](https://raw.githubusercontent.com/jswanner/DontF-WithPaste/09339b4f43d5bac9ddbdeea75051c6d9c017951f/clipboard-inactive-32.png),
then optionally edit the auto-generated pattern, lastly click "Save":

![New pattern dialog
example](https://raw.githubusercontent.com/jswanner/DontF-WithPaste/73e5d11eba02213ae28ac0ced28f54a1d1af6a09/dialog-example.png)

After that, the extension icon should now be blue, meaning the extension is
active for your current tab: ![active
icon](https://raw.githubusercontent.com/jswanner/DontF-WithPaste/73e5d11eba02213ae28ac0ced28f54a1d1af6a09/clipboard-active-32.png)

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
page](https://github.com/jswanner/DontF-WithPaste/wiki/Version-2.0).

## Bookmarklet

If for some reason you prefer to use a [bookmarklet][] to accomplish the same
goal, you can do so by adding a bookmark to the following URI:

```js
javascript:forceBrowserDefault=(e=>{e.stopImmediatePropagation();return true;});['copy','cut','paste'].forEach(e=>document.addEventListener(e,forceBrowserDefault,true));
```

![bookmarklet](https://user-images.githubusercontent.com/576853/166342567-e7ed37ce-e2be-442b-a6b3-c5705f92ac9f.png)
![chrome bookmarks](https://user-images.githubusercontent.com/261/167724011-7b9a3fa5-ad1d-44eb-86b9-d396edcb17bf.png)

Now if you encounter a problematic page, you can click on this bookmark (or
enter a keyword like `dfwp` into the address bar) in order to liberate your
clipboard once more. Using this method can also help to mitigate
[fingerprinting][], even if you are using Chrome. Note: this will not prevent
blocking of clipboard events in iframes.

[bookmarklet]: https://en.wikipedia.org/wiki/Bookmarklet
[fingerprinting]: https://en.wikipedia.org/wiki/Device_fingerprint#Browser_extensions
