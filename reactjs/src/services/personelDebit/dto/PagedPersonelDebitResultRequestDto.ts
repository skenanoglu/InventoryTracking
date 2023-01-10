import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedPersonelDebitResultRequestDto extends PagedFilterAndSortedRequest {
  keyword: string;
}
