const EXCLUDE_PAGE_ID = 'exclude-page';

function addUrlToArray(url, arr) {
  // adds the given url to the array
  return (arr || '')
    .split('\n')
    .concat([url])
    .filter(function(value, index, self) {
      return self.indexOf(value) === index;
    })
    .join('\n');
}

function removeUrlFromArray(url, arr) {
  // removes the given url from the array
  return (arr || '')
    .split('\n')
    .filter(function(value) {
      return value !== url;
    })
    .join('\n');
}

function excludeUrl(url) {
  chrome.storage.sync.get(window.defaultValues, function({ exclude, include }) {
    chrome.storage.sync.set({
      exclude: addUrlToArray(url, exclude),
      include: removeUrlFromArray(url, include),
    });

    updateContextMenu(false);
  });
}

function updateContextMenu(enabled) {
  chrome.contextMenus.update(EXCLUDE_PAGE_ID, { enabled });
}

function updateContextMenuByUrl(url) {
  // update the context menu based off the given url
  chrome.storage.sync.get(window.defaultValues, function({ exclude, include }) {
    const excludes = new RegExp(exclude.split('\n').join('|'));
    const includes = new RegExp(include.split('\n').join('|'));

    updateContextMenu(includes.test(url) && !excludes.test(url));
  });
}

chrome.runtime.onInstalled.addListener(function() {
  // When the app gets installed, set up the context menus
  chrome.contextMenus.create({
    id: EXCLUDE_PAGE_ID,
    contexts: ['page_action'],
    title: 'Exclude this page',
    onclick: function(tab, page) {
      excludeUrl(page.url);
    },
  });

  chrome.tabs.query({ active: true }, function(tabs) {
    // update the context menu with the current tab
    if (tabs[0]) {
      updateContextMenuByUrl(tabs[0].url);
    }
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // update the context menu when user updates url
  if (tab.active && changeInfo.url) {
    updateContextMenuByUrl(tab.url);
  }
});

chrome.tabs.onActivated.addListener(function({ tabId }) {
  // update the context menu when user changes tabs
  chrome.tabs.get(tabId, function(tab) {
    updateContextMenuByUrl(tab.url);
  });
});
