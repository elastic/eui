export class Timer {
  constructor(callback, timeMs) {
    this.id = setTimeout(this.finish, timeMs);
    this.callback = callback;
    this.finishTime = Date.now() + timeMs;
    this.timeRemaining = undefined;
  }

  pause = () => {
    clearTimeout(this.id);
    this.id = undefined;
    this.timeRemaining = this.finishTime - Date.now();
  };

  resume = () => {
    this.id = setTimeout(this.finish, this.timeRemaining);
    this.finishTime = Date.now() + this.timeRemaining;
    this.timeRemaining = undefined;
  };

  clear = () => {
    clearTimeout(this.id);
    this.id = undefined;
    this.callback = undefined;
    this.finishTime = undefined;
    this.timeRemaining = undefined;
  };

  finish = () => {
    if (this.callback) {
      this.callback();
    }
    this.clear();
  };
}
