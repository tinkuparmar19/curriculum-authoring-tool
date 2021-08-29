import { useState } from 'react';
import './App.css';
import Main from './Main';

function App() {
  const [rows, setRows] = useState([])
  const [inputText, setInputText] = useState('')
  const [indent, setIndent] = useState('normal')

  const handleAdd = () => {
    setRows(prevData => {
      return [...prevData, { id: rows.length, text: inputText, position: indent }]
    })
    setInputText('')
    setIndent('normal')
  }

  const handleDelete = (id) => {
    setRows(prevData => {
      return prevData.filter(item => item.id !== id)
    })
  }

  const handleRight = () => {
    setIndent('indent-right')
  }

  const handleLeft = () => {
    setIndent('normal')
  }

  const handleRightMain = (id) => {
    setRows(prevData => {
      return prevData.map(item => item.id === id ? {...item, position: 'indent-right'} : item )
    })
  }

  const handleLeftMain = (id) => {
    setRows(prevData => {
      return prevData.map(item => item.id === id ? {...item, position: 'normal'} : item )
    })
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(rows);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRows(items);
  }

  const handleDownload = () => {
    const json = JSON.stringify(rows);
    const blob = new Blob([json],{type:'application/json'});
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = "standards" + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setRows(JSON.parse(e.target.result))
    };
  }

  return (
    <div className="app">
      <h2>MATHAMATICS</h2>
      <>
        <Main 
          rows={rows}
          handleDelete={handleDelete}
          handleRightMain={handleRightMain}
          handleLeftMain={handleLeftMain}
          handleOnDragEnd={handleOnDragEnd}
        />
        <div className='container-constant'>
          <div className='container-left'>
            <i className="fas fa-arrows-alt"></i>
            <i className="fas fa-arrow-left" onClick={handleLeft}></i>
            <i className="fas fa-arrow-right" onClick={handleRight}></i>
            <i className="far fa-trash-alt"></i>
          </div>
          <div className='container-right'>
            <input
              type='text'
              placeholder='Type standard here(e.g. Numbers)'
              className={indent}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleAdd} className='add-button'>Add a Standard</button>
        <div className='down-up-buttons'>
          <button onClick={handleDownload} className='download'>Download data</button>
          <button className='download'><input type='file' onChange={handleUpload}  /></button>
        </div>
      </>
    </div>
  );
}

export default App;
