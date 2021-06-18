import {FileWrapper} from './file-wrapper';

export interface ReservationListItem {
  id?: number;
  roomName?: string;
  dateFrom?: number;
  dateTo?: number;
  price?: number;
  attachment?: FileWrapper;
}
