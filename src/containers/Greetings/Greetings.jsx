import React from 'react';
import icon from '../../assets/img/download.png';
import './Greetings.css';
import Delete from '../../assets/delete.svg';
import Select from '../../assets/select.svg';
import Zoom from '../../assets/zoom.svg';
import { useEffect } from 'react';
import { createRef } from 'react';
import { sendMessageToContentScript } from '../../pages/Background';

const GreetingComponent = () => {
  const deleteRef = createRef();

  useEffect(() => {
    const listener = document.addEventListener('click', (e) => {
      console.log(e.target);
    });

    return () => {
      document.removeEventListener('click', listener);
    };
  }, []);

  const handleDelete = async () => {
    await sendMessageToContentScript('delete');
  };

  const handleFocus = async () => {
    await sendMessageToContentScript('focus');
  };

  const handleCreateNewWindow = async () => {
    await sendMessageToContentScript('createNewWindow');
  };

  const handleCancel = async () => {
    await sendMessageToContentScript('cancel');
  };

  return (
    <div className="container">
      <div>
        <div className="header">Always Top</div>
        <div className="content">
          <div className="button_container">
            <button
              className="button"
              ref={deleteRef}
              onClick={() => handleDelete()}
            >
              <img src={Delete} alt="" width={15} />
              <span>Delete element</span>
            </button>
            <button className="button" onClick={() => handleFocus()}>
              <img src={Zoom} alt="" width={15} />
              <span>Zoom & focus element</span>
            </button>
            <button className="button" onClick={() => handleCreateNewWindow()}>
              <img src={Select} alt="" width={15} />
              <span>Select element and open new screen</span>
            </button>
            <button className="button" onClick={() => handleCancel()}>
              <img src={Select} alt="" width={15} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <a href="https://chrome.google.com/webstore/category/extensions">
          <div>Go to chrome web store </div>
          <div>
            <img src={icon} alt="store" width={20} />
          </div>
        </a>
      </div>
    </div>
  );
};

export default GreetingComponent;
