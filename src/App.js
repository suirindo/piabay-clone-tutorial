import { useRef, useState } from 'react';
import './App.css';
import ImageGallery from './ImageGallery';

function App() {
  const [fetchData, setFetchData] = useState([]); //変数が動的に変わる（この場合は、検索してAPIを叩くたびに変わる）ものを扱う際にuseStateを利用する
  const ref = useRef();
  const handleSubmit = (e) => {
    e.preventDefault(); // enterKeyを押した際の自動リロードを防ぐ。リロードが起こるとinputの内容が消えてしまう。
    console.log(ref.current.value);

    // APIURL
    const endpointURL = `https://pixabay.com/api/?key=11329554-12127c43d00acab9e4d761811&q=${ref.current.value}&image_type=photo`;

    // APIを叩く（データフェッチング。非同期処理）
    // fetch JSで用意されている、APIを叩くための関数
    // fetchで受け取った情報をresという変数で受け取り、returnでJSON化する
    fetch(endpointURL)
      .then((res) => {
        return res.json();
      })
      // さらにdataという変数でres.jsonを受け取り、setFetchDataに渡す
      .then((data) => {
        console.log(data.hits);
        setFetchData(data.hits);
        // set関数を使うことで、fetchDataに取得したjsonデータが入るようになる
      });
  };
  return (
    <div className="container">
      <h2>My Pixabay</h2>
      {/* enterKeyを押したときにform内文字列を取得する */}
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* formに打ち込んだ文字列を監視することができる。→ref */}
        <input type="text" placeholder="画像を探す" ref={ref} />
      </form>
      <ImageGallery fetchData={fetchData} />
    </div>
  );
}

export default App;
