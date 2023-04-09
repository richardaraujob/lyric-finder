import axios from "axios";

const baseUrl = "https://api.musixmatch.com/ws/1.1";
const apiKey = "26d71d67db06ae594ae02761efc4257b";

const searchSongByLyrics = (lyrics) => {
  return axios.get(
    baseUrl +
      "/track.search?apikey=" +
      apiKey +
      "&q_lyrics=" +
      encodeURIComponent(lyrics) +
      "&s_artist_rating=desc" +
      "&page_size=20",
    { withCredentials: false }
  );
};

const getLyricsByTrackId = (track_id) => {
  return axios.get(
    baseUrl + "/track.lyrics.get?apikey=" + apiKey + "&track_id=" + track_id,
    { withCredentials: false }
  );
};

export { searchSongByLyrics, getLyricsByTrackId };
