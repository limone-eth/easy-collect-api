import * as _ from 'lodash';

const UPPERCASE_FIRST_REGEX = RegExp("[A-Z]");

export class XLoDash {
    static cleanObject(obj: any) {
        for (const key of Object.keys(obj)) {
            const o = JSON.stringify(obj[key]);
            if (o === undefined || o === "null" || o === "{}") {
                delete obj[key];
            }
        }
        return obj;
    }

    static excludeFieldsFromObject(obj: any, fieldsToBeExcluded: string[]) {
        const e: any = {};
        for (const key of Object.keys(obj)) {
            if (fieldsToBeExcluded.indexOf(key) === -1) {
                e[key] = obj[key];
            }
        }
        return e;
    }

    static objectKeysToSnakeCase(wrong_case_object: any): any {
        const snakeCaseObject: any = {};
        if (_.isArray(wrong_case_object)) {
            return _.map(wrong_case_object, (obj) => XLoDash.objectKeysToSnakeCase(obj));
        }
        _.forEach(
            wrong_case_object,
            (value, key) => {
                if (_.isPlainObject(value) || _.isArray(value)) {   // checks that a value is a plain object or an array - for recursive key conversion
                    value = XLoDash.objectKeysToSnakeCase(value);   // recursively update keys of any values that are also objects
                }
                if (UPPERCASE_FIRST_REGEX.test(key)) {
                    snakeCaseObject[_.snakeCase(key)] = value;
                } else {
                    snakeCaseObject[key] = value;
                }
            }
        );
        return snakeCaseObject;
    };


    static translateObject(objectToTranslate: any, language: string = "en") {
        const obj = objectToTranslate;
        obj.name = obj['name_' + language];
        delete obj.name_it;
        delete obj.name_en;
        delete obj.name_es;
        delete obj.name_fr;
        delete obj.name_de;
        return obj;
    }
}
