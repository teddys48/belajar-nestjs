import { v7 } from 'uuid';

export function generateRandomString(): string {
  return v7().split('-').join('');
}

export class LogFormat {
  session_id: string;
  route: string;
  type: string;
  content: any;
  timestamp: string;
  response_time: string;

  constructor(
    session_id: string,
    route: string,
    type: string,
    content: any,
    timestamp: string,
    response_time: string,
  ) {
    this.session_id = session_id;
    this.route = route;
    this.type = type;
    this.content = content;
    this.timestamp = timestamp;
    this.response_time = response_time;
  }
}
