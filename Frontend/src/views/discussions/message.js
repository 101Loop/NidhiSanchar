export class Message {
  constructor(isMainUser, msg, date) {
    this.id = Math.random();
    this.msg = msg;
    this.isMainUser = isMainUser;
    this.date = date;
  }
}
