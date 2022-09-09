import { getByKey, setByKey } from '../local';

class Recorder {
  static END_SENTINEL = 'END_SENTINEL';

  constructor(storage_key, starting_item) {
    this._storage_key = storage_key;
    this._starting_time = starting_item;
    this._buffer = [];
    if (starting_item) {
      this._buffer.push({ obj: starting_item, time: new Date().getTime() });
    }
  }

  loadFromStorage() {
    try {
      this._buffer = JSON.parse(getByKey(this._storage_key));
    } catch (e) {
      console.error(`Could not load from storage by key ${this._storage_key}`);
    }
  }

  clear() {
    this._buffer = [];
    if (this._starting_item) {
      this._buffer.push({ obj: this._starting_item, time: new Date().getTime() });
    }
  }

  capture(obj, time) {
    if (obj === Recorder.END_SENTINEL) {
      return setByKey(this._storage_key, JSON.stringify(this._buffer));
    }
    this._buffer.push({ obj, time });
  }

  *playback() {
    for (const item of this._buffer) {
      yield item;
    }
    return this._buffer.length;
  }
}

export default Recorder;
// strumArray.push({ chord_name: '?', chord_pattern: chord, beatTime: time });
