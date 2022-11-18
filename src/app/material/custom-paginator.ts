import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from "@ngx-translate/core";

export class PaginatorIntlService extends MatPaginatorIntl {
  translate!: TranslateService;

  override getRangeLabel =  (page: any, pageSize: any, length: any) => {
    const of = this.translate ? this.translate.instant('de') : 'de';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  };

  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    super.itemsPerPageLabel = this.translate.instant('Items por página:');
    super.nextPageLabel = this.translate.instant('Página siguiente');
    super.previousPageLabel = this.translate.instant('Página anterior');
    this.changes.next();
  }

}
