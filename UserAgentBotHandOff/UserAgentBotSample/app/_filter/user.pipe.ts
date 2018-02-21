import { PipeTransform, Pipe } from '@angular/core';
import { IUser } from '../_models/index';

@Pipe({
    name: 'userFilter'
})

export class UserFilterPipe implements PipeTransform {

    transform(value: any, filter: string): any[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: any) =>
            app.questionDesc != null && app.questionDesc.toLocaleLowerCase().indexOf(filter) != -1
            //|| app.LastName != null && app.LastName.toLocaleLowerCase().indexOf(filter) != -1
            || app.answerDesc != null && app.answerDesc.toLocaleLowerCase().indexOf(filter) != -1

        ) : value;

    }
}