import {FileWrapper} from './file-wrapper';

export interface HotelDto {
  id?: number;
  name?: string;
  rating?: number;
  city?: string;
  street?: string;
  phoneNumber?: string;
  email?: string;
  attachment?: FileWrapper;
}
