import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedCorporateDebitResultRequestDto extends PagedFilterAndSortedRequest {
  keyword: string;
}
