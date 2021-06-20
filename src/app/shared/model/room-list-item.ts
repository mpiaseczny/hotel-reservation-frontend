import {FeatureType} from './feature.type';
import {FileWrapper} from './file-wrapper';

export interface RoomListItem {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  capacity?: number;
  features?: FeatureType[];
  attachment?: FileWrapper;
}
