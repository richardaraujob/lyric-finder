import { useState } from "react";

import { searchSongByLyrics, getLyricsByTrackId } from "./api/api";

import MicIcon from "remixicon-react/MicFillIcon";
import ArrowLeftIcon from "remixicon-react/ArrowLeftLineIcon";

import "./App.css";

function App() {
  let spreechRecognition =
    window.SpeechRecognitionAlternative || window.webkitSpeechRecognition;

  let recognition = null;

  if (spreechRecognition !== undefined) {
    recognition = new spreechRecognition();
  }

  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const [trackList, setTrackList] = useState([]);
  const [results, setResults] = useState(false);

  const listenSong = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript);
      };

      recognition.start();
    }
  };

  const callApiSearchSong = () => {
    searchSongByLyrics(text)
      .then((response) => {
        if (response.status === 200) {
          setTrackList(response.data.message.body.track_list);
          setResults(true);

          console.log(response);
        }
      })
      .catch((response) => alert("Não encontrada"));
  };

  const callApiTrackLyrics = (track_id) => {
    getLyricsByTrackId(track_id).then((response) => console.log(response));
  };

  return (
    <div className="App">
      <div className="window">
        <h1 className="title">Cante uma música</h1>
        <form className="listening-song">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            className={`btn-listen ${listening ? "listening" : ""}`}
            type="button"
            onClick={() => listenSong()}
          >
            <MicIcon style={{ color: "#fff" }} />
          </button>
          <button
            className="btn-search"
            type="button"
            disabled={text ? false : true}
            onClick={() => callApiSearchSong()}
          >
            buscar música
          </button>
        </form>
        <div
          className="track-list"
          style={{ display: results ? "block" : "none" }}
        >
          <button type="button" onClick={() => setResults(false)}>
            <ArrowLeftIcon />
          </button>
          <h2>Músicas famosas com essa letra</h2>
          <ul>
            {trackList.map(({ track }) => {
              return (
                <li
                  key={track.track_id}
                  onClick={() => callApiTrackLyrics(track.track_id)}
                >
                  <a href={track.track_share_url} target="_blank">
                    {track.track_name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
