import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userfilter',
    pure: true
})
export class UserFilterPipe implements PipeTransform {
    transform(items: any[], filter: Object): any {
        if (!items) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        if (filter) {
            return items.filter(item => item.validated === true);
        } else {
            return items.filter(item => (item.validated==null || item.validated === filter));
        }
        
    }
}