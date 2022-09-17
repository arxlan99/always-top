const handleDelete = (e) => {
  // prevent all clicks on the page
  e.preventDefault();
  e.stopPropagation();
  e.target.remove();
};

const handleFocus = (e) => {
  // prevent all clicks on the page
  e.preventDefault();
  e.stopPropagation();
  // add close button

  e.target.classList.toggle('modal');
};

const handleCreateNewWindow = (e) => {
  // prevent all clicks on the page
  e.preventDefault();
  e.stopPropagation();
  const myWindow = window.open('', '', 'width=300,height=300');
  myWindow.document.write(e.target.outerHTML);
};

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  document.removeEventListener('click', handleDelete);
  document.removeEventListener('click', handleFocus);
  document.removeEventListener('click', handleCreateNewWindow);

  if (msg === 'delete') {
    document.body.classList.remove('zoom-in__cursor', 'ne-resize__cursor');
    document.body.classList.add('pointer__cursor');

    document.addEventListener('click', handleDelete);
  } else if (msg === 'focus') {
    document.body.classList.remove('pointer__cursor', 'ne-resize__cursor');
    document.body.classList.add('zoom-in__cursor');

    document.addEventListener('click', handleFocus);
  } else if (msg === 'createNewWindow') {
    document.body.classList.remove('zoom-in__cursor', 'pointer__cursor');
    document.body.classList.add('ne-resize__cursor');

    document.addEventListener('click', handleCreateNewWindow);
  } else if (msg === 'cancel') {
    document.body.classList.remove(
      'zoom-in__cursor',
      'pointer__cursor',
      'ne-resize__cursor'
    );
  }
});

// create notification
/* function createNotification(text) {
  Notification.requestPermission().then(function (result) {
    if (result === 'granted') {
      new Notification('Top Always', {
        body: `Selected ${text} button`,
      });
    }
  });
}
 */