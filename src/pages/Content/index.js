import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

let selectedButton;

document.addEventListener('click', (e) => {
  // prevent all clicks on the page
  e.preventDefault();
  e.stopPropagation();

  if (selectedButton === 'delete') {
    e.target.remove();
  }
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg === 'delete') {
    document.body.classList.remove('zoom-in__cursor', 'ne-resize__cursor');
    document.body.classList.add('pointer__cursor');
    createNotification(msg);
    selectedButton = msg;
  } else if (msg === 'focus') {
    document.body.classList.remove('pointer__cursor', 'ne-resize__cursor');
    document.body.classList.add('zoom-in__cursor');
    console.log('focus');
    createNotification(msg);
    selectedButton = msg;
  } else if (msg === 'createNewWindow') {
    document.body.classList.remove('zoom-in__cursor', 'pointer__cursor');
    document.body.classList.add('ne-resize__cursor');
    createNotification(msg);
    selectedButton = msg;
  }

  console.log('I am listener');
});

// send to background

// create notification
function createNotification(text) {
  Notification.requestPermission().then(function (result) {
    if (result === 'granted') {
      new Notification('Top Always', {
        body: `Selected ${text} button`,
      });
    }
  });
}
