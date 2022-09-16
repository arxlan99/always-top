const handleDelete = (e) => {
  console.log('deleted click');
  // prevent all clicks on the page
  e.preventDefault();
  e.stopPropagation();
  e.target.remove();
};

const handleFocus = (e) => {
  console.log('focus click');

  // prevent all clicks on the page
  e.preventDefault();
  e.stopPropagation();
  // add close button

  e.target.classList.add('modal');
};

const handleCreateNewWindow = (e) => {
  console.log('createNewWindow click');
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

    createNotification(msg);

    document.addEventListener('click', handleDelete);
  } else if (msg === 'focus') {
    document.body.classList.remove('pointer__cursor', 'ne-resize__cursor');
    document.body.classList.add('zoom-in__cursor');

    createNotification(msg);
    document.addEventListener('click', handleFocus);
  } else if (msg === 'createNewWindow') {
    document.body.classList.remove('zoom-in__cursor', 'pointer__cursor');
    document.body.classList.add('ne-resize__cursor');

    createNotification(msg);

    document.addEventListener('click', handleCreateNewWindow);
  } else if (msg === 'cancel') {
    console.log('cancel');
    document.body.classList.remove(
      'zoom-in__cursor',
      'pointer__cursor',
      'ne-resize__cursor'
    );
  }
});

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
