console.log('This is the background page.');
console.log('Put the background scripts here.');

async function getCurrentTab() {
  // get the current tab in v3
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

  return tab;
}

export async function sendMessageToContentScript(message) {
  let tab = await getCurrentTab();
  chrome.tabs
    .sendMessage(tab.id, message)
    .then((response) => {
      console.log('response', response);
    })
    .catch((error) => {
      console.log('error', error);
    });
}

/* chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log('message received', msg);

  console.log('I am listener');
});
 */
